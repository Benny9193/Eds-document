# View: `dbo.vw_DocumentTypeFieldWithDatas`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

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
| 19 | `DocumentId` | uniqueidentifier | YES |  |  |
| 20 | `FieldValue` | varchar(max) | YES |  |  |
| 21 | `FieldDataId` | uniqueidentifier | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Documents` | USER_TABLE |
| `DocumentTypeFields` | USER_TABLE |
| `FieldData` | USER_TABLE |
| `Fields` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[vw_DocumentTypeFieldWithDatas]
as
select DocumentTypeFields.Id, DocumentTypeFields.DocumentTypeId, DocumentTypeFields.Sequence, 
		Fields.Id FieldId, Fields.Name FieldName, Fields.Prompt, Fields.FieldType, Fields.MultiLine, Fields.Decimals, Fields.Height, Fields.EditMask, Fields.MaxLength, Fields.Required, Fields.UseChoices, Fields.ValidationExp, Fields.AllowNewChoices, Fields.UpdateChoices, Fields.FieldChoices ChoiceValues,
		Documents.Id DocumentId, FieldData.FieldValue, FieldData.Id FieldDataId
  from DocumentTypeFields 
  join Fields on Fields.Id = DocumentTypeFields.FieldId
             and Fields.deletedAt is null
             and Fields.Name not like '*%'
  left outer join Documents on Documents.DocumentTypeId = DocumentTypeFields.DocumentTypeId
                          and Documents.deletedAt is null
  left outer join FieldData on FieldData.FieldId = Fields.Id
                           and FieldData.DocumentId = Documents.Id
                           and FieldData.deletedAt is null
 where DocumentTypeFields.deletedAt is null
```
