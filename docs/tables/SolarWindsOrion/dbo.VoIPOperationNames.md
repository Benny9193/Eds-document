# View: `dbo.VoIPOperationNames`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | NO |  |  |
| 2 | `OperationName` | nvarchar(max) | YES |  |  |
| 3 | `OperationNameFull` | nvarchar(max) | YES |  |  |
| 4 | `Source` | nvarchar(100) | NO |  |  |
| 5 | `Target` | nvarchar(max) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `dbo.ipslam_MaskUrlPassword` | SQL_SCALAR_FUNCTION |
| [`dbo.VoipOperationInstances`](dbo.VoipOperationInstances.md) | USER_TABLE |
| [`dbo.VoipOperationParameters`](dbo.VoipOperationParameters.md) | USER_TABLE |
| [`dbo.VoipOperationTypes`](dbo.VoipOperationTypes.md) | USER_TABLE |
| [`dbo.VoipSites`](dbo.VoipSites.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.VoIPOperationCurrentStats`](dbo.VoIPOperationCurrentStats.md) | VIEW |
| [`dbo.VoIPOperations`](dbo.VoIPOperations.md) | VIEW |

## Definition

```sql
CREATE VIEW [dbo].[VoIPOperationNames]
AS
SELECT
	tmp.VoipOperationInstanceID,
	CASE
		WHEN tmp.OperationName IS NOT NULL
			THEN tmp.OperationName
		WHEN tmp.[Target] IS NOT NULL
			THEN  tmp.[Source] + ' -> ' + tmp.[Target]
		ELSE tmp.[Source]
	END AS OperationName,
	CASE
		WHEN tmp.OperationName IS NOT NULL
			THEN tmp.OperationName
		WHEN tmp.[Target] IS NOT NULL
			THEN  tmp.OperationType + ': ' + tmp.[Source] + ' -> ' + tmp.[Target]   -- '[' + CAST(tmp.IpSlaOperationNumber as nvarchar) + '] ' +
		ELSE tmp.[Source]
	END AS OperationNameFull,
	tmp.[Source],
	tmp.[Target]
FROM
(
	SELECT
		oper.VoipOperationInstanceID,
		oper.IpSlaOperationNumber,
		OperType.OperationType,
		oper.OperationName,
		srcSites.Name as [Source],
		CASE
			WHEN oper.VoipOperationTypeID=2
				THEN paramNameServer.[Value]
			WHEN oper.VoipOperationTypeID IN (3, 4)
				THEN [dbo].[ipslam_MaskUrlPassword](paramUrl.[Value])
			WHEN oper.TargetNodeID IS NOT NULL
				THEN dstSites.Name
			ELSE paramTargetAddress.[Value]
		END AS [Target]
	FROM dbo.VoipOperationInstances AS oper
	INNER JOIN dbo.VoipOperationTypes AS OperType ON oper.VoipOperationTypeID=OperType.VoipOperationTypeID
	INNER JOIN dbo.VoipSites AS srcSites ON oper.SourceNodeID=srcSites.NodeID
	LEFT OUTER JOIN dbo.VoipSites AS dstSites ON oper.TargetNodeID=dstSites.NodeID
	LEFT OUTER JOIN dbo.VoipOperationParameters AS paramTargetAddress ON oper.VoipOperationInstanceID=paramTargetAddress.VoipOperationInstanceID
		AND paramTargetAddress.VoipOperationParameterTypeID=1
	LEFT OUTER JOIN dbo.VoipOperationParameters AS paramNameServer ON oper.VoipOperationInstanceID=paramNameServer.VoipOperationInstanceID
		AND paramNameServer.VoipOperationParameterTypeID=10
	LEFT OUTER JOIN dbo.VoipOperationParameters AS paramUrl ON oper.VoipOperationInstanceID=paramUrl.VoipOperationInstanceID
		AND paramUrl.VoipOperationParameterTypeID=13
) as tmp
```
