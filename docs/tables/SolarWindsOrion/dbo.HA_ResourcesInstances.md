# Table: `dbo.HA_ResourcesInstances`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PoolId` | int | YES |  |  |
| 2 | `RefId` | nvarchar(200) | NO |  | YES |
| 3 | `PoolMemberId` | int | YES |  |  |
| 4 | `PoolMemberIdRevision` | bigint | YES |  |  |
| 5 | `CurrentStatus` | int | YES |  |  |
| 6 | `CurrentStatusTimestamp` | datetime2 | YES |  |  |
| 7 | `CurrentStatusRevision` | bigint | YES |  |  |
| 8 | `PreferredStatus` | int | NO |  |  |
| 9 | `PreferredStatusRevision` | bigint | YES |  |  |
| 10 | `PreferredStatusTimestamp` | datetime2 | YES |  |  |
| 11 | `Config` | nvarchar(max) | NO |  |  |
| 12 | `ActionExecutionParameters` | nvarchar(max) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
