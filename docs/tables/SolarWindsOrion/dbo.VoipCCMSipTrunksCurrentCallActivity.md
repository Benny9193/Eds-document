# View: `dbo.VoipCCMSipTrunksCurrentCallActivity`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SipTrunkId` | int | NO |  |  |
| 2 | `SipTrunkName` | nvarchar(max) | YES |  |  |
| 3 | `VoipCCMMonitoringName` | nvarchar(255) | YES |  |  |
| 4 | `LastPollRecordTime` | datetime | YES |  |  |
| 5 | `CallsActive` | int | NO |  |  |
| 6 | `CallsAttempted` | int | NO |  |  |
| 7 | `CallsCompleted` | int | NO |  |  |
| 8 | `CallsInProgress` | int | NO |  |  |
| 9 | `VideoCallsActive` | int | NO |  |  |
| 10 | `VideoCallsCompleted` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.VoipCCMMonitoring`](dbo.VoipCCMMonitoring.md) | USER_TABLE |
| [`dbo.VoipCCMSipTrunkCallActivity_Detail`](dbo.VoipCCMSipTrunkCallActivity_Detail.md) | USER_TABLE |
| [`dbo.VoipCCMSipTrunks`](dbo.VoipCCMSipTrunks.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoipCCMSipTrunksCurrentCallActivity]
AS

	SELECT
			sipTrunks.SipTrunkId,
			sipTrunks.Name AS SipTrunkName, 
			ccm.CcmName AS VoipCCMMonitoringName, 
			sipTrunks.LastCallActivityPollRecordTimeUtc AS LastPollRecordTime,
			callActivityDetail.CallsActive, 
			callActivityDetail.CallsAttempted, 
			callActivityDetail.CallsCompleted, 
			callActivityDetail.CallsInProgress, 
			callActivityDetail.VideoCallsActive, 
			callActivityDetail.VideoCallsCompleted 
		FROM
			[dbo].[VoipCCMSipTrunks]  sipTrunks
				INNER JOIN [dbo].[VoipCCMSipTrunkCallActivity_Detail] callActivityDetail
					ON sipTrunks.SipTrunkId = callActivityDetail.SipTrunkId 
					AND sipTrunks.VoipCCMMonitoringId = callActivityDetail.VoipCCMMonitoringId
					AND sipTrunks.LastCallActivityPollRecordTimeUtc = callActivityDetail.RecordTimeUtc
				INNER JOIN [dbo].[VoipCCMMonitoring] ccm 
					ON sipTrunks.VoipCCMMonitoringId = ccm.ID
```
