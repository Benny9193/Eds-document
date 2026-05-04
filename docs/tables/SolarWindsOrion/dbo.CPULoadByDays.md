# View: `dbo.CPULoadByDays`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `DateTime` | datetime | YES |  |  |
| 3 | `MinLoad` | smallint | YES |  |  |
| 4 | `MaxLoad` | smallint | YES |  |  |
| 5 | `AvgLoad` | int | YES |  |  |
| 6 | `TotalMemory` | real | YES |  |  |
| 7 | `MinMemoryUsed` | real | YES |  |  |
| 8 | `MaxMemoryUsed` | real | YES |  |  |
| 9 | `AvgMemoryUsed` | float | YES |  |  |
| 10 | `AvgPercentMemoryUsed` | float | YES |  |  |
| 11 | `Archive` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.CPULoad`](dbo.CPULoad.md) | VIEW |
| `dbo.DateOnly` | SQL_SCALAR_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.CPULoadByDays AS
	SELECT	NodeID, dbo.DateOnly(DateTime) AS DateTime, 
			MIN(MinLoad) AS MinLoad, 
			MAX(MaxLoad) AS MaxLoad, 
			AVG(AvgLoad) AS AvgLoad, 
			MAX(TotalMemory) AS TotalMemory, 
			MIN(MinMemoryUsed) AS MinMemoryUsed, 
			MAX(MaxMemoryUsed) AS MaxMemoryUsed, 
			AVG(AvgMemoryUsed) AS AvgMemoryUsed, 
			AVG(AvgPercentMemoryUsed) AS AvgPercentMemoryUsed, 
			2 AS Archive
	FROM dbo.CPULoad
	GROUP BY NodeID, dbo.DateOnly(DateTime)
```
