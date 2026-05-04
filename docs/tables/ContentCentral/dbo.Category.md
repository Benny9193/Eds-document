# Table: `dbo.Category`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 8

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CategoryID` | int | NO |  | YES |
| 2 | `CategoryName` | nvarchar(64) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.CategoryLog`](dbo.CategoryLog.md) | `CategoryID` | `CategoryID` | NO_ACTION | NO_ACTION |

## Indexes

_No non-PK indexes._
