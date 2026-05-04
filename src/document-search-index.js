require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { query, close } = require('./db');

const ROOT = path.join(__dirname, '..');
const OUT_PATH = path.join(ROOT, 'docs', 'search-index.json');
const DESCRIPTIONS_PATH = path.join(ROOT, 'descriptions.json');

function mkdirp(p) { fs.mkdirSync(p, { recursive: true }); }

function safeSegment(s) {
  return String(s).replace(/[^A-Za-z0-9._-]/g, '_');
}

function loadDescriptions() {
  if (!fs.existsSync(DESCRIPTIONS_PATH)) return { objects: new Map(), columns: new Map() };
  const raw = JSON.parse(fs.readFileSync(DESCRIPTIONS_PATH, 'utf8'));
  const objects = new Map();
  const columns = new Map();
  for (const [k, v] of Object.entries(raw)) {
    if (k.startsWith('_') || typeof v !== 'string' || !v.trim()) continue;
    const parts = k.split('.');
    if (parts.length === 3) {
      objects.set(k, v.trim());
    } else if (parts.length === 4) {
      const objKey = `${parts[0]}.${parts[1]}.${parts[2]}`;
      if (!columns.has(objKey)) columns.set(objKey, new Map());
      columns.get(objKey).set(parts[3], v.trim());
    }
  }
  return { objects, columns };
}

async function listUserDatabases() {
  const r = await query(
    "SELECT name FROM sys.databases WHERE database_id > 4 AND state_desc = 'ONLINE' ORDER BY name"
  );
  return r.recordset.map((row) => row.name);
}

async function getSearchData(dbName) {
  // Tables and views
  const tables = await query(`
    SELECT t.TABLE_SCHEMA, t.TABLE_NAME, t.TABLE_TYPE,
           COALESCE(rc.row_count, 0) AS row_count
    FROM [${dbName}].INFORMATION_SCHEMA.TABLES t
    LEFT JOIN (
      SELECT sch.name AS schema_name, tab.name AS table_name, SUM(p.rows) AS row_count
      FROM [${dbName}].sys.tables tab
      JOIN [${dbName}].sys.schemas sch ON tab.schema_id = sch.schema_id
      JOIN [${dbName}].sys.partitions p ON tab.object_id = p.object_id AND p.index_id IN (0, 1)
      GROUP BY sch.name, tab.name
    ) rc ON rc.schema_name = t.TABLE_SCHEMA AND rc.table_name = t.TABLE_NAME
    WHERE t.TABLE_TYPE IN ('BASE TABLE', 'VIEW')
    ORDER BY t.TABLE_SCHEMA, t.TABLE_NAME
  `);

  // Columns with PK flag
  const columns = await query(`
    SELECT
      c.TABLE_SCHEMA, c.TABLE_NAME, c.COLUMN_NAME,
      c.DATA_TYPE, c.CHARACTER_MAXIMUM_LENGTH,
      c.NUMERIC_PRECISION, c.NUMERIC_SCALE,
      c.IS_NULLABLE, c.ORDINAL_POSITION,
      CASE WHEN pk.COLUMN_NAME IS NOT NULL THEN 1 ELSE 0 END AS IS_PK
    FROM [${dbName}].INFORMATION_SCHEMA.COLUMNS c
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
    ORDER BY c.TABLE_SCHEMA, c.TABLE_NAME, c.ORDINAL_POSITION
  `);

  return { tables: tables.recordset, columns: columns.recordset };
}

function formatType(c) {
  if (c.CHARACTER_MAXIMUM_LENGTH != null) {
    const len = c.CHARACTER_MAXIMUM_LENGTH === -1 ? 'max' : c.CHARACTER_MAXIMUM_LENGTH;
    return `${c.DATA_TYPE}(${len})`;
  }
  if (['decimal', 'numeric'].includes(c.DATA_TYPE)) {
    return `${c.DATA_TYPE}(${c.NUMERIC_PRECISION},${c.NUMERIC_SCALE})`;
  }
  return c.DATA_TYPE;
}

(async () => {
  try {
    const descs = loadDescriptions();
    console.log(`Loaded ${descs.objects.size} object descriptions, ${descs.columns.size} column description sets`);

    const dbs = await listUserDatabases();
    console.log(`Found ${dbs.length} database(s): ${dbs.join(', ')}`);

    const objects = [];
    for (const db of dbs) {
      try {
        const { tables, columns } = await getSearchData(db);

        // Index columns by schema.table for fast lookup
        const colsByTable = new Map();
        for (const c of columns) {
          const key = `${c.TABLE_SCHEMA}.${c.TABLE_NAME}`;
          if (!colsByTable.has(key)) colsByTable.set(key, []);
          colsByTable.get(key).push(c);
        }

        for (const t of tables) {
          const objKey = `${db}.${t.TABLE_SCHEMA}.${t.TABLE_NAME}`;
          const colKey = objKey;
          const tableCols = colsByTable.get(`${t.TABLE_SCHEMA}.${t.TABLE_NAME}`) || [];
          const colDescs = descs.columns.get(colKey) || new Map();

          objects.push({
            db,
            schema:      t.TABLE_SCHEMA,
            name:        t.TABLE_NAME,
            type:        t.TABLE_TYPE === 'VIEW' ? 'view' : 'table',
            description: descs.objects.get(objKey) || null,
            path:        `docs/tables/${safeSegment(db)}/${safeSegment(t.TABLE_SCHEMA)}.${safeSegment(t.TABLE_NAME)}.md`,
            rowCount:    t.TABLE_TYPE === 'BASE TABLE' ? (t.row_count || 0) : null,
            columns: tableCols.map((c) => ({
              name:        c.COLUMN_NAME,
              type:        formatType(c),
              nullable:    c.IS_NULLABLE === 'YES',
              pk:          c.IS_PK === 1,
              description: colDescs.get(c.COLUMN_NAME) || null,
            })),
          });
        }
        console.log(`  ${db}: ${tables.length} objects`);
      } catch (e) {
        console.error(`  ${db}: ERROR — ${e.message}`);
      }
    }

    const output = {
      generated: new Date().toISOString(),
      server:    process.env.DB_SERVER || null,
      objects,
    };

    mkdirp(path.join(ROOT, 'docs'));
    fs.writeFileSync(OUT_PATH, JSON.stringify(output, null, 2));
    console.log(`\nWrote ${OUT_PATH}  (${objects.length} objects)`);
  } catch (e) {
    console.error('Search index failed:', e.message);
    process.exitCode = 1;
  } finally {
    await close();
  }
})();
