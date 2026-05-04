# View: `dbo.vw_DMSSDSDocuments_View`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

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
| `dbo.DocumentTypes` | unresolved |
| `dbo.FieldData` | unresolved |
| `dbo.Fields` | unresolved |
| [`Documents.dbo.DocumentFiles`](../Documents/dbo.DocumentFiles.md) | cross-database |
| [`Documents.dbo.Documents`](../Documents/dbo.Documents.md) | cross-database |
| [`Documents.dbo.DocumentTypes`](../Documents/dbo.DocumentTypes.md) | cross-database |
| [`Documents.dbo.FieldData`](../Documents/dbo.FieldData.md) | cross-database |
| [`Documents.dbo.Fields`](../Documents/dbo.Fields.md) | cross-database |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_DMSSDSDocuments_View] as
SELECT	fdMSDSId.FieldValue MSDSId,
          DocumentFiles.Id DocId, DocumentFiles.PageCount PagesCaptured, DocumentFiles.FileName DocName
FROM	Documents.dbo.Documents Documents with (nolock)
join	Documents.dbo.DocumentFiles DocumentFiles on DocumentFiles.DocumentId = Documents.Id
                                                 and DocumentFiles.Id =
  (select Top 1 df.Id
     from Documents.dbo.DocumentFiles df
    where df.DocumentId = Documents.Id
      and df.deletedAt is null
    order by df.Datestamp desc)
-- Get Document Types of 'Safety Data Sheets'
join Documents.dbo.DocumentTypes DocumentTypes on DocumentTypes.Id = Documents.DocumentTypeId
                                              and DocumentTypes.Name = 'Safety Data Sheets'
                                              and DocumentTypes.deletedAt is null
-- Get MSDSId from Data
join Documents.dbo.FieldData fdMSDSId on fdMSDSId.DocumentId = Documents.Id
                                     and fdMSDSId.deletedAt is null
join Documents.dbo.Fields fMSDSId on fMSDSId.Id = fdMSDSId.FieldId
                                 and fMSDSId.Name = 'MSDS Identifier Sheet'
                                 and fMSDSId.deletedAt is null
group by fdMSDSId.FieldValue, DocumentFiles.Id, DocumentFiles.PageCount, DocumentFiles.FileName
```
