# Table: `dbo.DocumentTypeLookups`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 11

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocumentTypeId` | uniqueidentifier | NO |  |  |
| 3 | `Sequence` | int | YES |  |  |
| 4 | `ExternalSource` | varchar(255) | YES |  |  |
| 5 | `TableName` | varchar(255) | YES |  |  |
| 6 | `deletedAt` | datetime | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DocumentTypeLookups_DocumentTypes` | `DocumentTypeId` | [`dbo.DocumentTypes.Id`](dbo.DocumentTypes.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.DocumentTypeLookupKeys`](dbo.DocumentTypeLookupKeys.md) | `DocumentTypeLookupId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.DocumentTypeLookupResults`](dbo.DocumentTypeLookupResults.md) | `DocumentTypeLookupId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

_No non-PK indexes._
