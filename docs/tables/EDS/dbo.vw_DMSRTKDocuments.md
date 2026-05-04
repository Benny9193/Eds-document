# View: `dbo.vw_DMSRTKDocuments`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `MSDSId` | varchar(max) | YES |  |  |
| 2 | `DocId` | uniqueidentifier | NO |  |  |
| 3 | `PagesCaptured` | int | YES |  |  |
| 4 | `DocName` | varchar(1024) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `dbo.DocumentFiles` | unresolved |
| `dbo.Documents` | unresolved |
| `dbo.DocumentTypeFields` | unresolved |
| `dbo.DocumentTypes` | unresolved |
| `dbo.FieldData` | unresolved |
| `dbo.Fields` | unresolved |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[vw_DMSRTKDocuments] as
SELECT	fdSS.FieldValue MSDSId,
          DocumentFiles.Id DocId, DocumentFiles.PageCount PagesCaptured, DocumentFiles.FileName DocName
FROM	Documents.dbo.Documents Documents with (nolock)
join	Documents.dbo.DocumentFiles DocumentFiles on DocumentFiles.DocumentId = Documents.Id
                                                 and DocumentFiles.Id =
  (select Top 1 df.Id
     from Documents.dbo.DocumentFiles df
    where df.DocumentId = Documents.Id
      and df.deletedAt is null
    order by df.Datestamp desc)
-- Get Document Types of 'RTK Annual Reports'
join Documents.dbo.DocumentTypes DocumentTypes on DocumentTypes.Id = Documents.DocumentTypeId
                                              and DocumentTypes.Name = 'RTK Annual Reports'
                                              and DocumentTypes.deletedAt is null
join Documents.dbo.DocumentTypeFields on DocumentTypeFields.DocumentTypeId = DocumentTypes.Id
                                     and DocumentTypeFields.deletedAt is null
join Documents.dbo.Fields fSS on fSS.Id = DocumentTypeFields.FieldId
                             and fSS.Name = 'RTK Document Type'
                             and fSS.deletedAt is null
-- Get 'State Survey' field from Data
join Documents.dbo.FieldData fdSS on fdSS.DocumentId = Documents.Id
                                 and fdSS.FieldId = fSS.Id
                                 and fdSS.deletedAt is null
                                 and fdSS.FieldValue = 'State Survey'
group by fdSS.FieldValue, DocumentFiles.Id, DocumentFiles.PageCount, DocumentFiles.FileName
```
