# Table: `dbo.DocumentTypeLookupResults`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 21

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocumentTypeLookupId` | uniqueidentifier | NO |  |  |
| 3 | `Sequence` | int | YES |  |  |
| 4 | `Overwrite` | bit | YES |  |  |
| 5 | `TargetFieldId` | uniqueidentifier | NO |  |  |
| 6 | `ColumnName` | varchar(255) | YES |  |  |
| 7 | `deletedAt` | datetime | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocumentTypeLookupResults_DocumentTypeLookups` | `DocumentTypeLookupId` | [`dbo.DocumentTypeLookups.Id`](dbo.DocumentTypeLookups.md) | NO_ACTION | NO_ACTION |
| `FK_DocumentTypeLookupResults_Fields` | `TargetFieldId` | [`dbo.Fields.Id`](dbo.Fields.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
