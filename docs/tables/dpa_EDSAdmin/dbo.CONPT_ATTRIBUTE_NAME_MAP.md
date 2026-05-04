# Table: `dbo.CONPT_ATTRIBUTE_NAME_MAP`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ATTRIBUTE_ID` | smallint | NO |  | YES |
| 2 | `ATTRIBUTE_NAME` | varchar(100) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX1_CONPT_ATTRIBUTE_NAME_MAP` | YES | NONCLUSTERED | `ATTRIBUTE_NAME` |  |
