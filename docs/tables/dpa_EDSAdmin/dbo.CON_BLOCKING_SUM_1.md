# Table: `dbo.CON_BLOCKING_SUM_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 83331

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DATEHOUR` | datetime | NO |  | YES |
| 2 | `DIMENSIONTYPE` | char(1) | NO |  | YES |
| 3 | `PERIOD` | char(1) | NO |  | YES |
| 4 | `DIMENSIONID` | bigint | NO |  | YES |
| 5 | `BLEETIMESECS` | decimal(20,1) | YES |  |  |
| 6 | `BLERTIMESECS` | decimal(20,1) | YES |  |  |
| 7 | `ROOTIMPACTSECS` | decimal(20,1) | YES |  |  |
| 8 | `ROOTBLERSECS` | decimal(20,1) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
