require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { query, close } = require('./db');

const ROOT = path.join(__dirname, '..');
const OUT_PATH = path.join(ROOT, 'docs', 'fk-graph.md');

function safeSegment(s) {
  return String(s).replace(/[^A-Za-z0-9._-]/g, '_');
}

function mkdirp(p) { fs.mkdirSync(p, { recursive: true }); }

function tlFromDocs(db, schema, table) {
  return `tables/${safeSegment(db)}/${safeSegment(schema)}.${safeSegment(table)}.md`;
}

async function listUserDatabases() {
  const r = await query(
    "SELECT name FROM sys.databases WHERE database_id > 4 AND state_desc = 'ONLINE' ORDER BY name"
  );
  return r.recordset.map((row) => row.name);
}

async function getGraphData(dbName) {
  // FK edges with column-level detail (one row per column in composite keys)
  const fks = await query(`
    SELECT
      sch_p.name       AS child_schema,  tab_p.name AS child_table,  col_p.name AS child_col,
      sch_r.name       AS parent_schema, tab_r.name AS parent_table, col_r.name AS parent_col,
      fk.name          AS fk_name,
      fk.delete_referential_action_desc AS on_delete,
      fkc.constraint_column_id          AS col_ord
    FROM [${dbName}].sys.foreign_keys fk
    JOIN [${dbName}].sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
    JOIN [${dbName}].sys.tables  tab_p ON fkc.parent_object_id     = tab_p.object_id
    JOIN [${dbName}].sys.schemas sch_p ON tab_p.schema_id          = sch_p.schema_id
    JOIN [${dbName}].sys.columns col_p ON fkc.parent_object_id     = col_p.object_id
                                      AND fkc.parent_column_id     = col_p.column_id
    JOIN [${dbName}].sys.tables  tab_r ON fkc.referenced_object_id = tab_r.object_id
    JOIN [${dbName}].sys.schemas sch_r ON tab_r.schema_id          = sch_r.schema_id
    JOIN [${dbName}].sys.columns col_r ON fkc.referenced_object_id = col_r.object_id
                                      AND fkc.referenced_column_id = col_r.column_id
    ORDER BY child_schema, child_table, fk.name, fkc.constraint_column_id
  `);

  const escapedDb = dbName.replace(/'/g, "''");
  const crossDeps = await query(`
    SELECT DISTINCT
      SCHEMA_NAME(v.schema_id) AS view_schema,
      v.name                   AS view_name,
      d.referenced_database_name AS ref_db,
      d.referenced_schema_name   AS ref_schema,
      d.referenced_entity_name   AS ref_name
    FROM [${dbName}].sys.objects v
    JOIN [${dbName}].sys.sql_expression_dependencies d ON d.referencing_id = v.object_id
    WHERE v.type = 'V'
      AND d.referenced_database_name IS NOT NULL
      AND d.referenced_database_name <> '${escapedDb}'
    ORDER BY view_schema, view_name, ref_db, ref_schema, ref_name
  `);

  return { fks: fks.recordset, crossDeps: crossDeps.recordset };
}

// Collapse column-level FK rows into constraint-level objects.
function collapseFKs(fkRows) {
  const map = new Map();
  for (const f of fkRows) {
    if (!map.has(f.fk_name)) {
      map.set(f.fk_name, {
        child_schema:  f.child_schema,  child_table:  f.child_table,
        parent_schema: f.parent_schema, parent_table: f.parent_table,
        fk_name:   f.fk_name,
        on_delete: f.on_delete,
        cols: [],
      });
    }
    map.get(f.fk_name).cols.push(`${f.child_col} → ${f.parent_col}`);
  }
  return [...map.values()];
}

function render(dbsData) {
  const out = [];
  out.push('# FK Dependency Graph');
  out.push('');
  out.push(`_Generated on ${new Date().toISOString()}_`);
  out.push('');
  out.push(
    '> This file covers the **FK constraint graph** (table-to-table relationships within each database). ' +
    'For cross-database module references (procedures, views, triggers) see `docs/dependencies/`.'
  );
  out.push('');

  const totalFkConstraints = dbsData.reduce((n, d) => n + (d.error ? 0 : collapseFKs(d.fks).length), 0);
  const totalCross = dbsData.reduce((n, d) => n + (d.error ? 0 : d.crossDeps.length), 0);
  out.push(`**${dbsData.length}** databases — **${totalFkConstraints}** FK constraints — **${totalCross}** cross-DB view edges.`);
  out.push('');
  out.push('Jump to: [Intra-database FK constraints](#intra-database-fk-constraints) · [Most-referenced tables](#most-referenced-tables) · [Cross-database view dependencies](#cross-database-view-dependencies)');
  out.push('');

  // ── Intra-DB FK table ────────────────────────────────────────────
  out.push('## Intra-database FK constraints');
  out.push('');
  for (const { db, fks, error } of dbsData) {
    out.push(`### \`${db}\``);
    out.push('');
    if (error) { out.push(`_Error: ${error}_`); out.push(''); continue; }
    const constraints = collapseFKs(fks);
    if (constraints.length === 0) { out.push('_No FK constraints._'); out.push(''); continue; }
    out.push(`${constraints.length} constraint${constraints.length === 1 ? '' : 's'}.`);
    out.push('');
    out.push('| Child table | FK name | Parent table | Columns | On delete |');
    out.push('|-------------|---------|--------------|---------|-----------|');
    for (const c of constraints) {
      const childLink  = `[\`${c.child_schema}.${c.child_table}\`](${tlFromDocs(db, c.child_schema, c.child_table)})`;
      const parentLink = `[\`${c.parent_schema}.${c.parent_table}\`](${tlFromDocs(db, c.parent_schema, c.parent_table)})`;
      const cols = c.cols.map((s) => `\`${s}\``).join(', ');
      out.push(`| ${childLink} | \`${c.fk_name}\` | ${parentLink} | ${cols} | ${c.on_delete} |`);
    }
    out.push('');
  }

  // ── Most-referenced tables (fan-in) ─────────────────────────────
  out.push('## Most-referenced tables');
  out.push('');
  out.push('Tables ordered by number of distinct FK constraints pointing **to** them. High fan-in tables are likely core domain entities.');
  out.push('');
  const fanIn = new Map();
  for (const { db, fks, error } of dbsData) {
    if (error) continue;
    const seenFk = new Set();
    for (const f of fks) {
      if (seenFk.has(f.fk_name)) continue;
      seenFk.add(f.fk_name);
      const key = `${db}\x00${f.parent_schema}\x00${f.parent_table}`;
      fanIn.set(key, (fanIn.get(key) || 0) + 1);
    }
  }
  const ranked = [...fanIn.entries()]
    .map(([k, n]) => { const [db, schema, table] = k.split('\x00'); return { db, schema, table, n }; })
    .filter((r) => r.n >= 2)
    .sort((a, b) => b.n - a.n || a.db.localeCompare(b.db) || a.table.localeCompare(b.table));
  if (ranked.length === 0) {
    out.push('_No table is the target of 2 or more FK constraints._');
  } else {
    out.push('| Table | Database | Inbound FK count |');
    out.push('|-------|----------|------------------|');
    for (const r of ranked) {
      out.push(`| [\`${r.schema}.${r.table}\`](${tlFromDocs(r.db, r.schema, r.table)}) | \`${r.db}\` | ${r.n} |`);
    }
  }
  out.push('');

  // ── Cross-DB view dependencies ───────────────────────────────────
  const allCross = [];
  for (const { db, crossDeps, error } of dbsData) {
    if (error) continue;
    for (const d of crossDeps) allCross.push({ srcDb: db, ...d });
  }
  out.push('## Cross-database view dependencies');
  out.push('');
  out.push('Views that use 3-part names to reach into another database. Complements `docs/dependencies/` (which covers modules).');
  out.push('');
  if (allCross.length === 0) {
    out.push('_None detected._');
    out.push('');
    return out.join('\n');
  }
  out.push(`**${allCross.length}** edge${allCross.length === 1 ? '' : 's'}.`);
  out.push('');
  const pairs = new Map();
  for (const e of allCross) {
    const k = `${e.srcDb}\x00${e.ref_db}`;
    if (!pairs.has(k)) pairs.set(k, []);
    pairs.get(k).push(e);
  }
  for (const [k, edges] of [...pairs.entries()].sort()) {
    const [src, tgt] = k.split('\x00');
    out.push(`### \`${src}\` → \`${tgt}\``);
    out.push('');
    const bySrc = new Map();
    for (const e of edges) {
      const sk = `${e.view_schema}.${e.view_name}`;
      if (!bySrc.has(sk)) bySrc.set(sk, []);
      bySrc.get(sk).push(`\`${e.ref_schema || 'dbo'}.${e.ref_name}\``);
    }
    out.push('| View | References |');
    out.push('|------|------------|');
    for (const [sk, targets] of [...bySrc.entries()].sort()) {
      const [vs, vn] = sk.split('.');
      out.push(`| [\`${sk}\`](${tlFromDocs(src, vs, vn)}) | ${targets.join(', ')} |`);
    }
    out.push('');
  }
  return out.join('\n');
}

(async () => {
  try {
    const dbs = await listUserDatabases();
    console.log(`Found ${dbs.length} database(s): ${dbs.join(', ')}`);
    const dbsData = [];
    for (const db of dbs) {
      try {
        const { fks, crossDeps } = await getGraphData(db);
        dbsData.push({ db, fks, crossDeps });
        const nConstraints = collapseFKs(fks).length;
        console.log(`  ${db}: ${nConstraints} FK constraints, ${crossDeps.length} cross-DB view edges`);
      } catch (e) {
        dbsData.push({ db, fks: [], crossDeps: [], error: e.message });
        console.error(`  ${db}: ERROR — ${e.message}`);
      }
    }
    mkdirp(path.join(ROOT, 'docs'));
    fs.writeFileSync(OUT_PATH, render(dbsData));
    console.log(`\nWrote ${OUT_PATH}`);
  } catch (e) {
    console.error('FK graph failed:', e.message);
    process.exitCode = 1;
  } finally {
    await close();
  }
})();
