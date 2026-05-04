# Table: `dbo.VoipPaths`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipPathID` | int | NO |  | YES |
| 2 | `Hash` | int | NO |  |  |
| 3 | `MaxHopIndex` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VoipPathHops`](dbo.VoipPathHops.md) | `VoipPathID` | `VoipPathID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipPathOperationResults_Daily`](dbo.VoipPathOperationResults_Daily.md) | `VoipPathID` | `VoipPathID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipPathOperationResults_Detail`](dbo.VoipPathOperationResults_Detail.md) | `VoipPathID` | `VoipPathID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipPathOperationResults_Hourly`](dbo.VoipPathOperationResults_Hourly.md) | `VoipPathID` | `VoipPathID` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `NI_VoipPaths_Hash` | no | NONCLUSTERED | `Hash` |  |
