# Business Logic: `Documents`

_Generated: 2026-05-04_

**Server:** `eds-sqlserver.eastus2.cloudapp.azure.com`

[← back to business-logic index](README.md)

---

## Table of Contents

1. [Domain Summary](#domain-summary)
2. [Core Entities and Lifecycle](#core-entities-and-lifecycle)
3. [Workflows and Processes](#workflows-and-processes)
4. [Business Rules](#business-rules)
5. [Status and State Machines](#status-and-state-machines)
6. [Cross-Database Touchpoints](#cross-database-touchpoints)
7. [Open Questions and Ambiguities](#open-questions-and-ambiguities)
8. [Source Queries](#source-queries)

---

## Domain Summary

`Documents` is the document management storage layer for the EDS platform. It provides typed document containers with structured field metadata, and supports acceptance, soft-deletion, and field-merge operations. It is principally used to store vendor bid documents, RTK (Right-to-Know) chemical safety documentation, and SDS (Safety Data Sheet) records that EDS views surface to end users.

The database has no independent user-facing UI of its own — it functions as a service database. EDS makes 222 outbound reference edges into it via approximately 20 views and several helper functions. The logic surface area is small: 5 meaningful stored procedures plus 3 utility functions for lookup-statement generation.

---

## Core Entities and Lifecycle

### Document

`Documents` is the root entity. Each row represents a single typed document (e.g., a bid document, an SDS sheet, an RTK form). Key columns include:
- `Id` (uniqueidentifier) — primary key
- `deletedAt` (datetime) — soft-delete timestamp; `null` = active
- A reference to `DocumentTypes` which categorizes the document

### DocumentFiles

`DocumentFiles` holds the physical file records associated with a `Document`. A document may have multiple file versions over time, ordered by `Datestamp`. The "current" file is always the most recent row where `deletedAt IS NULL`.

### DocumentTypes and Fields

`DocumentTypes` defines the document schema (e.g., "Vendor Bid Document", "SDS Record"). `Fields` defines the metadata fields that documents of each type carry. `DocumentTypeFields` joins types to fields. `FieldData` stores the actual values — one row per (document, field).

---

## Workflows and Processes

### Document Acceptance

```
sp_AcceptDocs(@XmlIn)
  → Parses XML: <Documents><Document id="..."/></Documents>
  → For each DocumentId in the XML:
      UPDATE DocumentFiles
         SET AcceptedAt = GETDATE(),
             AcceptedById = null
       WHERE DocumentFiles.Id = (
         SELECT TOP 1 df.Id FROM DocumentFiles df
          WHERE df.DocumentId = Documents.Id
            AND df.deletedAt IS NULL
          ORDER BY df.Datestamp DESC)
```

Acceptance stamps the latest non-deleted `DocumentFiles` row. `AcceptedById = null` is intentional — the accepting user identity is not recorded. *(Open question: see below.)*

### Document Deletion (Soft)

```
sp_DeleteDocs(@XmlIn)
  → Same XML input format as sp_AcceptDocs
  → For each DocumentId:
      1. UPDATE FieldData SET deletedAt = GETDATE()
         (all FieldData rows for the document)
      2. UPDATE Documents SET deletedAt = GETDATE()
      3. UPDATE DocumentFiles SET deletedAt = GETDATE()
         (only the latest non-deleted file)
```

Deletion is a cascade soft-delete: it marks `FieldData`, `Documents`, and `DocumentFiles` in that order. All three writes target the same document resolved through the latest non-deleted `DocumentFiles` row.

### Field Update

```
sp_UpdateDocumentFields(@XmlIn)
  → Parses XML containing field values
  → Upserts FieldData rows for the specified document
  → (Exact XML schema and upsert logic not traced in this pass)
```

### Field Merge

```
sp_FieldMerge(@sourceDocumentId, @targetDocumentId, ...)
  → Copies FieldData from one document to another
  → Used when documents are consolidated or re-parented
```

### Multi-Edit Check

```
sp_MultiEditCheck(@documentIds, ...)
  → Validates that a batch of documents can be edited simultaneously
  → Guards against conflicting edits (exact logic not traced)
```

### Lookup Function Helpers

Three scalar functions generate SQL fragments for dynamic field lookups:

| Function | Returns |
|----------|---------|
| `ufn_LookupSelectFields(@DocTypeId)` | SELECT clause fragment listing field columns |
| `ufn_LookupWhereFields(@DocTypeId, ...)` | WHERE clause fragment for field filtering |
| `ufn_LookupSelectStatement(@DocTypeId, ...)` | Full SELECT statement for dynamic document queries |

These are used by EDS views that build dynamic queries against `FieldData` for different document types.

---

## Business Rules

### Soft-Delete Only

No hard-delete procedures exist. Deletion is always a soft-delete via `deletedAt = GETDATE()`. Active records are identified by `deletedAt IS NULL`.

### Latest-File Pattern

All procedures target the single most-recent non-deleted `DocumentFiles` row using:

```sql
(SELECT TOP 1 df.Id FROM DocumentFiles df
  WHERE df.DocumentId = Documents.Id
    AND df.deletedAt IS NULL
  ORDER BY df.Datestamp DESC)
```

This pattern is consistent across `sp_AcceptDocs`, `sp_DeleteDocs`, and the EDS views that join into Documents. Older file versions remain in the table and are surfaced when querying history.

### XML Batch Input

Both `sp_AcceptDocs` and `sp_DeleteDocs` use `sp_xml_preparedocument` / `OPENXML` to parse a batch of document IDs as XML. The expected format is:

```xml
<Documents>
  <Document id="<guid>"/>
  <Document id="<guid>"/>
</Documents>
```

---

## Status and State Machines

Documents do not have an explicit status column. State is implied by the presence or absence of timestamps:

| Condition | Implied State |
|-----------|--------------|
| `Documents.deletedAt IS NULL` AND `DocumentFiles.AcceptedAt IS NULL` | Pending acceptance |
| `Documents.deletedAt IS NULL` AND `DocumentFiles.AcceptedAt IS NOT NULL` | Accepted / active |
| `Documents.deletedAt IS NOT NULL` | Deleted |

---

## Cross-Database Touchpoints

`Documents` is a pure inbound service database — it makes no outbound cross-database calls. All references flow from EDS and EDS_TEST_Old into Documents.

| Inbound source | Edges | Key views/purposes |
|----------------|-------|-------------------|
| `EDS` | 222 | `vw_DMSAllDocuments`, `vw_DMSBidDocuments_View`, `vw_DMSRTKDocuments`, `vw_DMSSDSDocuments_View`, `vw_DMSVendorBidDocuments_View`, etc. |
| `EDS_TEST_Old` | 61 | Mirrors of EDS document views for test environment |

See [`docs/dependencies/Documents/inbound.md`](../dependencies/Documents/inbound.md) for the full edge list.

---

## Open Questions and Ambiguities

1. **`AcceptedById = null` in `sp_AcceptDocs`.** The acceptance procedure explicitly sets `AcceptedById = null`, discarding the session/user context. Whether this is intentional (audit handled elsewhere) or a bug is unclear.

2. **`sp_UpdateDocumentFields` and `sp_MultiEditCheck` XML schema.** The XML input format for these procedures was not traced. A future pass should document the expected payload structures.

3. **`sp_FieldMerge` destination rules.** Whether `sp_FieldMerge` overwrites conflicting fields or skips them is not visible from the procedure signature alone.

4. **Document type IDs.** `DocumentTypes` rows define what categories exist, but the actual type IDs and their names were not queried from the live database. A human reviewer should document which `DocumentTypeId` values correspond to bid documents, SDS, RTK forms, etc.

---

## Source Queries

This document was synthesized from the following artifact sources — no additional live queries were executed:

| Source | Used for |
|--------|----------|
| `docs/procedures/Documents/*.md` | Procedure definitions, parameters, dependency lists |
| `docs/tables/Documents/README.md` | Table list, row counts |
| `docs/dependencies/Documents/inbound.md` | Inbound cross-database reference edges |
| `SCHEMA.md` | Cross-database dependency matrix |
