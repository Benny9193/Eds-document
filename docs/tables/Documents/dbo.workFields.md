# Table: `dbo.workFields`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 36

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO |  |  |
| 2 | `DocumentTypeId` | uniqueidentifier | NO |  |  |
| 3 | `Sequence` | int | YES |  |  |
| 4 | `FieldId` | uniqueidentifier | NO |  |  |
| 5 | `FieldName` | varchar(255) | NO |  |  |
| 6 | `Prompt` | varchar(255) | YES |  |  |
| 7 | `FieldType` | varchar(50) | NO |  |  |
| 8 | `MultiLine` | bit | YES |  |  |
| 9 | `Decimals` | int | YES |  |  |
| 10 | `Height` | int | YES |  |  |
| 11 | `EditMask` | varchar(255) | YES |  |  |
| 12 | `MaxLength` | int | YES |  |  |
| 13 | `Required` | bit | YES |  |  |
| 14 | `UseChoices` | bit | YES |  |  |
| 15 | `ValidationExp` | varchar(4096) | YES |  |  |
| 16 | `AllowNewChoices` | bit | YES |  |  |
| 17 | `UpdateChoices` | bit | YES |  |  |
| 18 | `ChoiceValues` | varchar(max) | YES |  |  |
| 19 | `DocumentId` | uniqueidentifier | NO |  |  |
| 20 | `FieldValue` | varchar(max) | YES |  |  |
| 21 | `FieldDataId` | uniqueidentifier | YES |  |  |
| 22 | `docCount` | int | YES |  |  |
| 23 | `dataCount` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
