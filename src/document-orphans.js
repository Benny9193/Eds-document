require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { query, close } = require('./db');

const ROOT = path.join(__dirname, '..');
const OUT_PATH = path.join(ROOT, 'docs', 'orphans.md');

function safeSegment(s) {
  return String(s).replace(/[^A-Za-z0-9._-]/g, '_');
}

function mkdirp(p) { fs.mkdirSync(p, { recursive: true }); }

function tlFromDocs(db, schema, name) {
  return `tables/${safeSegment(db)}/${safeSegment(schema)}.${safeSegment(name)}.md`;
}

async function listUserDatabases() {
  const r = await query(
    "SELECT name FROM sys.databases WHERE database_id > 4 AND state_desc = 'ONLINE' ORDER BY name"
  );
  return r.recordset.map((row) => row.name);
}

async function getOrphans(dbName) {
  // Tables with no outgoing FK (no parent) AND no incoming FK (no children).
  // Excludes system tables. Row count from partitions for context.
  const orphanTables = await query(`
    SELECT sch.name AS schema_name, t.name AS table_name,
           SUM(p.rows) AS row_count
    FROM [${dbName}].sys.tables t
    JOIN [${dbName}].sys.schemas sch ON t.schema_id = sch.schema_id
    JOIN [${dbName}].sys.partitions p
      ON t.object_id = p.object_id AND p.index_id IN (0, 1)
    WHERE t.is_ms_shipped = 0
      AND t.object_id NOT IN (
        SELECT DISTINCT parent_object_id     FROM [${dbName}].sys.foreign_key_columns
        UNION
        SELECT DISTINCT referenced_object_id FROM [${dbName}].sys.foreign_key_columns
      )
    GROUP BY sch.name, t.name
    ORDER BY sch.name, t.name
  `);

  // Views not referenced by any other object in sys.sql_expression_dependencies.
  // These are "terminal" views — nothing consumes them inside the database.
  // Note: application code calling them won't appear here.
  const leafViews = await query(`
    SELECT SCHEMA_NAME(v.schema_id) AS schema_name, v.name AS view_name
    FROM [${dbName}].sys.objects v
    WHERE v.type = 'V'
      AND v.is_ms_shipped = 0
      AND v.object_id NOT IN (
        SELECT DISTINCT referenced_id
        FROM [${dbName}].sys.sql_expression_dependencies
        WHERE referenced_id IS NOT NULL
      )
    ORDER BY schema_name, view_name
  `);

  // Procedures and functions not referenced by any other SQL module.
  // sys.sql_expression_dependencies only tracks SQL-to-SQL references;
  // application-layer callers will not appear, so this list is a starting
  // point for investigation, not a definitive dead-code list.
  const unreferencedRoutines = await query(`
    SELECT
      SCHEMA_NAME(o.schema_id) AS schema_name,
      o.name                   AS routine_name,
      CASE o.type
        WHEN 'P'  THEN 'PROCEDURE'
        WHEN 'FN' THEN 'SCALAR FUNCTION'
        WHEN 'IF' THEN 'INLINE TABLE FUNCTION'
        WHEN 'TF' THEN 'TABLE FUNCTION'
        ELSE o.type_desc
      END AS routine_type
    FROM [${dbName}].sys.objects o
    WHERE o.type IN ('P', 'FN', 'IF', 'TF')
      AND o.is_ms_shipped = 0
      AND o.object_id NOT IN (
        SELECT DISTINCT referenced_id
        FROM [${dbName}].sys.sql_expression_dependencies
        WHERE referenced_id IS NOT NULL
      )
    ORDER BY schema_name, routine_name
  `);

  return {
    orphanTables:         orphanTables.recordset,
    leafViews:            leafViews.recordset,
    unreferencedRoutines: unreferencedRoutines.recordset,
  };
}

