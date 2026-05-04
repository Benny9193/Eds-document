# View: `dbo.vw_DMSVendorDocuments_View`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorCode` | varchar(30) | YES |  |  |
| 2 | `DistrictVisible` | varchar(max) | NO |  |  |
| 3 | `DocType` | varchar(max) | NO |  |  |
| 4 | `ExpirationDate` | varchar(max) | NO |  |  |
| 5 | `DocumentNumber` | varchar(max) | NO |  |  |
| 6 | `DocId` | uniqueidentifier | YES |  |  |
| 7 | `PagesCaptured` | int | YES |  |  |
| 8 | `FileName` | varchar(1024) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `dbo.DocumentFiles` | unresolved |
| `dbo.Documents` | unresolved |
| `dbo.DocumentTypeFields` | unresolved |
| `dbo.DocumentTypes` | unresolved |
| `dbo.FieldData` | unresolved |
| `dbo.Fields` | unresolved |
| [`Documents.dbo.DocumentFiles`](../Documents/dbo.DocumentFiles.md) | cross-database |
| [`Documents.dbo.Documents`](../Documents/dbo.Documents.md) | cross-database |
| [`Documents.dbo.DocumentTypeFields`](../Documents/dbo.DocumentTypeFields.md) | cross-database |
| [`Documents.dbo.DocumentTypes`](../Documents/dbo.DocumentTypes.md) | cross-database |
| [`Documents.dbo.FieldData`](../Documents/dbo.FieldData.md) | cross-database |
| [`Documents.dbo.Fields`](../Documents/dbo.Fields.md) | cross-database |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE     view  [dbo].[vw_DMSVendorDocuments_View] as
SELECT	cast(isnull(fdVendorCode.FieldValue,'') as varchar) VendorCode, isnull(fdDistrictVis.FieldValue,'Yes') DistrictVisible, 
        isnull(fdDocType.FieldValue,'') + 
          case 
            when isnull(fdDocType.FieldValue,'') != '' and isnull(fdAddDesc.FieldValue,'') != '' then ' - ' 
            else ''
          end +
          isnull(fdAddDesc.FieldValue,'') as DocType, 
          isnull(fdExpirationDate.FieldValue,'') as ExpirationDate,
          isnull(fdDocumentNumber.FieldValue,'') as DocumentNumber,
          DocumentFiles.Id DocId, coalesce(DocumentFiles.PageCount,0) PagesCaptured, isnull(DocumentFiles.FileName,'') FileName
FROM	Documents.dbo.Documents Documents with (nolock)
-- Get Document Types of 'Vendor Documents'
join Documents.dbo.DocumentTypes DocumentTypes on DocumentTypes.Id = Documents.DocumentTypeId
                                              and DocumentTypes.Name = 'Vendor Documents'
                                              and DocumentTypes.deletedAt is null
-- Get Document SubTypes
join Documents.dbo.FieldData fdDocType on fdDocType.DocumentId = Documents.Id
                                      and fdDocType.deletedAt is null
join Documents.dbo.Fields fDocType on fDocType.Id = fdDocType.FieldId
                                  and fDocType.Name = 'Vendor Document Type'
                                  and fDocType.deletedAt is null
-- Get 'Vendor Code'
join Documents.dbo.DocumentTypeFields dtfVendorCode on dtfVendorCode.DocumentTypeId = Documents.DocumentTypeId
                                                   and dtfVendorCode.deletedAt IS null
join Documents.dbo.Fields fVendorCode on fVendorCode.Id = dtfVendorCode.FieldId
                                     and fVendorCode.Name = 'Vendor Code*'
                                     and fVendorCode.deletedAt is null
left outer join Documents.dbo.FieldData fdVendorCode on fdVendorCode.DocumentId = Documents.Id
                                                    and fdVendorCode.FieldId = dtfVendorCode.FieldId
                                                    and fdVendorCode.deletedAt is null
-- Get 'District Visible'
join Documents.dbo.DocumentTypeFields dtfDistrictVis on dtfDistrictVis.DocumentTypeId = Documents.DocumentTypeId
                                                    and dtfDistrictVis.deletedAt IS null
