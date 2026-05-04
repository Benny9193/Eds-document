# Table: `dbo.Menus`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `MenuId` | int | NO |  | YES |
| 2 | `ParentId` | int | YES |  |  |
| 3 | `Name` | varchar(50) | YES |  |  |
| 4 | `Description` | varchar(255) | YES |  |  |
| 5 | `URL` | varchar(1024) | YES |  |  |
| 6 | `RequiredLevel` | int | YES |  |  |
| 7 | `SortSeq` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
