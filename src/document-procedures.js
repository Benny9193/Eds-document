require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { query, close } = require('./db');

const ROOT = path.join(__dirname, '..');
const PROCS_DIR = path.join(ROOT, 'docs', 'procedures');
const DESCRIPTIONS_PATH = path.join(ROOT, 'descriptions.json');

// Load curated descriptions. 3-segment keys (`<db>.<schema>.<name>`) cover
// tables, views, procedures, and functions interchangeably — this generator
// only consumes the routine subset, but the storage format is shared with
// src/introspect.js.
function loadDescriptions() {
  if (!fs.existsSync(DESCRIPTIONS_PATH)) return { objects: new Map(), size: 0 };
  const raw = JSON.parse(fs.readFileSync(DESCRIPTIONS_PATH, 'utf8'));
  const objects = new Map(); // "db.schema.name" -> description
  let total = 0;
  for (const [k, v] of Object.entries(raw)) {
    if (k.startsWith('_')) continue;
    if (typeof v !== 'string' || !v.trim()) continue;
    const parts = k.split('.');
    if (parts.length === 3) {
      objects.set(k, v.trim());
      total++;
    }
  }
  return { objects, size: total };
}

function descriptionFor(descriptions, dbName, schema, name) {
  return descriptions.objects.get(`${dbName}.${schema}.${name}`) || null;
}

function shortDesc(d) {
  if (!d) return '';
  const oneLine = d.replace(/\s+/g, ' ').trim();
  return oneLine.length > 160 ? oneLine.slice(0, 157) + '…' : oneLine;
}

// Databases to document. Adding more is a one-liner; each is validated against
// sys.databases before being bracketed into cross-DB queries.
const DBS = [
  'EDS',
  'Catalogs',
  'ContentCentral',
  'Documents',
  'VendorBids',
  'IDIQ_Platform',
  'ProcurementAnalytics',
  'NJ_RTK',
];

// ---------- helpers (mirrored from src/introspect.js) ----------
function safeSegment(s) {
  return String(s).replace(/[^A-Za-z0-9._-]/g, '_');
}

function mkdirp(p) {
  fs.mkdirSync(p, { recursive: true });
}

function objectFile(dbName, schema, name) {
  return path.join(
    PROCS_DIR,
    safeSegment(dbName),
    `${safeSegment(schema)}.${safeSegment(name)}.md`
  );
}

function objectLinkFromDbIndex(schema, name) {
  return `${safeSegment(schema)}.${safeSegment(name)}.md`;
}

// ---------- queries ----------
async function listUserDatabases() {
  const r = await query(
    "SELECT name FROM sys.databases WHERE database_id > 4 AND state_desc = 'ONLINE' ORDER BY name"
  );
  return r.recordset.map((row) => row.name);
}

