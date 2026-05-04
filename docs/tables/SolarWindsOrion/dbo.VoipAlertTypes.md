# Table: `dbo.VoipAlertTypes`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipAlertTypeID` | int | NO |  | YES |
| 2 | `AlertDefID` | uniqueidentifier | NO |  |  |
| 3 | `ActiveObject` | nvarchar(50) | NO |  |  |
| 4 | `ObjectType` | nvarchar(50) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
