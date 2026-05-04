# View: `dbo.VoipCCMSipTrunkAvailability`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SipTrunkId` | int | YES |  |  |
| 2 | `AvailabilityPercents` | decimal(5,2) | YES |  |  |
| 3 | `RecordTimeUtc` | datetime | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipCCMSipTrunkStatus_Daily` | USER_TABLE |
| `VoipCCMSipTrunkStatus_Detail` | USER_TABLE |
| `VoipCCMSipTrunkStatus_Hourly` | USER_TABLE |
| [`dbo.VoipCCMMonitoring`](dbo.VoipCCMMonitoring.md) | USER_TABLE |
| [`dbo.VoipCCMSipTrunks`](dbo.VoipCCMSipTrunks.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoipCCMSipTrunkAvailability]
AS
	-- The duration percents of each table should be calculated as 
	-- (durationInMunutes * 100) / minutes
	-- So for CTE_TrunkAvailabilityFromHourly we use (durationInMunutes * 100) / 60 minutes = durationInMunutes / 0.6
	-- So for CTE_TrunkAvailabilityFromDaily we use (durationInMunutes * 100) / (60 minutes * 24) = durationInMunutes / 14.4
	
	WITH CTE_TrunkAvailabilityFromHourly AS(
		SELECT 
			sts_h.[SipTrunkId],
			CAST((sts_h.[StatusRegistered_DurationInMinutes] + sts_h.[StatusPartiallyRegistered_DurationInMinutes]) / 0.6 AS decimal(5,2)) AS [AvailabilityPercents],
			sts_h.[RecordTimeUtc]
		FROM VoipCCMSipTrunkStatus_Hourly sts_h
		INNER JOIN [dbo].[VoipCCMSipTrunks] sip ON sts_h.[SipTrunkId] = sip.[SipTrunkId]
		INNER JOIN [dbo].[VoipCCMMonitoring] ccm ON sts_h.[VoipCCMMonitoringId] = ccm.[ID]
		WHERE ccm.[Deleted] = 0 AND sip.[Deleted] = 0
	),
    CTE_TrunkAvailabilityFromDaily AS (
		SELECT 
			sts_d.[SipTrunkId],
			CAST((sts_d.[StatusRegistered_DurationInMinutes] + sts_d.[StatusPartiallyRegistered_DurationInMinutes]) / 14.4 AS decimal(5,2)) AS [AvailabilityPercents],
			sts_d.[RecordTimeUtc]
		FROM VoipCCMSipTrunkStatus_Daily sts_d
		INNER JOIN [dbo].[VoipCCMSipTrunks] sip ON sts_d.[SipTrunkId] = sip.[SipTrunkId]
		INNER JOIN [dbo].[VoipCCMMonitoring] ccm ON sts_d.[VoipCCMMonitoringId] = ccm.[ID]
		WHERE ccm.[Deleted] = 0 AND sip.[Deleted] = 0
	)

	SELECT 
		sts_d.[SipTrunkId],
		CAST(CASE WHEN sts_d.[SipTrunkStatus] = 1 OR sts_d.[SipTrunkStatus] = 4 THEN 100 ELSE 0 END AS decimal(5,2)) AS [AvailabilityPercents],
		sts_d.[RecordTimeUtc]
	FROM VoipCCMSipTrunkStatus_Detail sts_d
	INNER JOIN [dbo].[VoipCCMSipTrunks] sip ON sts_d.[SipTrunkId] = sip.[SipTrunkId]
	INNER JOIN [dbo].[VoipCCMMonitoring] ccm ON sts_d.[VoipCCMMonitoringId] = ccm.[ID]
	WHERE ccm.[Deleted] = 0 AND sip.[Deleted] = 0

	UNION ALL

	SELECT 
		tafh.[SipTrunkId],
		CASE WHEN tafh.[AvailabilityPercents] > 100 THEN 100 ELSE tafh.[AvailabilityPercents] END,
		tafh.[RecordTimeUtc]
	FROM CTE_TrunkAvailabilityFromHourly tafh

	UNION ALL

	SELECT 
		tafd.[SipTrunkId],
		CASE WHEN tafd.[AvailabilityPercents] > 100 THEN 100 ELSE tafd.[AvailabilityPercents] END,
		tafd.[RecordTimeUtc]
	FROM CTE_TrunkAvailabilityFromDaily tafd
```
