# Table: `dbo.HA_PoolMembers`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PoolMemberId` | int | NO |  | YES |
| 2 | `PoolMemberType` | nvarchar(100) | NO |  |  |
| 3 | `PoolId` | int | YES |  |  |
| 4 | `HostName` | nvarchar(50) | NO |  |  |
| 5 | `ElectionPriority` | int | NO |  |  |
| 6 | `PreferredStatus` | int | YES |  |  |
| 7 | `PreferredStatusTimestamp` | datetime2 | NO |  |  |
| 8 | `PreferredStatusRevision` | bigint | YES |  |  |
| 9 | `Status` | int | YES |  |  |
| 10 | `LastHeartBeatTimestamp` | datetime2 | YES |  |  |
| 11 | `HeartBeat` | bigint | YES |  |  |
| 12 | `PoolJoinTimestamp` | datetime2 | YES |  |  |
| 13 | `PoolIdRevision` | bigint | YES |  |  |
| 14 | `Priority` | int | NO | `((1))` |  |
| 15 | `ReasonOfFail` | int | YES |  |  |
| 16 | `ReasonOfFailRevision` | bigint | YES |  |  |
| 17 | `StatusMessage` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_HA_PoolMembers_PoolId` | no | NONCLUSTERED | `PoolId` |  |
