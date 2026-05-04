require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { query, close } = require('./db');

const ROOT = path.join(__dirname, '..');
const LOOKUP_DIR = path.join(ROOT, 'docs', 'lookup-data');
const DESCRIPTIONS_PATH = path.join(ROOT, 'descriptions.json');

// Types that can't be rendered as readable text in a markdown table
const SKIP_TYPES = new Set([
  'image', 'text', 'ntext',
  'varbinary', 'binary',
  'xml',
  'geography', 'geometry', 'hierarchyid',
  'sql_variant', 'timestamp',
]);

const DEFAULT_ROW_LIMIT = 500;
const MAX_CELL_LEN = 150; // truncate longer values
const MAX_COLS = 30;      // skip remaining columns if a table is very wide

function parseArgs() {
  let limit = DEFAULT_ROW_LIMIT;
  const args = process.argv.slice(2);
  const idx = args.indexOf('--limit');
  if (idx !== -1 && args[idx + 1]) {
    const parsed = parseInt(args[idx + 1], 10);
    if (!Number.isNaN(parsed) && parsed > 0) limit = parsed;
  }
  return { limit };
}

function safeSegment(s) {
  return String(s).replace(/[^A-Za-z0-9._-]/g, '_');
}

function mkdirp(p) {
  fs.mkdirSync(p, { recursive: true });
}

function fmtRows(n) {
  const num = Number(n);
  if (num >= 1_000_000) return `~${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `~${(num / 1_000).toFixed(0)}K`;
  return String(num);
}

// Escape a cell value for a markdown table.
// NULL → empty string; long values truncated; pipes and newlines escaped.
function escapeMd(val) {
  if (val === null || val === undefined) return '';
  let s = val instanceof Date
    ? val.toISOString().replace('T', ' ').slice(0, 19)
    : String(val);
  if (s.length > MAX_CELL_LEN) s = s.slice(0, MAX_CELL_LEN) + '…';
  s = s.replace(/[\r\n\t]+/g, ' ').trim();
  s = s.replace(/\|/g, '\\|');
  return s;
}

function loadDescriptions() {
  if (!fs.existsSync(DESCRIPTIONS_PATH)) return new Map();
  const raw = JSON.parse(fs.readFileSync(DESCRIPTIONS_PATH, 'utf8'));
  const m = new Map();
  for (const [k, v] of Object.entries(raw)) {
    if (k.startsWith('_')) continue;
    if (typeof v === 'string' && v.trim()) m.set(k, v.trim());
  }
  return m;
}

async function listUserDatabases() {
  const r = await query(
    "SELECT name FROM sys.databases WHERE database_id > 4 AND state_desc = 'ONLINE' ORDER BY name"
  );
  return r.recordset.map((row) => row.name);
}

async function findSmallTables(dbName, rowLimit) {
  const r = await query(`
    SELECT sch.name AS schema_name, t.name AS table_name, SUM(p.rows) AS row_count
    FROM [${dbName}].sys.tables t
    JOIN [${dbName}].sys.schemas sch ON t.schema_id = sch.schema_id
    JOIN [${dbName}].sys.partitions p ON t.object_id = p.object_id AND p.index_id IN (0,1)
    GROUP BY sch.name, t.name
    HAVING SUM(p.rows) <= ${rowLimit}
    ORDER BY sch.name, t.name
  `);
  return r.recordset;
}

async function fetchRenderableColumns(dbName, schema, table) {
  const r = await query(
    `SELECT COLUMN_NAME, DATA_TYPE, ORDINAL_POSITION
     FROM [${dbName}].INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = @schema AND TABLE_NAME = @table
     ORDER BY ORDINAL_POSITION`,
    { schema, table }
  );
  return r.recordset.filter((c) => !SKIP_TYPES.has(c.DATA_TYPE));
}

async function fetchTableData(dbName, schema, table, cols, rowLimit) {
  if (cols.length === 0) return [];
  const colList = cols.slice(0, MAX_COLS).map((c) => `[${c.COLUMN_NAME}]`).join(', ');
  const r = await query(
    `SELECT TOP (${rowLimit}) ${colList} FROM [${dbName}].[${schema}].[${table}]`
  );
  return r.recordset;
}

function renderTablePage(dbName, schema, table, rowCount, cols, rows, descriptions) {
  const visibleCols = cols.slice(0, MAX_COLS);
  const truncatedCols = cols.length > MAX_COLS;
  const desc = descriptions.get(`${dbName}.${schema}.${table}`) || '';

  const out = [];
  out.push(`# Lookup: \`${schema}.${table}\``);
  out.push('');
  out.push(
    `**Database:** \`${dbName}\` &nbsp;|&nbsp; **Rows:** ${fmtRows(rowCount)} &nbsp;|&nbsp; **Generated:** ${new Date().toISOString().slice(0, 10)}`
  );
  out.push('');
  out.push('[← back to index](../README.md)');
  out.push('');

  if (desc) {
    out.push(desc);
    out.push('');
  }

  if (cols.length === 0) {
    out.push('_No renderable columns (all columns are binary, XML, or spatial types)._');
    out.push('');
    return out.join('\n');
  }

  if (truncatedCols) {
    out.push(`> ${cols.length - MAX_COLS} column${cols.length - MAX_COLS === 1 ? '' : 's'} omitted (table has ${cols.length} renderable columns; showing first ${MAX_COLS}).`);
    out.push('');
  }

  if (rows.length === 0) {
    out.push('_Table is empty._');
    out.push('');
    return out.join('\n');
  }

  out.push('| ' + visibleCols.map((c) => c.COLUMN_NAME).join(' | ') + ' |');
  out.push('| ' + visibleCols.map(() => '---').join(' | ') + ' |');
  for (const row of rows) {
    const cells = visibleCols.map((c) => escapeMd(row[c.COLUMN_NAME]));
    out.push('| ' + cells.join(' | ') + ' |');
  }
  out.push('');

  return out.join('\n');
}

