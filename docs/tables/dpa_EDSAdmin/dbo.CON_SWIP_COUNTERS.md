# Table: `dbo.CON_SWIP_COUNTERS`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 18

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DB_ID` | smallint | YES |  |  |
| 2 | `CATEGORY1` | varchar(100) | NO |  |  |
| 3 | `CATEGORY2` | varchar(100) | YES |  |  |
| 4 | `CATEGORY3` | nvarchar(200) | YES |  |  |
| 5 | `CATEGORY4` | varchar(100) | YES |  |  |
| 6 | `CATEGORY5` | varchar(100) | YES |  |  |
| 7 | `CATEGORY6` | varchar(100) | YES |  |  |
| 8 | `COUNTER_VALUE` | numeric(25,5) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
