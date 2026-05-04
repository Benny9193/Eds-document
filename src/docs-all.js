// Runs every documentation generator in dependency order.
// docs:columns is intentionally excluded — it requires a --pattern argument.
// Usage: npm run docs:all
const { execSync } = require('child_process');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// Steps in execution order. Any step marked optional:true is skipped on failure
// rather than halting the run (useful for steps that may not have output yet).
const STEPS = [
  // Generators whose output is required by later steps run first.
  { label: 'schema',            note: 'generates docs/tables/ (required by docs:erd)' },
  { label: 'business-rules',    note: 'generates docs/business-rules/ (required by docs:changes)' },
  // Independent generators
  { label: 'docs:lookup',       note: 'lookup table data into docs/lookup-data/' },
  { label: 'docs:dependencies', note: 'FK graph → docs/fk-graph.md' },
  { label: 'docs:orphans',      note: 'orphan audit → docs/orphans.md' },
  { label: 'docs:search',       note: 'search index → docs/search-index.json' },
  // Depends on schema output
  { label: 'docs:erd',          note: 'ERD sections appended to docs/tables/<db>/README.md' },
  // Depends on schema + business-rules output
  { label: 'docs:changes',      note: 'changelog vs git HEAD → docs/CHANGELOG.md' },
];

const BAR = '─'.repeat(60);
const pad2 = (n) => String(n).padStart(2, '0');

function hms(ms) {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${pad2(s % 60)}s`;
}

const results = [];
const runStart = Date.now();

for (const step of STEPS) {
  console.log(`\n${BAR}`);
  console.log(`▶  ${step.label}  —  ${step.note}`);
  console.log(BAR);

  const t0 = Date.now();
  let ok = true;
  try {
    execSync(`npm run ${step.label}`, {
      cwd:   ROOT,
      stdio: 'inherit',
      shell: true,
    });
  } catch (e) {
    ok = false;
    console.error(`\n✗  ${step.label} exited with code ${e.status ?? '?'}`);
  }
  const elapsed = Date.now() - t0;
  results.push({ label: step.label, ok, elapsed });
}

// Summary table
const totalMs = Date.now() - runStart;
console.log(`\n${'═'.repeat(60)}`);
console.log('  docs:all — summary');
console.log('═'.repeat(60));
for (const r of results) {
  const icon = r.ok ? '✓' : '✗';
  console.log(`  ${icon}  ${r.label.padEnd(22)}  ${hms(r.elapsed)}`);
}
console.log('─'.repeat(60));
console.log(`     ${'Total'.padEnd(22)}  ${hms(totalMs)}`);

const failed = results.filter((r) => !r.ok);
if (failed.length) {
  console.error(`\n${failed.length} step(s) failed: ${failed.map((r) => r.label).join(', ')}`);
  process.exitCode = 1;
} else {
  console.log('\nAll steps completed successfully.');
}
