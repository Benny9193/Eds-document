require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { query, close } = require('./db');

const ROOT = path.join(__dirname, '..');
const RULES_DIR = path.join(ROOT, 'docs', 'business-rules');

// Same 8 production DBs the other generators cover. Validated against
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

// ---------- helpers ----------
function safeSegment(s) {
  return String(s).replace(/[^A-Za-z0-9._-]/g, '_');
}

function mkdirp(p) {
  fs.mkdirSync(p, { recursive: true });
}

function isoDate(d) {
  if (!d) return '';
  const dt = d instanceof Date ? d : new Date(d);
  return Number.isNaN(dt.getTime()) ? '' : dt.toISOString().slice(0, 19).replace('T', ' ');
}

function fence(lang, body) {
  return ['```' + lang, String(body || '').trim(), '```'].join('\n');
}

// ---------- queries ----------
async function listUserDatabases() {
  const r = await query(
    "SELECT name FROM sys.databases WHERE database_id > 4 AND state_desc = 'ONLINE' ORDER BY name"
  );
  return r.recordset.map((row) => row.name);
}

async function inspectBusinessRules(dbName) {
  // DML triggers attached to user tables. type_desc distinguishes SQL vs CLR.
  // Includes is_disabled/is_instead_of_trigger so we can flag unusual triggers.
  const triggers = await query(`
    SELECT
      SCHEMA_NAME(t.schema_id)  AS [table_schema],
      t.name                    AS [table_name],
      tr.name                   AS [trigger_name],
      tr.is_disabled,
      tr.is_instead_of_trigger,
      tr.create_date,
      tr.modify_date,
      m.definition              AS [definition],
      STUFF((
        SELECT ', ' + te.type_desc
        FROM [${dbName}].sys.trigger_events te
        WHERE te.object_id = tr.object_id
        ORDER BY te.type_desc
        FOR XML PATH(''), TYPE
      ).value('.', 'nvarchar(max)'), 1, 2, '') AS [events]
    FROM [${dbName}].sys.triggers tr
    JOIN [${dbName}].sys.tables t ON t.object_id = tr.parent_id
    LEFT JOIN [${dbName}].sys.sql_modules m ON m.object_id = tr.object_id
    WHERE tr.parent_class = 1 AND tr.is_ms_shipped = 0
    ORDER BY [table_schema], [table_name], [trigger_name]
  `);

  // Check constraints — both column-level and table-level. is_not_trusted / is_disabled
  // surface drift introduced by bulk loads that bypassed the constraint.
  const checks = await query(`
    SELECT
      SCHEMA_NAME(t.schema_id)  AS [table_schema],
      t.name                    AS [table_name],
      cc.name                   AS [constraint_name],
      c.name                    AS [column_name],
      cc.is_disabled,
      cc.is_not_trusted,
      cc.definition
    FROM [${dbName}].sys.check_constraints cc
    JOIN [${dbName}].sys.tables t ON t.object_id = cc.parent_object_id
    LEFT JOIN [${dbName}].sys.columns c
      ON c.object_id = cc.parent_object_id AND c.column_id = cc.parent_column_id
    WHERE cc.is_ms_shipped = 0
    ORDER BY [table_schema], [table_name], [constraint_name]
  `);

  // Computed columns. is_persisted decides whether the value is materialised
  // (and thus indexable / participates in foreign keys).
  const computed = await query(`
    SELECT
      SCHEMA_NAME(t.schema_id)  AS [table_schema],
      t.name                    AS [table_name],
      cc.name                   AS [column_name],
      cc.is_persisted,
      cc.is_nullable,
      ty.name                   AS [data_type],
      cc.definition
    FROM [${dbName}].sys.computed_columns cc
    JOIN [${dbName}].sys.tables t ON t.object_id = cc.object_id
    LEFT JOIN [${dbName}].sys.types ty ON ty.user_type_id = cc.user_type_id
    ORDER BY [table_schema], [table_name], [column_name]
  `);

  // Default constraints. Many are trivial (`(0)`, `getdate()`) but anything
  // referencing a function (`newid()`, scalar UDF, sequence) is real business logic.
  const defaults = await query(`
    SELECT
      SCHEMA_NAME(t.schema_id)  AS [table_schema],
      t.name                    AS [table_name],
      c.name                    AS [column_name],
      dc.name                   AS [constraint_name],
      dc.definition
    FROM [${dbName}].sys.default_constraints dc
    JOIN [${dbName}].sys.tables t ON t.object_id = dc.parent_object_id
    JOIN [${dbName}].sys.columns c
      ON c.object_id = dc.parent_object_id AND c.column_id = dc.parent_column_id
    WHERE dc.is_ms_shipped = 0
    ORDER BY [table_schema], [table_name], [column_name]
  `);

  // Filtered indexes — has_filter = 1 means there's a WHERE clause baked into
  // the index, which usually encodes a domain rule (e.g. only-active rows).
  const filteredIndexes = await query(`
    SELECT
      SCHEMA_NAME(t.schema_id)  AS [table_schema],
      t.name                    AS [table_name],
      i.name                    AS [index_name],
      i.is_unique,
      i.filter_definition,
      STUFF((
        SELECT ', ' + QUOTENAME(c2.name) + CASE WHEN ic2.is_descending_key = 1 THEN ' DESC' ELSE '' END
        FROM [${dbName}].sys.index_columns ic2
        JOIN [${dbName}].sys.columns c2
          ON c2.object_id = ic2.object_id AND c2.column_id = ic2.column_id
        WHERE ic2.object_id = i.object_id AND ic2.index_id = i.index_id
          AND ic2.is_included_column = 0
        ORDER BY ic2.key_ordinal
        FOR XML PATH(''), TYPE
      ).value('.', 'nvarchar(max)'), 1, 2, '') AS [key_columns]
    FROM [${dbName}].sys.indexes i
    JOIN [${dbName}].sys.tables t ON t.object_id = i.object_id
    WHERE i.has_filter = 1
    ORDER BY [table_schema], [table_name], [index_name]
  `);

  // Unique constraints / unique indexes that are NOT primary keys. These are
  // the secondary uniqueness business rules (alternate keys, code lookups).
  const uniques = await query(`
    SELECT
      SCHEMA_NAME(t.schema_id)  AS [table_schema],
      t.name                    AS [table_name],
      i.name                    AS [index_name],
      i.is_unique_constraint,
      STUFF((
        SELECT ', ' + QUOTENAME(c2.name)
        FROM [${dbName}].sys.index_columns ic2
        JOIN [${dbName}].sys.columns c2
          ON c2.object_id = ic2.object_id AND c2.column_id = ic2.column_id
        WHERE ic2.object_id = i.object_id AND ic2.index_id = i.index_id
          AND ic2.is_included_column = 0
        ORDER BY ic2.key_ordinal
        FOR XML PATH(''), TYPE
      ).value('.', 'nvarchar(max)'), 1, 2, '') AS [key_columns]
    FROM [${dbName}].sys.indexes i
    JOIN [${dbName}].sys.tables t ON t.object_id = i.object_id
    WHERE i.is_unique = 1 AND i.is_primary_key = 0 AND i.type > 0
    ORDER BY [table_schema], [table_name], [index_name]
  `);

  // Indexed (materialised) views — view + a unique clustered index on it.
  // These are pre-computed result sets and represent committed-to derived data.
  const indexedViews = await query(`
    SELECT DISTINCT
      SCHEMA_NAME(v.schema_id)  AS [view_schema],
      v.name                    AS [view_name],
      v.with_check_option,
      v.is_schema_bound,
      v.create_date,
      v.modify_date,
      m.definition
    FROM [${dbName}].sys.views v
    JOIN [${dbName}].sys.indexes i
      ON i.object_id = v.object_id AND i.type = 1
    LEFT JOIN [${dbName}].sys.sql_modules m ON m.object_id = v.object_id
    ORDER BY [view_schema], [view_name]
  `);

  // SCHEMABINDING views — not necessarily indexed, but the binding signals
  // intent ("downstream depends on this shape; don't drift").
  const schemaboundViews = await query(`
    SELECT
      SCHEMA_NAME(v.schema_id)  AS [view_schema],
      v.name                    AS [view_name],
      v.create_date,
      v.modify_date
    FROM [${dbName}].sys.views v
    WHERE v.is_schema_bound = 1
      AND NOT EXISTS (
        SELECT 1 FROM [${dbName}].sys.indexes i
        WHERE i.object_id = v.object_id AND i.type = 1
      )
    ORDER BY [view_schema], [view_name]
  `);

  return {
    triggers: triggers.recordset,
    checks: checks.recordset,
    computed: computed.recordset,
    defaults: defaults.recordset,
    filteredIndexes: filteredIndexes.recordset,
    uniques: uniques.recordset,
    indexedViews: indexedViews.recordset,
    schemaboundViews: schemaboundViews.recordset,
  };
}

