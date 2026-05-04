# View: `dbo.vw_DMSVendorBidDocumentsTest`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorCode` | varchar(max) | NO |  |  |
| 2 | `DistrictVisible` | varchar(max) | NO |  |  |
| 3 | `BidHeaderId` | int | YES |  |  |
| 4 | `BidNbr` | varchar(max) | YES |  |  |
| 5 | `DocType` | varchar(max) | YES |  |  |
| 6 | `DocId` | uniqueidentifier | NO |  |  |
| 7 | `PagesCaptured` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidDocumentTypes` | USER_TABLE |
| `vw_BidGrouper` | VIEW |
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
--select * from Documents.dbo.Fields where deletedAt is null order by Name
--select * from vw_DMSVendorBidDocuments

create   view  [dbo].[vw_DMSVendorBidDocumentsTest] as
SELECT	isnull((select fdVendorCode.FieldValue 
                  from Documents.dbo.FieldData fdVendorCode 
                 where fdVendorCode.DocumentId = Documents.Id
                   and fdVendorCode.FieldId = dtfVendorCode.FieldId
                   and fdVendorCode.deletedAt is null),'') VendorCode, 
        isnull((select fdDistrictVis.FieldValue
                  from Documents.dbo.FieldData fdDistrictVis 
                 where fdDistrictVis.DocumentId = Documents.Id
                   and fdDistrictVis.FieldId = dtfDistrictVis.FieldId
                   and fdDistrictVis.deletedAt is null),'Yes') DistrictVisible, 
        bg1.AltBidHeaderId BidHeaderId, 
        fdBidNbr.FieldValue BidNbr,
        isnull(fdDocType.FieldValue,'') + 
          case 
            when isnull(fdDocType.FieldValue,'') != '' 
             and isnull((select fdAddDesc.FieldValue
                           from Documents.dbo.FieldData fdAddDesc 
                          where fdAddDesc.DocumentId = Documents.Id
                            and fdAddDesc.FieldId = dtfAddDesc.FieldId
                            and fdAddDesc.deletedAt is null),'') != '' then ' - ' 
            else ''
          end +
          isnull((select fdAddDesc.FieldValue
                    from Documents.dbo.FieldData fdAddDesc 
                   where fdAddDesc.DocumentId = Documents.Id
                     and fdAddDesc.FieldId = dtfAddDesc.FieldId
                     and fdAddDesc.deletedAt is null),'') + 
            case
              when bg1.AltBidHeaderId != isnull(fdBidNbr.FieldValue,'') then 
                ' (Bid ' + cast(bg1.MainBidHeaderId as varchar) + ')' 
              else '' 
            end as DocType, 
          DocumentFiles.Id DocId, DocumentFiles.PageCount PagesCaptured
FROM	Documents.dbo.Documents Documents with (nolock)
join	Documents.dbo.DocumentFiles DocumentFiles on DocumentFiles.DocumentId = Documents.Id
                                                 and DocumentFiles.Id =
  (select Top 1 df.Id
     from Documents.dbo.DocumentFiles df
    where df.DocumentId = Documents.Id
      and df.deletedAt is null
    order by df.Datestamp desc)
-- Get Document Types of 'Bid Documents'
join Documents.dbo.DocumentTypes DocumentTypes on DocumentTypes.Id = Documents.DocumentTypeId
                                              and DocumentTypes.Name = 'Vendor Bid Documents'
                                              and DocumentTypes.deletedAt is null
-- Get Bid Nbr from Data
join Documents.dbo.Fields fBidNbr on fBidNbr.Name = 'Bid Number*'
                                 and fBidNbr.deletedAt is null
join Documents.dbo.FieldData fdBidNbr on fdBidNbr.DocumentId = Documents.Id
                                     and fdBidNbr.FieldId = fBidNbr.Id
                                     and fdBidNbr.deletedAt is null
-- Cross Match Bids as needed
join vw_BidGrouper bg1 on cast(bg1.MainBidHeaderId as varchar) = case isnumeric(fdBidNbr.FieldValue) when 0 then '0' else fdBidNbr.FieldValue end
-- Get Document SubTypes
join Documents.dbo.Fields fDocType on fDocType.Name = 'Vendor Bid Document Type'
                                  and fDocType.deletedAt is null
join Documents.dbo.FieldData fdDocType on fdDocType.DocumentId = Documents.Id
                                      and fdDocType.FieldId = fDocType.Id
                                      and fdDocType.deletedAt is null
-- Get 'Vendor Code'
join Documents.dbo.DocumentTypeFields dtfVendorCode on dtfVendorCode.DocumentTypeId = Documents.DocumentTypeId
                                                   and dtfVendorCode.deletedAt IS null
join Documents.dbo.Fields fVendorCode on fVendorCode.Id = dtfVendorCode.FieldId
                                     and fVendorCode.Name = 'Vendor Code*'
                                     and fVendorCode.deletedAt is null
-- Get 'District Visible'
join Documents.dbo.DocumentTypeFields dtfDistrictVis on dtfDistrictVis.DocumentTypeId = Documents.DocumentTypeId
                                                    and dtfDistrictVis.deletedAt IS null
join Documents.dbo.Fields fDistrictVis on fDistrictVis.Id = dtfDistrictVis.FieldId
                                      and fDistrictVis.Name = 'District Visible'
                                      and fDistrictVis.deletedAt is null
-- Get 'Additional Description'
join Documents.dbo.DocumentTypeFields dtfAddDesc on dtfAddDesc.DocumentTypeId = Documents.DocumentTypeId
                                                and dtfAddDesc.deletedAt IS null
join Documents.dbo.Fields fAddDesc on fAddDesc.Id = dtfAddDesc.FieldId
                                  and fAddDesc.Name = 'Additional Description'
                                  and fAddDesc.deletedAt is null

left outer join BidDocumentTypes bdt on bdt.BidType = bg1.BidType
                                    and bdt.VendorSpecific = 1
                                    and bdt.Name = isnull(fdDocType.FieldValue,'')

group by bg1.AltBidHeaderId, fdBidNbr.FieldValue,
		Documents.Id, dtfAddDesc.FieldId, dtfVendorCode.FieldId, dtfDistrictVis.FieldId, isnull(fdDocType.FieldValue,''),
          DocumentFiles.Id, DocumentFiles.PageCount, isnull(bdt.OnlyShowOne,0), bg1.MainBidHeaderId

having isnull(bdt.OnlyShowOne,0) != 1
   or (isnull(bdt.OnlyShowOne,0) = 1 /*and MIN(bg1.MainBidHeaderId) = bg1.AltBidHeaderId*/)
```
