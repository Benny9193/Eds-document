# Table: `dbo.CON_ANOMALY_DETECTION`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2880

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DB_ID` | smallint | NO |  | YES |
| 2 | `D` | datetime | NO |  | YES |
| 3 | `PRED_VAL` | decimal(20,1) | NO |  |  |
| 4 | `STD_DEV` | decimal(20,1) | NO |  |  |
| 5 | `CONFIDENCE_LEVEL` | decimal(6,3) | NO |  |  |
| 6 | `ROLLING_PRED` | decimal(20,1) | YES |  |  |
| 7 | `ROLLING_STD_DEV` | decimal(20,1) | YES |  |  |
| 8 | `ACTUAL_WT` | decimal(20,1) | YES |  |  |
| 9 | `TEN_MIN_ROLL` | smallint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
