# Table: `dbo.VoipEngines`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipEngineID` | int | NO |  | YES |
| 2 | `EngineID` | int | NO |  |  |
| 3 | `KeepAlive` | datetime | YES |  |  |
| 4 | `BusinessLayerPort` | int | NO | `((17777))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipEngines_EngineID` | `EngineID` | [`dbo.Engines.EngineID`](dbo.Engines.md) | CASCADE | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
