# View: `dbo.Cortex_Metrics_NodeStatistics_0_LATEST`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ElementId` | bigint | NO |  |  |
| 2 | `MetricId` | int | NO |  |  |
| 3 | `Time` | datetime2 | NO |  |  |
| 4 | `Value` | float | NO |  |  |
| 5 | `Weight` | int | NO |  |  |
| 6 | `AvgValue` | float | NO |  |  |
| 7 | `MinValue` | float | NO |  |  |
| 8 | `MaxValue` | float | NO |  |  |
| 9 | `Count` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Cortex_Metrics_NodeStatistics_0_20201021` | unresolved |
| `Cortex_Metrics_NodeStatistics_0_20201022` | unresolved |

## Used by

| Object | Type |
|--------|------|
| [`dbo.Cortex_Metrics_0_latest`](dbo.Cortex_Metrics_0_latest.md) | VIEW |

## Definition

```sql
CREATE VIEW [dbo].[Cortex_Metrics_NodeStatistics_0_LATEST] AS
			
				SELECT *, Value AS AvgValue, Value AS MinValue, Value AS MaxValue, 1 AS Count FROM Cortex_Metrics_NodeStatistics_0_20201022 
				UNION ALL
				SELECT *, Value AS AvgValue, Value AS MinValue, Value AS MaxValue, 1 AS Count FROM Cortex_Metrics_NodeStatistics_0_20201021
```
