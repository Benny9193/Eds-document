// Appends a Mermaid ERD section to docs/tables/<db>/README.md for every database.
// Run after `npm run schema` — that script regenerates the README files fresh, and
// this script enriches them. The section is idempotent: re-running replaces it.
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { query, close } = require('./db');

const ROOT       = path.join(__dirname, '..');
const TABLES_DIR = path.join(ROOT, 'docs', 'tables');

// Maximum FK-connected tables before the ERD is considered too large to render.
const MAX_ENTITIES = 60;

function safeSegment(s) {
  return String(s).replace(/[^A-Za-z0-9._-]/g, '_');
}

// Mermaid entity identifier: "dbo_Orders" style.
function erdId(schema, table) {
  return `${schema}_${table}`.replace(/[^A-Za-z0-9_]/g, '_');
}

// Map SQL types to Mermaid-safe type tokens (letters/digits/hyphens only).
function mermaidType(dataType) {
  const t = (dataType || '').toLowerCase();
  if (['int', 'tinyint', 'smallint', 'bigint'].includes(t)) return t;
  if (['float', 'real'].includes(t)) return t;
  if (['decimal', 'numeric', 'money', 'smallmoney'].includes(t)) return 'decimal';
  if (['varchar', 'nvarchar', 'char', 'nchar', 'text', 'ntext',
       'xml', 'uniqueidentifier'].includes(t)) return 'string';
  if (['datetime', 'datetime2', 'smalldatetime'].includes(t)) return 'datetime';
  if (t === 'date') return 'date';
  if (t === 'time') return 'time';
  if (t === 'bit')  return 'bool';
  if (['varbinary', 'binary', 'image', 'timestamp', 'rowversion'].includes(t)) return 'binary';
  return 'string';
}

async function listUserDatabases() {
  const r = await query(
    "SELECT name FROM sys.databases WHERE database_id > 4 AND state_desc = 'ONLINE' ORDER BY name"
  );
  return r.recordset.map((row) => row.name);
}

async function getERDData(dbName) {
  // FK edges at the constraint level (one row per distinct constraint).
  const fks = await query(`
    SELECT DISTINCT
      sch_p.name AS child_schema,  tab_p.name AS child_table,
      sch_r.name AS parent_schema, tab_r.name AS parent_table,
      fk.name    AS fk_name
    FROM [${dbName}].sys.foreign_keys fk
    JOIN [${dbName}].sys.tables  tab_p ON fk.parent_object_id     = tab_p.object_id
    JOIN [${dbName}].sys.schemas sch_p ON tab_p.schema_id         = sch_p.schema_id
    JOIN [${dbName}].sys.tables  tab_r ON fk.referenced_object_id = tab_r.object_id
    JOIN [${dbName}].sys.schemas sch_r ON tab_r.schema_id         = sch_r.schema_id
    ORDER BY child_schema, child_table, fk.name
  `);

  if (fks.recordset.length === 0) return { fks: [], columns: [] };

  // PK columns + FK-side columns for every FK-involved table.
  // Only these two roles are shown in the ERD to keep entities compact.
  const cols = await query(`
    SELECT DISTINCT
      sch.name  AS schema_name,
      tab.name  AS table_name,
      col.name  AS column_name,
      typ.name  AS data_type,
      CASE WHEN pk_idx.column_id IS NOT NULL THEN 'PK' ELSE '' END AS role_pk,
      CASE WHEN fk_col.column_id IS NOT NULL THEN 'FK' ELSE '' END AS role_fk,
      col.column_id
    FROM [${dbName}].sys.tables tab
    JOIN [${dbName}].sys.schemas sch  ON tab.schema_id          = sch.schema_id
    JOIN [${dbName}].sys.columns col  ON col.object_id           = tab.object_id
    JOIN [${dbName}].sys.types   typ  ON col.system_type_id      = typ.system_type_id
                                     AND typ.name               <> 'sysname'
    LEFT JOIN (
      SELECT ic.object_id, ic.column_id
      FROM [${dbName}].sys.indexes i
      JOIN [${dbName}].sys.index_columns ic
        ON i.object_id = ic.object_id AND i.index_id = ic.index_id
      WHERE i.is_primary_key = 1
    ) pk_idx ON pk_idx.object_id = tab.object_id AND pk_idx.column_id = col.column_id
    LEFT JOIN (
      SELECT parent_object_id AS object_id, parent_column_id AS column_id
      FROM [${dbName}].sys.foreign_key_columns
      UNION
      SELECT referenced_object_id, referenced_column_id
      FROM [${dbName}].sys.foreign_key_columns
    ) fk_col ON fk_col.object_id = tab.object_id AND fk_col.column_id = col.column_id
    WHERE tab.object_id IN (
      SELECT DISTINCT parent_object_id     FROM [${dbName}].sys.foreign_key_columns
      UNION
      SELECT DISTINCT referenced_object_id FROM [${dbName}].sys.foreign_key_columns
    )
    AND (pk_idx.column_id IS NOT NULL OR fk_col.column_id IS NOT NULL)
    ORDER BY sch.name, tab.name, col.column_id
  `);

  return { fks: fks.recordset, columns: cols.recordset };
}

