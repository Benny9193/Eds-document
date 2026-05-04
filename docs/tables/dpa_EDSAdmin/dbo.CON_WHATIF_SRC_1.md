# Table: `dbo.CON_WHATIF_SRC_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1589

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | bigint | NO |  | YES |
| 2 | `D` | datetime | NO |  |  |
| 3 | `IDX_ID` | bigint | NO |  |  |
| 4 | `PLAN_HASH` | bigint | NO |  |  |
| 5 | `PLAN_STEP` | int | NO |  |  |
| 6 | `SQL_HASH` | bigint | NO |  |  |
| 7 | `SQL_EXECS` | bigint | NO |  |  |
| 8 | `SQL_WAIT` | bigint | NO |  |  |
| 9 | `EST_SAVING` | decimal(6,3) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UX1_CON_WHATIF_SRC_1` | YES | NONCLUSTERED | `D`, `IDX_ID`, `PLAN_HASH`, `PLAN_STEP`, `SQL_HASH` |  |
