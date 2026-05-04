# Table: `dbo.CONLOG`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 50229

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | bigint | NO |  | YES |
| 2 | `PRIORITY` | varchar(20) | YES |  |  |
| 3 | `MESSAGE` | varchar(4000) | YES |  |  |
| 4 | `MODULE` | varchar(100) | YES |  |  |
| 5 | `STACKTRACE` | varchar(4000) | YES |  |  |
| 6 | `LOG_DATE` | datetime | YES |  |  |
| 7 | `CONTEXT` | varchar(500) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX1_CONLOG` | no | NONCLUSTERED | `LOG_DATE` |  |
