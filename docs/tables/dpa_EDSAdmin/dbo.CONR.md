# Table: `dbo.CONR`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | smallint | NO |  | YES |
| 2 | `NAME` | varchar(50) | NO |  |  |
| 3 | `TYPE` | smallint | NO |  |  |
| 4 | `DBID` | smallint | NO |  |  |
| 5 | `PROPERTIES` | varchar(4000) | NO |  |  |
| 6 | `DESCRIPTION` | varchar(500) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UX_CONR` | YES | NONCLUSTERED | `NAME` |  |
