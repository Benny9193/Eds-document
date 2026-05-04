# Table: `dbo.RecommendationEngine_Dismissed`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ContentId` | int | NO |  |  |
| 2 | `UserName` | nvarchar(255) | YES |  |  |
| 3 | `DismissDate` | datetime | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_RecommendationEngine_Dismissed_UserName` | no | NONCLUSTERED | `UserName` |  |
