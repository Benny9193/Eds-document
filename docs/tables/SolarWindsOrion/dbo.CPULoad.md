# View: `dbo.CPULoad`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `DateTime` | datetime | NO |  |  |
| 3 | `MinLoad` | smallint | YES |  |  |
| 4 | `MaxLoad` | smallint | YES |  |  |
| 5 | `AvgLoad` | smallint | YES |  |  |
| 6 | `TotalMemory` | real | YES |  |  |
| 7 | `MinMemoryUsed` | real | YES |  |  |
| 8 | `MaxMemoryUsed` | real | YES |  |  |
| 9 | `AvgMemoryUsed` | real | YES |  |  |
| 10 | `AvgPercentMemoryUsed` | real | YES |  |  |
| 11 | `Archive` | tinyint | NO |  |  |
| 12 | `Weight` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.CPULoad_Daily`](dbo.CPULoad_Daily.md) | VIEW |
| [`dbo.CPULoad_Detail`](dbo.CPULoad_Detail.md) | VIEW |
| [`dbo.CPULoad_Hourly`](dbo.CPULoad_Hourly.md) | VIEW |
| [`dbo.Nodes`](dbo.Nodes.md) | VIEW |

## Used by

| Object | Type |
|--------|------|
| [`dbo.CPULoadByDays`](dbo.CPULoadByDays.md) | VIEW |
| `dbo.CPULoadByDaysFnc` | SQL_INLINE_TABLE_VALUED_FUNCTION |

## Definition

```sql
create view dbo.CPULoad as
	select d.NodeID,d.DateTime,d.MinLoad,d.MaxLoad,d.AvgLoad,d.TotalMemory,d.MinMemoryUsed,d.MaxMemoryUsed,d.AvgMemoryUsed,d.AvgPercentMemoryUsed,d.Archive
		,CAST(n.StatCollection*60 as float) as Weight --in minutes
	from dbo.CPULoad_Detail d
    join dbo.Nodes n WITH(NOLOCK) on d.NodeID = n.NodeID
		
	union all
	
	select NodeID,DateTime,MinLoad,MaxLoad,AvgLoad,TotalMemory,MinMemoryUsed,MaxMemoryUsed,AvgMemoryUsed,AvgPercentMemoryUsed,Archive,3600 as Weight -- 1 hour in seconds
	from dbo.CPULoad_Hourly

	union all

	select NodeID,DateTime,MinLoad,MaxLoad,AvgLoad,TotalMemory,MinMemoryUsed,MaxMemoryUsed,AvgMemoryUsed,AvgPercentMemoryUsed,Archive,86400 as Weight -- 1 day in seconds
	from dbo.CPULoad_Daily
```
