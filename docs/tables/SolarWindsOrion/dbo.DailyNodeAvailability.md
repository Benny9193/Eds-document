# View: `dbo.DailyNodeAvailability`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `DateTime` | datetime | YES |  |  |
| 3 | `Availability` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `ResponseTime` | VIEW |

## Used by

| Object | Type |
|--------|------|
| [`dbo.VoipNodesAvailabilityReport`](dbo.VoipNodesAvailabilityReport.md) | VIEW |

## Definition

```sql
CREATE VIEW dbo.DailyNodeAvailability
AS
SELECT NodeID, DateTime, AVG(Availability) AS Availability
FROM (
	SELECT NodeID, FLOOR(DateTime / 24) AS DateTime, AVG(Availability) AS Availability
	FROM (
		SELECT NodeID, FLOOR(CAST(DateTime AS float) * 24) AS DateTime, AVG(Availability) AS Availability
		FROM   ResponseTime
		WHERE  (Archive = 0)
		GROUP BY NodeID, FLOOR(CAST(DateTime AS float) * 24)
		UNION
		SELECT NodeID, CAST(DateTime AS float) * 24 AS DateTime, Availability
		FROM  ResponseTime
		WHERE Archive = 1
		) AS T1
	GROUP BY NodeID, FLOOR(DateTime / 24)
	UNION
	SELECT NodeID, DateTime, Availability
	FROM   ResponseTime
	WHERE  Archive = 2
	) AS T2
GROUP BY NodeID, DateTime
```
