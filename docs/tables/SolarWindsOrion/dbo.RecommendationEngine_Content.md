# Table: `dbo.RecommendationEngine_Content`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ContentId` | int | NO |  | YES |
| 2 | `RuleId` | uniqueidentifier | NO |  |  |
| 3 | `ContentType` | nvarchar(32) | NO |  |  |
| 4 | `UrlHash` | nvarchar(64) | NO |  |  |
| 5 | `Url` | nvarchar(2048) | NO |  |  |
| 6 | `Content` | nvarchar(max) | YES |  |  |
| 7 | `TimesShown` | int | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UK_RecommendationEngineContent_RuleId_ContentType_UrlHash` | YES | CLUSTERED | `RuleId`, `ContentType`, `UrlHash` |  |
