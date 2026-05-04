# View: `dbo.VoipCCMStats`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `RecordTime` | datetime | NO |  |  |
| 3 | `Archive` | tinyint | NO |  |  |
| 4 | `MinRegisteredPhones` | int | YES |  |  |
| 5 | `AvgRegisteredPhones` | int | YES |  |  |
| 6 | `MaxRegisteredPhones` | int | YES |  |  |
| 7 | `MinUnRegisteredPhones` | int | YES |  |  |
| 8 | `AvgUnRegisteredPhones` | int | YES |  |  |
| 9 | `MaxUnRegisteredPhones` | int | YES |  |  |
| 10 | `MinRejectedPhones` | int | YES |  |  |
| 11 | `AvgRejectedPhones` | int | YES |  |  |
| 12 | `MaxRejectedPhones` | int | YES |  |  |
| 13 | `MinRegisteredGateways` | int | YES |  |  |
| 14 | `AvgRegisteredGateways` | int | YES |  |  |
| 15 | `MaxRegisteredGateways` | int | YES |  |  |
| 16 | `MinUnRegisteredGateways` | int | YES |  |  |
| 17 | `AvgUnRegisteredGateways` | int | YES |  |  |
| 18 | `MaxUnRegisteredGateways` | int | YES |  |  |
| 19 | `MinRejectedGateways` | int | YES |  |  |
| 20 | `AvgRejectedGateways` | int | YES |  |  |
| 21 | `MaxRejectedGateways` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.VoipCCMMonitoring`](dbo.VoipCCMMonitoring.md) | USER_TABLE |
| [`dbo.VoipCCMStats_Daily`](dbo.VoipCCMStats_Daily.md) | USER_TABLE |
| [`dbo.VoipCCMStats_DailyData`](dbo.VoipCCMStats_DailyData.md) | USER_TABLE |
| [`dbo.VoipCCMStats_Detail`](dbo.VoipCCMStats_Detail.md) | USER_TABLE |
| [`dbo.VoipCCMStats_DetailData`](dbo.VoipCCMStats_DetailData.md) | USER_TABLE |
| [`dbo.VoipCCMStats_Hourly`](dbo.VoipCCMStats_Hourly.md) | USER_TABLE |
| [`dbo.VoipCCMStats_HourlyData`](dbo.VoipCCMStats_HourlyData.md) | USER_TABLE |
| [`dbo.VoipCCMStatsType`](dbo.VoipCCMStatsType.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.VoipCallManagerStats`](dbo.VoipCallManagerStats.md) | VIEW |

## Definition

