# Catalogs to EDS Cross-Database Coupling Drill-Down

_Generated on 2026-05-04T13:23:21.269Z_

**Source database:** `Catalogs`
**Target database:** `EDS`

[← back to dependencies index](README.md)

Focused analysis of the largest cross-database coupling on the EDS server: routines, views, and triggers in `Catalogs` that reach into `EDS`. The reverse direction (`EDS` -> `Catalogs`) is only 5 edges; this asymmetry motivated the report.

## Executive summary

- **65 deduped (source routine, target object) edges** from `Catalogs` into `EDS` (canonical schema.name dedup; the broader-dedup count used by the existing scanner is **198**, see Reconciliation below).
- **13 distinct `Catalogs` routines/views/triggers** participate; **13 distinct `EDS` objects** are referenced.
- The single most-referenced `EDS` object is `dbo.Catalog` (USER_TABLE) with **12** references from **12** distinct `Catalogs` routines.
- The single `Catalogs` routine with the heaviest outbound surface is `dbo.sp_PostCatalog` (Procedure) touching **9** distinct `EDS` objects across **9** references.
- Coupling is dominated by **stored procedures** in `Catalogs` reading and writing `EDS` user tables; the pattern is consistent with `Catalogs` acting as a staging/sidecar for catalog ingestion that posts data back into the master `EDS` schema.

## Reconciliation with the existing scanner

The existing `npm run deps` scanner reports **198 edges** for `Catalogs` -> `EDS`. This drill-down reports **65 canonical edges** because it cleans the `target_object` string (trimming alias / join noise like `Catalog Catalog1 on Catalog1` down to `Catalog`) and resolves each target against `[EDS].sys.objects` so multiple noisy variants of the same physical object collapse into one row.

Re-running the scanner's exact dedup key (which keys on the raw, noisy substring) over the same data yields **198** edges, which is the number you should compare to the scanner's 198. Any small delta is from the SED-only rows that map onto schema.name forms already present in the text scan.

## Top source routines (top 20)

Catalogs routines ranked by total references into EDS. Linked to the per-procedure page where applicable.

