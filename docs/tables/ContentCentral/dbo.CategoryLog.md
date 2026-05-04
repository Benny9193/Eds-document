# Table: `dbo.CategoryLog`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1497

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CategoryLogID` | int | NO |  | YES |
| 2 | `CategoryID` | int | NO |  |  |
| 3 | `LogID` | int | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_CategoryLog_Category` | `CategoryID` | [`dbo.Category.CategoryID`](dbo.Category.md) | NO_ACTION | NO_ACTION |
| `FK_CategoryLog_Log` | `LogID` | [`dbo.Log.LogID`](dbo.Log.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `ixCategoryLog` | no | NONCLUSTERED | `LogID`, `CategoryID` |  |
