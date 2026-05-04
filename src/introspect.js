require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { query, close } = require('./db');

const ROOT = path.join(__dirname, '..');
const SCHEMA_MD_PATH = path.join(ROOT, 'SCHEMA.md');
const TABLES_DIR = path.join(ROOT, 'docs', 'tables');

function safeSegment(s) {
  return String(s).replace(/[^A-Za-z0-9._-]/g, '_');
}

function tableFile(dbName, schema, table) {
  return path.join(TABLES_DIR, safeSegment(dbName), `${safeSegment(schema)}.${safeSegment(table)}.md`);
}

function tableLinkFromRoot(dbName, schema, table) {
  return `docs/tables/${safeSegment(dbName)}/${safeSegment(schema)}.${safeSegment(table)}.md`;
}

function tableLinkFromDbIndex(schema, table) {
  return `${safeSegment(schema)}.${safeSegment(table)}.md`;
}

async function listUserDatabases() {
  const r = await query(
    "SELECT name FROM sys.databases WHERE database_id > 4 AND state_desc = 'ONLINE' ORDER BY name"
  );
  return r.recordset.map((row) => row.name);
}

async function inspectDatabase(dbName) {
  const tables = await query(`
    SELECT TABLE_SCHEMA, TABLE_NAME, TABLE_TYPE
    FROM [${dbName}].INFORMATION_SCHEMA.TABLES
    WHERE TABLE_TYPE IN ('BASE TABLE','VIEW')
    ORDER BY TABLE_SCHEMA, TABLE_NAME
  `);
  const columns = await query(`
    SELECT TABLE_SCHEMA, TABLE_NAME, COLUMN_NAME, ORDINAL_POSITION, DATA_TYPE,
           CHARACTER_MAXIMUM_LENGTH, NUMERIC_PRECISION, NUMERIC_SCALE,
           IS_NULLABLE, COLUMN_DEFAULT
    FROM [${dbName}].INFORMATION_SCHEMA.COLUMNS
    ORDER BY TABLE_SCHEMA, TABLE_NAME, ORDINAL_POSITION
  `);
  const pks = await query(`
    SELECT kcu.TABLE_SCHEMA, kcu.TABLE_NAME, kcu.COLUMN_NAME, kcu.ORDINAL_POSITION,
           tc.CONSTRAINT_NAME
    FROM [${dbName}].INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
    JOIN [${dbName}].INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu
      ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
     AND tc.TABLE_SCHEMA  = kcu.TABLE_SCHEMA
    WHERE tc.CONSTRAINT_TYPE = 'PRIMARY KEY'
    ORDER BY kcu.TABLE_SCHEMA, kcu.TABLE_NAME, kcu.ORDINAL_POSITION
  `);
  const fks = await query(`
    SELECT
      fk.name AS fk_name,
      sch_p.name AS parent_schema, tab_p.name AS parent_table, col_p.name AS parent_column,
      sch_r.name AS ref_schema,    tab_r.name AS ref_table,    col_r.name AS ref_column,
      fk.delete_referential_action_desc AS on_delete,
      fk.update_referential_action_desc AS on_update,
      fkc.constraint_column_id
    FROM [${dbName}].sys.foreign_keys fk
    JOIN [${dbName}].sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
    JOIN [${dbName}].sys.tables   tab_p ON fkc.parent_object_id = tab_p.object_id
    JOIN [${dbName}].sys.schemas  sch_p ON tab_p.schema_id = sch_p.schema_id
    JOIN [${dbName}].sys.columns  col_p ON fkc.parent_object_id = col_p.object_id AND fkc.parent_column_id = col_p.column_id
    JOIN [${dbName}].sys.tables   tab_r ON fkc.referenced_object_id = tab_r.object_id
    JOIN [${dbName}].sys.schemas  sch_r ON tab_r.schema_id = sch_r.schema_id
    JOIN [${dbName}].sys.columns  col_r ON fkc.referenced_object_id = col_r.object_id AND fkc.referenced_column_id = col_r.column_id
    ORDER BY parent_schema, parent_table, fk.name, fkc.constraint_column_id
  `);
  const indexes = await query(`
    SELECT sch.name AS schema_name, t.name AS table_name, i.name AS index_name,
           i.is_unique, i.is_primary_key, i.type_desc,
           c.name AS column_name, ic.key_ordinal, ic.is_included_column
    FROM [${dbName}].sys.indexes i
    JOIN [${dbName}].sys.tables  t   ON i.object_id = t.object_id
    JOIN [${dbName}].sys.schemas sch ON t.schema_id = sch.schema_id
    JOIN [${dbName}].sys.index_columns ic ON i.object_id = ic.object_id AND i.index_id = ic.index_id
    JOIN [${dbName}].sys.columns c  ON ic.object_id = c.object_id AND ic.column_id = c.column_id
    WHERE i.type > 0 AND i.is_hypothetical = 0
    ORDER BY schema_name, table_name, index_name, ic.is_included_column, ic.key_ordinal
  `);
  const procs = await query(`
    SELECT ROUTINE_SCHEMA, ROUTINE_NAME, ROUTINE_TYPE, DATA_TYPE
    FROM [${dbName}].INFORMATION_SCHEMA.ROUTINES
    ORDER BY ROUTINE_SCHEMA, ROUTINE_NAME
  `);
  const rowCounts = await query(`
    SELECT sch.name AS schema_name, t.name AS table_name, SUM(p.rows) AS row_count
    FROM [${dbName}].sys.tables t
    JOIN [${dbName}].sys.schemas sch ON t.schema_id = sch.schema_id
    JOIN [${dbName}].sys.partitions p ON t.object_id = p.object_id AND p.index_id IN (0,1)
    GROUP BY sch.name, t.name
    ORDER BY sch.name, t.name
  `);
  return {
    tables: tables.recordset,
    columns: columns.recordset,
    pks: pks.recordset,
    fks: fks.recordset,
    indexes: indexes.recordset,
    procs: procs.recordset,
    rowCounts: rowCounts.recordset,
  };
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

function mkdirp(p) {
  fs.mkdirSync(p, { recursive: true });
}

function renderTablePage(dbName, t, info, knownTables) {
  const schema = t.TABLE_SCHEMA;
  const table = t.TABLE_NAME;
  const fq = `${schema}.${table}`;
  const kind = t.TABLE_TYPE === 'VIEW' ? 'View' : 'Table';
  const rc = info.rowCounts.find((r) => r.schema_name === schema && r.table_name === table);

  const out = [];
  out.push(`# ${kind}: \`${fq}\``);
  out.push('');
  out.push(`**Database:** \`${dbName}\` &nbsp;|&nbsp; **Schema:** \`${schema}\``);
  if (rc) out.push(`**Approx rows:** ${rc.row_count}`);
  out.push('');
  out.push('[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)');
  out.push('');

  out.push('## Columns');
  out.push('');
  const cols = info.columns.filter((c) => c.TABLE_SCHEMA === schema && c.TABLE_NAME === table);
  const pkCols = new Set(
    info.pks
      .filter((p) => p.TABLE_SCHEMA === schema && p.TABLE_NAME === table)
      .map((p) => p.COLUMN_NAME)
  );
  out.push('| # | Column | Type | Nullable | Default | PK |');
  out.push('|---|--------|------|----------|---------|----|');
  for (const c of cols) {
    out.push(
      `| ${c.ORDINAL_POSITION} | \`${c.COLUMN_NAME}\` | ${formatType(c)} | ${c.IS_NULLABLE} | ${
        c.COLUMN_DEFAULT ? '`' + c.COLUMN_DEFAULT + '`' : ''
      } | ${pkCols.has(c.COLUMN_NAME) ? 'YES' : ''} |`
    );
  }
  out.push('');

  const outgoing = info.fks.filter(
    (f) => f.parent_schema === schema && f.parent_table === table
  );
  out.push('## Foreign keys (outgoing)');
  out.push('');
  if (outgoing.length === 0) {
    out.push('_None._');
  } else {
    out.push('| Name | Column | References | On Delete | On Update |');
    out.push('|------|--------|------------|-----------|-----------|');
    for (const f of outgoing) {
      const refKey = `${f.ref_schema}.${f.ref_table}`;
      const refLabel = `\`${f.ref_schema}.${f.ref_table}.${f.ref_column}\``;
      const refLinked = knownTables.has(refKey)
        ? `[${refLabel}](${tableLinkFromDbIndex(f.ref_schema, f.ref_table)})`
        : refLabel;
      out.push(
        `| \`${f.fk_name}\` | \`${f.parent_column}\` | ${refLinked} | ${f.on_delete} | ${f.on_update} |`
      );
    }
  }
  out.push('');

  const incoming = info.fks.filter(
    (f) => f.ref_schema === schema && f.ref_table === table
  );
  out.push('## Referenced by (incoming foreign keys)');
  out.push('');
  if (incoming.length === 0) {
    out.push('_None._');
  } else {
    out.push('| From | Column | Targets | On Delete | On Update |');
    out.push('|------|--------|---------|-----------|-----------|');
    for (const f of incoming) {
      const fromKey = `${f.parent_schema}.${f.parent_table}`;
      const fromLabel = `\`${f.parent_schema}.${f.parent_table}\``;
      const fromLinked = knownTables.has(fromKey)
        ? `[${fromLabel}](${tableLinkFromDbIndex(f.parent_schema, f.parent_table)})`
        : fromLabel;
      out.push(
        `| ${fromLinked} | \`${f.parent_column}\` | \`${f.ref_column}\` | ${f.on_delete} | ${f.on_update} |`
      );
    }
  }
  out.push('');

  const tableIdx = info.indexes.filter(
    (i) => i.schema_name === schema && i.table_name === table && !i.is_primary_key
  );
  out.push('## Indexes');
  out.push('');
  if (tableIdx.length === 0) {
    out.push('_No non-PK indexes._');
  } else {
    const grouped = new Map();
    for (const i of tableIdx) {
      if (!grouped.has(i.index_name))
        grouped.set(i.index_name, { unique: i.is_unique, type: i.type_desc, keys: [], inc: [] });
      const g = grouped.get(i.index_name);
      (i.is_included_column ? g.inc : g.keys).push(i.column_name);
    }
    out.push('| Name | Unique | Type | Columns | Included |');
    out.push('|------|--------|------|---------|----------|');
    for (const [name, g] of grouped) {
      out.push(
        `| \`${name}\` | ${g.unique ? 'YES' : 'no'} | ${g.type} | ${g.keys.map((k) => '`' + k + '`').join(', ')} | ${g.inc.map((k) => '`' + k + '`').join(', ')} |`
      );
    }
  }
  out.push('');

  return out.join('\n');
}

function renderDbIndex(dbName, info) {
  const out = [];
  out.push(`# Database: \`${dbName}\``);
  out.push('');
  out.push('[← back to top](../../../SCHEMA.md)');
  out.push('');
  if (info.tables.length === 0) {
    out.push('_No user tables or views._');
    return out.join('\n');
  }
  const rcMap = new Map(
    info.rowCounts.map((r) => [`${r.schema_name}.${r.table_name}`, r.row_count])
  );
  const bySchema = new Map();
  for (const t of info.tables) {
    if (!bySchema.has(t.TABLE_SCHEMA)) bySchema.set(t.TABLE_SCHEMA, []);
    bySchema.get(t.TABLE_SCHEMA).push(t);
  }
  for (const [schema, tables] of bySchema) {
    out.push(`## Schema: \`${schema}\``);
    out.push('');
    out.push('| Object | Type | Rows |');
    out.push('|--------|------|------|');
    for (const t of tables) {
      const rc = rcMap.get(`${schema}.${t.TABLE_NAME}`);
      out.push(
        `| [\`${schema}.${t.TABLE_NAME}\`](${tableLinkFromDbIndex(schema, t.TABLE_NAME)}) | ${t.TABLE_TYPE} | ${rc ?? ''} |`
      );
    }
    out.push('');
  }
  if (info.procs.length) {
    out.push('## Routines');
    out.push('');
    out.push('| Schema | Name | Type | Returns |');
    out.push('|--------|------|------|---------|');
    for (const p of info.procs) {
      out.push(
        `| \`${p.ROUTINE_SCHEMA}\` | \`${p.ROUTINE_NAME}\` | ${p.ROUTINE_TYPE} | ${p.DATA_TYPE || ''} |`
      );
    }
    out.push('');
  }
  return out.join('\n');
}

function writeDatabaseDocs(dbName, info) {
  const dir = path.join(TABLES_DIR, safeSegment(dbName));
  mkdirp(dir);

  const knownTables = new Set(info.tables.map((t) => `${t.TABLE_SCHEMA}.${t.TABLE_NAME}`));

  for (const t of info.tables) {
    const md = renderTablePage(dbName, t, info, knownTables);
    fs.writeFileSync(tableFile(dbName, t.TABLE_SCHEMA, t.TABLE_NAME), md);
  }
  fs.writeFileSync(path.join(dir, 'README.md'), renderDbIndex(dbName, info));
}

function renderRootSchema(dbsInfo) {
  const out = [];
  out.push('# Database Schema');
  out.push('');
  out.push(`_Generated on ${new Date().toISOString()}_`);
  out.push('');
  out.push(`**Server:** \`${process.env.DB_SERVER}\``);
  out.push(`**Default database:** \`${process.env.DB_DATABASE}\``);
  out.push('');

  if (dbsInfo.length === 0) {
    out.push('> Connected successfully, but only system databases are present.');
    out.push('> Set `DB_DATABASE` to a user database in `.env` and re-run.');
    return out.join('\n');
  }

  out.push('## Databases');
  out.push('');
  for (const { db, info, error } of dbsInfo) {
    if (error) {
      out.push(`### \`${db}\``);
      out.push('');
      out.push(`_Error inspecting: ${error}_`);
      out.push('');
      continue;
    }
    out.push(`### [\`${db}\`](docs/tables/${safeSegment(db)}/README.md)`);
    out.push('');
    out.push(`Tables / views: **${info.tables.length}**, routines: **${info.procs.length}**`);
    out.push('');
    if (info.tables.length === 0) {
      out.push('_No user tables or views._');
      out.push('');
      continue;
    }
    out.push('| Object | Type | Rows |');
    out.push('|--------|------|------|');
    const rcMap = new Map(
      info.rowCounts.map((r) => [`${r.schema_name}.${r.table_name}`, r.row_count])
    );
    for (const t of info.tables) {
      const rc = rcMap.get(`${t.TABLE_SCHEMA}.${t.TABLE_NAME}`);
      out.push(
        `| [\`${t.TABLE_SCHEMA}.${t.TABLE_NAME}\`](${tableLinkFromRoot(db, t.TABLE_SCHEMA, t.TABLE_NAME)}) | ${t.TABLE_TYPE} | ${rc ?? ''} |`
      );
    }
    out.push('');
  }
  return out.join('\n');
}

(async () => {
  try {
    const dbs = await listUserDatabases();
    console.log(`Found ${dbs.length} user database(s): ${dbs.join(', ') || '(none)'}`);

    if (fs.existsSync(TABLES_DIR)) {
      fs.rmSync(TABLES_DIR, { recursive: true, force: true });
    }
    mkdirp(TABLES_DIR);

    const dbsInfo = [];
    for (const db of dbs) {
      try {
        const info = await inspectDatabase(db);
        writeDatabaseDocs(db, info);
        dbsInfo.push({ db, info });
        console.log(`  ${db}: ${info.tables.length} tables/views written`);
      } catch (e) {
        dbsInfo.push({ db, error: e.message });
        console.error(`  ${db}: ERROR ${e.message}`);
      }
    }

    fs.writeFileSync(SCHEMA_MD_PATH, renderRootSchema(dbsInfo));
    console.log(`Wrote ${SCHEMA_MD_PATH} and per-table docs under ${TABLES_DIR}`);
  } catch (e) {
    console.error('Schema introspection failed:', e.message);
    process.exitCode = 1;
  } finally {
    await close();
  }
})();
