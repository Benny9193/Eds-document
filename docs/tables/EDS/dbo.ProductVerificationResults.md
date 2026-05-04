# Table: `dbo.ProductVerificationResults`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 206645

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Automated product-verification results (~207K rows). One row per (`EntryId`, `QueryType`) — likely an LLM / rules-engine check — with `VerificationResult`, full `DataChecked` payload, and `Reasoning` text. Unique on (EntryId, QueryType).

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VerificationId` | int | NO |  | YES |
| 2 | `EntryId` | nvarchar(255) | NO |  |  |
| 3 | `QueryType` | nvarchar(100) | NO |  |  |
| 4 | `VerificationResult` | nvarchar(50) | NO |  |  |
| 5 | `DataChecked` | nvarchar(max) | YES |  |  |
| 6 | `Reasoning` | nvarchar(max) | YES |  |  |
| 7 | `VerifiedAt` | datetime2 | YES | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_EntryId_QueryType` | no | NONCLUSTERED | `EntryId`, `QueryType` |  |
| `IX_QueryType` | no | NONCLUSTERED | `QueryType` |  |
| `IX_VerificationResult` | no | NONCLUSTERED | `VerificationResult` |  |
| `UQ_EntryId_QueryType` | YES | NONCLUSTERED | `EntryId`, `QueryType` |  |
