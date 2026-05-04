# View: `dbo.VoipOperationResults`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | NO |  |  |
| 2 | `VoipOperationTypeID` | smallint | NO |  |  |
| 3 | `SourceNodeID` | int | NO |  |  |
| 4 | `TargetNodeID` | int | YES |  |  |
| 5 | `VoipOperationResultID` | bigint | YES |  |  |
| 6 | `RecordTimeUtc` | datetime | NO |  |  |
| 7 | `RecordTime` | datetime | YES |  |  |
| 8 | `DateTime` | datetime | YES |  |  |
| 9 | `MinRoundTripTime` | int | YES |  |  |
| 10 | `MaxRoundTripTime` | int | YES |  |  |
| 11 | `AvgRoundTripTime` | int | YES |  |  |
| 12 | `MinJitterSD` | float | YES |  |  |
| 13 | `MaxJitterSD` | float | YES |  |  |
| 14 | `AvgJitterSD` | float | YES |  |  |
| 15 | `MinJitterDS` | float | YES |  |  |
| 16 | `MaxJitterDS` | float | YES |  |  |
| 17 | `AvgJitterDS` | float | YES |  |  |
| 18 | `MinJitter` | float | YES |  |  |
| 19 | `MaxJitter` | float | YES |  |  |
| 20 | `AvgJitter` | float | YES |  |  |
| 21 | `MinLatency` | float | YES |  |  |
| 22 | `MaxLatency` | float | YES |  |  |
| 23 | `AvgLatency` | float | YES |  |  |
| 24 | `MinPacketLossSD` | float | YES |  |  |
| 25 | `MaxPacketLossSD` | float | YES |  |  |
| 26 | `AvgPacketLossSD` | float | YES |  |  |
| 27 | `MinPacketLossDS` | float | YES |  |  |
| 28 | `MaxPacketLossDS` | float | YES |  |  |
| 29 | `AvgPacketLossDS` | float | YES |  |  |
| 30 | `MinPacketLoss` | float | YES |  |  |
| 31 | `MaxPacketLoss` | float | YES |  |  |
| 32 | `AvgPacketLoss` | float | YES |  |  |
| 33 | `MinMOS` | float | YES |  |  |
| 34 | `MaxMOS` | float | YES |  |  |
| 35 | `AvgMOS` | float | YES |  |  |
| 36 | `MinHttpRtt` | int | YES |  |  |
| 37 | `MaxHttpRtt` | int | YES |  |  |
| 38 | `AvgHttpRtt` | int | YES |  |  |
| 39 | `MinDnsRtt` | int | YES |  |  |
| 40 | `MaxDnsRtt` | int | YES |  |  |
| 41 | `AvgDnsRtt` | int | YES |  |  |
| 42 | `MinTcpConnectRtt` | int | YES |  |  |
| 43 | `MaxTcpConnectRtt` | int | YES |  |  |
| 44 | `AvgTcpConnectRtt` | int | YES |  |  |
| 45 | `MinTransactionRtt` | int | YES |  |  |
| 46 | `MaxTransactionRtt` | int | YES |  |  |
| 47 | `AvgTransactionRtt` | int | YES |  |  |
| 48 | `MinOneWayDelayDS` | float | YES |  |  |
| 49 | `MaxOneWayDelayDS` | float | YES |  |  |
| 50 | `AvgOneWayDelayDS` | float | YES |  |  |
| 51 | `MinOneWayDelaySD` | float | YES |  |  |
| 52 | `MaxOneWayDelaySD` | float | YES |  |  |
| 53 | `AvgOneWayDelaySD` | float | YES |  |  |
| 54 | `StatusCountUnknown` | int | NO |  |  |
| 55 | `StatusCountUp` | int | NO |  |  |
| 56 | `StatusCountWarning` | int | NO |  |  |
| 57 | `StatusCountCritical` | int | NO |  |  |
| 58 | `StatusCountDown` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipHttpFtpOperationResults_Daily` | USER_TABLE |
| `VoipHttpFtpOperationResults_Detail` | USER_TABLE |
| `VoipHttpFtpOperationResults_Hourly` | USER_TABLE |
| `VoipJitterOperationResults_Daily` | USER_TABLE |
| `VoipJitterOperationResults_Detail` | USER_TABLE |
| `VoipJitterOperationResults_Hourly` | USER_TABLE |
| `VoipMosOperationResults_Daily` | USER_TABLE |
| `VoipMosOperationResults_Detail` | USER_TABLE |
| `VoipMosOperationResults_Hourly` | USER_TABLE |
| `VoipOneWayDelayOperationResults_Daily` | USER_TABLE |
| `VoipOneWayDelayOperationResults_Detail` | USER_TABLE |
| `VoipOneWayDelayOperationResults_Hourly` | USER_TABLE |
| `VoipOperationInstances` | USER_TABLE |
| `VoipOperationResultHealthStats_Daily` | USER_TABLE |
| `VoipOperationResultHealthStats_Hourly` | USER_TABLE |
| `VoipOperationResults_Daily` | USER_TABLE |
| `VoipOperationResults_Detail` | USER_TABLE |
| `VoipOperationResults_Hourly` | USER_TABLE |
| `VoipPathHopOperationResults_Daily` | USER_TABLE |
| `VoipPathHopOperationResults_Detail` | USER_TABLE |
| `VoipPathHopOperationResults_Hourly` | USER_TABLE |
| `VoipPathOperationResults_Daily` | USER_TABLE |
| `VoipPathOperationResults_Detail` | USER_TABLE |
| `VoipPathOperationResults_Hourly` | USER_TABLE |
| `VoipPaths` | USER_TABLE |

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
| [`dbo.VoipCallPathMetrics`](dbo.VoipCallPathMetrics.md) | VIEW |
| [`dbo.VoipOperationsICMPEcho`](dbo.VoipOperationsICMPEcho.md) | VIEW |
| [`dbo.VoipOperationsUDPEcho`](dbo.VoipOperationsUDPEcho.md) | VIEW |
| [`dbo.VoipQoS`](dbo.VoipQoS.md) | VIEW |

## Definition

```sql
CREATE VIEW [dbo].[VoipOperationResults] AS
	-- non-path DETAIL
    SELECT
        VoipOperationInstances.VoipOperationInstanceID,
        VoipOperationTypeID,
        SourceNodeID,
        TargetNodeID,
        --FB90540 - keep OperationResultID in the results views because of EOC backward compatibility
        --Number of days mod 16383 days to have 14 bits only
        --we have to shift number of days << 49 (2^49 = 562949953421312) and number of seconds << 32 (2^32 = 4294967296)
        (CONVERT(bigint, (DATEDIFF(DAY, '2000-01-01 00:00:00:000', VoipOperationResults_Detail.RecordTimeUtc)  % 16383) * 562949953421312) | CONVERT(bigint, (DATEPART(ss, VoipOperationResults_Detail.RecordTimeUtc) + 60*DATEPART(mi, VoipOperationResults_Detail.RecordTimeUtc) + 3600*DATEPART(hh, VoipOperationResults_Detail.RecordTimeUtc)) * 4294967296) | VoipOperationInstances.VoipOperationInstanceID) AS VoipOperationResultID,
        VoipOperationResults_Detail.RecordTimeUtc,
		DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), VoipOperationResults_Detail.RecordTimeUtc) as RecordTime,
		DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), VoipOperationResults_Detail.RecordTimeUtc) as [DateTime],
        RoundTripTime as MinRoundTripTime,
        RoundTripTime as MaxRoundTripTime,
        RoundTripTime as AvgRoundTripTime,
        vjor.JitterSD as MinJitterSD,
        vjor.JitterSD as MaxJitterSD,
        vjor.JitterSD as AvgJitterSD,
		vjor.JitterDS as MinJitterDS,
		vjor.JitterDS as MaxJitterDS,
		vjor.JitterDS as AvgJitterDS,
		vjor.Jitter as MinJitter,
		vjor.Jitter as MaxJitter,
		vjor.Jitter as AvgJitter,
		vjor.Latency as MinLatency,
		vjor.Latency as MaxLatency,
		vjor.Latency as AvgLatency,
		vjor.PacketLossSD as MinPacketLossSD,
		vjor.PacketLossSD as MaxPacketLossSD,
		vjor.PacketLossSD as AvgPacketLossSD,
		vjor.PacketLossDS as MinPacketLossDS,
		vjor.PacketLossDS as MaxPacketLossDS,
		vjor.PacketLossDS as AvgPacketLossDS,
		vjor.PacketLoss as MinPacketLoss,
		vjor.PacketLoss as MaxPacketLoss,
		vjor.PacketLoss as AvgPacketLoss,
		vmor.MOS as MinMOS,
		vmor.MOS as MaxMOS,
		vmor.MOS as AvgMOS,
		vhfor.HttpRtt as MinHttpRtt,
		vhfor.HttpRtt as MaxHttpRtt,
		vhfor.HttpRtt as AvgHttpRtt,
		vhfor.DnsRtt as MinDnsRtt,
		vhfor.DnsRtt as MaxDnsRtt,
		vhfor.DnsRtt as AvgDnsRtt,
		vhfor.TcpConnectRtt as MinTcpConnectRtt,
		vhfor.TcpConnectRtt as MaxTcpConnectRtt,
		vhfor.TcpConnectRtt as AvgTcpConnectRtt,
		vhfor.TransactionRtt as MinTransactionRtt,
		vhfor.TransactionRtt as MaxTransactionRtt,
		vhfor.TransactionRtt as AvgTransactionRtt,
		vowdor.OneWayDelayDS as MinOneWayDelayDS,
		vowdor.OneWayDelayDS as MaxOneWayDelayDS,
		vowdor.OneWayDelayDS as AvgOneWayDelayDS,
		vowdor.OneWayDelaySD as MinOneWayDelaySD,
		vowdor.OneWayDelaySD as MaxOneWayDelaySD,
		vowdor.OneWayDelaySD as AvgOneWayDelaySD,

		CASE VoipOperationResults_Detail.VoipOperationStatusID
			WHEN 0 THEN 1 -- Unknown
			ELSE 0
		END AS StatusCountUnknown,

		CASE VoipOperationResults_Detail.VoipOperationStatusID
			WHEN 1 THEN 1 -- Up
			ELSE 0
		END AS StatusCountUp,

		CASE VoipOperationResults_Detail.VoipOperationStatusID
			WHEN 3 THEN 1 -- Warning
			ELSE 0
		END AS StatusCountWarning,

		CASE VoipOperationResults_Detail.VoipOperationStatusID
			WHEN 14 THEN 1 -- Critical
			ELSE 0
		END AS StatusCountCritical,

		CASE VoipOperationResults_Detail.VoipOperationStatusID
			WHEN 2 THEN 1 -- Down
			ELSE 0
		END AS StatusCountDown

    FROM VoipOperationInstances
    INNER JOIN VoipOperationResults_Detail ON VoipOperationResults_Detail.VoipOperationInstanceID=VoipOperationInstances.VoipOperationInstanceID
    LEFT JOIN VoipMosOperationResults_Detail vmor ON vmor.VoipOperationInstanceID = VoipOperationResults_Detail.VoipOperationInstanceID AND vmor.RecordTimeUtc = VoipOperationResults_Detail.RecordTimeUtc
    LEFT JOIN VoipHttpFtpOperationResults_Detail vhfor ON vhfor.VoipOperationInstanceID = VoipOperationResults_Detail.VoipOperationInstanceID AND vhfor.RecordTimeUtc = VoipOperationResults_Detail.RecordTimeUtc
    LEFT JOIN VoipJitterOperationResults_Detail vjor ON vjor.VoipOperationInstanceID = VoipOperationResults_Detail.VoipOperationInstanceID AND vjor.RecordTimeUtc = VoipOperationResults_Detail.RecordTimeUtc
    LEFT JOIN VoipOneWayDelayOperationResults_Detail vowdor ON vowdor.VoipOperationInstanceID = VoipOperationResults_Detail.VoipOperationInstanceID AND vowdor.RecordTimeUtc = VoipOperationResults_Detail.RecordTimeUtc
    WHERE VoipOperationInstances.VoipOperationStateID<>6 AND
          VoipOperationInstances.Deleted=0 AND
          VoipOperationResults_Detail.Collapsed = 0 AND
		  NOT VoipOperationInstances.VoipOperationTypeID IN (6,14)
	UNION ALL
	-- path DETAIL
    SELECT
        VoipOperationInstances.VoipOperationInstanceID,
        VoipOperationTypeID,
        SourceNodeID,
        TargetNodeID,
        --FB90540 - keep OperationResultID in the results views because of EOC backward compatibility
        --Number of days mod 16383 days to have 14 bits only
        --we have to shift number of days << 49 (2^49 = 562949953421312) and number of seconds << 32 (2^32 = 4294967296)
        (CONVERT(bigint, (DATEDIFF(DAY, '2000-01-01 00:00:00:000', VoipOperationResults_Detail.RecordTimeUtc)  % 16383) * 562949953421312) | CONVERT(bigint, (DATEPART(ss, VoipOperationResults_Detail.RecordTimeUtc) + 60*DATEPART(mi, VoipOperationResults_Detail.RecordTimeUtc) + 3600*DATEPART(hh, VoipOperationResults_Detail.RecordTimeUtc)) * 4294967296) | VoipOperationInstances.VoipOperationInstanceID) AS VoipOperationResultID,
        VoipOperationResults_Detail.RecordTimeUtc,
		DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), VoipOperationResults_Detail.RecordTimeUtc) as RecordTime,
		DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), VoipOperationResults_Detail.RecordTimeUtc) as [DateTime],
        RoundTripTime as MinRoundTripTime,
        RoundTripTime as MaxRoundTripTime,
        RoundTripTime as AvgRoundTripTime,
        NULL as MinJitterSD,
        NULL as MaxJitterSD,
        NULL as AvgJitterSD,
		NULL as MinJitterDS,
		NULL as MaxJitterDS,
		NULL as AvgJitterDS,
		vphorJitter.Value as MinJitter,
		vphorJitter.Value as MaxJitter,
		vphorJitter.Value as AvgJitter,
		vphorLatency.Value as MinLatency,
		vphorLatency.Value as MaxLatency,
		vphorLatency.Value as AvgLatency,
		NULL as MinPacketLossSD,
		NULL as MaxPacketLossSD,
		NULL as AvgPacketLossSD,
		NULL as MinPacketLossDS,
		NULL as MaxPacketLossDS,
		NULL as AvgPacketLossDS,
		vphorPacketLoss.Value as MinPacketLoss,
		vphorPacketLoss.Value as MaxPacketLoss,
		vphorPacketLoss.Value as AvgPacketLoss,
		NULL as MinMOS,
		NULL as MaxMOS,
		NULL as AvgMOS,
		NULL as MinHttpRtt,
		NULL as MaxHttpRtt,
		NULL as AvgHttpRtt,
		NULL as MinDnsRtt,
		NULL as MaxDnsRtt,
		NULL as AvgDnsRtt,
		NULL as MinTcpConnectRtt,
		NULL as MaxTcpConnectRtt,
		NULL as AvgTcpConnectRtt,
		NULL as MinTransactionRtt,
		NULL as MaxTransactionRtt,
		NULL as AvgTransactionRtt,
		NULL as MinOneWayDelayDS,
		NULL as MaxOneWayDelayDS,
		NULL as AvgOneWayDelayDS,
		NULL as MinOneWayDelaySD,
		NULL as MaxOneWayDelaySD,
		NULL as AvgOneWayDelaySD,

		CASE VoipOperationResults_Detail.VoipOperationStatusID
			WHEN 0 THEN 1 -- Unknown
			ELSE 0
		END AS StatusCountUnknown,

		CASE VoipOperationResults_Detail.VoipOperationStatusID
			WHEN 1 THEN 1 -- Up
			ELSE 0
		END AS StatusCountUp,

		CASE VoipOperationResults_Detail.VoipOperationStatusID
			WHEN 3 THEN 1 -- Warning
			ELSE 0
		END AS StatusCountWarning,

		CASE VoipOperationResults_Detail.VoipOperationStatusID
			WHEN 14 THEN 1 -- Critical
			ELSE 0
		END AS StatusCountCritical,

		CASE VoipOperationResults_Detail.VoipOperationStatusID
			WHEN 2 THEN 1 -- Down
			ELSE 0
		END AS StatusCountDown

    FROM VoipOperationInstances
    INNER JOIN VoipOperationResults_Detail ON VoipOperationResults_Detail.VoipOperationInstanceID=VoipOperationInstances.VoipOperationInstanceID
	INNER JOIN VoipPathOperationResults_Detail vpor ON VoipOperationResults_Detail.VoipOperationInstanceID = vpor.VoipOperationInstanceID AND VoipOperationResults_Detail.RecordTimeUtc = vpor.RecordTimeUtc
	INNER JOIN VoipPaths vp ON vpor.VoipPathID=vp.VoipPathID
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
    WHERE VoipOperationInstances.VoipOperationStateID<>6 AND
          VoipOperationInstances.Deleted=0 AND
          VoipOperationResults_Detail.Collapsed = 0 AND
		  VoipOperationInstances.VoipOperationTypeID IN (6,14)
    UNION ALL
	-- non-path HOURLY
    SELECT
        VoipOperationInstances.VoipOperationInstanceID,
        VoipOperationTypeID,
        SourceNodeID,
        TargetNodeID,
        --FB90540 - keep OperationResultID in the results views because of EOC backward compatibility
        --Number of days mod 16383 days to have 14 bits only
        --we have to shift number of days << 49 (2^49 = 562949953421312) and number of seconds << 32 (2^32 = 4294967296)
        (CONVERT(bigint, (DATEDIFF(DAY, '2000-01-01 00:00:00:000', VoipOperationResults_Hourly.RecordTimeUtc)  % 16383) * 562949953421312) | CONVERT(bigint, (DATEPART(ss, VoipOperationResults_Hourly.RecordTimeUtc) + 60*DATEPART(mi, VoipOperationResults_Hourly.RecordTimeUtc) + 3600*DATEPART(hh, VoipOperationResults_Hourly.RecordTimeUtc)) * 4294967296) | VoipOperationInstances.VoipOperationInstanceID) AS VoipOperationResultID,
		VoipOperationResults_Hourly.RecordTimeUtc,
		DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), VoipOperationResults_Hourly.RecordTimeUtc) as RecordTime,
		DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), VoipOperationResults_Hourly.RecordTimeUtc) as [DateTime],
        MinRoundTripTime,
        MaxRoundTripTime,
        AvgRoundTripTime,
        vjor.MinJitterSD,
        vjor.MaxJitterSD,
        vjor.AvgJitterSD,
		vjor.MinJitterDS,
		vjor.MaxJitterDS,
		vjor.AvgJitterDS,
		vjor.MinJitter,
		vjor.MaxJitter,
		vjor.AvgJitter,
		vjor.MinLatency,
		vjor.MaxLatency,
		vjor.AvgLatency,
		vjor.MinPacketLossSD,
		vjor.MaxPacketLossSD,
		vjor.AvgPacketLossSD,
		vjor.MinPacketLossDS,
		vjor.MaxPacketLossDS,
		vjor.AvgPacketLossDS,
		vjor.MinPacketLoss,
		vjor.MaxPacketLoss,
		vjor.AvgPacketLoss,
		vmor.MinMOS,
		vmor.MaxMOS,
		vmor.AvgMOS,
		vhfor.MinHttpRtt,
		vhfor.MaxHttpRtt,
		vhfor.AvgHttpRtt,
		vhfor.MinDnsRtt,
		vhfor.MaxDnsRtt,
		vhfor.AvgDnsRtt,
		vhfor.MinTcpConnectRtt,
		vhfor.MaxTcpConnectRtt,
		vhfor.AvgTcpConnectRtt,
		vhfor.MinTransactionRtt,
		vhfor.MaxTransactionRtt,
		vhfor.AvgTransactionRtt,
		vowdor.MinOneWayDelayDS,
		vowdor.MaxOneWayDelayDS,
		vowdor.AvgOneWayDelayDS,
		vowdor.MinOneWayDelaySD,
		vowdor.MaxOneWayDelaySD,
		vowdor.AvgOneWayDelaySD,

		ISNULL(hsUnknown.HealthCount,0) AS StatusCountUnknown,
		ISNULL(hsUP.HealthCount,0) AS StatusCountUp,
		ISNULL(hsWarning.HealthCount,0) AS StatusCountWarning,
		ISNULL(hsCritical.HealthCount,0) AS StatusCountCritical,
		ISNULL(hsDown.HealthCount,0) AS StatusCountDown

    FROM VoipOperationInstances
    INNER JOIN VoipOperationResults_Hourly ON VoipOperationResults_Hourly.VoipOperationInstanceID=VoipOperationInstances.VoipOperationInstanceID
    LEFT JOIN VoipMosOperationResults_Hourly vmor ON vmor.VoipOperationInstanceID = VoipOperationResults_Hourly.VoipOperationInstanceID AND vmor.RecordTimeUtc = VoipOperationResults_Hourly.RecordTimeUtc
    LEFT JOIN VoipHttpFtpOperationResults_Hourly vhfor ON vhfor.VoipOperationInstanceID = VoipOperationResults_Hourly.VoipOperationInstanceID AND vhfor.RecordTimeUtc = VoipOperationResults_Hourly.RecordTimeUtc
    LEFT JOIN VoipJitterOperationResults_Hourly vjor ON vjor.VoipOperationInstanceID = VoipOperationResults_Hourly.VoipOperationInstanceID AND vjor.RecordTimeUtc = VoipOperationResults_Hourly.RecordTimeUtc
    LEFT JOIN VoipOneWayDelayOperationResults_Hourly vowdor ON vowdor.VoipOperationInstanceID = VoipOperationResults_Hourly.VoipOperationInstanceID AND vowdor.RecordTimeUtc = VoipOperationResults_Hourly.RecordTimeUtc

	LEFT JOIN VoipOperationResultHealthStats_Hourly hsUnknown ON hsUnknown.VoipOperationInstanceID = VoipOperationResults_Hourly.VoipOperationInstanceID AND hsUnknown.RecordTimeUtc = VoipOperationResults_Hourly.RecordTimeUtc
		AND hsUnknown.VoipOperationStatusID = 0 -- Unknown
	LEFT JOIN VoipOperationResultHealthStats_Hourly hsUP ON hsUP.VoipOperationInstanceID = VoipOperationResults_Hourly.VoipOperationInstanceID AND hsUP.RecordTimeUtc = VoipOperationResults_Hourly.RecordTimeUtc
		AND hsUP.VoipOperationStatusID = 1 -- Up
	LEFT JOIN VoipOperationResultHealthStats_Hourly hsWarning ON hsWarning.VoipOperationInstanceID = VoipOperationResults_Hourly.VoipOperationInstanceID AND hsWarning.RecordTimeUtc = VoipOperationResults_Hourly.RecordTimeUtc
		AND hsWarning.VoipOperationStatusID = 3 -- Warning
	LEFT JOIN VoipOperationResultHealthStats_Hourly hsCritical ON hsCritical.VoipOperationInstanceID = VoipOperationResults_Hourly.VoipOperationInstanceID AND hsCritical.RecordTimeUtc = VoipOperationResults_Hourly.RecordTimeUtc
		AND hsCritical.VoipOperationStatusID = 14 -- Critical
	LEFT JOIN VoipOperationResultHealthStats_Hourly hsDown ON hsDown.VoipOperationInstanceID = VoipOperationResults_Hourly.VoipOperationInstanceID AND hsDown.RecordTimeUtc = VoipOperationResults_Hourly.RecordTimeUtc
		AND hsDown.VoipOperationStatusID = 2 -- Down

    WHERE VoipOperationInstances.VoipOperationStateID<>6 AND VoipOperationInstances.Deleted=0 AND
		NOT VoipOperationInstances.VoipOperationTypeID IN (6,14)
	UNION ALL
	-- path HOURLY
    SELECT
        VoipOperationInstances.VoipOperationInstanceID,
        VoipOperationTypeID,
        SourceNodeID,
        TargetNodeID,
        --FB90540 - keep OperationResultID in the results views because of EOC backward compatibility
        --Number of days mod 16383 days to have 14 bits only
        --we have to shift number of days << 49 (2^49 = 562949953421312) and number of seconds << 32 (2^32 = 4294967296)
        (CONVERT(bigint, (DATEDIFF(DAY, '2000-01-01 00:00:00:000', VoipOperationResults_Hourly.RecordTimeUtc)  % 16383) * 562949953421312) | CONVERT(bigint, (DATEPART(ss, VoipOperationResults_Hourly.RecordTimeUtc) + 60*DATEPART(mi, VoipOperationResults_Hourly.RecordTimeUtc) + 3600*DATEPART(hh, VoipOperationResults_Hourly.RecordTimeUtc)) * 4294967296) | VoipOperationInstances.VoipOperationInstanceID) AS VoipOperationResultID,
        VoipOperationResults_Hourly.RecordTimeUtc,
		DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), VoipOperationResults_Hourly.RecordTimeUtc) as RecordTime,
		DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), VoipOperationResults_Hourly.RecordTimeUtc) as [DateTime],
        MinRoundTripTime,
        MaxRoundTripTime,
        AvgRoundTripTime,
        NULL as MinJitterSD,
        NULL as MaxJitterSD,
        NULL as AvgJitterSD,
		NULL as MinJitterDS,
		NULL as MaxJitterDS,
		NULL as AvgJitterDS,
		x.MinJitter,
		x.MaxJitter,
		x.AvgJitter,
		x.MinLatency,
		x.MaxLatency,
		x.AvgLatency,
		NULL as MinPacketLossSD,
		NULL as MaxPacketLossSD,
		NULL as AvgPacketLossSD,
		NULL as MinPacketLossDS,
		NULL as MaxPacketLossDS,
		NULL as AvgPacketLossDS,
		x.MinPacketLoss,
		x.MaxPacketLoss,
		x.AvgPacketLoss,
		NULL as MinMOS,
		NULL as MaxMOS,
		NULL as AvgMOS,
		NULL as MinHttpRtt,
		NULL as MaxHttpRtt,
		NULL as AvgHttpRtt,
		NULL as MinDnsRtt,
		NULL as MaxDnsRtt,
		NULL as AvgDnsRtt,
		NULL as MinTcpConnectRtt,
		NULL as MaxTcpConnectRtt,
		NULL as AvgTcpConnectRtt,
		NULL as MinTransactionRtt,
		NULL as MaxTransactionRtt,
		NULL as AvgTransactionRtt,
		NULL as MinOneWayDelayDS,
		NULL as MaxOneWayDelayDS,
		NULL as AvgOneWayDelayDS,
		NULL as MinOneWayDelaySD,
		NULL as MaxOneWayDelaySD,
		NULL as AvgOneWayDelaySD,

		ISNULL(hsUnknown.HealthCount,0) AS StatusCountUnknown,
		ISNULL(hsUP.HealthCount,0) AS StatusCountUp,
		ISNULL(hsWarning.HealthCount,0) AS StatusCountWarning,
		ISNULL(hsCritical.HealthCount,0) AS StatusCountCritical,
		ISNULL(hsDown.HealthCount,0) AS StatusCountDown

    FROM VoipOperationInstances
    INNER JOIN VoipOperationResults_Hourly ON VoipOperationResults_Hourly.VoipOperationInstanceID=VoipOperationInstances.VoipOperationInstanceID
	INNER JOIN (
		SELECT vpor.VoipOperationInstanceID,
			vpor.RecordTimeUtc,
			MIN(vphorJitter.MinValue) as MinJitter,
			MAX(vphorJitter.MaxValue) as MaxJitter,
			SUM(vphorJitter.AvgValue*vpor.PathCount)/SUM(vpor.PathCount) as AvgJitter,
			MIN(vphorLatency.MinValue) as MinLatency,
			MAX(vphorLatency.MaxValue) as MaxLatency,
			SUM(vphorLatency.AvgValue*vpor.PathCount)/SUM(vpor.PathCount) as AvgLatency,
			MIN(vphorPacketLoss.MinValue) as MinPacketLoss,
			MAX(vphorPacketLoss.MaxValue) as MaxPacketLoss,
			SUM(vphorPacketLoss.AvgValue*vpor.PathCount)/SUM(vpor.PathCount) as AvgPacketLoss
		FROM VoipPathOperationResults_Hourly vpor
		INNER JOIN VoipPaths vp ON vpor.VoipPathID=vp.VoipPathID
		LEFT JOIN VoipPathHopOperationResults_Hourly vphorJitter
			ON vpor.VoipOperationInstanceID=vphorJitter.VoipOperationInstanceID 
			AND vpor.RecordTimeUtc=vphorJitter.RecordTimeUtc 
			AND vpor.VoipPathID=vphorJitter.VoipPathID
			AND vphorJitter.HopIndex=vp.MaxHopIndex
			AND vphorJitter.VoipMetricTypeID=2
		LEFT JOIN VoipPathHopOperationResults_Hourly vphorLatency
			ON vpor.VoipOperationInstanceID=vphorLatency.VoipOperationInstanceID 
			AND vpor.RecordTimeUtc=vphorLatency.RecordTimeUtc
			AND vpor.VoipPathID=vphorLatency.VoipPathID
			AND vphorLatency.HopIndex=vp.MaxHopIndex
			AND vphorLatency.VoipMetricTypeID=3
		LEFT JOIN VoipPathHopOperationResults_Hourly vphorPacketLoss
			ON vpor.VoipOperationInstanceID=vphorPacketLoss.VoipOperationInstanceID 
			AND vpor.RecordTimeUtc=vphorPacketLoss.RecordTimeUtc
			AND vpor.VoipPathID=vphorPacketLoss.VoipPathID
			AND vphorPacketLoss.HopIndex=vp.MaxHopIndex
			AND vphorPacketLoss.VoipMetricTypeID=4
		GROUP BY vpor.VoipOperationInstanceID, vpor.RecordTimeUtc
	) x ON VoipOperationResults_Hourly.VoipOperationInstanceID = x.VoipOperationInstanceID AND VoipOperationResults_Hourly.RecordTimeUtc = x.RecordTimeUtc

	LEFT JOIN VoipOperationResultHealthStats_Hourly hsUnknown ON hsUnknown.VoipOperationInstanceID = VoipOperationResults_Hourly.VoipOperationInstanceID AND hsUnknown.RecordTimeUtc = VoipOperationResults_Hourly.RecordTimeUtc
		AND hsUnknown.VoipOperationStatusID = 0 -- Unknown
	LEFT JOIN VoipOperationResultHealthStats_Hourly hsUP ON hsUP.VoipOperationInstanceID = VoipOperationResults_Hourly.VoipOperationInstanceID AND hsUP.RecordTimeUtc = VoipOperationResults_Hourly.RecordTimeUtc
		AND hsUP.VoipOperationStatusID = 1 -- Up
	LEFT JOIN VoipOperationResultHealthStats_Hourly hsWarning ON hsWarning.VoipOperationInstanceID = VoipOperationResults_Hourly.VoipOperationInstanceID AND hsWarning.RecordTimeUtc = VoipOperationResults_Hourly.RecordTimeUtc
		AND hsWarning.VoipOperationStatusID = 3 -- Warning
	LEFT JOIN VoipOperationResultHealthStats_Hourly hsCritical ON hsCritical.VoipOperationInstanceID = VoipOperationResults_Hourly.VoipOperationInstanceID AND hsCritical.RecordTimeUtc = VoipOperationResults_Hourly.RecordTimeUtc
		AND hsCritical.VoipOperationStatusID = 14 -- Critical
	LEFT JOIN VoipOperationResultHealthStats_Hourly hsDown ON hsDown.VoipOperationInstanceID = VoipOperationResults_Hourly.VoipOperationInstanceID AND hsDown.RecordTimeUtc = VoipOperationResults_Hourly.RecordTimeUtc
		AND hsDown.VoipOperationStatusID = 2 -- Down

    WHERE VoipOperationInstances.VoipOperationStateID<>6 AND VoipOperationInstances.Deleted=0 AND
		VoipOperationInstances.VoipOperationTypeID IN (6,14)
	UNION ALL
	-- non-path DAILY
    SELECT
        VoipOperationInstances.VoipOperationInstanceID,
        VoipOperationTypeID,
        SourceNodeID,
        TargetNodeID,
        --FB90540 - keep OperationResultID in the results views because of EOC backward compatibility
        --Number of days mod 16383 days to have 14 bits only
        --we have to shift number of days << 49 (2^49 = 562949953421312) and number of seconds << 32 (2^32 = 4294967296)
        (CONVERT(bigint, (DATEDIFF(DAY, '2000-01-01 00:00:00:000', VoipOperationResults_Daily.RecordTimeUtc)  % 16383) * 562949953421312) | CONVERT(bigint, (DATEPART(ss, VoipOperationResults_Daily.RecordTimeUtc) + 60*DATEPART(mi, VoipOperationResults_Daily.RecordTimeUtc) + 3600*DATEPART(hh, VoipOperationResults_Daily.RecordTimeUtc)) * 4294967296) | VoipOperationInstances.VoipOperationInstanceID) AS VoipOperationResultID,
		VoipOperationResults_Daily.RecordTimeUtc,
		DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), VoipOperationResults_Daily.RecordTimeUtc) as RecordTime,
		DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), VoipOperationResults_Daily.RecordTimeUtc) as [DateTime],
        MinRoundTripTime,
        MaxRoundTripTime,
        AvgRoundTripTime,
        vjor.MinJitterSD,
        vjor.MaxJitterSD,
        vjor.AvgJitterSD,
		vjor.MinJitterDS,
		vjor.MaxJitterDS,
		vjor.AvgJitterDS,
		vjor.MinJitter,
		vjor.MaxJitter,
		vjor.AvgJitter,
		vjor.MinLatency,
		vjor.MaxLatency,
		vjor.AvgLatency,
		vjor.MinPacketLossSD,
		vjor.MaxPacketLossSD,
		vjor.AvgPacketLossSD,
		vjor.MinPacketLossDS,
		vjor.MaxPacketLossDS,
		vjor.AvgPacketLossDS,
		vjor.MinPacketLoss,
		vjor.MaxPacketLoss,
		vjor.AvgPacketLoss,
		vmor.MinMOS,
		vmor.MaxMOS,
		vmor.AvgMOS,
		vhfor.MinHttpRtt,
		vhfor.MaxHttpRtt,
		vhfor.AvgHttpRtt,
		vhfor.MinDnsRtt,
		vhfor.MaxDnsRtt,
		vhfor.AvgDnsRtt,
		vhfor.MinTcpConnectRtt,
		vhfor.MaxTcpConnectRtt,
		vhfor.AvgTcpConnectRtt,
		vhfor.MinTransactionRtt,
		vhfor.MaxTransactionRtt,
		vhfor.AvgTransactionRtt,
		vowdor.MinOneWayDelayDS,
		vowdor.MaxOneWayDelayDS,
		vowdor.AvgOneWayDelayDS,
		vowdor.MinOneWayDelaySD,
		vowdor.MaxOneWayDelaySD,
		vowdor.AvgOneWayDelaySD,

		ISNULL(hsUnknown.HealthCount,0) AS StatusCountUnknown,
		ISNULL(hsUP.HealthCount,0) AS StatusCountUp,
		ISNULL(hsWarning.HealthCount,0) AS StatusCountWarning,
		ISNULL(hsCritical.HealthCount,0) AS StatusCountCritical,
		ISNULL(hsDown.HealthCount,0) AS StatusCountDown

    FROM VoipOperationInstances
    INNER JOIN VoipOperationResults_Daily ON VoipOperationResults_Daily.VoipOperationInstanceID=VoipOperationInstances.VoipOperationInstanceID
    LEFT JOIN VoipMosOperationResults_Daily vmor ON vmor.VoipOperationInstanceID = VoipOperationResults_Daily.VoipOperationInstanceID AND vmor.RecordTimeUtc = VoipOperationResults_Daily.RecordTimeUtc
    LEFT JOIN VoipHttpFtpOperationResults_Daily vhfor ON vhfor.VoipOperationInstanceID = VoipOperationResults_Daily.VoipOperationInstanceID AND vhfor.RecordTimeUtc = VoipOperationResults_Daily.RecordTimeUtc
    LEFT JOIN VoipJitterOperationResults_Daily vjor ON vjor.VoipOperationInstanceID = VoipOperationResults_Daily.VoipOperationInstanceID AND vjor.RecordTimeUtc = VoipOperationResults_Daily.RecordTimeUtc
    LEFT JOIN VoipOneWayDelayOperationResults_Daily vowdor ON vowdor.VoipOperationInstanceID = VoipOperationResults_Daily.VoipOperationInstanceID AND vowdor.RecordTimeUtc = VoipOperationResults_Daily.RecordTimeUtc

	LEFT JOIN VoipOperationResultHealthStats_Hourly hsUnknown ON hsUnknown.VoipOperationInstanceID = VoipOperationResults_Daily.VoipOperationInstanceID AND hsUnknown.RecordTimeUtc = VoipOperationResults_Daily.RecordTimeUtc
		AND hsUnknown.VoipOperationStatusID = 0 -- Unknown
	LEFT JOIN VoipOperationResultHealthStats_Hourly hsUP ON hsUP.VoipOperationInstanceID = VoipOperationResults_Daily.VoipOperationInstanceID AND hsUP.RecordTimeUtc = VoipOperationResults_Daily.RecordTimeUtc
		AND hsUP.VoipOperationStatusID = 1 -- Up
	LEFT JOIN VoipOperationResultHealthStats_Hourly hsWarning ON hsWarning.VoipOperationInstanceID = VoipOperationResults_Daily.VoipOperationInstanceID AND hsWarning.RecordTimeUtc = VoipOperationResults_Daily.RecordTimeUtc
		AND hsWarning.VoipOperationStatusID = 3 -- Warning
	LEFT JOIN VoipOperationResultHealthStats_Hourly hsCritical ON hsCritical.VoipOperationInstanceID = VoipOperationResults_Daily.VoipOperationInstanceID AND hsCritical.RecordTimeUtc = VoipOperationResults_Daily.RecordTimeUtc
		AND hsCritical.VoipOperationStatusID = 14 -- Critical
	LEFT JOIN VoipOperationResultHealthStats_Hourly hsDown ON hsDown.VoipOperationInstanceID = VoipOperationResults_Daily.VoipOperationInstanceID AND hsDown.RecordTimeUtc = VoipOperationResults_Daily.RecordTimeUtc
		AND hsDown.VoipOperationStatusID = 2 -- Down

    WHERE VoipOperationInstances.VoipOperationStateID<>6 AND VoipOperationInstances.Deleted=0 AND
		NOT VoipOperationInstances.VoipOperationTypeID IN (6,14)
	UNION ALL
	-- path DAILY
    SELECT
        VoipOperationInstances.VoipOperationInstanceID,
        VoipOperationTypeID,
        SourceNodeID,
        TargetNodeID,
        --FB90540 - keep OperationResultID in the results views because of EOC backward compatibility
        --Number of days mod 16383 days to have 14 bits only
        --we have to shift number of days << 49 (2^49 = 562949953421312) and number of seconds << 32 (2^32 = 4294967296)
        (CONVERT(bigint, (DATEDIFF(DAY, '2000-01-01 00:00:00:000', VoipOperationResults_Daily.RecordTimeUtc)  % 16383) * 562949953421312) | CONVERT(bigint, (DATEPART(ss, VoipOperationResults_Daily.RecordTimeUtc) + 60*DATEPART(mi, VoipOperationResults_Daily.RecordTimeUtc) + 3600*DATEPART(hh, VoipOperationResults_Daily.RecordTimeUtc)) * 4294967296) | VoipOperationInstances.VoipOperationInstanceID) AS VoipOperationResultID,
        VoipOperationResults_Daily.RecordTimeUtc,
		DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), VoipOperationResults_Daily.RecordTimeUtc) as RecordTime,
		DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), VoipOperationResults_Daily.RecordTimeUtc) as [DateTime],
        MinRoundTripTime,
        MaxRoundTripTime,
        AvgRoundTripTime,
        NULL as MinJitterSD,
        NULL as MaxJitterSD,
        NULL as AvgJitterSD,
		NULL as MinJitterDS,
		NULL as MaxJitterDS,
		NULL as AvgJitterDS,
		x.MinJitter,
		x.MaxJitter,
		x.AvgJitter,
		x.MinLatency,
		x.MaxLatency,
		x.AvgLatency,
		NULL as MinPacketLossSD,
		NULL as MaxPacketLossSD,
		NULL as AvgPacketLossSD,
		NULL as MinPacketLossDS,
		NULL as MaxPacketLossDS,
		NULL as AvgPacketLossDS,
		x.MinPacketLoss,
		x.MaxPacketLoss,
		x.AvgPacketLoss,
		NULL as MinMOS,
		NULL as MaxMOS,
		NULL as AvgMOS,
		NULL as MinHttpRtt,
		NULL as MaxHttpRtt,
		NULL as AvgHttpRtt,
		NULL as MinDnsRtt,
		NULL as MaxDnsRtt,
		NULL as AvgDnsRtt,
		NULL as MinTcpConnectRtt,
		NULL as MaxTcpConnectRtt,
		NULL as AvgTcpConnectRtt,
		NULL as MinTransactionRtt,
		NULL as MaxTransactionRtt,
		NULL as AvgTransactionRtt,
		NULL as MinOneWayDelayDS,
		NULL as MaxOneWayDelayDS,
		NULL as AvgOneWayDelayDS,
		NULL as MinOneWayDelaySD,
		NULL as MaxOneWayDelaySD,
		NULL as AvgOneWayDelaySD,

		ISNULL(hsUnknown.HealthCount,0) AS StatusCountUnknown,
		ISNULL(hsUP.HealthCount,0) AS StatusCountUp,
		ISNULL(hsWarning.HealthCount,0) AS StatusCountWarning,
		ISNULL(hsCritical.HealthCount,0) AS StatusCountCritical,
		ISNULL(hsDown.HealthCount,0) AS StatusCountDown

    FROM VoipOperationInstances
    INNER JOIN VoipOperationResults_Daily ON VoipOperationResults_Daily.VoipOperationInstanceID=VoipOperationInstances.VoipOperationInstanceID
	INNER JOIN (
		SELECT vpor.VoipOperationInstanceID,
			vpor.RecordTimeUtc,
			MIN(vphorJitter.MinValue) as MinJitter,
			MAX(vphorJitter.MaxValue) as MaxJitter,
			SUM(vphorJitter.AvgValue*vpor.PathCount)/SUM(vpor.PathCount) as AvgJitter,
			MIN(vphorLatency.MinValue) as MinLatency,
			MAX(vphorLatency.MaxValue) as MaxLatency,
			SUM(vphorLatency.AvgValue*vpor.PathCount)/SUM(vpor.PathCount) as AvgLatency,
			MIN(vphorPacketLoss.MinValue) as MinPacketLoss,
			MAX(vphorPacketLoss.MaxValue) as MaxPacketLoss,
			SUM(vphorPacketLoss.AvgValue*vpor.PathCount)/SUM(vpor.PathCount) as AvgPacketLoss
		FROM VoipPathOperationResults_Daily vpor
		INNER JOIN VoipPaths vp ON vpor.VoipPathID=vp.VoipPathID
		LEFT JOIN VoipPathHopOperationResults_Daily vphorJitter
			ON vpor.VoipOperationInstanceID=vphorJitter.VoipOperationInstanceID 
			AND vpor.RecordTimeUtc=vphorJitter.RecordTimeUtc 
			AND vpor.VoipPathID=vphorJitter.VoipPathID
			AND vphorJitter.HopIndex=vp.MaxHopIndex
			AND vphorJitter.VoipMetricTypeID=2
		LEFT JOIN VoipPathHopOperationResults_Daily vphorLatency
			ON vpor.VoipOperationInstanceID=vphorLatency.VoipOperationInstanceID 
			AND vpor.RecordTimeUtc=vphorLatency.RecordTimeUtc
			AND vpor.VoipPathID=vphorLatency.VoipPathID
			AND vphorLatency.HopIndex=vp.MaxHopIndex
			AND vphorLatency.VoipMetricTypeID=3
		LEFT JOIN VoipPathHopOperationResults_Daily vphorPacketLoss
			ON vpor.VoipOperationInstanceID=vphorPacketLoss.VoipOperationInstanceID 
			AND vpor.RecordTimeUtc=vphorPacketLoss.RecordTimeUtc
			AND vpor.VoipPathID=vphorPacketLoss.VoipPathID
			AND vphorPacketLoss.HopIndex=vp.MaxHopIndex
			AND vphorPacketLoss.VoipMetricTypeID=4
		GROUP BY vpor.VoipOperationInstanceID, vpor.RecordTimeUtc
	) x ON VoipOperationResults_Daily.VoipOperationInstanceID = x.VoipOperationInstanceID AND VoipOperationResults_Daily.RecordTimeUtc = x.RecordTimeUtc

	LEFT JOIN VoipOperationResultHealthStats_Daily hsUnknown ON hsUnknown.VoipOperationInstanceID = VoipOperationResults_Daily.VoipOperationInstanceID AND hsUnknown.RecordTimeUtc = VoipOperationResults_Daily.RecordTimeUtc
		AND hsUnknown.VoipOperationStatusID = 0 -- Unknown
	LEFT JOIN VoipOperationResultHealthStats_Daily hsUP ON hsUP.VoipOperationInstanceID = VoipOperationResults_Daily.VoipOperationInstanceID AND hsUP.RecordTimeUtc = VoipOperationResults_Daily.RecordTimeUtc
		AND hsUP.VoipOperationStatusID = 1 -- Up
	LEFT JOIN VoipOperationResultHealthStats_Daily hsWarning ON hsWarning.VoipOperationInstanceID = VoipOperationResults_Daily.VoipOperationInstanceID AND hsWarning.RecordTimeUtc = VoipOperationResults_Daily.RecordTimeUtc
		AND hsWarning.VoipOperationStatusID = 3 -- Warning
	LEFT JOIN VoipOperationResultHealthStats_Daily hsCritical ON hsCritical.VoipOperationInstanceID = VoipOperationResults_Daily.VoipOperationInstanceID AND hsCritical.RecordTimeUtc = VoipOperationResults_Daily.RecordTimeUtc
		AND hsCritical.VoipOperationStatusID = 14 -- Critical
	LEFT JOIN VoipOperationResultHealthStats_Daily hsDown ON hsDown.VoipOperationInstanceID = VoipOperationResults_Daily.VoipOperationInstanceID AND hsDown.RecordTimeUtc = VoipOperationResults_Daily.RecordTimeUtc
		AND hsDown.VoipOperationStatusID = 2 -- Down

    WHERE VoipOperationInstances.VoipOperationStateID<>6 AND VoipOperationInstances.Deleted=0 AND
		VoipOperationInstances.VoipOperationTypeID IN (6,14)
```
