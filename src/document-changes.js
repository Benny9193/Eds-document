// No database connection needed — compares generated outputs against git HEAD.
// Run after `npm run schema` + `npm run business-rules` (or `npm run docs:all`)
// to see what changed since the last committed snapshot.
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT             = path.join(__dirname, '..');
const SCHEMA_PATH      = path.join(ROOT, 'SCHEMA.md');
const RULES_DIR        = path.join(ROOT, 'docs', 'business-rules');
const OUT_PATH         = path.join(ROOT, 'docs', 'CHANGELOG.md');

function mkdirp(p) { fs.mkdirSync(p, { recursive: true }); }

// Run a git command in ROOT; return stdout string or null on failure.
function git(cmd) {
  try {
    return execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
  } catch {
    return null;
  }
}

// ── SCHEMA.md parsing ─────────────────────────────────────────────────────────

// Parse SCHEMA.md into a Map<dbName, [{schema, name, type, rows}]>.
// Relies on the fixed format emitted by renderRootSchema in introspect.js:
//   ### [`db`](link)
//   | [`schema.table`](link) | table | 1234 |
function parseSchema(content) {
  const dbs = new Map();
  let currentDb = null;
  for (const line of content.split('\n')) {
    const dbMatch = line.match(/^### \[`([^`]+)`\]/);
    if (dbMatch) {
      currentDb = dbMatch[1];
      dbs.set(currentDb, []);
      continue;
    }
    if (!currentDb) continue;
    const rowMatch = line.match(/^\| \[`([^.`]+)\.([^`]+)`\]\([^)]*\) \| (table|view) \| (\d*) \|/);
    if (rowMatch) {
      dbs.get(currentDb).push({
        schema: rowMatch[1],
        name:   rowMatch[2],
        type:   rowMatch[3],
        rows:   rowMatch[4] ? parseInt(rowMatch[4], 10) : null,
      });
    }
  }
  return dbs;
}

// Diff two parsed schema Maps. Returns a flat list of change objects.
function diffSchemas(oldMap, newMap) {
  const changes = [];

  for (const db of newMap.keys()) {
    if (!oldMap.has(db)) changes.push({ kind: 'new-db', db });
  }
  for (const db of oldMap.keys()) {
    if (!newMap.has(db)) changes.push({ kind: 'dropped-db', db });
  }

  for (const [db, newObjs] of newMap.entries()) {
    const oldObjs = oldMap.get(db);
    if (!oldObjs) continue;

    const oldSet = new Map(oldObjs.map((o) => [`${o.schema}.${o.name}`, o]));
    const newSet = new Map(newObjs.map((o) => [`${o.schema}.${o.name}`, o]));

    for (const [key, obj] of newSet.entries()) {
      if (!oldSet.has(key)) changes.push({ kind: 'new-object', db, ...obj });
    }
    for (const [key, obj] of oldSet.entries()) {
      if (!newSet.has(key)) changes.push({ kind: 'dropped-object', db, ...obj });
    }
    for (const [key, newObj] of newSet.entries()) {
      const oldObj = oldSet.get(key);
      if (!oldObj || newObj.type !== 'table') continue;
      const oldRows = oldObj.rows ?? 0;
      const newRows = newObj.rows ?? 0;
      if (oldRows === newRows) continue;
      const delta = newRows - oldRows;
      const pct = oldRows > 0 ? Math.abs(delta) / oldRows : 1;
      // Flag if row count shifted by ≥1 000 rows or ≥10 % of previous count.
      if (Math.abs(delta) >= 1000 || (oldRows > 0 && pct >= 0.1)) {
        changes.push({ kind: 'row-count', db, schema: newObj.schema, name: newObj.name, oldRows, newRows, delta });
      }
    }
  }

  return changes;
}

// ── docs/tables/ file diff ────────────────────────────────────────────────────

function changedTableFiles() {
  const out = git('git diff HEAD --name-only -- docs/tables/');
  if (!out) return [];
  return out.trim().split('\n').filter(Boolean).sort();
}

// ── docs/business-rules/ diff ─────────────────────────────────────────────────

// Changed files inside docs/business-rules/ since HEAD.
function changedBusinessRulesFiles() {
  const out = git('git diff HEAD --name-only -- docs/business-rules/');
  if (!out) return [];
  return out.trim().split('\n').filter(Boolean).sort();
}

