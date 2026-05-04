# View: `dbo.VoipJitterOperationResults`

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
| 5 | `Frequency` | int | NO |  |  |
| 6 | `LifeTimeUtc` | datetime | YES |  |  |
| 7 | `IpSlaOperationNumber` | int | YES |  |  |
| 8 | `OperationName` | nvarchar(max) | YES |  |  |
| 9 | `DateChangedUtc` | datetime | NO |  |  |
| 10 | `VoipOperationResultID` | bigint | YES |  |  |
| 11 | `RecordTimeUtc` | datetime | NO |  |  |
| 12 | `MinRoundTripTime` | int | YES |  |  |
| 13 | `MaxRoundTripTime` | int | YES |  |  |
| 14 | `AvgRoundTripTime` | int | YES |  |  |
| 15 | `MinJitterSD` | float | YES |  |  |
| 16 | `MaxJitterSD` | float | YES |  |  |
| 17 | `AvgJitterSD` | float | YES |  |  |
| 18 | `MinJitterDS` | float | YES |  |  |
| 19 | `MaxJitterDS` | float | YES |  |  |
| 20 | `AvgJitterDS` | float | YES |  |  |
| 21 | `MinJitter` | float | YES |  |  |
| 22 | `MaxJitter` | float | YES |  |  |
| 23 | `AvgJitter` | float | YES |  |  |
| 24 | `MinLatency` | float | YES |  |  |
| 25 | `MaxLatency` | float | YES |  |  |
| 26 | `AvgLatency` | float | YES |  |  |
| 27 | `MinPacketLossSD` | float | YES |  |  |
| 28 | `MaxPacketLossSD` | float | YES |  |  |
| 29 | `AvgPacketLossSD` | float | YES |  |  |
| 30 | `MinPacketLossDS` | float | YES |  |  |
| 31 | `MaxPacketLossDS` | float | YES |  |  |
| 32 | `AvgPacketLossDS` | float | YES |  |  |
| 33 | `MinPacketLoss` | float | YES |  |  |
| 34 | `MaxPacketLoss` | float | YES |  |  |
| 35 | `AvgPacketLoss` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipJitterOperationResults_Daily` | USER_TABLE |
| `VoipJitterOperationResults_Detail` | USER_TABLE |
| `VoipJitterOperationResults_Hourly` | USER_TABLE |
| `VoipOperationInstances` | USER_TABLE |
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

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.VoipJitterOperationResults AS
	-- non-path DETAIL
    SELECT
        VoipOperationInstances.VoipOperationInstanceID,
        VoipOperationTypeID,
        SourceNodeID,
        TargetNodeID,
        Frequency,
        LifeTimeUtc,
        IpSlaOperationNumber,
        OperationName,
        DateChangedUtc,
        --FB90540 - keep OperationResultID in the results views because of EOC backward compatibility
        --Number of days mod 16383 days to have 14 bits only
        --we have to shift number of days << 49 (2^49 = 562949953421312) and number of seconds << 32 (2^32 = 4294967296)
        (CONVERT(bigint, (DATEDIFF(DAY, '2000-01-01 00:00:00:000', VoipOperationResults_Detail.RecordTimeUtc)  % 16383) * 562949953421312) | CONVERT(bigint, (DATEPART(ss, VoipOperationResults_Detail.RecordTimeUtc) + 60*DATEPART(mi, VoipOperationResults_Detail.RecordTimeUtc) + 3600*DATEPART(hh, VoipOperationResults_Detail.RecordTimeUtc)) * 4294967296) | VoipOperationInstances.VoipOperationInstanceID) AS VoipOperationResultID,
        VoipOperationResults_Detail.RecordTimeUtc,
        RoundTripTime as MinRoundTripTime,
        RoundTripTime as MaxRoundTripTime,
        RoundTripTime as AvgRoundTripTime,
        JitterSD as MinJitterSD,
        JitterSD as MaxJitterSD,
        JitterSD as AvgJitterSD,
        JitterDS as MinJitterDS,
        JitterDS as MaxJitterDS,
        JitterDS as AvgJitterDS,
        Jitter as MinJitter,
        Jitter as MaxJitter,
        Jitter as AvgJitter,
        Latency as MinLatency,
        Latency as MaxLatency,
        Latency as AvgLatency,
        PacketLossSD as MinPacketLossSD,
        PacketLossSD as MaxPacketLossSD,
        PacketLossSD as AvgPacketLossSD,
        PacketLossDS as MinPacketLossDS,
        PacketLossDS as MaxPacketLossDS,
        PacketLossDS as AvgPacketLossDS,
        PacketLoss as MinPacketLoss,
        PacketLoss as MaxPacketLoss,
        PacketLoss as AvgPacketLoss
    FROM VoipOperationInstances
    INNER JOIN VoipOperationResults_Detail ON VoipOperationResults_Detail.VoipOperationInstanceID=VoipOperationInstances.VoipOperationInstanceID
    LEFT JOIN VoipJitterOperationResults_Detail ON VoipJitterOperationResults_Detail.VoipOperationInstanceID=VoipOperationResults_Detail.VoipOperationInstanceID AND
    VoipJitterOperationResults_Detail.RecordTimeUtc=VoipOperationResults_Detail.RecordTimeUtc
    WHERE VoipOperationResults_Detail.VoipOperationResultTypeID < 1000 AND
          VoipOperationInstances.VoipOperationStateID<>6 AND
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
        Frequency,
        LifeTimeUtc,
        IpSlaOperationNumber,
        OperationName,
        DateChangedUtc,
        --FB90540 - keep OperationResultID in the results views because of EOC backward compatibility
        --Number of days mod 16383 days to have 14 bits only
        --we have to shift number of days << 49 (2^49 = 562949953421312) and number of seconds << 32 (2^32 = 4294967296)
        (CONVERT(bigint, (DATEDIFF(DAY, '2000-01-01 00:00:00:000', VoipOperationResults_Detail.RecordTimeUtc)  % 16383) * 562949953421312) | CONVERT(bigint, (DATEPART(ss, VoipOperationResults_Detail.RecordTimeUtc) + 60*DATEPART(mi, VoipOperationResults_Detail.RecordTimeUtc) + 3600*DATEPART(hh, VoipOperationResults_Detail.RecordTimeUtc)) * 4294967296) | VoipOperationInstances.VoipOperationInstanceID) AS VoipOperationResultID,
        VoipOperationResults_Detail.RecordTimeUtc,
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
		vphorPacketLoss.Value as AvgPacketLoss
    FROM VoipOperationInstances
    INNER JOIN VoipOperationResults_Detail ON VoipOperationResults_Detail.VoipOperationInstanceID=VoipOperationInstances.VoipOperationInstanceID
	INNER JOIN VoipPathOperationResults_Detail vpor ON VoipOperationResults_Detail.VoipOperationInstanceID=vpor.VoipOperationInstanceID AND
	VoipOperationResults_Detail.RecordTimeUtc=vpor.RecordTimeUtc
	INNER JOIN VoipPaths vp ON vpor.VoipPathID=vp.VoipPathID
	LEFT JOIN VoipPathHopOperationResults_Detail vphorJitter
		ON vpor.VoipOperationInstanceID=vphorJitter.VoipOperationInstanceID
		AND vpor.RecordTimeUtc=vphorJitter.RecordTimeUtc
		AND vphorJitter.HopIndex=vp.MaxHopIndex
		AND vphorJitter.VoipMetricTypeID=2
	LEFT JOIN VoipPathHopOperationResults_Detail vphorLatency
		ON vpor.VoipOperationInstanceID=vphorLatency.VoipOperationInstanceID
		AND vpor.RecordTimeUtc=vphorLatency.RecordTimeUtc
		AND vphorLatency.HopIndex=vp.MaxHopIndex
		AND vphorLatency.VoipMetricTypeID=3
	LEFT JOIN VoipPathHopOperationResults_Detail vphorPacketLoss
		ON vpor.VoipOperationInstanceID=vphorPacketLoss.VoipOperationInstanceID
		AND vpor.RecordTimeUtc=vphorPacketLoss.RecordTimeUtc
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
        Frequency,
        LifeTimeUtc,
        IpSlaOperationNumber,
        OperationName,
        DateChangedUtc,
        --FB90540 - keep OperationResultID in the results views because of EOC backward compatibility
        --Number of days mod 16383 days to have 14 bits only
        --we have to shift number of days << 49 (2^49 = 562949953421312) and number of seconds << 32 (2^32 = 4294967296)
        (CONVERT(bigint, (DATEDIFF(DAY, '2000-01-01 00:00:00:000', VoipOperationResults_Hourly.RecordTimeUtc)  % 16383) * 562949953421312) | CONVERT(bigint, (DATEPART(ss, VoipOperationResults_Hourly.RecordTimeUtc) + 60*DATEPART(mi, VoipOperationResults_Hourly.RecordTimeUtc) + 3600*DATEPART(hh, VoipOperationResults_Hourly.RecordTimeUtc)) * 4294967296) | VoipOperationInstances.VoipOperationInstanceID) AS VoipOperationResultID,
        VoipOperationResults_Hourly.RecordTimeUtc,
        MinRoundTripTime,
        MaxRoundTripTime,
        AvgRoundTripTime,
        MinJitterSD,
        MaxJitterSD,
        AvgJitterSD,
        MinJitterDS,
        MaxJitterDS,
        AvgJitterDS,
        MinJitter,
        MaxJitter,
        AvgJitter,
        MinLatency,
        MaxLatency,
        AvgLatency,
        MinPacketLossSD,
        MaxPacketLossSD,
        AvgPacketLossSD,
        MinPacketLossDS,
        MaxPacketLossDS,
        AvgPacketLossDS,
        MinPacketLoss,
        MaxPacketLoss,
        AvgPacketLoss
    FROM VoipOperationInstances
    INNER JOIN VoipOperationResults_Hourly ON VoipOperationResults_Hourly.VoipOperationInstanceID=VoipOperationInstances.VoipOperationInstanceID
    LEFT JOIN VoipJitterOperationResults_Hourly ON VoipJitterOperationResults_Hourly.VoipOperationInstanceID=VoipOperationResults_Hourly.VoipOperationInstanceID AND
    VoipJitterOperationResults_Hourly.RecordTimeUtc=VoipOperationResults_Hourly.RecordTimeUtc
    WHERE VoipOperationInstances.VoipOperationStateID<>6 AND VoipOperationInstances.Deleted=0 AND
		  NOT VoipOperationInstances.VoipOperationTypeID IN (6,14)
    UNION ALL
	-- path HOURLY
    SELECT
        VoipOperationInstances.VoipOperationInstanceID,
        VoipOperationTypeID,
        SourceNodeID,
        TargetNodeID,
        Frequency,
        LifeTimeUtc,
        IpSlaOperationNumber,
        OperationName,
        DateChangedUtc,
        --FB90540 - keep OperationResultID in the results views because of EOC backward compatibility
        --Number of days mod 16383 days to have 14 bits only
        --we have to shift number of days << 49 (2^49 = 562949953421312) and number of seconds << 32 (2^32 = 4294967296)
        (CONVERT(bigint, (DATEDIFF(DAY, '2000-01-01 00:00:00:000', VoipOperationResults_Hourly.RecordTimeUtc)  % 16383) * 562949953421312) | CONVERT(bigint, (DATEPART(ss, VoipOperationResults_Hourly.RecordTimeUtc) + 60*DATEPART(mi, VoipOperationResults_Hourly.RecordTimeUtc) + 3600*DATEPART(hh, VoipOperationResults_Hourly.RecordTimeUtc)) * 4294967296) | VoipOperationInstances.VoipOperationInstanceID) AS VoipOperationResultID,
        VoipOperationResults_Hourly.RecordTimeUtc,
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
		x.AvgPacketLoss
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
	) x ON VoipOperationResults_Hourly.VoipOperationInstanceID=x.VoipOperationInstanceID AND VoipOperationResults_Hourly.RecordTimeUtc=x.RecordTimeUtc
    WHERE VoipOperationInstances.VoipOperationStateID<>6 AND VoipOperationInstances.Deleted=0 AND
		  VoipOperationInstances.VoipOperationTypeID IN (6,14)
    UNION ALL
	-- non-path DAILY
    SELECT
        VoipOperationInstances.VoipOperationInstanceID,
        VoipOperationTypeID,
        SourceNodeID,
        TargetNodeID,
        Frequency,
        LifeTimeUtc,
        IpSlaOperationNumber,
        OperationName,
        DateChangedUtc,
        --FB90540 - keep OperationResultID in the results views because of EOC backward compatibility
        --Number of days mod 16383 days to have 14 bits only
        --we have to shift number of days << 49 (2^49 = 562949953421312) and number of seconds << 32 (2^32 = 4294967296)
        (CONVERT(bigint, (DATEDIFF(DAY, '2000-01-01 00:00:00:000', VoipOperationResults_Daily.RecordTimeUtc)  % 16383) * 562949953421312) | CONVERT(bigint, (DATEPART(ss, VoipOperationResults_Daily.RecordTimeUtc) + 60*DATEPART(mi, VoipOperationResults_Daily.RecordTimeUtc) + 3600*DATEPART(hh, VoipOperationResults_Daily.RecordTimeUtc)) * 4294967296) | VoipOperationInstances.VoipOperationInstanceID) AS VoipOperationResultID,
        VoipOperationResults_Daily.RecordTimeUtc,
        MinRoundTripTime,
        MaxRoundTripTime,
        AvgRoundTripTime,
        MinJitterSD,
        MaxJitterSD,
        AvgJitterSD,
        MinJitterDS,
        MaxJitterDS,
        AvgJitterDS,
        MinJitter,
        MaxJitter,
        AvgJitter,
        MinLatency,
        MaxLatency,
        AvgLatency,
        MinPacketLossSD,
        MaxPacketLossSD,
        AvgPacketLossSD,
        MinPacketLossDS,
        MaxPacketLossDS,
        AvgPacketLossDS,
        MinPacketLoss,
        MaxPacketLoss,
        AvgPacketLoss
    FROM VoipOperationInstances
    INNER JOIN VoipOperationResults_Daily ON VoipOperationResults_Daily.VoipOperationInstanceID=VoipOperationInstances.VoipOperationInstanceID
    LEFT JOIN VoipJitterOperationResults_Daily ON VoipJitterOperationResults_Daily.VoipOperationInstanceID=VoipOperationResults_Daily.VoipOperationInstanceID AND
    VoipJitterOperationResults_Daily.RecordTimeUtc=VoipOperationResults_Daily.RecordTimeUtc
    WHERE VoipOperationInstances.VoipOperationStateID<>6 AND VoipOperationInstances.Deleted=0 AND
		  NOT VoipOperationInstances.VoipOperationTypeID IN (6,14)
    UNION ALL
	-- path DAILY
    SELECT
        VoipOperationInstances.VoipOperationInstanceID,
        VoipOperationTypeID,
        SourceNodeID,
        TargetNodeID,
        Frequency,
        LifeTimeUtc,
        IpSlaOperationNumber,
        OperationName,
        DateChangedUtc,
        --FB90540 - keep OperationResultID in the results views because of EOC backward compatibility
        --Number of days mod 16383 days to have 14 bits only
        --we have to shift number of days << 49 (2^49 = 562949953421312) and number of seconds << 32 (2^32 = 4294967296)
        (CONVERT(bigint, (DATEDIFF(DAY, '2000-01-01 00:00:00:000', VoipOperationResults_Daily.RecordTimeUtc)  % 16383) * 562949953421312) | CONVERT(bigint, (DATEPART(ss, VoipOperationResults_Daily.RecordTimeUtc) + 60*DATEPART(mi, VoipOperationResults_Daily.RecordTimeUtc) + 3600*DATEPART(hh, VoipOperationResults_Daily.RecordTimeUtc)) * 4294967296) | VoipOperationInstances.VoipOperationInstanceID) AS VoipOperationResultID,
        VoipOperationResults_Daily.RecordTimeUtc,
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
		x.AvgPacketLoss
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
	) x ON VoipOperationResults_Daily.VoipOperationInstanceID=x.VoipOperationInstanceID AND VoipOperationResults_Daily.RecordTimeUtc=x.RecordTimeUtc
    WHERE VoipOperationInstances.VoipOperationStateID<>6 AND VoipOperationInstances.Deleted=0 AND
		  VoipOperationInstances.VoipOperationTypeID IN (6,14)
```
