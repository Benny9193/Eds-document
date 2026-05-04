# Table: `dbo.HA_FacilitiesInstances`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RefId` | nvarchar(200) | NO |  | YES |
| 2 | `PoolMemberId` | int | NO |  |  |
| 3 | `CurrentStatus` | int | YES |  |  |
| 4 | `CurrentStatusTimestamp` | datetime2 | YES |  |  |
| 5 | `CurrentStatusRevision` | bigint | YES |  |  |
| 6 | `Config` | nvarchar(max) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
