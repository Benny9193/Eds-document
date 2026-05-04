# View: `dbo.vw_ReqDetailAsp1`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | YES |  |  |
| 2 | `DetailId` | int | NO |  |  |
| 3 | `ItemId` | int | YES |  |  |
| 4 | `ItemCode` | varchar(50) | NO |  |  |
| 5 | `Quantity` | int | NO |  |  |
| 6 | `LastYearsQuantity` | int | NO |  |  |
| 7 | `Description` | varchar(4480) | YES |  |  |
| 8 | `UnitCode` | varchar(20) | NO |  |  |
| 9 | `BidPrice` | money | NO |  |  |
| 10 | `Extended` | money | NO |  |  |
| 11 | `SessionId` | int | NO |  |  |
| 12 | `VendorName` | varchar(50) | NO |  |  |
| 13 | `VendorCode` | varchar(16) | NO |  |  |
| 14 | `CatalogName` | varchar(50) | NO |  |  |
| 15 | `AltDescription` | varchar(1024) | NO |  |  |
| 16 | `VendorItemCode` | varchar(50) | YES |  |  |
| 17 | `CatalogPage` | char(4) | YES |  |  |
| 18 | `NoBid` | int | NO |  |  |
| 19 | `ItemMustBeBid` | int | NO |  |  |
| 20 | `BidInfo` | varchar(51) | YES |  |  |
| 21 | `HasBeenBid` | int | NO |  |  |
| 22 | `AllowOverride` | int | NO |  |  |
| 23 | `VendorOverridden` | int | NO |  |  |
| 24 | `ItemBidType` | varchar(32) | YES |  |  |
| 25 | `SortSeq` | varchar(64) | YES |  |  |
| 26 | `CatalogRefs` | varchar(8000) | YES |  |  |
| 27 | `AllowDescriptionModify` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Awards` | USER_TABLE |
| `BidHeaders` | USER_TABLE |
| `BidItems` | USER_TABLE |
| `BidRequestItems` | USER_TABLE |
| `BidResults` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Catalog` | USER_TABLE |
| `Category` | USER_TABLE |
| `CrossRefs` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `Items` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `vw_DetailDescription` | VIEW |
| [`dbo.Detail`](dbo.Detail.md) | USER_TABLE |
| `dbo.uf_CatalogRefsDetail` | SQL_SCALAR_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
--select * from vw_ReqDetailAsp1 where RequisitionId = 1459333

