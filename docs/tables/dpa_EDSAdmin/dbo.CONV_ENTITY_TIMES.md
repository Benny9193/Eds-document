# Table: `dbo.CONV_ENTITY_TIMES`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ENTITY_ID` | bigint | NO |  | YES |
| 2 | `OLDEST_DETAIL_DATE` | datetime | YES |  |  |
| 3 | `LATEST_DETAIL_DATE` | datetime | YES |  |  |
| 4 | `LATEST_TEN_MINUTE_DATE` | datetime | YES |  |  |
| 5 | `LATEST_HOUR_DATE` | datetime | YES |  |  |
| 6 | `LATEST_DAY_DATE` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
