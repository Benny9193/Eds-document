# Table: `dbo.VoipCliConnectionProtocols`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipCliConnectionProtocolID` | int | NO |  | YES |
| 2 | `Name` | nvarchar(100) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VoipCliConnectionInfo`](dbo.VoipCliConnectionInfo.md) | `VoipCliConnectionProtocolID` | `VoipCliConnectionProtocolID` | NO_ACTION | NO_ACTION |

## Indexes

_No non-PK indexes._
