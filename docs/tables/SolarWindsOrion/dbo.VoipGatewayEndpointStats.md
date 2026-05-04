# View: `dbo.VoipGatewayEndpointStats`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipGatewayEndpointID` | int | NO |  |  |
| 2 | `RecordTimeUtc` | datetime | NO |  |  |
| 3 | `MinUtilization` | float | NO |  |  |
| 4 | `MaxUtilization` | float | NO |  |  |
| 5 | `AvgUtilization` | float | NO |  |  |
| 6 | `MinVoiceIncomingUtilization` | float | NO |  |  |
| 7 | `MaxVoiceIncomingUtilization` | float | NO |  |  |
| 8 | `AvgVoiceIncomingUtilization` | float | NO |  |  |
| 9 | `MinVoiceOutgoingUtilization` | float | NO |  |  |
| 10 | `MaxVoiceOutgoingUtilization` | float | NO |  |  |
| 11 | `AvgVoiceOutgoingUtilization` | float | NO |  |  |
| 12 | `MinDataIncomingUtilization` | float | NO |  |  |
| 13 | `MaxDataIncomingUtilization` | float | NO |  |  |
| 14 | `AvgDataIncomingUtilization` | float | NO |  |  |
| 15 | `MinDataOutgoingUtilization` | float | NO |  |  |
| 16 | `MaxDataOutgoingUtilization` | float | NO |  |  |
| 17 | `AvgDataOutgoingUtilization` | float | NO |  |  |
| 18 | `MinChannelCount` | float | NO |  |  |
| 19 | `MaxChannelCount` | float | NO |  |  |
| 20 | `AvgChannelCount` | float | NO |  |  |
| 21 | `DateTime` | datetime | YES |  |  |
| 22 | `RecordTime` | datetime | YES |  |  |
| 23 | `PercentMinUtilization` | float | NO |  |  |
| 24 | `PercentMaxUtilization` | float | NO |  |  |
| 25 | `PercentAvgUtilization` | float | NO |  |  |
| 26 | `PercentMinVoiceIncomingUtilization` | float | NO |  |  |
| 27 | `PercentMaxVoiceIncomingUtilization` | float | NO |  |  |
| 28 | `PercentAvgVoiceIncomingUtilization` | float | NO |  |  |
| 29 | `PercentMinVoiceOutgoingUtilization` | float | NO |  |  |
| 30 | `PercentMaxVoiceOutgoingUtilization` | float | NO |  |  |
| 31 | `PercentAvgVoiceOutgoingUtilization` | float | NO |  |  |
| 32 | `PercentMinDataIncomingUtilization` | float | NO |  |  |
| 33 | `PercentMaxDataIncomingUtilization` | float | NO |  |  |
| 34 | `PercentAvgDataIncomingUtilization` | float | NO |  |  |
| 35 | `PercentMinDataOutgoingUtilization` | float | NO |  |  |
| 36 | `PercentMaxDataOutgoingUtilization` | float | NO |  |  |
| 37 | `PercentAvgDataOutgoingUtilization` | float | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.VoipGatewayEndpointStats_Daily`](dbo.VoipGatewayEndpointStats_Daily.md) | USER_TABLE |
| [`dbo.VoipGatewayEndpointStats_Detail`](dbo.VoipGatewayEndpointStats_Detail.md) | USER_TABLE |
| [`dbo.VoipGatewayEndpointStats_Hourly`](dbo.VoipGatewayEndpointStats_Hourly.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.PRIGatewayUtilization`](dbo.PRIGatewayUtilization.md) | VIEW |
| [`dbo.VoipGatewayDetailStats`](dbo.VoipGatewayDetailStats.md) | VIEW |
| [`dbo.VoipGatewayEndpointAlertsAggregateLast1Hour`](dbo.VoipGatewayEndpointAlertsAggregateLast1Hour.md) | VIEW |
| [`dbo.VoipGatewayEndpointCurrentStats`](dbo.VoipGatewayEndpointCurrentStats.md) | VIEW |
| [`dbo.VoipGatewayEndpointDetailStats`](dbo.VoipGatewayEndpointDetailStats.md) | VIEW |

## Definition

