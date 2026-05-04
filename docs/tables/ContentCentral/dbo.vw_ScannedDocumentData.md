# View: `dbo.vw_ScannedDocumentData`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CatalogName` | nvarchar(50) | NO |  |  |
| 2 | `DocumentType` | nvarchar(50) | NO |  |  |
| 3 | `DocFolder` | nvarchar(260) | NO |  |  |
| 4 | `DocName` | nvarchar(260) | NO |  |  |
| 5 | `BaseName` | nvarchar(260) | NO |  |  |
| 6 | `VersionMajor` | int | NO |  |  |
| 7 | `VersionMinor` | int | NO |  |  |
| 8 | `CreatedUtc` | datetime | NO |  |  |
| 9 | `FieldName` | nvarchar(50) | NO |  |  |
| 10 | `FieldValue` | nvarchar(560) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Catalog` | USER_TABLE |
| `DocType` | USER_TABLE |
| `DocTypeField` | USER_TABLE |
| `Document` | USER_TABLE |
| `DocumentField` | USER_TABLE |
| `DocumentFolder` | USER_TABLE |
| `DocumentVersion` | USER_TABLE |
| `DocumentVersionFile` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create view [dbo].[vw_ScannedDocumentData] as
select Catalog.Name CatalogName, 
       DocType.Name DocumentType,
       DocumentFolder.DocFolder, 
       DocumentVersionFile.DocName, 
       DocumentVersionFile.BaseName,
       DocumentVersion.VersionMajor,
       DocumentVersion.VersionMinor,
       DocumentVersion.CreatedUtc,
       DocTypeField.Name FieldName,
       DocumentField.IndexFieldText FieldValue
  from Catalog with (nolock)
  join DocType on DocType.CatalogId = Catalog.Id
  join Document on Document.DocTypeId = DocType.Id
  join DocumentVersion on DocumentVersion.DocumentId = Document.Id
  join DocumentVersionFile on DocumentVersionFile.DocumentVersionId = DocumentVersion.Id
  join DocumentFolder on DocumentFolder.Id = DocumentVersionFile.DocumentFolderId
  join DocTypeField on DocTypeField.DocTypeId = DocType.Id
                   and DocTypeField.Name = 'Bid Number*'
  join DocumentField on DocumentField.DocumentId = Document.Id
                    and DocumentField.DocTypeFieldId = DocTypeField.Id
```
