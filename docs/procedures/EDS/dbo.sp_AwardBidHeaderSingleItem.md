# Procedure: `dbo.sp_AwardBidHeaderSingleItem`

_Generated on 2026-05-04T13:04:00.289Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_AwardBidHeaderSingleItem` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2015-08-05 15:03:27 |
| Modified | 2015-08-05 15:03:27 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidHeaderId` | IN | int |  |
| 2 | `@pItemId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidImportCatalogList` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `detail` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `dbo.uf_BidAnalysisDetail` | SQL_INLINE_TABLE_VALUED_FUNCTION |  |
| `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_PackCodeCatalog` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--sp_AwardBidHeader 2200

/* exec sp_AwardBidHeader 600 rollback */

Create procedure [dbo].[sp_AwardBidHeaderSingleItem] @pBidHeaderId int, @pItemId int as

declare @BidType int,
	@Type int,
	@MarkAsOriginal int

select @Type = Type,
       @BidType = BidHeaders.BidType,
       @MarkAsOriginal = MarkAsOriginal 
  from BidHeaders
  join Category on Category.CategoryId = BidHeaders.CategoryId
 where BidHeaders.BidHeaderId = @pBidHeaderId

if @Type in (1,4)
begin
	  select * 
		into #BidSummary
		from dbo.uf_BidAnalysisDetail(@pBidHeaderId)
	   where ItemId = @pItemId
end

/* Suspend Update Trigger Actions */
/*
Update BidHeaders
   set UpdateHold = 1
 where BidHeaderId = @pBidHeaderId
 
*/

begin transaction AwardBidHeader

begin
/*
	Update Awards
	   set Active = 0
	  from Awards
	 where BidHeaderId = @pBidHeaderId
	   and Active =1

	Update Bids
	   set Active = 0
	  from Bids
	 where BidHeaderId = @pBidHeaderId
	   and Active =1
*/
	delete BidItems
	  from Bids
	  join BidItems on BidItems.BidId = Bids.BidId
	               and BidItems.ItemId = @pItemId
	 where Bids.BidHeaderId = @pBidHeaderId
	   and Bids.Active =1

	Update BidResults
	   set PackedVendorItemCode = dbo.uf_PackCodeCatalog(Bidresults.VendorItemCode, BidImportCatalogList.CatalogId)
	  from BidResults
	  join BidImports on BidImports.BidImportId = BidResults.BidImportId
					 and BidImports.BidHeaderId = @pBidHeaderId
	  join BidImportCatalogList on BidImportCatalogList.BidimportId = BidImports.BidImportId
	 where isnull(PackedVendorItemCode,'') != dbo.uf_PackCodeCatalog(isnull(Bidresults.VendorItemCode,''), BidImportCatalogList.CatalogId)
	   and BidResults.Active = 1
       and BidResults.ItemId = @pItemId
       
	Update BidResults
	   set PackedVendorItemCode = dbo.uf_PackCode(Bidresults.VendorItemCode)
	  from BidResults
	  join BidImports on BidImports.BidImportId = BidResults.BidImportId
					 and BidImports.BidHeaderId = @pBidHeaderId
	  left outer join BidImportCatalogList on BidImportCatalogList.BidimportId = BidImports.BidImportId
	 where isnull(BidResults.PackedVendorItemCode,'') != dbo.uf_PackCode(isnull(Bidresults.VendorItemCode,''))
	   and BidImportCatalogList.BidImportCatalogId is null
	   and BidResults.Active = 1
       and BidResults.ItemId = @pItemId

	begin
