# View: `dbo.vw_DocumentTypeLookupKeys`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO |  |  |
| 2 | `DocumentTypeLookupId` | uniqueidentifier | NO |  |  |
| 3 | `Sequence` | int | YES |  |  |
| 4 | `ColumnName` | varchar(255) | YES |  |  |
| 5 | `Operand` | varchar(20) | YES |  |  |
| 6 | `Boolean` | varchar(20) | YES |  |  |
| 7 | `Constant` | bit | YES |  |  |
| 8 | `MatchData` | varchar(255) | YES |  |  |
| 9 | `DocumentTypeId` | uniqueidentifier | NO |  |  |
| 10 | `ExternalSource` | varchar(255) | YES |  |  |
| 11 | `TableName` | varchar(255) | YES |  |  |
| 12 | `LookupSequence` | int | YES |  |  |
| 13 | `FieldName` | varchar(255) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `DocumentTypeLookupKeys` | USER_TABLE |
| `DocumentTypeLookups` | USER_TABLE |
| `Fields` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[vw_DocumentTypeLookupKeys] as
select DocumentTypeLookupKeys.Id, DocumentTypeLookupKeys.DocumentTypeLookupId, DocumentTypeLookupKeys.Sequence, DocumentTypeLookupKeys.ColumnName, DocumentTypeLookupKeys.Operand, DocumentTypeLookupKeys.Boolean, DocumentTypeLookupKeys.Constant, DocumentTypeLookupKeys.MatchData, DocumentTypeLookups.DocumentTypeId, DocumentTypeLookups.ExternalSource, DocumentTypeLookups.TableName, DocumentTypeLookups.Sequence LookupSequence, case when DocumentTypeLookupKeys.Constant = 0 then (select Fields.Name from Fields where Fields.Id = CAST(DocumentTypeLookupKeys.MatchData as uniqueidentifier)) else '' end FieldName
  from DocumentTypeLookupKeys
  join DocumentTypeLookups on DocumentTypeLookups.Id = DocumentTypeLookupKeys.DocumentTypeLookupId
                          and DocumentTypeLookups.deletedAt is null
 where DocumentTypeLookupKeys.deletedAt is null
```
