# View: `dbo.VoIPOperationCurrentStats`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | NO |  |  |
| 2 | `VoipOperationTypeID` | smallint | NO |  |  |
| 3 | `OperationTypeName` | nvarchar(100) | YES |  |  |
| 4 | `VoipOperationStateID` | smallint | NO |  |  |
| 5 | `OperationStateName` | varchar(100) | YES |  |  |
| 6 | `VoipOperationStatusID` | smallint | NO |  |  |
| 7 | `OperationStatusName` | varchar(100) | YES |  |  |
| 8 | `StatusMessage` | nvarchar(max) | YES |  |  |
| 9 | `Description` | nvarchar(max) | YES |  |  |
| 10 | `NodeID` | int | NO |  |  |
| 11 | `SourceNodeID` | int | NO |  |  |
| 12 | `TargetNodeID` | int | YES |  |  |
| 13 | `Frequency` | int | NO |  |  |
| 14 | `LifeTimeUtc` | datetime | YES |  |  |
| 15 | `IpSlaOperationNumber` | int | YES |  |  |
| 16 | `IsAutoConfigured` | bit | NO |  |  |
| 17 | `OperationName` | nvarchar(max) | YES |  |  |
| 18 | `DisplaySource` | nvarchar(100) | NO |  |  |
| 19 | `DisplayTarget` | nvarchar(max) | YES |  |  |
| 20 | `SourceNodeCaption` | nvarchar(255) | YES |  |  |
| 21 | `TargetNodeCaption` | nvarchar(255) | YES |  |  |
| 22 | `SourceNodeStatus` | char(20) | YES |  |  |
| 23 | `TargetNodeStatus` | char(20) | YES |  |  |
| 24 | `SourceSiteID` | int | NO |  |  |
| 25 | `SourceSiteName` | nvarchar(100) | NO |  |  |
| 26 | `SourceSiteIsAutoConfigured` | bit | NO |  |  |
| 27 | `TargetSiteID` | int | YES |  |  |
| 28 | `TargetSiteName` | nvarchar(100) | YES |  |  |
| 29 | `TargetSiteIsAutoConfigured` | bit | YES |  |  |
| 30 | `VoipOperationResultID` | bigint | YES |  |  |
| 31 | `RecordTime` | datetime | YES |  |  |
| 32 | `RecordTimeUtc` | datetime | YES |  |  |
| 33 | `RoundTripTime` | int | YES |  |  |
| 34 | `JitterSD` | float | YES |  |  |
| 35 | `JitterDS` | float | YES |  |  |
| 36 | `Jitter` | float | YES |  |  |
| 37 | `Latency` | float | YES |  |  |
| 38 | `PacketLossSD` | float | YES |  |  |
| 39 | `PacketLossDS` | float | YES |  |  |
| 40 | `PacketLoss` | float | YES |  |  |
| 41 | `MOS` | float | YES |  |  |
| 42 | `HttpRtt` | int | YES |  |  |
| 43 | `DnsRtt` | int | YES |  |  |
| 44 | `TcpConnectRtt` | int | YES |  |  |
| 45 | `TransactionRtt` | int | YES |  |  |
| 46 | `OneWayDelayDS` | float | YES |  |  |
| 47 | `OneWayDelaySD` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Nodes` | VIEW |
| `VoipHttpFtpOperationResults_Detail` | USER_TABLE |
| `VoipJitterOperationResults_Detail` | USER_TABLE |
| `VoipMosOperationResults_Detail` | USER_TABLE |
| `VoipOneWayDelayOperationResults_Detail` | USER_TABLE |
| `VoipOperationInstances` | USER_TABLE |
| `VoIPOperationNames` | VIEW |
| `VoipOperationResults_Detail` | USER_TABLE |
| `VoipOperationStates` | USER_TABLE |
| `VoipOperationStatuses` | USER_TABLE |
| `VoipOperationTypes` | USER_TABLE |
| `VoipPathHopOperationResults_Detail` | USER_TABLE |
| `VoipPathOperationResults_Detail` | USER_TABLE |
| `VoipPaths` | USER_TABLE |
| `VoipSites` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.IpSlaOperationsDHCP`](dbo.IpSlaOperationsDHCP.md) | VIEW |
| [`dbo.IpSlaOperationsDNS`](dbo.IpSlaOperationsDNS.md) | VIEW |
| [`dbo.IpSlaOperationsFTP`](dbo.IpSlaOperationsFTP.md) | VIEW |
| [`dbo.IpSlaOperationsHTTP`](dbo.IpSlaOperationsHTTP.md) | VIEW |
| [`dbo.IpSlaOperationsJitter`](dbo.IpSlaOperationsJitter.md) | VIEW |
| [`dbo.IpSlaOperationsMOS`](dbo.IpSlaOperationsMOS.md) | VIEW |
| [`dbo.IpSlaOperationsTCP`](dbo.IpSlaOperationsTCP.md) | VIEW |
| [`dbo.IpSlaOperationsUDPJitter`](dbo.IpSlaOperationsUDPJitter.md) | VIEW |
| [`dbo.IpSlaOperationsVoIpUDPJitter`](dbo.IpSlaOperationsVoIpUDPJitter.md) | VIEW |
| [`dbo.IpSlaPacketLoss`](dbo.IpSlaPacketLoss.md) | VIEW |
| [`dbo.VoipAlertQos`](dbo.VoipAlertQos.md) | VIEW |
| [`dbo.VoipICMPPathMonthReport`](dbo.VoipICMPPathMonthReport.md) | VIEW |
| [`dbo.VoipICMPPathReport`](dbo.VoipICMPPathReport.md) | VIEW |
| [`dbo.VoipOperationsICMPEcho`](dbo.VoipOperationsICMPEcho.md) | VIEW |
| [`dbo.VoipOperationsUDPEcho`](dbo.VoipOperationsUDPEcho.md) | VIEW |

