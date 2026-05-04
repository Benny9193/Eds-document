# Table: `dbo.sysdiagrams`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `name` | nvarchar(128) | NO |  |  |
| 2 | `principal_id` | int | NO |  |  |
| 3 | `diagram_id` | int | NO |  | YES |
| 4 | `version` | int | YES |  |  |
| 5 | `definition` | varbinary(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UK_principal_name` | YES | NONCLUSTERED | `principal_id`, `name` |  |