async function inspectRoutines(dbName) {
  // Basic routine metadata (procedures + functions). DATA_TYPE is populated for functions.
  const routines = await query(`
    SELECT
      r.ROUTINE_SCHEMA,
      r.ROUTINE_NAME,
      r.ROUTINE_TYPE,
      r.DATA_TYPE
    FROM [${dbName}].INFORMATION_SCHEMA.ROUTINES r
    ORDER BY r.ROUTINE_SCHEMA, r.ROUTINE_NAME
  `);

  // Parameter list. ORDINAL_POSITION = 0 means the function return value.
  const parameters = await query(`
    SELECT
      SPECIFIC_SCHEMA,
      SPECIFIC_NAME,
      ORDINAL_POSITION,
      PARAMETER_MODE,
      PARAMETER_NAME,
      DATA_TYPE,
      CHARACTER_MAXIMUM_LENGTH,
      NUMERIC_PRECISION,
      NUMERIC_SCALE,
      IS_RESULT
    FROM [${dbName}].INFORMATION_SCHEMA.PARAMETERS
    ORDER BY SPECIFIC_SCHEMA, SPECIFIC_NAME, ORDINAL_POSITION
  `);

  // Definition + flags + dates from sys.objects + sys.sql_modules.
  // Includes finer object kind (P, FN scalar, IF inline-TVF, TF multi-statement-TVF).
  const modules = await query(`
    SELECT
      SCHEMA_NAME(o.schema_id) AS [schema],
      o.name                   AS [name],
      o.type                   AS [type_code],
      o.type_desc              AS [type_desc],
      o.create_date            AS [create_date],
      o.modify_date            AS [modify_date],
      CAST(OBJECTPROPERTY(o.object_id, 'IsEncrypted') AS bit) AS [is_encrypted],
      m.definition             AS [definition]
    FROM [${dbName}].sys.objects o
    LEFT JOIN [${dbName}].sys.sql_modules m ON m.object_id = o.object_id
    WHERE o.type IN ('P','FN','IF','TF')
    ORDER BY [schema], [name]
  `);

  // Defaults for parameters live in sys.parameters (INFORMATION_SCHEMA omits them).
  const paramDefaults = await query(`
    SELECT
      SCHEMA_NAME(o.schema_id) AS [schema],
      o.name                   AS [name],
      p.parameter_id           AS [ordinal],
      p.name                   AS [param_name],
      p.has_default_value,
      p.default_value,
      p.is_output,
      p.is_readonly
    FROM [${dbName}].sys.objects o
    JOIN [${dbName}].sys.parameters p ON p.object_id = o.object_id
    WHERE o.type IN ('P','FN','IF','TF')
    ORDER BY [schema], [name], p.parameter_id
  `);

  // Depends-on: this routine -> referenced object.
  const dependsOn = await query(`
    SELECT DISTINCT
      SCHEMA_NAME(o.schema_id)     AS [schema],
      o.name                       AS [name],
      d.referenced_server_name     AS ref_server,
      d.referenced_database_name   AS ref_database,
      d.referenced_schema_name     AS ref_schema,
      d.referenced_entity_name     AS ref_name,
      o_ref.type_desc              AS ref_type
    FROM [${dbName}].sys.objects o
    JOIN [${dbName}].sys.sql_expression_dependencies d ON d.referencing_id = o.object_id
    LEFT JOIN [${dbName}].sys.objects o_ref ON o_ref.object_id = d.referenced_id
    WHERE o.type IN ('P','FN','IF','TF')
    ORDER BY [schema], [name], ref_database, ref_schema, ref_name
  `);

  // Called-by: anything in this DB that references this routine.
  const calledBy = await query(`
    SELECT DISTINCT
      SCHEMA_NAME(o.schema_id)     AS [schema],
      o.name                       AS [name],
      SCHEMA_NAME(d_obj.schema_id) AS caller_schema,
      d_obj.name                   AS caller_name,
      d_obj.type_desc              AS caller_type
    FROM [${dbName}].sys.objects o
    JOIN [${dbName}].sys.sql_expression_dependencies d ON d.referenced_id = o.object_id
    JOIN [${dbName}].sys.objects d_obj ON d_obj.object_id = d.referencing_id
    WHERE o.type IN ('P','FN','IF','TF')
    ORDER BY [schema], [name], caller_schema, caller_name
  `);

  return {
    routines: routines.recordset,
    parameters: parameters.recordset,
    modules: modules.recordset,
    paramDefaults: paramDefaults.recordset,
    dependsOn: dependsOn.recordset,
    calledBy: calledBy.recordset,
  };
}

// ---------- formatting ----------
function formatParamType(p) {
  const t = p.DATA_TYPE;
  if (p.CHARACTER_MAXIMUM_LENGTH != null) {
    const len = p.CHARACTER_MAXIMUM_LENGTH === -1 ? 'max' : p.CHARACTER_MAXIMUM_LENGTH;
    return `${t}(${len})`;
  }
  if (['decimal', 'numeric'].includes(t)) {
    return `${t}(${p.NUMERIC_PRECISION},${p.NUMERIC_SCALE})`;
  }
  return t;
}

function classifyKind(typeCode) {
  switch (typeCode && typeCode.trim()) {
    case 'P':
      return { kind: 'procedure', label: 'Procedure', heading: 'Procedure' };
    case 'FN':
      return { kind: 'function', label: 'Function (scalar)', heading: 'Function: scalar' };
    case 'IF':
      return {
        kind: 'function',
        label: 'Function (inline TVF)',
        heading: 'Function: inline table-valued',
      };
    case 'TF':
      return {
        kind: 'function',
        label: 'Function (table-valued)',
        heading: 'Function: table-valued',
      };
    default:
      return { kind: 'other', label: typeCode || 'unknown', heading: typeCode || 'Routine' };
  }
}

function isoDate(d) {
  if (!d) return '';
  const dt = d instanceof Date ? d : new Date(d);
  return Number.isNaN(dt.getTime()) ? '' : dt.toISOString().slice(0, 19).replace('T', ' ');
}

