# Table: `dbo.WebViewGroupWebView`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 9

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `WebViewGroupWebViewID` | int | NO |  | YES |
| 2 | `WebViewGroupID` | int | NO |  |  |
| 3 | `WebViewID` | int | NO |  |  |
| 4 | `SortOrder` | int | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_WebViewGroupWebView_WebView` | `WebViewID` | [`dbo.WebView.WebViewID`](dbo.WebView.md) | CASCADE | CASCADE |
| `FK_WebViewGroupWebView_WebViewGroup` | `WebViewGroupID` | [`dbo.WebViewGroup.WebViewGroupID`](dbo.WebViewGroup.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
