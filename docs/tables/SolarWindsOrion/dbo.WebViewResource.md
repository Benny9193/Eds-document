# Table: `dbo.WebViewResource`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `WebViewResourceID` | int | NO |  | YES |
| 2 | `WebViewID` | int | NO |  |  |
| 3 | `WebResourceID` | int | NO |  |  |
| 4 | `SortOrder` | int | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_WebViewResource_WebResource` | `WebResourceID` | [`dbo.WebResource.WebResourceID`](dbo.WebResource.md) | CASCADE | CASCADE |
| `FK_WebViewResource_WebView` | `WebViewID` | [`dbo.WebView.WebViewID`](dbo.WebView.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
