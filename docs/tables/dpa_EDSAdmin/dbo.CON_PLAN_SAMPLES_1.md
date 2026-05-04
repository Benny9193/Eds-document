# Table: `dbo.CON_PLAN_SAMPLES_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | bigint | NO |  | YES |
| 2 | `SQLHASH` | bigint | NO |  |  |
| 3 | `PLANHASH` | bigint | NO |  |  |
| 4 | `STARTDATE` | datetime | NO |  |  |
| 5 | `ENDDATE` | datetime | NO |  |  |
| 6 | `SCHEMA_ID` | bigint | NO |  |  |
| 7 | `DB2DB_ID` | bigint | YES |  |  |
| 8 | `IS_ERROR` | char(1) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX1_CON_HIST_PLAN_SAMPS_1` | no | NONCLUSTERED | `SQLHASH` |  |
