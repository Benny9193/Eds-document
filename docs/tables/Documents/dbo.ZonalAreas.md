# Table: `dbo.ZonalAreas`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 10

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ZonalId` | uniqueidentifier | NO |  |  |
| 3 | `FieldId` | uniqueidentifier | NO |  |  |
| 4 | `Sequence` | int | YES |  |  |
| 5 | `X` | float | YES |  |  |
| 6 | `Y` | float | YES |  |  |
| 7 | `Height` | float | YES |  |  |
| 8 | `Width` | float | YES |  |  |
| 9 | `RegEx` | varchar(max) | YES |  |  |
| 10 | `Match` | varchar(max) | YES |  |  |
| 11 | `Active` | bit | YES |  |  |
| 12 | `Capture` | bit | YES |  |  |
| 13 | `deletedAt` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
