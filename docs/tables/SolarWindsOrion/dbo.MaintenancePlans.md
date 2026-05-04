# Table: `dbo.MaintenancePlans`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  | YES |
| 2 | `AccountID` | nvarchar(100) | NO |  |  |
| 3 | `Name` | nvarchar(1000) | YES |  |  |
| 4 | `Reason` | nvarchar(max) | YES |  |  |
| 5 | `KeepPolling` | bit | YES | `((0))` |  |
| 6 | `Favorite` | bit | YES | `((0))` |  |
| 7 | `Enabled` | bit | NO | `((1))` |  |
| 8 | `UnmanageDate` | datetime | NO |  |  |
| 9 | `RemanageDate` | datetime | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
