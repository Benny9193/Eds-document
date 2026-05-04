# Table: `dbo.CON_METRICS_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 48

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | bigint | NO |  | YES |
| 2 | `QUERY_ID` | bigint | NO |  |  |
| 3 | `METRIC_NAME_ID` | bigint | NO |  |  |
| 4 | `BRANCH_NAME_ID` | bigint | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UX1_CON_METRICS_1` | YES | NONCLUSTERED | `QUERY_ID`, `METRIC_NAME_ID`, `BRANCH_NAME_ID` |  |
