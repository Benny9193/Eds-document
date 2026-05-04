# Table: `dbo.CON_STATS_SUM_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 928218

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DATEHOUR` | datetime | NO |  | YES |
| 2 | `SQLHASH` | bigint | NO |  | YES |
| 3 | `SORTS` | bigint | YES |  |  |
| 4 | `EXECS` | bigint | YES |  |  |
| 5 | `PARSES` | bigint | YES |  |  |
| 6 | `DREADS` | bigint | YES |  |  |
| 7 | `BGETS` | bigint | YES |  |  |
| 8 | `ROW_COUNT` | bigint | YES |  |  |
| 9 | `PERIOD` | char(1) | NO |  | YES |
| 10 | `TIMESECS` | decimal(20,1) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX1_CON_STATS_SUM_1` | no | NONCLUSTERED | `SQLHASH`, `DATEHOUR`, `PERIOD` |  |
