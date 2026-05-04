# Table: `dbo.tableMaxs`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 286

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  | YES |
| 2 | `TableName` | varchar(128) | YES |  |  |
| 3 | `ColumnName` | varchar(128) | YES |  |  |
| 4 | `MaxValue` | int | YES |  |  |
| 5 | `Updated` | datetime | YES | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
