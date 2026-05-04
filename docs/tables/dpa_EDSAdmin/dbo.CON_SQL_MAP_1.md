# Table: `dbo.CON_SQL_MAP_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DB_SQL_ID_HASH` | bigint | NO |  | YES |
| 2 | `DB_SQL_ID` | varchar(100) | NO |  |  |
| 3 | `SQL_HASH` | bigint | NO |  | YES |
| 4 | `LAST_SEEN` | datetime | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX1_CON_SQL_MAP_1` | no | NONCLUSTERED | `SQL_HASH` |  |
| `IX2_CON_SQL_MAP_1` | no | NONCLUSTERED | `LAST_SEEN` |  |
