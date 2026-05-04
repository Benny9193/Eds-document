# View: `dbo.CPUMultiLoad`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `TimeStampUTC` | datetime | NO |  |  |
| 3 | `CPUIndex` | smallint | NO |  |  |
| 4 | `MinLoad` | smallint | YES |  |  |
| 5 | `MaxLoad` | smallint | YES |  |  |
| 6 | `AvgLoad` | smallint | YES |  |  |
| 7 | `Weight` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.CPUMultiLoad_Daily`](dbo.CPUMultiLoad_Daily.md) | USER_TABLE |
| [`dbo.CPUMultiLoad_Detail`](dbo.CPUMultiLoad_Detail.md) | USER_TABLE |
| [`dbo.CPUMultiLoad_Hourly`](dbo.CPUMultiLoad_Hourly.md) | USER_TABLE |
| [`dbo.Nodes`](dbo.Nodes.md) | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create view dbo.CPUMultiLoad as
	select d.NodeID,d.TimeStampUTC,d.CPUIndex,d.MinLoad,d.MaxLoad,d.AvgLoad
		,CAST(n.StatCollection*60 as float) as Weight --in minutes
	from dbo.CPUMultiLoad_Detail d
    join dbo.Nodes n WITH(NOLOCK) on d.NodeID = n.NodeID
		
	union all
	
	select NodeID,TimeStampUTC,CPUIndex,MinLoad,MaxLoad,AvgLoad,3600 as Weight -- 1 hour in seconds
	from dbo.CPUMultiLoad_Hourly

	union all

	select NodeID,TimeStampUTC,CPUIndex,MinLoad,MaxLoad,AvgLoad,86400 as Weight -- 1 day in seconds
	from dbo.CPUMultiLoad_Daily
```
