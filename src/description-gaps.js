require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { query, close } = require('./db');

const ROOT = path.join(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');
const DESCRIPTIONS_PATH = path.join(ROOT, 'descriptions.json');
const OUT_PATH = path.join(DOCS_DIR, 'description-gaps.md');

function loadDescribedKeys() {
  if (!fs.existsSync(DESCRIPTIONS_PATH)) return { objects: new Set(), colCountByTable: new Map() };
  const raw = JSON.parse(fs.readFileSync(DESCRIPTIONS_PATH, 'utf8'));
  const objects = new Set();
  const colCountByTable = new Map(); // "db.schema.table" -> count of described columns
  for (const [k, v] of Object.entries(raw)) {
    if (k.startsWith('_')) continue;
    if (typeof v !== 'string' || !v.trim()) continue;
    const parts = k.split('.');
    if (parts.length === 3) {
      objects.add(k);
    } else if (parts.length === 4) {
      const tableKey = parts.slice(0, 3).join('.');
      colCountByTable.set(tableKey, (colCountByTable.get(tableKey) || 0) + 1);
    }
  }
  return { objects, colCountByTable };
}

async function listUserDatabases() {
  const r = await query(
    "SELECT name FROM sys.databases WHERE database_id > 4 AND state_desc = 'ONLINE' ORDER BY name"
  );
  return r.recordset.map((row) => row.name);
}

async function fetchTables(dbName) {
  const r = await query(`
    SELECT sch.name AS schema_name, t.name AS table_name, SUM(p.rows) AS row_count
    FROM [${dbName}].sys.tables t
    JOIN [${dbName}].sys.schemas sch ON t.schema_id = sch.schema_id
    JOIN [${dbName}].sys.partitions p ON t.object_id = p.object_id AND p.index_id IN (0,1)
    GROUP BY sch.name, t.name
    ORDER BY SUM(p.rows) DESC, sch.name, t.name
  `);
  return r.recordset;
}

async function fetchColumnCounts(dbName) {
  const r = await query(`
    SELECT TABLE_SCHEMA, TABLE_NAME, COUNT(*) AS col_count
    FROM [${dbName}].INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME IN (SELECT name FROM [${dbName}].sys.tables)
    GROUP BY TABLE_SCHEMA, TABLE_NAME
  `);
  const m = new Map();
  for (const row of r.recordset) {
    m.set(`${row.TABLE_SCHEMA}.${row.TABLE_NAME}`, Number(row.col_count));
  }
  return m;
}

function safeSegment(s) {
  return String(s).replace(/[^A-Za-z0-9._-]/g, '_');
}

function tableLink(db, schema, table) {
  return `tables/${safeSegment(db)}/${safeSegment(schema)}.${safeSegment(table)}.md`;
}

function fmtRows(n) {
  const num = Number(n);
  if (num >= 1_000_000) return `~${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `~${(num / 1_000).toFixed(0)}K`;
  return String(num);
}

(async () => {
  try {
    const { objects: describedObjects, colCountByTable: describedColCounts } = loadDescribedKeys();
    const totalDescribedCols = [...describedColCounts.values()].reduce((s, n) => s + n, 0);
    console.log(`Loaded ${describedObjects.size} table/view keys and ${totalDescribedCols} column keys from descriptions.json`);

    const dbs = await listUserDatabases();
    console.log(`Found ${dbs.length} database(s): ${dbs.join(', ')}`);

    const dbResults = [];
    for (const db of dbs) {
      try {
        const tables = await fetchTables(db);
        const colCounts = await fetchColumnCounts(db);

        const noDesc = [];
        const colGaps = [];
        let describedTableCount = 0;
        let totalCols = 0;
        let describedCols = 0;

        for (const t of tables) {
          const objKey = `${db}.${t.schema_name}.${t.table_name}`;
          const hasDesc = describedObjects.has(objKey);
          if (hasDesc) describedTableCount++;

          const numCols = colCounts.get(`${t.schema_name}.${t.table_name}`) || 0;
          totalCols += numCols;
          const colDescCount = describedColCounts.get(objKey) || 0;
          describedCols += colDescCount;

          if (!hasDesc) {
            noDesc.push(t);
          } else if (colDescCount < numCols) {
            colGaps.push({ ...t, numCols, colDescCount });
          }
        }

        dbResults.push({
          db,
          totalTables: tables.length,
          describedTables: describedTableCount,
          totalCols,
          describedCols,
          noDesc,
          // least-covered tables first
          colGaps: colGaps.sort((a, b) => (a.colDescCount / a.numCols) - (b.colDescCount / b.numCols)),
        });
        console.log(`  ${db}: ${tables.length} tables — ${noDesc.length} without description, ${colGaps.length} with column gaps`);
      } catch (e) {
        dbResults.push({ db, error: e.message });
        console.error(`  ${db}: ERROR — ${e.message}`);
      }
    }

    const out = [];
    out.push('# Description Coverage Gaps');
    out.push('');
    out.push(`_Generated on ${new Date().toISOString().slice(0, 10)}_`);
    out.push('');
    out.push('Work queue for `descriptions.json`. Undescribed tables are ranked by row count — largest impact first.');
    out.push('Run `npm run descriptions:gaps` to regenerate after adding entries.');
    out.push('');

    out.push('## Summary');
    out.push('');
    out.push('| Database | Tables | Described | Table % | Columns | Described | Column % |');
    out.push('|----------|--------|-----------|---------|---------|-----------|----------|');
    for (const r of dbResults) {
      if (r.error) {
        out.push(`| \`${r.db}\` | — | — | — | — | — | _error_ |`);
        continue;
      }
      const tPct = r.totalTables ? `${Math.round((100 * r.describedTables) / r.totalTables)}%` : '—';
      const cPct = r.totalCols ? `${Math.round((100 * r.describedCols) / r.totalCols)}%` : '—';
      out.push(
        `| \`${r.db}\` | ${r.totalTables} | ${r.describedTables} | **${tPct}** | ${r.totalCols} | ${r.describedCols} | **${cPct}** |`
      );
    }
    out.push('');

    for (const r of dbResults) {
      out.push(`## \`${r.db}\``);
      out.push('');
      if (r.error) {
        out.push(`_Error introspecting database: ${r.error}_`);
        out.push('');
        continue;
      }
      if (r.noDesc.length === 0 && r.colGaps.length === 0) {
        out.push('_All tables and columns have descriptions. ✓_');
        out.push('');
        continue;
      }

      if (r.noDesc.length > 0) {
        out.push(`### ${r.noDesc.length} table${r.noDesc.length === 1 ? '' : 's'} without descriptions`);
        out.push('');
        out.push('| Rows | Table | Key to add to descriptions.json |');
        out.push('|------|-------|---------------------------------|');
        for (const t of r.noDesc) {
          const link = `[\`${t.schema_name}.${t.table_name}\`](${tableLink(r.db, t.schema_name, t.table_name)})`;
          out.push(`| ${fmtRows(t.row_count)} | ${link} | \`"${r.db}.${t.schema_name}.${t.table_name}"\` |`);
        }
        out.push('');
      }

      if (r.colGaps.length > 0) {
        out.push(`### ${r.colGaps.length} table${r.colGaps.length === 1 ? '' : 's'} with partial column coverage`);
        out.push('');
        out.push('| Table | Cols described | Total | Coverage |');
        out.push('|-------|---------------|-------|----------|');
        for (const t of r.colGaps) {
          const link = `[\`${t.schema_name}.${t.table_name}\`](${tableLink(r.db, t.schema_name, t.table_name)})`;
          const pct = Math.round((100 * t.colDescCount) / t.numCols);
          out.push(`| ${link} | ${t.colDescCount} | ${t.numCols} | ${pct}% |`);
        }
        out.push('');
      }
    }

    if (!fs.existsSync(DOCS_DIR)) fs.mkdirSync(DOCS_DIR, { recursive: true });
    fs.writeFileSync(OUT_PATH, out.join('\n'));
    console.log(`\nWrote ${OUT_PATH}`);
  } catch (e) {
    console.error('Description gap analysis failed:', e.message);
    process.exitCode = 1;
  } finally {
    await close();
  }
})();
