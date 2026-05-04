# Table: `dbo.CON_DEADLOCK_DIM_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1191

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DEADLOCK_ID` | bigint | NO |  | YES |
| 2 | `DIM_TYPE` | char(1) | NO |  | YES |
| 3 | `DIM_ID` | bigint | NO |  | YES |
| 4 | `VENDOR_ID` | bigint | YES |  |  |
| 5 | `VICTIM_SUM_MS` | bigint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
