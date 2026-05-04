# Table: `dbo.CONAUDIT`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 129

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ACTIVITY` | varchar(250) | NO |  |  |
| 2 | `DBID` | bigint | NO |  |  |
| 3 | `D` | datetime | NO |  |  |
| 4 | `ACTIVITY_OWNER` | char(1) | NO |  |  |
| 5 | `USER_NAME` | varchar(250) | YES |  |  |
| 6 | `IP_ADDRESS` | varchar(50) | YES |  |  |
| 7 | `DESCRIPTION` | varchar(500) | YES |  |  |
| 8 | `PREVIOUS_VALUE` | varchar(500) | YES |  |  |
| 9 | `NEW_VALUE` | varchar(500) | YES |  |  |
| 10 | `AUTH_TYPE` | varchar(100) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
