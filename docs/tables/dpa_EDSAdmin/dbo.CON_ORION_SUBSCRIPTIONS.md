# Table: `dbo.CON_ORION_SUBSCRIPTIONS`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | varchar(100) | NO |  | YES |
| 2 | `ENDPOINT_ADDRESS` | varchar(4000) | NO |  |  |
| 3 | `QUERY` | varchar(4000) | NO |  |  |
| 4 | `LAST_SUCCESSFUL_DELIVERY` | datetime | YES |  |  |
| 5 | `FAILED_DELIVERY_ATTEMPTS` | int | NO | `((0))` |  |
| 6 | `FIRST_CURRENT_FAILURE` | datetime | YES |  |  |
| 7 | `DESCRIPTION` | varchar(100) | YES |  |  |
| 8 | `AUTHORIZATION_TOKEN` | varchar(100) | YES |  |  |
| 9 | `DATA_FORMAT` | varchar(50) | YES |  |  |
| 10 | `CREDENTIAL_TYPE` | varchar(50) | YES |  |  |
| 11 | `BINDING` | varchar(50) | YES |  |  |
| 12 | `USER_SUBSCRIPTON_ID` | varchar(100) | YES |  |  |
| 13 | `SWIS_INSTANCE` | varchar(50) | YES |  |  |
| 14 | `VERSION` | int | NO | `((1))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_CON_O_SUBS_DESCR` | no | NONCLUSTERED | `DESCRIPTION` |  |
