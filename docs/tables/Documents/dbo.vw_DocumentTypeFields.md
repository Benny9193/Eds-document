# View: `dbo.vw_DocumentTypeFields`

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
| 18 | `FieldChoices` | varchar(max) | YES |  |  |
| 19 | `DefaultValue` | varchar(255) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `DocumentTypeFields` | USER_TABLE |
| `Fields` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[vw_DocumentTypeFields]
as
select DocumentTypeFields.Id, DocumentTypeFields.DocumentTypeId, DocumentTypeFields.Sequence, 
		Fields.Id FieldId, Fields.Name FieldName, Fields.Prompt, Fields.FieldType, Fields.MultiLine, Fields.Decimals, Fields.Height, Fields.EditMask, Fields.MaxLength, Fields.Required, Fields.UseChoices, Fields.ValidationExp, Fields.AllowNewChoices, Fields.UpdateChoices, Fields.FieldChoices, Fields.DefaultValue
  from DocumentTypeFields 
  join Fields on Fields.Id = DocumentTypeFields.FieldId
             and Fields.deletedAt is null
             and Fields.Name not like '*%'
 where DocumentTypeFields.deletedAt is null
```
