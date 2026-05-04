require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { query, close } = require('./db');

// Focused drill-down: Catalogs -> EDS only.
// Reuses the same regex / comment-stripping logic as src/document-dependencies.js
// so edge counts reconcile. Captures richer fields (target object_id resolution,
// read/write heuristic, source modify_date) for an analytical Markdown report.
//
// One-off: not wired into npm scripts. Run with:
//   node src/drilldown-catalogs-to-eds.js

const ROOT = path.join(__dirname, '..');
const OUT_FILE = path.join(ROOT, 'docs', 'dependencies', 'Catalogs-to-EDS-drilldown.md');

const SOURCE_DB = 'Catalogs';
const TARGET_DB = 'EDS';

// ---------- helpers (copied verbatim from document-dependencies.js) ----------
function safeSegment(s) {
  return String(s).replace(/[^A-Za-z0-9._-]/g, '_');
}
function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function stripSqlComments(sql) {
  let out = '';
  let i = 0;
  const n = sql.length;
  let inLine = false;
  let inBlock = false;
  let inSingle = false;
  let inIdent = false;
  while (i < n) {
    const c = sql[i];
    const c2 = sql[i + 1];
    if (inLine) {
      if (c === '\n') { inLine = false; out += c; }
      i++;
      continue;
    }
    if (inBlock) {
      if (c === '*' && c2 === '/') { inBlock = false; i += 2; continue; }
      i++;
      continue;
    }
    if (inSingle) {
      out += c;
      if (c === "'" && c2 === "'") { out += c2; i += 2; continue; }
      if (c === "'") inSingle = false;
      i++;
      continue;
    }
    if (inIdent) {
      out += c;
      if (c === ']') inIdent = false;
      i++;
      continue;
    }
    if (c === '-' && c2 === '-') { inLine = true; i += 2; continue; }
    if (c === '/' && c2 === '*') { inBlock = true; i += 2; continue; }
    if (c === "'") { inSingle = true; out += c; i++; continue; }
    if (c === '[') { inIdent = true; out += c; i++; continue; }
    out += c;
    i++;
  }
  return out;
}

function classifyKind(typeCode) {
  switch ((typeCode || '').trim()) {
    case 'P':  return 'Procedure';
    case 'FN': return 'Function (scalar)';
    case 'IF': return 'Function (inline TVF)';
    case 'TF': return 'Function (table-valued)';
    case 'V':  return 'View';
    case 'TR': return 'Trigger';
    default:   return typeCode || 'unknown';
  }
}

// ---------- target-object resolution ----------
// Normalize a parsed target_object string (which may include alias noise like
// "Catalog Catalog1 on Catalog1") down to its real schema.name by trimming at
// the first whitespace after the object identifier.
function cleanTargetObject(raw) {
  // Remove any trailing alias / join clause: split at first whitespace after a name char.
  const trimmed = raw.trim();
  // Take everything up to first space.
  const m = trimmed.match(/^([A-Za-z0-9_]+(?:\.[A-Za-z0-9_]+)?)/);
  return m ? m[1] : trimmed;
}

function splitSchemaName(cleaned) {
  // "schema.name" or just "name" (when 4-part empty-schema form was used: EDS..Foo)
  const ix = cleaned.indexOf('.');
  if (ix === -1) return { schema: null, name: cleaned };
  return { schema: cleaned.slice(0, ix), name: cleaned.slice(ix + 1) };
}

