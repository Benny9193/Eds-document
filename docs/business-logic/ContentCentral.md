# Business Logic: `ContentCentral`

_Generated: 2026-05-04_

**Server:** `eds-sqlserver.eastus2.cloudapp.azure.com`

[← back to business-logic index](README.md)

---

## Domain Summary

`ContentCentral` is a third-party content/CMS and document-capture system. It stores scanned-document metadata including document types, type field definitions, document instances, and document versions. EDS uses it as a lookup target for scan-document views that surface chemical safety (MSDS/SDS) and RTK documents to end users.

This database contains 141 tables and no stored procedures of its own in the production instance — it is a purchased or externally-managed system, not an EDS-developed application. All business logic in ContentCentral is implemented externally (application-layer or another database management system). From EDS's perspective, ContentCentral is a **read-only lookup target**.

**No EDS-authored stored procedures exist in this database.** The `docs/procedures/ContentCentral/` directory is empty (no non-`dt_*` procedures were found). The `dt_*` procedures are SQL Server diagram maintenance scaffolding, not business logic.

---

## Role in the EDS Ecosystem

EDS references ContentCentral in 68 outbound edges from 3 EDS routines:

| EDS routine | ContentCentral objects accessed |
|------------|--------------------------------|
| `dbo.sp_retrieveTagset` | `dbo.vw_ScannedDocumentDataAll` |
| `dbo.uf_ScanDocSelectFields` | `dbo.DocTypeField`, `dbo.DocTypeFieldExternalLookupSelectItem` |
| `dbo.uf_ScanDocSelectStatement` | `dbo.DocType`, `dbo.DocTypeFieldExternalLookup` |
| `dbo.uf_ScanDocWhereFields` | `dbo.DocTypeField`, `dbo.DocTypeFieldExternalLookupItem` |
| ~12 EDS views | `dbo.Catalog`, `dbo.DocType`, `dbo.DocTypeField`, `dbo.Document`, `dbo.DocumentField`, `dbo.DocumentFolder`, `dbo.DocumentVersion`, `dbo.DocumentVersionFile`, `dbo.CaptureJob`, and related |

EDS_TEST_Old also references ContentCentral in 26 edges from 5 views (`vw_ScanDocLookupFields`, `vw_ScanDocLookupTargets`, `vw_ScanDocLookups`, `vw_ScannedDocumentDataMSDS`, `vw_ZonalItems`).

The lookup functions `uf_ScanDocSelectFields`, `uf_ScanDocSelectStatement`, and `uf_ScanDocWhereFields` in EDS dynamically build SQL fragments by reading ContentCentral's field schema — enabling EDS to render document fields without hard-coding field definitions.

---

## Open Questions and Ambiguities

1. **ContentCentral version and vendor.** The product appears to be Ademero ContentCentral (a document management platform). EDS would need to consult Ademero documentation or the ContentCentral admin interface for the full data model.

2. **Data ownership boundary.** Documents stored in ContentCentral (RTK, MSDS/SDS) may be managed by a different team than those managing EDS. Changes to ContentCentral's field schema could break EDS's dynamic query functions.

3. **`dbo.vw_ScannedDocumentDataAll` exists in ContentCentral** and is referenced by `EDS.dbo.sp_retrieveTagset`. Whether this view is EDS-authored (added to ContentCentral to serve EDS) or a native ContentCentral view is not clear.

---

## Source Queries

This document was synthesized from the following artifact sources — no additional live queries were executed:

| Source | Used for |
|--------|----------|
| `docs/tables/ContentCentral/README.md` | Table list (141 tables confirmed) |
| `docs/dependencies/ContentCentral/inbound.md` | Inbound cross-database reference edges from EDS |
| `docs/dependencies/EDS/outbound.md` | EDS outbound edges to ContentCentral |
| `SCHEMA.md` | Cross-database dependency matrix |
