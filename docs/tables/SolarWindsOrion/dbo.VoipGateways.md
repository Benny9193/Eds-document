# Table: `dbo.VoipGateways`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipGatewayID` | int | NO |  | YES |
| 2 | `NodeID` | int | NO |  |  |
| 3 | `Status` | int | NO |  |  |
| 4 | `LastResultRecordTimeUtc` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_VoipGateways_NodeID` | no | NONCLUSTERED | `NodeID` |  |
