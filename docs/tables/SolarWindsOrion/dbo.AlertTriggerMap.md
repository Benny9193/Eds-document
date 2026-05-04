# Table: `dbo.AlertTriggerMap`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TableName` | varchar(255) | NO |  |  |
| 2 | `FieldName` | varchar(255) | NO |  |  |
| 3 | `DateTime` | datetime | NO | `((-2))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_AlertTriggerMap` | no | NONCLUSTERED | `TableName`, `FieldName` |  |
| `IX_AlertTriggerMap_DateTime` | no | NONCLUSTERED | `DateTime` |  |
