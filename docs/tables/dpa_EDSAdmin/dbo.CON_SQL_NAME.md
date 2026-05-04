# Table: `dbo.CON_SQL_NAME`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 23

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `HASH` | bigint | NO |  | YES |
| 2 | `NAME` | varchar(100) | NO |  |  |
| 3 | `DESCR` | varchar(1000) | YES |  |  |
| 4 | `FLAG` | char(1) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UX_CON_SQL_NAME` | YES | NONCLUSTERED | `NAME` |  |
