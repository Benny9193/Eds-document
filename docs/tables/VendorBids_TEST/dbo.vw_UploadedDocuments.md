# View: `dbo.vw_UploadedDocuments`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `VendorCode` | varchar(max) | YES |  |  |
| 3 | `BidderCheckListId` | int | NO |  |  |
| 4 | `DocumentTypeId` | int | YES |  |  |
| 5 | `DocumentName` | varchar(50) | YES |  |  |
| 6 | `Id` | varchar(64) | YES |  |  |
| 7 | `DocId` | varchar(64) | YES |  |  |
| 8 | `DocumentId` | varchar(64) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `DocumentUploads` | USER_TABLE |
| `dbo.BidderCheckList` | unresolved |
| `dbo.vw_DMSVendorBidDocuments` | unresolved |
| `dbo.vw_DMSVendorDocuments` | unresolved |
| [`eds.dbo.BidderCheckList`](../eds/dbo.BidderCheckList.md) | cross-database |
| [`EDS.dbo.vw_DMSVendorBidDocuments`](../EDS/dbo.vw_DMSVendorBidDocuments.md) | cross-database |
| [`EDS.dbo.vw_DMSVendorDocuments`](../EDS/dbo.vw_DMSVendorDocuments.md) | cross-database |

## Used by

_No other objects reference this view._

## Definition

```sql
create view vw_UploadedDocuments as
					select vbd.BidHeaderId, 
					       vbd.VendorCode,
						   BidderCheckList.BidderCheckListId,
						   BidderCheckList.DocumentTypeId,
					       BidderCheckList.DocumentName DocumentName, 
					       coalesce(cast(DocumentUploads.Id as varchar(64)),'') Id, 
					       coalesce(cast(case
					                       when vbd.DocId is null then vd.DocId
					                       else vbd.DocId 
					                     end as varchar(64)),'') DocId, 
					       coalesce(cast(case 
					                       when DocumentUploads.Id is null then 
					                         case
					                           when vbd.DocId is null then vd.DocId
					                           else vbd.DocId
					                         end  
					                       else DocumentUploads.Id 
					                     end as varchar(64)),'') as DocumentId 
                      from eds.dbo.BidderCheckList BidderCheckList 
					  left outer join EDS.dbo.vw_DMSVendorBidDocuments vbd on vbd.DocType = BidderCheckList.DocumentName
					  left outer join EDS.dbo.vw_DMSVendorDocuments vd on vd.DocType = BidderCheckList.DocumentName
																	  and vd.VendorCode = vbd.VendorCode
					  left outer join DocumentUploads on DocumentUploads.BidderCheckListId = BidderCheckList.BidderCheckListId
													 and DocumentUploads.DocumentTypeId = BidderCheckList.DocumentTypeId
													 and DocumentUploads.VendorCode = vbd.VendorCode
													 and DocumentUploads.BidId = case when BidderCheckList.OnFileEligible = 1 then DocumentUploads.BidId else vbd.BidHeaderId end
													 and coalesce(DocumentUploads.Status,'') != 'R'
 								 and DocumentUploads.Id = 
						(select top 1 du.Id
						   from DocumentUploads du
						  where du.BidderCheckListId = BidderCheckList.BidderCheckListId
							and du.DocumentTypeId = BidderCheckList.DocumentTypeId
							and du.VendorCode = vbd.VendorCode
							and du.BidId = case when BidderCheckList.OnFileEligible = 1 then du.BidId else vbd.BidHeaderId end
							and isnull(du.Status,'') != 'R'
						  order by coalesce(du.UpdatedAt, du.CreatedAt) desc)
```
