# Table: `dbo.CONBLACKOUT_SCHEDULE_DATA`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SCHEDULE_ID` | bigint | NO |  |  |
| 2 | `ALERT_ID` | smallint | YES |  |  |
| 3 | `DB_ID` | smallint | YES |  |  |
| 4 | `ALERT_GROUP_ID` | smallint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX1_CONBLACKOUT_SCHEDULE_DATA` | no | NONCLUSTERED | `SCHEDULE_ID` |  |
