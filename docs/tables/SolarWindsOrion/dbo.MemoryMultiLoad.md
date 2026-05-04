# View: `dbo.MemoryMultiLoad`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `TimeStampUTC` | datetime | NO |  |  |
| 3 | `Index` | int | NO |  |  |
| 4 | `TotalMemory` | real | YES |  |  |
| 5 | `MinMemoryUsed` | real | YES |  |  |
| 6 | `MaxMemoryUsed` | real | YES |  |  |
| 7 | `AvgMemoryUsed` | real | YES |  |  |
| 8 | `AvgPercentMemoryUsed` | real | YES |  |  |
| 9 | `Weight` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.MemoryMultiLoad_Daily`](dbo.MemoryMultiLoad_Daily.md) | USER_TABLE |
| [`dbo.MemoryMultiLoad_Detail`](dbo.MemoryMultiLoad_Detail.md) | USER_TABLE |
| [`dbo.MemoryMultiLoad_Hourly`](dbo.MemoryMultiLoad_Hourly.md) | USER_TABLE |
| [`dbo.Nodes`](dbo.Nodes.md) | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create view dbo.MemoryMultiLoad as
	select d.NodeID,d.TimeStampUTC,d.[Index],d.TotalMemory,d.MinMemoryUsed,d.MaxMemoryUsed,d.AvgMemoryUsed,d.AvgPercentMemoryUsed
		,CAST(n.StatCollection*60 as float) as Weight --in minutes
	from dbo.MemoryMultiLoad_Detail d
    join dbo.Nodes n WITH(NOLOCK) on d.NodeID = n.NodeID
		
	union all
	
	select NodeID,TimeStampUTC,[Index],TotalMemory,MinMemoryUsed,MaxMemoryUsed,AvgMemoryUsed,AvgPercentMemoryUsed,3600 as Weight -- 1 hour in seconds
	from dbo.MemoryMultiLoad_Hourly

	union all

	select NodeID,TimeStampUTC,[Index],TotalMemory,MinMemoryUsed,MaxMemoryUsed,AvgMemoryUsed,AvgPercentMemoryUsed,86400 as Weight -- 1 day in seconds
	from dbo.MemoryMultiLoad_Daily
```
