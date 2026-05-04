# View: `dbo.LoadAverage`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `TimeStampUTC` | datetime | NO |  |  |
| 3 | `LoadAverage1Min` | real | YES |  |  |
| 4 | `LoadAverage1Max` | real | YES |  |  |
| 5 | `LoadAverage1Avg` | real | YES |  |  |
| 6 | `LoadAverage5Min` | real | YES |  |  |
| 7 | `LoadAverage5Max` | real | YES |  |  |
| 8 | `LoadAverage5Avg` | real | YES |  |  |
| 9 | `LoadAverage15Min` | real | YES |  |  |
| 10 | `LoadAverage15Max` | real | YES |  |  |
| 11 | `LoadAverage15Avg` | real | YES |  |  |
| 12 | `Archive` | tinyint | NO |  |  |
| 13 | `Weight` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.LoadAverage_Daily`](dbo.LoadAverage_Daily.md) | VIEW |
| [`dbo.LoadAverage_Detail`](dbo.LoadAverage_Detail.md) | VIEW |
| [`dbo.LoadAverage_Hourly`](dbo.LoadAverage_Hourly.md) | VIEW |
| [`dbo.Nodes`](dbo.Nodes.md) | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create view dbo.LoadAverage as
	select
		d.NodeID,
		d.TimeStampUTC,
		d.LoadAverage1Min,
		d.LoadAverage1Max,
		d.LoadAverage1Avg,
		d.LoadAverage5Min,
		d.LoadAverage5Max,
		d.LoadAverage5Avg,
		d.LoadAverage15Min,
		d.LoadAverage15Max,
		d.LoadAverage15Avg,
		d.Archive
		,CAST(n.StatCollection*60 as float) as Weight --in minutes
	from dbo.LoadAverage_Detail d
    join dbo.Nodes n WITH(NOLOCK) on d.NodeID = n.NodeID
		
	union all
	
	select 
		NodeID,
		TimeStampUTC,
		LoadAverage1Min,
		LoadAverage1Max,
		LoadAverage1Avg,
		LoadAverage5Min,
		LoadAverage5Max,
		LoadAverage5Avg,
		LoadAverage15Min,
		LoadAverage15Max,
		LoadAverage15Avg,
		Archive,
		3600 as Weight -- 1 hour in seconds
	from dbo.LoadAverage_Hourly

	union all

	select 
		NodeID,
		TimeStampUTC,
		LoadAverage1Min,
		LoadAverage1Max,
		LoadAverage1Avg,
		LoadAverage5Min,
		LoadAverage5Max,
		LoadAverage5Avg,
		LoadAverage15Min,
		LoadAverage15Max,
		LoadAverage15Avg,
		Archive,
		86400 as Weight -- 1 day in seconds
	from dbo.LoadAverage_Daily
```
