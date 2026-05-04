# Table: `dbo.CON_HASH_REFRESH`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 130

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DBID` | smallint | NO |  | YES |
| 2 | `HASH_TYPE` | char(1) | NO |  | YES |
| 3 | `HASH` | bigint | NO |  | YES |
| 4 | `D` | datetime | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX1_REFRESH_D` | no | NONCLUSTERED | `D` |  |