// ---------- formatting ----------
// Default constraints come in two flavours: noisy (literal scalars,
// getdate(), getutcdate()) and interesting (UDFs, NEWID, NEWSEQUENTIALID,
// scope_identity, etc.). The "interesting" set is what an analyst actually
// wants to read — the noise is hidden behind a count.
const TRIVIAL_DEFAULT_RE = /^\(*\s*(?:\(\s*[-+]?\d+(?:\.\d+)?\s*\)|N?'[^']*'|getdate\(\)|getutcdate\(\)|sysdatetime\(\)|sysutcdatetime\(\)|0|1|NULL)\s*\)*$/i;

function isTrivialDefault(def) {
  if (!def) return true;
  return TRIVIAL_DEFAULT_RE.test(def.trim());
}

function renderTriggers(out, triggers) {
  out.push('## Triggers');
  out.push('');
  if (triggers.length === 0) {
    out.push('_None._');
    out.push('');
    return;
  }
  out.push(`**${triggers.length}** trigger(s).`);
  out.push('');
  out.push('| Table | Trigger | Events | Kind | State |');
  out.push('|-------|---------|--------|------|-------|');
  for (const t of triggers) {
    const kind = t.is_instead_of_trigger ? 'INSTEAD OF' : 'AFTER';
    const state = t.is_disabled ? '**disabled**' : 'enabled';
    out.push(
      `| \`${t.table_schema}.${t.table_name}\` | \`${t.trigger_name}\` | ${t.events || ''} | ${kind} | ${state} |`
    );
  }
  out.push('');
  out.push('### Trigger definitions');
  out.push('');
  for (const t of triggers) {
    out.push(`#### \`${t.table_schema}.${t.table_name}\` &mdash; \`${t.trigger_name}\``);
    out.push('');
    if (!t.definition) {
      out.push('_Definition unavailable (encrypted or insufficient permissions)._');
    } else {
      out.push(fence('sql', t.definition));
    }
    out.push('');
  }
}

function renderChecks(out, checks) {
  out.push('## Check constraints');
  out.push('');
  if (checks.length === 0) {
    out.push('_None._');
    out.push('');
    return;
  }
  const untrusted = checks.filter((c) => c.is_not_trusted).length;
  const disabled = checks.filter((c) => c.is_disabled).length;
  out.push(`**${checks.length}** constraint(s)` +
    (untrusted ? `, **${untrusted}** not trusted` : '') +
    (disabled ? `, **${disabled}** disabled` : '') + '.');
  out.push('');
  out.push('| Table | Column | Constraint | Definition | Flags |');
  out.push('|-------|--------|------------|------------|-------|');
  for (const c of checks) {
    const flags = [
      c.is_disabled ? 'disabled' : '',
      c.is_not_trusted ? 'not trusted' : '',
    ].filter(Boolean).join(', ');
    const col = c.column_name ? `\`${c.column_name}\`` : '_(table-level)_';
    const def = (c.definition || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
    out.push(
      `| \`${c.table_schema}.${c.table_name}\` | ${col} | \`${c.constraint_name}\` | \`${def}\` | ${flags} |`
    );
  }
  out.push('');
}

function renderComputed(out, computed) {
  out.push('## Computed columns');
  out.push('');
  if (computed.length === 0) {
    out.push('_None._');
    out.push('');
    return;
  }
  const persisted = computed.filter((c) => c.is_persisted).length;
  out.push(`**${computed.length}** computed column(s), **${persisted}** persisted.`);
  out.push('');
  out.push('| Table | Column | Type | Persisted | Nullable | Definition |');
  out.push('|-------|--------|------|-----------|----------|------------|');
  for (const c of computed) {
    const def = (c.definition || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
    out.push(
      `| \`${c.table_schema}.${c.table_name}\` | \`${c.column_name}\` | ${c.data_type || ''} | ${c.is_persisted ? 'yes' : 'no'} | ${c.is_nullable ? 'yes' : 'no'} | \`${def}\` |`
    );
  }
  out.push('');
}

function renderDefaults(out, defaults) {
  out.push('## Default constraints');
  out.push('');
  if (defaults.length === 0) {
    out.push('_None._');
    out.push('');
    return;
  }
  const interesting = defaults.filter((d) => !isTrivialDefault(d.definition));
  const trivialCount = defaults.length - interesting.length;
  out.push(
    `**${defaults.length}** total. ` +
    `**${interesting.length}** non-trivial (UDF / NEWID / etc.) shown below; ` +
    `${trivialCount} literal/timestamp defaults omitted.`
  );
  out.push('');
  if (interesting.length === 0) {
    out.push('_All defaults are simple literals or timestamps._');
    out.push('');
    return;
  }
  out.push('| Table | Column | Constraint | Default |');
  out.push('|-------|--------|------------|---------|');
  for (const d of interesting) {
    const def = (d.definition || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
    out.push(
      `| \`${d.table_schema}.${d.table_name}\` | \`${d.column_name}\` | \`${d.constraint_name}\` | \`${def}\` |`
    );
  }
  out.push('');
}

function renderFilteredIndexes(out, idx) {
  out.push('## Filtered indexes');
  out.push('');
  if (idx.length === 0) {
    out.push('_None._');
    out.push('');
    return;
  }
  out.push(`**${idx.length}** filtered index(es). The WHERE clause encodes a domain rule.`);
  out.push('');
  out.push('| Table | Index | Unique | Key columns | Filter |');
  out.push('|-------|-------|--------|-------------|--------|');
  for (const i of idx) {
    const filter = (i.filter_definition || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
    out.push(
      `| \`${i.table_schema}.${i.table_name}\` | \`${i.index_name}\` | ${i.is_unique ? 'yes' : 'no'} | ${i.key_columns || ''} | \`${filter}\` |`
    );
  }
  out.push('');
}

function renderUniques(out, uniques) {
  out.push('## Unique constraints (non-PK)');
  out.push('');
  if (uniques.length === 0) {
    out.push('_None._');
    out.push('');
    return;
  }
  out.push(`**${uniques.length}** alternate-key uniqueness rule(s).`);
  out.push('');
  out.push('| Table | Index | Source | Key columns |');
  out.push('|-------|-------|--------|-------------|');
  for (const u of uniques) {
    const src = u.is_unique_constraint ? 'UNIQUE constraint' : 'unique index';
    out.push(
      `| \`${u.table_schema}.${u.table_name}\` | \`${u.index_name}\` | ${src} | ${u.key_columns || ''} |`
    );
  }
  out.push('');
}

function renderIndexedViews(out, views) {
  out.push('## Indexed views (materialised)');
  out.push('');
  if (views.length === 0) {
    out.push('_None._');
    out.push('');
    return;
  }
  out.push(`**${views.length}** indexed view(s). These store pre-computed results.`);
  out.push('');
  for (const v of views) {
    out.push(`### \`${v.view_schema}.${v.view_name}\``);
    out.push('');
    out.push(`Created ${isoDate(v.create_date)} &middot; modified ${isoDate(v.modify_date)} &middot; schema-bound: ${v.is_schema_bound ? 'yes' : 'no'}.`);
    out.push('');
    if (v.definition) {
      out.push(fence('sql', v.definition));
    } else {
      out.push('_Definition unavailable._');
    }
    out.push('');
  }
}

function renderSchemaboundViews(out, views) {
  out.push('## Schema-bound views (non-indexed)');
  out.push('');
  if (views.length === 0) {
    out.push('_None._');
    out.push('');
    return;
  }
  out.push(`**${views.length}** view(s) with WITH SCHEMABINDING but no clustered index — definition is locked against drift.`);
  out.push('');
  out.push('| View | Created | Modified |');
  out.push('|------|---------|----------|');
  for (const v of views) {
    out.push(`| \`${v.view_schema}.${v.view_name}\` | ${isoDate(v.create_date)} | ${isoDate(v.modify_date)} |`);
  }
  out.push('');
}

function renderDbPage(dbName, info) {
  const out = [];
  out.push(`# Business rules: \`${dbName}\``);
  out.push('');
  out.push(`_Generated on ${new Date().toISOString()}_`);
  out.push('');
  out.push(`**Database:** \`${dbName}\``);
  out.push('');
  out.push('[← back to business-rules index](../README.md)');
  out.push('');
  out.push(
    'Auto-extracted enforcement layer: triggers, check constraints, computed columns, ' +
    'non-trivial defaults, filtered indexes, alternate-key uniqueness, and ' +
    'indexed/schema-bound views. Hand-curated narrative lives in [`docs/business-logic/`](../../business-logic/).'
  );
  out.push('');

  out.push('## Summary');
  out.push('');
  out.push('| Category | Count |');
  out.push('|----------|-------|');
  out.push(`| Triggers | ${info.triggers.length} |`);
  out.push(`| Check constraints | ${info.checks.length} |`);
  out.push(`| Computed columns | ${info.computed.length} |`);
  out.push(`| Default constraints | ${info.defaults.length} (${info.defaults.filter((d) => !isTrivialDefault(d.definition)).length} non-trivial) |`);
  out.push(`| Filtered indexes | ${info.filteredIndexes.length} |`);
  out.push(`| Unique constraints (non-PK) | ${info.uniques.length} |`);
  out.push(`| Indexed views | ${info.indexedViews.length} |`);
  out.push(`| Schema-bound views (non-indexed) | ${info.schemaboundViews.length} |`);
  out.push('');

  renderTriggers(out, info.triggers);
  renderChecks(out, info.checks);
  renderComputed(out, info.computed);
  renderDefaults(out, info.defaults);
  renderFilteredIndexes(out, info.filteredIndexes);
  renderUniques(out, info.uniques);
  renderIndexedViews(out, info.indexedViews);
  renderSchemaboundViews(out, info.schemaboundViews);

  out.push('## Source queries');
  out.push('');
  out.push('Rendered from these catalog views:');
  out.push('');
  out.push('- `sys.triggers` + `sys.trigger_events` + `sys.sql_modules` — DML triggers and their bodies');
  out.push('- `sys.check_constraints` — column- and table-level CHECK rules (with `is_not_trusted` / `is_disabled`)');
  out.push('- `sys.computed_columns` — derived columns (persisted vs. inline)');
  out.push('- `sys.default_constraints` — column defaults (filtered to non-trivial)');
  out.push('- `sys.indexes WHERE has_filter = 1` — filtered indexes');
  out.push('- `sys.indexes WHERE is_unique = 1 AND is_primary_key = 0` — alternate-key uniqueness');
  out.push('- `sys.views` joined to `sys.indexes` — indexed and schema-bound views');
  out.push('');

  return out.join('\n');
}

function renderTopIndex(dbsRendered) {
  const out = [];
  out.push('# Business rules');
  out.push('');
  out.push(`_Generated on ${new Date().toISOString()}_`);
  out.push('');
  out.push(`**Server:** \`${process.env.DB_SERVER}\``);
  out.push('');
  out.push(
    'Auto-extracted business-rule enforcement across every documented database. ' +
    'Sibling to `docs/procedures/` and `docs/dependencies/`. ' +
    'Regenerated by `npm run business-rules`; not touched by `npm run schema` or `npm run procs`.'
  );
  out.push('');
  out.push('Hand-curated narrative documentation is in [`docs/business-logic/`](../business-logic/).');
  out.push('');

  out.push('## Databases');
  out.push('');
  out.push('| Database | Triggers | Checks | Computed | Defaults (non-trivial) | Filtered idx | Unique (non-PK) | Indexed views | Schema-bound views |');
  out.push('|----------|---------:|-------:|---------:|-----------------------:|-------------:|----------------:|--------------:|-------------------:|');
  for (const r of dbsRendered) {
    if (r.error) {
      out.push(`| \`${r.db}\` | _error_ | _error_ | _error_ | _error_ | _error_ | _error_ | _error_ | _error_ |`);
      continue;
    }
    const i = r.info;
    const nontrivial = i.defaults.filter((d) => !isTrivialDefault(d.definition)).length;
    out.push(
      `| [\`${r.db}\`](${safeSegment(r.db)}/README.md) | ${i.triggers.length} | ${i.checks.length} | ${i.computed.length} | ${nontrivial} | ${i.filteredIndexes.length} | ${i.uniques.length} | ${i.indexedViews.length} | ${i.schemaboundViews.length} |`
    );
  }
  out.push('');

  out.push('## Source queries');
  out.push('');
  out.push('See each per-database `README.md` for the full list. Database list is filtered to online user DBs (`sys.databases.database_id > 4`) and validated against the static target set in `src/document-business-rules.js`.');
  out.push('');

  return out.join('\n');
}

// ---------- main ----------
(async () => {
  try {
    const allDbs = await listUserDatabases();
    console.log(`Found ${allDbs.length} user database(s): ${allDbs.join(', ') || '(none)'}`);

    const targets = DBS.filter((d) => allDbs.includes(d));
    const missing = DBS.filter((d) => !allDbs.includes(d));
    for (const m of missing) {
      console.error(`  WARN: requested database '${m}' not found / not online — skipping`);
    }

    if (fs.existsSync(RULES_DIR)) {
      fs.rmSync(RULES_DIR, { recursive: true, force: true });
    }
    mkdirp(RULES_DIR);

    const dbsRendered = [];
    for (const db of targets) {
      console.log(`Inspecting ${db}...`);
      try {
        const info = await inspectBusinessRules(db);
        const dbDir = path.join(RULES_DIR, safeSegment(db));
        mkdirp(dbDir);
        fs.writeFileSync(path.join(dbDir, 'README.md'), renderDbPage(db, info));
        dbsRendered.push({ db, info });
        console.log(
          `  ${db}: ${info.triggers.length} triggers, ${info.checks.length} checks, ` +
          `${info.computed.length} computed, ${info.defaults.length} defaults, ` +
          `${info.filteredIndexes.length} filtered idx, ${info.uniques.length} uniques, ` +
          `${info.indexedViews.length} indexed views, ${info.schemaboundViews.length} schema-bound views`
        );
      } catch (e) {
        dbsRendered.push({ db, error: e.message });
        console.error(`  ${db}: ERROR ${e.message}`);
      }
    }

    fs.writeFileSync(path.join(RULES_DIR, 'README.md'), renderTopIndex(dbsRendered));
    console.log(`Wrote business-rules docs under ${RULES_DIR}`);
  } catch (e) {
    console.error('Business-rules documentation failed:', e.message);
    process.exitCode = 1;
  } finally {
    await close();
  }
})();
