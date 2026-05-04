# Table: `dbo.dtproperties`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 42

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | int | NO |  | YES |
| 2 | `objectid` | int | YES |  |  |
| 3 | `property` | varchar(64) | NO |  | YES |
| 4 | `value` | varchar(255) | YES |  |  |
| 5 | `uvalue` | nvarchar(255) | YES |  |  |
| 6 | `lvalue` | image(2147483647) | YES |  |  |
| 7 | `version` | int | NO | `(0)` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
