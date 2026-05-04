require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { query, close } = require('./db');

const ROOT = path.join(__dirname, '..');
const SCHEMA_MD_PATH = path.join(ROOT, 'SCHEMA.md');
const TABLES_DIR = path.join(ROOT, 'docs', 'tables');
const DESCRIPTIONS_PATH = path.join(ROOT, 'descriptions.json');

function loadDescriptions() {
  if (!fs.existsSync(DESCRIPTIONS_PATH)) return { objects: new Map(), columns: new Map(), size: 0 };
  const raw = JSON.parse(fs.readFileSync(DESCRIPTIONS_PATH, 'utf8'));
  const objects = new Map(); // "db.schema.name" -> description
  const columns = new Map(); // "db.schema.name" -> Map<column, description>
  let total = 0;
  for (const [k, v] of Object.entries(raw)) {
    if (k.startsWith('_')) continue;
    if (typeof v !== 'string' || !v.trim()) continue;
    const parts = k.split('.');
    if (parts.length === 3) {
      objects.set(k, v.trim());
      total++;
    } else if (parts.length === 4) {
      const objKey = `${parts[0]}.${parts[1]}.${parts[2]}`;
      if (!columns.has(objKey)) columns.set(objKey, new Map());
      columns.get(objKey).set(parts[3], v.trim());
      total++;
    }
  }
  return { objects, columns, size: total };
}

function descriptionFor(descriptions, dbName, schema, name) {
  return descriptions.objects.get(`${dbName}.${schema}.${name}`) || null;
}

