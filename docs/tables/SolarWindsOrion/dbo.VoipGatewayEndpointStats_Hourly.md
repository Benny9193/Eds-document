# Table: `dbo.VoipGatewayEndpointStats_Hourly`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipGatewayEndpointID` | int | NO |  | YES |
| 2 | `RecordTimeUtc` | datetime | NO |  | YES |
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

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