function renderParamsTable(out, routineParams, defaultsByOrdinal) {
  const inputs = routineParams
    .filter((p) => p.ORDINAL_POSITION > 0 || p.IS_RESULT === 'NO')
    .filter((p) => p.IS_RESULT !== 'YES');
  if (inputs.length === 0) {
    out.push('_No parameters._');
    out.push('');
    return;
  }
  out.push('| # | Name | Mode | Type | Default |');
  out.push('|---|------|------|------|---------|');
  for (const p of inputs) {
    const def = defaultsByOrdinal.get(p.ORDINAL_POSITION);
    let defaultStr = '';
    if (def && def.has_default_value) {
      defaultStr = def.default_value === null ? '`NULL`' : '`' + String(def.default_value) + '`';
    }
    out.push(
      `| ${p.ORDINAL_POSITION} | \`${p.PARAMETER_NAME || ''}\` | ${p.PARAMETER_MODE || ''} | ${formatParamType(p)} | ${defaultStr} |`
    );
  }
  out.push('');
}

function renderRoutinePage(dbName, mod, info, descriptions) {
  const schema = mod.schema;
  const name = mod.name;
  const fq = `${schema}.${name}`;
  const kind = classifyKind(mod.type_code);

  const params = info.parameters.filter(
    (p) => p.SPECIFIC_SCHEMA === schema && p.SPECIFIC_NAME === name
  );
  const defaults = info.paramDefaults.filter(
    (d) => d.schema === schema && d.name === name
  );
  const defaultsByOrdinal = new Map(defaults.map((d) => [d.ordinal, d]));
  const deps = info.dependsOn.filter((d) => d.schema === schema && d.name === name);
  const calls = info.calledBy.filter((d) => d.schema === schema && d.name === name);

  // Find a return-type row for scalar functions (IS_RESULT='YES' or ordinal 0).
  const returnRow = params.find((p) => p.IS_RESULT === 'YES' || p.ORDINAL_POSITION === 0);

  const out = [];
  out.push(`# ${kind.heading}: \`${fq}\``);
  out.push('');
  out.push(`_Generated on ${new Date().toISOString()}_`);
  out.push('');
  out.push(`**Database:** \`${dbName}\` &nbsp;|&nbsp; **Schema:** \`${schema}\``);
  out.push('');
  out.push('[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)');
  out.push('');

  const desc = descriptionFor(descriptions, dbName, schema, name);
  if (desc) {
    out.push('## Description');
    out.push('');
    out.push(desc);
    out.push('');
  }

  out.push('## Summary');
  out.push('');
  out.push('| Property | Value |');
  out.push('|----------|-------|');
  out.push(`| Schema | \`${schema}\` |`);
  out.push(`| Name | \`${name}\` |`);
  out.push(`| Kind | ${kind.label} |`);
  out.push(`| sys.objects.type | \`${(mod.type_code || '').trim()}\` (${mod.type_desc || ''}) |`);
  out.push(`| Created | ${isoDate(mod.create_date)} |`);
  out.push(`| Modified | ${isoDate(mod.modify_date)} |`);
  out.push(`| Encrypted | ${mod.is_encrypted ? 'YES' : 'no'} |`);
  if (returnRow) {
    out.push(`| Returns | ${formatParamType(returnRow)} |`);
  }
  out.push('');

  out.push('## Parameters');
  out.push('');
  renderParamsTable(out, params, defaultsByOrdinal);

  out.push('## Depends on');
  out.push('');
  if (deps.length === 0) {
    out.push('_None resolved._');
  } else {
    out.push('| Object | Type | Cross-DB |');
    out.push('|--------|------|----------|');
    for (const d of deps) {
      const refSchema = d.ref_schema || '';
      const refQualified = refSchema ? `${refSchema}.${d.ref_name}` : d.ref_name;
      const crossParts = [];
      if (d.ref_server) crossParts.push(d.ref_server);
      if (d.ref_database) crossParts.push(d.ref_database);
      const crossDb = crossParts.length ? '`' + crossParts.join('.') + '`' : '';
      out.push(`| \`${refQualified}\` | ${d.ref_type || 'unresolved'} | ${crossDb} |`);
    }
  }
  out.push('');

  out.push('## Called by');
  out.push('');
  if (calls.length === 0) {
    out.push('_No other objects in this database reference it._');
  } else {
    out.push('| Caller | Type |');
    out.push('|--------|------|');
    for (const c of calls) {
      out.push(`| \`${c.caller_schema}.${c.caller_name}\` | ${c.caller_type} |`);
    }
  }
  out.push('');

  out.push('## Definition');
  out.push('');
  if (mod.is_encrypted) {
    out.push('_Definition encrypted — `sys.sql_modules.definition` is NULL for encrypted modules._');
  } else if (!mod.definition) {
    out.push('_Definition not available — `sys.sql_modules` returned NULL (insufficient permissions or system object)._');
  } else {
    out.push('```sql');
    out.push(mod.definition.trim());
    out.push('```');
  }
  out.push('');

  return out.join('\n');
}

