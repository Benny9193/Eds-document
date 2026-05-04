# Table: `dbo.Settings`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 193

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SettingID` | nvarchar(250) | NO |  | YES |
| 2 | `Name` | nvarchar(512) | YES |  |  |
| 3 | `Description` | nvarchar(1000) | YES |  |  |
| 4 | `Units` | nvarchar(80) | YES |  |  |
| 5 | `Minimum` | real | YES |  |  |
| 6 | `Maximum` | real | YES |  |  |
| 7 | `CurrentValue` | real | YES |  |  |
| 8 | `DefaultValue` | real | YES |  |  |
| 9 | `Hint` | nvarchar(800) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
