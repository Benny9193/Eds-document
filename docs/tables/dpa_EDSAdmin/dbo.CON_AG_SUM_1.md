# Table: `dbo.CON_AG_SUM_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DATEHOUR` | datetime | NO |  | YES |
| 2 | `AGID` | bigint | NO |  | YES |
| 3 | `EVENTID` | bigint | NO |  | YES |
| 4 | `DBID` | bigint | NO |  | YES |
| 5 | `PERIOD` | char(1) | NO | `('H')` | YES |
| 6 | `TIMESECS` | decimal(20,1) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX1_CON_AG_SUM_1` | no | NONCLUSTERED | `DBID`, `AGID` |  |
