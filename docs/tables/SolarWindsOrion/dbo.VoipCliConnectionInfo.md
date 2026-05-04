# Table: `dbo.VoipCliConnectionInfo`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  | YES |
| 2 | `CredentialID` | int | NO |  |  |
| 3 | `VoipCliConnectionProtocolID` | int | NO |  |  |
| 4 | `Port` | int | NO |  |  |
| 5 | `Timeout` | int | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipCliConnectionInfo_VoipCliConnectionProtocols` | `VoipCliConnectionProtocolID` | [`dbo.VoipCliConnectionProtocols.VoipCliConnectionProtocolID`](dbo.VoipCliConnectionProtocols.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
