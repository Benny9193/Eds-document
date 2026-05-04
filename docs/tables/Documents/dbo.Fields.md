# Table: `dbo.Fields`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 142

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `FieldType` | varchar(50) | NO |  |  |
| 3 | `MaxLength` | int | YES |  |  |
| 4 | `ColumnWidth` | int | YES |  |  |
| 5 | `Decimals` | int | YES |  |  |
| 6 | `Name` | varchar(255) | NO |  |  |
| 7 | `Prompt` | varchar(255) | YES |  |  |
| 8 | `EditMask` | varchar(255) | YES |  |  |
| 9 | `ExternalSource` | varchar(255) | YES |  |  |
| 10 | `TableName` | varchar(255) | YES |  |  |
| 11 | `ColumnName` | varchar(255) | YES |  |  |
| 12 | `DefaultValue` | varchar(255) | YES |  |  |
| 13 | `Required` | bit | YES |  |  |
| 14 | `MultiLine` | bit | YES |  |  |
| 15 | `UseChoices` | bit | YES |  |  |
| 16 | `AllowNewChoices` | bit | YES |  |  |
| 17 | `UpdateChoices` | bit | YES |  |  |
| 18 | `RestrictDuplicates` | bit | YES |  |  |
| 19 | `Height` | int | YES |  |  |
| 20 | `ValidationExp` | varchar(4096) | YES |  |  |
| 21 | `FieldChoices` | varchar(max) | YES |  |  |
| 22 | `SelectorStatement` | varchar(max) | YES |  |  |
| 23 | `deletedAt` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.DocumentTypeFields`](dbo.DocumentTypeFields.md) | `FieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.DocumentTypeLookupResults`](dbo.DocumentTypeLookupResults.md) | `TargetFieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.FieldData`](dbo.FieldData.md) | `FieldId` | `Id` | NO_ACTION | NO_ACTION |
| [`dbo.ViewFields`](dbo.ViewFields.md) | `FieldId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

_No non-PK indexes._
