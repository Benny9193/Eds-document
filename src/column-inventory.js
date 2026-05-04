require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { query, close } = require('./db');

const ROOT = path.join(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');

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

// Build a safe filename slug from the glob pattern.
// Strips leading/trailing *, maps internal * to -, ? to _, and sanitizes the rest.
// e.g. "*_id" → "_id", "created_*" → "created_", "*status*" → "status"
function patternToSlug(pattern) {
  const slug = pattern
    .replace(/^\*+/, '')
    .replace(/\*+$/, '')
    .replace(/\*+/g, '-')
    .replace(/\?/g, '_')
    .replace(/[^A-Za-z0-9._-]/g, '_');
  return slug || 'all';
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
  const cols = await query(
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
      AND t.TABLE_NAME   = c.TABLE_NAME
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

  // Fetch FK edges where either the source or target column name matches the pattern.
  // This covers: the matched column is an FK source (points outward) OR an FK target (referenced by others).
  const fks = await query(
    `SELECT
       fk.name          AS fk_name,
       sch_p.name       AS parent_schema,
       tab_p.name       AS parent_table,
       col_p.name       AS parent_column,
       sch_r.name       AS ref_schema,
       tab_r.name       AS ref_table,
       col_r.name       AS ref_column
     FROM [${dbName}].sys.foreign_keys fk
     JOIN [${dbName}].sys.foreign_key_columns fkc
       ON fk.object_id = fkc.constraint_object_id
     JOIN [${dbName}].sys.tables  tab_p ON fkc.parent_object_id     = tab_p.object_id
     JOIN [${dbName}].sys.schemas sch_p ON tab_p.schema_id          = sch_p.schema_id
     JOIN [${dbName}].sys.columns col_p ON fkc.parent_object_id     = col_p.object_id
                                       AND fkc.parent_column_id     = col_p.column_id
     JOIN [${dbName}].sys.tables  tab_r ON fkc.referenced_object_id = tab_r.object_id
     JOIN [${dbName}].sys.schemas sch_r ON tab_r.schema_id          = sch_r.schema_id
     JOIN [${dbName}].sys.columns col_r ON fkc.referenced_object_id = col_r.object_id
                                       AND fkc.referenced_column_id = col_r.column_id
     WHERE col_p.name LIKE @pattern
        OR col_r.name LIKE @pattern`,
    { pattern: likePattern }
  );

  return { rows: cols.recordset, fks: fks.recordset };
}

// Build FK role strings for a specific (schema, table, column) occurrence.
// Returns an array of short notation strings, e.g.:
//   "→ dbo.Orders(order_id)"   — this column is an FK source pointing outward
//   "← dbo.Lines(order_id)"   — this column is referenced by another table's FK
function fkRoles(fks, schema, table, column) {
  const roles = [];
  for (const f of fks) {
    if (f.parent_schema === schema && f.parent_table === table && f.parent_column === column) {
      roles.push(`→ \`${f.ref_schema}.${f.ref_table}(${f.ref_column})\``);
    }
    if (f.ref_schema === schema && f.ref_table === table && f.ref_column === column) {
      roles.push(`← \`${f.parent_schema}.${f.parent_table}(${f.parent_column})\``);
    }
  }
  return roles;
}

function render(globPattern, likePattern, outPath, dbResults) {
  // Flatten all column hits tagged with their source db and its FK list
  const all = [];
  for (const { db, rows, fks } of dbResults) {
    for (const row of rows) {
      all.push({ db, fks, ...row });
    }
  }

  // Group by column name (case-insensitive key, first-seen casing as display name)
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
  out.push(`_Output: \`${path.relative(ROOT, outPath)}\`_`);
  out.push('');
  out.push(
    `Pattern \`${globPattern}\` (SQL LIKE: \`${likePattern}\`) — ` +
    `**${groups.length}** distinct column name${groups.length === 1 ? '' : 's'}, ` +
    `**${all.length}** occurrence${all.length === 1 ? '' : 's'} ` +
    `across **${dbCount}** database${dbCount === 1 ? '' : 's'}.`
  );
  out.push('');
  out.push('FK role key: `→ target` = this column is an FK source pointing outward; `← source` = this column is referenced by another table\'s FK.');
  out.push('');
  out.push('_LIKE matching respects the database collation (typically case-insensitive on Azure SQL)._');
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
    const anchor = g.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    out.push(`| [\`${g.name}\`](#${anchor}) | ${g.rows.length} | ${dbs} |`);
  }
  out.push('');

  // Per-column sections
  for (const g of groups) {
    out.push(`## \`${g.name}\``);
    out.push('');
    out.push('| Database | Schema | Table / View | Type | Nullable | PK | FK role | Object |');
    out.push('|----------|--------|--------------|------|----------|----|---------|--------|');
    for (const r of g.rows) {
      const typeLabel = r.TABLE_TYPE === 'VIEW' ? 'view' : 'table';
      const link = `[\`${r.TABLE_SCHEMA}.${r.TABLE_NAME}\`](${tableLink(r.db, r.TABLE_SCHEMA, r.TABLE_NAME)})`;
      const roles = fkRoles(r.fks, r.TABLE_SCHEMA, r.TABLE_NAME, r.COLUMN_NAME);
      const roleCell = roles.length ? roles.join('<br>') : '';
      out.push(
        `| \`${r.db}\` | \`${r.TABLE_SCHEMA}\` | ${link} | ${formatType(r)} | ${r.IS_NULLABLE} | ${r.IS_PK} | ${roleCell} | ${typeLabel} |`
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
  const outPath = path.join(DOCS_DIR, `column-inventory-${patternToSlug(globPattern)}.md`);
  console.log(`Pattern: "${globPattern}" → SQL LIKE: "${likePattern}"`);
  console.log(`Output:  ${outPath}`);

  try {
    const dbs = await listUserDatabases();
    console.log(`Scanning ${dbs.length} database(s): ${dbs.join(', ') || '(none)'}`);

    const dbResults = [];
    let total = 0;
    for (const db of dbs) {
      try {
        const { rows, fks } = await findColumns(db, likePattern);
        dbResults.push({ db, rows, fks });
        total += rows.length;
        console.log(`  ${db}: ${rows.length} match${rows.length === 1 ? '' : 'es'}, ${fks.length} FK edge${fks.length === 1 ? '' : 's'}`);
      } catch (e) {
        dbResults.push({ db, rows: [], fks: [], error: e.message });
        console.error(`  ${db}: ERROR — ${e.message}`);
      }
    }

    if (!fs.existsSync(DOCS_DIR)) fs.mkdirSync(DOCS_DIR, { recursive: true });
    const md = render(globPattern, likePattern, outPath, dbResults);
    fs.writeFileSync(outPath, md);
    console.log(`\nWrote ${outPath}  (${total} total occurrences)`);
  } catch (e) {
    console.error('Column inventory failed:', e.message);
    process.exitCode = 1;
  } finally {
    await close();
  }
})();
