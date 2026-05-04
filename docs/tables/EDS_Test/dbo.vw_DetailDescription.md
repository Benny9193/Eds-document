# View: `dbo.vw_DetailDescription`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DetailId` | int | NO |  |  |
| 2 | `ItemDescription` | nvarchar(max) | YES |  |  |
| 3 | `ShortDescription` | nvarchar(max) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Items` | USER_TABLE |
| [`dbo.BidHeaders`](dbo.BidHeaders.md) | USER_TABLE |
| [`dbo.BidItems`](dbo.BidItems.md) | USER_TABLE |
| [`dbo.BidResults`](dbo.BidResults.md) | USER_TABLE |
| [`dbo.Bids`](dbo.Bids.md) | USER_TABLE |
| [`dbo.BidsCatalogList`](dbo.BidsCatalogList.md) | USER_TABLE |
| [`dbo.BookTypes`](dbo.BookTypes.md) | USER_TABLE |
| [`dbo.Budgets`](dbo.Budgets.md) | USER_TABLE |
| [`dbo.Catalog`](dbo.Catalog.md) | USER_TABLE |
| [`dbo.Category`](dbo.Category.md) | USER_TABLE |
| [`dbo.CrossRefs`](dbo.CrossRefs.md) | USER_TABLE |
| [`dbo.Detail`](dbo.Detail.md) | USER_TABLE |
| [`dbo.DistrictCategories`](dbo.DistrictCategories.md) | USER_TABLE |
| [`dbo.Headings`](dbo.Headings.md) | USER_TABLE |
| [`dbo.Items`](dbo.Items.md) | USER_TABLE |
| [`dbo.Keywords`](dbo.Keywords.md) | USER_TABLE |
| [`dbo.Requisitions`](dbo.Requisitions.md) | USER_TABLE |
| `dbo.ufn_RegExReplace` | unresolved |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.BidRequestDetail2`](dbo.BidRequestDetail2.md) | VIEW |
| [`dbo.PODetail`](dbo.PODetail.md) | VIEW |
| [`dbo.PODetail_Orig`](dbo.PODetail_Orig.md) | VIEW |
| [`dbo.PODetailExport`](dbo.PODetailExport.md) | VIEW |
| [`dbo.PODetailJavaExport`](dbo.PODetailJavaExport.md) | VIEW |
| [`dbo.PODetailJavaExportNew`](dbo.PODetailJavaExportNew.md) | VIEW |
| [`dbo.PODetailTest`](dbo.PODetailTest.md) | VIEW |
| `dbo.sp_CreateBidHeaderDetail` | SQL_STORED_PROCEDURE |
| `dbo.sp_DistrictRequisitionDetail` | SQL_STORED_PROCEDURE |
| `dbo.trig_DetailUpdate` | SQL_TRIGGER |
| [`dbo.vw_DetailView`](dbo.vw_DetailView.md) | VIEW |
| [`dbo.vw_ReqDetail`](dbo.vw_ReqDetail.md) | VIEW |
| [`dbo.vw_ReqDetail_BK20241205`](dbo.vw_ReqDetail_BK20241205.md) | VIEW |
| [`dbo.vw_ReqDetail_BK20241227`](dbo.vw_ReqDetail_BK20241227.md) | VIEW |
| [`dbo.vw_ReqDetail1`](dbo.vw_ReqDetail1.md) | VIEW |
| [`dbo.vw_ReqDetailAsp1`](dbo.vw_ReqDetailAsp1.md) | VIEW |
| [`dbo.vw_ReqDetailPrint`](dbo.vw_ReqDetailPrint.md) | VIEW |
| [`dbo.vw_ReqDetailPrintTest`](dbo.vw_ReqDetailPrintTest.md) | VIEW |
| [`dbo.vw_ReqDetail-removed 12082010`](dbo.vw_ReqDetail-removed_12082010.md) | VIEW |

## Definition

