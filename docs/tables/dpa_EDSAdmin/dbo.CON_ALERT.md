# Table: `dbo.CON_ALERT`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | smallint | NO |  | YES |
| 2 | `ALERTNAME` | varchar(100) | NO |  |  |
| 3 | `ENABLED` | char(1) | NO | `('Y')` |  |
| 4 | `ALERTCOMMENT` | varchar(1000) | YES |  |  |
| 5 | `FREQUENCY` | smallint | NO |  |  |
| 6 | `TEMPLATEID` | smallint | NO |  |  |
| 7 | `NOTIFYWHEN` | varchar(20) | YES |  |  |
| 8 | `EMAIL_TEMPLATE_ID` | bigint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UX_CON_ALERT` | YES | NONCLUSTERED | `ALERTNAME` |  |
