# Table: `dbo.CON_ALERT_HISTORY`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ALERTID` | smallint | NO |  |  |
| 2 | `DB_ID` | smallint | NO |  |  |
| 3 | `ACTIONDATE` | smalldatetime | NO |  |  |
| 4 | `HISTORYID` | bigint | YES |  |  |
| 5 | `LEVELNAME` | varchar(10) | YES |  |  |
| 6 | `LEVELVALUE` | varchar(100) | YES |  |  |
| 7 | `DESCR` | varchar(4000) | YES |  |  |
| 8 | `LEVELMIN` | numeric(25,5) | YES |  |  |
| 9 | `LEVELMAX` | numeric(25,5) | YES |  |  |
| 10 | `CONTACTEES` | varchar(4000) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX1_V1_CON_ALERT_HISTORY` | no | NONCLUSTERED | `ACTIONDATE` |  |
| `IX2_V1_CON_ALERT_HISTORY` | no | NONCLUSTERED | `ALERTID` |  |
| `IX3_V1_CON_ALERT_HISTORY` | no | NONCLUSTERED | `DB_ID` |  |
