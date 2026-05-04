# Table: `dbo.Pollers`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2727

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PollerID` | int | NO |  | YES |
| 2 | `PollerType` | varchar(50) | YES |  |  |
| 3 | `NetObject` | varchar(50) | YES |  |  |
| 4 | `NetObjectType` | varchar(5) | YES |  |  |
| 5 | `NetObjectID` | int | YES |  |  |
| 6 | `Enabled` | bit | NO | `((1))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_Pollers_NetObject` | no | NONCLUSTERED | `NetObject` |  |
| `IX_Pollers_NetObjectID_NetObjectType_Enabled` | no | NONCLUSTERED | `NetObjectID`, `NetObjectType`, `Enabled` |  |
| `IX_Pollers_PollerType` | no | NONCLUSTERED | `PollerType` |  |
