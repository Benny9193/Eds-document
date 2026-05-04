# View: `dbo.vw_ReqDetail`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DetailId` | int | NO |  |  |
| 2 | `ItemId` | int | YES |  |  |
| 3 | `ItemCode` | varchar(50) | NO |  |  |
| 4 | `Quantity` | int | NO |  |  |
| 5 | `LastYearsQuantity` | int | NO |  |  |
| 6 | `Description` | nvarchar(max) | YES |  |  |
| 7 | `LongDescription` | nvarchar(max) | YES |  |  |
| 8 | `UnitCode` | varchar(20) | NO |  |  |
| 9 | `BidPrice` | money | NO |  |  |
| 10 | `Extended` | money | NO |  |  |
| 11 | `LastAlteredSessionID` | int | NO |  |  |
| 12 | `VendorName` | varchar(50) | YES |  |  |
| 13 | `VendorCode` | varchar(16) | NO |  |  |
| 14 | `CatalogName` | varchar(50) | NO |  |  |
| 15 | `AltDescription` | varchar(1024) | NO |  |  |
| 16 | `VendorItemCode` | varchar(50) | YES |  |  |
| 17 | `CatalogPage` | char(4) | YES |  |  |
| 18 | `NoBid` | int | NO |  |  |
| 19 | `ItemMustBeBid` | int | NO |  |  |
| 20 | `BidInfo` | varchar(53) | YES |  |  |
| 21 | `HasBeenBid` | int | NO |  |  |
| 22 | `AllowOverride` | int | NO |  |  |
| 23 | `VendorOverridden` | int | NO |  |  |
| 24 | `ItemBidType` | varchar(32) | YES |  |  |
| 25 | `SortSeq` | varchar(64) | YES |  |  |
| 26 | `RequisitionId` | int | NO |  |  |
| 27 | `AddendumAdded` | tinyint | NO |  |  |
| 28 | `MostPopular` | int | NO |  |  |
| 29 | `TabSelection` | varchar(7) | NO |  |  |
| 30 | `AddedFromAddenda` | datetime | YES |  |  |
| 31 | `VendorID` | int | YES |  |  |
| 32 | `UnitId` | int | YES |  |  |
| 33 | `HeadingID` | int | YES |  |  |
| 34 | `KeywordID` | int | YES |  |  |
| 35 | `BrandName` | varchar(50) | YES |  |  |
| 36 | `ManufacturerId` | int | YES |  |  |
| 37 | `ManufacturorNumber` | varchar(50) | YES |  |  |
| 38 | `VendorPartNumber` | varchar(50) | YES |  |  |
| 39 | `ListPrice` | money | YES |  |  |
| 40 | `ItemsPerUnit` | varchar(50) | YES |  |  |
| 41 | `Items_VendorID` | int | YES |  |  |
| 42 | `VendorToSupplyManufacturer` | tinyint | YES |  |  |
| 43 | `ExtraDescription` | varchar(1024) | YES |  |  |
| 44 | `DateAvailable` | datetime | YES |  |  |
| 45 | `Modified` | datetime | YES |  |  |
| 46 | `BidStatus` | varchar(14) | NO |  |  |
| 47 | `BaseDescription` | varchar(512) | NO |  |  |
| 48 | `SortKey` | datetime | YES |  |  |
| 49 | `BidHeaderId` | int | YES |  |  |
| 50 | `CatalogRefs` | varchar(1) | NO |  |  |
| 51 | `BidderToSupplyVendor` | tinyint | YES |  |  |
| 52 | `BidderToSupplyVendorPartNbr` | tinyint | YES |  |  |
| 53 | `DistrictVendorCode` | varchar(20) | NO |  |  |
| 54 | `VendorsAccountCode` | varchar(50) | NO |  |  |
| 55 | `VendorBidInfo` | varchar(576) | YES |  |  |
| 56 | `BidItemId` | int | YES |  |  |
| 57 | `BelowMinimumItem` | int | NO |  |  |
| 58 | `MinimumPOAmount` | money | NO |  |  |
| 59 | `AdditionalShipping` | tinyint | NO |  |  |
| 60 | `SDSAvail` | int | YES |  |  |
| 61 | `ShortDescription` | nvarchar(max) | YES |  |  |
| 62 | `ImageURL` | varchar(1024) | YES |  |  |
| 63 | `ShippingCost` | decimal(9,2) | YES |  |  |
| 64 | `ShippingUpdateRequired` | int | NO |  |  |
| 65 | `DeliveryDate` | nvarchar(4000) | YES |  |  |
| 66 | `PerishableItem` | bit | YES |  |  |
| 67 | `DoctorsName` | varchar(100) | YES |  |  |
| 68 | `DEANumber` | varchar(9) | YES |  |  |
| 69 | `PrescriptionRequired` | bit | YES |  |  |
| 70 | `DigitallyDelivered` | tinyint | YES |  |  |
| 71 | `DigitallyDeliveredEmail` | varchar(255) | YES |  |  |
| 72 | `MinimumOrderQuantity` | int | YES |  |  |
| 73 | `CrossRefId` | int | YES |  |  |
| 74 | `UserId` | int | YES |  |  |
| 75 | `SchoolId` | int | YES |  |  |
| 76 | `DistrictId` | int | YES |  |  |
| 77 | `BudgetId` | int | NO |  |  |
| 78 | `SDSURL` | varchar(512) | YES |  |  |
| 79 | `ManufacturorNumberDetail` | varchar(50) | YES |  |  |
| 80 | `BrandNameDetail` | varchar(50) | YES |  |  |
| 81 | `OrderedYear` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Awards` | USER_TABLE |
| `BidHeaderDetail` | USER_TABLE |
| `BidHeaders` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `BidItems` | USER_TABLE |
| `BidRequestItems` | USER_TABLE |
| `BidResults` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Catalog` | USER_TABLE |
| `Category` | USER_TABLE |
| `CrossRefs` | USER_TABLE |
| `Detail` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictVendor` | USER_TABLE |
| `Items` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `VendorCategory` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `vw_DetailDescription` | VIEW |
| `vw_DetailOnBid` | VIEW |
| `vw_DMSSDSDocuments` | VIEW |
| `vw_SDSItems` | VIEW |
| `vw_SDSItemsAll` | VIEW |
| [`dbo.Detail`](dbo.Detail.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| `dbo.usp_GetPODetail` | SQL_STORED_PROCEDURE |
| `dbo.usp_GetPODetail_Test` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE VIEW [dbo].[vw_ReqDetail] AS SELECT --top 10
		Detail.DetailId as DetailId,Detail.ItemId as ItemId,
	   case isnull(Category.Type,0)
	     when 5 then
	       isnull(Detail.ItemCode,'')
	     else
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
		   end 
	   end ItemCode,
       ISNULL(Detail.Quantity,0) as Quantity,
       ISNULL(Detail.LastYearsQuantity,0) as LastYearsQuantity,
	   case isnull(Detail.ItemId,0)
	     when 0 then Detail.Description
		 else coalesce(vw_DetailDescription.ShortDescription,vw_DetailDescription.ItemDescription)--vw_DetailDescription.ShortDescription DCH 1/24/2020
	   end as [Description], -- THis is the ShortDescription
       case isnull(Detail.ItemId,0) 
         when 0 then Detail.Description 
         else vw_DetailDescription.ItemDescription 
       end as LongDescription,
       ISNULL(Detail.UnitCode,'') as UnitCode,
       ISNULL(Detail.BidPrice,0) as BidPrice,
       ISNULL((Detail.BidPrice * Detail.Quantity),0) as Extended,
       isnull(Detail.LastAlteredSessionID,0) AS LastAlteredSessionID,
       case isnull(Detail.ItemMustBeBid,0) 
         when 0 then coalesce(VendorCategory.VendorName,Vendors.DisplayAs,Vendors.Name,'') 
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
         else cast(BidHeaders.BidHeaderId as varchar(18)) + ' - ' + convert(varchar(32),BidHeaders.BidAwardDate,101) 
       end BidInfo,
       isnull((select top 1 1 /*Bi.BidItemId*/      
                 from BidRequestItems Bri with (nolock)      
                 join BidHeaders bh on bh.BidHeaderId = Bri.BidHeaderId                       
                 and bh.Active = 1                       
                 and (    getdate() between bh.EffectiveFrom and bh.EffectiveUntil 
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
       case 
         when Detail.BidItemId is not null
          and bh.BidType = 2
          and isnull((select COUNT(*)
                        from BidResults
                        join BidImports on BidImports.BidImportId = BidResults.BidImportId
                                       and BidImports.Active = 1
                                       and BidImports.BidHeaderId = bh.BidHeaderId 
                       where BidResults.ItemId = Detail.ItemId
                         and BidResults.ItemBidType In ('S','C')
                         and isnull(BidResults.VOMId,0) > 0),0) > 0 then 1
         else 0   
       end VendorOverridden,   
       case isnull(BidItems.ItemBidType,'') 
         when '' then 'Catalog Item' 
         else BidItems.ItemBidType 
       end as ItemBidType,
       Items.SortSeq SortSeq,
       Requisitions.RequisitionId,
       isnull(Detail.AddendumItem,0) AddendumAdded,
       case
         when bh.BidType = 1 and BidItems.BidItemId is not null then 1
         else 0
       end MostPopular,
       case 
         when isnull(Detail.ItemMustBeBid,0) = 0
          and ISNULL(Vendors.Code,'0000') = '0000' then 'NoBid'
         when isnull(Detail.ItemMustBeBid,0) = 0
          and (   (ISNULL(Detail.BidItemId,0) != 0
                   and (   ISNULL(bh.BidType,2) = 1
                        or Detail.AddedFromAddenda is not null))
               or (ISNULL(Detail.BidItemId,0) = 0)) then 'Main'
         else 'Addenda' 
       end TabSelection
       -- bob
       , Detail.AddedFromAddenda AS AddedFromAddenda
       , Vendors.VendorID
       , Detail.UnitId
       , Items.HeadingID
       , Items.KeywordID
       , Items.BrandName
       , Items.ManufacturerId
       , Items.ManufacturorNumber
       , Items.VendorPartNumber
       , Items.ListPrice
       , Items.ItemsPerUnit
       , Items.VendorId AS Items_VendorID
       , Items.VendorToSupplyManufacturer
       , Detail.ExtraDescription
--       , bs.DateModified DateAvailable
	   , coalesce(bh.ReadyToUseDate,BidHeaders.ReadyToUseDate,bs.DateModified) DateAvailable
       , Detail.Modified
       , case 
           when BidHeaders.BidType = 1 and isnull(Detail.ItemMustBeBid,0) = 0 then
             'Pre-Bid'
           when BidHeaders.BidHeaderId is null and bh.BidType = 1 and isnull(Detail.ItemMustBeBid,0) = 0 then
             'Pre-Bid'
           when BidHeaders.BidHeaderId is null then
             case 
               when ItemMustBeBid = 1 then
                 case 
                   when  (select Top 1 dob.BidAwardDate
							from vw_DetailOnBid dob
						   where dob.DetailId = Detail.DetailId
						   Order by dob.BidHeaderId desc) > getdate() then 'Out to Bid'
                   when  (select Top 1 dob.BidAwardDate
							from vw_DetailOnBid dob
						   where dob.DetailId = Detail.DetailId
						   Order by dob.BidHeaderId desc) <= getdate() and bs.BidId is null then 'Being Analyzed'
                   when  (select Top 1 dob.BidAwardDate
							from vw_DetailOnBid dob
						   where dob.DetailId = Detail.DetailId
						   Order by dob.BidHeaderId desc) <= getdate() and bs.BidId is not null then 
					 case 
					   when getdate() between (select Top 1 dob.EffectiveFrom							
					                             from vw_DetailOnBid dob
						                        where dob.DetailId = Detail.DetailId) and
						                      (select Top 1 dob.EffectiveUntil							
					                             from vw_DetailOnBid dob
						                        where dob.DetailId = Detail.DetailId) then
			             'Bid Available'
					   else
			             'Bid Expired'
			         end
			       else
					 'Not Bid'
			     end
               else
                 'Not Bid'
             end
           when BidHeaders.BidAwardDate > GETDATE() then
             'Out to Bid'
           when BidHeaders.BidAwardDate <= GETDATE() and Bs.BidId is null then
             'Being Analyzed'
           when BidHeaders.BidAwardDate <= GETDATE() and bs.BidId is not null and GETDATE() between isnull(BidHeaders.EffectiveFrom,cast('01/01/2000' as datetime)) and isnull(BidHeaders.EffectiveUntil,cast('01/01/2000' as datetime)) then
             'Bid Available'
           when BidHeaders.BidAwardDate <= GETDATE() and GETDATE() not between isnull(BidHeaders.EffectiveFrom,cast('01/01/2000' as datetime)) and isnull(BidHeaders.EffectiveUntil,cast('01/01/2000' as datetime)) then
             'Bid Expired'
           else
             'Unknown'
         end BidStatus,
         isnull(Items.Description,'') BaseDescription,
         Detail.Modified SortKey
         , Detail.BidHeaderId
         , ''/*dbo.uf_CatalogRefsDetail(Detail.DetailId)*/ CatalogRefs
         , Items.BidderToSupplyVendor
         , Items.BidderToSupplyVendorPartNbr
         , case isnull(District.UseEDSVendorCodes,0) 
             when 0 then isnull(DistrictVendor.Value,'') 
             else isnull(Vendors.Code,'') 
           end as DistrictVendorCode
         , isnull(DistrictVendor.VendorsAccountCode,'') VendorsAccountCode
         , case isnull(rtrim(bh.Description),'') 
             when '' then '' 
             else isnull(rtrim(ltrim(bh.Description)),'') + char(13) + char(10) 
           end +     
           case isnull(rtrim(cb.VendorBidNumber),'') 
             when '' then 'Bid Date: ' + isnull(convert(varchar(16),bh.BidAwardDate,101),'') 
             else 'Bid Number: ' + isnull(rtrim(cb.VendorBidNumber),'') 
           end as VendorBidInfo
         , Detail.BidItemId
         , case 
             when District.MinimumPOAmount > 0
              and (select SUM(d.Quantity * d.BidPrice)
					 from Detail d
					 where d.RequisitionId = Requisitions.RequisitionId
					   and d.VendorId = Detail.VendorId
					   and isnull(d.ItemMustBeBid,0) = 0
					   and d.VendorId != 7691
					   and District.MinimumPOAmount > 0) < District.MinimumPOAmount then 1
	         else 0
	       end BelowMinimumItem,
	       isnull(District.MinimumPOAmount,0) MinimumPOAmount,
	       isnull(Detail.AdditionalShipping,0) AdditionalShipping,
		   case when District.EnableRTKOnline = 1 then coalesce(SDSStatusAll.SDSAvail, SDSStatus.SDSAvail,0) else 0 end SDSAvail,
		   coalesce(vw_DetailDescription.ShortDescription,vw_DetailDescription.ItemDescription) ShortDescription,
		   coalesce(im.imageThumbnail, BidResults.ImageURL,CrossRefs.ImageURL,'') ImageURL,
		   coalesce(case when Detail.AdditionalShipping = 1 then Detail.ShippingCost else 0 end,0) ShippingCost,
		   case
		     when Detail.AdditionalShipping = 1 and (Detail.ShippingUpdated is null or coalesce(Detail.ShippingQuantity,0) != coalesce(Detail.Quantity,0) or coalesce(Detail.ShippingCost,0) = 0) then 1
			 else 0
		   end ShippingUpdateRequired,
		   case when detail.DeliveryDate is null or detail.DeliveryDate = '' then '' else Format(detail.DeliveryDate,'MM/dd/yyyy')  end DeliveryDate,
		   detail.PerishableItem , 
		   detail.DoctorsName , 
		   detail.DEANumber , 
		   detail.PrescriptionRequired,
       detail.DigitallyDelivered,
       detail.DigitallyDeliveredEmail,       
       detail.MinimumOrderQuantity,
       detail.CrossRefId,
			 Requisitions.UserId,
    Requisitions.SchoolId,
    Budgets.DistrictId,
		Budgets.BudgetId,
    COALESCE(BidResults.SDS_URL, CrossRefs.MSDSRef, SDSStatus.SDSURL, SDSStatusAll.SDSURL, '') as SDSURL
        , COALESCE(BidResults.ManufPartNoBid, CrossRefs.ManufacturorPartNumber, NULL) as ManufacturorNumberDetail
				, COALESCE(BidResults.ManufacturerBid, CrossRefs.Manufacturor, '') as BrandNameDetail
				,YEAR(Budgets.StartDate) AS OrderedYear
  FROM dbo.Detail  with (nolock)
  join vw_DetailDescription on vw_DetailDescription.DetailId = Detail.DetailId
  join Items on Items.ItemId = Detail.ItemId
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
  join Category on Category.CategoryId = Requisitions.CategoryId
--  left outer join vw_ShortDescription sd on sd.ItemId = Detail.ItemId --and RankId = 1
  left outer join BidItems on BidItems.BidItemId = Detail.BidItemId
  left outer join BidResults on BidResults.BidResultsId = BidItems.BidResultsId
  left outer join Bids on Bids.BidId = BidItems.BidId
  left outer JOIN Vendors on Vendors.VendorId = case isnull(Detail.ItemMustBeBid,0) 
                                                  when 0 then Detail.VendorId 
                                                  else 0 
                                                end
  left outer join BidHeaders on BidHeaders.BidHeaderId = Detail.BidHeaderId
/*  left outer join VendorCategory on VendorCategory.VendorId = Vendors.VendorId
                                and VendorCategory.CategoryId = Category.CategoryId
  left outer join DistrictVendor on DistrictVendor.DistrictId = Budgets.DistrictId
                                and DistrictVendor.VendorId = Vendors.VendorId*/
  outer apply (Select top 1 vc.VendorName
                 from VendorCategory vc
				where vc.VendorId = Vendors.VendorId
				  and vc.CategoryId = Category.CategoryId
				order by vc.VCId) VendorCategory
  outer apply (Select top 1 dv.Value, dv.VendorsAccountCode
                 from DistrictVendor dv
				where dv.DistrictId = Budgets.DistrictId
				  and dv.VendorId = Vendors.VendorId
				order by dv.DistrictVendorId) DistrictVendor
  outer apply (select top 1 bhdbh.BidHeaderId, bhdbh.BidAwardDate
                 from BidHeaderDetail bhd
				 join BidHeaders bhdbh on bhdbh.BidHeaderId = bhd.BidHeaderId
									  and bhdbh.Active = 1
				                      and bhdbh.BidDate is not null
									  and bhdbh.BidAwardDate is not null
				where bhd.DetailId = Detail.DetailId
				order by bhdbh.BidHeaderId desc) otb
  left outer join BidHeaders bh on bh.BidHeaderId = coalesce(Bids.BidHeaderId, otb.BidHeaderId, Requisitions.BidHeaderId)
/*													case 
                                                      when Bids.BidHeaderId is null then Requisitions.BidHeaderId
													  when otb.BidHeaderId is not null then otb.BidHeaderId
                                                      else Bids.BidHeaderId
                                                    end
*/
                                                  /*case isnull(Detail.BidHeaderId,0) 
                                                      when 0 then Requisitions.BidHeaderId 
                                                      else Detail.BidHeaderId 
                                                    end*/
  left outer join Catalog on Catalog.CatalogId = Detail.CatalogId
  left outer join Bids cb on cb.BidId = 
    (select Top 1 bl.BidId
       from Bids bl
      where bl.BidHeaderId = bh.BidHeaderId
        and bl.VendorId = Vendors.VendorId
        and bl.Active = 1
        and bl.BidId = coalesce(Bids.BidId,bl.BidId))
  left outer join Bids bs on Bs.BidId =
    (select Top 1 Bids.BidId
       from Bids with (nolock)
      where Bids.BidHeaderId = BidHeaders.BidHeaderId
        and Bids.Active = 1
      order by Bids.DateModified desc)
  left outer join CrossRefs on CrossRefs.CrossRefId = Detail.CrossRefId
  outer apply (select top 1 1 SDSAvail, SDSURL
				   from vw_SDSItems si
				   join vw_DMSSDSDocuments dd on dd.MSDSId = si.MSDSId
				  where si.ItemId = Detail.ItemId
			   ) SDSStatus
  outer apply (Select top 1 1 SDSAvail, si.SDSURL
                 from vw_SDSItemsAll si
				where trim(COALESCE(BidResults.SDS_URL, CrossRefs.MSDSRef, '')) like 'http%') SDSStatusAll
  outer apply (Select coalesce(BidResults.ImageURL,CrossRefs.ImageURL,'') imageThumbnail) im
/*  outer apply (Select top 1 '/images/images' + Images.imageThumbnail imageThumbnail
                 from Images 
				where Images.ImageURL = coalesce(BidResults.ImageURL,CrossRefs.ImageURL,'')
				order by Images.dateLoaded desc) im
   outer apply (select top 1 ShortDescription
			     from vw_ShortDescription sd
				 where sd.ItemId = Detail.ItemId
			   ) sd  */
```
