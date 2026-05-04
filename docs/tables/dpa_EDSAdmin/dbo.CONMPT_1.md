# Table: `dbo.CONMPT_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NODE_ID` | smallint | NO |  | YES |
| 2 | `PLAN_HASH_VALUE` | bigint | NO |  | YES |
| 3 | `PLAN_NODE` | varchar(4000) | YES |  |  |
| 4 | `NODE_TYPE` | varchar(35) | YES |  |  |
| 5 | `PARENT_NODE_ID` | smallint | NO |  |  |
| 6 | `ACCESS_TYPE` | varchar(35) | YES |  |  |
| 7 | `OPERATION` | varchar(500) | YES |  |  |
| 8 | `POSSIBLE_KEYS` | varchar(4000) | YES |  |  |
| 9 | `NODE_KEY` | varchar(1000) | YES |  |  |
| 10 | `USING_INDEX` | varchar(8) | YES |  |  |
| 11 | `USED_KEY_PARTS` | varchar(1000) | YES |  |  |
| 12 | `NODE_REF` | varchar(1000) | YES |  |  |
| 13 | `FILTER` | varchar(4000) | YES |  |  |
| 14 | `SCHEMA_NAME` | varchar(64) | YES |  |  |
| 15 | `TABLE_NAME` | varchar(64) | YES |  |  |
| 16 | `ALIAS_NAME` | varchar(64) | YES |  |  |
| 17 | `INDEX_NAME` | varchar(64) | YES |  |  |
| 18 | `TIMESTAMP` | datetime | YES |  |  |
| 19 | `COST` | numeric(25,2) | YES |  |  |
| 20 | `NO_OF_ROWS` | numeric(25,2) | YES |  |  |
| 21 | `DATABASE_NAME` | varchar(64) | YES |  |  |
| 22 | `SQLHASH` | bigint | NO |  |  |
| 23 | `FORMAT_TYPE` | char(1) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
