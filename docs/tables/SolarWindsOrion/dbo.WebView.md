# Table: `dbo.WebView`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 9

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `WebViewID` | int | NO |  | YES |
| 2 | `WebViewParentID` | int | YES |  |  |
| 3 | `LimitationID` | int | YES |  |  |
| 4 | `Name` | nvarchar(200) | NO |  |  |
| 5 | `DefaultTitle` | nvarchar(200) | NO |  |  |
| 6 | `Type` | nvarchar(50) | YES |  |  |
| 7 | `TemplateUrl` | nvarchar(300) | YES |  |  |
| 8 | `Url` | nvarchar(300) | YES |  |  |
| 9 | `Icon` | nvarchar(50) | YES |  |  |
| 10 | `IsCustom` | bit | NO |  |  |
| 11 | `OpenInNewWindow` | bit | NO |  |  |
| 12 | `SortOrder` | int | NO | `((0))` |  |
| 13 | `FeatureDependencies` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_WebView_WebView1` | `WebViewParentID` | [`dbo.WebView.WebViewID`](dbo.WebView.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.WebView`](dbo.WebView.md) | `WebViewParentID` | `WebViewID` | NO_ACTION | NO_ACTION |
| [`dbo.WebViewGroupWebView`](dbo.WebViewGroupWebView.md) | `WebViewID` | `WebViewID` | CASCADE | CASCADE |
| [`dbo.WebViewResource`](dbo.WebViewResource.md) | `WebViewID` | `WebViewID` | CASCADE | CASCADE |

## Indexes

_No non-PK indexes._
