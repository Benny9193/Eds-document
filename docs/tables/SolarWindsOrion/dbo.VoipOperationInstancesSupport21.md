# View: `dbo.VoipOperationInstancesSupport21`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | NO |  |  |
| 2 | `VoipOperationTypeID` | smallint | NO |  |  |
| 3 | `VoipOperationStatusID` | smallint | NO |  |  |
| 4 | `VoipOperationStateID` | smallint | NO |  |  |
| 5 | `SourceNodeID` | int | NO |  |  |
| 6 | `TargetNodeID` | int | YES |  |  |
| 7 | `IsAutoConfigured` | bit | NO |  |  |
| 8 | `Frequency` | int | NO |  |  |
| 9 | `LifeTimeUtc` | datetime | YES |  |  |
| 10 | `IpSlaOperationNumber` | int | YES |  |  |
| 11 | `OperationName` | nvarchar(max) | YES |  |  |
| 12 | `Description` | nvarchar(max) | YES |  |  |
| 13 | `StatusMessage` | nvarchar(max) | YES |  |  |
| 14 | `DateChangedUtc` | datetime | NO |  |  |
| 15 | `LastOperationResultRecordTimeUtc` | datetime | YES |  |  |
| 16 | `Deleted` | bit | NO |  |  |
| 17 | `Status21` | nchar(10) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipOperationInstances` | USER_TABLE |
| `dbo.ipslam_OperationState2Status21` | SQL_SCALAR_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoipOperationInstancesSupport21] AS

SELECT
	*,
	dbo.ipslam_OperationState2Status21(voi.VoipOperationStateID) as Status21
FROM VoipOperationInstances as voi
```
