# View: `dbo.VoipPathHopOperationResults`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | NO |  |  |
| 2 | `RecordTimeUtc` | datetime | NO |  |  |
| 3 | `RecordTime` | datetime | YES |  |  |
| 4 | `DateTime` | datetime | YES |  |  |
| 5 | `VoipPathID` | int | YES |  |  |
| 6 | `PathCount` | int | YES |  |  |
| 7 | `HopIndex` | int | YES |  |  |
| 8 | `HopIpAddress` | varchar(15) | YES |  |  |
| 9 | `HopIpAddressV4` | int | YES |  |  |
| 10 | `MinRoundTripTime` | float | YES |  |  |
| 11 | `AvgRoundTripTime` | float | YES |  |  |
| 12 | `MaxRoundTripTime` | float | YES |  |  |
| 13 | `MinJitter` | float | YES |  |  |
| 14 | `AvgJitter` | float | YES |  |  |
| 15 | `MaxJitter` | float | YES |  |  |
| 16 | `MinLatency` | float | YES |  |  |
| 17 | `AvgLatency` | float | YES |  |  |
| 18 | `MaxLatency` | float | YES |  |  |
| 19 | `MinPacketLoss` | float | YES |  |  |
| 20 | `AvgPacketLoss` | float | YES |  |  |
| 21 | `MaxPacketLoss` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipOperationResults_Daily` | USER_TABLE |
| `VoipOperationResults_Detail` | USER_TABLE |
| `VoipOperationResults_Hourly` | USER_TABLE |
| `VoipPathHopOperationResults_Daily` | USER_TABLE |
| `VoipPathHopOperationResults_Detail` | USER_TABLE |
| `VoipPathHopOperationResults_Hourly` | USER_TABLE |
| `VoipPathHops` | USER_TABLE |
| `VoipPathOperationResults_Daily` | USER_TABLE |
| `VoipPathOperationResults_Detail` | USER_TABLE |
| `VoipPathOperationResults_Hourly` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.VoipICMPPathMonthReport`](dbo.VoipICMPPathMonthReport.md) | VIEW |
| [`dbo.VoipICMPPathReport`](dbo.VoipICMPPathReport.md) | VIEW |

## Definition

