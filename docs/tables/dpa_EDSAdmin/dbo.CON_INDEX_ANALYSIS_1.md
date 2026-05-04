# Table: `dbo.CON_INDEX_ANALYSIS_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3016

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `D` | smalldatetime | NO |  | YES |
| 2 | `SQLHASH` | bigint | NO |  | YES |
| 3 | `PLANHASH` | bigint | NO |  | YES |
| 4 | `STEP_NUMBER` | int | NO |  | YES |
| 5 | `SCORE` | int | NO |  |  |
| 6 | `TABLE_ID` | bigint | NO |  |  |
| 7 | `STEP_OPERATION` | varchar(50) | NO |  |  |
| 8 | `STEP_OPTION` | varchar(50) | YES |  |  |
| 9 | `STEP_ROWS` | bigint | YES |  |  |
| 10 | `PRED_WARNINGS_FLAG` | char(1) | NO |  |  |
| 11 | `LOOKUP_FLAG` | char(1) | NO |  |  |
| 12 | `SPOOL_FLAG` | char(1) | NO |  |  |
| 13 | `PARALLEL_FLAG` | char(1) | NO |  |  |
| 14 | `INDEX_ID` | bigint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX1_CON_INDEX_ANALYSIS_1` | no | NONCLUSTERED | `PLANHASH`, `STEP_NUMBER` |  |
| `IX2_CON_INDEX_ANALYSIS_1` | no | NONCLUSTERED | `TABLE_ID` |  |
