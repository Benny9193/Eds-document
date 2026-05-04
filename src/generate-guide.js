// Build EDS_GUIDE.md — a curated, narrative tour of the EDS database
// organized by domain. Source of truth is descriptions.json + a hand-curated
// domain layout below. Re-run with: node src/generate-guide.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { query, close } = require('./db');

const ROOT = path.join(__dirname, '..');
const DESCRIPTIONS_PATH = path.join(ROOT, 'descriptions.json');
const GUIDE_PATH = path.join(ROOT, 'EDS_GUIDE.md');
const TARGET_DB = 'EDS';

const DOMAINS = [
  {
    title: 'Procurement chain',
    blurb: 'The core operational workflow: a buyer creates a requisition, lines move through approvals, and on final approval a purchase order is issued to the vendor.',
    flow: 'Requisitions → Detail → Approvals/PendingApprovals → PO → PODetailItems',
    tables: [
      'Requisitions',
      'Detail',
      'Approvals',
      'PendingApprovals',
      'PO',
      'PODetailItems',
      'POStatus',
      'RequisitionChangeLog',
      'DetailChangeLog',
    ],
  },
  {
    title: 'Vendors and catalog',
    blurb: 'Suppliers, the catalogs they publish, and the per-item price/availability rows that buyers actually shop against.',
    flow: 'Vendors → VendorContacts / VendorUploads → Catalog → CrossRefs → Items → Category / Manufacturers',
    tables: [
      'Vendors',
      'VendorContacts',
      'VendorUploads',
      'Catalog',
      'CrossRefs',
      'Items',
      'Category',
      'Manufacturers',
    ],
  },
  {
    title: 'Bidding and awards',
    blurb: 'Cooperative procurement: solicit prices from many vendors, collect their responses, and pick winners. Awarded prices typically flow back into the catalog as a vendor upload.',
    flow: 'BidHeaders → BidHeaderDetail / BidRequestItems → Bids → BidResults → Awards',
    tables: [
      'BidHeaders',
      'BidHeaderDetail',
      'BidRequestItems',
      'BidItems',
      'Bids',
      'BidResults',
      'Awards',
      'BidAnswers',
    ],
  },
  {
    title: 'Customer hierarchy',
    blurb: 'The school-district customer model. Effectively static — bulk changes propagate everywhere, so treat with care.',
    flow: 'District → School → Users → UserAccounts',
    tables: ['District', 'School', 'Users', 'UserAccounts'],
  },
  {
    title: 'Budget and pricing controls',
    blurb: 'Where money comes from (budget accounts) and what each district sees at what price (price plans).',
    tables: ['BudgetAccounts', 'PricePlans'],
  },
  {
    title: 'Audit and reporting',
    blurb: 'Long-running event and history tables. Mostly cold storage — query with date filters.',
    tables: [
      'Audit',
      'TransactionLog_HISTORY',
      'OrderBookDetail',
      'OrderBookDetailOld',
      'ReportSession',
      'ReportSessionLinks',
    ],
  },
];

function loadDescriptions() {
  const raw = JSON.parse(fs.readFileSync(DESCRIPTIONS_PATH, 'utf8'));
  const m = new Map();
  for (const [k, v] of Object.entries(raw)) {
    if (k.startsWith('_')) continue;
    if (typeof v === 'string' && v.trim()) m.set(k, v.trim());
  }
  return m;
}

async function fetchRowCounts() {
  const r = await query(`
    SELECT sch.name AS schema_name, t.name AS table_name, SUM(p.rows) AS row_count
    FROM [${TARGET_DB}].sys.tables t
    JOIN [${TARGET_DB}].sys.schemas sch ON t.schema_id = sch.schema_id
    JOIN [${TARGET_DB}].sys.partitions p ON t.object_id = p.object_id AND p.index_id IN (0,1)
    GROUP BY sch.name, t.name
  `);
  const m = new Map();
  for (const row of r.recordset) {
    m.set(`${row.schema_name}.${row.table_name}`, Number(row.row_count));
  }
  return m;
}

function fmtRows(n) {
  if (n == null) return '';
  if (n >= 1_000_000) return `~${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `~${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

function tableLink(schema, table) {
  return `docs/tables/${TARGET_DB}/${schema}.${table}.md`;
}

(async () => {
  try {
    const descriptions = loadDescriptions();
    const rowCounts = await fetchRowCounts();

    const lines = [];
    lines.push(`# EDS Database — Curated Guide`);
    lines.push('');
    lines.push(`_Generated on ${new Date().toISOString().slice(0, 10)} from descriptions.json_`);
    lines.push('');
    lines.push(`This is a hand-curated tour of the most load-bearing tables in the **${TARGET_DB}** production database (~440 base tables total — this guide covers the ${DOMAINS.reduce((n, d) => n + d.tables.length, 0)} that most operational and analytical work touches).`);
    lines.push('');
    lines.push(`For full structural metadata (every column, every FK, every index) of any table, follow its link to the auto-generated per-table page under \`docs/tables/${TARGET_DB}/\`.`);
    lines.push('');

    lines.push('## Contents');
    lines.push('');
    for (const d of DOMAINS) {
      const slug = d.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      lines.push(`- [${d.title}](#${slug})`);
    }
    lines.push('');

    for (const d of DOMAINS) {
      lines.push(`## ${d.title}`);
      lines.push('');
      lines.push(d.blurb);
      lines.push('');
      if (d.flow) {
        lines.push(`**Flow:** \`${d.flow}\``);
        lines.push('');
      }
      lines.push('| Table | Rows | Description |');
      lines.push('|-------|------|-------------|');
      for (const t of d.tables) {
        const desc = descriptions.get(`${TARGET_DB}.dbo.${t}`) || '_(no description on file)_';
        const rc = rowCounts.get(`dbo.${t}`);
        const link = `[\`dbo.${t}\`](${tableLink('dbo', t)})`;
        lines.push(`| ${link} | ${fmtRows(rc)} | ${desc} |`);
      }
      lines.push('');
    }

    lines.push('## Conventions worth knowing');
    lines.push('');
    lines.push('- **PK / FK naming.** Primary keys are usually `{Table}Id` (e.g. `VendorId`); foreign keys reuse the same column name.');
    lines.push('- **Timestamps.** Most are `Date{Action}` — `DateCreated`, `DateApproved`, `DateAwarded`. UTC vs. local is per-table; check the column.');
    lines.push('- **Active flags.** Both `Active` (tinyint) and `IsActive` (bit) appear across the schema. Always verify which a given table uses.');
    lines.push('- **Archive schema.** `archive.*` tables are cold storage with no PKs/indexes. Read-only, slow scans only.');
    lines.push('- **High-volume tables.** `CrossRefs` (~171M), `BidHeaderDetail` (~123M), `Items` (~44M), `Detail` (~33M), `BidResults` (~33M), `BidRequestItems` (~28M), `PODetailItems` (~25M). Always filter or `TOP n` against these.');
    lines.push('- **Source of descriptions.** This guide and the `## Description` blocks on per-table pages are generated from `descriptions.json`. Update one place, regenerate, and all three outputs (guide, per-table pages, MS_Description SQL) refresh.');
    lines.push('');

    fs.writeFileSync(GUIDE_PATH, lines.join('\n'));
    console.log(`Wrote ${GUIDE_PATH}`);
  } catch (e) {
    console.error('Guide generation failed:', e.message);
    process.exitCode = 1;
  } finally {
    await close();
  }
})();
