# Table: `dbo.Audit`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `ObjectId` | uniqueidentifier | NO |  |  |
| 3 | `ModuleId` | uniqueidentifier | NO |  |  |
| 4 | `AccessTypeId` | uniqueidentifier | NO |  |  |
| 5 | `UserId` | uniqueidentifier | NO |  |  |
| 6 | `Datestamp` | datetime | NO | `(getdate())` |  |
| 7 | `Location` | varchar(50) | YES |  |  |
| 8 | `PriorData` | varbinary(max) | YES |  |  |
| 9 | `NewData` | varbinary(max) | YES |  |  |
| 10 | `deletedAt` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
