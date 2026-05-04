# View: `dbo.Containers_DailyContainerAvailability`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `GroupID` | int | NO |  |  |
| 2 | `DateTime` | datetime | YES |  |  |
| 3 | `GroupPercentAvailability` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Containers_ContainerStatus` | VIEW |
| `dbo.DateAndHourOnly` | SQL_SCALAR_FUNCTION |
| `dbo.DateOnly` | SQL_SCALAR_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.Containers_DailyContainerAvailability AS
	
	SELECT	
		t1.GroupID,
		DATEADD(hh, DATEDIFF(hh, GETUTCDATE(), GETDATE()), t1.[TimeStamp]) AS [DateTime],
		ROUND(AVG(t1.GroupPercentAvailability), 2) AS GroupPercentAvailability
	FROM (
		SELECT 
			t.GroupID,
			dbo.DateOnly(t.[TimeStamp]) AS [TimeStamp],
			AVG(t.GroupPercentAvailability) AS GroupPercentAvailability
		FROM (
			-- retain from detail to Hourly
			SELECT 
				cs.GroupID,
				dbo.DateAndHourOnly(cs.[DateTime]) AS [TimeStamp],
				AVG(cs.GroupPercentAvailability) AS GroupPercentAvailability
			FROM Containers_ContainerStatus AS cs
			GROUP BY cs.GroupID, dbo.DateAndHourOnly(cs.[DateTime])
				
			UNION
			
			--Hourly
			SELECT cs.GroupID, cs.[DateTime] AS [TimeStamp], cs.GroupPercentAvailability
			FROM Containers_ContainerStatus AS cs
		) t 
		GROUP BY t.GroupID, dbo.DateOnly(t.[TimeStamp])
		
		UNION 
			
		-- Daily 
		SELECT cs.GroupID, cs.[DateTime] AS [DateTime], cs.GroupPercentAvailability
		FROM Containers_ContainerStatus cs
	) t1
	GROUP BY t1.GroupID, DATEADD(hh, DATEDIFF(hh, GETUTCDATE(), GETDATE()), t1.[TimeStamp])
```
