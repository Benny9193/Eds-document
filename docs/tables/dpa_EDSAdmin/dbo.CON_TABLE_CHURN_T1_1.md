# Table: `dbo.CON_TABLE_CHURN_T1_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 48

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `D` | datetime | NO |  |  |
| 2 | `OBJID` | bigint | NO |  |  |
| 3 | `PARTITION_NAME` | varchar(128) | NO | `('0')` |  |
| 4 | `SUB_PARTITION_NAME` | varchar(128) | NO | `('0')` |  |
| 5 | `ROW_COUNT` | bigint | NO |  |  |
| 6 | `UPDATE_VALUE` | bigint | NO |  |  |
| 7 | `INSERT_VALUE` | bigint | NO |  |  |
| 8 | `DELETE_VALUE` | bigint | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
