# View: `dbo.Containers_ContainerStatus`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `GroupID` | int | NO |  |  |
| 2 | `DateTime` | datetime | NO |  |  |
| 3 | `GroupAvailability` | int | NO |  |  |
| 4 | `GroupPercentAvailability` | int | NO |  |  |
| 5 | `PercentMembersAvailability` | int | YES |  |  |
| 6 | `GroupRecordCount` | int | NO |  |  |
| 7 | `Weight` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Containers`](dbo.Containers.md) | USER_TABLE |
| [`dbo.ContainerStatus_Daily`](dbo.ContainerStatus_Daily.md) | USER_TABLE |
| [`dbo.ContainerStatus_DailyData`](dbo.ContainerStatus_DailyData.md) | USER_TABLE |
| [`dbo.ContainerStatus_Detail`](dbo.ContainerStatus_Detail.md) | USER_TABLE |
| [`dbo.ContainerStatus_Hourly`](dbo.ContainerStatus_Hourly.md) | USER_TABLE |
| [`dbo.ContainerStatus_HourlyData`](dbo.ContainerStatus_HourlyData.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.Containers_ContainerAvailability`](dbo.Containers_ContainerAvailability.md) | VIEW |
| [`dbo.Containers_DailyContainerAvailability`](dbo.Containers_DailyContainerAvailability.md) | VIEW |
| [`dbo.Containers_HistoricalContainerStatus`](dbo.Containers_HistoricalContainerStatus.md) | VIEW |

## Definition

```sql
CREATE VIEW [dbo].[Containers_ContainerStatus] AS
	
	SELECT 
		csd.ContainerID AS GroupID, 
		csd.[DateTime], 
		csd.[Status] AS GroupAvailability, 
		csd.PercentAvailability AS GroupPercentAvailability, 
		csd.PercentMembersAvailability,
		1 AS GroupRecordCount,
		CAST((c.Frequency) as float) as Weight -- in seconds
	FROM dbo.ContainerStatus_Detail csd
	JOIN dbo.Containers c WITH(NOLOCK) ON c.ContainerID = csd.ContainerID
		
	UNION ALL
	
	SELECT 
		csh.ContainerID AS GroupID, 
		csh.[DateTime], 
		cshd.[Status] AS GroupAvailability, 
		csh.PercentAvailability AS GroupPercentAvailability, 
		csh.PercentMembersAvailability,
		cshd.[Count] AS GroupRecordCount,
		CAST(3600 as float) as Weight -- 1 hour in seconds
	FROM dbo.ContainerStatus_Hourly csh
	INNER JOIN dbo.ContainerStatus_HourlyData cshd ON csh.ContainerStatusID = cshd.[ContainerStatusID]
	
	UNION ALL

	SELECT 
		csd.ContainerID AS GroupID, 
		csd.[DateTime], 
		csdd.[Status] AS GroupAvailability, 
		csd.PercentAvailability AS GroupPercentAvailability, 
		csd.PercentMembersAvailability,
		csdd.[Count] AS GroupRecordCount,
		CAST(86400 as float) as Weight -- 1 day in seconds
	FROM dbo.ContainerStatus_Daily csd
	INNER JOIN dbo.ContainerStatus_DailyData csdd ON csd.ContainerStatusID = csdd.[ContainerStatusID]
```
