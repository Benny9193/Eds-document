# Table: `dbo.CON_EVENTS`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | bigint | NO |  | YES |
| 2 | `DBID` | smallint | NO |  |  |
| 3 | `EVENT_DATE` | datetime | NO |  |  |
| 4 | `TITLE` | varchar(400) | NO |  |  |
| 5 | `CREATOR` | varchar(50) | YES |  |  |
| 6 | `DESCRIPTION` | varchar(4000) | YES |  |  |
| 7 | `EVENT_TYPE` | char(1) | NO | `('C')` |  |
| 8 | `URL` | varchar(512) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX1_CON_EVENT_DBID_DATE` | no | NONCLUSTERED | `DBID`, `EVENT_DATE` |  |
