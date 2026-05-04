# Table: `dbo.CONOBJ_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | bigint | NO |  | YES |
| 2 | `NAME` | varchar(450) | YES |  |  |
| 3 | `OWNER` | varchar(100) | YES |  |  |
| 4 | `OBJECT_NAME` | varchar(200) | YES |  |  |
| 5 | `SUBOBJECT_NAME` | varchar(100) | YES |  |  |
| 6 | `OBJECT_TYPE` | varchar(30) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IDX_CONOBJ_U_1` | YES | NONCLUSTERED | `NAME` |  |
