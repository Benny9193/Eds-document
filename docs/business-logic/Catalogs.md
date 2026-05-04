# Business Logic: `Catalogs`

_Generated: 2026-05-04_

**Server:** `eds-sqlserver.eastus2.cloudapp.azure.com`

[← back to business-logic index](README.md)

---

## Table of Contents

1. [Domain Summary](#domain-summary)
2. [Core Entities and Lifecycle](#core-entities-and-lifecycle)
3. [Workflows and Processes](#workflows-and-processes)
4. [Business Rules](#business-rules)
5. [Computed and Derived Data](#computed-and-derived-data)
6. [Cross-Database Touchpoints](#cross-database-touchpoints)
7. [Open Questions and Ambiguities](#open-questions-and-ambiguities)
8. [Source Queries](#source-queries)

---

## Domain Summary

`Catalogs` is the catalog staging and posting engine. Its central table, `Master Catalog` (~144M rows), acts as an intermediate landing zone between raw vendor price files and the live EDS pricing table (`EDS.dbo.CrossRefs`). A catalog import loads rows into `Master Catalog`; the posting process then resolves each row to an existing EDS `Items` master (or creates a new one), deduplicates, and upserts into `EDS.dbo.CrossRefs`.

The database has a small surface area: a handful of business procedures and a handful of utility string functions. All meaningful writes flow through `sp_PostCatalog` and its variants. The historical Grainger snapshots (`Grainger_*` tables referenced in the guide) are read-only cold storage.

---

## Core Entities and Lifecycle

### Master Catalog

`[Master Catalog]` (note the space in the name — always bracket-quoted) is the staging table. Each row represents one vendor item from an uploaded price file, keyed to a `CatalogId` from `EDS.dbo.Catalog`. Key columns:

| Column | Purpose |
|--------|---------|
| `SysId` | Surrogate PK |
| `CatalogId` | FK to `EDS.dbo.Catalog` |
| `UniqueItemNumber` | Computed/derived key used for deduplication and item matching |
| `PackedCode` | Normalized item code (used by older import formats) |
| `VendorItemCode` | Raw vendor part number |
| `CatalogPrice` / `GrossPrice` | Prices copied to `EDS.dbo.CrossRefs` on posting |
| `ItemId` | Resolved EDS item ID (populated during posting) |
| `CrossRefId` | Resolved EDS cross-ref ID (populated during posting) |
| `ImportStatus` | Validation result (null = clean) |

Rows are populated by the application layer (via `EDS.dbo.sp_CatalogImport` → `CatalogXML`) and by `EDS.dbo.sp_CatalogImporterXML` which reads from `Catalogs.dbo.CatalogImports`.

### CatalogXML and CatalogImports

`CatalogXML` is a raw XML staging table. `CatalogImports` is a processed import header. Both serve as intermediate buffers between file upload and `Master Catalog` population.

---

## Workflows and Processes

### Full Catalog Post Pipeline

```
[Vendor uploads file]
    │
    ▼
EDS.dbo.sp_CatalogImport → INSERT Catalogs.dbo.CatalogXML
    │ (or)
EDS.dbo.sp_CatalogImporterXML → INSERT Catalogs.dbo.CatalogImports + [Master Catalog]
    │
    ▼
Catalogs.dbo.sp_PostCatalog(@pCatalogId)
    │
    ├─ 1. Fill blank UniqueItemNumber via EDS.dbo.uf_PackCodeCatalog()
    ├─ 2. Deduplicate Master Catalog rows (same item / price / description / unit)
    ├─ 3. ABORT if unresolved duplicates remain (RAISERROR)
    ├─ 4. CREATE audit header: INSERT EDS.dbo.PostCatalogHeader
    ├─ 5. RESET ItemId and CrossRefId to NULL
    ├─ 6. MATCH existing Items (via prior catalogs for same vendor/category)
    ├─ 7. INSERT missing Unit codes → EDS.dbo.Units
    ├─ 8. INSERT missing Headings → EDS.dbo.Headings
    │     └─ Cleanup duplicate district-specific headings → promote to global
    ├─ 9. INSERT missing Items → EDS.dbo.Items
    ├─ 10. MATCH newly created Items
    ├─ 11. INSERT EDS CrossRefs (generic, no CatalogId)
    ├─ 12. INSERT EDS CrossRefs (catalog-specific, with pricing)
    ├─ 13. UPDATE CrossRefs prices, metadata, and new product-attribute fields
    │      (PerishableItem, PrescriptionRequired, DigitallyDelivered, MinimumOrderQuantity — added 2024-09-10)
    ├─ 14. UPDATE EDS.dbo.Items.HeadingId where missing
    ├─ 15. UPDATE EDS.dbo.Items.RTK = 1 for hazardous items
    ├─ 16. SET EDS.dbo.Catalog.PostDate = getdate()
    └─ 17. COMPLETE audit footer: UPDATE EDS.dbo.PostCatalogHeader.PostDateComplete
```

Each step logs a row to `EDS.dbo.PostCatalogDetail` with a step code, description, and row count, providing a per-step audit trail.

### Import Format Switching

`sp_PostCatalog` branches on `EDS.dbo.Catalog.ImportFormat`:

| ImportFormat value | Matching strategy |
|--------------------|------------------|
| `0` or `1` | Treated as `4` (default legacy) |
| `4` | Match by `UniqueItemNumber` across prior catalogs; insert items by `UniqueItemNumber` |
| `5` | Same as 4, plus additional unit-code matching on item lookup |
| Other (2, 3) | Match by `PackedCode` + `UniqueItemNumber`; insert items by `PackedCode` |

### Catalog Copy and Merge

```
sp_CatalogCopy(@srcCatalogId, @dstCatalogId)
  → Copies Master Catalog rows between catalogs (for re-versioning an existing catalog)

sp_MergeCatalogs(@src, @dst)
  → Merges two catalogs into one (exact behavior not fully traced here)

sp_CatalogPrePostXRef / sp_CatalogPrepareForPost
  → Pre-processing helpers before a post run
```

### Catalog Sync

```
sp_SyncCatalog(@pCatalogId)
  → Synchronizes CrossRefs pricing with Master Catalog without a full re-post
  → Used when prices change but item structure is stable
```

### Catalog Unpost (from EDS)

```
EDS.dbo.sp_UnpostCatalog(@pCatalogId)
  → Reads from Catalogs.dbo.[Master Catalog]
  → Reverses a posting (marks CrossRefs inactive, etc.)
```

---

## Business Rules

### Deduplication is Blocking

Before any EDS writes occur, `sp_PostCatalog` runs a duplicate check:

```sql
If Exists (
  SELECT UniqueItemNumber, count(*)
  FROM [Catalogs].[dbo].[Master Catalog]
  WHERE catalogid = @CatalogId
  GROUP BY UniqueItemNumber
  HAVING count(*) > 1
)
BEGIN
  RAISERROR('Unresolved duplicates were found, process cancelled.', 16, 1)
  return
END
```

The first deduplication pass removes rows that differ only in `PageNumber` (keeping the lowest `SysId` with the lowest non-null `PageNumber`). Any remaining duplicates after that pass abort the post.

### Heading Promotion

District-specific headings (those with a non-null `DistrictId`) that match a global heading (null `DistrictId`) are automatically deactivated and items are re-pointed to the global heading. This ensures headings remain consistent after a catalog post.

### RTK Flag Propagation

Items linked to Master Catalog rows with `RTK = 1` get `EDS.dbo.Items.RTK = 1` set. This propagates Right-to-Know chemical hazard classification from the vendor file into the EDS item master.

### New Product Attributes (2024)

Fields `PerishableItem`, `PrescriptionRequired`, `DigitallyDelivered`, and `MinimumOrderQuantity` were added to the `CrossRefs` update in September 2024 (commented in `sp_PostCatalog`). These propagate from `Master Catalog` to `EDS.dbo.CrossRefs` on every post.

---

## Computed and Derived Data

### PostCatalogHeader / PostCatalogDetail (in EDS)

Although these tables live in EDS, they are entirely written by `Catalogs.dbo.sp_PostCatalog`. Each post produces:
- One `PostCatalogHeader` row (start/end timestamps, `CatalogId`)
- Multiple `PostCatalogDetail` rows (one per pipeline step, with step type, description, and affected row count)

This constitutes the only structured audit trail for catalog posting operations.

### UniqueItemNumber

`UniqueItemNumber` is computed by `EDS.dbo.uf_PackCodeCatalog(VendorItemCode, @catalogId)` when blank. It is the canonical matching key for deduplication and item resolution in ImportFormat 4/5 catalogs.

---

## Cross-Database Touchpoints

`Catalogs` has a tightly coupled, bidirectional relationship with `EDS`:

| Direction | Source | Target | What |
|-----------|--------|--------|------|
| EDS → Catalogs | `EDS.dbo.sp_CatalogImport` | `Catalogs.dbo.CatalogXML` | XML upload staging |
| EDS → Catalogs | `EDS.dbo.sp_CatalogImporterXML` | `Catalogs.dbo.CatalogImports`, `[Master Catalog]` | Import staging |
| EDS → Catalogs | `EDS.dbo.sp_UnpostCatalog` | `Catalogs.dbo.[Master Catalog]` | Unpost reads |
| Catalogs → EDS | `Catalogs.dbo.sp_PostCatalog` | `EDS.dbo.CrossRefs`, `Items`, `Units`, `Headings`, `Catalog`, `PostCatalogHeader`, `PostCatalogDetail` | All production writes |

See [`docs/dependencies/Catalogs/outbound.md`](../dependencies/Catalogs/outbound.md) for the full edge list.

---

## Open Questions and Ambiguities

1. **`sp_PostCatalogLarge` vs `sp_PostCatalog`.** A `sp_PostCatalogLarge` variant exists alongside `sp_PostCatalog6`, `sp_PostCatalogBG2013`, `sp_PostCatalogBackup`, `sp_PostCatalogNew`, and `sp_PostCatalogOrig`. Which variants are actively used in production and how they differ from `sp_PostCatalog` was not examined in this pass.

2. **`sp_ProcessMiddletownCatalog`.** This procedure name implies a district-specific catalog import path. Whether it represents a one-off or a reusable pattern for special vendors is unclear.

3. **`sp_ReimportCatalog`.** Likely re-runs a catalog import from `CatalogImports` without requiring a new file upload. Exact behavior not traced.

4. **`sp_CreateHybrid`.** The name suggests it merges two different data sources into a single catalog, but the definition was not examined.

5. **Item-code `if 1=0` blocks.** Several code blocks in `sp_PostCatalog` are wrapped in `if 1=0 begin ... end` (always false). These are dead code paths — commented out by a conditional rather than removed. A human reviewer should confirm whether any should be restored.

---

## Source Queries

This document was synthesized from the following artifact sources — no additional live queries were executed:

| Source | Used for |
|--------|----------|
| `docs/procedures/Catalogs/*.md` | Procedure definitions, parameters, dependency lists |
| `docs/tables/Catalogs/README.md` | Table list, row counts |
| `docs/dependencies/Catalogs/outbound.md` | Cross-database reference edges |
| `EDS_GUIDE.md` | Domain layout description |
| `SCHEMA.md` | Cross-database dependency matrix |
