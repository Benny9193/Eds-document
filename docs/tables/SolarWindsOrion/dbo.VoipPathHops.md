# Table: `dbo.VoipPathHops`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipPathID` | int | NO |  | YES |
| 2 | `HopIndex` | int | NO |  | YES |
| 3 | `IpAddressV4` | int | NO |  |  |
| 4 | `IpAddress` | varchar(15) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipPathHops_VoipPathID` | `VoipPathID` | [`dbo.VoipPaths.VoipPathID`](dbo.VoipPaths.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `NI_VoipPathHops_IpAddressV4` | no | NONCLUSTERED | `IpAddressV4` |  |
