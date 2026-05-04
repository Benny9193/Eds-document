require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { query, close } = require('./db');

const ROOT = path.join(__dirname, '..');
const DEPS_DIR = path.join(ROOT, 'docs', 'dependencies');
const PROCS_DIR_REL = '../../procedures'; // from docs/dependencies/<db>/file.md to docs/procedures

// The candidate target list — same 8 production DBs document-procedures.js covers.
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

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isoDate(d) {
  if (!d) return '';
  const dt = d instanceof Date ? d : new Date(d);
  return Number.isNaN(dt.getTime()) ? '' : dt.toISOString().slice(0, 19).replace('T', ' ');
}

// Strip line and block SQL comments before scanning for DB references — eliminates
// false positives like "-- references [Catalogs].dbo.Foo" in comments. Imperfect
// (won't handle a `--` inside a string literal) but a good first pass.
function stripSqlComments(sql) {
  let out = '';
  let i = 0;
  const n = sql.length;
  let inLine = false;
  let inBlock = false;
  let inSingle = false; // single-quoted string
  let inIdent = false; // bracketed identifier [ ... ]
  while (i < n) {
    const c = sql[i];
    const c2 = sql[i + 1];
    if (inLine) {
      if (c === '\n') {
        inLine = false;
        out += c;
      }
      i++;
      continue;
    }
    if (inBlock) {
      if (c === '*' && c2 === '/') {
        inBlock = false;
        i += 2;
        continue;
      }
      i++;
      continue;
    }
    if (inSingle) {
      out += c;
      if (c === "'" && c2 === "'") {
        out += c2;
        i += 2;
        continue;
      }
      if (c === "'") {
        inSingle = false;
      }
      i++;
      continue;
    }
    if (inIdent) {
      out += c;
      if (c === ']') inIdent = false;
      i++;
      continue;
    }
    if (c === '-' && c2 === '-') {
      inLine = true;
      i += 2;
      continue;
    }
    if (c === '/' && c2 === '*') {
      inBlock = true;
      i += 2;
      continue;
    }
    if (c === "'") {
      inSingle = true;
      out += c;
      i++;
      continue;
    }
    if (c === '[') {
      inIdent = true;
      out += c;
      i++;
      continue;
    }
    out += c;
    i++;
  }
  return out;
}

// ---------- queries ----------
async function listUserDatabases() {
  const r = await query(
    "SELECT name FROM sys.databases WHERE database_id > 4 AND state_desc = 'ONLINE' ORDER BY name"
  );
  return r.recordset.map((row) => row.name);
}

async function inspectModules(dbName) {
  const modules = await query(`
    SELECT
      SCHEMA_NAME(o.schema_id) AS [schema],
      o.name                   AS [name],
      o.type                   AS [type_code],
      o.type_desc              AS [type_desc],
      m.definition             AS [definition]
    FROM [${dbName}].sys.objects o
    LEFT JOIN [${dbName}].sys.sql_modules m ON m.object_id = o.object_id
    WHERE o.type IN ('P','FN','IF','TF','V','TR')
    ORDER BY [schema], [name]
  `);

  // Cross-database expression dependencies as reported by SQL Server itself.
  // sys.sql_expression_dependencies populates referenced_database_name when
  // the reference is fully-qualified — useful comparison vs. the text-grep.
  const sed = await query(`
    SELECT DISTINCT
      SCHEMA_NAME(o.schema_id)     AS source_schema,
      o.name                       AS source_name,
      o.type                       AS source_type,
      d.referenced_database_name   AS ref_database,
      d.referenced_schema_name     AS ref_schema,
      d.referenced_entity_name     AS ref_name
    FROM [${dbName}].sys.objects o
    JOIN [${dbName}].sys.sql_expression_dependencies d ON d.referencing_id = o.object_id
    WHERE o.type IN ('P','FN','IF','TF','V','TR')
      AND d.referenced_database_name IS NOT NULL
      AND d.referenced_database_name <> ''
      AND d.referenced_database_name <> '${dbName}'
  `);

  return { modules: modules.recordset, sed: sed.recordset };
}

