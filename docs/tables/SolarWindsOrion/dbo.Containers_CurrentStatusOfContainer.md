# View: `dbo.Containers_CurrentStatusOfContainer`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `GroupID` | int | NO |  |  |
| 2 | `GroupAvailability` | nvarchar(max) | YES |  |  |
| 3 | `GroupPercentAvailability` | int | NO |  |  |
| 4 | `GroupName` | nvarchar(1024) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Containers` | USER_TABLE |
| `StatusInfo` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.Containers_CurrentStatusOfContainer AS
	
	SELECT 
		c.ContainerID AS GroupID,
		si.ShortDescription AS GroupAvailability,
		CASE 
			WHEN c.Status IN (SELECT si.StatusId FROM StatusInfo si WHERE si.StatusName IN ('Up', 'Warning', 'Critical')) THEN 100
			ELSE 0
		END	AS GroupPercentAvailability,
		c.Name AS [GroupName]
	FROM Containers c
	INNER JOIN StatusInfo si ON c.Status = si.[StatusId]
    WHERE c.Owner = 'Core'
```
