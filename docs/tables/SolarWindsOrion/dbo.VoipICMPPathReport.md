# View: `dbo.VoipICMPPathReport`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SummaryDate` | datetime | YES |  |  |
| 2 | `OperationID` | int | NO |  |  |
| 3 | `OperationName` | nvarchar(max) | YES |  |  |
| 4 | `OperationTypeName` | nvarchar(100) | YES |  |  |
| 5 | `MAXofRecordTime` | datetime | YES |  |  |
| 6 | `PathID` | int | YES |  |  |
| 7 | `SUMofPathCount` | int | YES |  |  |
| 8 | `MAXofPathLength` | int | YES |  |  |
| 9 | `PathMaxHopIndex` | int | YES |  |  |
| 10 | `HopIndex` | int | YES |  |  |
| 11 | `MINofMinRoundTripTime` | float | YES |  |  |
| 12 | `AVERAGEofAvgRoundTripTime` | float | YES |  |  |
| 13 | `MAXofMaxRoundTripTime` | float | YES |  |  |
| 14 | `MINofMinJitter` | float | YES |  |  |
| 15 | `AVERAGEofAvgJitter` | float | YES |  |  |
| 16 | `MAXofMaxJitter` | float | YES |  |  |
| 17 | `MINofMinLatency` | float | YES |  |  |
| 18 | `AVERAGEofAvgLatency` | float | YES |  |  |
| 19 | `MAXofMaxLatency` | float | YES |  |  |
| 20 | `MINofMinPacketLoss` | float | YES |  |  |
| 21 | `AVERAGEofAvgPacketLoss` | float | YES |  |  |
| 22 | `MAXofMaxPacketLoss` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoIPOperationCurrentStats` | VIEW |
| `VoipPathHopOperationResults` | VIEW |
| `VoipPaths` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoipICMPPathReport]
AS

SELECT
	SummaryDate,
	OperationID,
	OperationName,
	OperationTypeName,
	MAXofRecordTime,
	PathID,
	SUMofPathCount,
	MAXofPathLength,
	PathMaxHopIndex,
	HopIndex,
	MINofMinRoundTripTime,
	AVERAGEofAvgRoundTripTime,
	MAXofMaxRoundTripTime,
	MINofMinJitter,
	AVERAGEofAvgJitter,
	MAXofMaxJitter,
	MINofMinLatency,
	AVERAGEofAvgLatency,
	MAXofMaxLatency,
	MINofMinPacketLoss,
	AVERAGEofAvgPacketLoss,
	MAXofMaxPacketLoss
FROM
(
SELECT TOP 20000
	Convert(DateTime,Floor(Cast((DateTime) AS Float)),0) AS SummaryDate,
	CurStat.VoipOperationInstanceID AS OperationID,
	CurStat.OperationTypeName       AS OperationTypeName,
	CurStat.OperationName           AS OperationName,
	MAX(OpRes.RecordTimeUtc)        AS MAXofRecordTime,
	OpRes.VoipPathID                AS PathID,
	SUM(OpRes.PathCount)            AS SUMofPathCount,
	MAX(ISNULL(MaxHopIndex+1,0))    AS MAXofPathLength,
	Paths.MaxHopIndex               AS PathMaxHopIndex,
	OpRes.HopIndex                  AS HopIndex,
	MIN(OpRes.MinRoundTripTime)     AS MINofMinRoundTripTime,
	AVG(OpRes.AvgRoundTripTime)     AS AVERAGEofAvgRoundTripTime,
	MAX(OpRes.MaxRoundTripTime)     AS MAXofMaxRoundTripTime,
	MIN(OpRes.MinJitter)            AS MINofMinJitter,
	AVG(OpRes.AvgJitter)            AS AVERAGEofAvgJitter,
	MAX(OpRes.MaxJitter)            AS MAXofMaxJitter,
	MIN(OpRes.MinLatency)           AS MINofMinLatency,
	AVG(OpRes.AvgLatency)           AS AVERAGEofAvgLatency,
	MAX(OpRes.MaxLatency)           AS MAXofMaxLatency,
	MIN(OpRes.MinPacketLoss)        AS MINofMinPacketLoss,
	AVG(OpRes.AvgPacketLoss)        AS AVERAGEofAvgPacketLoss,
	MAX(OpRes.MaxPacketLoss)        AS MAXofMaxPacketLoss

FROM VoipPaths Paths

INNER JOIN VoipPathHopOperationResults OpRes ON Paths.VoipPathID = OpRes.VoipPathID
INNER JOIN VoIPOperationCurrentStats CurStat ON OpRes.VoipOperationInstanceID = CurStat.VoipOperationInstanceID

WHERE OpRes.HopIndex = Paths.MaxHopIndex

GROUP BY
	Convert(DateTime,Floor(Cast((DateTime) AS Float)),0),
	CurStat.VoipOperationInstanceID,
	CurStat.OperationName,
	OpRes.VoipPathID,
	Paths.MaxHopIndex,
	OpRes.HopIndex,
	CurStat.OperationTypeName

ORDER BY SummaryDate DESC, OperationID ASC, MAXofRecordTime DESC

) as r
```
