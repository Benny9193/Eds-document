# View: `dbo.VoipCCMSipTrunksCurrentStatus`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SipTrunkId` | int | NO |  |  |
| 2 | `SipTrunkGuid` | uniqueidentifier | NO |  |  |
| 3 | `Name` | nvarchar(max) | YES |  |  |
| 4 | `VoipCCMMonitoringId` | int | NO |  |  |
| 5 | `Description` | nvarchar(max) | YES |  |  |
| 6 | `MTPOrigCodec` | varchar(255) | YES |  |  |
| 7 | `DefaultDtmfCapability` | int | YES |  |  |
| 8 | `DevicePool` | varchar(max) | YES |  |  |
| 9 | `Location` | varchar(max) | YES |  |  |
| 10 | `SipProfile` | varchar(max) | YES |  |  |
| 11 | `SecurityProfile` | varchar(max) | YES |  |  |
| 12 | `Status` | int | YES |  |  |
| 13 | `RecordTimeUtc` | datetime | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.VoipCCMSipTrunks`](dbo.VoipCCMSipTrunks.md) | USER_TABLE |
| [`dbo.VoipCCMSipTrunkStatus_Detail`](dbo.VoipCCMSipTrunkStatus_Detail.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.VoipCCMSipTrunksCurrentStatus
AS

	SELECT 
		sipTrunks.SipTrunkId, 
		sipTrunks.SipTrunkGuid, 
		sipTrunks.Name, 
		sipTrunks.VoipCCMMonitoringId, 
		sipTrunks.Description, 
		sipTrunks.MTPOrigCodec,
		sipTrunks.DefaultDtmfCapability, 
		sipTrunks.DevicePool,
		sipTrunks.Location,
		sipTrunks.SipProfile,
		sipTrunks.SecurityProfile, 
		sipTrunksDetail.SipTrunkStatus as Status, 
		sipTrunksDetail.RecordTimeUtc		
    FROM
		dbo.VoipCCMSipTrunks  sipTrunks
			LEFT JOIN dbo.VoipCCMSipTrunkStatus_Detail sipTrunksDetail
				ON sipTrunks.SipTrunkId = sipTrunksDetail.SipTrunkId 
				AND sipTrunks.VoipCCMMonitoringId = sipTrunksDetail.VoipCCMMonitoringId
				AND sipTrunks.LastStatusPollRecordTimeUtc = sipTrunksDetail.RecordTimeUtc
				WHERE sipTrunks.Deleted<>1
```
