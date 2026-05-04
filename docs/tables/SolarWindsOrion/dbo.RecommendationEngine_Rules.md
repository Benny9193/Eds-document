# Table: `dbo.RecommendationEngine_Rules`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RuleId` | uniqueidentifier | NO |  | YES |
| 2 | `Expiration` | datetime | NO |  |  |
| 3 | `Rule` | nvarchar(max) | NO |  |  |
| 4 | `TargetedProducts` | nvarchar(512) | YES |  |  |
| 5 | `RecommendedProducts` | nvarchar(512) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