```sql
CREATE VIEW dbo.VoipCCMStats AS
	SELECT cm.NodeID,sd.RecordTime,sd.Archive,
	dd01.Value AS MinRegisteredPhones, dd01.Value AS AvgRegisteredPhones, dd01.Value AS MaxRegisteredPhones,
	dd02.Value AS MinUnRegisteredPhones, dd02.Value AS AvgUnRegisteredPhones, dd02.Value AS MaxUnRegisteredPhones,
	dd03.Value AS MinRejectedPhones, dd03.Value AS AvgRejectedPhones, dd03.Value AS MaxRejectedPhones,
	dd04.Value AS MinRegisteredGateways, dd04.Value AS AvgRegisteredGateways, dd04.Value AS MaxRegisteredGateways,
	dd05.Value AS MinUnRegisteredGateways, dd05.Value AS AvgUnRegisteredGateways, dd05.Value AS MaxUnRegisteredGateways,
	dd06.Value AS MinRejectedGateways, dd06.Value AS AvgRejectedGateways, dd06.Value AS MaxRejectedGateways
	FROM dbo.VoipCCMMonitoring cm
	INNER JOIN dbo.VoipCCMStats_Detail sd ON cm.ID = sd.VoipCCMMonitoringID
	LEFT JOIN dbo.VoipCCMStats_DetailData dd01 ON sd.ID = dd01.VoipCCMStats_DetailID AND 
													dd01.VoipCCMStatsTypeID = (SELECT st.ID FROM dbo.VoipCCMStatsType st WHERE st.Code = 'REGPH')
	LEFT JOIN dbo.VoipCCMStats_DetailData dd02 ON sd.ID = dd02.VoipCCMStats_DetailID AND 
													dd02.VoipCCMStatsTypeID = (SELECT st.ID FROM dbo.VoipCCMStatsType st WHERE st.Code = 'UNREGPH')
	LEFT JOIN dbo.VoipCCMStats_DetailData dd03 ON sd.ID = dd03.VoipCCMStats_DetailID AND 
													dd03.VoipCCMStatsTypeID = (SELECT st.ID FROM dbo.VoipCCMStatsType st WHERE st.Code = 'REJPH')
	LEFT JOIN dbo.VoipCCMStats_DetailData dd04 ON sd.ID = dd04.VoipCCMStats_DetailID AND 
													dd04.VoipCCMStatsTypeID = (SELECT st.ID FROM dbo.VoipCCMStatsType st WHERE st.Code = 'REGGAT')
	LEFT JOIN dbo.VoipCCMStats_DetailData dd05 ON sd.ID = dd05.VoipCCMStats_DetailID AND 
													dd05.VoipCCMStatsTypeID = (SELECT st.ID FROM dbo.VoipCCMStatsType st WHERE st.Code = 'UNREGGAT')
	LEFT JOIN dbo.VoipCCMStats_DetailData dd06 ON sd.ID = dd06.VoipCCMStats_DetailID AND 
													dd06.VoipCCMStatsTypeID = (SELECT st.ID FROM dbo.VoipCCMStatsType st WHERE st.Code = 'REJGAT')
	WHERE cm.Deleted != 1
	
	UNION ALL
	
	SELECT cm.NodeID,sd.RecordTime,sd.Archive,
	dd01.MinValue AS MinRegisteredPhones, dd01.AvgValue AS AvgRegisteredPhones, dd01.MaxValue AS MaxRegisteredPhones,
	dd02.MinValue AS MinUnRegisteredPhones, dd02.AvgValue AS AvgUnRegisteredPhones, dd02.MaxValue AS MaxUnRegisteredPhones,
	dd03.MinValue AS MinRejectedPhones, dd03.AvgValue AS AvgRejectedPhones, dd03.MaxValue AS MaxRejectedPhones,
	dd04.MinValue AS MinRegisteredGateways, dd04.AvgValue AS AvgRegisteredGateways, dd04.MaxValue AS MaxRegisteredGateways,
	dd05.MinValue AS MinUnRegisteredGateways, dd05.AvgValue AS AvgUnRegisteredGateways, dd05.MaxValue AS MaxUnRegisteredGateways,
	dd06.MinValue AS MinRejectedGateways, dd06.AvgValue AS AvgRejectedGateways, dd06.MaxValue AS MaxRejectedGateways
	FROM dbo.VoipCCMMonitoring cm
	INNER JOIN dbo.VoipCCMStats_Hourly sd ON cm.ID = sd.VoipCCMMonitoringID
	LEFT JOIN dbo.VoipCCMStats_HourlyData dd01 ON sd.ID = dd01.VoipCCMStats_HourlyID AND 
													dd01.VoipCCMStatsTypeID = (SELECT st.ID FROM dbo.VoipCCMStatsType st WHERE st.Code = 'REGPH')
	LEFT JOIN dbo.VoipCCMStats_HourlyData dd02 ON sd.ID = dd02.VoipCCMStats_HourlyID AND 
													dd02.VoipCCMStatsTypeID = (SELECT st.ID FROM dbo.VoipCCMStatsType st WHERE st.Code = 'UNREGPH')
	LEFT JOIN dbo.VoipCCMStats_HourlyData dd03 ON sd.ID = dd03.VoipCCMStats_HourlyID AND 
													dd03.VoipCCMStatsTypeID = (SELECT st.ID FROM dbo.VoipCCMStatsType st WHERE st.Code = 'REJPH')
	LEFT JOIN dbo.VoipCCMStats_HourlyData dd04 ON sd.ID = dd04.VoipCCMStats_HourlyID AND 
													dd04.VoipCCMStatsTypeID = (SELECT st.ID FROM dbo.VoipCCMStatsType st WHERE st.Code = 'REGGAT')
	LEFT JOIN dbo.VoipCCMStats_HourlyData dd05 ON sd.ID = dd05.VoipCCMStats_HourlyID AND 
													dd05.VoipCCMStatsTypeID = (SELECT st.ID FROM dbo.VoipCCMStatsType st WHERE st.Code = 'UNREGGAT')
	LEFT JOIN dbo.VoipCCMStats_HourlyData dd06 ON sd.ID = dd06.VoipCCMStats_HourlyID AND 
													dd06.VoipCCMStatsTypeID = (SELECT st.ID FROM dbo.VoipCCMStatsType st WHERE st.Code = 'REJGAT')
	WHERE cm.Deleted != 1
	
	UNION ALL

	SELECT cm.NodeID,sd.RecordTime,sd.Archive,
	dd01.MinValue AS MinRegisteredPhones, dd01.AvgValue AS AvgRegisteredPhones, dd01.MaxValue AS MaxRegisteredPhones,
	dd02.MinValue AS MinUnRegisteredPhones, dd02.AvgValue AS AvgUnRegisteredPhones, dd02.MaxValue AS MaxUnRegisteredPhones,
	dd03.MinValue AS MinRejectedPhones, dd03.AvgValue AS AvgRejectedPhones, dd03.MaxValue AS MaxRejectedPhones,
	dd04.MinValue AS MinRegisteredGateways, dd04.AvgValue AS AvgRegisteredGateways, dd04.MaxValue AS MaxRegisteredGateways,
	dd05.MinValue AS MinUnRegisteredGateways, dd05.AvgValue AS AvgUnRegisteredGateways, dd05.MaxValue AS MaxUnRegisteredGateways,
	dd06.MinValue AS MinRejectedGateways, dd06.AvgValue AS AvgRejectedGateways, dd06.MaxValue AS MaxRejectedGateways
	FROM dbo.VoipCCMMonitoring cm
	INNER JOIN dbo.VoipCCMStats_Daily sd ON cm.ID = sd.VoipCCMMonitoringID
	LEFT JOIN dbo.VoipCCMStats_DailyData dd01 ON sd.ID = dd01.VoipCCMStats_DailyID AND 
													dd01.VoipCCMStatsTypeID = (SELECT st.ID FROM dbo.VoipCCMStatsType st WHERE st.Code = 'REGPH')
	LEFT JOIN dbo.VoipCCMStats_DailyData dd02 ON sd.ID = dd02.VoipCCMStats_DailyID AND 
													dd02.VoipCCMStatsTypeID = (SELECT st.ID FROM dbo.VoipCCMStatsType st WHERE st.Code = 'UNREGPH')
	LEFT JOIN dbo.VoipCCMStats_DailyData dd03 ON sd.ID = dd03.VoipCCMStats_DailyID AND 
													dd03.VoipCCMStatsTypeID = (SELECT st.ID FROM dbo.VoipCCMStatsType st WHERE st.Code = 'REJPH')
	LEFT JOIN dbo.VoipCCMStats_DailyData dd04 ON sd.ID = dd04.VoipCCMStats_DailyID AND 
													dd04.VoipCCMStatsTypeID = (SELECT st.ID FROM dbo.VoipCCMStatsType st WHERE st.Code = 'REGGAT')
	LEFT JOIN dbo.VoipCCMStats_DailyData dd05 ON sd.ID = dd05.VoipCCMStats_DailyID AND 
													dd05.VoipCCMStatsTypeID = (SELECT st.ID FROM dbo.VoipCCMStatsType st WHERE st.Code = 'UNREGGAT')
	LEFT JOIN dbo.VoipCCMStats_DailyData dd06 ON sd.ID = dd06.VoipCCMStats_DailyID AND 
													dd06.VoipCCMStatsTypeID = (SELECT st.ID FROM dbo.VoipCCMStatsType st WHERE st.Code = 'REJGAT')
	WHERE cm.Deleted != 1
```
