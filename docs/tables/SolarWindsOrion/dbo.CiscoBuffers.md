# View: `dbo.CiscoBuffers`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `DateTime` | datetime | NO |  |  |
| 3 | `BufferNoMem` | int | YES |  |  |
| 4 | `BufferSmMiss` | int | YES |  |  |
| 5 | `BufferMdMiss` | int | YES |  |  |
| 6 | `BufferBgMiss` | int | YES |  |  |
| 7 | `BufferLgMiss` | int | YES |  |  |
| 8 | `BufferHgMiss` | int | YES |  |  |
| 9 | `Archive` | tinyint | NO |  |  |
| 10 | `Weight` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.CiscoBuffers_Daily`](dbo.CiscoBuffers_Daily.md) | VIEW |
| [`dbo.CiscoBuffers_Detail`](dbo.CiscoBuffers_Detail.md) | VIEW |
| [`dbo.CiscoBuffers_Hourly`](dbo.CiscoBuffers_Hourly.md) | VIEW |
| [`dbo.Nodes`](dbo.Nodes.md) | VIEW |

## Used by

| Object | Type |
|--------|------|
| [`dbo.CiscoBuffersByDays`](dbo.CiscoBuffersByDays.md) | VIEW |
| `dbo.CiscoBuffersByDaysFnc` | SQL_INLINE_TABLE_VALUED_FUNCTION |

## Definition

```sql
create view dbo.CiscoBuffers as
	select d.NodeID,d.DateTime,d.BufferNoMem,d.BufferSmMiss,d.BufferMdMiss,d.BufferBgMiss,d.BufferLgMiss,d.BufferHgMiss,d.Archive
		,CAST(n.StatCollection*60 as float) as Weight -- in minutes
	from dbo.CiscoBuffers_Detail d
    join dbo.Nodes n WITH(NOLOCK) on d.NodeID = n.NodeID
		
	union all
	
	select NodeID,DateTime,BufferNoMem,BufferSmMiss,BufferMdMiss,BufferBgMiss,BufferLgMiss,BufferHgMiss,Archive,3600 as Weight -- 1 hour in seconds
	from dbo.CiscoBuffers_Hourly

	union all

	select NodeID,DateTime,BufferNoMem,BufferSmMiss,BufferMdMiss,BufferBgMiss,BufferLgMiss,BufferHgMiss,Archive,86400 as Weight -- 1 day in seconds
	from dbo.CiscoBuffers_Daily
```
