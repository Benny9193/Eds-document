require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { query, close } = require('./db');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'docs', 'triggers');

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
  return Number.isNaN(dt.getTime()) ? '' : dt.toISOString().slice(0, 10);
}

function fence(lang, body) {
  return ['```' + lang, String(body || '').trim(), '```'].join('\n');
}

// ---------- classification ----------
// Each classifier returns true/false against the upper-cased definition text.
// Order matters: a trigger can carry multiple labels; the first match also
// sets the "primary" category for grouping purposes.
const CLASSIFIERS = [
  {
    key: 'date-stamp',
    label: 'Date-stamping',
    description: 'Sets a timestamp column (DateCreated, DateModified, etc.) via GETDATE() or similar.',
    test(def, name) {
      return (
        /DATE(?:CREATED|MODIFIED|UPDATED|POSTED|APPROVED|SUBMITTED|CLOSED|SENT|LOCKED|ACTIVATED|DEACTIVATED)/.test(def) ||
        /SET\s+\w*DATE\w*\s*=/.test(def) ||
        /GETDATE\(\)|GETUTCDATE\(\)|SYSDATETIME\(\)|SYSUTCDATETIME\(\)/.test(def)
      );
    },
  },
  {
    key: 'audit',
    label: 'Audit / history',
    description: 'Writes to an audit, history, or log table, or is explicitly named as an audit trigger.',
    test(def, name) {
      return (
        /AUDIT|HISTORY|_LOG\b/.test(name.toUpperCase()) ||
        /INSERT\s+(?:INTO\s+)?\w*(?:AUDIT|HISTORY|LOG)\w*/i.test(def)
      );
    },
  },
  {
    key: 'validation',
    label: 'Validation / guard',
    description: 'Enforces a business rule by raising an error or rolling back the transaction.',
    test(def) {
      return /RAISERROR|THROW\s|ROLLBACK\s+TRAN/.test(def);
    },
  },
  {
    key: 'cascade',
    label: 'Cascade / derived data',
    description: 'Propagates changes to related tables — inserts child rows, updates denormalised counts, or synchronises derived columns.',
    test(def) {
      // INSERT [INTO] <table> or UPDATE <table> SET (where table is not INSERTED/DELETED pseudo-tables)
      return (
        /INSERT\s+(?:INTO\s+)?(?!INSERTED\b|DELETED\b)\w+/.test(def) ||
        /UPDATE\s+(?!INSERTED\b|DELETED\b)\w+\s+SET/.test(def)
      );
    },
  },
];

function classify(trigger) {
  const def = (trigger.definition || '').toUpperCase();
  const name = trigger.trigger_name || '';
  const labels = CLASSIFIERS.filter((c) => c.test(def, name)).map((c) => c.key);
  return labels.length ? labels : ['other'];
}

// ---------- query ----------
async function listUserDatabases() {
  const r = await query(
    "SELECT name FROM sys.databases WHERE database_id > 4 AND state_desc = 'ONLINE' ORDER BY name"
  );
  return r.recordset.map((row) => row.name);
}

