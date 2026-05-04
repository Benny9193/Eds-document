# View: `dbo.vw_ScannedDocumentDataAll`

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
| 9 | `PagesCaptured` | int | NO |  |  |
| 10 | `BidNbr` | nvarchar(560) | NO |  |  |
| 11 | `VendorCode` | nvarchar(560) | YES |  |  |
| 12 | `DocType` | nvarchar(560) | YES |  |  |
| 13 | `DistrictVisible` | nvarchar(560) | NO |  |  |
| 14 | `AdditionalDescription` | nvarchar(560) | NO |  |  |
| 15 | `FullDocType` | nvarchar(1123) | NO |  |  |
| 16 | `DocId` | uniqueidentifier | NO |  |  |

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
CREATE view [dbo].[vw_ScannedDocumentDataAll] as
select Catalog.Name CatalogName, 
       DocType.Name DocumentType,
       DocumentFolder.DocFolder, 
       DocumentVersionFile.DocName, 
       DocumentVersionFile.BaseName,
       DocumentVersion.VersionMajor,
       DocumentVersion.VersionMinor,
       DocumentVersion.CreatedUtc,
       DocumentVersion.PagesCaptured,
       DocumentField.IndexFieldText BidNbr,
       df2.IndexFieldText VendorCode,
       df3.IndexFieldText DocType,
       isnull(df4.IndexFieldText,'Yes') DistrictVisible,
       isnull(df5.IndexFieldText,'') AdditionalDescription,
       isnull(df3.IndexFieldText,'') + 
         case 
           when isnull(df3.IndexFieldText,'') != '' and isnull(df5.IndexFieldText,'') != '' then ' - ' 
           else ''
         end +
         isnull(df5.IndexFieldText,'') FullDocType,
       Document.Id DocId
  from Catalog with (nolock)
  join DocType on DocType.CatalogId = Catalog.Id
  join Document on Document.DocTypeId = DocType.Id
  join DocumentVersion on DocumentVersion.Id = 
    (select top 1 dv.Id
       from DocumentVersion dv with (nolock)
       join DocumentVersionFile dvf on dvf.DocumentVersionId = dv.Id
      where dv.DocumentId = Document.Id
      order by dv.CreatedUtc Desc)
  join DocumentVersionFile on DocumentVersionFile.DocumentVersionId = DocumentVersion.Id
  join DocumentFolder on DocumentFolder.Id = DocumentVersionFile.DocumentFolderId
  join DocTypeField on DocTypeField.DocTypeId = DocType.Id
                   and DocTypeField.Name = 'Bid Number*'
  join DocumentField on DocumentField.DocumentId = Document.Id
                    and DocumentField.DocTypeFieldId = DocTypeField.Id
  left outer join DocTypeField dtf2 on dtf2.DocTypeId = DocType.Id
                        and dtf2.Name = 'Vendor Code*'
  left outer join DocumentField df2 on df2.DocumentId = Document.Id
                        and df2.DocTypeFieldId = dtf2.Id
  join DocTypeField dtf3 on dtf3.DocTypeId = DocType.Id
                        and dtf3.Name in ('Bid Document Type', 'Vendor Document Type', 'Vendor Bid Document Type')
  left outer join DocumentField df3 on df3.DocumentId = Document.Id
                        and df3.DocTypeFieldId = dtf3.Id
  join DocTypeField dtf4 on dtf4.DocTypeId = DocType.Id
                        and dtf4.Name = 'District Visible'
  left outer join DocumentField df4 on df4.DocumentId = Document.Id
                        and df4.DocTypeFieldId = dtf4.Id
  join DocTypeField dtf5 on dtf5.DocTypeId = DocType.Id
                        and dtf5.Name = 'Additional Description'
  left outer join DocumentField df5 on df5.DocumentId = Document.Id
                                   and df5.DocTypeFieldId = dtf5.Id
```
