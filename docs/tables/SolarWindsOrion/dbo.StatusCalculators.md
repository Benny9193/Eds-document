# Table: `dbo.StatusCalculators`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `StatusCalculatorID` | smallint | NO |  | YES |
| 2 | `Name` | nvarchar(1024) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.Containers`](dbo.Containers.md) | `StatusCalculatorID` | `StatusCalculatorID` | NO_ACTION | NO_ACTION |

## Indexes

_No non-PK indexes._
