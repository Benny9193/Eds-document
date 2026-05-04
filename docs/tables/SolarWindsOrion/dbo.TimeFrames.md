# Table: `dbo.TimeFrames`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TimeFrameID` | int | NO |  | YES |
| 2 | `Name` | nvarchar(256) | NO |  |  |
| 3 | `StartTime` | datetime | YES |  |  |
| 4 | `EndTime` | datetime | YES |  |  |
| 5 | `IsDisabled` | bit | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
