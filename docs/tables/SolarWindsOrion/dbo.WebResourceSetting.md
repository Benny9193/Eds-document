# Table: `dbo.WebResourceSetting`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `WebResourceSettingID` | int | NO |  | YES |
| 2 | `WebResourceID` | int | NO |  |  |
| 3 | `Name` | nvarchar(50) | NO |  |  |
| 4 | `Value` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_WebResourceSetting_WebResource` | `WebResourceID` | [`dbo.WebResource.WebResourceID`](dbo.WebResource.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
