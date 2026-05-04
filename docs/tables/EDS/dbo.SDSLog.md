# Table: `dbo.SDSLog`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `sdsLogId` | bigint | NO |  | YES |
| 2 | `sdsURL` | varchar(512) | YES |  |  |
| 3 | `statusCode` | int | YES |  |  |
| 4 | `statusText` | varchar(512) | YES |  |  |
| 5 | `contentType` | varchar(50) | YES |  |  |
| 6 | `headers` | varchar(max) | YES |  |  |
| 7 | `testDate` | datetime | YES | `(getdate())` |  |
| 8 | `writeStatus` | int | YES |  |  |
| 9 | `writeDate` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