// ---------- classification ----------
function classifyKind(typeCode) {
  switch ((typeCode || '').trim()) {
    case 'P':
      return { kind: 'procedure', label: 'Procedure', linkable: true };
    case 'FN':
      return { kind: 'function', label: 'Function (scalar)', linkable: true };
    case 'IF':
      return { kind: 'function', label: 'Function (inline TVF)', linkable: true };
    case 'TF':
      return { kind: 'function', label: 'Function (table-valued)', linkable: true };
    case 'V':
      return { kind: 'view', label: 'View', linkable: false };
    case 'TR':
      return { kind: 'trigger', label: 'Trigger', linkable: false };
    default:
      return { kind: 'other', label: typeCode || 'unknown', linkable: false };
  }
}

// ---------- core: text-grep for cross-DB references ----------
function findCrossDbRefs(sourceDb, definitionRaw, candidateDbs) {
  if (!definitionRaw) return [];
  const definition = stripSqlComments(definitionRaw);
  const refs = [];
  const seen = new Set();

  for (const targetDb of candidateDbs) {
    if (targetDb.toLowerCase() === sourceDb.toLowerCase()) continue;
    const dbEsc = escapeRegex(targetDb);
    // Match either bracketed `[Db]` or bare `Db` followed by `.` then a schema/object.
    // Captures the full 3-part (or 4-part with empty schema) name including brackets.
    // The lookbehind ensures the bare form is on a word boundary (not part of a longer name).
    const re = new RegExp(
      `(?:\\[\\s*${dbEsc}\\s*\\]|(?<![A-Za-z0-9_])${dbEsc})\\s*\\.\\s*(\\[?[A-Za-z0-9_ ]+\\]?)?\\s*\\.\\s*(\\[?[A-Za-z0-9_ ]+\\]?)`,
      'gi'
    );
    let m;
    while ((m = re.exec(definition)) !== null) {
      const full = m[0].replace(/\s+/g, ' ').trim();
      // Reconstruct the referenced object: schema (if present) + object.
      const schemaPart = (m[1] || '').replace(/\[|\]/g, '').trim();
      const objectPart = (m[2] || '').replace(/\[|\]/g, '').trim();
      if (!objectPart) continue;
      const targetObject = schemaPart ? `${schemaPart}.${objectPart}` : objectPart;
      const dedup = `${targetDb}::${targetObject.toLowerCase()}`;
      if (seen.has(dedup)) continue;
      seen.add(dedup);
      refs.push({ targetDb, targetObject, referenceText: full });
    }
  }
  return refs;
}

// ---------- rendering ----------
function procPageLink(sourceDb, schema, name) {
  // From docs/dependencies/<sourceDb>/outbound.md, link to docs/procedures/<sourceDb>/<schema>.<name>.md
  return `${PROCS_DIR_REL}/${safeSegment(sourceDb)}/${safeSegment(schema)}.${safeSegment(name)}.md`;
}

function renderSourceCell(sourceDb, edge) {
  const fq = `${edge.source_schema}.${edge.source_name}`;
  const kindInfo = classifyKind(edge.source_type);
  if (kindInfo.linkable) {
    return `[\`${fq}\`](${procPageLink(sourceDb, edge.source_schema, edge.source_name)})`;
  }
  return `\`${fq}\``;
}

