# Table: `dbo.DiscoveryLogs`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DiscoveryLogID` | int | NO |  | YES |
| 2 | `ProfileID` | int | NO |  |  |
| 3 | `FinishedUTC` | datetime | NO |  |  |
| 4 | `AutoImport` | bit | NO |  |  |
| 5 | `Result` | int | NO |  |  |
| 6 | `ResultDescription` | nvarchar(200) | NO |  |  |
| 7 | `ErrorMessage` | nvarchar(max) | YES |  |  |
| 8 | `BatchID` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