// New vs dropped database directories in docs/business-rules/ vs git HEAD.
// git ls-files gives committed paths; fs.readdir gives current paths.
function diffBusinessRulesDbs() {
  // Databases currently on disk
  const currentDbs = new Set();
  if (fs.existsSync(RULES_DIR)) {
    for (const entry of fs.readdirSync(RULES_DIR, { withFileTypes: true })) {
      if (entry.isDirectory()) currentDbs.add(entry.name);
    }
  }

  // Databases that were committed (extract <db> from docs/business-rules/<db>/*)
  const lsOutput = git('git ls-files docs/business-rules/');
  const committedDbs = new Set();
  if (lsOutput) {
    for (const f of lsOutput.trim().split('\n').filter(Boolean)) {
      const parts = f.replace(/\\/g, '/').split('/');
      // Expected: docs / business-rules / <db> / README.md
      if (parts.length >= 4) committedDbs.add(parts[2]);
    }
  }

  return {
    newDbs:     [...currentDbs].filter((d) => !committedDbs.has(d)).sort(),
    droppedDbs: [...committedDbs].filter((d) => !currentDbs.has(d)).sort(),
  };
}

// ── Rendering ─────────────────────────────────────────────────────────────────

function sign(n) { return n >= 0 ? `+${n.toLocaleString()}` : `${n.toLocaleString()}`; }

function render(commitRef, changes, tableFileChanges, brDiff, brFileChanges) {
  const out = [];
  out.push('# Schema Changelog');
  out.push('');
  out.push(`_Generated on ${new Date().toISOString()}_`);
  out.push('');
  out.push(
    `Comparing **current generated outputs** (on disk) against **\`${commitRef}\`** (last committed snapshot). ` +
    'Run `npm run schema && npm run business-rules && npm run docs:changes` (or `npm run docs:all`) to refresh.'
  );
  out.push('');

  const newDbs      = changes.filter((c) => c.kind === 'new-db');
  const droppedDbs  = changes.filter((c) => c.kind === 'dropped-db');
  const newObjs     = changes.filter((c) => c.kind === 'new-object');
  const droppedObjs = changes.filter((c) => c.kind === 'dropped-object');
  const rowChanges  = changes.filter((c) => c.kind === 'row-count');

  const hasAnyChange =
    changes.length > 0 ||
    tableFileChanges.length > 0 ||
    brDiff.newDbs.length > 0 ||
    brDiff.droppedDbs.length > 0 ||
    brFileChanges.length > 0;

  if (!hasAnyChange) {
    out.push('> **No changes detected.** All generated outputs match the last committed snapshot.');
    out.push('');
    return out.join('\n');
  }

  // One-line summary
  const parts = [];
  if (newDbs.length)          parts.push(`${newDbs.length} new DB`);
  if (droppedDbs.length)      parts.push(`${droppedDbs.length} dropped DB`);
  if (newObjs.length)         parts.push(`${newObjs.length} new object${newObjs.length !== 1 ? 's' : ''}`);
  if (droppedObjs.length)     parts.push(`${droppedObjs.length} dropped object${droppedObjs.length !== 1 ? 's' : ''}`);
  if (rowChanges.length)      parts.push(`${rowChanges.length} row-count shift${rowChanges.length !== 1 ? 's' : ''}`);
  if (tableFileChanges.length) parts.push(`${tableFileChanges.length} table file${tableFileChanges.length !== 1 ? 's' : ''} changed`);
  if (brDiff.newDbs.length)   parts.push(`${brDiff.newDbs.length} new BR DB`);
  if (brDiff.droppedDbs.length) parts.push(`${brDiff.droppedDbs.length} dropped BR DB`);
  if (brFileChanges.length)   parts.push(`${brFileChanges.length} business-rules file${brFileChanges.length !== 1 ? 's' : ''} changed`);
  out.push(`**${parts.join(' · ')}**`);
  out.push('');

  // ── Schema changes ────────────────────────────────────────────────────────
  if (newDbs.length || droppedDbs.length || newObjs.length || droppedObjs.length || rowChanges.length || tableFileChanges.length) {
    out.push('## Schema changes (`SCHEMA.md` + `docs/tables/`)');
    out.push('');
  }

  if (newDbs.length) {
    out.push('### New databases');
    out.push('');
    for (const c of newDbs) out.push(`- \`${c.db}\``);
    out.push('');
  }

  if (droppedDbs.length) {
    out.push('### Dropped databases');
    out.push('');
    for (const c of droppedDbs) out.push(`- \`${c.db}\``);
    out.push('');
  }

  if (newObjs.length) {
    out.push('### New tables / views');
    out.push('');
    out.push('| Database | Object | Type |');
    out.push('|----------|--------|------|');
    for (const c of newObjs) {
      out.push(`| \`${c.db}\` | \`${c.schema}.${c.name}\` | ${c.type} |`);
    }
    out.push('');
  }

  if (droppedObjs.length) {
    out.push('### Dropped tables / views');
    out.push('');
    out.push('| Database | Object | Type |');
    out.push('|----------|--------|------|');
    for (const c of droppedObjs) {
      out.push(`| \`${c.db}\` | \`${c.schema}.${c.name}\` | ${c.type} |`);
    }
    out.push('');
  }

  if (rowChanges.length) {
    out.push('### Significant row-count changes');
    out.push('');
    out.push('_Threshold: ≥1 000 row delta or ≥10 % change from previous count._');
    out.push('');
    out.push('| Database | Table | Old rows | New rows | Delta |');
    out.push('|----------|-------|----------|----------|-------|');
    for (const c of rowChanges.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))) {
      out.push(
        `| \`${c.db}\` | \`${c.schema}.${c.name}\` | ${c.oldRows.toLocaleString()} | ${c.newRows.toLocaleString()} | ${sign(c.delta)} |`
      );
    }
    out.push('');
  }

  if (tableFileChanges.length) {
    out.push('### Modified table / view files');
    out.push('');
    out.push('Column-level or metadata changes in per-table docs. Run `git diff HEAD docs/tables/` for the full diff.');
    out.push('');
    for (const f of tableFileChanges) out.push(`- \`${f}\``);
    out.push('');
  }

  // ── Business-rules changes ────────────────────────────────────────────────
  if (brDiff.newDbs.length || brDiff.droppedDbs.length || brFileChanges.length) {
    out.push('## Business-rules changes (`docs/business-rules/`)');
    out.push('');
  }

  if (brDiff.newDbs.length) {
    out.push('### New databases in business-rules');
    out.push('');
    for (const db of brDiff.newDbs) out.push(`- \`${db}\``);
    out.push('');
  }

  if (brDiff.droppedDbs.length) {
    out.push('### Dropped databases in business-rules');
    out.push('');
    for (const db of brDiff.droppedDbs) out.push(`- \`${db}\``);
    out.push('');
  }

  if (brFileChanges.length) {
    out.push('### Modified business-rules files');
    out.push('');
    out.push('Trigger, constraint, or computed-column definitions changed. Run `git diff HEAD docs/business-rules/` for details.');
    out.push('');
    for (const f of brFileChanges) out.push(`- \`${f}\``);
    out.push('');
  }

  return out.join('\n');
}