function renderOutboundPage(sourceDb, edges) {
  const out = [];
  out.push(`# Cross-database outbound references: \`${sourceDb}\``);
  out.push('');
  out.push(`_Generated on ${new Date().toISOString()}_`);
  out.push('');
  out.push(`**Source database:** \`${sourceDb}\``);
  out.push('');
  out.push('[← back to dependencies index](../README.md)');
  out.push('');
  out.push('Routines, views, and triggers in this database that reference objects in another database.');
  out.push('Detected by text-scanning `sys.sql_modules.definition` for three-part names like `[OtherDb].schema.object` or `OtherDb.schema.object`.');
  out.push('');

  if (edges.length === 0) {
    out.push('## Outbound references');
    out.push('');
    out.push('None.');
    out.push('');
    return out.join('\n');
  }

  // Group by target DB.
  const byTarget = new Map();
  for (const e of edges) {
    if (!byTarget.has(e.target_db)) byTarget.set(e.target_db, []);
    byTarget.get(e.target_db).push(e);
  }

  out.push('## Summary');
  out.push('');
  out.push('| Target database | Distinct edges |');
  out.push('|-----------------|----------------|');
  for (const [t, es] of [...byTarget.entries()].sort()) {
    out.push(`| \`${t}\` | ${es.length} |`);
  }
  out.push('');

  for (const [targetDb, list] of [...byTarget.entries()].sort()) {
    out.push(`## → \`${targetDb}\``);
    out.push('');
    out.push('| Source routine | Source kind | Target object | Reference text | Detected by |');
    out.push('|----------------|-------------|---------------|----------------|-------------|');
    list.sort((a, b) =>
      `${a.source_schema}.${a.source_name}`.localeCompare(`${b.source_schema}.${b.source_name}`) ||
      a.target_object.localeCompare(b.target_object)
    );
    for (const e of list) {
      const kindLabel = classifyKind(e.source_type).label;
      const detected = [...e.detected_by].sort().join(', ');
      out.push(
        `| ${renderSourceCell(sourceDb, e)} | ${kindLabel} | \`${e.target_object}\` | \`${e.reference_text || ''}\` | ${detected} |`
      );
    }
    out.push('');
  }

  out.push('## Source queries');
  out.push('');
  out.push('- `sys.objects` joined to `sys.sql_modules` — full T-SQL definition of every procedure, function, view, and trigger.');
  out.push('- `sys.sql_expression_dependencies` — SQL Server\'s own resolved cross-DB references (used as a cross-check).');
  out.push('- Text-grep over the definition for `[<db>].` and `<db>.` patterns (after stripping comments).');
  out.push('');
  return out.join('\n');
}

function renderInboundPage(targetDb, edges) {
  const out = [];
  out.push(`# Cross-database inbound references: \`${targetDb}\``);
  out.push('');
  out.push(`_Generated on ${new Date().toISOString()}_`);
  out.push('');
  out.push(`**Target database:** \`${targetDb}\``);
  out.push('');
  out.push('[← back to dependencies index](../README.md)');
  out.push('');
  out.push('Routines, views, and triggers in *other* databases that reach into this database.');
  out.push('');

  if (edges.length === 0) {
    out.push('## Inbound references');
    out.push('');
    out.push('None.');
    out.push('');
    return out.join('\n');
  }

  const bySource = new Map();
  for (const e of edges) {
    if (!bySource.has(e.source_db)) bySource.set(e.source_db, []);
    bySource.get(e.source_db).push(e);
  }

  out.push('## Summary');
  out.push('');
  out.push('| Source database | Distinct edges |');
  out.push('|-----------------|----------------|');
  for (const [s, es] of [...bySource.entries()].sort()) {
    out.push(`| \`${s}\` | ${es.length} |`);
  }
  out.push('');

  for (const [sourceDb, list] of [...bySource.entries()].sort()) {
    out.push(`## ← \`${sourceDb}\``);
    out.push('');
    out.push('| Source routine | Source kind | Target object | Reference text | Detected by |');
    out.push('|----------------|-------------|---------------|----------------|-------------|');
    list.sort((a, b) =>
      `${a.source_schema}.${a.source_name}`.localeCompare(`${b.source_schema}.${b.source_name}`) ||
      a.target_object.localeCompare(b.target_object)
    );
    for (const e of list) {
      const kindLabel = classifyKind(e.source_type).label;
      const detected = [...e.detected_by].sort().join(', ');
      out.push(
        `| ${renderSourceCell(sourceDb, e)} | ${kindLabel} | \`${e.target_object}\` | \`${e.reference_text || ''}\` | ${detected} |`
      );
    }
    out.push('');
  }

  out.push('## Source queries');
  out.push('');
  out.push('See per-source-database `outbound.md` and the top-level `README.md` for the full method.');
  out.push('');
  return out.join('\n');
}

