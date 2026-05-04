# Table: `dbo.CON_WT_METER_HIST_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4464

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DATEHOUR` | datetime | NO |  | YES |
| 2 | `PERIOD` | char(1) | NO |  |  |
| 3 | `CURRENT_WAIT_TIME_SECS` | decimal(20,1) | YES |  |  |
| 4 | `HISTORIC_WAIT_TIME_SECS` | decimal(20,1) | YES |  |  |
| 5 | `WARNING_WT_THRESHOLD_SECS` | decimal(20,1) | YES |  |  |
| 6 | `CRITICAL_WT_THRESHOLD_SECS` | decimal(20,1) | YES |  |  |
| 7 | `CURRENT_STATE` | char(1) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
