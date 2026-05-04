# Table: `dbo.LimitationSnapshots`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `LimitationSnapshotID` | bigint | NO |  |  |
| 2 | `LimitationID` | int | NO |  | YES |
| 3 | `EntityUri` | nvarchar(400) | NO |  |  |
| 4 | `EntityType` | nvarchar(200) | NO |  | YES |
| 5 | `EntityID` | bigint | NO |  | YES |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
