# Table: `dbo.CustomPropertyValues`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TargetTable` | nvarchar(128) | NO |  |  |
| 2 | `Name` | nvarchar(128) | NO |  |  |
| 3 | `Value` | nvarchar(max) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_CustomPropertyValues` | no | NONCLUSTERED | `TargetTable`, `Name` |  |
