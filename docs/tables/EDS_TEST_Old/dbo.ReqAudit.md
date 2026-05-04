# Table: `dbo.ReqAudit`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ReqAuditId` | int | NO |  | YES |
| 2 | `RequisitionId` | int | YES |  |  |
| 3 | `DetailId` | int | YES |  |  |
| 4 | `ItemId` | int | YES |  |  |
| 5 | `FieldName` | varchar(50) | YES |  |  |
| 6 | `PreviousValue` | varchar(255) | YES |  |  |
| 7 | `NewValue` | varchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
