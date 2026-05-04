# Table: `dbo.VoipGatewayEndpointStats_Detail`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipGatewayEndpointID` | int | NO |  | YES |
| 2 | `RecordTimeUtc` | datetime | NO |  | YES |
| 3 | `Utilization` | float | NO |  |  |
| 4 | `VoiceIncomingUtilization` | float | NO |  |  |
| 5 | `VoiceOutgoingUtilization` | float | NO |  |  |
| 6 | `DataIncomingUtilization` | float | NO |  |  |
| 7 | `DataOutgoingUtilization` | float | NO |  |  |
| 8 | `ChannelCount` | float | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
