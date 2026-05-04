# Table: `dbo.CON_ALERT_ACK`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  | YES |
| 2 | `ALERTID` | smallint | NO |  |  |
| 3 | `DBID` | smallint | NO |  |  |
| 4 | `D` | datetime | NO |  |  |
| 5 | `USERNAME` | varchar(250) | YES |  |  |
| 6 | `ACK` | char(1) | NO |  |  |
| 7 | `NOTE` | varchar(4000) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UX_CON_ALERT_ACK` | YES | NONCLUSTERED | `ALERTID`, `DBID`, `D` |  |
