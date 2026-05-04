# View: `dbo.Containers_ContainerAvailability`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `GroupID` | int | NO |  |  |
| 2 | `DateTime` | datetime | YES |  |  |
| 3 | `GroupAvailability` | int | NO |  |  |
| 4 | `GroupPercentAvailability` | int | NO |  |  |
| 5 | `GroupRecordCount` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Containers_ContainerStatus` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[Containers_ContainerAvailability]
AS
	SELECT
		cs.GroupID,
		DATEADD(hh, DATEDIFF(hh, GETUTCDATE(), GETDATE()), cs.DateTime) as [DateTime],
		cs.GroupAvailability,
		cs.GroupPercentAvailability,
		cs.GroupRecordCount
	FROM Containers_ContainerStatus cs
```
