# Table: `dbo.CONSPT_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 475963

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PLAN_HASH_VALUE` | bigint | NO |  | YES |
| 2 | `PIECE` | smallint | NO |  | YES |
| 3 | `QUERY_PLAN_XML` | varchar(4000) | NO |  |  |
| 4 | `TIMESTAMP` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX1_CONSPT_1` | no | NONCLUSTERED | `TIMESTAMP` |  |