function renderTopIndex(targets, allEdges, perDbStats) {
  const out = [];
  out.push('# Cross-database dependency graph');
  out.push('');
  out.push(`_Generated on ${new Date().toISOString()}_`);
  out.push('');
  out.push(`**Server:** \`${process.env.DB_SERVER}\``);
  out.push('');
  out.push('How routines, views, and triggers in one production database reach into another. ');
  out.push('Built from `sys.sql_modules.definition` text scans (with comments stripped) cross-checked against `sys.sql_expression_dependencies`. ');
  out.push('Regenerated by `npm run deps`.');
  out.push('');

  // Matrix
  out.push('## Coupling matrix');
  out.push('');
  out.push('Cell = count of distinct (source routine, target object) edges from the row\'s database into the column\'s database. Self-cells blank.');
  out.push('');

  const matrix = new Map();
  for (const e of allEdges) {
    const key = `${e.source_db}::${e.target_db}`;
    matrix.set(key, (matrix.get(key) || 0) + 1);
  }
  const header = '| Source ↓ \\ Target → | ' + targets.map((t) => `\`${t}\``).join(' | ') + ' | Total |';
  const sep = '|' + '---|'.repeat(targets.length + 2);
  out.push(header);
  out.push(sep);
  for (const src of targets) {
    const cells = [];
    let total = 0;
    for (const tgt of targets) {
      if (src === tgt) {
        cells.push('');
      } else {
        const c = matrix.get(`${src}::${tgt}`) || 0;
        cells.push(c === 0 ? '0' : String(c));
        total += c;
      }
    }
    out.push(`| \`${src}\` | ${cells.join(' | ')} | **${total}** |`);
  }
  // Totals row
  const totalsRow = ['**Total**'];
  let grand = 0;
  for (const tgt of targets) {
    let col = 0;
    for (const src of targets) {
      if (src === tgt) continue;
      col += matrix.get(`${src}::${tgt}`) || 0;
    }
    grand += col;
    totalsRow.push(`**${col}**`);
  }
  totalsRow.push(`**${grand}**`);
  out.push(`| ${totalsRow.join(' | ')} |`);
  out.push('');

  // Strongest couplings
  out.push('## Strongest couplings');
  out.push('');
  const pairs = [...matrix.entries()]
    .map(([k, v]) => {
      const [s, t] = k.split('::');
      return { source: s, target: t, count: v };
    })
    .sort((a, b) => b.count - a.count);
  if (pairs.length === 0) {
    out.push('No cross-database references detected.');
  } else {
    for (const p of pairs.slice(0, 5)) {
      out.push(`- \`${p.source}\` → \`${p.target}\`: **${p.count}** edges`);
    }
  }
  out.push('');

  // Per-DB index
  out.push('## Per-database pages');
  out.push('');
  out.push('| Database | Outbound edges | Inbound edges | Modules scanned | Encrypted skipped |');
  out.push('|----------|----------------|---------------|-----------------|-------------------|');
  for (const t of targets) {
    const s = perDbStats.get(t) || { outbound: 0, inbound: 0, scanned: 0, encrypted: 0 };
    out.push(
      `| \`${t}\` | [${s.outbound}](${safeSegment(t)}/outbound.md) | [${s.inbound}](${safeSegment(t)}/inbound.md) | ${s.scanned} | ${s.encrypted} |`
    );
  }
  out.push('');

  // SED comparison
  out.push('## sys.sql_expression_dependencies comparison');
  out.push('');
  const sedOnly = allEdges.filter((e) => e.detected_by.has('sed') && !e.detected_by.has('text')).length;
  const textOnly = allEdges.filter((e) => e.detected_by.has('text') && !e.detected_by.has('sed')).length;
  const both = allEdges.filter((e) => e.detected_by.has('sed') && e.detected_by.has('text')).length;
  out.push(`- Edges found by **text-grep only**: ${textOnly}`);
  out.push(`- Edges found by **\`sys.sql_expression_dependencies\` only**: ${sedOnly}`);
  out.push(`- Edges found by **both**: ${both}`);
  out.push('');
  if (sedOnly === 0 && textOnly > 0) {
    out.push('> `sys.sql_expression_dependencies` returned **no** cross-DB references that the text-grep missed. On this Azure SQL instance the catalog view appears unreliable for cross-DB resolution, so the text-grep is the source of truth here.');
    out.push('');
  }

  out.push('## Source queries');
  out.push('');
  out.push('```sql');
  out.push('-- Definitions of every routine, view, and trigger:');
  out.push('SELECT SCHEMA_NAME(o.schema_id), o.name, o.type, m.definition');
  out.push('FROM [<db>].sys.objects o');
  out.push('LEFT JOIN [<db>].sys.sql_modules m ON m.object_id = o.object_id');
  out.push("WHERE o.type IN ('P','FN','IF','TF','V','TR');");
  out.push('');
  out.push("-- SQL Server's own cross-DB dependency view (cross-check):");
  out.push('SELECT SCHEMA_NAME(o.schema_id), o.name,');
  out.push('       d.referenced_database_name, d.referenced_schema_name, d.referenced_entity_name');
  out.push('FROM [<db>].sys.objects o');
  out.push('JOIN [<db>].sys.sql_expression_dependencies d ON d.referencing_id = o.object_id');
  out.push('WHERE d.referenced_database_name IS NOT NULL');
  out.push('  AND d.referenced_database_name <> DB_NAME();');
  out.push('```');
  out.push('');
  out.push('Plus a Node-side regex over each definition (with `--` and `/* */` comments stripped) of the form:');
  out.push('');
  out.push('```');
  out.push('/(?:\\[\\s*<db>\\s*\\]|(?<![A-Za-z0-9_])<db>)\\s*\\.\\s*(\\[?\\w+\\]?)?\\s*\\.\\s*(\\[?\\w+\\]?)/gi');
  out.push('```');
  out.push('');
  return out.join('\n');
}

