# View: `dbo.VoipOperationParameterInfo`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | NO |  |  |
| 2 | `DhcpServer` | nvarchar(max) | YES |  |  |
| 3 | `TargetPort` | nvarchar(max) | YES |  |  |
| 4 | `DnsServer` | nvarchar(max) | YES |  |  |
| 5 | `DnsHostName` | nvarchar(max) | YES |  |  |
| 6 | `Url` | nvarchar(max) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipOperationInstances` | USER_TABLE |
| `VoipOperationParameters` | USER_TABLE |
| `dbo.ipslam_MaskUrlPassword` | SQL_SCALAR_FUNCTION |

## Used by

| Object | Type |
|--------|------|
| [`dbo.IpSlaOperationsDNS`](dbo.IpSlaOperationsDNS.md) | VIEW |
| [`dbo.IpSlaOperationsFTP`](dbo.IpSlaOperationsFTP.md) | VIEW |
| [`dbo.IpSlaOperationsTCP`](dbo.IpSlaOperationsTCP.md) | VIEW |
| [`dbo.IpSlaOperationsUDPJitter`](dbo.IpSlaOperationsUDPJitter.md) | VIEW |
| [`dbo.IpSlaOperationsVoIpUDPJitter`](dbo.IpSlaOperationsVoIpUDPJitter.md) | VIEW |
| [`dbo.VoipOperationsUDPEcho`](dbo.VoipOperationsUDPEcho.md) | VIEW |

## Definition

```sql
CREATE VIEW [dbo].[VoipOperationParameterInfo] AS
SELECT
		voi.VoipOperationInstanceID
		,vopTargetAddress.[Value] AS DhcpServer
		,vopTargetPort.[Value] AS TargetPort
		,vopDnsServer.[Value] AS DnsServer
		,vopDnsHostName.[Value] AS DnsHostName
		,[dbo].[ipslam_MaskUrlPassword](vopUrl.[Value]) AS Url
FROM VoipOperationInstances voi
	LEFT JOIN VoipOperationParameters vopTargetAddress ON voi.VoipOperationInstanceID = vopTargetAddress.VoipOperationInstanceID 
		AND vopTargetAddress.VoipOperationParameterTypeID = 1 AND voi.VoipOperationTypeID = 1
	LEFT JOIN VoipOperationParameters vopTargetPort ON voi.VoipOperationInstanceID = vopTargetPort.VoipOperationInstanceID 
		AND vopTargetPort.VoipOperationParameterTypeID = 2
	LEFT JOIN VoipOperationParameters vopDnsHostName ON voi.VoipOperationInstanceID = vopDnsHostName.VoipOperationInstanceID 
		AND vopDnsHostName.VoipOperationParameterTypeID = 9
	LEFT JOIN VoipOperationParameters vopDnsServer ON voi.VoipOperationInstanceID = vopDnsServer.VoipOperationInstanceID 
		AND vopDnsServer.VoipOperationParameterTypeID = 10
	LEFT JOIN VoipOperationParameters vopUrl ON voi.VoipOperationInstanceID = vopUrl.VoipOperationInstanceID 
		AND vopUrl.VoipOperationParameterTypeID = 13

WHERE voi.Deleted = 0
```
