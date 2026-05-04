# Table: `dbo.DocumentTypeLookupKeys`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 16

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocumentTypeLookupId` | uniqueidentifier | NO |  |  |
| 3 | `Sequence` | int | YES |  |  |
| 4 | `ColumnName` | varchar(255) | YES |  |  |
| 5 | `Operand` | varchar(20) | YES |  |  |
| 6 | `Boolean` | varchar(20) | YES |  |  |
| 7 | `Constant` | bit | YES |  |  |
| 8 | `MatchData` | varchar(255) | YES |  |  |
| 9 | `deletedAt` | datetime | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocumentTypeLookupKeys_DocumentTypeLookups` | `DocumentTypeLookupId` | [`dbo.DocumentTypeLookups.Id`](dbo.DocumentTypeLookups.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
