# Table: `dbo.CON_AG_REPLICA`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DB_ID` | smallint | NO |  | YES |
| 2 | `AG_ID` | bigint | NO |  | YES |
| 3 | `REPLICA_NAME` | varchar(256) | NO |  | YES |
| 4 | `HEALTH` | tinyint | YES |  |  |
| 5 | `ROLE` | tinyint | YES |  |  |
| 6 | `AVAILABILITY_MODE` | tinyint | YES |  |  |
| 7 | `FAILOVER_MODE` | tinyint | YES |  |  |
| 8 | `CONN_STATUS` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