```sql
--select * from vw_ReqDetail where RequisitionId = 56381234 and VendorId = 7691
--select * from vw_DetailDescription where DetailId in (1493645707,1493645467)
--select dd.*,detail.Description from Detail join REquisitions on Requisitions.RequisitionId = Detail.RequisitionId join Budgets on Budgets.BudgetId = Requisitions.BudgetId and Budgets.Name like '2019%' join vw_DetailDescription dd on dd.DetailId = Detail.DetailId where coalesce(dd.ItemDescription,'') = ''


CREATE     view  [dbo].[vw_DetailDescription]
AS  
    select Detail.DetailId,
/*		   case isnull(Headings.HeadingId,0)
			 when 0 then ''
			 else 
			   ltrim(rtrim(isnull(Headings.Title,''))) +
			   case isnull(Keywords.KeywordId,0)
				 when 0 then ''
				 else
				   ' ' + ltrim(rtrim(isnull(Keywords.Keyword,'')))
			   end + ', '
			end +
*/		   case
		     when isnull(BidHeaders.CompliantAlert,0) != 1 
		       or isnull(BidHeaders.BidType,0) = 2
		       or isnull(BidItems.BidItemId,0) = 0 
		       or BidItems.ItemBidType != 'Compliant' then
				master.dbo.ufn_RegExReplace( master.dbo.ufn_RegExReplace( master.dbo.ufn_RegExReplace(dd.FullDescription,'<[^>]*>',' ',1), '<[a-zA-Z]+.*[^>]$', ' ',1), '\s{2,}', ' ',1)
-- Replaced by Previous Line		       dbo.uf_DetailItemDescriptionNoExtraNH(Requisitions.RequisitionId, Detail.ItemId)
		     else ''
		   end +
           case 
             when (/*(   isnull(BidHeaders.CompliantAlert,0) = 1
                    or isnull(BidHeaders.BidType,0) = 2)
                   and*/ isnull(BidItems.BidItemId,0) != 0 
                   and BidItems.ItemBidType = 'Compliant') then
               case 
				 when isnull(BidHeaders.CompliantAlert,0) != 1 
				   or isnull(BidHeaders.BidType,0) = 2
				   or isnull(BidItems.BidItemId,0) = 0 
				   or BidItems.ItemBidType != 'Compliant' then
                      CHAR(13) + char(10)
                 else ''
               end +
-- Removed 02/25/2015 DCH               'Compliant Item' + CHAR(13) + CHAR(10) +
               coalesce(case when BidItems.Alternate like '%Sold As%' or BidItems.Alternate like '%Priced As%' or BidItems.Alternate like '%Bid As%' then rtrim(BidItems.Alternate) else null end, BidResults.AIShortDesc, trim(BidItems.Alternate),'') 
             else
               case 
				 when isnull(BidHeaders.CompliantAlert,0) != 1 
				   or isnull(BidHeaders.BidType,0) = 2
				   or isnull(BidItems.BidItemId,0) = 0 
				   or BidItems.ItemBidType != 'Compliant' then ''
				 else
				master.dbo.ufn_RegExReplace( master.dbo.ufn_RegExReplace( master.dbo.ufn_RegExReplace(dd.FullDescription,'<[^>]*>',' ',1), '<[a-zA-Z]+.*[^>]$', ' ',1), '\s{2,}', ' ',1)
-- Replaced by Previous Line				   dbo.uf_DetailItemDescriptionNoExtraNH(Requisitions.RequisitionId, Detail.ItemId)
               end 
		   end +
           case 
             when isnull(rtrim(BidResults.ManufacturerBid),'') != '' and (BidHeaders.BidType = 2 or BidHeaders.CompliantAlert = 1) then
               char(13) + char(10) + 'Bid Manufacturer: ' + rtrim(BidResults.ManufacturerBid)
             when ISNULL(rtrim(BidResults.VendorItemCode),'') = '' and isnull(rtrim(BidResults.ManufPartNoBid),'') != '' and isnull(rtrim(BidResults.ManufacturerBid),'') != '' then
               char(13) + char(10) + 'Bid Manufacturer: ' + rtrim(BidResults.ManufacturerBid)
             else
               ''
           end +
           case 
             when isnull(rtrim(BidResults.ManufPartNoBid),'') != '' and (BidHeaders.BidType = 2 or BidHeaders.CompliantAlert = 1) then
               char(13) + char(10) + 'Bid Part Number: ' + rtrim(BidResults.ManufPartNoBid) 
             when ISNULL(rtrim(BidResults.VendorItemCode),'') != '' then
               char(13) + char(10) + 'Bid Part Number: ' + rtrim(BidResults.VendorItemCode) 
			 when ISNULL(rtrim(BidResults.VendorItemCode),'') = '' and isnull(rtrim(BidResults.ManufPartNoBid),'') != '' then
               char(13) + char(10) + 'Bid Part Number: ' + rtrim(BidResults.ManufPartNoBid) 
             else
               ''
           end +
           case isnull(Detail.ExtraDescription,'')  
			 when '' then ''  
			 else char(13) + char(10) +   
			   case isnull(Category.ExtraTitle,'')  
				 when '' then 'Extra Information: '  
				 else isnull(Category.ExtraTitle,'')  
			   end + ' ' + 
			   isnull(Detail.ExtraDescription,'')  
		   end +
		   case 
			 when Detail.DeliveryDate is null then ''
			 else char(10) + 'Delivery Date:' + convert(varchar,Detail.DeliveryDate,101)
		   end +
		   case 
			 when coalesce(trim(Detail.DoctorsName),'') = '' then ''
			 else char(10) + 'Doctors Name:' + coalesce(trim(Detail.DoctorsName),'')
		   end +
		   case 
			 when coalesce(trim(Detail.DEANumber),'') = '' then ''
			 else char(10) + 'DEA Number:' + coalesce(trim(Detail.DEANumber),'')
		   end as ItemDescription,
/*		   case isnull(Headings.HeadingId,0)
			 when 0 then ''
			 else 
			   ltrim(rtrim(isnull(Headings.Title,''))) +
			   case isnull(Keywords.KeywordId,0)
				 when 0 then ''
				 else
				   ' ' + ltrim(rtrim(isnull(Keywords.Keyword,'')))
			   end + ', '
			end +
*/		   case
		     when isnull(BidHeaders.CompliantAlert,0) != 1 
		       or isnull(BidHeaders.BidType,0) = 2
		       or isnull(BidItems.BidItemId,0) = 0 
		       or BidItems.ItemBidType != 'Compliant' then
				master.dbo.ufn_RegExReplace( master.dbo.ufn_RegExReplace( master.dbo.ufn_RegExReplace(dd.ShortDescription,'<[^>]*>',' ',1), '<[a-zA-Z]+.*[^>]$', ' ',1), '\s{2,}', ' ',1)
-- Replaced by Previous Line		       dbo.uf_DetailItemDescriptionNoExtraNH(Requisitions.RequisitionId, Detail.ItemId)
		     else ''
		   end +
           case 
             when (/*(   isnull(BidHeaders.CompliantAlert,0) = 1
                    or isnull(BidHeaders.BidType,0) = 2)
                   and*/ isnull(BidItems.BidItemId,0) != 0 
                   and BidItems.ItemBidType = 'Compliant') then
               case 
				 when isnull(BidHeaders.CompliantAlert,0) != 1 
				   or isnull(BidHeaders.BidType,0) = 2
				   or isnull(BidItems.BidItemId,0) = 0 
				   or BidItems.ItemBidType != 'Compliant' then
                      CHAR(13) + char(10)
                 else ''
               end +
-- Removed 02/25/2015 DCH               'Compliant Item' + CHAR(13) + CHAR(10) +
               isnull(rtrim(BidItems.Alternate),'') 
             else
               case 
				 when isnull(BidHeaders.CompliantAlert,0) != 1 
				   or isnull(BidHeaders.BidType,0) = 2
				   or isnull(BidItems.BidItemId,0) = 0 
				   or BidItems.ItemBidType != 'Compliant' then ''
				 else
				master.dbo.ufn_RegExReplace( master.dbo.ufn_RegExReplace( master.dbo.ufn_RegExReplace(dd.ShortDescription,'<[^>]*>',' ',1), '<[a-zA-Z]+.*[^>]$', ' ',1), '\s{2,}', ' ',1)
-- Replaced by Previous Line				   dbo.uf_DetailItemDescriptionNoExtraNH(Requisitions.RequisitionId, Detail.ItemId)
               end 
		   end +
		   /* Changed by Request of Alan 11/14/25 */
		   case 
		     when isnull(Detail.ItemMustBeBid,0) = 0 and coalesce(BidItems.ItemBidType,'') != 'Compliant' and Detail.VendorId != 7691 then ''
			 else
			   case 
				 when isnull(rtrim(BidResults.ManufacturerBid),'') != '' and (BidHeaders.BidType = 2 or BidHeaders.CompliantAlert = 1) then
				   char(13) + char(10) + 'Bid Manufacturer: ' + rtrim(BidResults.ManufacturerBid)
				 when ISNULL(rtrim(BidResults.VendorItemCode),'') = '' and isnull(rtrim(BidResults.ManufPartNoBid),'') != '' and isnull(rtrim(BidResults.ManufacturerBid),'') != '' then
				   char(13) + char(10) + 'Bid Manufacturer: ' + rtrim(BidResults.ManufacturerBid)
				 else
				   ''
			   end +
			   case 
				 when isnull(rtrim(BidResults.ManufPartNoBid),'') != '' and (BidHeaders.BidType = 2 or BidHeaders.CompliantAlert = 1) then
				   char(13) + char(10) + 'Bid Part Number: ' + rtrim(BidResults.ManufPartNoBid) 
				 when ISNULL(rtrim(BidResults.VendorItemCode),'') != '' then
				   char(13) + char(10) + 'Bid Part Number: ' + rtrim(BidResults.VendorItemCode) 
				 when ISNULL(rtrim(BidResults.VendorItemCode),'') = '' and isnull(rtrim(BidResults.ManufPartNoBid),'') != '' then
				   char(13) + char(10) + 'Bid Part Number: ' + rtrim(BidResults.ManufPartNoBid) 
				 else
				   ''
			   end
		   end +
           case isnull(Detail.ExtraDescription,'')  
			 when '' then ''  
			 else char(13) + char(10) +   
			   case isnull(Category.ExtraTitle,'')  
				 when '' then 'Extra Information: '  
				 else isnull(Category.ExtraTitle,'')  
			   end + ' ' + 
			   isnull(Detail.ExtraDescription,'')  
		   end +
		   case 
			 when Detail.DeliveryDate is null then ''
			 else char(10) + 'Delivery Date:' + convert(varchar,Detail.DeliveryDate,101)
		   end +
		   case 
			 when coalesce(trim(Detail.DoctorsName),'') = '' then ''
			 else char(10) + 'Doctors Name:' + coalesce(trim(Detail.DoctorsName),'')
		   end +
		   case 
			 when coalesce(trim(Detail.DEANumber),'') = '' then ''
			 else char(10) + 'DEA Number:' + coalesce(trim(Detail.DEANumber),'')
		   end as ShortDescription
      from dbo.Detail with (nolock)
      join dbo.Items on Items.ItemId = Detail.ItemId
      join dbo.Category on Category.CategoryId = Items.CategoryId
      join dbo.Requisitions on Requisitions.RequisitionId = Detail.RequisitionId 
      join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
      join dbo.DistrictCategories on DistrictCategories.DistrictId = Budgets.DistrictId
                                 and DistrictCategories.CategoryId = Requisitions.CategoryId
                                 and DistrictCategories.Active = 1
      left outer join dbo.Catalog on Catalog.CatalogId = ParentCatalogId  
      left outer join dbo.Headings on Headings.HeadingId = Items.HeadingId  
      left outer join dbo.BookTypes on BookTypes.BookTypeId = Items.EditionId  
      left outer join dbo.Keywords Keywords on Keywords.KeyWordId = Items.KeywordId  
      left outer join dbo.Vendors on Vendors.VendorId = Items.VendorId  
      left outer join dbo.BidItems on BidItems.BidItemId = Detail.BidItemId
	                              and BidItems.ItemId = Detail.ItemId
      left outer join dbo.Bids on Bids.BidId = BidItems.BidId
      left outer join dbo.BidResults on BidResults.BidResultsId = BidItems.BidResultsId
	                                and BidResults.ItemId = BidItems.ItemId
      left outer join dbo.BidHeaders on BidHeaders.BidHeaderId = case ISNULL(Bids.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Bids.BidHeaderId end
	  left outer join dbo.CrossRefs xr on xr.CrossRefId = Detail.CrossRefId
      left outer join dbo.CrossRefs as cxr on cxr.ItemId = Detail.ItemId
	                                      and cxr.CrossRefId = 
        (select Top 1 CrossRefs.CrossRefId
           from dbo.CrossRefs with (nolock)
           join dbo.Catalog as cat on cat.CatalogId = CrossRefs.CatalogId
           join dbo.Bids on Bids.BidHeaderId = Requisitions.BidHeaderId
           join dbo.BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
                                   and BidsCatalogList.CatalogId = Cat.CatalogId
          where CrossRefs.ItemId = Detail.ItemId
            and CrossRefs.Active = 1
          order by Catalog.CatalogYear desc, CrossRefs.CatalogPrice, CrossRefs.CrossRefId)
	  outer apply (  
    select coalesce(case when coalesce(BidResults.ItemBidType,'') in ('S') and coalesce(trim(xr.AIShortDesc),'') != '' then coalesce(trim(xr.AIShortDesc),'') else null end,
	                case when coalesce(BidResults.ItemBidType,'') in ('S', 'C') and coalesce(trim(BidResults.AIShortDesc),'') != '' then coalesce(trim(BidResults.AIShortDesc),'') else null end,
					case when coalesce(BidResults.ItemBidType,'') in ('S', 'C') and coalesce(trim(BidResults.Alternate),'') != '' then coalesce(trim(BidResults.Alternate),'') else null end,
	                case when coalesce(xr.AIFullDesc, trim(xr.FullDescription),'') = '' then null else coalesce(xr.AIFullDesc, trim(xr.FullDescription),'') end, 
	                case when coalesce(cxr.AIFullDesc,trim(cxr.FullDescription),'') = '' then null else coalesce(cxr.AIFullDesc,trim(cxr.FullDescription),'') end, 
					case when coalesce(xr.AIShortDesc,trim(xr.ShortDescription),'') = '' then null else coalesce(xr.AIShortDesc,trim(xr.ShortDescription),'') end, 
					case when coalesce(cxr.AIShortDesc,trim(cxr.ShortDescription),'') = '' then null else coalesce(cxr.AIShortDesc,trim(cxr.ShortDescription),'') end, 
					Items.Description,'') +   
           case Category.Type   
             when 2 then   
               case isnull(ParentCatalogId,0)   
                 when 0 then ''   
                 else char(13) + char(10) + 'Publisher: ' + isnull(Catalog.Name,'')  
               end +   
               case isnull(BookTypes.BookTypeId,0)   
                 when 0 then ''   
                 else char(13) + char(10) + 'Edition: ' + isnull(BookTypes.BookType,'')   
               end +   
               case isnull(Items.CopyrightYear,0)   
                 when 0 then ''   
                 else char(13) + char(10) + 'Copyright Year: ' + isnull(convert(varchar(32),Items.CopyrightYear,101),'None')
               end    
             else   
/*               case when isnull(Detail.ItemMustBeBid,0) = 0 and SUBSTRING(Items.SortSeq,1,8) != 'EDS' and Detail.VendorId != 7691 then ''
                 else   
                   case isnull(Items.BrandName,'')  
                     when '' then ''  
                     else char(13) + char(10) + 'Brand Name: ' + isnull(Items.BrandName,'')  
                   end +  
                   case isnull(Items.ManufacturorNumber,'')  
                     when '' then ''  
                     else char(13) + char(10) + 'Manufacturer Number:' + isnull(Items.ManufacturorNumber,'')  
                   end +  
                   case isnull(Items.VendorId,0)  
                     when 0 then ''  
                     else char(13) + char(10) + 'Vendor: ' + isnull(Vendors.Name,'')  
                   end +  
                   case isnull(Items.VendorPartNumber,'')  
                     when '' then ''  
                     else char(13) + char(10) + 'Vendor Part Number: ' + isnull(Items.VendorPartNumber,'')  
                   end +  
                   case isnull(Items.ItemsPerUnit,'')  
                     when '' then ''
                     when '0' then ''  
                     else char(13) + char(10) + 'Items Per Unit: ' + isnull(Items.ItemsPerUnit,'')  
                   end 
               end   
*/ ''           end /*+
           case
             when Detail.OriginalItemId is not null then
               char(13) + char(10) + '** Cross Referenced from Item ' + (select I.ItemCode from Items I where I.ItemId = Detail.OriginalItemId)
             else ''
           end */FullDescription,
           coalesce(case when coalesce(BidResults.ItemBidType,'') in ('S', 'C') and coalesce(trim(BidResults.AIShortDesc),'') != '' then coalesce(trim(BidResults.AIShortDesc),'') else null end,
					case when coalesce(BidResults.ItemBidType,'') in ('S', 'C') and coalesce(trim(BidResults.Alternate),'') != '' then coalesce(trim(BidResults.Alternate),'') else null end,
					case when coalesce(xr.AIShortDesc,trim(xr.ShortDescription),'') = '' then null else coalesce(xr.AIShortDesc,trim(xr.ShortDescription),'') end, 
					case when coalesce(cxr.AIShortDesc,trim(cxr.ShortDescription),'') = '' then null else coalesce(cxr.AIShortDesc,trim(cxr.ShortDescription),'') end, 
					case when coalesce(xr.AIFullDesc, trim(xr.FullDescription),'') = '' then null else coalesce(xr.AIFullDesc, trim(xr.FullDescription),'') end, 
	                case when coalesce(cxr.AIFullDesc,trim(cxr.FullDescription),'') = '' then null else coalesce(cxr.AIFullDesc,trim(cxr.FullDescription),'') end, 
					Items.Description,'') + 
--		   coalesce(xr.ShortDescription, cxr.ShortDescription, Items.Description, xr.FullDescription, cxr.FullDescription, '') +   
           case Category.Type   
             when 2 then   
               case isnull(ParentCatalogId,0)   
                 when 0 then ''   
                 else char(13) + char(10) + 'Publisher: ' + isnull(Catalog.Name,'')  
               end +   
               case isnull(BookTypes.BookTypeId,0)   
                 when 0 then ''   
                 else char(13) + char(10) + 'Edition: ' + isnull(BookTypes.BookType,'')   
               end +   
               case isnull(Items.CopyrightYear,0)   
                 when 0 then ''   
                 else char(13) + char(10) + 'Copyright Year: ' + isnull(convert(varchar(32),Items.CopyrightYear,101),'None')
               end    
             else   
               case when isnull(Detail.ItemMustBeBid,0) = 0 and SUBSTRING(Items.SortSeq,1,8) != 'EDS' and Detail.VendorId != 7691 then ''
			     when isnull(Detail.ItemMustBeBid,0) = 0 and Detail.VendorId != 7691 then ''
                 else   
                   case isnull(Items.BrandName,'')  
                     when '' then ''  
                     else char(13) + char(10) + 'Brand Name: ' + isnull(Items.BrandName,'')  
                   end +  
                   case isnull(Items.ManufacturorNumber,'')  
                     when '' then ''  
                     else char(13) + char(10) + 'Manufacturer Number:' + isnull(Items.ManufacturorNumber,'')  
                   end +  
                   case isnull(Items.VendorId,0)  
                     when 0 then ''  
                     else char(13) + char(10) + 'Vendor: ' + isnull(Vendors.Name,'')  
                   end +  
                   case isnull(Items.VendorPartNumber,'')  
                     when '' then ''  
                     else char(13) + char(10) + 'Vendor Part Number: ' + isnull(Items.VendorPartNumber,'')  
                   end +  
                   case isnull(Items.ItemsPerUnit,'')  
                     when '' then ''
                     when '0' then ''  
                     else char(13) + char(10) + 'Items Per Unit: ' + isnull(Items.ItemsPerUnit,'')  
                   end 
               end   
           end +
           case
             when Detail.OriginalItemId is not null then
               char(13) + char(10) + '** Cross Referenced from Item ' + (select I.ItemCode from Items I where I.ItemId = Detail.OriginalItemId)
             else ''
           end ShortDescription) dd
/*
        (select Top 1 lxr.CrossRefId 
           from dbo.vw_LatestCrossRef lxr with (nolock) 
          where lxr.BidHeaderId = Requisitions.BidHeaderId 
            and lxr.ItemId = Detail.ItemId
          order by lxr.CatalogYear desc, lxr.CatalogPrice, lxr.CrossRefId)
*/
--where Detail.DetailId in (1493645707,1493645467)
```