/*
	  insert Bids (Active, EffectiveFrom, EffectiveUntil, Name, PricePlanId, CategoryId, VendorId, BidDiscountRate, VendorBidNumber, DistrictId, ItemsBid, AmountBid, Description, BidHeaderId, BidImportId, AdditionalHandlingAmount, FreeHandlingAmount, FreeHandlingStart, FreeHandlingEnd, WebsiteLink)
		select 1,
			   case
				 when month(BidHeaders.BidAwardDate) >= 7 then convert(datetime,'11/01/' + convert(varchar(16),year(BidHeaders.BidAwardDate)))
				 else
					convert(datetime,'11/01/' + convert(varchar(16),year(BidHeaders.BidAwardDate)-1))
			   end,
			   case
				 when month(BidHeaders.BidAwardDate) >= 7 then convert(datetime,'10/31/' + convert(varchar(16),year(BidHeaders.BidAwardDate)+1))
				 else
					convert(datetime,'11/01/' + convert(varchar(16),year(BidHeaders.BidAwardDate)))
			   end,
			   Vendors.Name Name,
			   BidHeaders.PricePlanId,
			   BidHeaders.CategoryId,
			   BidImports.VendorId,
			   BidImports.BidItemDiscountRate,
			   BidImports.VendorBidNumber,
			   BidHeaders.DistrictId,
			   BidImports.ItemsBid,
			   BidImports.AmountBid,
			   '' Description,
			   BidHeaders.BidHeaderId,
			   BidImports.BidImportId,
			   BidImports.AdditionalHandlingAmount, 
			   BidImports.FreeHandlingAmount, 
			   BidImports.FreeHandlingStart, 
			   BidImports.FreeHandlingEnd,
			   BidImports.WebsiteLink
		  from BidHeaders
		  join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
						 and BidImports.Active = 1 -- Added 11/01/2009 Not Sure why it was missing
		  join Vendors on Vendors.VendorId = BidImports.VendorId
		 where BidHeaders.BidHeaderId = @pBidHeaderId
		union (
		select 1,
			   case
				 when month(BidHeaders.BidAwardDate) >= 7 then convert(datetime,'11/01/' + convert(varchar(16),year(BidHeaders.BidAwardDate)))
				 else
					convert(datetime,'11/01/' + convert(varchar(16),year(BidHeaders.BidAwardDate)-1))
			   end,
			   case
				 when month(BidHeaders.BidAwardDate) >= 7 then convert(datetime,'10/31/' + convert(varchar(16),year(BidHeaders.BidAwardDate)+1))
				 else
					convert(datetime,'11/01/' + convert(varchar(16),year(BidHeaders.BidAwardDate)))
			   end,
			   Vendors.Name Name,
			   BidHeaders.PricePlanId,
			   BidHeaders.CategoryId,
			   Vendors.VendorId,
			   null,
			   null,
			   BidHeaders.DistrictId,
			   0,
			   0,
			   '' Description,
			   BidHeaders.BidHeaderId,
			   null,
			   null,
			   null,
			   null,
			   null,
			   null
		  from BidHeaders
		  join Vendors on Vendors.VendorId = 7691
		 where BidHeaders.BidHeaderId = @pBidHeaderId
		)

	  insert BidsCatalogList (BidId, CatalogId, DiscountRate)
		select Bids.BidId, BidImportCatalogList.CatalogId, BidImportCatalogList.DiscountRate
		  from BidHeaders
		  join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
		  join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId
		  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
				   and Bids.VendorId = BidImports.VendorId
				   and Bids.Active = 1
		 where BidHeaders.BidHeaderId = @pBidHeaderId

	  insert Awards (Active, BidId, VendorId, PricePlanId, CategoryId, BidStartDate, BidEndDate, VendorBidNumber, ItemsBid, AmountBid, BidDiscountRate, StateContractDiscount, BidHeaderId)
		select 1,
			   Bids.BidId,
			   BidImports.VendorId,
			   BidHeaders.PricePlanId,
			   BidHeaders.CategoryId,
			   case
				 when month(BidHeaders.BidAwardDate) >= 7 then convert(datetime,'11/01/' + convert(varchar(16),year(BidHeaders.BidAwardDate)))
				 else
					convert(datetime,'11/01/' + convert(varchar(16),year(BidHeaders.BidAwardDate)-1))
			   end,
			   case
				 when month(BidHeaders.BidAwardDate) >= 7 then convert(datetime,'10/31/' + convert(varchar(16),year(BidHeaders.BidAwardDate)+1))
				 else
					convert(datetime,'11/01/' + convert(varchar(16),year(BidHeaders.BidAwardDate)))
			   end,
			   BidImports.VendorBidNumber,
			   BidImports.ItemsBid,
			   BidImports.AmountBid,
			   BidImports.BidItemDiscountRate,
			   null,
			   BidHeaders.BidHeaderId
		  from BidHeaders
		  join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
						 and BidImports.Active = 1
		  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
				   and Bids.VendorId = BidImports.VendorId
				   and Bids.Active = 1
		 where BidHeaders.BidHeaderId = @pBidHeaderId
		union (
		select 1,
			   Bids.BidId,
			   Vendors.VendorId,
			   BidHeaders.PricePlanId,
			   BidHeaders.CategoryId,
			   case
				 when month(BidHeaders.BidAwardDate) >= 7 then convert(datetime,'11/01/' + convert(varchar(16),year(BidHeaders.BidAwardDate)))
				 else
					convert(datetime,'11/01/' + convert(varchar(16),year(BidHeaders.BidAwardDate)-1))
			   end,
			   case
				 when month(BidHeaders.BidAwardDate) >= 7 then convert(datetime,'10/31/' + convert(varchar(16),year(BidHeaders.BidAwardDate)+1))
				 else
					convert(datetime,'11/01/' + convert(varchar(16),year(BidHeaders.BidAwardDate)))
			   end,
			   null,
			   null,
			   null,
			   null,
			   null,
			   BidHeaders.BidHeaderId
		  from BidHeaders
		  join Vendors on Vendors.VendorId = 7691
		  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
				   and Bids.VendorId = Vendors.VendorId
				   and Bids.Active = 1
		 where BidHeaders.BidHeaderId = @pBidHeaderId
		)

	  insert AwardsCatalogList (AwardId, CatalogId, DiscountRate)
		select Awards.AwardId, BidImportCatalogList.CatalogId, BidImportCatalogList.DiscountRate
		  from BidHeaders
		  join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
		  join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId
		  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
				   and Bids.VendorId = BidImports.VendorId
				   and Bids.Active = 1
		  join Awards on Awards.BidHeaderId = BidHeaders.BidHeaderId
					 and Awards.VendorId = BidImports.VendorId
					 and Awards.Active = 1
		 where BidHeaders.BidHeaderId = @pBidHeaderId
*/
		select Bids.BidId, BidRequestItems.ItemId, 
			   case isnull(BidImports.VendorId,0) 
				 when 0 then 0 
				 when 7691 then 0 
				 else BidResults.UnitPrice 
			   end UnitPrice, 
			   BidResults.Alternate, BidResults.QuantityBid, BidRequestItems.BidRequest, Awards.AwardId, 
			   case isnull(BidResults.VendorItemCode,'') 
				 when '' then (select top 1 CrossRefs.VendorItemCode 
								 from CrossRefs with (nolock) 
								 join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 
								 join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId and BidImportCatalogList.CatalogId = Catalog.CatalogId 
								where CrossRefs.ItemId = BidRequestItems.ItemId and CrossRefs.Active = 1 
								order by CrossRefs.CrossRefId) 
				 else BidResults.VendorItemCode 
			   end VendorItemCode, 
			   case isnull(BidResults.VendorItemCode,'') 
				 when '' then (select top 1 CrossRefs.CrossRefId 
								 from CrossRefs with (nolock) 
								 join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 
								 join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId and BidImportCatalogList.CatalogId = Catalog.CatalogId 
								where CrossRefs.ItemId = BidRequestItems.ItemId and CrossRefs.Active = 1 
								order by Catalog.PDFAvailable desc, Catalog.CatalogYear desc, CrossRefs.CrossRefId desc) 
				 else (select top 1 CrossRefs.CrossRefId 
						 from CrossRefs with (nolock) 
						 join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 
						 join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId and BidImportCatalogList.CatalogId = Catalog.CatalogId 
						where CrossRefs.PackedCode = BidResults.PackedVendorItemCode and CrossRefs.Active = 1 
						order by Catalog.PDFAvailable desc, CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) 
			   end CrossRefId, 
			   case isnull(BidResults.ItemBidType,'') 
				 when '' then 'Not Specified' 
				 when 'N' then 'Non-Compliant' 
				 when 'C' then 'Compliant' 
				 when 'S' then 'As Specified' 
				 else 'Unknown' 
			   end ItemBidType, 
			   (select top 1 PackedCode 
				 from Items with (nolock) 
				where Items.ItemId = BidRequestItems.ItemId 
				order by Items.ItemId) PackedItemCode, 
			   case isnull(BidResults.VendorItemCode,'') 
				 when '' then (select top 1 CrossRefs.PackedCode 
								 from CrossRefs with (nolock) 
								 join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 
								 join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId and BidImportCatalogList.CatalogId = Catalog.CatalogId 
								where CrossRefs.ItemId = BidRequestItems.ItemId and CrossRefs.Active = 1 
								order by CrossRefs.CrossRefId) 
				 else BidResults.PackedVendorItemCode 
			   end PackedVendorItemCode, 
			   BidResults.PageNo, BidResults.ContractNumber, getDate() DateUpdated, BidResults.BidResultsId
		  into #BidItems
		  from BidHeaders with (nolock)
		  join BidRequestItems on BidRequestItems.BidHeaderId = BidHeaders.BidHeaderId
							  and BidRequestItems.Active = 1
	/* ************* Following Join was replaced by join Following this comment to allow
					 for having Multiple Vendor Item Codes for the same item ie (Staples 2010) DCH 3/17/2010
		  left outer join BidResults on BidResults.BidRequestItemId = BidRequestItems.BidRequestItemId
									and BidResults.BidResultsId = (select top 1 BidResultsId from #BidSummary bs where bs.BidRequestItemId = BidResults.BidRequestItemId and bs.BidType in ('As Specified','Compliant') and bs.ResultsStatus = 1 order by SortKey, BidResultsId)
	--                                and BidResults.BidResultsId = (select top 1 BidResultsId from #BidSummary bs where bs.BidRequestItemId = BidResults.BidRequestItemId and bs.BidType in ('As Specified','Compliant') order by SortKey, BidResultsId)
	*/
		  left outer join BidResults on BidResults.BidRequestItemId = BidRequestItems.BidRequestItemId
									and BidResults.BidResultsId in 
								  (select bs2.BidResultsId 
									 from #BidSummary bs1 with (nolock)
									 join #BidSummary bs2 on bs2.VendorCode = bs1.VendorCode
														 and bs2.BidRequestItemId = bs1.BidRequestItemId 
									where bs1.BidResultsId = (select top 1 BidResultsId 
																from #BidSummary bs with (nolock)
															   where bs.BidRequestItemId = BidResults.BidRequestItemId 
																 and bs.BidType in ('As Specified','Compliant') 
																 and bs.ResultsStatus = 1 
															   order by bs.SortKey, bs.BidResultsId))
		  left outer join BidImports on BidImports.BidImportId = BidResults.BidImportId
									and BidImports.Active = 1
		  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
				   and Bids.VendorId = isnull(BidImports.VendorId,7691)
				   and Bids.Active = 1
		  join Awards on Awards.BidHeaderId = BidHeaders.BidHeaderId
					 and Awards.VendorId = isnull(BidImports.VendorId,7691)
					 and Awards.Active = 1
		 where BidHeaders.BidHeaderId = @pBidHeaderId
		 order by BidRequestItems.ItemId

	  insert BidItems (BidId, ItemId, Price, Alternate, BidQuantity, BidRequest, AwardId, VendorItemCode, CrossRefId, ItemBidType, PackedItemCode, PackedVendorItemCode, PageNo, ContractNumber, DateUpdated, BidResultsId)
		select BidId, ItemId, UnitPrice, Alternate, QuantityBid, BidRequest, AwardId, VendorItemCode, CrossRefId, ItemBidType, PackedItemCode, PackedVendorItemCode, PageNo, ContractNumber, DateUpdated, BidResultsId
		  from #BidItems
	      
	  drop table #BidItems
	  
	  if @MarkAsOriginal = 1 or @BidType = 1
	  begin
		Update BidResults
		   set OriginalAwardedItem = case isnull(BidItems.BidItemId,0) when 0 then 0 else 1 end
		  from BidResults
		  join BidImports on BidImports.BidImportId = BidResults.BidImportId
						 and BidImports.BidHeaderId = @pBidHeaderId
		  left outer join BidItems on BidItems.BidItemId = 
			  (select top 1 BidItemId
				 from BidItems
				 join Bids on Bids.BidId = BidItems.BidId
						  and Bids.BidImportId = BidImports.BidImportId
						  and Bids.Active = 1
				where BidItems.BidResultsId = BidResults.BidResultsId)
		 where BidResults.ItemId = @pItemId
	  end

	  -- Create Temp List of Items to Reproc	  
	  create table #DetailList (DetailId int not null primary key)
	  insert #DetailList (DetailId)
	  select Detail.DetailId
		from detail
		join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
		left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
	   where PO.POId is null
		 and case isnull(Detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end = @pBidHeaderId
	  	 and Detail.ItemId = @pItemId
	  	 
	  -- Force Reprocess of Items
	  update Detail
		 set Reproc = 1
		from detail
		join #DetailList dl on dl.DetailId = Detail.DetailId

	  drop table #DetailList
	  drop table #BidSummary
	end

/*
	-- Mark Bid Completed -- Added 2/1/2005 dch
	insert Approvals (Level, StatusId, RequisitionId, ApprovalDate)
	  select 5, 28, Detail.RequisitionId, getdate()
		from BidHeaders
		join BidHeaderDetail on BidHeaderDetail.BidHeaderId = BidHeaders.BidHeaderId
		join Detail on Detail.DetailId = BidHeaderDetail.DetailId
		join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
		left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
		join Approvals on Approvals.ApprovalId = 
		   (select top 1 ap.ApprovalId
			  from Approvals ap
			 where ap.RequisitionId = Requisitions.RequisitionId
			 order by ap.ApprovalDate desc)
					  and Approvals.StatusId = 29
	   where BidHeaders.BidHeaderId = @pBidHeaderId
		 and BidHeaders.BidType = 2
		 and PO.POId is null
	   group by Detail.RequisitionId

	/* Update Bid Header on Req */
	Update Requisitions
	   set BidHeaderId = BidHeaders.BidHeaderId
	  from Detail
	  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
					   and isnull(Requisitions.BidHeaderId,0) = 0
	  join BidHeaderDetail on BidHeaderDetail.DetailId = Detail.DetailId
	  join BidHeaders on BidHeaders.BidHeaderId = BidHeaderDetail.BidHeaderId
					 and BidHeaders.BidHeaderId = @pBidHeaderId
					 and BidHeaders.BidType = 2
	 where isnull(Requisitions.BidHeaderId,0) = 0
	-- Added Above line 7/17/2006 dch

	/* Update Bid Header on Detail */
	Update Detail
	   set BidHeaderId = BidHeaders.BidHeaderId
	  from Detail
	  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
	--                   and isnull(Requisitions.BidHeaderId,0) != @pBidHeaderId
	  join BidHeaderDetail on BidHeaderDetail.DetailId = Detail.DetailId
	  join BidHeaders on BidHeaders.BidHeaderId = BidHeaderDetail.BidHeaderId
					 and BidHeaders.BidHeaderId = @pBidHeaderId
					 and BidHeaders.BidType = 2
	-- added above line 2/1/2005 dch
	 where isnull(Detail.BidHeaderId,0) = 0
		or Detail.BidHeaderId != (select Top 1 BH.BidHeaderId
		                            from BidHeaders bh
		                            join BidHeaderDetail bhd on bhd.BidHeaderId = bh.BidHeaderId
		                                                    and bhd.DetailId = Detail.DetailId
		                           where bh.Active = 1
		                             and bh.BidType = 2
		                             and GETDATE() between bh.EffectiveFrom and bh.EffectiveUntil
		                           order by bh.DateCreated desc)

*/
end

/* Reinstate Update Trigger Actions */
/*
Update BidHeaders
   set Active = 1,
	   ScheduledReaward = null,
	   MarkAsOriginal = 0
 where BidHeaderId = @pBidHeaderId
*/
commit transaction AwardBidHeader
```
