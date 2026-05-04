# Table: `dbo.ConfigWizardMetric`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  |  |
| 2 | `SessionId` | uniqueidentifier | NO |  |  |
| 3 | `Started` | datetime | NO |  |  |
| 4 | `Duration` | int | YES |  |  |
| 5 | `InstallationType` | nvarchar(16) | YES |  |  |
| 6 | `EvalType` | nvarchar(16) | YES |  |  |
| 7 | `TerminationMode` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
