# Table: `dbo.ZonalEvents`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 84

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ZonalId` | uniqueidentifier | NO |  |  |
| 3 | `EventStamp` | datetime | NO | `(getdate())` |  |
| 4 | `SourceFile` | varchar(1024) | NO |  |  |
| 5 | `IndexData` | varchar(4096) | YES |  |  |
| 6 | `EventStatus` | varchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