// Used by index pages: count parameters (excluding return rows).
function paramCount(info, schema, name) {
  return info.parameters.filter(
    (p) =>
      p.SPECIFIC_SCHEMA === schema &&
      p.SPECIFIC_NAME === name &&
      p.IS_RESULT !== 'YES' &&
      p.ORDINAL_POSITION > 0
  ).length;
}

function renderDbIndex(dbName, info, descriptions) {
  const procs = info.modules.filter((m) => (m.type_code || '').trim() === 'P');
  const funcs = info.modules.filter((m) => ['FN', 'IF', 'TF'].includes((m.type_code || '').trim()));

  const sortByName = (a, b) =>
    String(a.schema || '').localeCompare(String(b.schema || '')) ||
    String(a.name || '').localeCompare(String(b.name || ''));
  procs.sort(sortByName);
  funcs.sort(sortByName);

  const out = [];
  out.push(`# Procedures & Functions: \`${dbName}\``);
  out.push('');
  out.push(`_Generated on ${new Date().toISOString()}_`);
  out.push('');
  out.push(`**Database:** \`${dbName}\``);
  out.push('');
  out.push('[← back to procedures index](../README.md)');
  out.push('');

  out.push('## Summary');
  out.push('');
  const encryptedCount = info.modules.filter((m) => m.is_encrypted).length;
  const describedCount = info.modules.filter((m) => descriptionFor(descriptions, dbName, m.schema, m.name)).length;
  out.push(`- Procedures: **${procs.length}**`);
  out.push(`- Functions: **${funcs.length}**`);
  out.push(`- Encrypted: **${encryptedCount}**`);
  out.push(`- Described (curated): **${describedCount}**`);
  out.push('');

  out.push('## Procedures');
  out.push('');
  if (procs.length === 0) {
    out.push('None.');
    out.push('');
  } else {
    out.push('| Name | Parameters | Created | Modified | Encrypted | Description |');
    out.push('|------|------------|---------|----------|-----------|-------------|');
    for (const p of procs) {
      const desc = shortDesc(descriptionFor(descriptions, dbName, p.schema, p.name));
      out.push(
        `| [\`${p.schema}.${p.name}\`](${objectLinkFromDbIndex(p.schema, p.name)}) | ${paramCount(info, p.schema, p.name)} | ${isoDate(p.create_date)} | ${isoDate(p.modify_date)} | ${p.is_encrypted ? 'YES' : 'no'} | ${desc} |`
      );
    }
    out.push('');
  }

  out.push('## Functions');
  out.push('');
  if (funcs.length === 0) {
    out.push('None.');
    out.push('');
  } else {
    out.push('| Name | Kind | Parameters | Created | Modified | Encrypted | Description |');
    out.push('|------|------|------------|---------|----------|-----------|-------------|');
    for (const f of funcs) {
      const kind = classifyKind(f.type_code).label;
      const desc = shortDesc(descriptionFor(descriptions, dbName, f.schema, f.name));
      out.push(
        `| [\`${f.schema}.${f.name}\`](${objectLinkFromDbIndex(f.schema, f.name)}) | ${kind} | ${paramCount(info, f.schema, f.name)} | ${isoDate(f.create_date)} | ${isoDate(f.modify_date)} | ${f.is_encrypted ? 'YES' : 'no'} | ${desc} |`
      );
    }
    out.push('');
  }

  out.push('## Source queries');
  out.push('');
  out.push('This page is rendered from the following catalog views:');
  out.push('');
  out.push('- `INFORMATION_SCHEMA.ROUTINES` — routine kind and return type');
  out.push('- `INFORMATION_SCHEMA.PARAMETERS` — parameter list, mode, type');
  out.push('- `sys.objects` — object kind code (`P`/`FN`/`IF`/`TF`), create/modify dates');
  out.push('- `sys.sql_modules` — full T-SQL definition + `is_encrypted` flag');
  out.push('- `sys.parameters` — parameter defaults (not exposed via `INFORMATION_SCHEMA`)');
  out.push('- `sys.sql_expression_dependencies` — depends-on and called-by relationships');
  out.push('');

  return out.join('\n');
}