| # | Source routine | Kind | Distinct EDS targets | Total refs | Last modified |
|---|----------------|------|----------------------|-----------:|---------------|
| 1 | [`dbo.sp_PostCatalog`](../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | 9 | 9 | 2024-09-10 |
| 2 | [`dbo.sp_PostCatalog6`](../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | 9 | 9 | 2026-02-26 |
| 3 | [`dbo.sp_PostCatalogNew`](../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | 9 | 9 | 2023-02-14 |
| 4 | [`dbo.sp_PostCatalogOrig`](../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | 9 | 9 | 2023-02-02 |
| 5 | [`dbo.sp_ProcessMiddletownCatalog`](../procedures/Catalogs/dbo.sp_ProcessMiddletownCatalog.md) | Procedure | 7 | 7 | 2018-01-22 |
| 6 | [`dbo.sp_PostCatalogBackup`](../procedures/Catalogs/dbo.sp_PostCatalogBackup.md) | Procedure | 5 | 5 | 2018-01-22 |
| 7 | [`dbo.sp_PostCatalogLarge`](../procedures/Catalogs/dbo.sp_PostCatalogLarge.md) | Procedure | 5 | 5 | 2018-01-22 |
| 8 | [`dbo.sp_PostCatalogBG2013`](../procedures/Catalogs/dbo.sp_PostCatalogBG2013.md) | Procedure | 4 | 4 | 2018-01-22 |
| 9 | [`dbo.sp_CatalogPrepareForPost`](../procedures/Catalogs/dbo.sp_CatalogPrepareForPost.md) | Procedure | 3 | 3 | 2018-01-22 |
| 10 | [`dbo.sp_CatalogPrePostXRef`](../procedures/Catalogs/dbo.sp_CatalogPrePostXRef.md) | Procedure | 2 | 2 | 2018-01-22 |
| 11 | [`dbo.sp_CreateHybrid`](../procedures/Catalogs/dbo.sp_CreateHybrid.md) | Procedure | 1 | 1 | 2018-01-22 |
| 12 | [`dbo.sp_MergeCatalogs`](../procedures/Catalogs/dbo.sp_MergeCatalogs.md) | Procedure | 1 | 1 | 2018-01-22 |
| 13 | [`dbo.sp_ReimportCatalog`](../procedures/Catalogs/dbo.sp_ReimportCatalog.md) | Procedure | 1 | 1 | 2018-01-23 |

## Top target EDS objects (top 20)

EDS objects ranked by how often Catalogs routines reference them. Linked to the per-table page where one exists.

| # | Target object | Kind | Distinct Catalogs sources | Total refs |
|---|---------------|------|---------------------------|-----------:|
| 1 | [`dbo.Catalog`](../tables/EDS/dbo.Catalog.md) | USER_TABLE | 12 | 12 |
| 2 | [`dbo.CrossRefs`](../tables/EDS/dbo.CrossRefs.md) | USER_TABLE | 9 | 9 |
| 3 | `dbo.uf_PackCodeCatalog` | SQL_SCALAR_FUNCTION | 8 | 8 |
| 4 | [`dbo.Items`](../tables/EDS/dbo.Items.md) | USER_TABLE | 8 | 8 |
| 5 | [`dbo.Units`](../tables/EDS/dbo.Units.md) | USER_TABLE | 7 | 7 |
| 6 | [`dbo.Headings`](../tables/EDS/dbo.Headings.md) | USER_TABLE | 5 | 5 |
| 7 | [`dbo.PostCatalogHeader`](../tables/EDS/dbo.PostCatalogHeader.md) | USER_TABLE | 4 | 4 |
| 8 | [`dbo.PostCatalogDetail`](../tables/EDS/dbo.PostCatalogDetail.md) | USER_TABLE | 4 | 4 |
| 9 | `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION | 4 | 4 |
| 10 | [`dbo.BidHeaders`](../tables/EDS/dbo.BidHeaders.md) | USER_TABLE | 1 | 1 |
| 11 | [`dbo.BidImports`](../tables/EDS/dbo.BidImports.md) | USER_TABLE | 1 | 1 |
| 12 | [`dbo.BidRequestItems`](../tables/EDS/dbo.BidRequestItems.md) | USER_TABLE | 1 | 1 |
| 13 | [`dbo.BidResults`](../tables/EDS/dbo.BidResults.md) | USER_TABLE | 1 | 1 |

## Coupling shape

### By source kind (Catalogs side)

| Kind | Edges |
|------|------:|
| Procedure | 65 |

### By target kind (EDS side)

| Kind | Edges |
|------|------:|
| USER_TABLE | 53 |
| SQL_SCALAR_FUNCTION | 12 |

### By detection method

| Method | Edges |
|--------|------:|
| text-grep only | 0 |
| `sys.sql_expression_dependencies` only | 0 |
| both | 65 |

Memory note from prior scans: SED is unreliable on this Azure SQL instance for cross-DB resolution. The SED-only count above represents references that the text-grep missed (mostly empty-schema four-part forms like `EDS..Foo` where the regex still does match, plus any cases where the schema-name path differs from how the regex segments it). The text-grep is the more authoritative source.

## Read vs write (heuristic)

Best-effort classification: for each text match, the 80 characters immediately preceding the matched reference are scanned for `INSERT INTO`, `UPDATE`, `DELETE FROM`, `MERGE [INTO]`, `TRUNCATE TABLE`, or `SELECT ... INTO`. Any match against those keywords classifies the edge as a write; otherwise it is a read. This is **not authoritative** -- it cannot see references buried inside dynamic SQL strings, and a single edge that is referenced multiple times within the same routine is reported as "mixed" if any reference is classified as a write.

| Access | Edges |
|--------|------:|
| read only | 29 |
| write only | 9 |
| mixed (both seen) | 27 |
| unknown (SED-only, no text match) | 0 |

## Notable patterns

The coupling is heavily Pareto-distributed on both sides. The top 5 source routines account for **66%** of all edges (43/65); the top 5 target objects account for **68%** (44/65). In other words, this is not 198 small touches across an even surface -- it is a small number of "bridge" routines in `Catalogs` repeatedly hitting a small core of `EDS` master tables.

The dominant source kind is **stored procedures** (65 edges); views contribute 0 and triggers contribute 0. No triggers in `Catalogs` reach into `EDS`, which is the safer outcome -- cross-DB writes from triggers would complicate transactional semantics.

On the EDS side, references are concentrated on a small set of master entities -- principally the catalog/cross-reference family (`Catalog`, `CrossRefs`, `Items`, `Vendors`, `Manufacturers`, `Category`) -- which is consistent with `Catalogs` operating as a staging / preparation layer that ultimately posts merged catalog data into the master tables in `EDS`. Procedure names like `sp_PostCatalog`, `sp_CatalogPrepareForPost`, `sp_MergeCatalogs`, and `sp_CreateHybrid` reinforce this read: `Catalogs` is effectively a sidecar workflow database, not a standalone domain.

## Edge-level appendix

All 65 canonical edges, sorted alphabetically by source then target. `Reference text` shows one representative raw substring captured by the regex; multiple reference forms collapse into one row. Use Ctrl-F on this table for impact analysis.

| Source | Source kind | Target | Target kind | Access | Detected by | Reference text |
|--------|-------------|--------|-------------|--------|-------------|----------------|
| `dbo.sp_CatalogPrepareForPost` | Procedure | `dbo.Catalog` | USER_TABLE | read | sed, text | `EDS.dbo.Catalog` |
| `dbo.sp_CatalogPrepareForPost` | Procedure | `dbo.CrossRefs` | USER_TABLE | read | sed, text | `eds.dbo.CrossRefs xr on xr` |
| `dbo.sp_CatalogPrepareForPost` | Procedure | `dbo.uf_PackCodeCatalog` | SQL_SCALAR_FUNCTION | read | sed, text | `eds.dbo.uf_PackCodeCatalog` |
| `dbo.sp_CatalogPrePostXRef` | Procedure | `dbo.Catalog` | USER_TABLE | read | sed, text | `EDS.dbo.Catalog` |
| `dbo.sp_CatalogPrePostXRef` | Procedure | `dbo.CrossRefs` | USER_TABLE | read | sed, text | `eds.dbo.CrossRefs Crossrefs on Crossrefs` |
| `dbo.sp_CreateHybrid` | Procedure | `dbo.Catalog` | USER_TABLE | mixed | sed, text | `[EDS].[dbo].[Catalog]` |
| `dbo.sp_MergeCatalogs` | Procedure | `dbo.Catalog` | USER_TABLE | read | sed, text | `[EDS].[dbo].[Catalog]` |
| `dbo.sp_PostCatalog` | Procedure | `dbo.Catalog` | USER_TABLE | mixed | sed, text | `EDS.dbo.Catalog` |
| `dbo.sp_PostCatalog` | Procedure | `dbo.CrossRefs` | USER_TABLE | mixed | sed, text | `eds.dbo.CrossRefs xr on xr` |
| `dbo.sp_PostCatalog` | Procedure | `dbo.Headings` | USER_TABLE | mixed | sed, text | `EDS.dbo.Headings` |
| `dbo.sp_PostCatalog` | Procedure | `dbo.Items` | USER_TABLE | mixed | sed, text | `eds.dbo.Items Items on Items` |
| `dbo.sp_PostCatalog` | Procedure | `dbo.PostCatalogDetail` | USER_TABLE | write | sed, text | `[EDS].[dbo].[PostCatalogDetail]` |
| `dbo.sp_PostCatalog` | Procedure | `dbo.PostCatalogHeader` | USER_TABLE | write | sed, text | `[EDS].[dbo].[PostCatalogHeader]` |
| `dbo.sp_PostCatalog` | Procedure | `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION | read | sed, text | `eds.dbo.uf_PackCode` |
| `dbo.sp_PostCatalog` | Procedure | `dbo.uf_PackCodeCatalog` | SQL_SCALAR_FUNCTION | read | sed, text | `eds.dbo.uf_PackCodeCatalog` |
| `dbo.sp_PostCatalog` | Procedure | `dbo.Units` | USER_TABLE | read | sed, text | `EDS.dbo.Units Units on Units` |
| `dbo.sp_PostCatalog6` | Procedure | `dbo.Catalog` | USER_TABLE | mixed | sed, text | `EDS.dbo.Catalog` |
| `dbo.sp_PostCatalog6` | Procedure | `dbo.CrossRefs` | USER_TABLE | mixed | sed, text | `eds.dbo.CrossRefs xr on xr` |
| `dbo.sp_PostCatalog6` | Procedure | `dbo.Headings` | USER_TABLE | mixed | sed, text | `EDS.dbo.Headings` |
| `dbo.sp_PostCatalog6` | Procedure | `dbo.Items` | USER_TABLE | mixed | sed, text | `eds.dbo.Items Items on Items` |
| `dbo.sp_PostCatalog6` | Procedure | `dbo.PostCatalogDetail` | USER_TABLE | write | sed, text | `[EDS].[dbo].[PostCatalogDetail]` |
| `dbo.sp_PostCatalog6` | Procedure | `dbo.PostCatalogHeader` | USER_TABLE | write | sed, text | `[EDS].[dbo].[PostCatalogHeader]` |
| `dbo.sp_PostCatalog6` | Procedure | `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION | read | sed, text | `eds.dbo.uf_PackCode` |
| `dbo.sp_PostCatalog6` | Procedure | `dbo.uf_PackCodeCatalog` | SQL_SCALAR_FUNCTION | read | sed, text | `eds.dbo.uf_PackCodeCatalog` |
| `dbo.sp_PostCatalog6` | Procedure | `dbo.Units` | USER_TABLE | read | sed, text | `EDS.dbo.Units Units on Units` |
| `dbo.sp_PostCatalogBackup` | Procedure | `dbo.Catalog` | USER_TABLE | mixed | sed, text | `EDS.dbo.Catalog` |
| `dbo.sp_PostCatalogBackup` | Procedure | `dbo.CrossRefs` | USER_TABLE | mixed | sed, text | `eds.dbo.CrossRefs xr on xr` |
| `dbo.sp_PostCatalogBackup` | Procedure | `dbo.Items` | USER_TABLE | mixed | sed, text | `eds.dbo.Items Items on Items` |
| `dbo.sp_PostCatalogBackup` | Procedure | `dbo.uf_PackCodeCatalog` | SQL_SCALAR_FUNCTION | read | sed, text | `eds.dbo.uf_PackCodeCatalog` |
| `dbo.sp_PostCatalogBackup` | Procedure | `dbo.Units` | USER_TABLE | read | sed, text | `eds.dbo.Units` |
| `dbo.sp_PostCatalogBG2013` | Procedure | `dbo.Catalog` | USER_TABLE | mixed | sed, text | `eds.dbo.Catalog Catalog on Catalog` |
| `dbo.sp_PostCatalogBG2013` | Procedure | `dbo.CrossRefs` | USER_TABLE | mixed | sed, text | `eds.dbo.CrossRefs Crossrefs on Crossrefs` |
| `dbo.sp_PostCatalogBG2013` | Procedure | `dbo.Items` | USER_TABLE | mixed | sed, text | `eds.dbo.Items Items on Items` |
| `dbo.sp_PostCatalogBG2013` | Procedure | `dbo.Units` | USER_TABLE | read | sed, text | `eds.dbo.Units` |
| `dbo.sp_PostCatalogLarge` | Procedure | `dbo.Catalog` | USER_TABLE | read | sed, text | `EDS.dbo.Catalog` |
| `dbo.sp_PostCatalogLarge` | Procedure | `dbo.CrossRefs` | USER_TABLE | mixed | sed, text | `eds.dbo.CrossRefs Crossrefs on Crossrefs` |
| `dbo.sp_PostCatalogLarge` | Procedure | `dbo.Items` | USER_TABLE | read | sed, text | `eds.dbo.Items` |
| `dbo.sp_PostCatalogLarge` | Procedure | `dbo.uf_PackCodeCatalog` | SQL_SCALAR_FUNCTION | read | sed, text | `eds.dbo.uf_PackCodeCatalog` |
| `dbo.sp_PostCatalogLarge` | Procedure | `dbo.Units` | USER_TABLE | read | sed, text | `eds.dbo.Units Units on isnull` |
| `dbo.sp_PostCatalogNew` | Procedure | `dbo.Catalog` | USER_TABLE | mixed | sed, text | `EDS.dbo.Catalog` |
| `dbo.sp_PostCatalogNew` | Procedure | `dbo.CrossRefs` | USER_TABLE | mixed | sed, text | `eds.dbo.CrossRefs xr on xr` |
| `dbo.sp_PostCatalogNew` | Procedure | `dbo.Headings` | USER_TABLE | mixed | sed, text | `EDS.dbo.Headings` |
| `dbo.sp_PostCatalogNew` | Procedure | `dbo.Items` | USER_TABLE | mixed | sed, text | `eds.dbo.Items on Items` |
| `dbo.sp_PostCatalogNew` | Procedure | `dbo.PostCatalogDetail` | USER_TABLE | write | sed, text | `[EDS].[dbo].[PostCatalogDetail]` |
| `dbo.sp_PostCatalogNew` | Procedure | `dbo.PostCatalogHeader` | USER_TABLE | write | sed, text | `[EDS].[dbo].[PostCatalogHeader]` |
| `dbo.sp_PostCatalogNew` | Procedure | `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION | read | sed, text | `eds.dbo.uf_PackCode` |
| `dbo.sp_PostCatalogNew` | Procedure | `dbo.uf_PackCodeCatalog` | SQL_SCALAR_FUNCTION | read | sed, text | `eds.dbo.uf_PackCodeCatalog` |
| `dbo.sp_PostCatalogNew` | Procedure | `dbo.Units` | USER_TABLE | read | sed, text | `eds.dbo.Units` |
| `dbo.sp_PostCatalogOrig` | Procedure | `dbo.Catalog` | USER_TABLE | mixed | sed, text | `EDS.dbo.Catalog` |
| `dbo.sp_PostCatalogOrig` | Procedure | `dbo.CrossRefs` | USER_TABLE | mixed | sed, text | `eds.dbo.CrossRefs xr on xr` |
| `dbo.sp_PostCatalogOrig` | Procedure | `dbo.Headings` | USER_TABLE | mixed | sed, text | `EDS.dbo.Headings` |
| `dbo.sp_PostCatalogOrig` | Procedure | `dbo.Items` | USER_TABLE | mixed | sed, text | `eds.dbo.Items on Items` |
| `dbo.sp_PostCatalogOrig` | Procedure | `dbo.PostCatalogDetail` | USER_TABLE | write | sed, text | `[EDS].[dbo].[PostCatalogDetail]` |
| `dbo.sp_PostCatalogOrig` | Procedure | `dbo.PostCatalogHeader` | USER_TABLE | write | sed, text | `[EDS].[dbo].[PostCatalogHeader]` |
| `dbo.sp_PostCatalogOrig` | Procedure | `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION | read | sed, text | `eds.dbo.uf_PackCode` |
| `dbo.sp_PostCatalogOrig` | Procedure | `dbo.uf_PackCodeCatalog` | SQL_SCALAR_FUNCTION | read | sed, text | `eds.dbo.uf_PackCodeCatalog` |
| `dbo.sp_PostCatalogOrig` | Procedure | `dbo.Units` | USER_TABLE | read | sed, text | `EDS.dbo.Units Units on Units` |
| `dbo.sp_ProcessMiddletownCatalog` | Procedure | `dbo.BidHeaders` | USER_TABLE | read | sed, text | `EDS.dbo.BidHeaders` |
| `dbo.sp_ProcessMiddletownCatalog` | Procedure | `dbo.BidImports` | USER_TABLE | read | sed, text | `EDS.dbo.BidImports` |
| `dbo.sp_ProcessMiddletownCatalog` | Procedure | `dbo.BidRequestItems` | USER_TABLE | mixed | sed, text | `[EDS].[dbo].[BidRequestItems]` |
| `dbo.sp_ProcessMiddletownCatalog` | Procedure | `dbo.BidResults` | USER_TABLE | write | sed, text | `[EDS].[dbo].[BidResults]` |
| `dbo.sp_ProcessMiddletownCatalog` | Procedure | `dbo.Catalog` | USER_TABLE | read | sed, text | `EDS.dbo.Catalog` |
| `dbo.sp_ProcessMiddletownCatalog` | Procedure | `dbo.Headings` | USER_TABLE | mixed | sed, text | `EDS.dbo.Headings` |
| `dbo.sp_ProcessMiddletownCatalog` | Procedure | `dbo.Items` | USER_TABLE | mixed | sed, text | `eds..Items` |
| `dbo.sp_ReimportCatalog` | Procedure | `dbo.uf_PackCodeCatalog` | SQL_SCALAR_FUNCTION | read | sed, text | `eds.dbo.uf_PackCodeCatalog` |

## Source queries

All catalog views consumed by this drill-down. Reproducible by running `node src/drilldown-catalogs-to-eds.js` from the repository root with a populated `.env`.

```sql
-- 1. Source-side modules (Catalogs procedures/functions/views/triggers + raw definitions):
SELECT SCHEMA_NAME(o.schema_id), o.name, o.type, o.object_id, o.modify_date, m.definition
FROM [Catalogs].sys.objects o
LEFT JOIN [Catalogs].sys.sql_modules m ON m.object_id = o.object_id
WHERE o.type IN ('P','FN','IF','TF','V','TR');

-- 2. SQL Server's own resolved cross-DB dependencies, filtered to EDS targets only:
SELECT SCHEMA_NAME(o.schema_id), o.name, o.type,
       d.referenced_database_name, d.referenced_schema_name, d.referenced_entity_name
FROM [Catalogs].sys.objects o
JOIN [Catalogs].sys.sql_expression_dependencies d ON d.referencing_id = o.object_id
WHERE o.type IN ('P','FN','IF','TF','V','TR')
  AND d.referenced_database_name = 'EDS';

-- 3. Target-side object catalog (EDS) for resolving each reference to a kind label:
SELECT SCHEMA_NAME(schema_id), name, type, type_desc
FROM [EDS].sys.objects
WHERE type_desc IN ('USER_TABLE','VIEW','SQL_STORED_PROCEDURE',
  'SQL_SCALAR_FUNCTION','SQL_INLINE_TABLE_VALUED_FUNCTION','SQL_TABLE_VALUED_FUNCTION','SYNONYM');
```

Plus a Node-side regex (identical to `src/document-dependencies.js`) over each definition with `--` and `/* */` comments stripped:

```
/(?:\[\s*EDS\s*\]|(?<![A-Za-z0-9_])EDS)\s*\.\s*(\[?[A-Za-z0-9_ ]+\]?)?\s*\.\s*(\[?[A-Za-z0-9_ ]+\]?)/gi
```

After matching, the raw `target_object` capture is normalized (trim alias/join noise) and resolved against `[EDS].sys.objects` to a canonical `schema.name` -- this is what causes the canonical edge count to be lower than the scanner's broader-dedup count.
