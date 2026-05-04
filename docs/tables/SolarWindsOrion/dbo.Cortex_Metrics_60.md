# View: `dbo.Cortex_Metrics_60`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ElementId` | bigint | NO |  |  |
| 2 | `MetricId` | int | NO |  |  |
| 3 | `Time` | datetime2 | NO |  |  |
| 4 | `MinValue` | float | NO |  |  |
| 5 | `MaxValue` | float | NO |  |  |
| 6 | `AvgValue` | float | NO |  |  |
| 7 | `Count` | int | NO |  |  |
| 8 | `Weight` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Cortex_Metrics_NodeStatistics_60` | VIEW |
| `Cortex_Metrics_PcuStatistics_60` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[Cortex_Metrics_60] AS
	
		SELECT * FROM Cortex_Metrics_PcuStatistics_60 
		UNION ALL
		SELECT * FROM Cortex_Metrics_NodeStatistics_60
```
