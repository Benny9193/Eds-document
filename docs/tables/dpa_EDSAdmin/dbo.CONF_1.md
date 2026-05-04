# Table: `dbo.CONF_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 100

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | bigint | NO |  | YES |
| 2 | `ORAFILENUM` | bigint | NO |  |  |
| 3 | `CREATEDATE` | datetime | NO |  |  |
| 4 | `NAME` | varchar(600) | YES |  |  |
| 5 | `FILETYPE` | varchar(10) | YES |  |  |
| 6 | `DBID` | bigint | YES |  |  |
| 7 | `CONO_ID_DBID` | bigint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IDX_CONF_U_1` | YES | NONCLUSTERED | `ORAFILENUM`, `NAME`, `FILETYPE` |  |