async function fetchTriggers(dbName) {
  const r = await query(`
    SELECT
      SCHEMA_NAME(t.schema_id)  AS [table_schema],
      t.name                    AS [table_name],
      tr.name                   AS [trigger_name],
      tr.is_disabled,
      tr.is_instead_of_trigger,
      tr.create_date,
      tr.modify_date,
      m.definition,
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
  return r.recordset;
}

// ---------- rendering ----------
function stateFlag(t) {
  const parts = [];
  if (t.is_disabled) parts.push('**disabled**');
  if (t.is_instead_of_trigger) parts.push('INSTEAD OF');
  return parts.length ? parts.join(', ') : 'enabled';
}

function renderDbPage(dbName, triggers) {
  const out = [];
  out.push(`# Triggers: \`${dbName}\``);
  out.push('');
  out.push(`_Generated ${new Date().toISOString().slice(0, 10)} &middot; ${triggers.length} trigger(s) total_`);
  out.push('');
  out.push('[← back to triggers index](../README.md)');
  out.push('');

  if (triggers.length === 0) {
    out.push('_No triggers found in this database._');
    return out.join('\n');
  }

  // annotate each trigger with its labels
  const annotated = triggers.map((t) => ({ ...t, labels: classify(t) }));

  // Summary table
  out.push('## Summary');
  out.push('');
  out.push('| Table | Trigger | Events | Kind | State | Categories |');
  out.push('|-------|---------|--------|------|-------|------------|');
  for (const t of annotated) {
    const kind = t.is_instead_of_trigger ? 'INSTEAD OF' : 'AFTER';
    const state = t.is_disabled ? '**disabled**' : 'enabled';
    out.push(
      `| \`${t.table_schema}.${t.table_name}\` | \`${t.trigger_name}\` | ${t.events || ''} | ${kind} | ${state} | ${t.labels.join(', ')} |`
    );
  }
  out.push('');

  // Group by primary category (first label)
  const groups = {};
  for (const c of [...CLASSIFIERS.map((c) => c.key), 'other']) groups[c] = [];
  for (const t of annotated) {
    groups[t.labels[0]].push(t);
  }

  // Render each category section
  for (const classifier of CLASSIFIERS) {
    const group = groups[classifier.key];
    if (group.length === 0) continue;
    out.push(`## ${classifier.label} (${group.length})`);
    out.push('');
    out.push(`> ${classifier.description}`);
    out.push('');
    for (const t of group) {
      out.push(`### \`${t.table_schema}.${t.table_name}\` &mdash; \`${t.trigger_name}\``);
      out.push('');
      const meta = [
        `**Events:** ${t.events || '—'}`,
        `**Kind:** ${t.is_instead_of_trigger ? 'INSTEAD OF' : 'AFTER'}`,
        `**State:** ${stateFlag(t)}`,
        `**Created:** ${isoDate(t.create_date)}`,
        `**Modified:** ${isoDate(t.modify_date)}`,
        `**Also tagged:** ${t.labels.filter((l) => l !== classifier.key).join(', ') || '—'}`,
      ];
      out.push(meta.join(' &middot; '));
      out.push('');
      if (!t.definition) {
        out.push('_Definition unavailable (encrypted or insufficient permissions)._');
      } else {
        out.push(fence('sql', t.definition));
      }
      out.push('');
    }
  }

  // "other" bucket
  if (groups.other.length > 0) {
    out.push(`## Other (${groups.other.length})`);
    out.push('');
    out.push('> Did not match any classification pattern — review manually.');
    out.push('');
    for (const t of groups.other) {
      out.push(`### \`${t.table_schema}.${t.table_name}\` &mdash; \`${t.trigger_name}\``);
      out.push('');
      const meta = [
        `**Events:** ${t.events || '—'}`,
        `**Kind:** ${t.is_instead_of_trigger ? 'INSTEAD OF' : 'AFTER'}`,
        `**State:** ${stateFlag(t)}`,
        `**Created:** ${isoDate(t.create_date)}`,
        `**Modified:** ${isoDate(t.modify_date)}`,
      ];
      out.push(meta.join(' &middot; '));
      out.push('');
      if (!t.definition) {
        out.push('_Definition unavailable (encrypted or insufficient permissions)._');
      } else {
        out.push(fence('sql', t.definition));
      }
      out.push('');
    }
  }

  return out.join('\n');
}

function renderTopIndex(results) {
  const out = [];
  out.push('# EDS Trigger catalog');
  out.push('');
  out.push(`_Generated ${new Date().toISOString().slice(0, 10)}_`);
  out.push('');
  out.push(
    'Purpose-grouped view of every DML trigger across all documented databases. ' +
    'Triggers are classified by what they *do* rather than where they live — ' +
    'useful for onboarding, impact analysis, and finding write-side side-effects.'
  );
  out.push('');
  out.push('Complementary to [`docs/business-rules/`](../business-rules/) which embeds triggers ' +
    'inside the full enforcement-layer audit alongside checks, constraints, and views.');
  out.push('');

  // Category legend
  out.push('## Category definitions');
  out.push('');
  for (const c of CLASSIFIERS) {
    out.push(`- **${c.label}** — ${c.description}`);
  }
  out.push('- **Other** — did not match any pattern; review manually.');
  out.push('');

  // Cross-DB summary table
  out.push('## Summary by database');
  out.push('');
  const catKeys = [...CLASSIFIERS.map((c) => c.key), 'other'];
  const catLabels = [...CLASSIFIERS.map((c) => c.label), 'Other'];
  out.push(`| Database | Total | ${catLabels.join(' | ')} |`);
  out.push(`|----------| -----:| ${catKeys.map(() => '------:').join(' | ')} |`);

  for (const r of results) {
    if (r.error) {
      out.push(`| [\`${r.db}\`](${safeSegment(r.db)}/README.md) | _error_ | ${catKeys.map(() => '—').join(' | ')} |`);
      continue;
    }
    const counts = Object.fromEntries(catKeys.map((k) => [k, 0]));
    for (const t of r.annotated) {
      counts[t.labels[0]] = (counts[t.labels[0]] || 0) + 1;
    }
    out.push(
      `| [\`${r.db}\`](${safeSegment(r.db)}/README.md) | ${r.annotated.length} | ${catKeys.map((k) => counts[k]).join(' | ')} |`
    );
  }
  out.push('');

  // Disabled triggers callout
  const allDisabled = results.flatMap((r) =>
    r.error ? [] : r.annotated.filter((t) => t.is_disabled).map((t) => ({ db: r.db, ...t }))
  );
  if (allDisabled.length > 0) {
    out.push('## Disabled triggers');
    out.push('');
    out.push(
      `> **${allDisabled.length}** trigger(s) are currently disabled. ` +
      'Disabled triggers are silently skipped — confirm this is intentional.'
    );
    out.push('');
    out.push('| Database | Table | Trigger | Events |');
    out.push('|----------|-------|---------|--------|');
    for (const t of allDisabled) {
      out.push(`| \`${t.db}\` | \`${t.table_schema}.${t.table_name}\` | \`${t.trigger_name}\` | ${t.events || ''} |`);
    }
    out.push('');
  }

  // Cross-DB cascade map — most impactful for onboarding
  out.push('## Cascade / derived-data triggers across all databases');
  out.push('');
  out.push('These triggers write to tables *other than their own* — knowing them prevents surprise side-effects during writes.');
  out.push('');
  const cascadeTriggers = results.flatMap((r) =>
    r.error ? [] : r.annotated.filter((t) => t.labels.includes('cascade')).map((t) => ({ db: r.db, ...t }))
  );
  if (cascadeTriggers.length === 0) {
    out.push('_None._');
  } else {
    out.push('| Database | Table | Trigger | Events | Also tagged |');
    out.push('|----------|-------|---------|--------|-------------|');
    for (const t of cascadeTriggers) {
      const also = t.labels.filter((l) => l !== 'cascade').join(', ') || '—';
      out.push(
        `| \`${t.db}\` | \`${t.table_schema}.${t.table_name}\` | \`${t.trigger_name}\` | ${t.events || ''} | ${also} |`
      );
    }
  }
  out.push('');

  return out.join('\n');
}

// ---------- main ----------
(async () => {
  try {
    const allDbs = await listUserDatabases();
    console.log(`Found ${allDbs.length} user database(s)`);

    const targets = DBS.filter((d) => allDbs.includes(d));
    const missing = DBS.filter((d) => !allDbs.includes(d));
    for (const m of missing) {
      console.warn(`  WARN: '${m}' not found / not online — skipping`);
    }

    if (fs.existsSync(OUT_DIR)) fs.rmSync(OUT_DIR, { recursive: true, force: true });
    mkdirp(OUT_DIR);

    const results = [];
    for (const db of targets) {
      console.log(`  Processing ${db}...`);
      try {
        const triggers = await fetchTriggers(db);
        const annotated = triggers.map((t) => ({ ...t, labels: classify(t) }));
        const dbDir = path.join(OUT_DIR, safeSegment(db));
        mkdirp(dbDir);
        fs.writeFileSync(path.join(dbDir, 'README.md'), renderDbPage(db, triggers));
        results.push({ db, annotated });

        const counts = {};
        for (const t of annotated) counts[t.labels[0]] = (counts[t.labels[0]] || 0) + 1;
        console.log(`    ${triggers.length} triggers: ${Object.entries(counts).map(([k, v]) => `${v} ${k}`).join(', ')}`);
      } catch (e) {
        results.push({ db, error: e.message, annotated: [] });
        console.error(`    ERROR: ${e.message}`);
      }
    }

    fs.writeFileSync(path.join(OUT_DIR, 'README.md'), renderTopIndex(results));
    console.log(`\nWrote trigger docs to ${OUT_DIR}`);
  } catch (e) {
    console.error('Trigger documentation failed:', e.message);
    process.exitCode = 1;
  } finally {
    await close();
  }
})();
