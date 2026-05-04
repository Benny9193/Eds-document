# Table: `dbo.CONLIC_HISTORY`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PRODUCT_KEY` | varchar(20) | NO |  |  |
| 2 | `LICENSE_KEY` | varchar(100) | NO |  |  |
| 3 | `ADDED` | datetime | NO |  |  |
| 4 | `CHANGE_TYPE` | varchar(2) | NO |  |  |
| 5 | `EXTRA_STRING` | varchar(4000) | YES |  |  |
| 6 | `EXTRA_DATE` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
