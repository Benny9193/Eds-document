# Table: `dbo.HA_Pools`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PoolId` | int | NO |  | YES |
| 2 | `PoolMasterMemberId` | int | YES |  |  |
| 3 | `PoolType` | nvarchar(100) | NO |  |  |
| 4 | `DisplayName` | nvarchar(400) | NO |  |  |
| 5 | `Enabled` | bit | NO |  |  |
| 6 | `CurrentStatus` | int | YES |  |  |
| 7 | `CurrentStatusTimestamp` | datetime2 | YES |  |  |
| 8 | `PoolMasterChangeTimestamp` | datetime2 | YES |  |  |
| 9 | `IntervalMemberDown` | int | NO |  |  |
| 10 | `IntervalPoolTask` | int | NO |  |  |
| 11 | `IntervalSuicideRule` | int | NO |  |  |
| 12 | `FailBackEnabled` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