```sql
CREATE VIEW [dbo].[VoipPathHopOperationResults] AS
SELECT
	r.VoipOperationInstanceID,
    r.RecordTimeUtc,
    DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), r.RecordTimeUtc) as RecordTime,
    DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), r.RecordTimeUtc) as [DateTime],
    pr.VoipPathID,
	CASE WHEN pr.VoipPathID IS NULL THEN NULL ELSE 1 END as PathCount,
    ph.HopIndex,
	ph.IpAddress as HopIpAddress,
	ph.IpAddressV4 as HopIpAddressV4,
    phrRtt.Value as MinRoundTripTime,
    phrRtt.Value as AvgRoundTripTime,
    phrRtt.Value as MaxRoundTripTime,
    phrJitter.Value as MinJitter,
    phrJitter.Value as AvgJitter,
    phrJitter.Value as MaxJitter,
    phrLatency.Value as MinLatency,
    phrLatency.Value as AvgLatency,
    phrLatency.Value as MaxLatency,
    CASE WHEN r.VoipOperationStatusID IN (2, 12) THEN 100 ELSE phrPacketLoss.Value END AS MinPacketLoss,
    CASE WHEN r.VoipOperationStatusID IN (2, 12) THEN 100 ELSE phrPacketLoss.Value END AS AvgPacketLoss,
    CASE WHEN r.VoipOperationStatusID IN (2, 12) THEN 100 ELSE phrPacketLoss.Value END AS MaxPacketLoss
FROM VoipOperationResults_Detail r
LEFT JOIN VoipPathOperationResults_Detail pr ON
	r.VoipOperationInstanceID = pr.VoipOperationInstanceID AND
    r.RecordTimeUtc = pr.RecordTimeUtc
LEFT JOIN VoipPathHops ph ON
	pr.VoipPathID=ph.VoipPathID
LEFT JOIN VoipPathHopOperationResults_Detail phrRtt ON
	r.VoipOperationInstanceID = phrRtt.VoipOperationInstanceID AND
    r.RecordTimeUtc = phrRtt.RecordTimeUtc AND
	ph.HopIndex=phrRtt.HopIndex AND
	phrRtt.VoipMetricTypeID=1
LEFT JOIN VoipPathHopOperationResults_Detail phrJitter ON
    r.VoipOperationInstanceID = phrJitter.VoipOperationInstanceID AND
    r.RecordTimeUtc = phrJitter.RecordTimeUtc AND
	ph.HopIndex=phrJitter.HopIndex AND
    phrJitter.VoipMetricTypeID=2
LEFT JOIN VoipPathHopOperationResults_Detail phrLatency ON
    r.VoipOperationInstanceID = phrLatency.VoipOperationInstanceID AND
    r.RecordTimeUtc = phrLatency.RecordTimeUtc AND
	ph.HopIndex=phrLatency.HopIndex AND
    phrLatency.VoipMetricTypeID=3
LEFT JOIN VoipPathHopOperationResults_Detail phrPacketLoss ON
    r.VoipOperationInstanceID = phrPacketLoss.VoipOperationInstanceID AND
    r.RecordTimeUtc = phrPacketLoss.RecordTimeUtc AND
	ph.HopIndex=phrPacketLoss.HopIndex AND
    phrPacketLoss.VoipMetricTypeID=4
UNION ALL
SELECT
	r.VoipOperationInstanceID,
    r.RecordTimeUtc,
    DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), r.RecordTimeUtc) as RecordTime,
    DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), r.RecordTimeUtc) as [DateTime],
    pr.VoipPathID,
	pr.PathCount,
    ph.HopIndex,
	ph.IpAddress as HopIpAddress,
	ph.IpAddressV4 as HopIpAddressV4,
    phrRtt.MinValue as MinRoundTripTime,
    phrRtt.AvgValue as AvgRoundTripTime,
    phrRtt.MaxValue as MaxRoundTripTime,
    phrJitter.MinValue as MinJitter,
    phrJitter.AvgValue as AvgJitter,
    phrJitter.MaxValue as MaxJitter,
    phrLatency.MinValue as MinLatency,
    phrLatency.AvgValue as AvgLatency,
    phrLatency.MaxValue as MaxLatency,
    phrPacketLoss.MinValue as MinPacketLoss,
    phrPacketLoss.AvgValue as AvgPacketLoss,
    phrPacketLoss.MaxValue as MaxPacketLoss
FROM VoipOperationResults_Hourly r
LEFT JOIN VoipPathOperationResults_Hourly pr ON
	r.VoipOperationInstanceID = pr.VoipOperationInstanceID AND
    r.RecordTimeUtc = pr.RecordTimeUtc
LEFT JOIN VoipPathHops ph ON
	pr.VoipPathID=ph.VoipPathID
LEFT JOIN VoipPathHopOperationResults_Hourly phrRtt ON
	r.VoipOperationInstanceID = phrRtt.VoipOperationInstanceID AND
    r.RecordTimeUtc = phrRtt.RecordTimeUtc AND
	pr.VoipPathID=phrRtt.VoipPathID AND
	ph.HopIndex=phrRtt.HopIndex AND
	phrRtt.VoipMetricTypeID=1
LEFT JOIN VoipPathHopOperationResults_Hourly phrJitter ON
    r.VoipOperationInstanceID = phrJitter.VoipOperationInstanceID AND
    r.RecordTimeUtc = phrJitter.RecordTimeUtc AND
    pr.VoipPathID=phrJitter.VoipPathID AND
	ph.HopIndex=phrJitter.HopIndex AND
    phrJitter.VoipMetricTypeID=2
LEFT JOIN VoipPathHopOperationResults_Hourly phrLatency ON
    r.VoipOperationInstanceID = phrLatency.VoipOperationInstanceID AND
    r.RecordTimeUtc = phrLatency.RecordTimeUtc AND
    pr.VoipPathID=phrLatency.VoipPathID AND
	ph.HopIndex=phrLatency.HopIndex AND
    phrLatency.VoipMetricTypeID=3
LEFT JOIN VoipPathHopOperationResults_Hourly phrPacketLoss ON
    r.VoipOperationInstanceID = phrPacketLoss.VoipOperationInstanceID AND
    r.RecordTimeUtc = phrPacketLoss.RecordTimeUtc AND
    pr.VoipPathID=phrPacketLoss.VoipPathID AND
	ph.HopIndex=phrPacketLoss.HopIndex AND
    phrPacketLoss.VoipMetricTypeID=4
UNION ALL
SELECT
	r.VoipOperationInstanceID,
    r.RecordTimeUtc,
    DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), r.RecordTimeUtc) as RecordTime,
    DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), r.RecordTimeUtc) as [DateTime],
    pr.VoipPathID,
	pr.PathCount,
    ph.HopIndex,
	ph.IpAddress as HopIpAddress,
	ph.IpAddressV4 as HopIpAddressV4,
    phrRtt.MinValue as MinRoundTripTime,
    phrRtt.AvgValue as AvgRoundTripTime,
    phrRtt.MaxValue as MaxRoundTripTime,
    phrJitter.MinValue as MinJitter,
    phrJitter.AvgValue as AvgJitter,
    phrJitter.MaxValue as MaxJitter,
    phrLatency.MinValue as MinLatency,
    phrLatency.AvgValue as AvgLatency,
    phrLatency.MaxValue as MaxLatency,
    phrPacketLoss.MinValue as MinPacketLoss,
    phrPacketLoss.AvgValue as AvgPacketLoss,
    phrPacketLoss.MaxValue as MaxPacketLoss
FROM VoipOperationResults_Daily r
LEFT JOIN VoipPathOperationResults_Daily pr ON
	r.VoipOperationInstanceID = pr.VoipOperationInstanceID AND
    r.RecordTimeUtc = pr.RecordTimeUtc
LEFT JOIN VoipPathHops ph ON
	pr.VoipPathID=ph.VoipPathID
LEFT JOIN VoipPathHopOperationResults_Daily phrRtt ON
	r.VoipOperationInstanceID = phrRtt.VoipOperationInstanceID AND
    r.RecordTimeUtc = phrRtt.RecordTimeUtc AND
	pr.VoipPathID=phrRtt.VoipPathID AND
	ph.HopIndex=phrRtt.HopIndex AND
	phrRtt.VoipMetricTypeID=1
LEFT JOIN VoipPathHopOperationResults_Daily phrJitter ON
    r.VoipOperationInstanceID = phrJitter.VoipOperationInstanceID AND
    r.RecordTimeUtc = phrJitter.RecordTimeUtc AND
    pr.VoipPathID=phrJitter.VoipPathID AND
	ph.HopIndex=phrJitter.HopIndex AND
    phrJitter.VoipMetricTypeID=2
LEFT JOIN VoipPathHopOperationResults_Daily phrLatency ON
    r.VoipOperationInstanceID = phrLatency.VoipOperationInstanceID AND
    r.RecordTimeUtc = phrLatency.RecordTimeUtc AND
    pr.VoipPathID=phrLatency.VoipPathID AND
	ph.HopIndex=phrLatency.HopIndex AND
    phrLatency.VoipMetricTypeID=3
LEFT JOIN VoipPathHopOperationResults_Daily phrPacketLoss ON
    r.VoipOperationInstanceID = phrPacketLoss.VoipOperationInstanceID AND
    r.RecordTimeUtc = phrPacketLoss.RecordTimeUtc AND
    pr.VoipPathID=phrPacketLoss.VoipPathID AND
	ph.HopIndex=phrPacketLoss.HopIndex AND
    phrPacketLoss.VoipMetricTypeID=4
```
