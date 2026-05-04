# Table: `dbo.CON_TABLE_CHURN_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1564

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `D` | datetime | NO |  | YES |
| 2 | `OBJID` | bigint | NO |  | YES |
| 3 | `ROW_COUNT` | bigint | NO |  |  |
| 4 | `UPDATE_DELTA` | bigint | NO | `((0))` |  |
| 5 | `INSERT_DELTA` | bigint | NO | `((0))` |  |
| 6 | `DELETE_DELTA` | bigint | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