// ---------- main ----------
(async () => {
  try {
    const allDbs = await listUserDatabases();
    console.log(`Found ${allDbs.length} user database(s).`);
    const targets = DBS.filter((d) => allDbs.includes(d));
    const missing = DBS.filter((d) => !allDbs.includes(d));
    for (const m of missing) {
      console.error(`  WARN: requested database '${m}' not found / not online — skipping`);
    }

    if (fs.existsSync(DEPS_DIR)) {
      fs.rmSync(DEPS_DIR, { recursive: true, force: true });
    }
    mkdirp(DEPS_DIR);

    // Phase 1: scan everything, build a flat edge list.
    // edge = { source_db, source_schema, source_name, source_type,
    //          target_db, target_object, reference_text, detected_by:Set }
    const allEdges = [];
    const perDbStats = new Map();
    for (const db of targets) {
      perDbStats.set(db, { outbound: 0, inbound: 0, scanned: 0, encrypted: 0 });
    }

    for (const db of targets) {
      console.log(`Scanning ${db}...`);
      try {
        const { modules, sed } = await inspectModules(db);
        const stat = perDbStats.get(db);
        const edgeKey = (e) =>
          `${e.source_db}::${e.source_schema}::${e.source_name}::${e.target_db}::${e.target_object.toLowerCase()}`;
        const edgeIndex = new Map(); // dedupe within this source db

        for (const m of modules) {
          if (!m.schema || !m.name) continue;
          stat.scanned++;
          if (!m.definition) {
            stat.encrypted++;
            continue;
          }
          const refs = findCrossDbRefs(db, m.definition, targets);
          for (const r of refs) {
            const e = {
              source_db: db,
              source_schema: m.schema,
              source_name: m.name,
              source_type: (m.type_code || '').trim(),
              target_db: r.targetDb,
              target_object: r.targetObject,
              reference_text: r.referenceText,
              detected_by: new Set(['text']),
            };
            const k = edgeKey(e);
            if (edgeIndex.has(k)) continue;
            edgeIndex.set(k, e);
          }
        }

        // Merge SED rows into the same edge index so we can flag detection source.
        for (const s of sed) {
          if (!s.ref_database) continue;
          // Only count SED rows that target one of our candidate DBs (others are out of scope).
          const targetDbExact = targets.find(
            (t) => t.toLowerCase() === s.ref_database.toLowerCase()
          );
          if (!targetDbExact) continue;
          if (targetDbExact.toLowerCase() === db.toLowerCase()) continue;
          const refQualified = s.ref_schema
            ? `${s.ref_schema}.${s.ref_name}`
            : s.ref_name;
          const e = {
            source_db: db,
            source_schema: s.source_schema,
            source_name: s.source_name,
            source_type: (s.source_type || '').trim(),
            target_db: targetDbExact,
            target_object: refQualified,
            reference_text: '',
            detected_by: new Set(['sed']),
          };
          const k = edgeKey(e);
          if (edgeIndex.has(k)) {
            edgeIndex.get(k).detected_by.add('sed');
          } else {
            edgeIndex.set(k, e);
          }
        }

        for (const e of edgeIndex.values()) {
          allEdges.push(e);
        }
        stat.outbound = edgeIndex.size;
        console.log(`  ${db}: scanned ${stat.scanned} modules, ${stat.encrypted} encrypted, ${stat.outbound} outbound edges`);
      } catch (e) {
        console.error(`  ${db}: ERROR ${e.message}`);
      }
    }

    // Inbound counts
    for (const e of allEdges) {
      const tgt = perDbStats.get(e.target_db);
      if (tgt) tgt.inbound++;
    }

    // Phase 2: render per-DB outbound + inbound files.
    for (const db of targets) {
      const dbDir = path.join(DEPS_DIR, safeSegment(db));
      mkdirp(dbDir);
      const outbound = allEdges.filter((e) => e.source_db === db);
      const inbound = allEdges.filter((e) => e.target_db === db);
      fs.writeFileSync(path.join(dbDir, 'outbound.md'), renderOutboundPage(db, outbound));
      fs.writeFileSync(path.join(dbDir, 'inbound.md'), renderInboundPage(db, inbound));
    }

    // Phase 3: render top-level index.
    fs.writeFileSync(path.join(DEPS_DIR, 'README.md'), renderTopIndex(targets, allEdges, perDbStats));

    // Phase 4: console summary matrix.
    console.log('\nCoupling matrix (rows = source, cols = target):');
    const colWidth = Math.max(10, ...targets.map((t) => t.length)) + 2;
    const pad = (s, w) => String(s).padEnd(w, ' ');
    process.stdout.write(pad('', colWidth));
    for (const t of targets) process.stdout.write(pad(t, colWidth));
    process.stdout.write('\n');
    const matrix = new Map();
    for (const e of allEdges) {
      matrix.set(`${e.source_db}::${e.target_db}`, (matrix.get(`${e.source_db}::${e.target_db}`) || 0) + 1);
    }
    for (const src of targets) {
      process.stdout.write(pad(src, colWidth));
      for (const tgt of targets) {
        if (src === tgt) {
          process.stdout.write(pad('-', colWidth));
        } else {
          process.stdout.write(pad(matrix.get(`${src}::${tgt}`) || 0, colWidth));
        }
      }
      process.stdout.write('\n');
    }

    console.log(`\nWrote dependency docs under ${DEPS_DIR}`);
  } catch (e) {
    console.error('Dependency documentation failed:', e.message);
    process.exitCode = 1;
  } finally {
    await close();
  }
})();
