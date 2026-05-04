# View: `dbo.NodesPercentMemoryUsedThreshold`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `EntityType` | nvarchar(150) | NO |  |  |
| 2 | `InstanceId` | int | NO |  |  |
| 3 | `Name` | nvarchar(150) | NO |  |  |
| 4 | `ThresholdType` | int | NO |  |  |
| 5 | `ThresholdOperator` | int | NO |  |  |
| 6 | `CurrentValue` | real | YES |  |  |
| 7 | `Level1Value` | float | YES |  |  |
| 8 | `Level1Formula` | nvarchar(max) | YES |  |  |
| 9 | `IsLevel1State` | int | YES |  |  |
| 10 | `Level2Value` | float | YES |  |  |
| 11 | `Level2Formula` | nvarchar(max) | YES |  |  |
| 12 | `IsLevel2State` | int | YES |  |  |
| 13 | `GlobalWarningValue` | real | YES |  |  |
| 14 | `GlobalCriticalValue` | real | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.NodesThresholds`](dbo.NodesThresholds.md) | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[NodesPercentMemoryUsedThreshold]
AS
  SELECT EntityType
		,InstanceId
		,Name
		,ThresholdType
		,ThresholdOperator
		,CurrentValue
		,Level1Value
		,Level1Formula
		,IsLevel1State
		,Level2Value
		,Level2Formula
		,IsLevel2State
		,GlobalWarningValue
		,GlobalCriticalValue
  FROM  dbo.NodesThresholds
  WHERE Name = 'Nodes.Stats.PercentMemoryUsed'
```
