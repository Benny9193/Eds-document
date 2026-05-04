# View: `dbo.vw_RTKContentCentralMSDS`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CatalogName` | varchar(50) | YES |  |  |
| 2 | `DocumentType` | varchar(50) | YES |  |  |
| 3 | `DocFolder` | varchar(260) | YES |  |  |
| 4 | `DocName` | varchar(260) | YES |  |  |
| 5 | `BaseName` | varchar(260) | YES |  |  |
| 6 | `FullFileName` | varchar(520) | YES |  |  |
| 7 | `VersionMajor` | bigint | YES |  |  |
| 8 | `VersionMinor` | bigint | YES |  |  |
| 9 | `CreatedUtc` | datetime | NO |  |  |
| 10 | `PagesCaptured` | int | YES |  |  |
| 11 | `DocId` | uniqueidentifier | NO |  |  |
| 12 | `RevisionDate` | datetime | YES |  |  |
| 13 | `CategoryName` | varchar(50) | YES |  |  |
| 14 | `EDSItemCode` | varchar(100) | YES |  |  |
| 15 | `ManufacturerName` | varchar(100) | YES |  |  |
| 16 | `ProductName` | varchar(100) | YES |  |  |
| 17 | `ManufacturerPartNumber` | varchar(500) | YES |  |  |
| 18 | `EPARegistrationNumber` | varchar(100) | YES |  |  |
| 19 | `SendTo` | varchar(50) | YES |  |  |
| 20 | `AttachedRTKItems` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `MSDS` | USER_TABLE |
| `RTK_Items` | USER_TABLE |
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

| Object | Type |
|--------|------|
| [`dbo.vw_RTK_MSDSandCC`](dbo.vw_RTK_MSDSandCC.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_RTKContentCentralMSDS] as
select Cast('MSDS' as varchar(50)) CatalogName, 
       Cast(DocType.Name as varchar(50)) DocumentType,
       Cast(DocumentFiles.Name as varchar(260)) DocFolder, 
       Cast(DocumentFiles.Name as varchar(260)) DocName, 
       Cast(DocumentFiles.Name as varchar(260)) BaseName,
       Cast( (DocumentFiles.FileName) as varchar(520)) FullFileName,
       DocumentFiles.[Version] VersionMajor,
       DocumentFiles.[Version] VersionMinor,
       DocumentFiles.Datestamp CreatedUtc,
       DocumentFiles.[PageCount] PagesCaptured,
       Document.Id DocId,
       Convert(DATETIME, 
                 (select df.FieldValue
				  from Documents.dbo.Fields dtf 
				  join Documents.dbo.FieldData df on df.DocumentId = Document.Id
											     and df.FieldId = dtf.Id
				 where dtf.Name = 'Revision Date'), 101 ) RevisionDate,
       cast(isnull( (select df.FieldValue
				  from Documents.dbo.Fields dtf 
				  join Documents.dbo.FieldData df on df.DocumentId = Document.Id
								                          and df.FieldId = dtf.Id
				 where dtf.Name = 'Category'),'') 
       as varchar(50)) CategoryName,
       cast(isnull( (select df.FieldValue
				  from Documents.dbo.Fields dtf 
				  join Documents.dbo.FieldData df on df.DocumentId = Document.Id
								                          and df.FieldId = dtf.Id
				 where dtf.Name = 'EDS Item Code'),'') 
       as varchar(100)) EDSItemCode,
       cast(isnull( (select df.FieldValue
				  from Documents.dbo.Fields dtf 
				  join Documents.dbo.FieldData df on df.DocumentId = Document.Id
								                          and df.FieldId = dtf.Id
				 where dtf.Name = 'Manufacturer Name'),'') 
       as varchar(100)) ManufacturerName,
       cast(isnull( (select df.FieldValue
				  from Documents.dbo.Fields dtf 
				  join Documents.dbo.FieldData df on df.DocumentId = Document.Id
								                 and df.FieldId = dtf.Id
				 where dtf.Name = 'Product Name'),'') 
       as varchar(100)) ProductName,
       cast(isnull( (select df.FieldValue
				  from Documents.dbo.Fields dtf 
				  join Documents.dbo.FieldData df on df.DocumentId = Document.Id
								                 and df.FieldId = dtf.Id
				 where dtf.Name = 'Manufacturer Part Number'),'') 
       as varchar(500)) ManufacturerPartNumber,
       cast(isnull( (select df.FieldValue
				  from Documents.dbo.Fields dtf 
				  join Documents.dbo.FieldData df on df.DocumentId = Document.Id
								                 and df.FieldId = dtf.Id
				 where dtf.Name = 'EPA Registration Number'),'')
       as varchar(100)) EPARegistrationNumber,
       Cast(isnull( (select df.FieldValue
				  from Documents.dbo.Fields dtf 
				  join Documents.dbo.FieldData df on df.DocumentId = Document.Id
							                     and df.FieldId = dtf.Id
				 where dtf.Name = 'Send To'),'') 
       as varchar(50)) SendTo, 
       (select count(*) 
        from RTK_Items 
        join MSDS ON MSDS.CurrentVersionMSDSId = RTK_Items.MSDSId 
        where Document.Id = ContentCentralMSDSDocId --Case when Isnull(ContentCentralMSDSDocId,'')='' then NULL else ContentCentralMSDSDocId end
        ) AttachedRTKItems  -- the case statement resolves differences between unique identifier and varchar string - DCH Not Needed 1/12/17
  from Documents.dbo.DocumentTypes DocType with (nolock)
  join Documents.dbo.Documents Document on Document.DocumentTypeId = DocType.Id
  join Documents.dbo.DocumentFiles DocumentFiles on DocumentFiles.DocumentId = Document.Id
                                                and DocumentFiles.Id = 
    (select top 1 df.Id
       from Documents.dbo.DocumentFiles df with (nolock)
      where df.DocumentId = Document.Id
        and df.deletedAt is null
      order by df.Datestamp Desc)
 where DocType.Name = 'MSDS'
   and (select df.FieldValue
          from Documents.dbo.Fields dtf 
		  join Documents.dbo.FieldData df on df.DocumentId = Document.Id
                                         and df.FieldId = dtf.Id
		 where dtf.Name = 'Send To') = 'Completed'

