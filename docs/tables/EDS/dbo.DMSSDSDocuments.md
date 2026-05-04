# Table: `dbo.DMSSDSDocuments`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 602

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

DMS pointer for legacy MSDS documents (~602 rows). Per `MSDSId` row holding the DMS `DocId`, `PagesCaptured`, and `DocName`. Older / parallel storage to `SDSDocs` (which is the current binary store) — the two diverge by ingestion vintage.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `MSDSId` | int | NO |  |  |
| 3 | `DocId` | uniqueidentifier | NO |  |  |
| 4 | `PagesCaptured` | int | YES |  |  |
| 5 | `DocName` | varchar(1024) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_MSDS_IDDoc` | no | NONCLUSTERED | `MSDSId`, `DocId` | `Id` |
