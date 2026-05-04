# View: `dbo.VoipTestInstance`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipTestInstanceID` | int | NO |  |  |
| 2 | `VoipTestID` | int | YES |  |  |
| 3 | `SourceNodeID` | int | NO |  |  |
| 4 | `DestNodeID` | int | YES |  |  |
| 5 | `IpSlaOperationNum` | int | NO |  |  |
| 6 | `Status` | nchar(10) | YES |  |  |
| 7 | `MOS` | float | YES |  |  |
| 8 | `Jitter` | float | YES |  |  |
| 9 | `Latency` | float | YES |  |  |
| 10 | `PacketLoss` | float | YES |  |  |
| 11 | `Codec` | nvarchar(max) | YES |  |  |
| 12 | `VrfName` | nvarchar(max) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipJitterOperationResults_Detail` | USER_TABLE |
| `VoipMosOperationResults_Detail` | USER_TABLE |
| `VoipOperationInstances` | USER_TABLE |
| `VoipOperationParameters` | USER_TABLE |
| `dbo.ipslam_OperationState2Status21` | SQL_SCALAR_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.[VoipTestInstance]
AS

SELECT
	voi.VoipOperationInstanceID as VoipTestInstanceID,
	NULL as VoipTestID,
	voi.SourceNodeID,
	voi.TargetNodeID as DestNodeID,
	ISNULL(voi.IpSlaOperationNumber,0) as IpSlaOperationNum,
	dbo.ipslam_OperationState2Status21(voi.VoipOperationStateID) as Status,
	vmor.MOS,
	vjor.Jitter,
	vjor.Latency,
	vjor.PacketLoss,
	vopCodec.Value as Codec,
	vopVrfName.Value as VrfName
FROM VoipOperationInstances as voi
LEFT JOIN VoipMosOperationResults_Detail as vmor ON voi.VoipOperationInstanceID = vmor.VoipOperationInstanceID AND voi.LastOperationResultRecordTimeUtc = vmor.RecordTimeUtc
LEFT JOIN VoipJitterOperationResults_Detail as vjor ON voi.VoipOperationInstanceID = vjor.VoipOperationInstanceID AND voi.LastOperationResultRecordTimeUtc = vjor.RecordTimeUtc
LEFT JOIN VoipOperationParameters as vopCodec ON voi.VoipOperationInstanceID=vopCodec.VoipOperationInstanceID
	AND vopCodec.VoipOperationParameterTypeID=20
LEFT JOIN VoipOperationParameters as vopVrfName ON voi.VoipOperationInstanceID=vopVrfName.VoipOperationInstanceID
	AND vopVrfName.VoipOperationParameterTypeID=19
WHERE voi.VoipOperationTypeID=11 AND voi.VoipOperationStateID<>6 AND voi.Deleted=0
```
