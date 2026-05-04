# View: `dbo.vw_ViewFields`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO |  |  |
| 2 | `ViewId` | uniqueidentifier | NO |  |  |
| 3 | `FieldId` | uniqueidentifier | NO |  |  |
| 4 | `Sequence` | int | YES |  |  |
| 5 | `Name` | varchar(255) | NO |  |  |
| 6 | `Prompt` | varchar(255) | YES |  |  |
| 7 | `Required` | bit | YES |  |  |
| 8 | `FieldType` | varchar(50) | NO |  |  |
| 9 | `MaxLength` | int | YES |  |  |
| 10 | `Decimals` | int | YES |  |  |
| 11 | `MultiLine` | bit | YES |  |  |
| 12 | `Height` | int | YES |  |  |
| 13 | `EditMask` | varchar(255) | YES |  |  |
| 14 | `ValidationExp` | varchar(4096) | YES |  |  |
| 15 | `UseChoices` | bit | YES |  |  |
| 16 | `AllowNewChoices` | bit | YES |  |  |
| 17 | `UpdateChoices` | bit | YES |  |  |
| 18 | `RestrictDuplicates` | bit | YES |  |  |
| 19 | `DefaultValue` | varchar(255) | YES |  |  |
| 20 | `ExternalSource` | varchar(255) | YES |  |  |
| 21 | `TableName` | varchar(255) | YES |  |  |
| 22 | `ColumnName` | varchar(255) | YES |  |  |
| 23 | `ColumnWidth` | bigint | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `FieldData` | USER_TABLE |
| `Fields` | USER_TABLE |
| `ViewFields` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[vw_ViewFields] as
select ViewFields.Id, ViewFields.ViewId, ViewFields.FieldId, ViewFields.Sequence, Fields.Name, Fields.Prompt, Fields.Required, Fields.FieldType, Fields.MaxLength, Fields.Decimals, Fields.MultiLine, Fields.Height, Fields.EditMask, Fields.ValidationExp, Fields.UseChoices, Fields.AllowNewChoices, Fields.UpdateChoices, Fields.RestrictDuplicates, Fields.DefaultValue, Fields.ExternalSource, Fields.TableName, Fields.ColumnName, coalesce(Fields.ColumnWidth,(select max(len(fd.FieldValue)) from FieldData fd where fd.FieldId = Fields.Id),60) ColumnWidth
  from ViewFields
  join Fields on Fields.Id = ViewFields.FieldId
             and Fields.deletedAt is null
 where ViewFields.deletedAt is null
```
