# Table: `dbo.ChartSettings`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 29

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ChartName` | nvarchar(50) | NO |  | YES |
| 2 | `NetObjectPrefix` | nvarchar(20) | NO |  |  |
| 3 | `Owner` | nvarchar(50) | NO |  |  |
| 4 | `IsSystemChart` | bit | NO |  |  |
| 5 | `DisplayName` | nvarchar(250) | NO |  |  |
| 6 | `DataUrl` | nvarchar(500) | NO |  |  |
| 7 | `ChartOptions` | nvarchar(max) | NO |  |  |
| 8 | `LegendUserControl` | nvarchar(500) | NO |  |  |
| 9 | `ChartEditOptions` | nvarchar(max) | YES |  |  |
| 10 | `ChartRenderingEventHandler` | nvarchar(500) | YES |  |  |
| 11 | `HelpLinkFragment` | nvarchar(500) | NO |  |  |
| 12 | `DefaultResourcePath` | nvarchar(500) | YES |  |  |
| 13 | `IsExportEnabled` | bit | NO | `((0))` |  |
| 14 | `CustomPropertyKey` | nvarchar(500) | YES |  |  |
| 15 | `AnnotationLineColor` | nvarchar(100) | YES |  |  |
| 16 | `LoadingMode` | smallint | NO | `((0))` |  |
| 17 | `ChartExportValueFormatter` | nvarchar(500) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ChartSettings_NetObjectPrefix` | no | NONCLUSTERED | `NetObjectPrefix` |  |
