# View: `dbo.HA_PoolsView`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PoolId` | int | NO |  |  |
| 2 | `PoolMasterMemberId` | int | YES |  |  |
| 3 | `PoolType` | nvarchar(100) | NO |  |  |
| 4 | `DisplayName` | nvarchar(400) | NO |  |  |
| 5 | `Enabled` | bit | YES |  |  |
| 6 | `CurrentStatus` | int | YES |  |  |
| 7 | `CurrentStatusTimestamp` | datetime2 | YES |  |  |
| 8 | `PoolMasterChangeTimestamp` | datetime2 | YES |  |  |
| 9 | `IntervalMemberDown` | int | NO |  |  |
| 10 | `IntervalPoolTask` | int | NO |  |  |
| 11 | `IntervalSuicideRule` | int | NO |  |  |
| 12 | `FailBackEnabled` | bit | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.HA_PoolMembersView`](dbo.HA_PoolMembersView.md) | VIEW |
| [`dbo.HA_Pools`](dbo.HA_Pools.md) | USER_TABLE |
| [`dbo.Settings`](dbo.Settings.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[HA_PoolsView] AS

WITH Pools AS (
SELECT *,
	   CASE 
		   -- check whether all members in pool are in unknown (0) status
		   WHEN (SELECT count(*)*2 FROM [dbo].[HA_PoolMembersView] pm1 where pm1.Status = 2 AND pm1.PoolId = p.PoolId) = (SELECT sum(pm1.Status) FROM [dbo].[HA_PoolMembersView] pm1 where pm1.PoolId = p.PoolId) THEN 1
	       ELSE 0
	   END AS [AllMembersUnknown],
	   CAST(ISNULL ((SELECT CurrentValue FROM dbo.Settings s WHERE s.SettingID = 'HA-EnableHighAvailability'), 1) AS BIT) AS [IsGloballyEnabled]
  FROM [dbo].[HA_Pools] p
  
)
SELECT [PoolId],
	   [PoolMasterMemberId],
	   [PoolType],
	   [DisplayName],		
	   CAST(CASE 
	       WHEN [IsGloballyEnabled] = 0 THEN 0 
		   ELSE [Enabled] 
	   END AS BIT) [Enabled],
	   CASE
		   WHEN [IsGloballyEnabled] = 0 OR [Enabled] = 0 THEN 4
		   ELSE 
			   CASE 
				   WHEN AllMembersUnknown = 1 THEN 0
				   ELSE [CurrentStatus]
			   END
	   END [CurrentStatus],
	   [CurrentStatusTimestamp],
	   [PoolMasterChangeTimestamp],
	   [IntervalMemberDown],
	   [IntervalPoolTask],
	   [IntervalSuicideRule],
	   [FailBackEnabled]
  FROM Pools p
```
