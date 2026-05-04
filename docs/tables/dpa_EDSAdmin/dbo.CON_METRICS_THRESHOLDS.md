# Table: `dbo.CON_METRICS_THRESHOLDS`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DB_ID` | bigint | NO |  | YES |
| 2 | `ENTITY_TYPE` | varchar(20) | YES |  |  |
| 3 | `METRIC_NAME` | varchar(200) | NO |  | YES |
| 4 | `BRANCH_NAME` | varchar(200) | NO |  | YES |
| 5 | `THRESHOLD_TYPE` | varchar(30) | NO |  | YES |
| 6 | `MIN_VALUE` | bigint | YES |  |  |
| 7 | `MAX_VALUE` | bigint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
