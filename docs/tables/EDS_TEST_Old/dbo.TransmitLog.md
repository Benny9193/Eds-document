# Table: `dbo.TransmitLog`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 139319

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TransmitId` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DateStamp` | datetime2 | YES | `(getdate())` |  |
| 3 | `RequestURL` | varchar(1024) | YES |  |  |
| 4 | `RequestParams` | varchar(2048) | YES |  |  |
| 5 | `RequestData` | varchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