// Build the Mermaid erDiagram block(s) for a database.
// Returns an array of { heading, mermaid } sections (split by schema when too large).
function buildERDSections(fks, columns) {
  if (fks.length === 0) return [];

  // Group columns by "schema.table"
  const colsByTable = new Map();
  for (const c of columns) {
    const key = `${c.schema_name}.${c.table_name}`;
    if (!colsByTable.has(key)) colsByTable.set(key, []);
    colsByTable.get(key).push(c);
  }

  // Collect all FK-connected table identities
  const allTables = new Set();
  for (const f of fks) {
    allTables.add(`${f.child_schema}.${f.child_table}`);
    allTables.add(`${f.parent_schema}.${f.parent_table}`);
  }

  // Decide whether to show as one diagram or split by schema
  const schemas = new Set([...allTables].map((t) => t.split('.')[0]));
  const splitBySchema = allTables.size > MAX_ENTITIES;

  if (!splitBySchema) {
    return [{ heading: null, mermaid: buildMermaid(fks, allTables, colsByTable) }];
  }

  // Per-schema sections: include cross-schema FK edges in every schema that touches them
  const sections = [];
  for (const schema of [...schemas].sort()) {
    const schemaFks = fks.filter(
      (f) => f.child_schema === schema || f.parent_schema === schema
    );
    if (schemaFks.length === 0) continue;
    const schemaTables = new Set();
    for (const f of schemaFks) {
      schemaTables.add(`${f.child_schema}.${f.child_table}`);
      schemaTables.add(`${f.parent_schema}.${f.parent_table}`);
    }
    sections.push({
      heading: `Schema: \`${schema}\``,
      mermaid: buildMermaid(schemaFks, schemaTables, colsByTable),
    });
  }
  return sections;
}

function buildMermaid(fks, tables, colsByTable) {
  const lines = ['```mermaid', 'erDiagram'];

  for (const t of [...tables].sort()) {
    const [schema, table] = t.split('.');
    const id = erdId(schema, table);
    const cols = colsByTable.get(t) || [];
    lines.push(`    ${id} {`);
    for (const c of cols) {
      const roles = [c.role_pk, c.role_fk].filter(Boolean).join(',');
      lines.push(`        ${mermaidType(c.data_type)} ${c.column_name}${roles ? ' ' + roles : ''}`);
    }
    lines.push('    }');
  }

  // Deduplicate relationships (a multi-column FK creates one row per FK name, already DISTINCT above)
  const seen = new Set();
  for (const f of fks) {
    const parentId = erdId(f.parent_schema, f.parent_table);
    const childId  = erdId(f.child_schema,  f.child_table);
    const key = `${parentId}|${childId}|${f.fk_name}`;
    if (seen.has(key)) continue;
    seen.add(key);
    lines.push(`    ${parentId} ||--o{ ${childId} : "${f.fk_name}"`);
  }

  lines.push('```');
  return lines.join('\n');
}

// Strip any existing ERD section from the end of a README.md and append the new one.
function upsertERDSection(readmePath, sections) {
  let content = fs.readFileSync(readmePath, 'utf8');

  // Remove from the ERD marker to end-of-file so this is idempotent
  const marker = '\n## Entity Relationship Diagram';
  const cut = content.indexOf(marker);
  if (cut !== -1) content = content.slice(0, cut);
  content = content.trimEnd();

  const erdParts = [
    '',
    '',
    '## Entity Relationship Diagram',
    '',
    '_Generated by `npm run docs:erd`. Only tables with FK relationships shown. PK and FK columns only._',
    '',
  ];

  if (sections.length === 0) {
    erdParts.push('_No FK constraints — no ERD to render._');
    erdParts.push('');
  } else {
    for (const { heading, mermaid } of sections) {
      if (heading) {
        erdParts.push(`### ${heading}`);
        erdParts.push('');
      }
      erdParts.push(mermaid);
      erdParts.push('');
    }
  }

  fs.writeFileSync(readmePath, content + erdParts.join('\n'));
}

(async () => {
  try {
    const dbs = await listUserDatabases();
    console.log(`Found ${dbs.length} database(s): ${dbs.join(', ')}`);

    for (const db of dbs) {
      const readmePath = path.join(TABLES_DIR, safeSegment(db), 'README.md');
      if (!fs.existsSync(readmePath)) {
        console.warn(`  ${db}: README.md not found at ${readmePath} — run npm run schema first`);
        continue;
      }
      try {
        const { fks, columns } = await getERDData(db);
        const connectedTables = new Set([
          ...fks.map((f) => `${f.child_schema}.${f.child_table}`),
          ...fks.map((f) => `${f.parent_schema}.${f.parent_table}`),
        ]);

        let sections;
        if (connectedTables.size > MAX_ENTITIES) {
          console.log(`  ${db}: ${connectedTables.size} FK-connected tables — splitting by schema`);
          sections = buildERDSections(fks, columns);
        } else {
          sections = buildERDSections(fks, columns);
        }

        upsertERDSection(readmePath, sections);
        const totalNodes = connectedTables.size;
        console.log(`  ${db}: ERD appended (${totalNodes} entities, ${fks.length} relationships)`);
      } catch (e) {
        console.error(`  ${db}: ERROR — ${e.message}`);
      }
    }

    console.log('\nERD sections written to docs/tables/<db>/README.md');
  } catch (e) {
    console.error('ERD generation failed:', e.message);
    process.exitCode = 1;
  } finally {
    await close();
  }
})();
