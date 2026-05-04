# View: `dbo.DocumentPath`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO` &nbsp;|&nbsp; Schema-bound

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DocumentId` | uniqueidentifier | NO |  |  |
| 2 | `DocumentVersionId` | uniqueidentifier | NO |  |  |
| 3 | `DocTypeId` | uniqueidentifier | NO |  |  |
| 4 | `DocumentFolderId` | uniqueidentifier | NO |  |  |
| 5 | `CatalogName` | nvarchar(50) | NO |  |  |
| 6 | `DocTypeName` | nvarchar(50) | NO |  |  |
| 7 | `DocFolder` | nvarchar(260) | NO |  |  |
| 8 | `BaseName` | nvarchar(260) | NO |  |  |
| 9 | `DocName` | nvarchar(260) | NO |  |  |
| 10 | `VersionMajor` | int | NO |  |  |
| 11 | `VersionMinor` | int | NO |  |  |
| 12 | `DocPath` | nvarchar(520) | NO |  |  |
| 13 | `ModifiedUtc` | datetime | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Catalog`](dbo.Catalog.md) | USER_TABLE |
| [`dbo.DocType`](dbo.DocType.md) | USER_TABLE |
| [`dbo.Document`](dbo.Document.md) | USER_TABLE |
| [`dbo.DocumentFolder`](dbo.DocumentFolder.md) | USER_TABLE |
| [`dbo.DocumentVersion`](dbo.DocumentVersion.md) | USER_TABLE |
| [`dbo.DocumentVersionFile`](dbo.DocumentVersionFile.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[DocumentPath]
WITH SCHEMABINDING 
AS
SELECT     dbo.[Document].Id AS DocumentId, dbo.DocumentVersion.Id AS DocumentVersionId, dbo.[Document].DocTypeId, dbo.DocumentVersionFile.DocumentFolderId, 
                      dbo.Catalog.Name AS CatalogName, dbo.DocType.Name AS DocTypeName, dbo.DocumentFolder.DocFolder, dbo.DocumentVersionFile.BaseName, 
                      dbo.DocumentVersionFile.DocName, dbo.DocumentVersion.VersionMajor, dbo.DocumentVersion.VersionMinor, 
                      dbo.DocumentFolder.DocFolder + dbo.DocumentVersionFile.DocName AS DocPath, dbo.[Document].ModifiedUtc
FROM         dbo.[Document] INNER JOIN
                      dbo.DocumentVersion ON dbo.[Document].Id = dbo.DocumentVersion.DocumentId INNER JOIN
                      dbo.DocumentVersionFile ON dbo.DocumentVersion.Id = dbo.DocumentVersionFile.DocumentVersionId INNER JOIN
                      dbo.DocumentFolder ON dbo.DocumentVersionFile.DocumentFolderId = dbo.DocumentFolder.Id INNER JOIN
                      dbo.DocType ON dbo.[Document].DocTypeId = dbo.DocType.Id INNER JOIN
                      dbo.Catalog ON dbo.DocType.CatalogId = dbo.Catalog.Id
```
