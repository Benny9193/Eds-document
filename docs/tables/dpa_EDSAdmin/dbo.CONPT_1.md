# Table: `dbo.CONPT_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PLAN_HASH_VALUE` | bigint | NO |  | YES |
| 2 | `ID` | numeric(38,0) | NO |  | YES |
| 3 | `TIMESTAMP` | datetime | YES |  |  |
| 4 | `OPERATION` | varchar(50) | YES |  |  |
| 5 | `OPTIONS` | varchar(50) | YES |  |  |
| 6 | `OBJECT_NODE` | varchar(50) | YES |  |  |
| 7 | `OBJECT#` | numeric(38,0) | YES |  |  |
| 8 | `OBJECT_OWNER` | varchar(128) | YES |  |  |
| 9 | `OBJECT_NAME` | varchar(128) | YES |  |  |
| 10 | `OBJECT_ALIAS` | varchar(261) | YES |  |  |
| 11 | `OBJECT_TYPE` | varchar(50) | YES |  |  |
| 12 | `OPTIMIZER` | varchar(50) | YES |  |  |
| 13 | `PARENT_ID` | numeric(38,0) | YES |  |  |
| 14 | `DEPTH` | numeric(38,0) | YES |  |  |
| 15 | `POSITION` | numeric(38,0) | YES |  |  |
| 16 | `SEARCH_COLUMNS` | numeric(38,0) | YES |  |  |
| 17 | `COST` | numeric(38,0) | YES |  |  |
| 18 | `CARDINALITY` | numeric(38,0) | YES |  |  |
| 19 | `BYTES` | numeric(38,0) | YES |  |  |
| 20 | `OTHER_TAG` | varchar(50) | YES |  |  |
| 21 | `PARTITION_START` | varchar(64) | YES |  |  |
| 22 | `PARTITION_STOP` | varchar(64) | YES |  |  |
| 23 | `PARTITION_ID` | numeric(38,0) | YES |  |  |
| 24 | `OTHER` | varchar(4000) | YES |  |  |
| 25 | `DISTRIBUTION` | varchar(50) | YES |  |  |
| 26 | `CPU_COST` | numeric(38,0) | YES |  |  |
| 27 | `IO_COST` | numeric(38,0) | YES |  |  |
| 28 | `TEMP_SPACE` | numeric(38,0) | YES |  |  |
| 29 | `ACCESS_PREDICATES` | varchar(4000) | YES |  |  |
| 30 | `FILTER_PREDICATES` | varchar(4000) | YES |  |  |
| 31 | `PROJECTION` | varchar(4000) | YES |  |  |
| 32 | `TIME` | numeric(38,0) | YES |  |  |
| 33 | `QBLOCK_NAME` | varchar(50) | YES |  |  |
| 34 | `REMARKS` | varchar(4000) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX1_CONPT_1` | no | NONCLUSTERED | `TIMESTAMP` |  |
