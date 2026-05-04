# View: `dbo.vw_Fields`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO |  |  |
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

## Depends on

| Object | Type |
|--------|------|
| `Fields` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[vw_Fields] as
select Fields.Id, Fields.FieldType, Fields.MaxLength, Fields.ColumnWidth, Fields.Decimals, Fields.Name, Fields.Prompt, Fields.EditMask, 
		Fields.ExternalSource, Fields.TableName, Fields.ColumnName, Fields.DefaultValue, Fields.Required, Fields.MultiLine, 
		Fields.UseChoices, Fields.AllowNewChoices, Fields.UpdateChoices, Fields.RestrictDuplicates, Fields.Height, Fields.ValidationExp, 
		Fields.FieldChoices 
  from Fields
 where Fields.deletedAt is null
```
