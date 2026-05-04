# Table: `dbo.BatchDetailInserts`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1176

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BatchDetailInsertId` | uniqueidentifier | NO | `(newsequentialid())` | YES |
| 2 | `RequisitionId` | int | NO |  |  |
| 3 | `ItemId` | int | YES |  |  |
| 4 | `qty` | int | YES |  |  |
| 5 | `BatchDetailId` | int | NO |  |  |
| 6 | `SourceId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