// ── Main ──────────────────────────────────────────────────────────────────────

(async () => {
  const gitVersion = git('git --version');
  if (!gitVersion) {
    console.error('git not found. npm run docs:changes requires git.');
    process.exitCode = 1;
    return;
  }

  if (!fs.existsSync(SCHEMA_PATH)) {
    console.error(`${SCHEMA_PATH} not found. Run npm run schema first.`);
    process.exitCode = 1;
    return;
  }

  const commitRef = 'HEAD';

  // SCHEMA.md diff
  const currentContent = fs.readFileSync(SCHEMA_PATH, 'utf8');
  const currentMap = parseSchema(currentContent);
  console.log(`Current SCHEMA.md: ${currentMap.size} database(s)`);

  const previousContent = git(`git show ${commitRef}:SCHEMA.md`);
  if (!previousContent) {
    console.warn('SCHEMA.md has never been committed or git show failed — treating previous state as empty.');
  }
  const previousMap = previousContent ? parseSchema(previousContent) : new Map();
  console.log(`${commitRef} SCHEMA.md: ${previousMap.size} database(s)`);

  const changes = diffSchemas(previousMap, currentMap);
  const tableFileChanges = changedTableFiles();
  console.log(`Schema: ${changes.length} object-level change(s), ${tableFileChanges.length} file diff(s)`);

  // Business-rules diff
  const brDiff = diffBusinessRulesDbs();
  const brFileChanges = changedBusinessRulesFiles();
  console.log(`Business-rules: ${brDiff.newDbs.length} new DB(s), ${brDiff.droppedDbs.length} dropped DB(s), ${brFileChanges.length} file diff(s)`);

  mkdirp(path.join(ROOT, 'docs'));
  const md = render(commitRef, changes, tableFileChanges, brDiff, brFileChanges);
  fs.writeFileSync(OUT_PATH, md);
  console.log(`\nWrote ${OUT_PATH}`);
})();
