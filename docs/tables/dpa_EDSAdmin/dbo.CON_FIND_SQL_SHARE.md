# Table: `dbo.CON_FIND_SQL_SHARE`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | bigint | NO |  | YES |
| 2 | `DB_ID` | smallint | NO |  |  |
| 3 | `START_TIME` | datetime | NO |  |  |
| 4 | `END_TIME` | datetime | NO |  |  |
| 5 | `SEARCH_MODE` | char(1) | NO |  |  |
| 6 | `ROW_LIMIT` | smallint | NO |  |  |
| 7 | `QUERY` | varchar(4000) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UX1_CON_FIND_SQL_SHARE` | YES | NONCLUSTERED | `DB_ID`, `ID` |  |
