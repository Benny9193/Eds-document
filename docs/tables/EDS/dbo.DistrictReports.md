# Table: `dbo.DistrictReports`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 11

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictReportId` | int | NO |  | YES |
| 2 | `Level` | int | YES |  |  |
| 3 | `Group` | varchar(50) | YES |  |  |
| 4 | `ReportName` | varchar(50) | NO |  |  |
| 5 | `ScriptURL` | varchar(1024) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
