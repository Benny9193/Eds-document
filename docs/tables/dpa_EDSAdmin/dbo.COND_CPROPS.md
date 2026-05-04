# Table: `dbo.COND_CPROPS`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DB_ID` | smallint | NO |  |  |
| 2 | `PROP_ID` | bigint | NO |  |  |
| 3 | `PROP_VALUE_ID` | bigint | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UX1_COND_CPROPS` | YES | NONCLUSTERED | `DB_ID`, `PROP_ID`, `PROP_VALUE_ID` |  |
