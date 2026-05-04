# View: `dbo.ResponseTime`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `DateTime` | datetime | NO |  |  |
| 3 | `AvgResponseTime` | smallint | YES |  |  |
| 4 | `MinResponseTime` | smallint | YES |  |  |
| 5 | `MaxResponseTime` | smallint | YES |  |  |
| 6 | `PercentLoss` | smallint | YES |  |  |
| 7 | `Availability` | real | YES |  |  |
| 8 | `Archive` | tinyint | NO |  |  |
| 9 | `Weight` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Nodes`](dbo.Nodes.md) | VIEW |
| [`dbo.ResponseTime_Daily`](dbo.ResponseTime_Daily.md) | VIEW |
| [`dbo.ResponseTime_Detail`](dbo.ResponseTime_Detail.md) | VIEW |
| [`dbo.ResponseTime_Hourly`](dbo.ResponseTime_Hourly.md) | VIEW |

## Used by

| Object | Type |
|--------|------|
| [`dbo.DailyNodeAvailability`](dbo.DailyNodeAvailability.md) | VIEW |
| [`dbo.ResponseTimeByDays`](dbo.ResponseTimeByDays.md) | VIEW |
| `dbo.ResponseTimeByDaysFnc` | SQL_INLINE_TABLE_VALUED_FUNCTION |

## Definition

```sql
create view dbo.ResponseTime as
    select d.NodeID, d.DateTime,d.AvgResponseTime,d.MinResponseTime,d.MaxResponseTime,d.PercentLoss,d.Availability,d.Archive
		,CAST(n.PollInterval as float) as Weight
    from dbo.ResponseTime_Detail d WITH (NOLOCK)
    JOIN dbo.Nodes n WITH(NOLOCK) ON d.NodeID = n.NodeID
		
	union all
	
	select NodeID,DateTime,AvgResponseTime,MinResponseTime,MaxResponseTime,PercentLoss,Availability,Archive,3600 as Weight -- 1 hour in seconds
	from dbo.ResponseTime_Hourly WITH (NOLOCK)

	union all

	select NodeID,DateTime,AvgResponseTime,MinResponseTime,MaxResponseTime,PercentLoss,Availability,Archive,86400 as Weight -- 1 day in seconds
	from dbo.ResponseTime_Daily WITH (NOLOCK)
```
