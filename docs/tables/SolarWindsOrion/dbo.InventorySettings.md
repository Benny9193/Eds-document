# Table: `dbo.InventorySettings`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `ObjectId` | int | NO |  |  |
| 3 | `ObjectType` | nvarchar(255) | NO |  |  |
| 4 | `SettingName` | nvarchar(255) | NO |  |  |
| 5 | `SettingValue` | nvarchar(255) | YES |  |  |
| 6 | `ObjectSettingID` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
