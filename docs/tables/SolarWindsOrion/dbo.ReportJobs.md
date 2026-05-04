# Table: `dbo.ReportJobs`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ReportJobID` | int | NO |  | YES |
| 2 | `Name` | nvarchar(255) | NO |  |  |
| 3 | `Description` | nvarchar(max) | YES |  |  |
| 4 | `Enabled` | bit | NO |  |  |
| 5 | `AccountID` | nvarchar(100) | YES |  |  |
| 6 | `LastRun` | datetime | YES |  |  |
| 7 | `WebsiteID` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
