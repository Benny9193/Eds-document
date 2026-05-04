# Table: `dbo.CON_HISTORICAL_PLANS_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PLANHASH` | bigint | NO |  | YES |
| 2 | `ID` | smallint | NO |  | YES |
| 3 | `PARENTID` | smallint | NO |  |  |
| 4 | `INDENTLEVEL` | smallint | NO |  |  |
| 5 | `PLANTEXT` | varchar(4000) | NO |  |  |
| 6 | `STATS` | varchar(4000) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
