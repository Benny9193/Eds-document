# Table: `dbo.AlertSuppression`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `EngineID` | int | NO | `((0))` | YES |
| 2 | `SupID` | int | NO |  | YES |
| 3 | `SupNetObject` | char(7) | YES |  |  |
| 4 | `SupPropertyID` | int | YES |  |  |
| 5 | `SupCondition` | varchar(100) | YES |  |  |
| 6 | `SupDescription` | varchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_AlertSuppression` | no | NONCLUSTERED | `SupID` |  |
