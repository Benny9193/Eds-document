# Table: `dbo.CON_AG_DATABASE`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DB_ID` | smallint | NO |  | YES |
| 2 | `AG_ID` | bigint | NO |  | YES |
| 3 | `REPLICA_NAME` | varchar(256) | NO |  | YES |
| 4 | `DB_NAME` | varchar(128) | NO |  | YES |
| 5 | `HEALTH` | tinyint | YES |  |  |
| 6 | `SYNC_STATUS` | tinyint | YES |  |  |
| 7 | `EST_RECOVERY_TIME` | bigint | YES |  |  |
| 8 | `EST_DATA_LOSS` | int | YES |  |  |
| 9 | `IS_FAILOVER_READY` | char(1) | YES |  |  |
| 10 | `LAST_HARDENED_LSN` | varchar(25) | YES |  |  |
| 11 | `LAST_HARDENED_TIME` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
