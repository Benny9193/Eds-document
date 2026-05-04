# View: `dbo.vw_FieldDatas`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO` &nbsp;|&nbsp; Schema-bound

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `FieldId` | uniqueidentifier | NO |  |  |
| 2 | `FieldType` | varchar(50) | NO |  |  |
| 3 | `MaxLength` | int | YES |  |  |
| 4 | `Decimals` | int | YES |  |  |
| 5 | `Name` | varchar(255) | NO |  |  |
| 6 | `Prompt` | varchar(255) | YES |  |  |
| 7 | `EditMask` | varchar(255) | YES |  |  |
| 8 | `DefaultValue` | varchar(255) | YES |  |  |
| 9 | `MultiLine` | bit | YES |  |  |
| 10 | `UseChoices` | bit | YES |  |  |
| 11 | `AllowNewChoices` | bit | YES |  |  |
| 12 | `UpdateChoices` | bit | YES |  |  |
| 13 | `RestrictDuplicates` | bit | YES |  |  |
| 14 | `Height` | int | YES |  |  |
| 15 | `ValidationExp` | varchar(4096) | YES |  |  |
| 16 | `FieldChoices` | varchar(max) | YES |  |  |
| 17 | `ExternalSource` | varchar(255) | YES |  |  |
| 18 | `TableName` | varchar(255) | YES |  |  |
| 19 | `ColumnName` | varchar(255) | YES |  |  |
| 20 | `FieldDataId` | uniqueidentifier | NO |  |  |
| 21 | `FieldValue` | varchar(max) | YES |  |  |
| 22 | `DocumentId` | uniqueidentifier | NO |  |  |
| 23 | `updatedAt` | datetime | YES |  |  |
| 24 | `DocumentTypeId` | uniqueidentifier | NO |  |  |
| 25 | `Sequence` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Documents`](dbo.Documents.md) | USER_TABLE |
| [`dbo.DocumentTypeFields`](dbo.DocumentTypeFields.md) | USER_TABLE |
| [`dbo.FieldData`](dbo.FieldData.md) | USER_TABLE |
| [`dbo.Fields`](dbo.Fields.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[vw_FieldDatas] with schemabinding as
select	Fields.Id FieldId, Fields.FieldType, Fields.MaxLength, Fields.Decimals, Fields.Name, Fields.Prompt, Fields.EditMask, Fields.DefaultValue, Fields.MultiLine, Fields.UseChoices, Fields.AllowNewChoices, Fields.UpdateChoices, Fields.RestrictDuplicates, Fields.Height, Fields.ValidationExp, Fields.FieldChoices, Fields.ExternalSource, Fields.TableName, Fields.ColumnName,
		FieldData.Id FieldDataId, 
		FieldData.FieldValue FieldValue, 
		FieldData.DocumentId DocumentId, 
		FieldData.updatedAt updatedAt, 
		DocumentTypeFields.DocumentTypeId, DocumentTypeFields.Sequence
  from dbo.Fields
  join dbo.DocumentTypeFields on DocumentTypeFields.FieldId = Fields.Id
                             and DocumentTypeFields.deletedAt is null
  join dbo.Documents on Documents.DocumentTypeId = DocumentTypeFields.DocumentTypeId
                    and Documents.deletedAt is null
  /*left outer */join dbo.FieldData on FieldData.DocumentId = Documents.Id
                               and FieldData.FieldId = Fields.Id
                               and FieldData.Id =
    (Select top 1 Fd.Id
       from dbo.FieldData fd
      where fd.FieldId = Fields.Id
        and fd.DocumentId = Documents.Id
        and fd.deletedAt is null
      order by fd.updatedAt desc)
 where Fields.deletedAt is null  
   and Fields.Name not like '*%'
```
