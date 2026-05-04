# Table: `dbo.ThresholdsLevelSettings`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 8

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ThresholdLevel` | int | NO |  |  |
| 2 | `EntityType` | nvarchar(150) | NO |  |  |
| 3 | `Name` | nvarchar(150) | NO |  |  |
| 4 | `SettingID` | nvarchar(250) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ThresholdsLevelSettings` | YES | CLUSTERED | `ThresholdLevel`, `EntityType`, `Name` |  |