function render(dbsData) {
  const out = [];
  out.push('# Orphan & Unreferenced Object Audit');
  out.push('');
  out.push(`_Generated on ${new Date().toISOString()}_`);
  out.push('');
  out.push('Flags objects that may be unused or disconnected from the schema. Each entry is a **signal for investigation**, not a verdict — confirm before removing anything.');
  out.push('');
  out.push('| Category | Definition |');
  out.push('|----------|------------|');
  out.push('| **Orphan table** | Base table with no outgoing FK (no parent it points to) and no incoming FK (no child that points to it). Isolated from the FK graph entirely. |');
  out.push('| **Leaf view** | View not referenced by any other view, procedure, or function tracked in `sys.sql_expression_dependencies`. |');
  out.push('| **Unreferenced routine** | Stored procedure or function with no SQL-module callers. Application-code callers will not appear here. |');
  out.push('');

  const totOrph = dbsData.reduce((n, d) => n + (d.error ? 0 : d.orphanTables.length), 0);
  const totLeaf = dbsData.reduce((n, d) => n + (d.error ? 0 : d.leafViews.length), 0);
  const totRout = dbsData.reduce((n, d) => n + (d.error ? 0 : d.unreferencedRoutines.length), 0);
  out.push(`**Totals:** ${totOrph} orphan table${totOrph !== 1 ? 's' : ''}, ${totLeaf} leaf view${totLeaf !== 1 ? 's' : ''}, ${totRout} unreferenced routine${totRout !== 1 ? 's' : ''}.`);
  out.push('');

  // Summary matrix
  out.push('## Summary by database');
  out.push('');
  out.push('| Database | Orphan tables | Leaf views | Unreferenced routines |');
  out.push('|----------|---------------|------------|-----------------------|');
  for (const { db, orphanTables, leafViews, unreferencedRoutines, error } of dbsData) {
    if (error) {
      out.push(`| \`${db}\` | _error_ | _error_ | _error_ |`);
    } else {
      out.push(`| [\`${db}\`](#${db.toLowerCase()}) | ${orphanTables.length} | ${leafViews.length} | ${unreferencedRoutines.length} |`);
    }
  }
  out.push('');

  // Per-database detail sections
  for (const { db, orphanTables, leafViews, unreferencedRoutines, error } of dbsData) {
    out.push(`## \`${db}\``);
    out.push('');
    if (error) { out.push(`_Error scanning: ${error}_`); out.push(''); continue; }

    // Orphan tables
    out.push('### Orphan tables');
    out.push('');
    if (orphanTables.length === 0) {
      out.push('_None — all tables participate in at least one FK relationship._');
    } else {
      out.push('| Table | Approx rows |');
      out.push('|-------|-------------|');
      for (const t of orphanTables) {
        const link = `[\`${t.schema_name}.${t.table_name}\`](${tlFromDocs(db, t.schema_name, t.table_name)})`;
        out.push(`| ${link} | ${t.row_count ?? ''} |`);
      }
    }
    out.push('');

    // Leaf views
    out.push('### Leaf views');
    out.push('');
    if (leafViews.length === 0) {
      out.push('_None — all views are referenced by at least one other SQL object._');
    } else {
      out.push('| View |');
      out.push('|------|');
      for (const v of leafViews) {
        out.push(`| [\`${v.schema_name}.${v.view_name}\`](${tlFromDocs(db, v.schema_name, v.view_name)}) |`);
      }
    }
    out.push('');

    // Unreferenced routines
    out.push('### Unreferenced routines');
    out.push('');
    out.push('_`sys.sql_expression_dependencies` only tracks SQL-module-to-SQL-module calls. Application code calling a routine will not appear as a reference._');
    out.push('');
    if (unreferencedRoutines.length === 0) {
      out.push('_None — all routines are referenced by at least one SQL object._');
    } else {
      out.push('| Routine | Type |');
      out.push('|---------|------|');
      for (const r of unreferencedRoutines) {
        out.push(`| \`${r.schema_name}.${r.routine_name}\` | ${r.routine_type} |`);
      }
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
        const result = await getOrphans(db);
        dbsData.push({ db, ...result });
        console.log(
          `  ${db}: ${result.orphanTables.length} orphan tables, ` +
          `${result.leafViews.length} leaf views, ` +
          `${result.unreferencedRoutines.length} unreferenced routines`
        );
      } catch (e) {
        dbsData.push({ db, orphanTables: [], leafViews: [], unreferencedRoutines: [], error: e.message });
        console.error(`  ${db}: ERROR — ${e.message}`);
      }
    }
    mkdirp(path.join(ROOT, 'docs'));
    fs.writeFileSync(OUT_PATH, render(dbsData));
    console.log(`\nWrote ${OUT_PATH}`);
  } catch (e) {
    console.error('Orphan audit failed:', e.message);
    process.exitCode = 1;
  } finally {
    await close();
  }
})();
