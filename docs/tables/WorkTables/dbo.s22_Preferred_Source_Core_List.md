# Table: `dbo.s22 Preferred Source Core List`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 26

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Preferred Source Letter Code` | nvarchar(255) | YES |  |  |
| 2 | `Staples Stock Number` | float | YES |  |  |
| 3 | `Preferred Source Item/Stock Number` | nvarchar(255) | YES |  |  |
| 4 | `Item Description` | nvarchar(max) | YES |  |  |
| 5 | `Preferred Source Package Size` | nvarchar(255) | YES |  |  |
| 6 | `Preferred Source UOM` | nvarchar(255) | YES |  |  |
| 7 | `2022 Net Price` | money | YES |  |  |
| 8 | `Current Preferred Source Price ` | money | YES |  |  |
| 9 | `Contractor Price` | money | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
