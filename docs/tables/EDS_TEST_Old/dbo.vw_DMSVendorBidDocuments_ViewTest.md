# View: `dbo.vw_DMSVendorBidDocuments_ViewTest`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorCode` | varchar(max) | NO |  |  |
| 2 | `DistrictVisible` | varchar(max) | NO |  |  |
| 3 | `BidHeaderId` | varchar(30) | YES |  |  |
| 4 | `BidNbr` | varchar(max) | YES |  |  |
| 5 | `DocType` | varchar(max) | YES |  |  |
| 6 | `ExpirationDate` | varchar(max) | NO |  |  |
| 7 | `DocumentNumber` | varchar(max) | NO |  |  |
| 8 | `DocId` | uniqueidentifier | YES |  |  |
| 9 | `PagesCaptured` | int | YES |  |  |
| 10 | `FileName` | varchar(1024) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `vw_BidGrouper` | VIEW |
| `dbo.DocumentFiles` | unresolved |
| `dbo.Documents` | unresolved |
| `dbo.DocumentTypeFields` | unresolved |
| `dbo.DocumentTypes` | unresolved |
| `dbo.FieldData` | unresolved |
| `dbo.Fields` | unresolved |

## Used by

_No other objects reference this view._

## Definition

```sql
--Select * from [vw_DMSVendorBidDocuments_ViewTest] where BidHeaderId = 11723
create   view  [dbo].[vw_DMSVendorBidDocuments_ViewTest] as
SELECT	isnull(fdVendorCode.FieldValue,'') VendorCode, isnull(fdDistrictVis.FieldValue,'Yes') DistrictVisible, cast(bg1.AltBidHeaderId as varchar) BidHeaderId, fdBidNbr.FieldValue BidNbr,
        isnull(fdDocType.FieldValue,'') + 
          case 
            when isnull(fdDocType.FieldValue,'') != '' and isnull(fdAddDesc.FieldValue,'') != '' then ' - ' 
            else ''
          end +
          isnull(fdAddDesc.FieldValue,'') + 
            case
              when cast(bg1.AltBidHeaderId as varchar) != isnull(fdBidNbr.FieldValue,'') then 
                ' (Bid ' + cast(bg1.MainBidHeaderId as varchar) + ')' 
              else '' 
            end as DocType, 
          isnull(fdExpirationDate.FieldValue,'') as ExpirationDate,
          isnull(fdDocumentNumber.FieldValue,'') as DocumentNumber,
          DocumentFiles.Id DocId, coalesce(DocumentFiles.PageCount,0) PagesCaptured, isnull(DocumentFiles.FileName,'') FileName
FROM	Documents.dbo.Documents Documents with (nolock)
/*
join	Documents.dbo.DocumentFiles DocumentFiles on DocumentFiles.DocumentId = Documents.Id
                                                 and DocumentFiles.Id =
  (select Top 1 df.Id
     from Documents.dbo.DocumentFiles df
    where df.DocumentId = Documents.Id
      and df.deletedAt is null
    order by df.Datestamp desc)
*/
-- Get Document Types of 'Bid Documents'
join Documents.dbo.DocumentTypes DocumentTypes on DocumentTypes.Id = Documents.DocumentTypeId
                                              and DocumentTypes.Name = 'Vendor Bid Documents'
                                              and DocumentTypes.deletedAt is null
-- Get Bid Nbr from Data
join Documents.dbo.FieldData fdBidNbr on fdBidNbr.DocumentId = Documents.Id
                                     and fdBidNbr.deletedAt is null
join Documents.dbo.Fields fBidNbr on fBidNbr.Id = fdBidNbr.FieldId
                                 and fBidNbr.Name = 'Bid Number*'
                                 and fBidNbr.deletedAt is null
-- Cross Match Bids as needed
join vw_BidGrouper bg1 on bg1.MainBidHeaderId = case isnumeric(fdBidNbr.FieldValue) when '0' then '0' else cast(fdBidNbr.FieldValue as int) end
--join vw_BidGrouper bg1 on cast(bg1.MainBidHeaderId as varchar) = case isnumeric(fdBidNbr.FieldValue) when '0' then '0' else fdBidNbr.FieldValue end
-- Get Document SubTypes
join Documents.dbo.FieldData fdDocType on fdDocType.DocumentId = Documents.Id
                                      and fdDocType.deletedAt is null
join Documents.dbo.Fields fDocType on fDocType.Id = fdDocType.FieldId
                                  and fDocType.Name = 'Vendor Bid Document Type'
                                  and fDocType.deletedAt is null
-- Get 'Vendor Code'
join Documents.dbo.DocumentTypeFields dtfVendorCode on dtfVendorCode.DocumentTypeId = Documents.DocumentTypeId
                                                   and dtfVendorCode.deletedAt IS null
join Documents.dbo.Fields fVendorCode on fVendorCode.Id = dtfVendorCode.FieldId
                                     and fVendorCode.Name = 'Vendor Code*'
                                     and fVendorCode.deletedAt is null
outer apply (Select top 1 fd.FieldValue
               from Documents.dbo.FieldData fd
			  where fd.DocumentId = Documents.Id
			    and fd.FieldId = dtfVendorCode.FieldId
				and fd.deletedAt is null
			  order by fd.updatedAt desc) fdVendorCode
/*left outer join Documents.dbo.FieldData fdVendorCode on fdVendorCode.DocumentId = Documents.Id
                                                    and fdVendorCode.FieldId = dtfVendorCode.FieldId
                                                    and fdVendorCode.deletedAt is null*/
-- Get 'District Visible'
join Documents.dbo.DocumentTypeFields dtfDistrictVis on dtfDistrictVis.DocumentTypeId = Documents.DocumentTypeId
                                                    and dtfDistrictVis.deletedAt IS null
join Documents.dbo.Fields fDistrictVis on fDistrictVis.Id = dtfDistrictVis.FieldId
                                      and fDistrictVis.Name = 'District Visible'
                                      and fDistrictVis.deletedAt is null
outer apply (Select top 1 fd.FieldValue
               from Documents.dbo.FieldData fd
			  where fd.DocumentId = Documents.Id
			    and fd.FieldId = dtfDistrictVis.FieldId
				and fd.deletedAt is null
			  order by fd.updatedAt desc) fdDistrictVis
/*left outer join Documents.dbo.FieldData fdDistrictVis on fdDistrictVis.DocumentId = Documents.Id
                                                     and fdDistrictVis.FieldId = dtfDistrictVis.FieldId
                                                     and fdDistrictVis.deletedAt is null*/
-- Get 'Additional Description'
join Documents.dbo.DocumentTypeFields dtfAddDesc on dtfAddDesc.DocumentTypeId = Documents.DocumentTypeId
                                                and dtfAddDesc.deletedAt IS null
join Documents.dbo.Fields fAddDesc on fAddDesc.Id = dtfAddDesc.FieldId
                                  and fAddDesc.Name = 'Additional Description'
                                  and fAddDesc.deletedAt is null
outer apply (Select top 1 fd.FieldValue
               from Documents.dbo.FieldData fd
			  where fd.DocumentId = Documents.Id
			    and fd.FieldId = dtfAddDesc.FieldId
				and fd.deletedAt is null
			  order by fd.updatedAt desc) fdAddDesc
/*left outer join Documents.dbo.FieldData fdAddDesc on fdAddDesc.DocumentId = Documents.Id
                                                 and fdAddDesc.FieldId = dtfAddDesc.FieldId
                                                 and fdAddDesc.deletedAt is null*/
-- Get 'Expiration Date'
join Documents.dbo.DocumentTypeFields dtfExpirationDate on dtfExpirationDate.DocumentTypeId = Documents.DocumentTypeId
                                                       and dtfExpirationDate.deletedAt IS null
join Documents.dbo.Fields fExpirationDate on fExpirationDate.Id = dtfExpirationDate.FieldId
                                         and fExpirationDate.Name = 'Expiration Date'
                                         and fExpirationDate.deletedAt is null
outer apply (Select top 1 fd.FieldValue
               from Documents.dbo.FieldData fd
			  where fd.DocumentId = Documents.Id
			    and fd.FieldId = dtfExpirationDate.FieldId
				and fd.deletedAt is null
			  order by fd.updatedAt desc) fdExpirationDate
/*left outer join Documents.dbo.FieldData fdExpirationDate on fdExpirationDate.DocumentId = Documents.Id
                                                        and fdExpirationDate.FieldId = dtfExpirationDate.FieldId
                                                        and fdExpirationDate.deletedAt is null*/
-- Get 'Document Number'
join Documents.dbo.DocumentTypeFields dtfDocumentNumber on dtfDocumentNumber.DocumentTypeId = Documents.DocumentTypeId
                                                       and dtfDocumentNumber.deletedAt IS null
join Documents.dbo.Fields fDocumentNumber on fDocumentNumber.Id = dtfDocumentNumber.FieldId
                                         and fDocumentNumber.Name = 'Document Number'
                                         and fDocumentNumber.deletedAt is null
outer apply (Select top 1 fd.FieldValue
               from Documents.dbo.FieldData fd
			  where fd.DocumentId = Documents.Id
			    and fd.FieldId = dtfDocumentNumber.FieldId
				and fd.deletedAt is null
			  order by fd.updatedAt desc) fdDocumentNumber
/*left outer join Documents.dbo.FieldData fdDocumentNumber on fdDocumentNumber.DocumentId = Documents.Id
                                                 and fdDocumentNumber.FieldId = dtfDocumentNumber.FieldId
                                                 and fdDocumentNumber.deletedAt is null*/
outer apply (select top 1 df.Id, df.PageCOunt, df.FileName, df.Datestamp
               from Documents.dbo.DocumentFiles df
			  where df.DocumentId = Documents.Id
			    and df.deletedAt is null
			  order by df.datestamp desc) DocumentFiles
/*left outer join BidDocumentTypes bdt on bdt.BidType = bg1.BidType
                                    and bdt.VendorSpecific = 1
                                    and bdt.Name = isnull(fdDocType.FieldValue,'')*/
where Documents.deletedAt is null
  and DocumentFiles.Id is not null
group by isnull(fdVendorCode.FieldValue,''), isnull(fdDistrictVis.FieldValue,'Yes'), cast(bg1.AltBidHeaderId as varchar), fdBidNbr.FieldValue,
        isnull(fdDocType.FieldValue,'') + 
          case 
            when isnull(fdDocType.FieldValue,'') != '' and isnull(fdAddDesc.FieldValue,'') != '' then ' - ' 
            else ''
          end +
          isnull(fdAddDesc.FieldValue,'') + 
            case
              when cast(bg1.AltBidHeaderId as varchar) != isnull(fdBidNbr.FieldValue,'') then 
                ' (Bid ' + cast(bg1.MainBidHeaderId as varchar) + ')' 
              else '' 
            end, 
		  isnull(fdExpirationDate.FieldValue,''), isnull(fdDocumentNumber.FieldValue,''),
          DocumentFiles.Id, DocumentFiles.PageCount, /*isnull(bdt.OnlyShowOne,0),*/ isnull(DocumentFiles.FileName,'')
/*having isnull(bdt.OnlyShowOne,0) != 1
   or (isnull(bdt.OnlyShowOne,0) = 1 /*and MIN(bg1.MainBidHeaderId) = bg1.AltBidHeaderId*/)*/
```