join Documents.dbo.Fields fDistrictVis on fDistrictVis.Id = dtfDistrictVis.FieldId
                                      and fDistrictVis.Name = 'District Visible'
                                      and fDistrictVis.deletedAt is null
left outer join Documents.dbo.FieldData fdDistrictVis on fdDistrictVis.DocumentId = Documents.Id
                                                     and fdDistrictVis.FieldId = dtfDistrictVis.FieldId
                                                     and fdDistrictVis.deletedAt is null
-- Get 'Additional Description'
join Documents.dbo.DocumentTypeFields dtfAddDesc on dtfAddDesc.DocumentTypeId = Documents.DocumentTypeId
                                                and dtfAddDesc.deletedAt IS null
join Documents.dbo.Fields fAddDesc on fAddDesc.Id = dtfAddDesc.FieldId
                                  and fAddDesc.Name = 'Additional Description'
                                  and fAddDesc.deletedAt is null
left outer join Documents.dbo.FieldData fdAddDesc on fdAddDesc.DocumentId = Documents.Id
                                                 and fdAddDesc.FieldId = dtfAddDesc.FieldId
                                                 and fdAddDesc.deletedAt is null
-- Get 'Expiration Date'
join Documents.dbo.DocumentTypeFields dtfExpirationDate on dtfExpirationDate.DocumentTypeId = Documents.DocumentTypeId
                                                       and dtfExpirationDate.deletedAt IS null
join Documents.dbo.Fields fExpirationDate on fExpirationDate.Id = dtfExpirationDate.FieldId
                                         and fExpirationDate.Name = 'Expiration Date'
                                         and fExpirationDate.deletedAt is null
left outer join Documents.dbo.FieldData fdExpirationDate on fdExpirationDate.DocumentId = Documents.Id
                                                        and fdExpirationDate.FieldId = dtfExpirationDate.FieldId
                                                        and fdExpirationDate.deletedAt is null
-- Get 'Document Number'
join Documents.dbo.DocumentTypeFields dtfDocumentNumber on dtfDocumentNumber.DocumentTypeId = Documents.DocumentTypeId
                                                       and dtfDocumentNumber.deletedAt IS null
join Documents.dbo.Fields fDocumentNumber on fDocumentNumber.Id = dtfDocumentNumber.FieldId
                                         and fDocumentNumber.Name = 'Document Number'
                                         and fDocumentNumber.deletedAt is null
left outer join Documents.dbo.FieldData fdDocumentNumber on fdDocumentNumber.DocumentId = Documents.Id
                                                 and fdDocumentNumber.FieldId = dtfExpirationDate.FieldId
                                                 and fdDocumentNumber.deletedAt is null
outer apply (select top 1 df.Id, df.PageCount, df.FileName, df.Datestamp
               from Documents.dbo.DocumentFiles df
			  where df.DocumentId = Documents.Id
			    and df.deletedAt is null
			  order by df.datestamp desc) DocumentFiles
/*
join	Documents.dbo.DocumentFiles DocumentFiles on DocumentFiles.DocumentId = Documents.Id
                                                 and DocumentFiles.Id =
  (select Top 1 df.Id
     from Documents.dbo.DocumentFiles df
    where df.DocumentId = Documents.Id
      and df.deletedAt is null
    order by df.Datestamp desc)
*/
where Documents.deletedAt is null
  and DocumentFiles.Id is not null
group by isnull(fdVendorCode.FieldValue,''), isnull(fdDistrictVis.FieldValue,'Yes'),
        isnull(fdDocType.FieldValue,'') + 
          case 
            when isnull(fdDocType.FieldValue,'') != '' and isnull(fdAddDesc.FieldValue,'') != '' then ' - ' 
            else ''
          end +
          isnull(fdAddDesc.FieldValue,''), isnull(fdExpirationDate.FieldValue,''), isnull(fdDocumentNumber.FieldValue,''),
          DocumentFiles.Id, DocumentFiles.PageCount, isnull(DocumentFiles.FileName,'')
```
