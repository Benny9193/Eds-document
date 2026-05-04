# View: `dbo.AlertDefinitionsView`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AlertDefID` | uniqueidentifier | NO |  |  |
| 2 | `AlertName` | nvarchar(1024) | NO |  |  |
| 3 | `AlertDescription` | nvarchar(max) | YES |  |  |
| 4 | `Enabled` | bit | NO |  |  |
| 5 | `StartTime` | datetime | YES |  |  |
| 6 | `EndTime` | datetime | YES |  |  |
| 7 | `DOW` | nvarchar(16) | NO |  |  |
| 8 | `TriggerQuery` | nvarchar(max) | NO |  |  |
| 9 | `TriggerQueryDesign` | nvarchar(max) | NO |  |  |
| 10 | `ResetQuery` | nvarchar(max) | NO |  |  |
| 11 | `ResetQueryDesign` | nvarchar(max) | NO |  |  |
| 12 | `SuppressionQuery` | nvarchar(max) | NO |  |  |
| 13 | `SuppressionQueryDesign` | nvarchar(max) | NO |  |  |
| 14 | `TriggerSustained` | bigint | NO |  |  |
| 15 | `ResetSustained` | bigint | NO |  |  |
| 16 | `LastExecuteTime` | datetime | YES |  |  |
| 17 | `ExecuteInterval` | bigint | NO |  |  |
| 18 | `BlockUntil` | datetime | NO |  |  |
| 19 | `ResponseTime` | bigint | NO |  |  |
| 20 | `LastErrorTime` | datetime | YES |  |  |
| 21 | `LastError` | nvarchar(max) | YES |  |  |
| 22 | `ObjectType` | nvarchar(50) | NO |  |  |
| 23 | `IgnoreTimeout` | int | NO |  |  |
| 24 | `NotifyEnabled` | bit | NO |  |  |
| 25 | `NotificationSettings` | nvarchar(max) | YES |  |  |
| 26 | `Reverted` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.AlertConfigurations`](dbo.AlertConfigurations.md) | USER_TABLE |
| [`dbo.AlertDefinitions`](dbo.AlertDefinitions.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[AlertDefinitionsView]
AS
SELECT [AlertDefID], [AlertName], [AlertDescription], [Enabled], [StartTime], [EndTime], [DOW], [TriggerQuery], [TriggerQueryDesign], [ResetQuery],
[ResetQueryDesign], [SuppressionQuery], [SuppressionQueryDesign], [TriggerSustained], [ResetSustained], [LastExecuteTime], [ExecuteInterval], [BlockUntil], [ResponseTime], [LastErrorTime], [LastError],
[ObjectType], [IgnoreTimeout], [NotifyEnabled], [NotificationSettings], [Reverted]
FROM [dbo].[AlertDefinitions]
UNION
SELECT [AlertRefID] AS [AlertDefID], [Name] AS [AlertName], [Description] AS [AlertDescription], [Enabled] AS [Enabled], CAST('18991230 00:00:00.000' AS datetime) AS [StartTime],
CAST('18991230 00:00:00.000' AS datetime) AS [EndTime], '1,2,3,4,5,6,7' AS [DOW], '' AS [TriggerQuery], '' AS [TriggerQueryDesign], '' AS [ResetQuery], '' AS [ResetQueryDesign], 
'' AS [SuppressionQuery], '' AS [SuppressionQueryDesign] , 0 AS [TriggerSustained], 0 AS [ResetSustained], CAST('19000101 00:00:00.000' AS datetime) AS [LastExecuteTime], [Frequency] AS [ExecuteInterval],  [BlockUntil] AS [BlockUntil], 
0 AS [ResponseTime], NULL AS [LastErrorTime], '' AS [LastError], [ObjectType] AS [ObjectType], 0 AS [IgnoreTimeout], [NotifyEnabled] AS [NotifyEnabled],
[NotificationSettings] AS [NotificationSettings], 0 [Reverted]
FROM [dbo].[AlertConfigurations]
WHERE [AlertRefID] NOT IN (SELECT [AlertDefID] FROM [dbo].[AlertDefinitions])
```
