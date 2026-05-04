# Business Logic Documentation

_Generated: 2026-05-04_

**Server:** `eds-sqlserver.eastus2.cloudapp.azure.com`

## What "business logic" means here

This documentation layer captures the **behavioral** dimension of the EDS server — the _what and why_ of how the system operates, as opposed to its raw shape. Specifically, it covers:

- **Stored procedures** that implement multi-step workflows (approval chains, PO creation, bid award, catalog posting)
- **Status codes and state machines** enforced by `StatusTable`, column conventions, and conditional procedure logic
- **Business rules** embedded as guards, `RAISERROR` checks, and conditional branches inside T-SQL
- **Computed / derived data** materialized by procedures, views, or scheduled copies
- **Cross-database touchpoints** where one database reads from or writes to another
- **Naming-convention-implied workflows** — the `Active` / `IsActive` flags, `DateCreated` / `DateApproved` timestamp patterns, `archive.*` schema for cold storage, and the `ChangeLog` / `Journal` append-only audit pattern

This is distinct from the schema documentation (`docs/tables/`) which describes structure, and the procedure documentation (`docs/procedures/`) which gives raw T-SQL. This layer synthesizes those sources into readable domain narratives.

## Contents

| Database | Domain summary |
|----------|----------------|
| [EDS](EDS.md) | Core K-12 cooperative procurement platform: requisitions, approvals, PO issuance, vendor catalog management, and bid solicitation/award |
| [VendorBids](VendorBids.md) | Vendor-facing bid response portal: vendor registration, encrypted item price submission, document uploads, and submission lifecycle |
| [Catalogs](Catalogs.md) | Catalog staging and posting engine: ingests vendor price files into a `Master Catalog` staging table, deduplicates, matches/creates items, and posts to EDS `CrossRefs` |
| [Documents](Documents.md) | Document management storage: typed document containers with field metadata, acceptance/deletion workflows, and field merge operations |
| [NJ_RTK](NJ_RTK.md) | New Jersey Right-to-Know survey tracker: stores facility and employer records and a lightweight survey upsert workflow |
| [ContentCentral](ContentCentral.md) | Content/CMS document indexing (stub — no stored procedure logic; serves as a lookup target for EDS scan-document views) |
| [IDIQ_Platform](IDIQ_Platform.md) | Indefinite-Delivery / Indefinite-Quantity contract platform (stub — no procedures or triggers found) |
| [ProcurementAnalytics](ProcurementAnalytics.md) | Analytics flatten of EDS data (stub — read-only reporting layer; no procedures or triggers) |

## Cross-links

| Resource | Description |
|----------|-------------|
| [SCHEMA.md](../../SCHEMA.md) | Root index of every table and view, with cross-database dependency summary |
| [docs/tables/](../tables/) | Auto-generated per-table structural metadata (columns, PKs, FKs, indexes) |
| [docs/procedures/](../procedures/) | Per-database procedure and function reference with full T-SQL definitions |
| [docs/dependencies/](../dependencies/) | Cross-database coupling matrix and per-database outbound/inbound dependency pages |
| [EDS_GUIDE.md](../../EDS_GUIDE.md) | Curated narrative tour of the 37 most important EDS production tables |

## Source basis

This documentation was synthesized from:

- `docs/procedures/<db>/*.md` — full procedure definitions already captured by `npm run procs`
- `docs/tables/<db>/README.md` — table lists and row counts already captured by `npm run schema`
- `docs/dependencies/README.md` — cross-database coupling matrix from `npm run deps`
- `EDS_GUIDE.md` — curated domain layout for the EDS production database

No additional live queries were required; all facts cited here trace back to the artifacts above. Where live verification was not performed, inferences are marked _(*inferred from naming/context*)_.
