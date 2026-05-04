# Table: `dbo.CON_ALERT_TEMPLATE`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 88

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | smallint | NO |  | YES |
| 2 | `TEMPLATEID` | smallint | NO |  |  |
| 3 | `NAME` | varchar(500) | NO |  |  |
| 4 | `DESCRIPTION` | varchar(4000) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UX_CON_ALERT_TEMPLATE` | YES | NONCLUSTERED | `TEMPLATEID` |  |
