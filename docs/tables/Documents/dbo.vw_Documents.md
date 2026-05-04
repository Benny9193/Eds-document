# View: `dbo.vw_Documents`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO |  |  |
| 2 | `DocumentTypeId` | uniqueidentifier | NO |  |  |
| 3 | `PageCount` | int | YES |  |  |
| 4 | `DocumentTypeName` | varchar(255) | NO |  |  |
| 5 | `FileSize` | bigint | YES |  |  |
| 6 | `Version` | bigint | YES |  |  |
| 7 | `DocumentName` | varchar(255) | YES |  |  |
| 8 | `FileName` | varchar(8000) | YES |  |  |
| 9 | `Datestamp` | datetime | NO |  |  |
| 10 | `FileTypeName` | varchar(255) | NO |  |  |
| 11 | `MimeType` | varchar(255) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `DocumentFiles` | USER_TABLE |
| `Documents` | USER_TABLE |
| `DocumentTypes` | USER_TABLE |
| `FileTypes` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[vw_Documents] as
select Documents.Id, Documents.DocumentTypeId, Documents.PageCount, DocumentTypes.Name DocumentTypeName, DocumentFiles.FileSize, cast(DocumentFiles.Version as bigint) Version, DocumentFiles.Name DocumentName, replace (DocumentFiles.FileName,'ed-data.local','192.168.1.102') FileName, DocumentFiles.Datestamp, FileTypes.Name FileTypeName, FileTypes.MimeType
  from Documents
  join DocumentTypes on DocumentTypes.Id = Documents.DocumentTypeId
                    and DocumentTypes.deletedAt is null
  join DocumentFiles on DocumentFiles.Id =
    (Select top 1 df.Id
       from DocumentFiles df
      where df.DocumentId = Documents.Id
        and df.deletedAt is null
      order by df.Version desc, df.Datestamp desc)
  join FileTypes on FileTypes.Id = DocumentFiles.FileTypeId
 where Documents.deletedAt is null
```
