# View: `dbo.VoipCCMPhoneStats`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `MAC_Address` | varchar(50) | YES |  |  |
| 3 | `PhoneID` | int | NO |  |  |
| 4 | `RecordTime` | datetime | NO |  |  |
| 5 | `AvgStatus` | int | NO |  |  |
| 6 | `MinStatus` | int | NO |  |  |
| 7 | `MaxStatus` | int | NO |  |  |
| 8 | `Archive` | tinyint | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.VoipCCMMonitoring`](dbo.VoipCCMMonitoring.md) | USER_TABLE |
| [`dbo.VoipCCMPhones`](dbo.VoipCCMPhones.md) | USER_TABLE |
| [`dbo.VoipCCMPhoneStats_Daily`](dbo.VoipCCMPhoneStats_Daily.md) | USER_TABLE |
| [`dbo.VoipCCMPhoneStats_Detail`](dbo.VoipCCMPhoneStats_Detail.md) | USER_TABLE |
| [`dbo.VoipCCMPhoneStats_Hourly`](dbo.VoipCCMPhoneStats_Hourly.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.VoipCCMPhoneStats AS
	SELECT cm.NodeID,cp.MAC_Address, cp.ID AS PhoneID, sd.RecordTime,sd.Status AS AvgStatus,sd.Status AS MinStatus,sd.Status AS MaxStatus,sd.Archive
	FROM dbo.VoipCCMPhoneStats_Detail sd
	INNER JOIN dbo.VoipCCMPhones cp ON cp.ID = sd.VoipCCMPhonesID AND cp.Licensed = 1
	INNER JOIN dbo.VoipCCMMonitoring cm ON cp.VoipCCMMonitoringID = cm.ID
	WHERE cm.Deleted = 0
	
	UNION ALL
	
	SELECT cm.NodeID,cp.MAC_Address, cp.ID AS PhoneID, sh.RecordTime,sh.AvgStatus,sh.MinStatus,sh.MaxStatus,sh.Archive
	FROM dbo.VoipCCMPhoneStats_Hourly sh
	INNER JOIN dbo.VoipCCMPhones cp ON cp.ID = sh.VoipCCMPhonesID AND cp.Licensed = 1
	INNER JOIN dbo.VoipCCMMonitoring cm ON cp.VoipCCMMonitoringID = cm.ID
	WHERE cm.Deleted = 0
	
	UNION ALL

	SELECT cm.NodeID,cp.MAC_Address, cp.ID AS PhoneID, sa.RecordTime,sa.AvgStatus,sa.MinStatus,sa.MaxStatus,sa.Archive
	FROM dbo.VoipCCMPhoneStats_Daily sa
	INNER JOIN dbo.VoipCCMPhones cp ON cp.ID = sa.VoipCCMPhonesID AND cp.Licensed = 1
	INNER JOIN dbo.VoipCCMMonitoring cm ON cp.VoipCCMMonitoringID = cm.ID
	WHERE cm.Deleted = 0
```
