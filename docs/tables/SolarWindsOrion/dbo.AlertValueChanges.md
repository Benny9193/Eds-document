# Table: `dbo.AlertValueChanges`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TableName` | varchar(255) | NO |  | YES |
| 2 | `FieldName` | varchar(255) | NO |  | YES |
| 3 | `NodeID` | int | NO |  | YES |
| 4 | `Changed` | datetime | NO | `((-2))` |  |
| 5 | `PreviousValue` | varchar(2500) | YES |  |  |
| 6 | `NewValue` | varchar(2500) | YES |  |  |
| 7 | `NodeName` | varchar(255) | NO |  |  |
| 8 | `NetObjectID` | varchar(255) | NO |  |  |
| 9 | `NetObjectName` | varchar(255) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_AlertValueChanges_Changed` | no | NONCLUSTERED | `Changed` |  |