## Definition

```sql
CREATE VIEW [dbo].[VoIPOperationCurrentStats] AS
SELECT
       voi.VoipOperationInstanceID
      ,voi.VoipOperationTypeID
      ,opTypes.OperationType AS OperationTypeName
      ,voi.VoipOperationStateID
      ,states.OperationState AS OperationStateName
	  ,voi.VoipOperationStatusID
	  ,statuses.OperationStatus AS OperationStatusName
	  ,voi.StatusMessage AS StatusMessage
      ,voi.[Description] AS [Description]
      ,voi.SourceNodeID AS NodeID
      ,voi.SourceNodeID
      ,voi.TargetNodeID
      ,voi.Frequency
      ,voi.LifeTimeUtc
      ,voi.IpSlaOperationNumber
	  ,voi.IsAutoConfigured
      ,operNames.OperationName
      ,operNames.Source AS DisplaySource
      ,operNames.Target AS DisplayTarget
      ,srcNodes.Caption AS SourceNodeCaption
      ,dstNodes.Caption AS TargetNodeCaption
      ,srcNodes.Status AS SourceNodeStatus
      ,dstNodes.Status AS TargetNodeStatus
      ,srcSites.VoipSiteID AS SourceSiteID
      ,srcSites.Name AS SourceSiteName
      ,srcSites.IsAutoConfigured AS SourceSiteIsAutoConfigured
      ,dstSites.VoipSiteID AS TargetSiteID
      ,dstSites.Name AS TargetSiteName
      ,dstSites.IsAutoConfigured AS TargetSiteIsAutoConfigured
      --FB90540 - keep OperationResultID in the results views because of EOC backward compatibility
        --Number of days mod 16383 days to have 14 bits only
        --we have to shift number of days << 49 (2^49 = 562949953421312) and number of seconds << 32 (2^32 = 4294967296)
      ,(CONVERT(bigint, (DATEDIFF(DAY, '2000-01-01 00:00:00:000', DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), vord1.RecordTimeUtc))  % 16383) * 562949953421312) | CONVERT(bigint, (DATEPART(ss, DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), vord1.RecordTimeUtc)) + 60*DATEPART(mi, DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), vord1.RecordTimeUtc)) + 3600*DATEPART(hh, DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), vord1.RecordTimeUtc))) * 4294967296) | voi.VoipOperationInstanceID) AS VoipOperationResultID
	  ,DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), vord1.RecordTimeUtc) as RecordTime
      ,vord1.RecordTimeUtc
      ,vord1.RoundTripTime
      ,vjor.JitterSD
      ,vjor.JitterDS
      ,vjor.Jitter
      ,vjor.Latency
      ,vjor.PacketLossSD
      ,vjor.PacketLossDS
      ,vjor.PacketLoss
      ,vmor.MOS
      ,vhfor.HttpRtt
      ,vhfor.DnsRtt
      ,vhfor.TcpConnectRtt
      ,vhfor.TransactionRtt
      ,vowdor.OneWayDelayDS
      ,vowdor.OneWayDelaySD
FROM VoipOperationInstances voi
	JOIN VoIPOperationNames operNames ON voi.VoipOperationInstanceID = operNames.VoipOperationInstanceID
    JOIN Nodes srcNodes ON voi.SourceNodeID = srcNodes.NodeID
    LEFT JOIN Nodes dstNodes ON voi.TargetNodeID = dstNodes.NodeID

	JOIN VoipOperationStatuses statuses ON voi.VoipOperationStatusID = statuses.VoipOperationStatusID
	JOIN VoipOperationStates states ON voi.VoipOperationStateID = states.VoipOperationStateID
	JOIN VoipOperationTypes opTypes ON voi.VoipOperationTypeID = opTypes.VoipOperationTypeID
    
    JOIN VoipSites srcSites ON voi.SourceNodeID = srcSites.NodeID
    LEFT JOIN VoipSites dstSites ON voi.TargetNodeID = dstSites.NodeID
    
    LEFT JOIN VoipOperationResults_Detail vord1 ON voi.VoipOperationInstanceID = vord1.VoipOperationInstanceID AND voi.LastOperationResultRecordTimeUtc = vord1.RecordTimeUtc

    LEFT JOIN (
		SELECT vjor.VoipOperationInstanceID
			,vjor.RecordTimeUtc
		  ,vjor.JitterSD
		  ,vjor.JitterDS
		  ,vjor.Jitter
		  ,vjor.Latency
		  ,vjor.PacketLossSD
		  ,vjor.PacketLossDS
		  ,vjor.PacketLoss
		FROM VoipJitterOperationResults_Detail vjor
		UNION ALL
		SELECT vpor.VoipOperationInstanceID
		  ,vpor.RecordTimeUtc
		  ,NULL as JitterSD
		  ,NULL as JitterDS
		  ,vphorJitter.Value as Jitter
		  ,vphorLatency.Value as Latency
		  ,NULL as PacketLossSD
		  ,NULL as PacketLossDS
		  ,vphorPacketLoss.Value as PacketLoss
		FROM VoipPathOperationResults_Detail vpor
		JOIN VoipPaths vp ON vpor.VoipPathID=vp.VoipPathID
		LEFT JOIN VoipPathHopOperationResults_Detail vphorJitter
			ON vpor.VoipOperationInstanceID = vphorJitter.VoipOperationInstanceID AND vpor.RecordTimeUtc = vphorJitter.RecordTimeUtc
			AND vphorJitter.HopIndex=vp.MaxHopIndex
			AND vphorJitter.VoipMetricTypeID=2
		LEFT JOIN VoipPathHopOperationResults_Detail vphorLatency
			ON vpor.VoipOperationInstanceID = vphorLatency.VoipOperationInstanceID AND vpor.RecordTimeUtc = vphorLatency.RecordTimeUtc
			AND vphorLatency.HopIndex=vp.MaxHopIndex
			AND vphorLatency.VoipMetricTypeID=3
		LEFT JOIN VoipPathHopOperationResults_Detail vphorPacketLoss
			ON vpor.VoipOperationInstanceID = vphorPacketLoss.VoipOperationInstanceID AND vpor.RecordTimeUtc = vphorPacketLoss.RecordTimeUtc
			AND vphorPacketLoss.HopIndex=vp.MaxHopIndex
			AND vphorPacketLoss.VoipMetricTypeID=4
		) vjor
		ON vjor.VoipOperationInstanceID = voi.VoipOperationInstanceID AND vjor.RecordTimeUtc = voi.LastOperationResultRecordTimeUtc
    LEFT JOIN VoipMosOperationResults_Detail vmor ON vmor.VoipOperationInstanceID = voi.VoipOperationInstanceID AND vmor.RecordTimeUtc = voi.LastOperationResultRecordTimeUtc

    LEFT JOIN VoipHttpFtpOperationResults_Detail vhfor ON vhfor.VoipOperationInstanceID = voi.VoipOperationInstanceID AND vhfor.RecordTimeUtc = voi.LastOperationResultRecordTimeUtc
    LEFT JOIN VoipOneWayDelayOperationResults_Detail vowdor ON vowdor.VoipOperationInstanceID = voi.VoipOperationInstanceID AND vowdor.RecordTimeUtc = voi.LastOperationResultRecordTimeUtc

WHERE voi.VoipOperationStateID<>6 AND voi.Deleted=0
```
