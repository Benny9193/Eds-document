# Table: `dbo.CON_ORION_INTEGRATION`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | varchar(100) | NO |  | YES |
| 2 | `ORION_SERVER_URL` | varchar(200) | NO |  |  |
| 3 | `ORION_SERVER_WEB_URL` | varchar(200) | NO |  |  |
| 4 | `SERVICE_USER_ID` | smallint | NO |  |  |
| 5 | `EXPIRATION_DATE` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UX_CON_O_I_SERVER_URL` | YES | NONCLUSTERED | `ORION_SERVER_URL` |  |
