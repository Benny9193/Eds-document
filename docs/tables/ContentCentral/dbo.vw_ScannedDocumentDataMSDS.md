# View: `dbo.vw_ScannedDocumentDataMSDS`

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
| 6 | `FullFileName` | nvarchar(520) | NO |  |  |
| 7 | `VersionMajor` | int | NO |  |  |
| 8 | `VersionMinor` | int | NO |  |  |
| 9 | `CreatedUtc` | datetime | NO |  |  |
| 10 | `PagesCaptured` | int | NO |  |  |
| 11 | `DocId` | uniqueidentifier | NO |  |  |
| 12 | `RevisionDate` | datetime | YES |  |  |
| 13 | `CategoryName` | nvarchar(max) | NO |  |  |
| 14 | `EDSItemCode` | nvarchar(max) | NO |  |  |
| 15 | `ManufacturerName` | nvarchar(max) | NO |  |  |
| 16 | `ProductName` | nvarchar(max) | NO |  |  |
| 17 | `ManufacturerPartNumber` | nvarchar(max) | NO |  |  |
| 18 | `EPARegistrationNumber` | nvarchar(max) | NO |  |  |
| 19 | `SendTo` | nvarchar(max) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Catalog`](dbo.Catalog.md) | USER_TABLE |
| [`dbo.DocType`](dbo.DocType.md) | USER_TABLE |
| [`dbo.DocTypeField`](dbo.DocTypeField.md) | USER_TABLE |
| [`dbo.Document`](dbo.Document.md) | USER_TABLE |
| [`dbo.DocumentField`](dbo.DocumentField.md) | USER_TABLE |
| [`dbo.DocumentFolder`](dbo.DocumentFolder.md) | USER_TABLE |
| [`dbo.DocumentVersion`](dbo.DocumentVersion.md) | USER_TABLE |
| [`dbo.DocumentVersionFile`](dbo.DocumentVersionFile.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[vw_ScannedDocumentDataMSDS] as
select Catalog.Name CatalogName, 
       DocType.Name DocumentType,
       DocumentFolder.DocFolder, 
       DocumentVersionFile.DocName, 
       DocumentVersionFile.BaseName,
       DocumentFolder.DocFolder + DocumentVersionFile.DocName as FullFileName,
       DocumentVersion.VersionMajor,
       DocumentVersion.VersionMinor,
       DocumentVersion.CreatedUtc,
       DocumentVersion.PagesCaptured,
       Document.Id DocId,
       cast( (select case isnull(df.IndexFieldText,'') when '' then isnull(df.MemoFieldText,'') else isnull(df.IndexFieldText,'') end
				  from ContentCentral.dbo.DocTypeField dtf 
				  join ContentCentral.dbo.DocumentField df on df.DocumentId = Document.Id
														  and df.DocTypeFieldId = dtf.Id
				 where dtf.DocTypeId = DocType.Id
				   and dtf.Name = 'Revision Date') AS DATETIME ) RevisionDate,
       isnull( (select case isnull(df.IndexFieldText,'') when '' then isnull(df.MemoFieldText,'') else isnull(df.IndexFieldText,'') end
				  from ContentCentral.dbo.DocTypeField dtf 
				  join ContentCentral.dbo.DocumentField df on df.DocumentId = Document.Id
								                          and df.DocTypeFieldId = dtf.Id
				 where dtf.DocTypeId = DocType.Id
				   and dtf.Name = 'Category'),'') CategoryName,
       isnull( (select case isnull(df.IndexFieldText,'') when '' then isnull(df.MemoFieldText,'') else isnull(df.IndexFieldText,'') end
				  from ContentCentral.dbo.DocTypeField dtf 
				  join ContentCentral.dbo.DocumentField df on df.DocumentId = Document.Id
								                          and df.DocTypeFieldId = dtf.Id
				 where dtf.DocTypeId = DocType.Id
				   and dtf.Name = 'EDS Item Code'),'') EDSItemCode,
       isnull( (select case isnull(df.IndexFieldText,'') when '' then isnull(df.MemoFieldText,'') else isnull(df.IndexFieldText,'') end
				  from ContentCentral.dbo.DocTypeField dtf 
				  join ContentCentral.dbo.DocumentField df on df.DocumentId = Document.Id
								                          and df.DocTypeFieldId = dtf.Id
				 where dtf.DocTypeId = DocType.Id
				   and dtf.Name = 'Manufacturer Name'),'') ManufacturerName,
       isnull( (select case isnull(df.IndexFieldText,'') when '' then isnull(df.MemoFieldText,'') else isnull(df.IndexFieldText,'') end
				  from ContentCentral.dbo.DocTypeField dtf 
				  join ContentCentral.dbo.DocumentField df on df.DocumentId = Document.Id
								                          and df.DocTypeFieldId = dtf.Id
				 where dtf.DocTypeId = DocType.Id
				   and dtf.Name = 'Product Name'),'') ProductName,
       isnull( (select case isnull(df.IndexFieldText,'') when '' then isnull(df.MemoFieldText,'') else isnull(df.IndexFieldText,'') end
				  from ContentCentral.dbo.DocTypeField dtf 
				  join ContentCentral.dbo.DocumentField df on df.DocumentId = Document.Id
								                          and df.DocTypeFieldId = dtf.Id
				 where dtf.DocTypeId = DocType.Id
				   and dtf.Name = 'Manufacturer Part Number'),'') ManufacturerPartNumber,
       isnull( (select case isnull(df.IndexFieldText,'') when '' then isnull(df.MemoFieldText,'') else isnull(df.IndexFieldText,'') end
				  from ContentCentral.dbo.DocTypeField dtf 
				  join ContentCentral.dbo.DocumentField df on df.DocumentId = Document.Id
								                          and df.DocTypeFieldId = dtf.Id
				 where dtf.DocTypeId = DocType.Id
				   and dtf.Name = 'EPA Registration Number'),'') EPARegistrationNumber,
       isnull( (select case isnull(df.IndexFieldText,'') when '' then isnull(df.MemoFieldText,'') else isnull(df.IndexFieldText,'') end
				  from ContentCentral.dbo.DocTypeField dtf 
				  join ContentCentral.dbo.DocumentField df on df.DocumentId = Document.Id
							                              and df.DocTypeFieldId = dtf.Id
				 where dtf.DocTypeId = DocType.Id
				   and dtf.Name = 'Send To'),'') SendTo
  from ContentCentral.dbo.Catalog Catalog with (nolock)
  join ContentCentral.dbo.DocType DocType on DocType.CatalogId = Catalog.Id
  join ContentCentral.dbo.Document Document on Document.DocTypeId = DocType.Id
  join ContentCentral.dbo.DocumentVersion DocumentVersion on DocumentVersion.Id = 
    (select top 1 dv.Id
       from ContentCentral.dbo.DocumentVersion dv with (nolock)
       join ContentCentral.dbo.DocumentVersionFile dvf on dvf.DocumentVersionId = dv.Id
      where dv.DocumentId = Document.Id
      order by dv.CreatedUtc Desc)
  join ContentCentral.dbo.DocumentVersionFile DocumentVersionFile on DocumentVersionFile.DocumentVersionId = DocumentVersion.Id
  join ContentCentral.dbo.DocumentFolder DocumentFolder on DocumentFolder.Id = DocumentVersionFile.DocumentFolderId
 where Catalog.Name = 'MSDS'
   and (select case isnull(df.IndexFieldText,'') when '' then isnull(df.MemoFieldText,'') else isnull(df.IndexFieldText,'') end
          from ContentCentral.dbo.DocTypeField dtf 
		  join ContentCentral.dbo.DocumentField df on df.DocumentId = Document.Id
                                                  and df.DocTypeFieldId = dtf.Id
		 where dtf.DocTypeId = DocType.Id
           and dtf.Name = 'Send To') = 'Completed'
```
