# Table: `dbo.CON_FQ_OBJECT_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1017

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | bigint | NO |  | YES |
| 2 | `OTYPE` | char(1) | NO |  |  |
| 3 | `ODATABASE` | varchar(200) | NO |  |  |
| 4 | `OSCHEMA` | varchar(200) | NO |  |  |
| 5 | `ONAME` | varchar(200) | NO |  |  |
| 6 | `OINDEX_TABLE` | varchar(200) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UX1_CON_FQ_OBJECT_1` | YES | NONCLUSTERED | `OTYPE`, `ODATABASE`, `OSCHEMA`, `ONAME`, `OINDEX_TABLE` |  |
