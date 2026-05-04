require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { query, close } = require('./db');

const OUTPUT_PATH = path.join(__dirname, '..', 'SCHEMA.md');

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
      fk.update_referential_action_desc AS on_update
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
  const views = await query(`
    SELECT TABLE_SCHEMA, TABLE_NAME
    FROM [${dbName}].INFORMATION_SCHEMA.VIEWS
    ORDER BY TABLE_SCHEMA, TABLE_NAME
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
    views: views.recordset,
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

function renderDatabase(dbName, info) {
  const out = [];
  out.push(`## Database: \`${dbName}\``);
  out.push('');

  const tablesBySchema = new Map();
  for (const t of info.tables) {
    const key = t.TABLE_SCHEMA;
    if (!tablesBySchema.has(key)) tablesBySchema.set(key, []);
    tablesBySchema.get(key).push(t);
  }

  if (info.tables.length === 0) {
    out.push('_No user tables or views._');
    out.push('');
    return out.join('\n');
  }

  out.push(`**Tables / Views:** ${info.tables.length}`);
  out.push('');

  const rowCountKey = (s, t) => `${s}.${t}`;
  const rowCountMap = new Map(
    info.rowCounts.map((r) => [rowCountKey(r.schema_name, r.table_name), r.row_count])
  );

  for (const [schema, tables] of tablesBySchema) {
    out.push(`### Schema: \`${schema}\``);
    out.push('');
    for (const t of tables) {
      const fq = `${schema}.${t.TABLE_NAME}`;
      const kind = t.TABLE_TYPE === 'VIEW' ? 'View' : 'Table';
      const rc = rowCountMap.get(rowCountKey(schema, t.TABLE_NAME));
      out.push(`#### ${kind}: \`${fq}\`${rc != null ? ` (rows: ${rc})` : ''}`);
      out.push('');

      const cols = info.columns.filter(
        (c) => c.TABLE_SCHEMA === schema && c.TABLE_NAME === t.TABLE_NAME
      );
      const pkCols = new Set(
        info.pks
          .filter((p) => p.TABLE_SCHEMA === schema && p.TABLE_NAME === t.TABLE_NAME)
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

      const tableFks = info.fks.filter(
        (f) => f.parent_schema === schema && f.parent_table === t.TABLE_NAME
      );
      if (tableFks.length) {
        out.push('**Foreign keys**');
        out.push('');
        out.push('| Name | Column | References | On Delete | On Update |');
        out.push('|------|--------|------------|-----------|-----------|');
        for (const f of tableFks) {
          out.push(
            `| \`${f.fk_name}\` | \`${f.parent_column}\` | \`${f.ref_schema}.${f.ref_table}.${f.ref_column}\` | ${f.on_delete} | ${f.on_update} |`
          );
        }
        out.push('');
      }

      const tableIdx = info.indexes.filter(
        (i) => i.schema_name === schema && i.table_name === t.TABLE_NAME && !i.is_primary_key
      );
      if (tableIdx.length) {
        const grouped = new Map();
        for (const i of tableIdx) {
          if (!grouped.has(i.index_name))
            grouped.set(i.index_name, { unique: i.is_unique, type: i.type_desc, keys: [], inc: [] });
          const g = grouped.get(i.index_name);
          (i.is_included_column ? g.inc : g.keys).push(i.column_name);
        }
        out.push('**Indexes**');
        out.push('');
        out.push('| Name | Unique | Type | Columns | Included |');
        out.push('|------|--------|------|---------|----------|');
        for (const [name, g] of grouped) {
          out.push(
            `| \`${name}\` | ${g.unique ? 'YES' : 'no'} | ${g.type} | ${g.keys.map((k) => '`' + k + '`').join(', ')} | ${g.inc.map((k) => '`' + k + '`').join(', ')} |`
          );
        }
        out.push('');
      }
    }
  }

  if (info.procs.length) {
    out.push('### Routines (procedures / functions)');
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

(async () => {
  try {
    const dbs = await listUserDatabases();
    console.log(`Found ${dbs.length} user database(s): ${dbs.join(', ') || '(none)'}`);

    const sections = [];
    sections.push('# Database Schema');
    sections.push('');
    sections.push(`_Generated on ${new Date().toISOString()}_`);
    sections.push('');
    sections.push(`**Server:** \`${process.env.DB_SERVER}\``);
    sections.push(`**Default database:** \`${process.env.DB_DATABASE}\``);
    sections.push('');
    sections.push(
      `User databases discovered: ${dbs.length === 0 ? '_none_' : dbs.map((d) => '`' + d + '`').join(', ')}`
    );
    sections.push('');

    for (const db of dbs) {
      try {
        const info = await inspectDatabase(db);
        sections.push(renderDatabase(db, info));
      } catch (e) {
        sections.push(`## Database: \`${db}\``);
        sections.push('');
        sections.push(`_Error inspecting: ${e.message}_`);
        sections.push('');
      }
    }

    if (dbs.length === 0) {
      sections.push('> Connected successfully, but only system databases are present.');
      sections.push('> Set `DB_DATABASE` to a user database in `.env` and re-run.');
      sections.push('');
    }

    fs.writeFileSync(OUTPUT_PATH, sections.join('\n'));
    console.log(`Wrote ${OUTPUT_PATH}`);
  } catch (e) {
    console.error('Schema introspection failed:', e.message);
    process.exitCode = 1;
  } finally {
    await close();
  }
})();