function renderTopIndex(dbsRendered) {
  const out = [];
  out.push('# Procedures & Functions');
  out.push('');
  out.push(`_Generated on ${new Date().toISOString()}_`);
  out.push('');
  out.push(`**Server:** \`${process.env.DB_SERVER}\``);
  out.push('');
  out.push('Per-database documentation of stored procedures and functions. ');
  out.push('Sibling to `docs/tables/`; this directory is regenerated by `npm run procs` ');
  out.push('and is _not_ touched by `npm run schema`.');
  out.push('');

  out.push('## Databases');
  out.push('');
  out.push('| Database | Procedures | Functions | Encrypted |');
  out.push('|----------|------------|-----------|-----------|');
  for (const r of dbsRendered) {
    if (r.error) {
      out.push(`| \`${r.db}\` | _error_ | _error_ | _error_ |`);
      continue;
    }
    const procs = r.info.modules.filter((m) => (m.type_code || '').trim() === 'P').length;
    const funcs = r.info.modules.filter((m) =>
      ['FN', 'IF', 'TF'].includes((m.type_code || '').trim())
    ).length;
    const enc = r.info.modules.filter((m) => m.is_encrypted).length;
    out.push(
      `| [\`${r.db}\`](${safeSegment(r.db)}/README.md) | ${procs} | ${funcs} | ${enc} |`
    );
  }
  out.push('');

  out.push('## Source queries');
  out.push('');
  out.push('See each per-database `README.md` for the full list. This index is built from `sys.databases`.');
  out.push('');

  return out.join('\n');
}

// ---------- main ----------
(async () => {
  try {
    const descriptions = loadDescriptions();
    console.log(`Loaded ${descriptions.size} curated description(s) from descriptions.json`);

    const allDbs = await listUserDatabases();
    console.log(`Found ${allDbs.length} user database(s): ${allDbs.join(', ') || '(none)'}`);

    // Validate every entry in DBS against sys.databases — only then bracket it into queries.
    const targets = DBS.filter((d) => allDbs.includes(d));
    const missing = DBS.filter((d) => !allDbs.includes(d));
    for (const m of missing) {
      console.error(`  WARN: requested database '${m}' not found / not online — skipping`);
    }

    if (fs.existsSync(PROCS_DIR)) {
      fs.rmSync(PROCS_DIR, { recursive: true, force: true });
    }
    mkdirp(PROCS_DIR);

    const dbsRendered = [];
    for (const db of targets) {
      console.log(`Inspecting ${db}...`);
      try {
        const info = await inspectRoutines(db);
        const dbDir = path.join(PROCS_DIR, safeSegment(db));
        mkdirp(dbDir);

        let procCount = 0;
        let funcCount = 0;
        let encCount = 0;
        let describedCount = 0;
        // Defensive: skip rows with no schema or name (shouldn't happen on Azure SQL,
        // but sys.objects can occasionally surface oddities like orphaned system rows).
        info.modules = info.modules.filter((m) => m.schema && m.name);
        for (const mod of info.modules) {
          const t = (mod.type_code || '').trim();
          if (t === 'P') procCount++;
          else if (['FN', 'IF', 'TF'].includes(t)) funcCount++;
          if (mod.is_encrypted) encCount++;
          if (descriptionFor(descriptions, db, mod.schema, mod.name)) describedCount++;
          fs.writeFileSync(
            objectFile(db, mod.schema, mod.name),
            renderRoutinePage(db, mod, info, descriptions)
          );
        }
        fs.writeFileSync(path.join(dbDir, 'README.md'), renderDbIndex(db, info, descriptions));
        dbsRendered.push({ db, info });
        console.log(
          `  ${db}: ${procCount} procedures, ${funcCount} functions, ${encCount} encrypted, ${describedCount} described`
        );
      } catch (e) {
        dbsRendered.push({ db, error: e.message });
        console.error(`  ${db}: ERROR ${e.message}`);
      }
    }

    fs.writeFileSync(path.join(PROCS_DIR, 'README.md'), renderTopIndex(dbsRendered));
    console.log(`Wrote per-routine docs and indexes under ${PROCS_DIR}`);
  } catch (e) {
    console.error('Procedure documentation failed:', e.message);
    process.exitCode = 1;
  } finally {
    await close();
  }
})();
