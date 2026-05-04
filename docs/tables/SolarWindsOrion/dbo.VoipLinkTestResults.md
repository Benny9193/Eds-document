# View: `dbo.VoipLinkTestResults`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipLinkTestResultsID` | int | NO |  |  |
| 2 | `VoipTestInstanceID` | int | NO |  |  |
| 3 | `HasUdpJitterOperation` | int | NO |  |  |
| 4 | `HasCallSetupOperation` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipOperationInstances` | USER_TABLE |
| `VoipOperationResults_Daily` | USER_TABLE |
| `VoipOperationResults_Detail` | USER_TABLE |
| `VoipOperationResults_Hourly` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.[VoipLinkTestResults]
AS

SELECT
	vor.VoipOperationInstanceID as VoipLinkTestResultsID,
	vor.VoipOperationInstanceID as VoipTestInstanceID,
	1 as HasUdpJitterOperation,
	0 as HasCallSetupOperation
FROM VoipOperationResults_Detail as vor
INNER JOIN VoipOperationInstances as voi ON vor.VoipOperationInstanceID=voi.VoipOperationInstanceID
WHERE voi.VoipOperationTypeID=11 AND voi.VoipOperationStateID<>6 AND voi.Deleted=0
	AND vor.VoipOperationResultTypeID<1000 AND vor.Collapsed=0
UNION
SELECT
	vor.VoipOperationInstanceID as VoipLinkTestResultsID,
	vor.VoipOperationInstanceID as VoipTestInstanceID,
	1 as HasUdpJitterOperation,
	0 as HasCallSetupOperation
FROM VoipOperationResults_Hourly as vor
INNER JOIN VoipOperationInstances as voi ON vor.VoipOperationInstanceID=voi.VoipOperationInstanceID
WHERE voi.VoipOperationTypeID=11 AND voi.VoipOperationStateID<>6 AND voi.Deleted=0
UNION
SELECT
	vor.VoipOperationInstanceID as VoipLinkTestResultsID,
	vor.VoipOperationInstanceID as VoipTestInstanceID,
	1 as HasUdpJitterOperation,
	0 as HasCallSetupOperation
FROM VoipOperationResults_Daily as vor
INNER JOIN VoipOperationInstances as voi ON vor.VoipOperationInstanceID=voi.VoipOperationInstanceID
WHERE voi.VoipOperationTypeID=11 AND voi.VoipOperationStateID<>6 AND voi.Deleted=0
```
