# Table: `dbo.FileTypes`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 5

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `Name` | varchar(255) | NO |  |  |
| 3 | `Extension` | varchar(50) | YES |  |  |
| 4 | `MimeType` | varchar(255) | YES |  |  |
| 5 | `Program` | varchar(255) | YES |  |  |
| 6 | `deletedAt` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
