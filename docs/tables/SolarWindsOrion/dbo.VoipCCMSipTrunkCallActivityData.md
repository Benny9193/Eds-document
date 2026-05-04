# View: `dbo.VoipCCMSipTrunkCallActivityData`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SipTrunkId` | int | NO |  |  |
| 2 | `RecordTimeUtc` | datetime | NO |  |  |
| 3 | `CallsActive` | int | NO |  |  |
| 4 | `CallsAttempted` | int | NO |  |  |
| 5 | `CallsCompleted` | int | NO |  |  |
| 6 | `CallsInProgress` | int | NO |  |  |
| 7 | `VideoCallsActive` | int | NO |  |  |
| 8 | `VideoCallsCompleted` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.VoipCCMMonitoring`](dbo.VoipCCMMonitoring.md) | USER_TABLE |
| [`dbo.VoipCCMSipTrunkCallActivity_Daily`](dbo.VoipCCMSipTrunkCallActivity_Daily.md) | USER_TABLE |
| [`dbo.VoipCCMSipTrunkCallActivity_Detail`](dbo.VoipCCMSipTrunkCallActivity_Detail.md) | USER_TABLE |
| [`dbo.VoipCCMSipTrunkCallActivity_Hourly`](dbo.VoipCCMSipTrunkCallActivity_Hourly.md) | USER_TABLE |
| [`dbo.VoipCCMSipTrunks`](dbo.VoipCCMSipTrunks.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.VoipCCMSipTrunkCallActivityData
AS
SELECT cad.[SipTrunkId],       
       cad.[RecordTimeUtc],
       cad.[CallsActive],
       cad.[CallsAttempted],
       cad.[CallsCompleted],
       cad.[CallsInProgress], 
       cad.[VideoCallsActive],
       cad.[VideoCallsCompleted]
FROM [dbo].[VoipCCMSipTrunkCallActivity_Detail] cad

INNER JOIN [dbo].[VoipCCMSipTrunks] sip ON cad.[SipTrunkId] = sip.[SipTrunkId]
INNER JOIN [dbo].[VoipCCMMonitoring] ccm ON cad.[VoipCCMMonitoringId] = ccm.[ID]
WHERE ccm.[Deleted] = 0 AND sip.[Deleted] = 0

UNION ALL
SELECT cah.[SipTrunkId],      
       cah.[RecordTimeUtc],
       cah.[CallsActive],
       cah.[CallsAttempted],
       cah.[CallsCompleted],
       cah.[CallsInProgress], 
       cah.[VideoCallsActive],
       cah.[VideoCallsCompleted]
FROM [dbo].[VoipCCMSipTrunkCallActivity_Hourly] cah

INNER JOIN [dbo].[VoipCCMSipTrunks] sip ON cah.[SipTrunkId] = sip.[SipTrunkId]
INNER JOIN [dbo].[VoipCCMMonitoring] ccm ON cah.[VoipCCMMonitoringId] = ccm.[ID]
WHERE ccm.[Deleted] = 0 AND sip.[Deleted] = 0

UNION ALL
SELECT cada.[SipTrunkId],      
       cada.[RecordTimeUtc],
       cada.[CallsActive],
       cada.[CallsAttempted],
       cada.[CallsCompleted],
       cada.[CallsInProgress], 
       cada.[VideoCallsActive],
       cada.[VideoCallsCompleted]
FROM [dbo].[VoipCCMSipTrunkCallActivity_Daily] cada
INNER JOIN [dbo].[VoipCCMSipTrunks] sip ON cada.[SipTrunkId] = sip.[SipTrunkId]
INNER JOIN [dbo].[VoipCCMMonitoring] ccm ON cada.[VoipCCMMonitoringId] = ccm.[ID]
WHERE ccm.[Deleted] = 0 AND sip.[Deleted] = 0
```
