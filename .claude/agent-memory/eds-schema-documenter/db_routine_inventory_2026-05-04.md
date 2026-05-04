---
name: Routine inventory across production DBs (2026-05-04)
description: Per-database stored-procedure / function counts captured by npm run procs across the 8 production DBs targeted by document-procedures.js. Useful for sizing future cross-DB doc work and knowing which DBs are empty.
type: project
---

Snapshot from `npm run procs` on 2026-05-04 against the EDS Azure SQL server. None of these DBs had any encrypted routines.

| Database | Procedures | Functions | Notes |
|----------|------------|-----------|-------|
| EDS | 377 | 217 | The big one. All routines `dbo`. |
| Catalogs | 45 | 8 | All `dbo`. Heavy `sp_PostCatalog*` family of variants (Orig/New/Backup/Large/BG2013/6) suggesting iterative rewrites kept side-by-side. Also legacy `dt_*` source-control sprocs (SQL Server VCS shim). |
| ContentCentral | 0 | 0 | No procs or functions — pure table store. |
| Documents | 12 | 4 | Small. |
| VendorBids | 72 | 9 | All `dbo`. |
| IDIQ_Platform | 0 | 0 | No procs or functions. |
| ProcurementAnalytics | 0 | 0 | No procs or functions — likely view/query-only or populated by ETL. |
| NJ_RTK | 3 | 2 | Tiny. `sp_refreshEmployer`, `sp_refreshFacility`, `usp_UpdateSurvey`, `uf_SanitizeData[Test]`. |

**Why:** Useful baseline for any future cross-DB documentation pass — three of the eight target DBs have no routines at all, so grouping logic should expect empty `info.modules` and not error. Catalogs in particular has many parallel `sp_PostCatalog*` versions worth flagging if cross-referencing logic across copies of the post-catalog sproc family.

**How to apply:** When asked to extend procedure docs (e.g., add call-graph, complexity metrics), skip the three empty DBs to save time, and treat Catalogs' `sp_PostCatalog*` variants as a known cluster rather than near-duplicates needing dedup.
