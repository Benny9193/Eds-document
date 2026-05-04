# View: `dbo.VolumePerformance`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `VolumeID` | int | NO |  |  |
| 3 | `DateTime` | datetime | NO |  |  |
| 4 | `AvgDiskQueueLength` | float | NO |  |  |
| 5 | `MinDiskQueueLength` | float | NO |  |  |
| 6 | `MaxDiskQueueLength` | float | NO |  |  |
| 7 | `AvgDiskTransfer` | float | NO |  |  |
| 8 | `MinDiskTransfer` | float | NO |  |  |
| 9 | `MaxDiskTransfer` | float | NO |  |  |
| 10 | `AvgDiskReads` | float | NO |  |  |
| 11 | `MinDiskReads` | float | NO |  |  |
| 12 | `MaxDiskReads` | float | NO |  |  |
| 13 | `AvgDiskWrites` | float | NO |  |  |
| 14 | `MinDiskWrites` | float | NO |  |  |
| 15 | `MaxDiskWrites` | float | NO |  |  |
| 16 | `Weight` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.VolumePerformance_Daily`](dbo.VolumePerformance_Daily.md) | USER_TABLE |
| [`dbo.VolumePerformance_Detail`](dbo.VolumePerformance_Detail.md) | USER_TABLE |
| [`dbo.VolumePerformance_Hourly`](dbo.VolumePerformance_Hourly.md) | USER_TABLE |
| [`dbo.Volumes`](dbo.Volumes.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create view dbo.VolumePerformance as
	select d.[NodeID],d.[VolumeID],d.[DateTime],d.[DiskQueueLength] AS [AvgDiskQueueLength],d.[DiskQueueLength] AS [MinDiskQueueLength],d.[DiskQueueLength] AS [MaxDiskQueueLength],
	       d.[AvgDiskTransfer] AS [AvgDiskTransfer],d.[AvgDiskTransfer] AS [MinDiskTransfer],d.[AvgDiskTransfer] AS [MaxDiskTransfer],
		   d.[DiskReads] AS [AvgDiskReads],d.[DiskReads] AS [MinDiskReads],d.[DiskReads] AS [MaxDiskReads],
		   d.[DiskWrites] AS [AvgDiskWrites],d.[DiskWrites] AS [MinDiskWrites],d.[DiskWrites] AS [MaxDiskWrites]
		   ,CAST((v.StatCollection*60) as float) as Weight --in minutes
	from dbo.VolumePerformance_Detail d
	join dbo.Volumes v WITH(NOLOCK) on d.VolumeID = v.VolumeID
		
	union all
	
	select [NodeID],[VolumeID],[DateTime],[AvgDiskQueueLength],[MinDiskQueueLength],[MaxDiskQueueLength],[AvgDiskTransfer],[MinDiskTransfer],
           [MaxDiskTransfer],[AvgDiskReads],[MinDiskReads],[MaxDiskReads],[AvgDiskWrites],[MinDiskWrites],[MaxDiskWrites]
		   ,3600 as Weight -- 1 hour in seconds
	from dbo.VolumePerformance_Hourly

	union all

	select [NodeID],[VolumeID],[DateTime],[AvgDiskQueueLength],[MinDiskQueueLength],[MaxDiskQueueLength],[AvgDiskTransfer],[MinDiskTransfer],
           [MaxDiskTransfer],[AvgDiskReads],[MinDiskReads],[MaxDiskReads],[AvgDiskWrites],[MinDiskWrites],[MaxDiskWrites]
		   ,86400 as Weight -- 1 day in seconds
	from dbo.VolumePerformance_Daily
```
