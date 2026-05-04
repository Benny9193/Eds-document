# View: `dbo.VoipIcmpPathJitterOperationStats`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | NO |  |  |
| 2 | `RecordTimeUtc` | datetime | NO |  |  |
| 3 | `MinRoundTripTime` | float | YES |  |  |
| 4 | `AvgRoundTripTime` | float | YES |  |  |
| 5 | `MaxRoundTripTime` | float | YES |  |  |
| 6 | `MinJitter` | float | YES |  |  |
| 7 | `AvgJitter` | float | YES |  |  |
| 8 | `MaxJitter` | float | YES |  |  |
| 9 | `MinLatency` | float | YES |  |  |
| 10 | `AvgLatency` | float | YES |  |  |
| 11 | `MaxLatency` | float | YES |  |  |
| 12 | `MinPacketLoss` | float | YES |  |  |
| 13 | `AvgPacketLoss` | float | YES |  |  |
| 14 | `MaxPacketLoss` | float | YES |  |  |
| 15 | `Weight` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipOperationInstances` | USER_TABLE |
| `VoipOperationResults_Daily` | USER_TABLE |
| `VoipOperationResults_Detail` | USER_TABLE |
| `VoipOperationResults_Hourly` | USER_TABLE |
| `VoipOperationTypes` | USER_TABLE |
| `VoipPathHopOperationResults_Daily` | USER_TABLE |
| `VoipPathHopOperationResults_Detail` | USER_TABLE |
| `VoipPathHopOperationResults_Hourly` | USER_TABLE |
| `VoipPathHops` | USER_TABLE |
| `VoipPathOperationResults_Daily` | USER_TABLE |
| `VoipPathOperationResults_Detail` | USER_TABLE |
| `VoipPathOperationResults_Hourly` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoipIcmpPathJitterOperationStats]
AS
WITH [RequiredOperationTypes] ([VoipOperationTypeId])
AS(
	SELECT [VoipOperationTypes].[VoipOperationTypeID] 
			FROM [VoipOperationTypes]
			WHERE [VoipOperationTypes].[OperationType] IN('ICMP Path Jitter')
)
SELECT
	r.VoipOperationInstanceID,
    r.RecordTimeUtc,
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
    CASE WHEN r.VoipOperationStatusID IN (2, 12) THEN 100 ELSE phrPacketLoss.Value END AS MaxPacketLoss,
	voi.Frequency as [Weight]
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
LEFT JOIN VoipOperationInstances voi on r.VoipOperationInstanceID = voi.VoipOperationInstanceID
WHERE voi.VoipOperationTypeID in (SELECT VoipOperationTypeId FROM RequiredOperationTypes)
UNION ALL
SELECT
	r.VoipOperationInstanceID,
    r.RecordTimeUtc,
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
    phrPacketLoss.MaxValue as MaxPacketLoss,
	3600 as Weight -- 1 hour in seconds
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
LEFT JOIN VoipOperationInstances voi on r.VoipOperationInstanceID = voi.VoipOperationInstanceID
WHERE voi.VoipOperationTypeID in (SELECT VoipOperationTypeId FROM RequiredOperationTypes)

UNION ALL
SELECT
	r.VoipOperationInstanceID,
    r.RecordTimeUtc,
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
    phrPacketLoss.MaxValue as MaxPacketLoss,
	86400 as Weight -- 1 day in seconds
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
LEFT JOIN VoipOperationInstances voi on r.VoipOperationInstanceID = voi.VoipOperationInstanceID
WHERE voi.VoipOperationTypeID in (SELECT VoipOperationTypeId FROM RequiredOperationTypes)
```