```sql
CREATE VIEW [dbo].[VoipGatewayEndpointStats]
AS
SELECT        VoipGatewayEndpointID, RecordTimeUtc, MinUtilization, MaxUtilization, AvgUtilization, MinVoiceIncomingUtilization, MaxVoiceIncomingUtilization, 
                         AvgVoiceIncomingUtilization, MinVoiceOutgoingUtilization, MaxVoiceOutgoingUtilization, AvgVoiceOutgoingUtilization, MinDataIncomingUtilization, 
                         MaxDataIncomingUtilization, AvgDataIncomingUtilization, MinDataOutgoingUtilization, MaxDataOutgoingUtilization, AvgDataOutgoingUtilization, MinChannelCount, 
                         MaxChannelCount, AvgChannelCount, DATEADD(minute, DATEDIFF(minute, GETUTCDATE(), GETDATE()), RecordTimeUtc) AS DateTime, DATEADD(minute, 
                         DATEDIFF(minute, GETUTCDATE(), GETDATE()), RecordTimeUtc) AS RecordTime, ISNULL(100 * MinUtilization / NULLIF (MinChannelCount, 0), 0) 
                         AS PercentMinUtilization, ISNULL(100 * MaxUtilization / NULLIF (MaxChannelCount, 0), 0) AS PercentMaxUtilization, 
                         ISNULL(100 * AvgUtilization / NULLIF (AvgChannelCount, 0), 0) AS PercentAvgUtilization, ISNULL(100 * MinVoiceIncomingUtilization / NULLIF (MinChannelCount, 0), 0)
                          AS PercentMinVoiceIncomingUtilization, ISNULL(100 * MaxVoiceIncomingUtilization / NULLIF (MaxChannelCount, 0), 0) AS PercentMaxVoiceIncomingUtilization, 
                         ISNULL(100 * AvgVoiceIncomingUtilization / NULLIF (AvgChannelCount, 0), 0) AS PercentAvgVoiceIncomingUtilization, 
                         ISNULL(100 * MinVoiceOutgoingUtilization / NULLIF (MinChannelCount, 0), 0) AS PercentMinVoiceOutgoingUtilization, 
                         ISNULL(100 * MaxVoiceOutgoingUtilization / NULLIF (MaxChannelCount, 0), 0) AS PercentMaxVoiceOutgoingUtilization, 
                         ISNULL(100 * AvgVoiceOutgoingUtilization / NULLIF (AvgChannelCount, 0), 0) AS PercentAvgVoiceOutgoingUtilization, 
                         ISNULL(100 * MinDataIncomingUtilization / NULLIF (MinChannelCount, 0), 0) AS PercentMinDataIncomingUtilization, 
                         ISNULL(100 * MaxDataIncomingUtilization / NULLIF (MaxChannelCount, 0), 0) AS PercentMaxDataIncomingUtilization, 
                         ISNULL(100 * AvgDataIncomingUtilization / NULLIF (AvgChannelCount, 0), 0) AS PercentAvgDataIncomingUtilization, 
                         ISNULL(100 * MinDataOutgoingUtilization / NULLIF (MinChannelCount, 0), 0) AS PercentMinDataOutgoingUtilization, 
                         ISNULL(100 * MaxDataOutgoingUtilization / NULLIF (MaxChannelCount, 0), 0) AS PercentMaxDataOutgoingUtilization, 
                         ISNULL(100 * AvgDataOutgoingUtilization / NULLIF (AvgChannelCount, 0), 0) AS PercentAvgDataOutgoingUtilization
FROM            (SELECT        VoipGatewayEndpointID, RecordTimeUtc, Utilization AS MinUtilization, Utilization AS MaxUtilization, Utilization AS AvgUtilization, 
                                                    VoiceIncomingUtilization AS MinVoiceIncomingUtilization, VoiceIncomingUtilization AS MaxVoiceIncomingUtilization, 
                                                    VoiceIncomingUtilization AS AvgVoiceIncomingUtilization, VoiceOutgoingUtilization AS MinVoiceOutgoingUtilization, 
                                                    VoiceOutgoingUtilization AS MaxVoiceOutgoingUtilization, VoiceOutgoingUtilization AS AvgVoiceOutgoingUtilization, 
                                                    DataIncomingUtilization AS MinDataIncomingUtilization, DataIncomingUtilization AS MaxDataIncomingUtilization, 
                                                    DataIncomingUtilization AS AvgDataIncomingUtilization, DataOutgoingUtilization AS MinDataOutgoingUtilization, 
                                                    DataOutgoingUtilization AS MaxDataOutgoingUtilization, DataOutgoingUtilization AS AvgDataOutgoingUtilization, ChannelCount AS MinChannelCount, 
                                                    ChannelCount AS MaxChannelCount, ChannelCount AS AvgChannelCount
                          FROM            dbo.VoipGatewayEndpointStats_Detail
                          UNION
                          SELECT        VoipGatewayEndpointID, RecordTimeUtc, MinUtilization, MaxUtilization, AvgUtilization, MinVoiceIncomingUtilization, MaxVoiceIncomingUtilization, 
                                                   AvgVoiceIncomingUtilization, MinVoiceOutgoingUtilization, MaxVoiceOutgoingUtilization, AvgVoiceOutgoingUtilization, MinDataIncomingUtilization, 
                                                   MaxDataIncomingUtilization, AvgDataIncomingUtilization, MinDataOutgoingUtilization, MaxDataOutgoingUtilization, AvgDataOutgoingUtilization, 
                                                   MinChannelCount, MaxChannelCount, AvgChannelCount
                          FROM            dbo.VoipGatewayEndpointStats_Hourly
                          UNION
                          SELECT        VoipGatewayEndpointID, RecordTimeUtc, MinUtilization, MaxUtilization, AvgUtilization, MinVoiceIncomingUtilization, MaxVoiceIncomingUtilization, 
                                                   AvgVoiceIncomingUtilization, MinVoiceOutgoingUtilization, MaxVoiceOutgoingUtilization, AvgVoiceOutgoingUtilization, MinDataIncomingUtilization, 
                                                   MaxDataIncomingUtilization, AvgDataIncomingUtilization, MinDataOutgoingUtilization, MaxDataOutgoingUtilization, AvgDataOutgoingUtilization, 
                                                   MinChannelCount, MaxChannelCount, AvgChannelCount
                          FROM            dbo.VoipGatewayEndpointStats_Daily) AS EndPointStats
```
