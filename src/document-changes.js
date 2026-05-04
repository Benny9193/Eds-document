// No database connection needed — compares SCHEMA.md on disk against git HEAD.
// Run after `npm run schema` to see what changed since the last committed snapshot.
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SCHEMA_PATH = path.join(ROOT, 'SCHEMA.md');
const OUT_PATH = path.join(ROOT, 'docs', 'CHANGELOG.md');

function mkdirp(p) { fs.mkdirSync(p, { recursive: true }); }

// Run a git command in ROOT; return stdout string or null on failure.
function git(cmd) {
  try {
    return execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
  } catch {
    return null;
  }
}

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
    // Matches: | [`schema.table`](link) | table | 1234 |
    // Schema/table name may not contain backticks (valid SQL identifiers).
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

// Return sorted list of docs/tables/** files that differ from HEAD.
function changedTableFiles() {
  const out = git('git diff HEAD --name-only -- docs/tables/');
  if (!out) return [];
  return out.trim().split('\n').filter(Boolean).sort();
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
    if (!oldObjs) continue; // already recorded as new-db

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

function sign(n) { return n >= 0 ? `+${n.toLocaleString()}` : `${n.toLocaleString()}`; }

function render(commitRef, oldMap, newMap, changes, tableFileChanges) {
  const out = [];
  const ts = new Date().toISOString();
  out.push('# Schema Changelog');
  out.push('');
  out.push(`_Generated on ${ts}_`);
  out.push('');
  out.push(`Comparing **current SCHEMA.md** (on disk) against **\`${commitRef}\`** (last committed snapshot).`);
  out.push('Run `npm run schema` then `npm run docs:changes` to refresh this file.');
  out.push('');

  const newDbs      = changes.filter((c) => c.kind === 'new-db');
  const droppedDbs  = changes.filter((c) => c.kind === 'dropped-db');
  const newObjs     = changes.filter((c) => c.kind === 'new-object');
  const droppedObjs = changes.filter((c) => c.kind === 'dropped-object');
  const rowChanges  = changes.filter((c) => c.kind === 'row-count');

  if (changes.length === 0 && tableFileChanges.length === 0) {
    out.push('> **No changes detected.** SCHEMA.md matches the last committed snapshot.');
    out.push('');
    return out.join('\n');
  }

  // Summary
  const parts = [];
  if (newDbs.length)      parts.push(`${newDbs.length} new database${newDbs.length !== 1 ? 's' : ''}`);
  if (droppedDbs.length)  parts.push(`${droppedDbs.length} dropped database${droppedDbs.length !== 1 ? 's' : ''}`);
  if (newObjs.length)     parts.push(`${newObjs.length} new object${newObjs.length !== 1 ? 's' : ''}`);
  if (droppedObjs.length) parts.push(`${droppedObjs.length} dropped object${droppedObjs.length !== 1 ? 's' : ''}`);
  if (rowChanges.length)  parts.push(`${rowChanges.length} significant row-count change${rowChanges.length !== 1 ? 's' : ''}`);
  if (tableFileChanges.length) parts.push(`${tableFileChanges.length} modified table file${tableFileChanges.length !== 1 ? 's' : ''}`);
  out.push(`**${parts.join(' · ')}**`);
  out.push('');

  if (newDbs.length) {
    out.push('## New databases');
    out.push('');
    for (const c of newDbs) out.push(`- \`${c.db}\``);
    out.push('');
  }

  if (droppedDbs.length) {
    out.push('## Dropped databases');
    out.push('');
    for (const c of droppedDbs) out.push(`- \`${c.db}\``);
    out.push('');
  }

  if (newObjs.length) {
    out.push('## New tables / views');
    out.push('');
    out.push('| Database | Object | Type |');
    out.push('|----------|--------|------|');
    for (const c of newObjs) {
      out.push(`| \`${c.db}\` | \`${c.schema}.${c.name}\` | ${c.type} |`);
    }
    out.push('');
  }

  if (droppedObjs.length) {
    out.push('## Dropped tables / views');
    out.push('');
    out.push('| Database | Object | Type |');
    out.push('|----------|--------|------|');
    for (const c of droppedObjs) {
      out.push(`| \`${c.db}\` | \`${c.schema}.${c.name}\` | ${c.type} |`);
    }
    out.push('');
  }

  if (rowChanges.length) {
    out.push('## Significant row-count changes');
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
    out.push('## Modified table / view files');
    out.push('');
    out.push('These per-table markdown files differ from HEAD (column-level or metadata changes). Open each link for a detailed diff.');
    out.push('');
    for (const f of tableFileChanges) out.push(`- \`${f}\``);
    out.push('');
  }

  return out.join('\n');
}

(async () => {
  // Verify git is available
  const gitVersion = git('git --version');
  if (!gitVersion) {
    console.error('git not found. npm run docs:changes requires git.');
    process.exitCode = 1;
    return;
  }

  // Read current SCHEMA.md
  if (!fs.existsSync(SCHEMA_PATH)) {
    console.error(`${SCHEMA_PATH} not found. Run npm run schema first.`);
    process.exitCode = 1;
    return;
  }
  const currentContent = fs.readFileSync(SCHEMA_PATH, 'utf8');
  const currentMap = parseSchema(currentContent);
  console.log(`Current SCHEMA.md: ${currentMap.size} database(s)`);

  // Fetch previous committed version
  const commitRef = 'HEAD';
  const previousContent = git(`git show ${commitRef}:SCHEMA.md`);
  if (!previousContent) {
    console.warn('SCHEMA.md has never been committed or git show failed — treating previous state as empty.');
  }
  const previousMap = previousContent ? parseSchema(previousContent) : new Map();
  console.log(`${commitRef} SCHEMA.md: ${previousMap.size} database(s)`);

  const changes = diffSchemas(previousMap, currentMap);
  const tableFileChanges = changedTableFiles();
  console.log(`Changes: ${changes.length} schema-level, ${tableFileChanges.length} table-file diffs`);

  mkdirp(path.join(ROOT, 'docs'));
  const md = render(commitRef, previousMap, currentMap, changes, tableFileChanges);
  fs.writeFileSync(OUT_PATH, md);
  console.log(`\nWrote ${OUT_PATH}`);
})();
