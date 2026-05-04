# View: `dbo.AlertHistoryView`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AlertHistoryID` | int | NO |  |  |
| 2 | `AlertID` | int | NO |  |  |
| 3 | `TimeStamp` | datetime | YES |  |  |
| 4 | `EventTypeWord` | varchar(15) | NO |  |  |
| 5 | `Name` | nvarchar(1024) | NO |  |  |
| 6 | `ObjectType` | nvarchar(50) | NO |  |  |
| 7 | `AlertEnabled` | bit | NO |  |  |
| 8 | `Frequency` | bigint | NO |  |  |
| 9 | `Message` | nvarchar(max) | YES |  |  |
| 10 | `AccountID` | nvarchar(100) | YES |  |  |
| 11 | `AlertActiveID` | bigint | YES |  |  |
| 12 | `AlertObjectID` | int | NO |  |  |
| 13 | `ActionID` | int | YES |  |  |
| 14 | `ActionTypeID` | nvarchar(50) | YES |  |  |
| 15 | `Title` | nvarchar(1024) | YES |  |  |
| 16 | `RealEntityType` | nvarchar(250) | YES |  |  |
| 17 | `TriggeredCount` | bigint | YES |  |  |
| 18 | `EntityNetObjectId` | nvarchar(400) | YES |  |  |
| 19 | `EntityCaption` | nvarchar(1024) | YES |  |  |
| 20 | `EntityDetailsUrl` | nvarchar(max) | YES |  |  |
| 21 | `RelatedNodeCaption` | nvarchar(1024) | YES |  |  |
| 22 | `RelatedNodeDetailsUrl` | nvarchar(max) | YES |  |  |
| 23 | `RelatedNodeId` | int | YES |  |  |
| 24 | `LastTriggeredDateTime` | datetime | YES |  |  |
| 25 | `AlertNote` | nvarchar(max) | YES |  |  |
| 26 | `AlertRefID` | uniqueidentifier | NO |  |  |
| 27 | `BlockUntil` | datetime | NO |  |  |
| 28 | `NotifyEnabled` | bit | NO |  |  |
| 29 | `LastEdit` | datetime2 | NO |  |  |
| 30 | `CreatedBy` | nvarchar(100) | YES |  |  |
| 31 | `Canned` | bit | NO |  |  |
| 32 | `Category` | nvarchar(255) | YES |  |  |
| 33 | `Severity` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Actions` | USER_TABLE |
| `AlertConfigurations` | USER_TABLE |
| `AlertHistory` | USER_TABLE |
| `AlertObjects` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
Create view dbo.AlertHistoryView as
	SELECT AH.[AlertHistoryID], ACo.AlertID, AH.[TimeStamp], 
CASE AH.[EventType]
WHEN 0 then 'Triggered'
WHEN 1 then 'Reset'
WHEN 2 then 'Acknowledged'
WHEN 3 then 'Note'
WHEN 4 then 'AddedToIncident'
WHEN 5 then 'ActionFailed'
WHEN 6 then 'ActionSucceeded'
WHEN 7 then 'Unacknowledge'
WHEN 8 then 'Cleared'
Else 'Unknown' 
END  as EventTypeWord , 
ACo.[Name], ACo.[ObjectType], ACo.[Enabled] as AlertEnabled, ACo.[Frequency], 
AH.[Message], AH.[AccountID], AH.[AlertActiveID], AH.[AlertObjectID], AH.[ActionID], AC.ActionTypeID, AC.Title,
AO.RealEntityType, AO.TriggeredCount, AO.EntityNetObjectId, AO.EntityCaption, AO.EntityDetailsUrl, AO.RelatedNodeCaption, AO.RelatedNodeDetailsUrl, AO.RelatedNodeId, AO.LastTriggeredDateTime, AO.AlertNote,
ACo.[AlertRefID], ACo.[BlockUntil], ACo.[NotifyEnabled], ACo.[LastEdit], ACo.[CreatedBy], ACo.[Canned], ACo.[Category], ACo.[Severity]
  FROM [AlertHistory] AH With (Nolock)
  INNER JOIN AlertObjects AO With (Nolock) ON AH.AlertObjectID = AO.AlertObjectID
  INNER JOIN AlertConfigurations ACo With (Nolock) ON ACo.AlertID=AO.AlertID
  LEFT JOIN Actions AC With (Nolock) ON AH.ActionID = AC.ActionID
```
