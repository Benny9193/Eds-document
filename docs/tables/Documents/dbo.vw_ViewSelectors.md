# View: `dbo.vw_ViewSelectors`

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
| 5 | `Operand` | varchar(20) | YES |  |  |
| 6 | `Constant` | bit | YES |  |  |
| 7 | `MatchData` | varchar(255) | YES |  |  |
| 8 | `Boolean` | varchar(20) | YES |  |  |
| 9 | `Grouping` | varchar(20) | YES |  |  |
| 10 | `Name` | varchar(255) | NO |  |  |
| 11 | `Prompt` | varchar(255) | YES |  |  |
| 12 | `Required` | bit | YES |  |  |
| 13 | `FieldType` | varchar(50) | NO |  |  |
| 14 | `MaxLength` | int | YES |  |  |
| 15 | `Decimals` | int | YES |  |  |
| 16 | `MultiLine` | bit | YES |  |  |
| 17 | `Height` | int | YES |  |  |
| 18 | `EditMask` | varchar(255) | YES |  |  |
| 19 | `ValidationExp` | varchar(4096) | YES |  |  |
| 20 | `UseChoices` | bit | YES |  |  |
| 21 | `AllowNewChoices` | bit | YES |  |  |
| 22 | `UpdateChoices` | bit | YES |  |  |
| 23 | `RestrictDuplicates` | bit | YES |  |  |
| 24 | `DefaultValue` | varchar(255) | YES |  |  |
| 25 | `ExternalSource` | varchar(255) | YES |  |  |
| 26 | `TableName` | varchar(255) | YES |  |  |
| 27 | `ColumnName` | varchar(255) | YES |  |  |
| 28 | `SelectorStatement` | varchar(max) | YES |  |  |
| 29 | `MatchFieldId` | uniqueidentifier | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Fields` | USER_TABLE |
| `ViewSelectors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[vw_ViewSelectors] as
select ViewSelectors.Id, ViewSelectors.ViewId, ViewSelectors.FieldId, ViewSelectors.Sequence, ViewSelectors.Operand, ViewSelectors.Constant, ViewSelectors.MatchData, ViewSelectors.Boolean, ViewSelectors.Grouping, Fields.Name, Fields.Prompt, Fields.Required, Fields.FieldType, Fields.MaxLength, Fields.Decimals, Fields.MultiLine, Fields.Height, Fields.EditMask, Fields.ValidationExp, Fields.UseChoices, Fields.AllowNewChoices, Fields.UpdateChoices, Fields.RestrictDuplicates, Fields.DefaultValue, Fields.ExternalSource, Fields.TableName, Fields.ColumnName, 
		isnull(Fields.SelectorStatement, 'isnull((select top 1 FieldData.FieldValue from FieldData where FieldData.DocumentId = Documents.Id and FieldData.FieldId = ''' + cast(Fields.Id as varchar(50)) + ''' and FieldData.deletedAt is null order by FieldData.updatedAt desc),'''')') SelectorStatement,
		FieldMatch.Id MatchFieldId
  from ViewSelectors
  join Fields on Fields.Id = ViewSelectors.FieldId
             and Fields.deletedAt is null
  left outer join Fields FieldMatch on FieldMatch.Id = case when ISNULL(ViewSelectors.Constant,0) = 0 then CAST(ViewSelectors.MatchData AS Uniqueidentifier) end
                                   and FieldMatch.deletedAt is null
 where ViewSelectors.deletedAt is null
```
