# Table: `dbo.CON_DEADLOCK_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 138

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | bigint | NO |  | YES |
| 2 | `EVENT_DATE_UTC` | bigint | NO |  |  |
| 3 | `D` | datetime | NO |  |  |
| 4 | `SESSION_COUNT` | smallint | NO |  |  |
| 5 | `SERVER_UTC_OFFSET` | smallint | NO |  |  |
| 6 | `VICTIM_SUM_MS` | bigint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX1_CON_DEADLOCK_1` | no | NONCLUSTERED | `D` |  |
