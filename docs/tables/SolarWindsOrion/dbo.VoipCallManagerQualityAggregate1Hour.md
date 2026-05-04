# View: `dbo.VoipCallManagerQualityAggregate1Hour`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `CallManager` | nvarchar(255) | YES |  |  |
| 3 | `MinJitter` | int | YES |  |  |
| 4 | `MinLatency` | int | YES |  |  |
| 5 | `MinMOS` | float | YES |  |  |
| 6 | `MinPacketLoss` | int | YES |  |  |
| 7 | `MaxJitter` | int | YES |  |  |
| 8 | `MaxLatency` | int | YES |  |  |
| 9 | `MaxMOS` | float | YES |  |  |
| 10 | `MaxPacketLoss` | int | YES |  |  |
| 11 | `AvgJitter` | float | YES |  |  |
| 12 | `AvgLatency` | float | YES |  |  |
| 13 | `AvgMOS` | float | YES |  |  |
| 14 | `AvgPacketLoss` | float | YES |  |  |
| 15 | `FailedCallPercentage` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `dbo.IsDroppedcall` | SQL_SCALAR_FUNCTION |
| [`dbo.Nodes`](dbo.Nodes.md) | VIEW |
| [`dbo.VoipCallDetailsAlert`](dbo.VoipCallDetailsAlert.md) | VIEW |
| [`dbo.VoipCCMMonitoring`](dbo.VoipCCMMonitoring.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.VoipCallManagerQualityAggregate1Hour
AS
	SELECT 
		CallMgr.NodeID AS NodeID,
		CallMgr.CallManager as CallManager,
		MIN(CallMgr.Jitter) MinJitter,
		MIN(CallMgr.Latency) AS MinLatency,
		MIN(CallMgr.MOS) AS MinMOS,
		MIN(CallMgr.PacketLoss) AS MinPacketLoss,
		MAX(CallMgr.Jitter) MaxJitter,
		MAX(CallMgr.Latency) AS MaxLatency,
		MAX(CallMgr.MOS) AS MaxMOS,
		MAX(CallMgr.PacketLoss) AS MaxPacketLoss,
		AVG(CAST(CallMgr.Jitter as float)) AS AvgJitter,
		AVG(CAST(CallMgr.Latency as float)) AS AvgLatency,
		AVG(CAST(CallMgr.MOS as float)) AS AvgMOS,
		AVG(CAST(CallMgr.PacketLoss as float)) AS AvgPacketLoss,
		AVG(CAST(CallMgr.FailedCall as float))*100 AS FailedCallPercentage
	FROM (SELECT 
				 Nodes.NodeID AS NodeID
				,Nodes.Caption AS CallManager
				,CallDet.CcmID as CcmID
				,CallDet.CallID as CallID
				,CallDet.Pkid as Pkid
				,CallDet.DateTimeOrigination as DateTimeOrigination
				,CallDet.DateTimeDisconnect as DateTimeDisconnect
				,CallDet.CallingPartyNumber as CallingPartyNumber
				,CallDet.OriginalCalledPartyNumber as OriginalCalledPartyNumber
				,CallDet.FinalCalledPartyNumber as FinalCalledPartyNumber
				,CASE WHEN CallDet.OrigJitter is NULL THEN CallDet.DestJitter WHEN CallDet.DestJitter is NULL THEN CallDet.OrigJitter WHEN CallDet.OrigJitter > CallDet.DestJitter THEN  CallDet.OrigJitter ELSE CallDet.DestJitter END as Jitter
				,CASE WHEN CallDet.OrigLatency is NULL THEN CallDet.DestLatency WHEN CallDet.DestLatency is NULL THEN CallDet.OrigLatency WHEN CallDet.OrigLatency > CallDet.DestLatency THEN CallDet.OrigLatency ELSE CallDet.DestLatency END as Latency
				,CASE WHEN (CallDet.OrigMOS is NULL AND CallDet.DestMOS >=1 AND CallDet.DestMOS <=5) THEN CallDet.DestMOS WHEN (CallDet.DestMOS is NULL AND CallDet.OrigMOS>=1 AND CallDet.OrigMOS <=5 ) THEN CallDet.OrigMOS WHEN (CallDet.OrigMOS  <= CallDet.DestMOS AND CallDet.OrigMOS >= 1 AND CallDet.OrigMOS <= 5)  THEN CallDet.OrigMOS  WHEN (CallDet.DestMOS  <= CallDet.OrigMOS AND CallDet.DestMOS >=1 AND CallDet.DestMOS <= 5)  THEN CallDet.DestMOS ELSE NULL END as MOS
				,CASE WHEN CallDet.OrigPacketLoss is NULL THEN CallDet.DestPacketLoss WHEN CallDet.DestPacketLoss is NULL THEN CallDet.OrigPacketLoss WHEN CallDet.OrigPacketLoss > CallDet.DestPacketLoss THEN CallDet.OrigPacketLoss ELSE CallDet.DestPacketLoss END PacketLoss
				,CASE WHEN (dbo.IsDroppedcall(CallDet.OrigCause_value) = 1 OR dbo.IsDroppedcall(CallDet.DestCause_value) = 1) THEN 1 ELSE 0 END AS FailedCall
			FROM dbo.VoipCallDetailsAlert CallDet
			JOIN dbo.VoipCCMMonitoring CCMMonitoring ON 
				CCMMonitoring.ID=CallDet.CcmID 
			JOIN dbo.Nodes Nodes ON
				Nodes.NodeID=CCMMonitoring.NodeID
			WHERE (DATEADD(MINUTE, DATEDIFF(MINUTE, GETDATE(), GETUTCDATE()),CallDet.DateTimeDisconnect) > DATEADD(MINUTE, -60, GETUTCDATE()))
			) CallMgr 
	GROUP BY CallMgr.NodeID,CallMgr.CallManager
```
