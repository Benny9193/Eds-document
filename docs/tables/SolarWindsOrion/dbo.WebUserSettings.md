# Table: `dbo.WebUserSettings`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 15

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AccountID` | nvarchar(100) | NO |  | YES |
| 2 | `SettingName` | nvarchar(50) | NO |  | YES |
| 3 | `SettingValue` | nvarchar(max) | YES |  |  |
| 4 | `InstanceSiteId` | int | NO | `((0))` | YES |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
