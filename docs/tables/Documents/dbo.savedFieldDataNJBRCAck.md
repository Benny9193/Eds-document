# Table: `dbo.savedFieldDataNJBRCAck`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1645

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO |  |  |
| 2 | `DocumentId` | uniqueidentifier | NO |  |  |
| 3 | `FieldId` | uniqueidentifier | NO |  |  |
| 4 | `FieldValue` | varchar(max) | YES |  |  |
| 5 | `updatedAt` | datetime | YES |  |  |
| 6 | `deletedAt` | datetime | YES |  |  |
| 7 | `rowguid` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
