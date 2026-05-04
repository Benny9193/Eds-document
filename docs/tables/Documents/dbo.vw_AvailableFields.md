# View: `dbo.vw_AvailableFields`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `FieldId` | uniqueidentifier | NO |  |  |
| 2 | `FieldName` | varchar(255) | NO |  |  |
| 3 | `DocumentTypeId` | uniqueidentifier | YES |  |  |
| 4 | `DocumentTypeName` | varchar(255) | YES |  |  |
| 5 | `Id` | uniqueidentifier | YES |  |  |
| 6 | `Sequence` | int | YES |  |  |
| 7 | `SortKey` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `DocumentTypeFields` | USER_TABLE |
| `DocumentTypes` | USER_TABLE |
| `Fields` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create view [dbo].[vw_AvailableFields]
as
select Fields.Id FieldId, Fields.Name FieldName, 
       DocumentTypes.Id DocumentTypeId, DocumentTypes.Name DocumentTypeName,
       DocumentTypeFields.Id, DocumentTypeFields.Sequence,
       case when DocumentTypeFields.Id is null then 999999 else Sequence end SortKey
  from Fields
  left outer join DocumentTypes on DocumentTypes.deletedAt is null
  left outer join DocumentTypeFields on DocumentTypeFields.FieldId = Fields.Id
                                    and DocumentTypeFields.DocumentTypeId = DocumentTypes.Id
                                    and DocumentTypeFields.deletedAt is null
 where Fields.deletedAt is null
```