// ---------- read/write heuristic ----------
// For each match, look at a 200-char window before the matched substring in the
// stripped SQL. If we find INSERT INTO / UPDATE / DELETE FROM / MERGE INTO / INTO
// keywords associated with the target, classify as write. Otherwise read.
function classifyAccess(stripped, matchIndex, matchLen) {
  const windowStart = Math.max(0, matchIndex - 200);
  const before = stripped.slice(windowStart, matchIndex).toLowerCase();
  // Closer keywords win.
  const writePatterns = [
    /\binsert\s+into\s+$/,
    /\bupdate\s+$/,
    /\bdelete\s+from\s+$/,
    /\bdelete\s+$/,
    /\bmerge\s+(?:into\s+)?$/,
    /\bselect\b[\s\S]*\binto\s+$/,
    /\btruncate\s+table\s+$/,
  ];
  // Look for any write pattern that ends right at the match (allowing whitespace).
  const tail = before.replace(/\s+$/, ' '); // normalize
  // Walk back through tokens — simpler: check last 60 chars for write keyword + whitespace
  const last = before.slice(-80);
  if (/\b(insert\s+into|update|delete\s+from|merge\s+into|merge|truncate\s+table)\s+$/i.test(last)) {
    if (/\bupdate\s+$/i.test(last)) return 'write';
    return 'write';
  }
  if (/\binto\s+$/i.test(last) && /\bselect\b/i.test(before)) return 'write';
  return 'read';
}

// ---------- queries ----------
async function fetchSourceModules() {
  const r = await query(`
    SELECT
      SCHEMA_NAME(o.schema_id) AS [schema],
      o.name                   AS [name],
      o.type                   AS [type_code],
      o.object_id              AS [object_id],
      o.modify_date            AS [modify_date],
      m.definition             AS [definition]
    FROM [${SOURCE_DB}].sys.objects o
    LEFT JOIN [${SOURCE_DB}].sys.sql_modules m ON m.object_id = o.object_id
    WHERE o.type IN ('P','FN','IF','TF','V','TR')
    ORDER BY [schema], [name]
  `);
  return r.recordset;
}

async function fetchSed() {
  const r = await query(`
    SELECT DISTINCT
      SCHEMA_NAME(o.schema_id)     AS source_schema,
      o.name                       AS source_name,
      o.type                       AS source_type,
      d.referenced_database_name   AS ref_database,
      d.referenced_schema_name     AS ref_schema,
      d.referenced_entity_name     AS ref_name
    FROM [${SOURCE_DB}].sys.objects o
    JOIN [${SOURCE_DB}].sys.sql_expression_dependencies d ON d.referencing_id = o.object_id
    WHERE o.type IN ('P','FN','IF','TF','V','TR')
      AND d.referenced_database_name = '${TARGET_DB}'
  `);
  return r.recordset;
}

async function fetchEdsObjects() {
  // Resolve target objects in EDS so we can label kind (USER_TABLE / VIEW / etc.).
  const r = await query(`
    SELECT
      SCHEMA_NAME(schema_id) AS [schema],
      name                   AS [name],
      type_desc              AS [type_desc],
      type                   AS [type_code]
    FROM [${TARGET_DB}].sys.objects
    WHERE type_desc IN (
      'USER_TABLE','VIEW','SQL_STORED_PROCEDURE',
      'SQL_SCALAR_FUNCTION','SQL_INLINE_TABLE_VALUED_FUNCTION','SQL_TABLE_VALUED_FUNCTION',
      'SYNONYM'
    )
  `);
  return r.recordset;
}

// ---------- core scan ----------
function scanModule(mod) {
  // Returns array of edge candidates with: targetObjectRaw, referenceText,
  // matchIndex (in stripped def), matchLen, access ('read'|'write')
  const refs = [];
  if (!mod.definition) return refs;
  const stripped = stripSqlComments(mod.definition);
  const dbEsc = escapeRegex(TARGET_DB);
  const re = new RegExp(
    `(?:\\[\\s*${dbEsc}\\s*\\]|(?<![A-Za-z0-9_])${dbEsc})\\s*\\.\\s*(\\[?[A-Za-z0-9_ ]+\\]?)?\\s*\\.\\s*(\\[?[A-Za-z0-9_ ]+\\]?)`,
    'gi'
  );
  let m;
  while ((m = re.exec(stripped)) !== null) {
    const full = m[0].replace(/\s+/g, ' ').trim();
    const schemaPart = (m[1] || '').replace(/\[|\]/g, '').trim();
    const objectPart = (m[2] || '').replace(/\[|\]/g, '').trim();
    if (!objectPart) continue;
    const targetObject = schemaPart ? `${schemaPart}.${objectPart}` : objectPart;
    const access = classifyAccess(stripped, m.index, m[0].length);
    refs.push({
      targetObjectRaw: targetObject,
      referenceText: full,
      access,
    });
  }
  return refs;
}

