# Table: `dbo.CON_WHATIF_IDX_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 120

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | bigint | NO |  | YES |
| 2 | `RECOMMENDED_INDEX` | varchar(4000) | NO |  |  |
| 3 | `DISMISSED` | char(1) | YES |  |  |
| 4 | `DISMISSED_DATE` | datetime | YES |  |  |
| 5 | `DISMISSED_BY` | varchar(250) | YES |  |  |
| 6 | `DISMISSED_NOTE` | varchar(4000) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
