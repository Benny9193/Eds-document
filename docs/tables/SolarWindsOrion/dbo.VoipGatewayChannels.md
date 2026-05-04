# Table: `dbo.VoipGatewayChannels`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipGatewayChannelID` | int | NO |  | YES |
| 2 | `VoipGatewayEndpointID` | int | NO |  |  |
| 3 | `IfName` | nvarchar(100) | YES |  |  |
| 4 | `IfIndex` | int | YES |  |  |
| 5 | `ChannelNumber` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