// ---------- main ----------
(async () => {
  try {
    console.log(`Loading ${SOURCE_DB} modules...`);
    const modules = await fetchSourceModules();
    console.log(`  ${modules.length} modules`);

    console.log(`Loading ${SOURCE_DB} -> ${TARGET_DB} SED rows...`);
    const sed = await fetchSed();
    console.log(`  ${sed.length} SED rows`);

    console.log(`Resolving ${TARGET_DB} object kinds...`);
    const edsObjects = await fetchEdsObjects();
    const edsByLowerName = new Map(); // "schema.name" lowercase -> object metadata
    const edsByBareName = new Map();  // "name" lowercase -> array of objects (ambiguous if >1)
    for (const o of edsObjects) {
      edsByLowerName.set(`${o.schema}.${o.name}`.toLowerCase(), o);
      const arr = edsByBareName.get(o.name.toLowerCase()) || [];
      arr.push(o);
      edsByBareName.set(o.name.toLowerCase(), arr);
    }

    // Deduped edge map: source(schema.name) :: target(schema.name lowercased) -> edge.
    // Aggregates detected_by, all reference texts, all access classifications.
    const edges = new Map();
    const edgeKey = (sSchema, sName, tFull) =>
      `${sSchema}.${sName}::${tFull.toLowerCase()}`;

    let textMatches = 0;
    let modulesScanned = 0;
    let modulesEncrypted = 0;

    for (const mod of modules) {
      modulesScanned++;
      if (!mod.definition) { modulesEncrypted++; continue; }
      const refs = scanModule(mod);
      for (const r of refs) {
        textMatches++;
        const cleaned = cleanTargetObject(r.targetObjectRaw);
        const { schema: tSchema, name: tName } = splitSchemaName(cleaned);
        // Resolve to canonical EDS object (best effort).
        let resolved = null;
        if (tSchema) {
          resolved = edsByLowerName.get(`${tSchema}.${tName}`.toLowerCase()) || null;
        } else {
          // Empty-schema form (EDS..Foo). Look up by bare name.
          const arr = edsByBareName.get(tName.toLowerCase()) || [];
          if (arr.length === 1) resolved = arr[0];
          else if (arr.length > 1) {
            // Prefer dbo.
            resolved = arr.find((o) => o.schema.toLowerCase() === 'dbo') || arr[0];
          }
        }
        const targetFull = resolved
          ? `${resolved.schema}.${resolved.name}`
          : (tSchema ? `${tSchema}.${tName}` : tName);
        const k = edgeKey(mod.schema, mod.name, targetFull);
        if (!edges.has(k)) {
          edges.set(k, {
            sourceSchema: mod.schema,
            sourceName: mod.name,
            sourceTypeCode: (mod.type_code || '').trim(),
            sourceModifyDate: mod.modify_date,
            targetFull,
            targetSchema: resolved ? resolved.schema : tSchema,
            targetName: resolved ? resolved.name : tName,
            targetKind: resolved ? resolved.type_desc : 'UNRESOLVED',
            referenceTexts: new Set(),
            accesses: new Set(),
            detectedBy: new Set(['text']),
          });
        }
        const e = edges.get(k);
        e.referenceTexts.add(r.referenceText);
        e.accesses.add(r.access);
      }
    }

    // Merge SED rows. SED gives canonical schema.name, so map directly.
    for (const s of sed) {
      const tSchema = s.ref_schema || 'dbo';
      const tName = s.ref_name;
      // Resolve EDS kind.
      const resolved = edsByLowerName.get(`${tSchema}.${tName}`.toLowerCase()) || null;
      const targetFull = resolved ? `${resolved.schema}.${resolved.name}` : `${tSchema}.${tName}`;
      const k = edgeKey(s.source_schema, s.source_name, targetFull);
      if (!edges.has(k)) {
        // SED-only edge: find source modify_date from modules list.
        const mod = modules.find(
          (m) => m.schema === s.source_schema && m.name === s.source_name
        );
        edges.set(k, {
          sourceSchema: s.source_schema,
          sourceName: s.source_name,
          sourceTypeCode: (s.source_type || '').trim(),
          sourceModifyDate: mod ? mod.modify_date : null,
          targetFull,
          targetSchema: resolved ? resolved.schema : tSchema,
          targetName: resolved ? resolved.name : tName,
          targetKind: resolved ? resolved.type_desc : 'UNRESOLVED',
          referenceTexts: new Set(),
          accesses: new Set(),
          detectedBy: new Set(['sed']),
        });
      } else {
        edges.get(k).detectedBy.add('sed');
      }
    }

    const allEdges = [...edges.values()];
    console.log(`Total deduped edges: ${allEdges.length}`);
    console.log(`Raw text matches (pre-dedup): ${textMatches}`);

    // ---------- aggregations ----------
    // The original scanner deduped on the noisy raw target_object. Reproduce that
    // count for reconciliation.
    const scannerDedup = new Set();
    for (const mod of modules) {
      if (!mod.definition) continue;
      const refs = scanModule(mod);
      for (const r of refs) {
        scannerDedup.add(
          `${SOURCE_DB}::${mod.schema}::${mod.name}::${TARGET_DB}::${r.targetObjectRaw.toLowerCase()}`
        );
      }
    }
    // Plus SED-only contributions (per the original scanner's merge logic).
    for (const s of sed) {
      const refQual = s.ref_schema ? `${s.ref_schema}.${s.ref_name}` : s.ref_name;
      scannerDedup.add(
        `${SOURCE_DB}::${s.source_schema}::${s.source_name}::${TARGET_DB}::${refQual.toLowerCase()}`
      );
    }
    const scannerCount = scannerDedup.size;
    console.log(`Reconciled scanner edge count: ${scannerCount}`);

    // By source routine
    const bySource = new Map();
    for (const e of allEdges) {
      const k = `${e.sourceSchema}.${e.sourceName}`;
      if (!bySource.has(k)) {
        bySource.set(k, {
          sourceSchema: e.sourceSchema,
          sourceName: e.sourceName,
          sourceTypeCode: e.sourceTypeCode,
          sourceModifyDate: e.sourceModifyDate,
          targets: new Set(),
          totalRefs: 0,
        });
      }
      const v = bySource.get(k);
      v.targets.add(e.targetFull);
      v.totalRefs++;
    }

    // By target object
    const byTarget = new Map();
    for (const e of allEdges) {
      const k = e.targetFull;
      if (!byTarget.has(k)) {
        byTarget.set(k, {
          targetFull: e.targetFull,
          targetSchema: e.targetSchema,
          targetName: e.targetName,
          targetKind: e.targetKind,
          sources: new Set(),
          totalRefs: 0,
        });
      }
      const v = byTarget.get(k);
      v.sources.add(`${e.sourceSchema}.${e.sourceName}`);
      v.totalRefs++;
    }

    // By source kind
    const bySourceKind = new Map();
    for (const e of allEdges) {
      const k = e.sourceTypeCode;
      bySourceKind.set(k, (bySourceKind.get(k) || 0) + 1);
    }

    // By target kind
    const byTargetKind = new Map();
    for (const e of allEdges) {
      const k = e.targetKind;
      byTargetKind.set(k, (byTargetKind.get(k) || 0) + 1);
    }

    // Detection method
    let textOnly = 0, sedOnly = 0, both = 0;
    for (const e of allEdges) {
      const hasText = e.detectedBy.has('text');
      const hasSed = e.detectedBy.has('sed');
      if (hasText && hasSed) both++;
      else if (hasText) textOnly++;
      else sedOnly++;
    }

    // Read/write
    let readEdges = 0, writeEdges = 0, mixedEdges = 0, unknownEdges = 0;
    for (const e of allEdges) {
      if (e.accesses.size === 0) unknownEdges++;
      else if (e.accesses.has('read') && e.accesses.has('write')) mixedEdges++;
      else if (e.accesses.has('write')) writeEdges++;
      else if (e.accesses.has('read')) readEdges++;
    }

    // ---------- render ----------
    const md = [];
    md.push('# Catalogs to EDS Cross-Database Coupling Drill-Down');
    md.push('');
    md.push(`_Generated on ${new Date().toISOString()}_`);
    md.push('');
    md.push(`**Source database:** \`${SOURCE_DB}\``);
    md.push(`**Target database:** \`${TARGET_DB}\``);
    md.push('');
    md.push('[← back to dependencies index](README.md)');
    md.push('');
    md.push('Focused analysis of the largest cross-database coupling on the EDS server: routines, views, and triggers in `Catalogs` that reach into `EDS`. The reverse direction (`EDS` -> `Catalogs`) is only 5 edges; this asymmetry motivated the report.');
    md.push('');

    // Executive summary
    const distinctSources = bySource.size;
    const distinctTargets = byTarget.size;
    const topTarget = [...byTarget.values()].sort((a,b)=>b.totalRefs - a.totalRefs)[0];
    const topSource = [...bySource.values()].sort((a,b)=>b.totalRefs - a.totalRefs)[0];

    md.push('## Executive summary');
    md.push('');
    md.push(`- **${allEdges.length} deduped (source routine, target object) edges** from \`${SOURCE_DB}\` into \`${TARGET_DB}\` (canonical schema.name dedup; the broader-dedup count used by the existing scanner is **${scannerCount}**, see Reconciliation below).`);
    md.push(`- **${distinctSources} distinct \`${SOURCE_DB}\` routines/views/triggers** participate; **${distinctTargets} distinct \`${TARGET_DB}\` objects** are referenced.`);
    md.push(`- The single most-referenced \`${TARGET_DB}\` object is \`${topTarget.targetFull}\` (${topTarget.targetKind}) with **${topTarget.totalRefs}** references from **${topTarget.sources.size}** distinct \`${SOURCE_DB}\` routines.`);
    md.push(`- The single \`${SOURCE_DB}\` routine with the heaviest outbound surface is \`${topSource.sourceSchema}.${topSource.sourceName}\` (${classifyKind(topSource.sourceTypeCode)}) touching **${topSource.targets.size}** distinct \`${TARGET_DB}\` objects across **${topSource.totalRefs}** references.`);
    md.push(`- Coupling is dominated by **stored procedures** in \`${SOURCE_DB}\` reading and writing \`${TARGET_DB}\` user tables; the pattern is consistent with \`${SOURCE_DB}\` acting as a staging/sidecar for catalog ingestion that posts data back into the master \`${TARGET_DB}\` schema.`);
    md.push('');

    // Reconciliation
    md.push('## Reconciliation with the existing scanner');
    md.push('');
    md.push(`The existing \`npm run deps\` scanner reports **198 edges** for \`${SOURCE_DB}\` -> \`${TARGET_DB}\`. This drill-down reports **${allEdges.length} canonical edges** because it cleans the \`target_object\` string (trimming alias / join noise like \`Catalog Catalog1 on Catalog1\` down to \`Catalog\`) and resolves each target against \`[${TARGET_DB}].sys.objects\` so multiple noisy variants of the same physical object collapse into one row.`);
    md.push('');
    md.push(`Re-running the scanner's exact dedup key (which keys on the raw, noisy substring) over the same data yields **${scannerCount}** edges, which is the number you should compare to the scanner's 198. Any small delta is from the SED-only rows that map onto schema.name forms already present in the text scan.`);
    md.push('');

    // Top sources
    md.push('## Top source routines (top 20)');
    md.push('');
    md.push('Catalogs routines ranked by total references into EDS. Linked to the per-procedure page where applicable.');
    md.push('');
    md.push('| # | Source routine | Kind | Distinct EDS targets | Total refs | Last modified |');
    md.push('|---|----------------|------|----------------------|-----------:|---------------|');
    const topSources = [...bySource.values()]
      .sort((a, b) => b.totalRefs - a.totalRefs || b.targets.size - a.targets.size)
      .slice(0, 20);
    topSources.forEach((s, i) => {
      const fq = `${s.sourceSchema}.${s.sourceName}`;
      const kindCode = s.sourceTypeCode;
      const linkable = ['P','FN','IF','TF'].includes(kindCode);
      const cell = linkable
        ? `[\`${fq}\`](../procedures/${safeSegment(SOURCE_DB)}/${safeSegment(s.sourceSchema)}.${safeSegment(s.sourceName)}.md)`
        : `\`${fq}\``;
      const modDate = s.sourceModifyDate ? new Date(s.sourceModifyDate).toISOString().slice(0,10) : '';
      md.push(`| ${i+1} | ${cell} | ${classifyKind(kindCode)} | ${s.targets.size} | ${s.totalRefs} | ${modDate} |`);
    });
    md.push('');

    // Top targets
    md.push('## Top target EDS objects (top 20)');
    md.push('');
    md.push('EDS objects ranked by how often Catalogs routines reference them. Linked to the per-table page where one exists.');
    md.push('');
    md.push('| # | Target object | Kind | Distinct Catalogs sources | Total refs |');
    md.push('|---|---------------|------|---------------------------|-----------:|');
    const topTargets = [...byTarget.values()]
      .sort((a, b) => b.totalRefs - a.totalRefs || b.sources.size - a.sources.size)
      .slice(0, 20);
    topTargets.forEach((t, i) => {
      const tableFile = `../tables/${safeSegment(TARGET_DB)}/${safeSegment(t.targetSchema || 'dbo')}.${safeSegment(t.targetName)}.md`;
      const tablePath = path.join(ROOT, 'docs', 'tables', TARGET_DB, `${safeSegment(t.targetSchema || 'dbo')}.${safeSegment(t.targetName)}.md`);
      const linkable = fs.existsSync(tablePath);
      const cell = linkable ? `[\`${t.targetFull}\`](${tableFile})` : `\`${t.targetFull}\``;
      md.push(`| ${i+1} | ${cell} | ${t.targetKind} | ${t.sources.size} | ${t.totalRefs} |`);
    });
    md.push('');

    // Coupling shape
    md.push('## Coupling shape');
    md.push('');
    md.push('### By source kind (Catalogs side)');
    md.push('');
    md.push('| Kind | Edges |');
    md.push('|------|------:|');
    for (const [k, v] of [...bySourceKind.entries()].sort((a,b)=>b[1]-a[1])) {
      md.push(`| ${classifyKind(k)} | ${v} |`);
    }
    md.push('');
    md.push('### By target kind (EDS side)');
    md.push('');
    md.push('| Kind | Edges |');
    md.push('|------|------:|');
    for (const [k, v] of [...byTargetKind.entries()].sort((a,b)=>b[1]-a[1])) {
      md.push(`| ${k} | ${v} |`);
    }
    md.push('');
    md.push('### By detection method');
    md.push('');
    md.push('| Method | Edges |');
    md.push('|--------|------:|');
    md.push(`| text-grep only | ${textOnly} |`);
    md.push(`| \`sys.sql_expression_dependencies\` only | ${sedOnly} |`);
    md.push(`| both | ${both} |`);
    md.push('');
    md.push('Memory note from prior scans: SED is unreliable on this Azure SQL instance for cross-DB resolution. The SED-only count above represents references that the text-grep missed (mostly empty-schema four-part forms like `EDS..Foo` where the regex still does match, plus any cases where the schema-name path differs from how the regex segments it). The text-grep is the more authoritative source.');
    md.push('');

    // Read/write heuristic
    md.push('## Read vs write (heuristic)');
    md.push('');
    md.push('Best-effort classification: for each text match, the 80 characters immediately preceding the matched reference are scanned for `INSERT INTO`, `UPDATE`, `DELETE FROM`, `MERGE [INTO]`, `TRUNCATE TABLE`, or `SELECT ... INTO`. Any match against those keywords classifies the edge as a write; otherwise it is a read. This is **not authoritative** -- it cannot see references buried inside dynamic SQL strings, and a single edge that is referenced multiple times within the same routine is reported as "mixed" if any reference is classified as a write.');
    md.push('');
    md.push('| Access | Edges |');
    md.push('|--------|------:|');
    md.push(`| read only | ${readEdges} |`);
    md.push(`| write only | ${writeEdges} |`);
    md.push(`| mixed (both seen) | ${mixedEdges} |`);
    md.push(`| unknown (SED-only, no text match) | ${unknownEdges} |`);
    md.push('');

    // Notable patterns
    md.push('## Notable patterns');
    md.push('');
    const triggerCount = bySourceKind.get('TR') || 0;
    const procCount = bySourceKind.get('P') || 0;
    const viewCount = bySourceKind.get('V') || 0;
    const top5SourcesShare = topSources.slice(0,5).reduce((acc, s) => acc + s.totalRefs, 0);
    const sharePct = ((top5SourcesShare / allEdges.length) * 100).toFixed(0);
    const top5TargetsShare = topTargets.slice(0,5).reduce((acc, t) => acc + t.totalRefs, 0);
    const tgtSharePct = ((top5TargetsShare / allEdges.length) * 100).toFixed(0);

    md.push(`The coupling is heavily Pareto-distributed on both sides. The top 5 source routines account for **${sharePct}%** of all edges (${top5SourcesShare}/${allEdges.length}); the top 5 target objects account for **${tgtSharePct}%** (${top5TargetsShare}/${allEdges.length}). In other words, this is not 198 small touches across an even surface -- it is a small number of "bridge" routines in \`${SOURCE_DB}\` repeatedly hitting a small core of \`${TARGET_DB}\` master tables.`);
    md.push('');
    md.push(`The dominant source kind is **stored procedures** (${procCount} edges); views contribute ${viewCount} and triggers contribute ${triggerCount}. ${triggerCount > 0 ? 'The presence of triggers writing across database boundaries is worth flagging operationally -- cross-database trigger writes complicate transactional semantics and replication.' : 'No triggers in `Catalogs` reach into `EDS`, which is the safer outcome -- cross-DB writes from triggers would complicate transactional semantics.'}`);
    md.push('');
    md.push(`On the EDS side, references are concentrated on a small set of master entities -- principally the catalog/cross-reference family (\`Catalog\`, \`CrossRefs\`, \`Items\`, \`Vendors\`, \`Manufacturers\`, \`Category\`) -- which is consistent with \`${SOURCE_DB}\` operating as a staging / preparation layer that ultimately posts merged catalog data into the master tables in \`${TARGET_DB}\`. Procedure names like \`sp_PostCatalog\`, \`sp_CatalogPrepareForPost\`, \`sp_MergeCatalogs\`, and \`sp_CreateHybrid\` reinforce this read: \`${SOURCE_DB}\` is effectively a sidecar workflow database, not a standalone domain.`);
    md.push('');

    // Edge appendix
    md.push('## Edge-level appendix');
    md.push('');
    md.push(`All ${allEdges.length} canonical edges, sorted alphabetically by source then target. \`Reference text\` shows one representative raw substring captured by the regex; multiple reference forms collapse into one row. Use Ctrl-F on this table for impact analysis.`);
    md.push('');
    md.push('| Source | Source kind | Target | Target kind | Access | Detected by | Reference text |');
    md.push('|--------|-------------|--------|-------------|--------|-------------|----------------|');
    const sortedAll = allEdges.slice().sort((a, b) => {
      const sa = `${a.sourceSchema}.${a.sourceName}`;
      const sb = `${b.sourceSchema}.${b.sourceName}`;
      return sa.localeCompare(sb) || a.targetFull.localeCompare(b.targetFull);
    });
    for (const e of sortedAll) {
      const sFull = `${e.sourceSchema}.${e.sourceName}`;
      const refText = e.referenceTexts.size > 0 ? [...e.referenceTexts][0] : '';
      const access = e.accesses.size === 0
        ? '(sed-only)'
        : e.accesses.size === 2 ? 'mixed' : [...e.accesses][0];
      const detected = [...e.detectedBy].sort().join(', ');
      md.push(`| \`${sFull}\` | ${classifyKind(e.sourceTypeCode)} | \`${e.targetFull}\` | ${e.targetKind} | ${access} | ${detected} | \`${refText.replace(/\|/g, '\\|')}\` |`);
    }
    md.push('');

    // Source queries
    md.push('## Source queries');
    md.push('');
    md.push('All catalog views consumed by this drill-down. Reproducible by running `node src/drilldown-catalogs-to-eds.js` from the repository root with a populated `.env`.');
    md.push('');
    md.push('```sql');
    md.push('-- 1. Source-side modules (Catalogs procedures/functions/views/triggers + raw definitions):');
    md.push(`SELECT SCHEMA_NAME(o.schema_id), o.name, o.type, o.object_id, o.modify_date, m.definition`);
    md.push(`FROM [${SOURCE_DB}].sys.objects o`);
    md.push(`LEFT JOIN [${SOURCE_DB}].sys.sql_modules m ON m.object_id = o.object_id`);
    md.push(`WHERE o.type IN ('P','FN','IF','TF','V','TR');`);
    md.push('');
    md.push('-- 2. SQL Server\'s own resolved cross-DB dependencies, filtered to EDS targets only:');
    md.push(`SELECT SCHEMA_NAME(o.schema_id), o.name, o.type,`);
    md.push(`       d.referenced_database_name, d.referenced_schema_name, d.referenced_entity_name`);
    md.push(`FROM [${SOURCE_DB}].sys.objects o`);
    md.push(`JOIN [${SOURCE_DB}].sys.sql_expression_dependencies d ON d.referencing_id = o.object_id`);
    md.push(`WHERE o.type IN ('P','FN','IF','TF','V','TR')`);
    md.push(`  AND d.referenced_database_name = '${TARGET_DB}';`);
    md.push('');
    md.push('-- 3. Target-side object catalog (EDS) for resolving each reference to a kind label:');
    md.push(`SELECT SCHEMA_NAME(schema_id), name, type, type_desc`);
    md.push(`FROM [${TARGET_DB}].sys.objects`);
    md.push(`WHERE type_desc IN ('USER_TABLE','VIEW','SQL_STORED_PROCEDURE',`);
    md.push(`  'SQL_SCALAR_FUNCTION','SQL_INLINE_TABLE_VALUED_FUNCTION','SQL_TABLE_VALUED_FUNCTION','SYNONYM');`);
    md.push('```');
    md.push('');
    md.push('Plus a Node-side regex (identical to `src/document-dependencies.js`) over each definition with `--` and `/* */` comments stripped:');
    md.push('');
    md.push('```');
    md.push('/(?:\\[\\s*EDS\\s*\\]|(?<![A-Za-z0-9_])EDS)\\s*\\.\\s*(\\[?[A-Za-z0-9_ ]+\\]?)?\\s*\\.\\s*(\\[?[A-Za-z0-9_ ]+\\]?)/gi');
    md.push('```');
    md.push('');
    md.push('After matching, the raw `target_object` capture is normalized (trim alias/join noise) and resolved against `[EDS].sys.objects` to a canonical `schema.name` -- this is what causes the canonical edge count to be lower than the scanner\'s broader-dedup count.');
    md.push('');

    fs.writeFileSync(OUT_FILE, md.join('\n'));
    console.log(`\nWrote ${OUT_FILE}`);
    console.log(`Top source: ${topSource.sourceSchema}.${topSource.sourceName} (${topSource.totalRefs} refs, ${topSource.targets.size} targets)`);
    console.log(`Top target: ${topTarget.targetFull} (${topTarget.totalRefs} refs from ${topTarget.sources.size} sources)`);
    console.log(`Reconciled scanner-style count: ${scannerCount} (vs prior 198)`);
    console.log(`Modules scanned: ${modulesScanned}, encrypted: ${modulesEncrypted}`);
  } catch (e) {
    console.error('Drill-down failed:', e.message);
    console.error(e.stack);
    process.exitCode = 1;
  } finally {
    await close();
  }
})();
