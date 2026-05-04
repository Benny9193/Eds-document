# View: `dbo.ResponseTimeByDays`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `DateTime` | datetime | YES |  |  |
| 3 | `AvgResponseTime` | int | YES |  |  |
| 4 | `MinResponseTime` | smallint | YES |  |  |
| 5 | `MaxResponseTime` | smallint | YES |  |  |
| 6 | `PercentLoss` | int | YES |  |  |
| 7 | `Availability` | float | YES |  |  |
| 8 | `Archive` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `dbo.DateOnly` | SQL_SCALAR_FUNCTION |
| [`dbo.ResponseTime`](dbo.ResponseTime.md) | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.ResponseTimeByDays AS
	SELECT	NodeID, dbo.DateOnly(DateTime) AS DateTime, 
			AVG(AvgResponseTime) AS AvgResponseTime, 
			MIN(MinResponseTime) AS MinResponseTime, 
			MAX(MaxResponseTime) AS MaxResponseTime, 
			AVG(PercentLoss) AS PercentLoss, 
			AVG(Availability) AS Availability, 
			2 AS Archive
	FROM dbo.ResponseTime
	GROUP BY NodeID, dbo.DateOnly(DateTime)
```
