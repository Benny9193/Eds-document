# View: `dbo.AlertStatusView`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AlertDefID` | uniqueidentifier | NO |  |  |
| 2 | `ActiveObject` | nvarchar(150) | YES |  |  |
| 3 | `ObjectType` | nvarchar(50) | NO |  |  |
| 4 | `State` | int | NO |  |  |
| 5 | `WorkingState` | int | NO |  |  |
| 6 | `ObjectName` | nvarchar(1024) | YES |  |  |
| 7 | `AlertMessage` | nvarchar(max) | YES |  |  |
| 8 | `TriggerTimeStamp` | datetime | YES |  |  |
| 9 | `TriggerTimeOffset` | int | YES |  |  |
| 10 | `TriggerCount` | bigint | YES |  |  |
| 11 | `ResetTimeStamp` | datetime | YES |  |  |
| 12 | `Acknowledged` | tinyint | NO |  |  |
| 13 | `AcknowledgedBy` | nvarchar(100) | NO |  |  |
| 14 | `AcknowledgedTime` | datetime | NO |  |  |
| 15 | `LastUpdate` | datetime | YES |  |  |
| 16 | `AlertNotes` | nvarchar(max) | NO |  |  |
| 17 | `Notes` | nvarchar(max) | YES |  |  |
| 18 | `AlertObjectID` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `AlertHistory` | USER_TABLE |
| [`dbo.AlertActive`](dbo.AlertActive.md) | USER_TABLE |
| [`dbo.AlertConfigurations`](dbo.AlertConfigurations.md) | USER_TABLE |
| [`dbo.AlertObjects`](dbo.AlertObjects.md) | USER_TABLE |
| [`dbo.AlertStatus`](dbo.AlertStatus.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[AlertStatusView] AS
SELECT AC.[AlertRefID] AS AlertDefID,
CAST(CASE WHEN (AO.EntityNetObjectId IS NOT NULL 
						AND (AO.EntityNetObjectId LIKE '%:%:%' OR ISNUMERIC(SUBSTRING(AO.EntityNetObjectId,CHARINDEX(':',AO.EntityNetObjectId)+1,LEN(AO.EntityNetObjectId))) = 0) ) 
						THEN CAST(AO.AlertObjectID as nvarchar)
						ELSE SUBSTRING(AO.EntityNetObjectId,CHARINDEX(':',AO.EntityNetObjectId)+1,LEN(AO.EntityNetObjectId))
             END AS nvarchar) as ActiveObject,
AC.[ObjectType],
2 AS [State], 0 AS WorkingState,
AO.EntityCaption AS ObjectName, AA.[TriggeredMessage] AS AlertMessage, AO.[LastTriggeredDateTime] AS TriggerTimeStamp, DATEDIFF(SECOND, AO.[LastTriggeredDateTime], GETUTCDATE()) AS TriggerTimeOffset, AO.[TriggeredCount] AS TriggerCount,
CAST('18991230 00:00:00.000' AS datetime) AS ResetTimeStamp, 
IsNull(AA.[Acknowledged], 0) AS Acknowledged, IsNull(AA.[AcknowledgedBy], '') AS AcknowledgedBy, IsNull(AA.[AcknowledgedDateTime], CAST('18991230 00:00:00.000' AS datetime)) AS AcknowledgedTime, 

(SELECT MAX([TimeStamp]) FROM AlertHistory AS AH WITH(nolock) WHERE AH.[AlertActiveID]=AA.[AlertActiveID]) AS LastUpdate,
'' AS AlertNotes, AO.[AlertNote] AS Notes,
AO.AlertObjectID

FROM [dbo].[AlertActive] AS AA
INNER JOIN [dbo].[AlertObjects] AS AO ON AO.AlertObjectID=AA.AlertObjectID
AND AO.EntityNetObjectId IS NOT NULL
INNER JOIN [dbo].[AlertConfigurations] AS AC ON AC.AlertID = AO.AlertID

UNION ALL
SELECT ALS.[AlertDefID], ALS.[ActiveObject], ALS.[ObjectType], ALS.[State], ALS.[WorkingState], ALS.[ObjectName], ALS.[AlertMessage], ALS.[TriggerTimeStamp], ALS.[TriggerTimeOffset],
ALS.[TriggerCount], ALS.[ResetTimeStamp], ALS.[Acknowledged], ALS.[AcknowledgedBy], ALS.[AcknowledgedTime], ALS.[LastUpdate], ALS.[AlertNotes], ALS.[Notes], 0 AS AlertObjectID
FROM [dbo].[AlertStatus] AS ALS
```
