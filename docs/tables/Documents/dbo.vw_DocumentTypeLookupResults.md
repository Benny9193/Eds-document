# View: `dbo.vw_DocumentTypeLookupResults`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO |  |  |
| 2 | `DocumentTypeLookupId` | uniqueidentifier | NO |  |  |
| 3 | `Sequence` | int | YES |  |  |
| 4 | `Overwrite` | bit | YES |  |  |
| 5 | `TargetFieldId` | uniqueidentifier | NO |  |  |
| 6 | `ColumnName` | varchar(255) | YES |  |  |
| 7 | `DocumentTypeId` | uniqueidentifier | NO |  |  |
| 8 | `LookupSequence` | int | YES |  |  |
| 9 | `FieldId` | uniqueidentifier | NO |  |  |
| 10 | `TargetFieldName` | varchar(255) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `DocumentTypeLookupResults` | USER_TABLE |
| `DocumentTypeLookups` | USER_TABLE |
| `Fields` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[vw_DocumentTypeLookupResults] as
select DocumentTypeLookupResults.Id, DocumentTypeLookupResults.DocumentTypeLookupId, DocumentTypeLookupResults.Sequence, DocumentTypeLookupResults.Overwrite, DocumentTypeLookupResults.TargetFieldId, DocumentTypeLookupResults.ColumnName, DocumentTypeLookups.DocumentTypeId, DocumentTypeLookups.Sequence LookupSequence, Fields.Id FieldId, Fields.Name TargetFieldName
  from DocumentTypeLookupResults
  join Fields on Fields.Id = DocumentTypeLookupResults.TargetFieldId
             and Fields.deletedAt is null
  join DocumentTypeLookups on DocumentTypeLookups.Id = DocumentTypeLookupResults.DocumentTypeLookupId
                          and DocumentTypeLookups.deletedAt is null
 where DocumentTypeLookupResults.deletedAt is null
```