function columnDescriptionsFor(descriptions, dbName, schema, name) {
  return descriptions.columns.get(`${dbName}.${schema}.${name}`) || new Map();
}

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
  const viewMeta = await query(`
    SELECT v.TABLE_SCHEMA, v.TABLE_NAME, v.CHECK_OPTION, v.IS_UPDATABLE,
           m.definition AS VIEW_DEFINITION,
           m.is_schema_bound
    FROM [${dbName}].INFORMATION_SCHEMA.VIEWS v
    LEFT JOIN [${dbName}].sys.objects o
      ON o.name = v.TABLE_NAME
     AND SCHEMA_NAME(o.schema_id) = v.TABLE_SCHEMA
     AND o.type = 'V'
    LEFT JOIN [${dbName}].sys.sql_modules m ON m.object_id = o.object_id
    ORDER BY v.TABLE_SCHEMA, v.TABLE_NAME
  `);
  const viewDeps = await query(`
    SELECT DISTINCT
      SCHEMA_NAME(v_obj.schema_id) AS view_schema,
      v_obj.name                   AS view_name,
      d.referenced_schema_name     AS ref_schema,
      d.referenced_entity_name     AS ref_name,
      o_ref.type_desc              AS ref_type
    FROM [${dbName}].sys.objects v_obj
    JOIN [${dbName}].sys.sql_expression_dependencies d ON d.referencing_id = v_obj.object_id
    LEFT JOIN [${dbName}].sys.objects o_ref ON o_ref.object_id = d.referenced_id
    WHERE v_obj.type = 'V'
    ORDER BY view_schema, view_name, ref_schema, ref_name
  `);
  const viewDependents = await query(`
    SELECT DISTINCT
      SCHEMA_NAME(v_obj.schema_id) AS view_schema,
      v_obj.name                   AS view_name,
      SCHEMA_NAME(d_obj.schema_id) AS dependent_schema,
      d_obj.name                   AS dependent_name,
      d_obj.type_desc              AS dependent_type
    FROM [${dbName}].sys.objects v_obj
    JOIN [${dbName}].sys.sql_expression_dependencies d ON d.referenced_id = v_obj.object_id
    JOIN [${dbName}].sys.objects d_obj ON d_obj.object_id = d.referencing_id
    WHERE v_obj.type = 'V'
    ORDER BY view_schema, view_name, dependent_schema, dependent_name
  `);
  const escapedDbName = dbName.replace(/'/g, "''");
  const crossDbDeps = await query(`
    SELECT DISTINCT
      SCHEMA_NAME(v_obj.schema_id) AS view_schema,
      v_obj.name                   AS view_name,
      d.referenced_database_name   AS ref_db,
      d.referenced_schema_name     AS ref_schema,
      d.referenced_entity_name     AS ref_name
    FROM [${dbName}].sys.objects v_obj
    JOIN [${dbName}].sys.sql_expression_dependencies d ON d.referencing_id = v_obj.object_id
    WHERE v_obj.type = 'V'
      AND d.referenced_database_name IS NOT NULL
      AND d.referenced_database_name <> '${escapedDbName}'
    ORDER BY view_schema, view_name, ref_db, ref_schema, ref_name
  `);
  return {
    tables: tables.recordset,
    columns: columns.recordset,
    pks: pks.recordset,
    fks: fks.recordset,
    indexes: indexes.recordset,
    procs: procs.recordset,
    rowCounts: rowCounts.recordset,
    viewMeta: viewMeta.recordset,
    viewDeps: viewDeps.recordset,
    viewDependents: viewDependents.recordset,
    crossDbDeps: crossDbDeps.recordset,
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

function renderColumns(out, cols, pkCols, columnDescs) {
  const hasDescs = columnDescs && columnDescs.size > 0;
  if (hasDescs) {
    out.push('| # | Column | Type | Nullable | Default | PK | Description |');
    out.push('|---|--------|------|----------|---------|----|-------------|');
  } else {
    out.push('| # | Column | Type | Nullable | Default | PK |');
    out.push('|---|--------|------|----------|---------|----|');
  }
  for (const c of cols) {
    const base = `| ${c.ORDINAL_POSITION} | \`${c.COLUMN_NAME}\` | ${formatType(c)} | ${c.IS_NULLABLE} | ${
      c.COLUMN_DEFAULT ? '`' + c.COLUMN_DEFAULT + '`' : ''
    } | ${pkCols.has(c.COLUMN_NAME) ? 'YES' : ''} |`;
    if (hasDescs) {
      const d = (columnDescs.get(c.COLUMN_NAME) || '').replace(/\s+/g, ' ').trim();
      out.push(`${base} ${d} |`);
    } else {
      out.push(base);
    }
  }
  out.push('');
}

function renderViewPage(dbName, t, info, knownTables, descriptions) {
  const schema = t.TABLE_SCHEMA;
  const view = t.TABLE_NAME;
  const fq = `${schema}.${view}`;
  const meta = info.viewMeta.find(
    (v) => v.TABLE_SCHEMA === schema && v.TABLE_NAME === view
  );
  const cols = info.columns.filter((c) => c.TABLE_SCHEMA === schema && c.TABLE_NAME === view);
  const deps = info.viewDeps.filter(
    (d) => d.view_schema === schema && d.view_name === view
  );
  const crossDeps = (info.crossDbDeps || []).filter(
    (d) => d.view_schema === schema && d.view_name === view
  );
  const dependents = info.viewDependents.filter(
    (d) => d.view_schema === schema && d.view_name === view
  );
  const idx = info.indexes.filter(
    (i) => i.schema_name === schema && i.table_name === view && !i.is_primary_key
  );

  const out = [];
  out.push(`# View: \`${fq}\``);
  out.push('');
  out.push(`**Database:** \`${dbName}\` &nbsp;|&nbsp; **Schema:** \`${schema}\``);
  out.push('');
  if (meta) {
    const props = [];
    props.push(`Updatable: \`${meta.IS_UPDATABLE || 'NO'}\``);
    if (meta.CHECK_OPTION && meta.CHECK_OPTION !== 'NONE') {
      props.push(`Check option: \`${meta.CHECK_OPTION}\``);
    }
    if (meta.is_schema_bound) props.push('Schema-bound');
    if (idx.length) props.push('Indexed view');
    out.push(props.join(' &nbsp;|&nbsp; '));
    out.push('');
  }
  out.push('[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)');
  out.push('');

  const desc = descriptionFor(descriptions, dbName, schema, view);
  if (desc) {
    out.push('## Description');
    out.push('');
    out.push(desc);
    out.push('');
  }

  out.push('## Columns');
  out.push('');
  renderColumns(out, cols, new Set(), columnDescriptionsFor(descriptions, dbName, schema, view));

  out.push('## Depends on');
  out.push('');
  if (deps.length === 0 && crossDeps.length === 0) {
    out.push('_None resolved._');
  } else {
    out.push('| Object | Type |');
    out.push('|--------|------|');
    for (const d of deps) {
      const refKey = d.ref_schema ? `${d.ref_schema}.${d.ref_name}` : d.ref_name;
      const label = `\`${refKey}\``;
      const linked = d.ref_schema && knownTables.has(refKey)
        ? `[${label}](${tableLinkFromDbIndex(d.ref_schema, d.ref_name)})`
        : label;
      out.push(`| ${linked} | ${d.ref_type || 'unresolved'} |`);
    }
    for (const d of crossDeps) {
      const fq = `${d.ref_db}.${d.ref_schema || 'dbo'}.${d.ref_name}`;
      const link = `../${safeSegment(d.ref_db)}/${safeSegment(d.ref_schema || 'dbo')}.${safeSegment(d.ref_name)}.md`;
      out.push(`| [\`${fq}\`](${link}) | cross-database |`);
    }
  }
  out.push('');

  out.push('## Used by');
  out.push('');
  if (dependents.length === 0) {
    out.push('_No other objects reference this view._');
  } else {
    out.push('| Object | Type |');
    out.push('|--------|------|');
    for (const d of dependents) {
      const fromKey = `${d.dependent_schema}.${d.dependent_name}`;
      const label = `\`${fromKey}\``;
      const linked = knownTables.has(fromKey)
        ? `[${label}](${tableLinkFromDbIndex(d.dependent_schema, d.dependent_name)})`
        : label;
      out.push(`| ${linked} | ${d.dependent_type} |`);
    }
  }
  out.push('');

  if (idx.length) {
    out.push('## Indexes');
    out.push('');
    const grouped = new Map();
    for (const i of idx) {
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
    out.push('');
  }

  out.push('## Definition');
  out.push('');
  if (meta && meta.VIEW_DEFINITION) {
    out.push('```sql');
    out.push(meta.VIEW_DEFINITION.trim());
    out.push('```');
  } else {
    out.push('_Definition not available (view may be encrypted, or insufficient permissions)._');
  }
  out.push('');

  return out.join('\n');
}

function renderTablePage(dbName, t, info, knownTables, descriptions) {
  const schema = t.TABLE_SCHEMA;
  const table = t.TABLE_NAME;
  const fq = `${schema}.${table}`;
  const rc = info.rowCounts.find((r) => r.schema_name === schema && r.table_name === table);

  const out = [];
  out.push(`# Table: \`${fq}\``);
  out.push('');
  out.push(`**Database:** \`${dbName}\` &nbsp;|&nbsp; **Schema:** \`${schema}\``);
  if (rc) out.push(`**Approx rows:** ${rc.row_count}`);
  out.push('');
  out.push('[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)');
  out.push('');

  const desc = descriptionFor(descriptions, dbName, schema, table);
  if (desc) {
    out.push('## Description');
    out.push('');
    out.push(desc);
    out.push('');
  }

  out.push('## Columns');
  out.push('');
  const cols = info.columns.filter((c) => c.TABLE_SCHEMA === schema && c.TABLE_NAME === table);
  const pkCols = new Set(
    info.pks
      .filter((p) => p.TABLE_SCHEMA === schema && p.TABLE_NAME === table)
      .map((p) => p.COLUMN_NAME)
  );
  renderColumns(out, cols, pkCols, columnDescriptionsFor(descriptions, dbName, schema, table));

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

function shortDesc(d) {
  if (!d) return '';
  const oneLine = d.replace(/\s+/g, ' ').trim();
  return oneLine.length > 160 ? oneLine.slice(0, 157) + '…' : oneLine;
}

const DOMAIN_INDEX_DBS = new Set(['EDS']);
const DOMAINS = [
  { key: 'bid',         label: 'Bid',         match: (n) => /Bid/.test(n) },
  { key: 'msrp',        label: 'MSRP',        match: (n) => /MSRP/.test(n) },
  { key: 'po',          label: 'PO',          match: (n) =>
      /^PO[A-Z]/.test(n) || /^vw_PO[A-Z]/.test(n) || /OrderBook/i.test(n) || /VendorPO/.test(n) },
  { key: 'vendor',      label: 'Vendor',      match: (n) => /Vendor/.test(n) },
  { key: 'requisition', label: 'Requisition', match: (n) =>
      /Requisition/i.test(n) || /(^|_)Req(?=[A-Z])/.test(n) || /^vw_Approve/.test(n) },
];

function writeDomainIndexes(dbName, info, descriptions) {
  if (!DOMAIN_INDEX_DBS.has(dbName)) return [];
  const dir = path.join(TABLES_DIR, safeSegment(dbName));
  const views = info.tables.filter((t) => t.TABLE_TYPE === 'VIEW');
  const written = [];
  for (const dom of DOMAINS) {
    const matched = views.filter((v) => dom.match(v.TABLE_NAME));
    if (matched.length === 0) continue;
    const out = [];
    out.push(`# ${dom.label} Views — \`${dbName}\``);
    out.push('');
    out.push('[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)');
    out.push('');
    out.push(`${matched.length} view${matched.length === 1 ? '' : 's'} matched the **${dom.label}** domain by name.`);
    out.push('A view may appear in more than one domain index (e.g. `vw_VendorBidLookup` is both Bid and Vendor).');
    out.push('');
    out.push('| View | Schema | Description |');
    out.push('|------|--------|-------------|');
    const sorted = matched.slice().sort((a, b) => {
      if (a.TABLE_SCHEMA !== b.TABLE_SCHEMA) return a.TABLE_SCHEMA.localeCompare(b.TABLE_SCHEMA);
      return a.TABLE_NAME.localeCompare(b.TABLE_NAME);
    });
    for (const v of sorted) {
      const desc = shortDesc(descriptionFor(descriptions, dbName, v.TABLE_SCHEMA, v.TABLE_NAME));
      out.push(
        `| [\`${v.TABLE_SCHEMA}.${v.TABLE_NAME}\`](${tableLinkFromDbIndex(v.TABLE_SCHEMA, v.TABLE_NAME)}) | \`${v.TABLE_SCHEMA}\` | ${desc} |`
      );
    }
    out.push('');
    const file = `_domain-${dom.key}.md`;
    fs.writeFileSync(path.join(dir, file), out.join('\n'));
    written.push({ key: dom.key, label: dom.label, file, count: matched.length });
  }
  return written;
}

function renderDbIndex(dbName, info, descriptions, domainIndexes = []) {
  const out = [];
  out.push(`# Database: \`${dbName}\``);
  out.push('');
  out.push('[← back to top](../../../SCHEMA.md)');
  out.push('');
  if (domainIndexes.length) {
    out.push('## Domain indexes');
    out.push('');
    out.push('Curated, name-based groupings of views to make this database easier to navigate. Views may appear in more than one index.');
    out.push('');
    for (const d of domainIndexes) {
      out.push(`- [${d.label}](${d.file}) — ${d.count} view${d.count === 1 ? '' : 's'}`);
    }
    out.push('');
  }
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
  for (const [schema, objects] of bySchema) {
    const tables = objects.filter((o) => o.TABLE_TYPE === 'BASE TABLE');
    const views = objects.filter((o) => o.TABLE_TYPE === 'VIEW');
    out.push(`## Schema: \`${schema}\``);
    out.push('');
    if (tables.length) {
      out.push('### Tables');
      out.push('');
      out.push('| Table | Rows | Description |');
      out.push('|-------|------|-------------|');
      for (const t of tables) {
        const rc = rcMap.get(`${schema}.${t.TABLE_NAME}`);
        const desc = shortDesc(descriptionFor(descriptions, dbName, schema, t.TABLE_NAME));
        out.push(
          `| [\`${schema}.${t.TABLE_NAME}\`](${tableLinkFromDbIndex(schema, t.TABLE_NAME)}) | ${rc ?? ''} | ${desc} |`
        );
      }
      out.push('');
    }
    if (views.length) {
      out.push('### Views');
      out.push('');
      out.push('| View | Description |');
      out.push('|------|-------------|');
      for (const v of views) {
        const desc = shortDesc(descriptionFor(descriptions, dbName, schema, v.TABLE_NAME));
        out.push(
          `| [\`${schema}.${v.TABLE_NAME}\`](${tableLinkFromDbIndex(schema, v.TABLE_NAME)}) | ${desc} |`
        );
      }
      out.push('');
    }
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

function writeDatabaseDocs(dbName, info, descriptions) {
  const dir = path.join(TABLES_DIR, safeSegment(dbName));
  mkdirp(dir);

  const knownTables = new Set(info.tables.map((t) => `${t.TABLE_SCHEMA}.${t.TABLE_NAME}`));

  for (const t of info.tables) {
    const md = t.TABLE_TYPE === 'VIEW'
      ? renderViewPage(dbName, t, info, knownTables, descriptions)
      : renderTablePage(dbName, t, info, knownTables, descriptions);
    fs.writeFileSync(tableFile(dbName, t.TABLE_SCHEMA, t.TABLE_NAME), md);
  }
  const domainIndexes = writeDomainIndexes(dbName, info, descriptions);
  fs.writeFileSync(path.join(dir, 'README.md'), renderDbIndex(dbName, info, descriptions, domainIndexes));
}

function renderCrossDbSection(out, dbsInfo) {
  const edges = [];
  for (const { db, info, error } of dbsInfo) {
    if (error || !info || !info.crossDbDeps) continue;
    for (const d of info.crossDbDeps) {
      edges.push({
        srcDb: db,
        srcSchema: d.view_schema,
        srcName: d.view_name,
        tgtDb: d.ref_db,
        tgtSchema: d.ref_schema || 'dbo',
        tgtName: d.ref_name,
      });
    }
  }
  if (edges.length === 0) return;

  const introspectedDbs = new Set(
    dbsInfo.filter((d) => !d.error && d.info).map((d) => d.db)
  );

  out.push('## Cross-Database Dependencies');
  out.push('');
  out.push(
    'Views that reference objects in another database via 3-part names. ' +
      'Both databases must live on the same instance for these views to resolve. ' +
      `Total edges: **${edges.length}**.`
  );
  out.push('');

  const pairs = new Map();
  for (const e of edges) {
    const key = `${e.srcDb}|>>|${e.tgtDb}`;
    if (!pairs.has(key)) pairs.set(key, []);
    pairs.get(key).push(e);
  }

  const sortedKeys = [...pairs.keys()].sort();
  for (const key of sortedKeys) {
    const [src, tgt] = key.split('|>>|');
    const list = pairs.get(key);
    const distinctSources = new Set(list.map((e) => `${e.srcSchema}.${e.srcName}`));
    out.push(`### \`${src}\` → \`${tgt}\``);
    out.push('');
    out.push(
      `${list.length} edge${list.length === 1 ? '' : 's'} from ${distinctSources.size} source view${
        distinctSources.size === 1 ? '' : 's'
      }${introspectedDbs.has(tgt) ? '' : ' _(target DB not introspected — links may not resolve)_'}.`
    );
    out.push('');

    const bySrc = new Map();
    for (const e of list) {
      const sk = `${e.srcSchema}.${e.srcName}`;
      if (!bySrc.has(sk)) bySrc.set(sk, []);
      bySrc.get(sk).push(`${e.tgtSchema}.${e.tgtName}`);
    }
    out.push(`| Source view in \`${src}\` | Targets in \`${tgt}\` |`);
    out.push('|---|---|');
    const sortedSrc = [...bySrc.keys()].sort();
    for (const sk of sortedSrc) {
      const [sSchema, sName] = sk.split('.');
      const srcLink = `docs/tables/${safeSegment(src)}/${safeSegment(sSchema)}.${safeSegment(sName)}.md`;
      const tgts = [...new Set(bySrc.get(sk))].sort();
      const tgtLinks = tgts.map((t) => {
        if (!introspectedDbs.has(tgt)) return `\`${t}\``;
        const [tSchema, tName] = t.split('.');
        const link = `docs/tables/${safeSegment(tgt)}/${safeSegment(tSchema)}.${safeSegment(tName)}.md`;
        return `[\`${t}\`](${link})`;
      });
      out.push(`| [\`${sk}\`](${srcLink}) | ${tgtLinks.join(', ')} |`);
    }
    out.push('');
  }
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

  renderCrossDbSection(out, dbsInfo);

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
    const tableCount = info.tables.filter((t) => t.TABLE_TYPE === 'BASE TABLE').length;
    const viewCount = info.tables.filter((t) => t.TABLE_TYPE === 'VIEW').length;
    out.push(`### [\`${db}\`](docs/tables/${safeSegment(db)}/README.md)`);
    out.push('');
    out.push(`Tables: **${tableCount}**, views: **${viewCount}**, routines: **${info.procs.length}**`);
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
      const typeLabel = t.TABLE_TYPE === 'VIEW' ? 'view' : 'table';
      out.push(
        `| [\`${t.TABLE_SCHEMA}.${t.TABLE_NAME}\`](${tableLinkFromRoot(db, t.TABLE_SCHEMA, t.TABLE_NAME)}) | ${typeLabel} | ${rc ?? ''} |`
      );
    }
    out.push('');
  }
  return out.join('\n');
}

(async () => {
  try {
    const descriptions = loadDescriptions();
    console.log(`Loaded ${descriptions.size} curated description(s) from descriptions.json`);

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
        writeDatabaseDocs(db, info, descriptions);
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