create   view  [dbo].[vw_ReqDetailAsp1] as
SELECT Detail.RequisitionId,
       Detail.DetailId as DetailId,
       Detail.ItemId as ItemId,                       
       case isnull(Detail.ItemMustBeBid,0)                         
         when 1 then isnull(Detail.ItemCode,'')                         
         else                           
           case isnull(Detail.BidItemId,0)                             
             when 0 then                                
               case isnull(Detail.VendorId,7691)                                 
                 when 7691 then isnull(Detail.ItemCode,'')                                 
                 else isnull(Detail.VendorItemCode,'')                               
               end
             else ISNULL(Detail.ItemCode,'')                           
           end                      
       end ItemCode,                      
       ISNULL(Detail.Quantity,0) as Quantity,                      
       ISNULL(Detail.LastYearsQuantity,0) as LastYearsQuantity,                     
       case isnull(Detail.BidItemId,0)
         when 0 then -- Catalog Item
		   case isnull(Detail.ItemId,0) 
			 when 0 then Detail.Description 
			 else vw_DetailDescription.ItemDescription 
		   end 
		 else -- Bid Item
		   case ISNULL(bh.CompliantAlert,0)
		     when 0 then
			   case isnull(Detail.ItemId,0) 
				 when 0 then Detail.Description 
				 else vw_DetailDescription.ItemDescription 
			   end 
		     else
			   case substring(BidItems.ItemBidType,1,1)
				 when 'A' then -- As specified
				   '<div>' + vw_DetailDescription.ItemDescription +'</div>' +
				   case rtrim(isnull(BidItems.vendorItemCode,'')) 
					 when '' then ''
					 else
					   '<div style="font-style:italic;font-weight:Bold;">Awarded Vendor Item Code</div>' +
					   '<div>' + ISNULL(BidItems.VendorItemCode,'') + '</div>' +
					   case ISNULL(rtrim(BidResults.ManufacturerBid),'') when '' then '' else '<div>Manufacturer: ' + rtrim(BidResults.ManufacturerBid) + '</div>' end +
					   case ISNULL(rtrim(BidResults.ManufPartNoBid),'') when '' then '' else '<div>Part Number Bid: ' + RTRIM(BidResults.ManufPartNoBid) + '</div>' end
				   end
				 when 'C' then -- Compliant
				   '<div style="background-color:yellow; font-weight:bold;">Compliant Item</div>' +
				   '<div>' + ISNULL(BidItems.Alternate,'') + '</div>' + /*
				   '<div style="background-color:pink; font-weight:bold;">Bid As</div>'+
				   '<div>' + vw_DetailDescription.ItemDescription + '</div>'*/
				   case ISNULL(rtrim(BidResults.ManufacturerBid),'') when '' then '' else '<div>Manufacturer: ' + rtrim(BidResults.ManufacturerBid) + '</div>' end +
				   case ISNULL(rtrim(BidResults.ManufPartNoBid),'') when '' then '' else '<div>Part Number Bid: ' + RTRIM(BidResults.ManufPartNoBid) + '</div>' end +
				   case 
					 when (    isnull(BidHeaders.CompliantAlert,0) = 1 
						   and isnull(BidHeaders.BidType,0) = 2
						   and isnull(BidItems.BidItemId,0) != 0 
						   and BidItems.ItemBidType = 'Compliant')
					   or (    isnull(BidHeaders.CompliantAlert,0) != 1
						   and isnull(BidHeaders.BidType,0) = 2
						   and isnull(BidItems.BidItemId,0) != 0 
						   and BidItems.ItemBidType = 'Compliant') then
					   '<div style="font-weight:bold;"><br/>Bid As</div>' +
					   '<div>' + vw_DetailDescription.ItemDescription + '</div>'
					 else ''
				   end
				 when 'N' then -- Non-Compliant
				   '<div style="background-color:red; font-weight:bold;">Non-Compliant Item</div>' +
				   '<div>' + ISNULL(BidItems.Alternate,'') + '</div>' +
				   '<div style="background-color:pink; font-weight:bold;">Bid As</div>'+
				   '<div>' + vw_DetailDescription.ItemDescription + '</div>' +
				   case ISNULL(rtrim(BidResults.ManufacturerBid),'') when '' then '' else '<div>Manufacturer: ' + rtrim(BidResults.ManufacturerBid) + '</div>' end +
				   case ISNULL(rtrim(BidResults.ManufPartNoBid),'') when '' then '' else '<div>Part Number Bid: ' + RTRIM(BidResults.ManufPartNoBid) + '</div>' end
				 else
				   case isnull(Detail.ItemId,0) 
					 when 0 then Detail.Description 
					 else vw_DetailDescription.ItemDescription 
				   end 
			   end
           end
	   end as Description,
       ISNULL(Detail.UnitCode,'') as UnitCode,                     
       ISNULL(Detail.BidPrice,0) as BidPrice,                     
       ISNULL((Detail.BidPrice * Detail.Quantity),0) as Extended,                     
       isnull(Detail.SessionId,0) SessionId,                     
       case isnull(Detail.ItemMustBeBid,0) 
         when 0 then ISNULL(Vendors.Name,'') 
         else 'Item Not Bid' 
       end as VendorName,                     
       ISNULL(Vendors.Code,'0000') VendorCode,                     
       isnull(catalog.name,ISNULL((select Catalog.Name 
                                     from Awards with (nolock) 
                                     join Catalog on Catalog.CatalogId = Awards.CatalogId 
                                    where Awards.AwardId = Detail.AwardId),'')) as CatalogName,        
       ISNULL(Detail.Alternate,'') as AltDescription,                   
       Detail.VendorItemCode,                   
       case isnull((select Top 1 CrossRefs.Page 
                      from Awards with (nolock) 
                      join Catalog on Catalog.CatalogId = Awards.CatalogId 
                      join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId 
                                    and CrossRefs.ItemId = Detail.ItemId 
                                    and Crossrefs.Active = 1 
                     where Awards.AwardId = Detail.AwardId 
                     order by Catalog.CatalogYear desc, Catalog.CatalogId, CrossRefs.Page, CrossRefs.CrossRefId),'') 
         when '' then detail.CatalogPage 
         else (select Top 1 CrossRefs.Page 
                 from Awards with (nolock) 
                 join Catalog on Catalog.CatalogId = Awards.CatalogId 
                 join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId 
                               and CrossRefs.ItemId = Detail.ItemId 
                               and Crossrefs.Active = 1 
                where Awards.AwardId = Detail.AwardId 
                order by Catalog.CatalogYear desc, Catalog.CatalogId, CrossRefs.Page, CrossRefs.CrossRefId) 
       end CatalogPage,        
       case isnull(Detail.ItemMustBeBid,0)                     
         when 1 then 0                     
         else                       
           case ISNULL(Vendors.Code,'0000')                         
             WHEN '0000' THEN 1                         
             else 0                       
           end                   
       end NoBid,                   
       isnull(Detail.ItemMustBeBid,0) ItemMustBeBid,   
       case isnull(BidHeaders.BidHeaderId,0) 
         when 0 then 'Default' 
         else convert(varchar(16),BidHeaders.BidHeaderId) + ' - ' + convert(varchar(32),BidHeaders.BidAwardDate,101) 
       end BidInfo,       
       isnull((select top 1 1 
                 from BidRequestItems Bri with (nolock)      
                 join BidHeaders bh on bh.BidHeaderId = Bri.BidHeaderId                       
                                   and bh.Active = 1                       
                                   and (   getdate() between bh.EffectiveFrom and bh.EffectiveUntil 
                                        or (    bh.EffectiveFrom is null 
                                            and getdate() between bh.BidDate and dateadd(month,6,bh.BidDate)))    
                where Bri.ItemId = Detail.ItemId      
                  and Bri.Active = 1),0) HasBeenBid,        
       case isnull(Items.DistrictId,0)     
         when 0 then 0     
         else       
           case isnull(Detail.ItemMustBeBid,0)         
             when 0 then           
               case isnull(bh.BidType,1)             
                 when 2 then 1             
                 else 0           
               end         
             else 1       
           end   
       end as AllowOverride,        
       case isnull((select top 1 BidResults.OriginalAwardedItem 
                      from BidItems with (nolock)
                      join BidResults on BidResults.BidResultsId = BidItems.BidResultsId 
                     where BidItems.BidItemId = Detail.BidItemId),0)     
         when 0 then 1     
         else 0   
       end VendorOverridden,   
       case isnull(BidItems.ItemBidType,'') 
         when '' then 'Catalog Item' 
         else BidItems.ItemBidType 
       end as ItemBidType,
       Detail.SortSeq,
       dbo.uf_CatalogRefsDetail(Detail.DetailId) CatalogRefs,
       case 
         when isnull(Items.DistrictId,0) = 0
           or (select Top 1 DistrictCategories.AllowAddenda
                 from DistrictCategories with (nolock)
                where DistrictCategories.DistrictId = Budgets.DistrictId
                  and DistrictCategories.CategoryId = Category.CategoryId) != 1
           or isnull(Detail.ItemMustBeBid,0) != 1
           or isnull(Category.Type,0) != 1 then 0
         else 1
       end AllowDescriptionModify
  FROM dbo.Detail  with (nolock)      
  join vw_DetailDescription on vw_DetailDescription.DetailId = Detail.DetailId      
  join Items on Items.ItemId = Detail.ItemId      
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId      
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId      
  join Category on Category.CategoryId = Requisitions.CategoryId      
  left outer join BidItems on BidItems.BidItemId = Detail.BidItemId   
  left outer join BidResults on BidResults.BidResultsId = BidItems.BidResultsId   
  left outer JOIN Vendors on Vendors.VendorId = case isnull(Detail.ItemMustBeBid,0) when 0 then Detail.VendorId else 0 end      
  left outer join BidHeaders on BidHeaders.BidHeaderId = Detail.BidHeaderId      
  left outer join BidHeaders bh on bh.BidHeaderId = case isnull(Detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end      
  left outer join Catalog on Catalog.CatalogId = Detail.CatalogId
```
