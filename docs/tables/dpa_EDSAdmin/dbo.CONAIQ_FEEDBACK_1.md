# Table: `dbo.CONAIQ_FEEDBACK_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | smallint | NO |  | YES |
| 2 | `OPTIMIZED_ID` | smallint | NO |  |  |
| 3 | `TYPE` | varchar(64) | NO |  |  |
| 4 | `DETAILS` | varchar(4000) | YES |  |  |
| 5 | `USER_NAME` | varchar(64) | NO |  |  |
| 6 | `CREATE_TIME` | datetime | YES |  |  |
| 7 | `UPDATE_TIME` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_CONAIQ_FEEDBACK_1` | no | NONCLUSTERED | `TYPE` |  |
