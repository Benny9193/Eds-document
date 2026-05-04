---
name: EDS routine inventory snapshot
description: Counts and notable findings from documenting the EDS database's procedures and functions.
type: project
---

EDS database routine inventory captured on 2026-05-04 by `npm run procs`:

- **377 stored procedures**, **217 functions** (mix of scalar `FN`, inline TVF `IF`, multi-statement TVF `TF`)
- **0 encrypted modules** — every definition is readable via `sys.sql_modules.definition`
- **Zero cross-DB references** were resolved by `sys.sql_expression_dependencies` for EDS routines, even though EDS lives on a server with sibling DBs (Catalogs, ContentCentral, VendorBids, etc.). This is suspicious — most likely the dependency tracker can't bind cross-DB names, OR EDS routines genuinely don't reach across databases at the DML level. Worth re-checking against an actual code grep before claiming the latter.
- A handful of `sys.objects` rows surface with NULL schema/name and must be filtered defensively before rendering.

**Why:** Provides a baseline so future runs can flag anomalies (sudden drop in counts, new encrypted procs, or cross-DB refs appearing).

**How to apply:** When a future task asks about EDS code-base size, dependency reach, or encryption posture, reuse these numbers as a baseline. If cross-DB documentation is needed, do not rely solely on `sys.sql_expression_dependencies` — fall back to text-search on `sys.sql_modules.definition` for `[OtherDb].` patterns.
