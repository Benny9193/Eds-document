# View: `dbo.HA_PoolMembersView`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PoolMemberId` | int | NO |  |  |
| 2 | `PoolMemberType` | nvarchar(100) | NO |  |  |
| 3 | `PoolId` | int | YES |  |  |
| 4 | `HostName` | nvarchar(50) | NO |  |  |
| 5 | `ElectionPriority` | int | NO |  |  |
| 6 | `Priority` | int | NO |  |  |
| 7 | `PreferredStatus` | int | YES |  |  |
| 8 | `PreferredStatusTimestamp` | datetime2 | NO |  |  |
| 9 | `PreferredStatusRevision` | bigint | YES |  |  |
| 10 | `Status` | int | YES |  |  |
| 11 | `StatusMessage` | nvarchar(max) | YES |  |  |
| 12 | `ReasonOfFail` | int | YES |  |  |
| 13 | `ReasonOfFailRevision` | bigint | YES |  |  |
| 14 | `LastHeartBeatTimestamp` | datetime2 | YES |  |  |
| 15 | `HeartBeat` | bigint | YES |  |  |
| 16 | `PoolJoinTimestamp` | datetime2 | YES |  |  |
| 17 | `PoolIdRevision` | bigint | YES |  |  |
| 18 | `StatusTimestampNotUpdatedInterval` | int | YES |  |  |
| 19 | `PrimaryIpAddress` | nvarchar(255) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `HA_PoolMemberInterfacesInfo` | USER_TABLE |
| [`dbo.HA_PoolMembers`](dbo.HA_PoolMembers.md) | USER_TABLE |
| [`dbo.HA_Pools`](dbo.HA_Pools.md) | USER_TABLE |
| [`dbo.Settings`](dbo.Settings.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.HA_PoolsView`](dbo.HA_PoolsView.md) | VIEW |

## Definition

```sql
CREATE VIEW [dbo].[HA_PoolMembersView] AS

WITH Members AS (
SELECT *,
	   DATEDIFF(second, pm.LastHeartBeatTimestamp, SYSUTCDATETIME()) AS [StatusTimestampNotUpdatedInterval] -- seconds are used because are much safer than ms where is a max diff 24 days
  FROM [dbo].[HA_PoolMembers] pm WITH(NOLOCK)
),
 InterfacesInfoPrimaryIpAddress AS (
 SELECT [PoolMemberId], MIN([IPAddress]) AS [PrimaryIpAddress] FROM HA_PoolMemberInterfacesInfo WHERE InterfaceType=1 GROUP BY [PoolMemberId]
)
SELECT m.[PoolMemberId],
	   m.[PoolMemberType],
	   m.[PoolId],	   
	   m.[HostName],		
	   m.[ElectionPriority],
	   m.[Priority],	   
	   m.[PreferredStatus],
	   m.[PreferredStatusTimestamp],
	   m.[PreferredStatusRevision],
	   CASE 
		   -- report as unknown state when timestamp was not updated longer than IntervalMemberDown
	       WHEN m.[Status] != 2 
				AND [StatusTimestampNotUpdatedInterval] > ISNULL (
					(SELECT TOP 1 p.IntervalMemberDown FROM [dbo].[HA_Pools] p WHERE p.PoolId = m.PoolId), 
					(SELECT CAST(CurrentValue AS INT) FROM [dbo].[Settings] s WHERE s.SettingID = 'HA-DefaultPoolIntervalMemberDown')
				) 
		   THEN 2
		   ELSE m.[Status]
	   END AS [Status],
	   m.[StatusMessage],	   
	   m.[ReasonOfFail],	   
	   m.[ReasonOfFailRevision],	   
	   m.[LastHeartBeatTimestamp],
	   m.[HeartBeat],
	   m.[PoolJoinTimestamp],
	   m.[PoolIdRevision],
	   m.[StatusTimestampNotUpdatedInterval],
	   pia.[PrimaryIpAddress]
  FROM Members m WITH(NOLOCK)
  LEFT JOIN InterfacesInfoPrimaryIpAddress AS pia WITH(NOLOCK) ON m.PoolMemberId=pia.PoolMemberId
```