function renderRootIndex(dbResults, rowLimit, descriptions) {
  const out = [];
  out.push('# Lookup Data');
  out.push('');
  out.push(`_Generated on ${new Date().toISOString().slice(0, 10)}_`);
  out.push('');
  out.push(
    `Base tables with ≤ **${rowLimit}** rows — reference data, status codes, and lookup values. ` +
    'Run `npm run docs:lookup` to regenerate (destructive to this directory).'
  );
  out.push('');

  const totalPages = dbResults.reduce((n, r) => n + (r.tables ? r.tables.length : 0), 0);
  if (totalPages === 0) {
    out.push(`_No tables found within the ${rowLimit}-row threshold._`);
    return out.join('\n');
  }

  for (const r of dbResults) {
    out.push(`## \`${r.db}\``);
    out.push('');
    if (r.error) {
      out.push(`_Error: ${r.error}_`);
      out.push('');
      continue;
    }
    if (r.tables.length === 0) {
      out.push(`_No tables with ≤ ${rowLimit} rows._`);
      out.push('');
      continue;
    }
    out.push(`${r.tables.length} table${r.tables.length === 1 ? '' : 's'}.`);
    out.push('');
    out.push('| Table | Rows | Description |');
    out.push('|-------|------|-------------|');
    for (const t of r.tables) {
      const desc = descriptions.get(`${r.db}.${t.schema_name}.${t.table_name}`) || '';
      const shortDesc = desc.length > 120 ? desc.slice(0, 117) + '…' : desc;
      const file = `${safeSegment(r.db)}/${safeSegment(t.schema_name)}.${safeSegment(t.table_name)}.md`;
      out.push(
        `| [\`${t.schema_name}.${t.table_name}\`](${file}) | ${fmtRows(t.row_count)} | ${shortDesc} |`
      );
    }
    out.push('');
  }

  return out.join('\n');
}

(async () => {
  const { limit } = parseArgs();
  console.log(`Row limit: ≤ ${limit} rows  (override with: npm run docs:lookup -- --limit N)`);

  try {
    const descriptions = loadDescriptions();
    const dbs = await listUserDatabases();
    console.log(`Found ${dbs.length} database(s): ${dbs.join(', ')}`);

    if (fs.existsSync(LOOKUP_DIR)) {
      fs.rmSync(LOOKUP_DIR, { recursive: true, force: true });
    }
    mkdirp(LOOKUP_DIR);

    const dbResults = [];
    for (const db of dbs) {
      try {
        const tables = await findSmallTables(db, limit);
        console.log(`  ${db}: ${tables.length} table${tables.length === 1 ? '' : 's'} within limit`);

        const dbDir = path.join(LOOKUP_DIR, safeSegment(db));
        if (tables.length > 0) mkdirp(dbDir);

        for (const t of tables) {
          const cols = await fetchRenderableColumns(db, t.schema_name, t.table_name);
          const rows = await fetchTableData(db, t.schema_name, t.table_name, cols, limit);
          const md = renderTablePage(db, t.schema_name, t.table_name, t.row_count, cols, rows, descriptions);
          const filePath = path.join(dbDir, `${safeSegment(t.schema_name)}.${safeSegment(t.table_name)}.md`);
          fs.writeFileSync(filePath, md);
          console.log(
            `    ${t.schema_name}.${t.table_name}: ${rows.length} row${rows.length === 1 ? '' : 's'}, ${cols.length} col${cols.length === 1 ? '' : 's'}`
          );
        }

        dbResults.push({ db, tables });
      } catch (e) {
        dbResults.push({ db, tables: [], error: e.message });
        console.error(`  ${db}: ERROR — ${e.message}`);
      }
    }

    fs.writeFileSync(
      path.join(LOOKUP_DIR, 'README.md'),
      renderRootIndex(dbResults, limit, descriptions)
    );

    const total = dbResults.reduce((n, r) => n + (r.tables ? r.tables.length : 0), 0);
    console.log(`\nWrote docs/lookup-data/ (${total} table page${total === 1 ? '' : 's'} + README)`);
  } catch (e) {
    console.error('Lookup data generation failed:', e.message);
    process.exitCode = 1;
  } finally {
    await close();
  }
})();
