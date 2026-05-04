# Table: `dbo.CON_ORION_PENDING_NOTIFS`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  | YES |
| 2 | `SUBSCRIPTION_ID` | varchar(100) | NO |  |  |
| 3 | `INDICATION_TYPE` | varchar(100) | NO |  |  |
| 4 | `INDICATION_PROPERTIES` | varchar(4000) | NO |  |  |
| 5 | `SOURCE_INSTANCE_PROPERTIES` | varchar(4000) | YES |  |  |
| 6 | `CREATED` | datetime | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_CON_O_PEND_NOTIF_CREATED` | no | NONCLUSTERED | `CREATED` |  |
| `IX_CON_O_PEND_NOTIF_SUB_ID` | no | NONCLUSTERED | `SUBSCRIPTION_ID` |  |
