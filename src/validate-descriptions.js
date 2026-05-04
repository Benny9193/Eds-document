// Validate descriptions.json: every key must reference a real DB / schema /
// table-or-view (and, for column keys, a real column on the parent object).
// Fails with a non-zero exit code if any key is unresolved or malformed.
//
// Run with: node src/validate-descriptions.js
//   or: npm run descriptions:check
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { query, close } = require('./db');

const ROOT = path.join(__dirname, '..');
const DESCRIPTIONS_PATH = path.join(ROOT, 'descriptions.json');

// Key formats:
//   "<db>.<schema>.<table>"          → table or view
//   "<db>.<schema>.<table>.<column>" → column on a table or view
function parseKey(k) {
  const parts = k.split('.');
  if (parts.length === 3) return { db: parts[0], schema: parts[1], name: parts[2], kind: 'object' };
  if (parts.length === 4) return { db: parts[0], schema: parts[1], name: parts[2], column: parts[3], kind: 'column' };
  return null;
}

function loadEntries() {
  const raw = JSON.parse(fs.readFileSync(DESCRIPTIONS_PATH, 'utf8'));
  const out = [];
  for (const [k, v] of Object.entries(raw)) {
    if (k.startsWith('_')) continue;
    if (typeof v !== 'string' || !v.trim()) {
      out.push({ key: k, error: 'value is not a non-empty string' });
      continue;
    }
    const parsed = parseKey(k);
    if (!parsed) {
      out.push({ key: k, error: `key has ${k.split('.').length} segments; expected 3 (db.schema.object) or 4 (db.schema.object.column)` });
      continue;
    }
    out.push({ key: k, ...parsed });
  }
  return out;
}

async function fetchObjectSet(db) {
  // Returns Map<schema.name, { type: 'BASE TABLE' | 'VIEW' }>
  const r = await query(`
    SELECT TABLE_SCHEMA, TABLE_NAME, TABLE_TYPE
    FROM [${db}].INFORMATION_SCHEMA.TABLES
    WHERE TABLE_TYPE IN ('BASE TABLE', 'VIEW')
  `);
  const m = new Map();
  for (const row of r.recordset) {
    m.set(`${row.TABLE_SCHEMA}.${row.TABLE_NAME}`, { type: row.TABLE_TYPE });
  }
  return m;
}

async function fetchColumnSet(db) {
  // Returns Map<schema.table, Set<column>>
  const r = await query(`
    SELECT TABLE_SCHEMA, TABLE_NAME, COLUMN_NAME
    FROM [${db}].INFORMATION_SCHEMA.COLUMNS
  `);
  const m = new Map();
  for (const row of r.recordset) {
    const k = `${row.TABLE_SCHEMA}.${row.TABLE_NAME}`;
    if (!m.has(k)) m.set(k, new Set());
    m.get(k).add(row.COLUMN_NAME);
  }
  return m;
}

(async () => {
  let exitCode = 0;
  try {
    const entries = loadEntries();
    if (entries.length === 0) {
      console.log('No entries to validate.');
      return;
    }

    // Group keys by db so we make one round trip per database.
    const byDb = new Map();
    for (const e of entries) {
      if (e.error) continue;
      if (!byDb.has(e.db)) byDb.set(e.db, []);
      byDb.get(e.db).push(e);
    }

    const errors = entries.filter((e) => e.error);

    for (const [db, dbEntries] of byDb) {
      let objects, columns;
      try {
        objects = await fetchObjectSet(db);
        columns = await fetchColumnSet(db);
      } catch (e) {
        for (const en of dbEntries) {
          errors.push({ key: en.key, error: `cannot connect to or read database \`${db}\`: ${e.message}` });
        }
        continue;
      }

      for (const en of dbEntries) {
        const objKey = `${en.schema}.${en.name}`;
        const obj = objects.get(objKey);
        if (!obj) {
          errors.push({ key: en.key, error: `object \`${db}.${objKey}\` not found (table or view)` });
          continue;
        }
        if (en.kind === 'column') {
          const cols = columns.get(objKey);
          if (!cols || !cols.has(en.column)) {
            errors.push({ key: en.key, error: `column \`${en.column}\` not found on \`${db}.${objKey}\`` });
          }
        }
      }
    }

    const tableCount = entries.filter((e) => !e.error && e.kind === 'object').length;
    const columnCount = entries.filter((e) => !e.error && e.kind === 'column').length;
    console.log(`Validated ${entries.length} entries (${tableCount} object, ${columnCount} column).`);

    if (errors.length) {
      exitCode = 1;
      console.error(`\n${errors.length} validation error(s):`);
      for (const er of errors) {
        console.error(`  ✗ ${er.key} — ${er.error}`);
      }
    } else {
      console.log('All entries reference real objects and columns. ✓');
    }
  } catch (e) {
    console.error('Validation failed:', e.message);
    exitCode = 1;
  } finally {
    await close();
    process.exitCode = exitCode;
  }
})();
