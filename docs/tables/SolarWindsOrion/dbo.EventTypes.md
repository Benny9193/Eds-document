# Table: `dbo.EventTypes`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 87

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `EventType` | int | NO |  | YES |
| 2 | `Name` | nvarchar(255) | YES |  |  |
| 3 | `Bold` | bit | NO |  |  |
| 4 | `BackColor` | int | YES |  |  |
| 5 | `Icon` | varchar(max) | YES |  |  |
| 6 | `Sort` | tinyint | YES |  |  |
| 7 | `Notify` | bit | NO |  |  |
| 8 | `Record` | bit | NO |  |  |
| 9 | `Sound` | varchar(max) | YES |  |  |
| 10 | `Mute` | bit | NO |  |  |
| 11 | `NotifyMessage` | nvarchar(max) | YES |  |  |
| 12 | `NotifySubject` | varchar(max) | YES |  |  |
| 13 | `OrionFeatureName` | nvarchar(100) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
