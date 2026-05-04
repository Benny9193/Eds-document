require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { query, close } = require('./db');

const ROOT = path.join(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');
const OUT_PATH = path.join(DOCS_DIR, 'column-inventory.md');

// Convert glob-style pattern to SQL Server LIKE pattern.
// Escapes literal [, %, _ using bracket notation; then maps * → % and ? → _
function globToLike(pattern) {
  return pattern
    .replace(/\[/g, '[[]')
    .replace(/%/g, '[%]')
    .replace(/_/g, '[_]')
    .replace(/\*/g, '%')
    .replace(/\?/g, '_');
}

function formatType(c) {
  const t = c.DATA_TYPE;
  if (c.CHARACTER_MAXIMUM_LENGTH != null) {
    const len = c.CHARACTER_MAXIMUM_LENGTH === -1 ? 'max' : c.CHARACTER_MAXIMUM_LENGTH;
    return `${t}(${len})`;
  }
  if (['decimal', 'numeric'].includes(t)) {
    return `${t}(${c.NUMERIC_PRECISION},${c.NUMERIC_SCALE})`;
  }
  return t;
}

function safeSegment(s) {
  return String(s).replace(/[^A-Za-z0-9._-]/g, '_');
}

function tableLink(db, schema, table) {
  return `tables/${safeSegment(db)}/${safeSegment(schema)}.${safeSegment(table)}.md`;
}

async function listUserDatabases() {
  const r = await query(
    "SELECT name FROM sys.databases WHERE database_id > 4 AND state_desc = 'ONLINE' ORDER BY name"
  );
  return r.recordset.map((row) => row.name);
}

async function findColumns(dbName, likePattern) {
  const r = await query(
    `SELECT
       c.TABLE_SCHEMA, c.TABLE_NAME, c.COLUMN_NAME,
       c.DATA_TYPE, c.CHARACTER_MAXIMUM_LENGTH,
       c.NUMERIC_PRECISION, c.NUMERIC_SCALE,
       c.IS_NULLABLE, c.ORDINAL_POSITION,
       t.TABLE_TYPE,
       CASE WHEN pk.COLUMN_NAME IS NOT NULL THEN 'YES' ELSE '' END AS IS_PK
     FROM [${dbName}].INFORMATION_SCHEMA.COLUMNS c
     JOIN [${dbName}].INFORMATION_SCHEMA.TABLES t
       ON t.TABLE_SCHEMA = c.TABLE_SCHEMA
      AND t.TABLE_NAME  = c.TABLE_NAME
     LEFT JOIN (
       SELECT kcu.TABLE_SCHEMA, kcu.TABLE_NAME, kcu.COLUMN_NAME
       FROM [${dbName}].INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
       JOIN [${dbName}].INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu
         ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
        AND tc.TABLE_SCHEMA    = kcu.TABLE_SCHEMA
       WHERE tc.CONSTRAINT_TYPE = 'PRIMARY KEY'
     ) pk
       ON pk.TABLE_SCHEMA = c.TABLE_SCHEMA
      AND pk.TABLE_NAME   = c.TABLE_NAME
      AND pk.COLUMN_NAME  = c.COLUMN_NAME
     WHERE c.COLUMN_NAME LIKE @pattern
     ORDER BY c.COLUMN_NAME, c.TABLE_SCHEMA, c.TABLE_NAME`,
    { pattern: likePattern }
  );
  return r.recordset;
}

function render(globPattern, likePattern, dbResults) {
  // Flatten all hits into a single list tagged with their source database
  const all = [];
  for (const { db, rows } of dbResults) {
    for (const row of rows) {
      all.push({ db, ...row });
    }
  }

  // Group by column name (preserving first-seen casing, sorted)
  const byName = new Map();
  for (const row of all) {
    const key = row.COLUMN_NAME.toLowerCase();
    if (!byName.has(key)) byName.set(key, { name: row.COLUMN_NAME, rows: [] });
    byName.get(key).rows.push(row);
  }
  const groups = [...byName.values()].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  const dbCount = new Set(all.map((r) => r.db)).size;
  const out = [];

  out.push(`# Column Inventory: \`${globPattern}\``);
  out.push('');
  out.push(`_Generated on ${new Date().toISOString()}_`);
  out.push('');
  out.push(
    `Pattern \`${globPattern}\` (SQL LIKE: \`${likePattern}\`) — ` +
    `**${groups.length}** distinct column name${groups.length === 1 ? '' : 's'}, ` +
    `**${all.length}** occurrence${all.length === 1 ? '' : 's'} ` +
    `across **${dbCount}** database${dbCount === 1 ? '' : 's'}.`
  );
  out.push('');
  out.push('_LIKE matching is case-sensitive or insensitive depending on the database collation._');
  out.push('');

  if (groups.length === 0) {
    out.push('> No columns matched this pattern.');
    return out.join('\n');
  }

  // Summary table
  out.push('## Summary');
  out.push('');
  out.push('| Column | Occurrences | Databases |');
  out.push('|--------|-------------|-----------|');
  for (const g of groups) {
    const dbs = [...new Set(g.rows.map((r) => r.db))].sort().map((d) => `\`${d}\``).join(', ');
    out.push(`| [\`${g.name}\`](#${g.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}) | ${g.rows.length} | ${dbs} |`);
  }
  out.push('');

  // Per-column sections
  for (const g of groups) {
    out.push(`## \`${g.name}\``);
    out.push('');
    out.push('| Database | Schema | Table / View | Type | Nullable | PK | Object |');
    out.push('|----------|--------|--------------|------|----------|----|--------|');
    for (const r of g.rows) {
      const typeLabel = r.TABLE_TYPE === 'VIEW' ? 'view' : 'table';
      const link = `[\`${r.TABLE_SCHEMA}.${r.TABLE_NAME}\`](${tableLink(r.db, r.TABLE_SCHEMA, r.TABLE_NAME)})`;
      out.push(
        `| \`${r.db}\` | \`${r.TABLE_SCHEMA}\` | ${link} | ${formatType(r)} | ${r.IS_NULLABLE} | ${r.IS_PK} | ${typeLabel} |`
      );
    }
    out.push('');
  }

  return out.join('\n');
}

(async () => {
  const globPattern = process.argv[2];
  if (!globPattern) {
    console.error('Usage: npm run docs:columns -- "<pattern>"');
    console.error('  Pattern supports * (any chars) and ? (single char)');
    console.error('  Examples:');
    console.error('    npm run docs:columns -- "*_id"');
    console.error('    npm run docs:columns -- "*_date"');
    console.error('    npm run docs:columns -- "created_*"');
    console.error('    npm run docs:columns -- "*status*"');
    process.exitCode = 1;
    return;
  }

  const likePattern = globToLike(globPattern);
  console.log(`Pattern: "${globPattern}" → SQL LIKE: "${likePattern}"`);

  try {
    const dbs = await listUserDatabases();
    console.log(`Scanning ${dbs.length} database(s): ${dbs.join(', ') || '(none)'}`);

    const dbResults = [];
    let total = 0;
    for (const db of dbs) {
      try {
        const rows = await findColumns(db, likePattern);
        dbResults.push({ db, rows });
        total += rows.length;
        console.log(`  ${db}: ${rows.length} match${rows.length === 1 ? '' : 'es'}`);
      } catch (e) {
        dbResults.push({ db, rows: [], error: e.message });
        console.error(`  ${db}: ERROR — ${e.message}`);
      }
    }

    if (!fs.existsSync(DOCS_DIR)) fs.mkdirSync(DOCS_DIR, { recursive: true });
    const md = render(globPattern, likePattern, dbResults);
    fs.writeFileSync(OUT_PATH, md);
    console.log(`\nWrote ${OUT_PATH}  (${total} total occurrences)`);
  } catch (e) {
    console.error('Column inventory failed:', e.message);
    process.exitCode = 1;
  } finally {
    await close();
  }
})();
