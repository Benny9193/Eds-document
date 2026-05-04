# Table: `dbo.WebViewGroup`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `WebViewGroupID` | int | NO |  | YES |
| 2 | `Name` | nvarchar(200) | NO |  |  |
| 3 | `DefaultTitle` | nvarchar(200) | NO |  |  |
| 4 | `Tags` | nvarchar(500) | YES |  |  |
| 5 | `SortOrder` | int | NO | `((0))` |  |
| 6 | `OrionFeatureName` | nvarchar(100) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.WebViewGroupWebView`](dbo.WebViewGroupWebView.md) | `WebViewGroupID` | `WebViewGroupID` | CASCADE | CASCADE |

## Indexes

_No non-PK indexes._
