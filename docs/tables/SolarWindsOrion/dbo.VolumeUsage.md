# View: `dbo.VolumeUsage`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `VolumeID` | int | NO |  |  |
| 3 | `DateTime` | datetime | NO |  |  |
| 4 | `DiskSize` | float | NO |  |  |
| 5 | `AvgDiskUsed` | float | NO |  |  |
| 6 | `MinDiskUsed` | float | NO |  |  |
| 7 | `MaxDiskUsed` | float | NO |  |  |
| 8 | `PercentDiskUsed` | real | NO |  |  |
| 9 | `AllocationFailures` | real | NO |  |  |
| 10 | `Archive` | tinyint | NO |  |  |
| 11 | `Weight` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Volumes`](dbo.Volumes.md) | USER_TABLE |
| [`dbo.VolumeUsage_Daily`](dbo.VolumeUsage_Daily.md) | VIEW |
| [`dbo.VolumeUsage_Detail`](dbo.VolumeUsage_Detail.md) | VIEW |
| [`dbo.VolumeUsage_Hourly`](dbo.VolumeUsage_Hourly.md) | VIEW |

## Used by

| Object | Type |
|--------|------|
| [`dbo.VolumeUsageByDays`](dbo.VolumeUsageByDays.md) | VIEW |
| `dbo.VolumeUsageByDaysFnc` | SQL_INLINE_TABLE_VALUED_FUNCTION |

## Definition

```sql
create view dbo.VolumeUsage as
	select d.NodeID,d.VolumeID,d.DateTime,d.DiskSize,d.AvgDiskUsed,d.MinDiskUsed,d.MaxDiskUsed,d.PercentDiskUsed,d.AllocationFailures,d.Archive
		   ,CAST((v.StatCollection*60) as float) as Weight --in minutes
	from dbo.VolumeUsage_Detail d
    join dbo.Volumes v WITH(NOLOCK) on d.VolumeID = v.VolumeID
		
	union all
	
	select NodeID,VolumeID,DateTime,DiskSize,AvgDiskUsed,MinDiskUsed,MaxDiskUsed,PercentDiskUsed,AllocationFailures,Archive,3600 as Weight -- 1 hour in seconds
	from dbo.VolumeUsage_Hourly

	union all

	select NodeID,VolumeID,DateTime,DiskSize,AvgDiskUsed,MinDiskUsed,MaxDiskUsed,PercentDiskUsed,AllocationFailures,Archive,86400 as Weight -- 1 day in seconds
	from dbo.VolumeUsage_Daily
```
