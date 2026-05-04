# Table: `dbo.CON_ALERTABLE_EVENT`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | bigint | NO |  | YES |
| 2 | `DB_ID` | smallint | NO |  |  |
| 3 | `EVENT_TIME` | datetime | NO |  |  |
| 4 | `EVENT_TYPE` | varchar(10) | NO |  |  |
| 5 | `DETAIL` | varchar(4000) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX1_CON_ALERTABLE_EVENT` | no | NONCLUSTERED | `EVENT_TIME`, `DB_ID` |  |
