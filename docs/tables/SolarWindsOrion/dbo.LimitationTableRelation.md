# Table: `dbo.LimitationTableRelation`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 51

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Module` | nvarchar(25) | NO |  |  |
| 2 | `Table` | nvarchar(50) | NO |  |  |
| 3 | `TableColumn` | nvarchar(50) | NO |  |  |
| 4 | `ParentTable` | nvarchar(50) | NO |  |  |
| 5 | `ParentTableColumn` | nvarchar(50) | NO |  |  |
| 6 | `NoNulls` | bit | NO | `((0))` |  |
| 7 | `AlwaysInject` | bit | NO | `((0))` |  |
| 8 | `IsEntityModel` | bit | YES | `(NULL)` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
