# View: `dbo.VoIPOperations`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | NO |  |  |
| 2 | `VoipOperationTypeID` | smallint | NO |  |  |
| 3 | `OperationType` | nvarchar(100) | YES |  |  |
| 4 | `VoipOperationStatusID` | smallint | NO |  |  |
| 5 | `VoipOperationStateID` | smallint | NO |  |  |
| 6 | `SourceNodeID` | int | NO |  |  |
| 7 | `TargetNodeID` | int | YES |  |  |
| 8 | `IsAutoConfigured` | bit | NO |  |  |
| 9 | `Frequency` | int | NO |  |  |
| 10 | `LifeTimeUtc` | datetime | YES |  |  |
| 11 | `IpSlaOperationNumber` | int | YES |  |  |
| 12 | `OperationName` | nvarchar(max) | YES |  |  |
| 13 | `OperationNameFull` | nvarchar(max) | YES |  |  |
| 14 | `DisplaySource` | nvarchar(100) | NO |  |  |
| 15 | `DisplayTarget` | nvarchar(max) | YES |  |  |
| 16 | `Description` | nvarchar(max) | YES |  |  |
| 17 | `StatusMessage` | nvarchar(max) | YES |  |  |
| 18 | `DateChangedUtc` | datetime | NO |  |  |
| 19 | `LastOperationResultRecordTimeUtc` | datetime | YES |  |  |
| 20 | `LastOperationResultID` | bigint | YES |  |  |
| 21 | `Deleted` | bit | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipOperationInstances` | USER_TABLE |
| `VoIPOperationNames` | VIEW |
| `VoipOperationTypes` | USER_TABLE |
| `VoipSites` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoIPOperations] AS
SELECT
       Oper.[VoipOperationInstanceID]
      ,Oper.[VoipOperationTypeID]
	  ,operTypes.OperationType as OperationType
      ,[VoipOperationStatusID]
      ,[VoipOperationStateID]
      ,[SourceNodeID]
      ,[TargetNodeID]
      ,Oper.[IsAutoConfigured]
      ,[Frequency]
      ,[LifeTimeUtc]
      ,[IpSlaOperationNumber]
      ,operNames.OperationName
	  ,operNames.OperationNameFull
	  ,operNames.Source as DisplaySource
	  ,operNames.Target as DisplayTarget
	  ,[Description]
	  ,[StatusMessage]
      ,[DateChangedUtc]
      ,[LastOperationResultRecordTimeUtc]
      --FB90540 - keep OperationResultID in the results views because of EOC backward compatibility
      --Number of days mod 16383 days to have 14 bits only
      --we have to shift number of days << 49 (2^49 = 562949953421312) and number of seconds << 32 (2^32 = 4294967296)
      ,(CONVERT(bigint, (DATEDIFF(DAY, '2000-01-01 00:00:00:000', LastOperationResultRecordTimeUtc)  % 16383) * 562949953421312) | CONVERT(bigint, (DATEPART(ss, LastOperationResultRecordTimeUtc) + 60*DATEPART(mi, LastOperationResultRecordTimeUtc) + 3600*DATEPART(hh, LastOperationResultRecordTimeUtc)) * 4294967296) | Oper.[VoipOperationInstanceID]) AS LastOperationResultID
      ,[Deleted]
  FROM [VoipOperationInstances] Oper
	JOIN VoIPOperationNames operNames ON Oper.VoipOperationInstanceID = operNames.VoipOperationInstanceID
    JOIN VoipSites SourceSites ON Oper.SourceNodeID = SourceSites.NodeID
    LEFT JOIN VoipSites DestSites ON Oper.TargetNodeID = DestSites.NodeID
	LEFT JOIN VoipOperationTypes operTypes ON Oper.VoipOperationTypeID=operTypes.VoipOperationTypeID
	WHERE Oper.Deleted = 0 AND VoipOperationStateID <> 6
```
