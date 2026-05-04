# View: `dbo.VoipPathHopOperationCurrentStats`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | NO |  |  |
| 2 | `RecordTimeUtc` | datetime | YES |  |  |
| 3 | `RecordTime` | datetime | YES |  |  |
| 4 | `VoipPathID` | int | YES |  |  |
| 5 | `HopIndex` | int | YES |  |  |
| 6 | `HopIpAddress` | varchar(15) | YES |  |  |
| 7 | `HopIpAddressV4` | int | YES |  |  |
| 8 | `RoundTripTime` | float | YES |  |  |
| 9 | `Jitter` | float | YES |  |  |
| 10 | `Latency` | float | YES |  |  |
| 11 | `PacketLoss` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipOperationInstances` | USER_TABLE |
| `VoipOperationResults_Detail` | USER_TABLE |
| `VoipPathHopOperationResults_Detail` | USER_TABLE |
| `VoipPathHops` | USER_TABLE |
| `VoipPathOperationResults_Detail` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoipPathHopOperationCurrentStats] AS
SELECT
	i.VoipOperationInstanceID,
    r.RecordTimeUtc,
    DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), r.RecordTimeUtc) as RecordTime,
    pr.VoipPathID,
    ph.HopIndex,
	ph.IpAddress as HopIpAddress,
	ph.IpAddressV4 as HopIpAddressV4,
    phrRtt.Value as RoundTripTime,
    phrJitter.Value as Jitter,
    phrLatency.Value as Latency,
    phrPacketLoss.Value as PacketLoss
FROM VoipOperationInstances i
LEFT JOIN VoipOperationResults_Detail r ON
	i.VoipOperationInstanceID = r.VoipOperationInstanceID AND
	i.LastOperationResultRecordTimeUtc = r.RecordTimeUtc
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
WHERE i.VoipOperationStateID<>6 AND i.Deleted=0
```
