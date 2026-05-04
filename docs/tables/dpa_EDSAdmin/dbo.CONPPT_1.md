# Table: `dbo.CONPPT_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PLAN_HASH_VALUE` | bigint | NO |  | YES |
| 2 | `NODE_ID` | smallint | NO |  | YES |
| 3 | `OPERATION` | varchar(50) | NO |  |  |
| 4 | `PLAN_NODE` | varchar(4000) | YES |  |  |
| 5 | `PARENT_NODE_ID` | smallint | NO |  |  |
| 6 | `DATABASE_NAME` | varchar(50) | NO |  |  |
| 7 | `SCHEMA_NAME` | varchar(50) | YES |  |  |
| 8 | `TABLE_NAME` | varchar(50) | YES |  |  |
| 9 | `ALIAS_NAME` | nvarchar(100) | YES |  |  |
| 10 | `INDEX_NAME` | varchar(100) | YES |  |  |
| 11 | `FILTER` | varchar(4000) | YES |  |  |
| 12 | `TIMESTAMP` | datetime | YES |  |  |
| 13 | `COST` | decimal(25,2) | YES |  |  |
| 14 | `NO_OF_ROWS` | bigint | YES |  |  |
| 15 | `WIDTH` | bigint | YES |  |  |
| 16 | `SQLHASH` | bigint | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX1_CONPPT_1` | no | NONCLUSTERED | `TIMESTAMP` |  |
