# Table: `dbo.CONAIQ_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | smallint | NO |  | YES |
| 2 | `SQLHASH` | bigint | NO |  |  |
| 3 | `PLANHASH` | bigint | NO |  |  |
| 4 | `PIECE` | smallint | NO |  | YES |
| 5 | `CREATE_TIME` | datetime | YES |  |  |
| 6 | `UPDATE_TIME` | datetime | YES |  |  |
| 7 | `OPTIMIZED_START_TIME` | datetime | YES |  |  |
| 8 | `OPTIMIZED_TIME` | datetime | YES |  |  |
| 9 | `ST` | varchar(4000) | YES |  |  |
| 10 | `MASK_ST` | varchar(4000) | YES |  |  |
| 11 | `SUMMARY` | varchar(4000) | YES |  |  |
| 12 | `THINKING` | varchar(4000) | YES |  |  |
| 13 | `EXPLANATION` | varchar(4000) | YES |  |  |
| 14 | `STATUS` | varchar(64) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
