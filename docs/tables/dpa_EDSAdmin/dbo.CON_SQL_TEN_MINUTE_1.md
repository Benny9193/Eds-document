# Table: `dbo.CON_SQL_TEN_MINUTE_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 50730

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DATEHOUR` | datetime | NO |  | YES |
| 2 | `SQLHASH` | bigint | NO |  | YES |
| 3 | `EVENTID` | bigint | NO |  | YES |
| 4 | `PERIOD` | char(1) | NO | `('T')` | YES |
| 5 | `TIMESECS` | decimal(20,1) | YES |  |  |
| 6 | `BLEESECS` | decimal(20,1) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX1_CON_SQL_TEN_MINUTE_1` | no | NONCLUSTERED | `SQLHASH` |  |
