# View: `dbo.vw_ScannedDocumentDataMSDS`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

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
| 13 | `CategoryName` | nvarchar(50) | YES |  |  |
| 14 | `EDSItemCode` | nvarchar(4000) | YES |  |  |
| 15 | `ManufacturerName` | nvarchar(4000) | YES |  |  |
| 16 | `ProductName` | nvarchar(4000) | YES |  |  |
| 17 | `ManufacturerPartNumber` | nvarchar(4000) | YES |  |  |
| 18 | `EPARegistrationNumber` | nvarchar(4000) | YES |  |  |
| 19 | `SendTo` | nvarchar(4000) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Catalog`](dbo.Catalog.md) | unresolved |
| `dbo.DocType` | unresolved |
| `dbo.DocTypeField` | unresolved |
| `dbo.Document` | unresolved |
| `dbo.DocumentField` | unresolved |
| `dbo.DocumentFolder` | unresolved |
| `dbo.DocumentVersion` | unresolved |
| `dbo.DocumentVersionFile` | unresolved |

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
       Convert(DATETIME, 
                 (select case isnull(df.IndexFieldText,'') when '' then isnull(df.MemoFieldText,'') else isnull(df.IndexFieldText,'') end
				  from ContentCentral.dbo.DocTypeField dtf 
				  join ContentCentral.dbo.DocumentField df on df.DocumentId = Document.Id
														  and df.DocTypeFieldId = dtf.Id
				 where dtf.DocTypeId = DocType.Id
				   and dtf.Name = 'Revision Date'), 101 ) RevisionDate,
       cast(isnull( (select case isnull(df.IndexFieldText,'') when '' then isnull(df.MemoFieldText,'') else isnull(df.IndexFieldText,'') end
				  from ContentCentral.dbo.DocTypeField dtf 
				  join ContentCentral.dbo.DocumentField df on df.DocumentId = Document.Id
								                          and df.DocTypeFieldId = dtf.Id
				 where dtf.DocTypeId = DocType.Id
				   and dtf.Name = 'Category'),'') 
       as nvarchar(50)) CategoryName,
       cast(isnull( (select case isnull(df.IndexFieldText,'') when '' then isnull(df.MemoFieldText,'') else isnull(df.IndexFieldText,'') end
				  from ContentCentral.dbo.DocTypeField dtf 
				  join ContentCentral.dbo.DocumentField df on df.DocumentId = Document.Id
								                          and df.DocTypeFieldId = dtf.Id
				 where dtf.DocTypeId = DocType.Id
				   and dtf.Name = 'EDS Item Code'),'') 
       as nvarchar(4000)) EDSItemCode,
       cast(isnull( (select case isnull(df.IndexFieldText,'') when '' then isnull(df.MemoFieldText,'') else isnull(df.IndexFieldText,'') end
				  from ContentCentral.dbo.DocTypeField dtf 
				  join ContentCentral.dbo.DocumentField df on df.DocumentId = Document.Id
								                          and df.DocTypeFieldId = dtf.Id
				 where dtf.DocTypeId = DocType.Id
				   and dtf.Name = 'Manufacturer Name'),'') 
       as nvarchar(4000)) ManufacturerName,
       cast(isnull( (select case isnull(df.IndexFieldText,'') when '' then isnull(df.MemoFieldText,'') else isnull(df.IndexFieldText,'') end
				  from ContentCentral.dbo.DocTypeField dtf 
				  join ContentCentral.dbo.DocumentField df on df.DocumentId = Document.Id
								                          and df.DocTypeFieldId = dtf.Id
				 where dtf.DocTypeId = DocType.Id
				   and dtf.Name = 'Product Name'),'') 
       as nvarchar(4000)) ProductName,
       cast(isnull( (select case isnull(df.IndexFieldText,'') when '' then isnull(df.MemoFieldText,'') else isnull(df.IndexFieldText,'') end
				  from ContentCentral.dbo.DocTypeField dtf 
				  join ContentCentral.dbo.DocumentField df on df.DocumentId = Document.Id
								                          and df.DocTypeFieldId = dtf.Id
				 where dtf.DocTypeId = DocType.Id
				   and dtf.Name = 'Manufacturer Part Number'),'') 
       as nvarchar(4000)) ManufacturerPartNumber,
       cast(isnull( (select case isnull(df.IndexFieldText,'') when '' then isnull(df.MemoFieldText,'') else isnull(df.IndexFieldText,'') end
				  from ContentCentral.dbo.DocTypeField dtf 
				  join ContentCentral.dbo.DocumentField df on df.DocumentId = Document.Id
								                          and df.DocTypeFieldId = dtf.Id
				 where dtf.DocTypeId = DocType.Id
				   and dtf.Name = 'EPA Registration Number'),'')
       as nvarchar(4000)) EPARegistrationNumber,
       Cast(isnull( (select case isnull(df.IndexFieldText,'') when '' then isnull(df.MemoFieldText,'') else isnull(df.IndexFieldText,'') end
				  from ContentCentral.dbo.DocTypeField dtf 
				  join ContentCentral.dbo.DocumentField df on df.DocumentId = Document.Id
							                              and df.DocTypeFieldId = dtf.Id
				 where dtf.DocTypeId = DocType.Id
				   and dtf.Name = 'Send To'),'') 
       as nvarchar(4000)) SendTo
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

/*
ALTER view [dbo].[vw_ScannedDocumentDataMSDS] as
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
				   and dtf.Name = 'Revision Date'),'') RevisionDate,
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
*/
```