/*
select Cast(Catalog.Name as varchar(50)) CatalogName, 
       Cast(DocType.Name as varchar(50)) DocumentType,
       Cast(DocumentFolder.DocFolder as varchar(260)) DocFolder, 
       Cast(DocumentVersionFile.DocName as varchar(260)) DocName, 
       Cast(DocumentVersionFile.BaseName as varchar(260)) BaseName,
       Cast( (DocumentFolder.DocFolder + DocumentVersionFile.DocName) as varchar(520)) FullFileName,
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
       as varchar(50)) CategoryName,
       cast(isnull( (select case isnull(df.IndexFieldText,'') when '' then isnull(df.MemoFieldText,'') else isnull(df.IndexFieldText,'') end
				  from ContentCentral.dbo.DocTypeField dtf 
				  join ContentCentral.dbo.DocumentField df on df.DocumentId = Document.Id
								                          and df.DocTypeFieldId = dtf.Id
				 where dtf.DocTypeId = DocType.Id
				   and dtf.Name = 'EDS Item Code'),'') 
       as varchar(100)) EDSItemCode,
       cast(isnull( (select case isnull(df.IndexFieldText,'') when '' then isnull(df.MemoFieldText,'') else isnull(df.IndexFieldText,'') end
				  from ContentCentral.dbo.DocTypeField dtf 
				  join ContentCentral.dbo.DocumentField df on df.DocumentId = Document.Id
								                          and df.DocTypeFieldId = dtf.Id
				 where dtf.DocTypeId = DocType.Id
				   and dtf.Name = 'Manufacturer Name'),'') 
       as varchar(100)) ManufacturerName,
       cast(isnull( (select case isnull(df.IndexFieldText,'') when '' then isnull(df.MemoFieldText,'') else isnull(df.IndexFieldText,'') end
				  from ContentCentral.dbo.DocTypeField dtf 
				  join ContentCentral.dbo.DocumentField df on df.DocumentId = Document.Id
								                          and df.DocTypeFieldId = dtf.Id
				 where dtf.DocTypeId = DocType.Id
				   and dtf.Name = 'Product Name'),'') 
       as varchar(100)) ProductName,
       cast(isnull( (select case isnull(df.IndexFieldText,'') when '' then isnull(df.MemoFieldText,'') else isnull(df.IndexFieldText,'') end
				  from ContentCentral.dbo.DocTypeField dtf 
				  join ContentCentral.dbo.DocumentField df on df.DocumentId = Document.Id
								                          and df.DocTypeFieldId = dtf.Id
				 where dtf.DocTypeId = DocType.Id
				   and dtf.Name = 'Manufacturer Part Number'),'') 
       as varchar(500)) ManufacturerPartNumber,
       cast(isnull( (select case isnull(df.IndexFieldText,'') when '' then isnull(df.MemoFieldText,'') else isnull(df.IndexFieldText,'') end
				  from ContentCentral.dbo.DocTypeField dtf 
				  join ContentCentral.dbo.DocumentField df on df.DocumentId = Document.Id
								                          and df.DocTypeFieldId = dtf.Id
				 where dtf.DocTypeId = DocType.Id
				   and dtf.Name = 'EPA Registration Number'),'')
       as varchar(100)) EPARegistrationNumber,
       Cast(isnull( (select case isnull(df.IndexFieldText,'') when '' then isnull(df.MemoFieldText,'') else isnull(df.IndexFieldText,'') end
				  from ContentCentral.dbo.DocTypeField dtf 
				  join ContentCentral.dbo.DocumentField df on df.DocumentId = Document.Id
							                              and df.DocTypeFieldId = dtf.Id
				 where dtf.DocTypeId = DocType.Id
				   and dtf.Name = 'Send To'),'') 
       as varchar(50)) SendTo, 
       (select count(*) 
        from RTK_Items 
        join MSDS ON MSDS.CurrentVersionMSDSId = RTK_Items.MSDSId 
        where Document.Id = Case when Isnull(ContentCentralMSDSDocId,'')='' then NULL else ContentCentralMSDSDocId end
        ) AttachedRTKItems  -- the case statement resolves differences between unique identifier and varchar string
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
