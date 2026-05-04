# Table: `dbo.VoipPathOperationResults_Daily`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | NO |  | YES |
| 2 | `RecordTimeUtc` | datetime | NO |  | YES |
| 3 | `VoipPathID` | int | NO |  | YES |
| 4 | `PathCount` | int | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipPathOperationResults_Daily_VoipPathID` | `VoipPathID` | [`dbo.VoipPaths.VoipPathID`](dbo.VoipPaths.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
