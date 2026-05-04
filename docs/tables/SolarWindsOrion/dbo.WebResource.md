# Table: `dbo.WebResource`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `WebResourceID` | int | NO |  | YES |
| 2 | `Type` | nvarchar(150) | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_WebResource_WebResource` | `WebResourceID` | [`dbo.WebResource.WebResourceID`](dbo.WebResource.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.WebResource`](dbo.WebResource.md) | `WebResourceID` | `WebResourceID` | NO_ACTION | NO_ACTION |
| [`dbo.WebResourceSetting`](dbo.WebResourceSetting.md) | `WebResourceID` | `WebResourceID` | CASCADE | CASCADE |
| [`dbo.WebResourceUserSetting`](dbo.WebResourceUserSetting.md) | `WebResourceID` | `WebResourceID` | CASCADE | CASCADE |
| [`dbo.WebViewResource`](dbo.WebViewResource.md) | `WebResourceID` | `WebResourceID` | CASCADE | CASCADE |

## Indexes

_No non-PK indexes._
