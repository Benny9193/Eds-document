---
name: Catalogs is an EDS sidecar / staging database
description: The Catalogs database is not a standalone domain — it is a workflow/staging layer for EDS catalog ingestion. Drilldown on 2026-05-04 showed only 13 procs reach into EDS, all sp_PostCatalog* / sp_*Catalog* variants writing into the master Catalog/CrossRefs/Items tables.
type: project
---

**Fact:** The 198-edge `Catalogs` -> `EDS` coupling reported by `npm run deps` collapses to **65 canonical edges** (13 procedures touching 13 EDS objects) once raw target_object strings are cleaned of alias/join noise (`Catalog Catalog1 on Catalog1` -> `Catalog`) and resolved against `[EDS].sys.objects`. The reverse direction (EDS -> Catalogs) is 5 edges. `Catalogs` is functionally a staging / preparation database for EDS catalog ingestion — not a standalone domain.

**Why:** Drill-down on 2026-05-04 (`docs/dependencies/Catalogs-to-EDS-drilldown.md`) showed the only routines crossing the boundary are `sp_PostCatalog`, `sp_PostCatalog6`, `sp_PostCatalogNew`, `sp_PostCatalogOrig`, `sp_PostCatalogBackup`, `sp_PostCatalogLarge`, `sp_PostCatalogBG2013`, `sp_ProcessMiddletownCatalog`, `sp_CatalogPrepareForPost`, `sp_CatalogPrePostXRef`, `sp_CreateHybrid`, `sp_MergeCatalogs`, `sp_ReimportCatalog`. All write to the EDS master catalog tables (`dbo.Catalog`, `dbo.CrossRefs`, `dbo.Items`, `dbo.Units`, `dbo.Headings`, `dbo.PostCatalogHeader`, `dbo.PostCatalogDetail`) plus call EDS scalar UDFs (`uf_PackCodeCatalog`, `uf_PackCode`). No views and no triggers cross the boundary. The parallel `sp_PostCatalog*` variants suggest historical iterations of the same posting workflow that were never deleted.

**How to apply:**
- When the user asks about Catalogs functionality, frame answers around "the catalog ingestion / posting workflow" rather than treating Catalogs as a peer database to EDS.
- The 198-edge headline figure overstates coupling breadth — it is depth (the same ~13 procs each referencing ~9 EDS tables, often with multiple aliased instances per JOIN).
- Cleanup opportunity: the parallel `sp_PostCatalog*` variants (Backup/Orig/Large/New/BG2013) likely include dead code — modify_dates range from 2018 to 2026 and most are 2018, suggesting the live one is `sp_PostCatalog6` (2026-02-26).
