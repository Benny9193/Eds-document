# Table: `dbo.CON_AG_STATUS_SUMMARY`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DB_ID` | smallint | NO |  | YES |
| 2 | `AG_ID` | bigint | NO |  | YES |
| 3 | `GROUP_ID` | varchar(100) | NO |  |  |
| 4 | `HEALTH_STATUS` | smallint | NO |  |  |
| 5 | `REPLICA_ROLE` | char(1) | NO |  |  |
| 6 | `PRIMARY_REPLICA` | varchar(128) | NO |  |  |
| 7 | `PRIMARY_REPLICA_FAILOVER_MODE` | tinyint | NO |  |  |
| 8 | `REPLICA_COUNT` | smallint | NO |  |  |
| 9 | `DATABASE_COUNT` | smallint | NO |  |  |
| 10 | `INSTANCE_NAME` | varchar(400) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
