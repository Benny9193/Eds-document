# Procedure: `dbo.sp_AwardBidHeader`

_Generated on 2026-05-04T13:07:57.342Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_AwardBidHeader` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2004-06-09 02:02:01 |
| Modified | 2025-06-26 12:00:23 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `Awardings` | USER_TABLE |  |
| `Awards` | USER_TABLE |  |
| `AwardsCatalogList` | USER_TABLE |  |
| `BidHeaderDetail` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidImportCatalogList` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `BidManufacturers` | USER_TABLE |  |
| `BidMappedItems` | USER_TABLE |  |
| `BidMSRPResultPrices` | USER_TABLE |  |
| `BidMSRPResults` | USER_TABLE |  |
| `BidMSRPResultsProductLines` | USER_TABLE |  |
| `BidProductLinePrices` | USER_TABLE |  |
| `BidProductLines` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `BidsCatalogList` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `detail` | USER_TABLE |  |
| `DetailNotifications` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `TMAwards` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `vw_BidMSRPRankedManufacturerProductLines` | VIEW |  |
| `vw_BidMSRPRankedManufacturerProductLinesOrdered` | VIEW |  |
| `vw_BidTradesVendors` | VIEW |  |
| `vw_WinningMSRPEntryPrices` | VIEW |  |
| `dbo.uf_BidAnalysisDetail` | SQL_INLINE_TABLE_VALUED_FUNCTION |  |
| `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_PackCodeCatalog` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--sp_AwardBidHeader 9981
--select * from Awardings
--select * from DetailNotifications
/* exec sp_AwardBidHeader 600 rollback */

CREATE procedure [dbo].[sp_AwardBidHeader] @pBidHeaderId int as

/********  test error handler  
--SEt @pBidHeaderId = 2200
Begin Try
	Insert Into Awards (AwardId) Values (83)
End Try
Begin Catch
	Goto ErrorHandler;
End Catch
--*/

declare @BidType int,
	@Type int,
	@MarkAsOriginal int

Begin Try
	select @Type = Type,
		   @BidType = BidHeaders.BidType,
	       @MarkAsOriginal = MarkAsOriginal 
	from BidHeaders
	join Category on Category.CategoryId = BidHeaders.CategoryId
	 where BidHeaders.BidHeaderId = @pBidHeaderId
End Try
Begin Catch
	Goto ErrorHandler;
End Catch

if @Type in (1,4)
	begin
	  select * 
		into #BidSummary
		from dbo.uf_BidAnalysisDetail(@pBidHeaderId)
	  create index SKI_BidRequestItem_BidResults on #BidSummary(BidRequestItemId) include(BidResultsId)
	end
	

/*
Print @Type
Print @BidType
Print @MarkasOriginal
Select * From #BidSummary
*/

/* Suspend Update Trigger Actions */
/*
Update BidHeaders
   set UpdateHold = 1
 where BidHeaderId = @pBidHeaderId
 
*/

--begin transaction AwardBidHeader

if @Type in (3) -- T&M
	begin
		Begin Try
			update TMAwards
			   set Active = 0
			  from TMAwards with (updlock,rowlock)
			 where BidHeaderID = @pBidHeaderId
		End Try
		Begin Catch
				Goto ErrorHandler;
		End Catch

		Begin Try
			insert TMAwards (Active, BidHeaderId, BidTradeCountyId, BidImportId, VendorId, AwardAmount)
			  select 1, btv.BidHeaderId, btv.BidTradeCountyId, btv.BidImportId, case when btv.VendorId = 7692 then 7691 else btv.VendorId end, btv.AwardAmount 
				from [vw_BidTradesVendors] btv
			   where btv.BidHeaderId = @pBidHeaderId
		End Try
		Begin Catch
			Goto ErrorHandler;
		End Catch

		Begin Try
			update TMAwards
		   set AwardType = case
							 when Tmp.VendorId = 7691 
							  and TMAwards.TMAwardId = tmp.TMAwardId then 'Primary - Not Bid'
							 when Tms.VendorId = 7691 
							  and TMAwards.TMAwardId = tms.TMAwardId then 'Secondary - Not Bid'
							 when Tmp.AwardAmount != Tms.AwardAmount
							  and Tmp.TMAwardId != Tms.TMAwardId 
							  and TMAwards.TMAwardId = tmp.TMAwardId then 'Primary'
							 when Tmp.AwardAmount = Tms.AwardAmount 
							  and Tmp.TMAwardId != Tms.TMAwardId
							  and TMAwards.AwardAmount = Tmp.AwardAmount then 'Primary - Tied'
							 when Tmp.AwardAmount != Tms.AwardAmount 
							  and Tms.TMAwardId = Tmt.TMAwardId 
							  and TMAwards.TMAwardId = tms.TMAwardId then 'Secondary'
							 when Tmp.AwardAmount != Tms.AwardAmount 
							  and Tms.TMAwardId != Tmt.TMAwardId 
							  and TMAwards.AwardAmount = tms.AwardAmount then 'Secondary - Tied'
							 else 'Unknown'
						   end
		  from TMAwards with (updlock,rowlock)
		  left outer join TMAwards tmp on tmp.BidHeaderId = TMAwards.BidHeaderId
		                              and tmp.BidTradeCountyId = TMAwards.BidTradeCountyId
		                              and tmp.Active = 1
		                              and tmp.TMAwardId =
			(select top 1 tma.TMAwardId
			   from TMAwards tma with (nolock) 
			  where tma.BidHeaderId = TMAwards.BidHeaderId 
				and tma.BidTradeCountyId = TMAwards.BidTradeCountyId
				and tma.Active = 1
			  order by tma.AwardAmount, tma.VendorId, tma.TMAwardId)
		  left outer join TMAwards tms on tms.BidHeaderId = TMAwards.BidHeaderId
		                              and tms.BidTradeCountyId = TMAwards.BidTradeCountyId
		                              and tms.Active = 1
		                              and tms.TMAwardId =
			(select top 1 tmss.TMAwardId
			   from
				(select top 2 tma.AwardAmount, tma.VendorId, tma.TMAwardId
				   from TMAwards tma with (nolock) 
				  where tma.BidHeaderId = TMAwards.BidHeaderId 
					and tma.BidTradeCountyId = TMAwards.BidTradeCountyId
					and tma.Active = 1
				  order by tma.AwardAmount, tma.VendorId, tma.TMAwardId) tmss
			  order by tmss.AwardAmount desc, tmss.VendorId desc, tmss.TMAwardId desc)
		  left outer join TMAwards tmt on tmt.BidHeaderId = TMAwards.BidHeaderId
		                              and tmt.BidTradeCountyId = TMAwards.BidTradeCountyId
		                              and tmt.Active = 1
		                              and tmt.TMAwardId =
			(select top 1 tmss.TMAwardId
			   from
				(select top 3 tma.AwardAmount, tma.VendorId, tma.TMAwardId
				   from TMAwards tma with (nolock) 
				  where tma.BidHeaderId = TMAwards.BidHeaderId 
					and tma.BidTradeCountyId = TMAwards.BidTradeCountyId
					and tma.Active = 1
				  order by tma.AwardAmount, tma.VendorId, tma.TMAwardId) tmss
			  order by tmss.AwardAmount desc, tmss.VendorId desc, tmss.TMAwardId desc)
		 where TMAwards.BidHeaderId = @pBidHeaderId
		   and TMAwards.Active = 1
	End Try
	Begin Catch
		Goto ErrorHandler;		
	End Catch


	end
else
	if @Type in (5) -- MSRP
	begin
		Begin Try
			update Bids
			   set Active = 0
			  from Bids with (updlock,rowlock)
			 where BidHeaderID = @pBidHeaderId
		End Try
		Begin Catch
			Goto ErrorHandler;
		End Catch

	/* Pre 2013-2014 Bid Cycle Code	 
		insert Bids (Active, EffectiveFrom, EffectiveUntil, Name, PricePlanId, CategoryId, VendorId, VendorBidNumber, Description, BidHeaderId, BidImportId, AdditionalHandlingAmount, FreeHandlingAmount, FreeHandlingStart, FreeHandlingEnd, WebsiteLink)
		  select 1, BidHeaders.EffectiveFrom, BidHeaders.EffectiveUntil, Vendors.Name, BidHeaders.PricePlanId, BidHeaders.CategoryId, BidImports.VendorId, BidImports.VendorBidNumber, BidHeaders.Description, BidHeaders.BidHeaderId, BidImports.BidImportId, BidImports.AdditionalHandlingAmount, BidImports.FreeHandlingAmount, BidImports.FreeHandlingStart, BidImports.FreeHandlingEnd, BidImports.WebsiteLink
			from BidHeaders with (nolock)
			join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
						   and BidImports.Active = 1
			join Vendors on Vendors.VendorId = BidImports.VendorId
			--Added below join to ONLY award winning Bids
			join BidMgrBidRankingMSRPView ranking on ranking.BidHeaderId = BidHeaders.BidHeaderId
												 and ranking.BidImportId = BidImports.BidImportId
												 and ranking.WinningBidFlag = 1
		   where BidHeaders.BidHeaderId = @pBidHeaderId
		   group by BidHeaders.EffectiveFrom, BidHeaders.EffectiveUntil, Vendors.Name, BidHeaders.PricePlanId, BidHeaders.CategoryId, BidImports.VendorId, BidImports.VendorBidNumber, BidHeaders.Description, BidHeaders.BidHeaderId, BidImports.BidImportId, BidImports.AdditionalHandlingAmount, BidImports.FreeHandlingAmount, BidImports.FreeHandlingStart, BidImports.FreeHandlingEnd, BidImports.WebsiteLink
		   order by Vendors.Name
       
		insert BidManufacturers (BidId, DiscountRate, ManufacturerId)
		  select Bids.BidId, BidMSRPResults.DiscountRate, BidMSRPResults.ManufacturerId
			from BidHeaders with (nolock)
			join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
						   and BidImports.Active = 1
			join Vendors on Vendors.VendorId = BidImports.VendorId
			join BidMSRPResults on BidMSRPResults.BidImportId = BidImports.BidImportId
							   and BidMSRPResults.Active = 1
			--Added below join to ONLY award winning Bids
			join BidMgrBidRankingMSRPView ranking on ranking.BidHeaderId = BidHeaders.BidHeaderId
												 and ranking.BidImportId = BidImports.BidImportId
												 and ranking.BidMSRPResultsId = BidMSRPResults.BidMSRPResultsId
												 and ranking.WinningBidFlag = 1
			join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
					 and Bids.Active = 1
					 and Bids.VendorId = Vendors.VendorId
		   where BidHeaders.BidHeaderId = @pBidHeaderId
		   group by Bids.BidId, BidMSRPResults.DiscountRate, BidMSRPResults.ManufacturerId
	*** End of Old Code */
	/* New Code Starting with 2013-2014 Bid Cycle */
		Begin Try
			insert Bids (Active, EffectiveFrom, EffectiveUntil, Name, PricePlanId, CategoryId, VendorId, VendorBidNumber, Description, BidHeaderId, BidImportId, AdditionalHandlingAmount, FreeHandlingAmount, FreeHandlingStart, FreeHandlingEnd, WebsiteLink)
			  select 1, BidHeaders.EffectiveFrom, BidHeaders.EffectiveUntil, Vendors.Name, BidHeaders.PricePlanId, BidHeaders.CategoryId, BidImports.VendorId, BidImports.VendorBidNumber, BidHeaders.Description, BidHeaders.BidHeaderId, BidImports.BidImportId, BidImports.AdditionalHandlingAmount, BidImports.FreeHandlingAmount, BidImports.FreeHandlingStart, BidImports.FreeHandlingEnd, BidImports.WebsiteLink
  				from BidHeaders with (nolock)
				join vw_BidMSRPRankedManufacturerProductLines rmpl on rmpl.BidHeaderId = BidHeaders.BidHeaderId
				join BidMSRPResultsProductLines on BidMSRPResultsProductLines.ManufacturerProductLineId = rmpl.ManufacturerProductLineId
				                               and BidMSRPResultsProductLines.MSRPOptionId = rmpl.MSRPOptionId
				                               and BidMSRPResultsProductLines.BidMSRPResultsProductLineId =
				  (select Top 1 bmrmplo.BidMSRPResultsProductLineId
					 from vw_BidMSRPRankedManufacturerProductLinesOrdered bmrmplo 
					 join BidMSRPResults bmr on bmr.BidMSRPResultsId = bmrmplo.BidMSRPResultsId
											and bmr.Active = 1
					 join BidImports bi on bi.BidImportId = bmr.BidImportId
									   and bi.Active = 1
									   and bi.BidHeaderId = BidHeaders.BidHeaderId
					where bmrmplo.ManufacturerProductLineId = rmpl.ManufacturerProductLineId
					  and bmrmplo.MSRPOptionId = rmpl.MSRPOptionId
					  and bmrmplo.AllActive = 1
					order by bmrmplo.SortKey)
				join BidMSRPResults on BidMSRPResults.BidMSRPResultsId = BidMSRPResultsProductLines.BidMSRPResultsId
				join BidImports on BidImports.BidImportId = BidMSRPResults.BidImportId
		 					   and BidImports.Active = 1
				join Vendors on Vendors.VendorId = BidImports.VendorId
			   where BidHeaders.BidHeaderId = @pBidHeaderId
			   group by BidHeaders.EffectiveFrom, BidHeaders.EffectiveUntil, Vendors.Name, BidHeaders.PricePlanId, BidHeaders.CategoryId, BidImports.VendorId, BidImports.VendorBidNumber, BidHeaders.Description, BidHeaders.BidHeaderId, BidImports.BidImportId, BidImports.AdditionalHandlingAmount, BidImports.FreeHandlingAmount, BidImports.FreeHandlingStart, BidImports.FreeHandlingEnd, BidImports.WebsiteLink
			   order by Vendors.Name
		End Try
		Begin Catch
			Goto ErrorHandler;
		End Catch

		Begin Try       
			select wep.ManufacturerId, wep.VendorId, wep.RangeValue 
			   into #TempWep
			   from vw_WinningMSRPEntryPrices wep 
			  where wep.BidHeaderId = @pBidHeaderId
			  group by wep.ManufacturerId, wep.VendorId, wep.RangeValue

			  select Bids.BidId, 
					 case
					   --Check to see if we can set the Discount level at the Manufacturer level
					   when WinningPrices.RangeCount = 0 then
					     coalesce(BidMSRPResultsProductLines.WeightedDiscount,0)
					   when WinningPrices.RangeCount = 1 then
						 -- Set Discount at Manufacturer Level if Valid to
						 (select wep.RangeValue 
							from #tempWep wep
						   where wep.ManufacturerId = rmpl.ManufacturerId
						   group by wep.RangeValue)
					   else
						 null
					 end DiscountRate, 
				rmpl.ManufacturerId
				into #tempManufacturers
				from BidHeaders with (nolock)
				join vw_BidMSRPRankedManufacturerProductLines rmpl on rmpl.BidHeaderId = BidHeaders.BidHeaderId
				join BidMSRPResultsProductLines on BidMSRPResultsProductLines.ManufacturerProductLineId = rmpl.ManufacturerProductLineId
				                               and BidMSRPResultsProductLines.MSRPOptionId = rmpl.MSRPOptionId
				                               and BidMSRPResultsProductLines.BidMSRPResultsProductLineId =
				  (select Top 1 bmrmplo.BidMSRPResultsProductLineId
					 from vw_BidMSRPRankedManufacturerProductLinesOrdered bmrmplo 
					 join BidMSRPResults bmr on bmr.BidMSRPResultsId = bmrmplo.BidMSRPResultsId
											and bmr.Active = 1
					 join BidImports bi on bi.BidImportId = bmr.BidImportId
									   and bi.Active = 1
									   and bi.BidHeaderId = BidHeaders.BidHeaderId
					where bmrmplo.ManufacturerProductLineId = rmpl.ManufacturerProductLineId
					  and bmrmplo.MSRPOptionId = rmpl.MSRPOptionId
					  and bmrmplo.AllActive = 1
					order by bmrmplo.SortKey)
				join BidMSRPResults on BidMSRPResults.BidMSRPResultsId = BidMSRPResultsProductLines.BidMSRPResultsId
				join BidImports on BidImports.BidImportId = BidMSRPResults.BidImportId
		 					   and BidImports.Active = 1
				join Vendors on Vendors.VendorId = BidImports.VendorId
				join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
						 and Bids.Active = 1
						 and Bids.VendorId = Vendors.VendorId
				outer apply (select COUNT(*) RangeCount
							   from (
								 select wep.VendorId, wep.RangeValue 
								   from #tempWep wep 
								  where wep.ManufacturerId = rmpl.ManufacturerId
								  group by wep.VendorId, wep.RangeValue) s) WinningPrices
		   where BidHeaders.BidHeaderId = @pBidHeaderId
		   group by Bids.BidId, WinningPrices.RangeCount, rmpl.ManufacturerId, BidHeaders.BidHeaderId, BidMSRPResultsProductLines.WeightedDiscount

			insert BidManufacturers (BidId, DiscountRate, ManufacturerId)
				select BidId, DiscountRate, ManufacturerId
				  from #tempManufacturers
				 group by BidId, DiscountRate, ManufacturerId
/*			insert BidManufacturers (BidId, DiscountRate, ManufacturerId)
			  select Bids.BidId, 
					 case
					   --Check to see if we can set the Discount level at the Manufacturer level
					   when WinningPrices.RangeCount = 0 then
					     coalesce(BidMSRPResultsProductLines.WeightedDiscount,0)
					   when WinningPrices.RangeCount = 1 then
						 -- Set Discount at Manufacturer Level if Valid to
						 (select wep.RangeValue 
							from vw_WinningMSRPEntryPrices wep with (nolock)
						   where wep.BidHeaderId = BidHeaders.BidHeaderId
							 and wep.ManufacturerId = rmpl.ManufacturerId
						   group by wep.RangeValue)
					   else
						 null
					 end DiscountRate, 
				rmpl.ManufacturerId
				from BidHeaders with (nolock)
				join vw_BidMSRPRankedManufacturerProductLines rmpl on rmpl.BidHeaderId = BidHeaders.BidHeaderId
				join BidMSRPResultsProductLines on BidMSRPResultsProductLines.ManufacturerProductLineId = rmpl.ManufacturerProductLineId
				                               and BidMSRPResultsProductLines.MSRPOptionId = rmpl.MSRPOptionId
				                               and BidMSRPResultsProductLines.BidMSRPResultsProductLineId =
				  (select Top 1 bmrmplo.BidMSRPResultsProductLineId
					 from vw_BidMSRPRankedManufacturerProductLinesOrdered bmrmplo 
					 join BidMSRPResults bmr on bmr.BidMSRPResultsId = bmrmplo.BidMSRPResultsId
											and bmr.Active = 1
					 join BidImports bi on bi.BidImportId = bmr.BidImportId
									   and bi.Active = 1
									   and bi.BidHeaderId = BidHeaders.BidHeaderId
					where bmrmplo.ManufacturerProductLineId = rmpl.ManufacturerProductLineId
					  and bmrmplo.MSRPOptionId = rmpl.MSRPOptionId
					  and bmrmplo.AllActive = 1
					order by bmrmplo.SortKey)
				join BidMSRPResults on BidMSRPResults.BidMSRPResultsId = BidMSRPResultsProductLines.BidMSRPResultsId
				join BidImports on BidImports.BidImportId = BidMSRPResults.BidImportId
		 					   and BidImports.Active = 1
				join Vendors on Vendors.VendorId = BidImports.VendorId
				join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
						 and Bids.Active = 1
						 and Bids.VendorId = Vendors.VendorId
				outer apply (select COUNT(*) RangeCount
							   from (
								 select wep.VendorId, wep.RangeValue 
								   from vw_WinningMSRPEntryPrices wep 
								  where wep.BidHeaderId = BidHeaders.BidHeaderId
									and wep.ManufacturerId = rmpl.ManufacturerId
								  group by wep.VendorId, wep.RangeValue) s) WinningPrices
		   where BidHeaders.BidHeaderId = @pBidHeaderId
		   group by Bids.BidId, BidHeaders.BidHeaderId, rmpl.ManufacturerId, WinningPrices.RangeCount, coalesce(BidMSRPResultsProductLines.WeightedDiscount,0)
*/
		End Try
		Begin Catch
			Goto ErrorHandler;
		End Catch

		Begin Try
			select wep.ManufacturerId, wep.BidMSRPResultsProductLineId, wep.VendorId, wep.RangeValue 
			   into #TempWepp
			   from vw_WinningMSRPEntryPrices wep 
			  where wep.BidHeaderId = @pBidHeaderId
			  group by wep.ManufacturerId, wep.BidMSRPResultsProductLineId, wep.VendorId, wep.RangeValue

			insert BidProductLines(BMAId, DiscountRate, ManufacturerProductLineId, MSRPOptionId)
			  select BidManufacturers.BMAId, 
					 case
					   --Check to see if we can set the Discount level at the product level
					   when WinningPrices.RangeCount = 0 then
					     coalesce(BidMSRPResultsProductLines.WeightedDiscount,0)
					   when WinningPrices.RangeCount = 1 then
						 -- Set Discount at Product Level if Valid to
						 (select wep.RangeValue 
							from #tempWepp wep
						   where wep.ManufacturerId = rmpl.ManufacturerId
							 and wep.BidMSRPResultsProductLineId = rmpl.ManufacturerProductLineId
						   group by wep.RangeValue)
					   else
						 null
					 end, 
					 rmpl.ManufacturerProductLineId, rmpl.MSRPOptionId
				from BidHeaders with (nolock)
				join vw_BidMSRPRankedManufacturerProductLines rmpl on rmpl.BidHeaderId = BidHeaders.BidHeaderId
				join BidMSRPResultsProductLines on BidMSRPResultsProductLines.ManufacturerProductLineId = rmpl.ManufacturerProductLineId
				                               and BidMSRPResultsProductLines.MSRPOptionId = rmpl.MSRPOptionId
				                               and BidMSRPResultsProductLines.BidMSRPResultsProductLineId =
				  (select Top 1 bmrmplo.BidMSRPResultsProductLineId
					 from vw_BidMSRPRankedManufacturerProductLinesOrdered bmrmplo 
					 join BidMSRPResults bmr on bmr.BidMSRPResultsId = bmrmplo.BidMSRPResultsId
											and bmr.Active = 1
					 join BidImports bi on bi.BidImportId = bmr.BidImportId
									   and bi.Active = 1
									   and bi.BidHeaderId = BidHeaders.BidHeaderId
					where bmrmplo.ManufacturerProductLineId = rmpl.ManufacturerProductLineId
					  and bmrmplo.MSRPOptionId = rmpl.MSRPOptionId
					  and bmrmplo.AllActive = 1
					order by bmrmplo.SortKey)
				join BidMSRPResults on BidMSRPResults.BidMSRPResultsId = BidMSRPResultsProductLines.BidMSRPResultsId
				join BidImports on BidImports.BidImportId = BidMSRPResults.BidImportId
		 					   and BidImports.Active = 1
				join Vendors on Vendors.VendorId = BidImports.VendorId
				join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
						 and Bids.Active = 1
						 and Bids.VendorId = Vendors.VendorId
				join BidManufacturers on BidManufacturers.BidId = Bids.BidId
									 and BidManufacturers.ManufacturerId = BidMSRPResults.ManufacturerId
				outer apply (select COUNT(*) RangeCount
							   from (
								 select wep.VendorId, wep.RangeValue 
								   from #TempWepp wep 
								  where wep.ManufacturerId = rmpl.ManufacturerId
									and wep.BidMSRPResultsProductLineId = rmpl.ManufacturerProductLineId
								  group by wep.VendorId, wep.RangeValue) s) WinningPrices
			   where BidHeaders.BidHeaderId = @pBidHeaderId
				 and BidMSRPResultsProductLines.ManufacturerProductLineId = rmpl.ManufacturerProductLineId
			   group by BidManufacturers.BMAId, BidHeaders.BidHeaderId, rmpl.ManufacturerId, rmpl.ManufacturerProductLineId, 
					 rmpl.MSRPOptionId, WinningPrices.RangeCount, coalesce(BidMSRPResultsProductLines.WeightedDiscount,0)

/*			insert BidProductLines(BMAId, DiscountRate, ManufacturerProductLineId, MSRPOptionId)
			  select BidManufacturers.BMAId, 
					 case
					   --Check to see if we can set the Discount level at the product level
					   when WinningPrices.RangeCount = 0 then
					     coalesce(BidMSRPResultsProductLines.WeightedDiscount,0)
					   when WinningPrices.RangeCount = 1 then
						 -- Set Discount at Product Level if Valid to
						 (select wep.RangeValue 
							from vw_WinningMSRPEntryPrices wep
						   where wep.BidHeaderId = BidHeaders.BidHeaderId
							 and wep.ManufacturerId = rmpl.ManufacturerId
							 and wep.BidMSRPResultsProductLineId = rmpl.ManufacturerProductLineId
						   group by wep.RangeValue)
					   else
						 null
					 end, 
					 rmpl.ManufacturerProductLineId, rmpl.MSRPOptionId
				from BidHeaders with (nolock)
				join vw_BidMSRPRankedManufacturerProductLines rmpl on rmpl.BidHeaderId = BidHeaders.BidHeaderId
				join BidMSRPResultsProductLines on BidMSRPResultsProductLines.ManufacturerProductLineId = rmpl.ManufacturerProductLineId
				                               and BidMSRPResultsProductLines.MSRPOptionId = rmpl.MSRPOptionId
				                               and BidMSRPResultsProductLines.BidMSRPResultsProductLineId =
				  (select Top 1 bmrmplo.BidMSRPResultsProductLineId
					 from vw_BidMSRPRankedManufacturerProductLinesOrdered bmrmplo 
					 join BidMSRPResults bmr on bmr.BidMSRPResultsId = bmrmplo.BidMSRPResultsId
											and bmr.Active = 1
					 join BidImports bi on bi.BidImportId = bmr.BidImportId
									   and bi.Active = 1
									   and bi.BidHeaderId = BidHeaders.BidHeaderId
					where bmrmplo.ManufacturerProductLineId = rmpl.ManufacturerProductLineId
					  and bmrmplo.MSRPOptionId = rmpl.MSRPOptionId
					  and bmrmplo.AllActive = 1
					order by bmrmplo.SortKey)
				join BidMSRPResults on BidMSRPResults.BidMSRPResultsId = BidMSRPResultsProductLines.BidMSRPResultsId
				join BidImports on BidImports.BidImportId = BidMSRPResults.BidImportId
		 					   and BidImports.Active = 1
				join Vendors on Vendors.VendorId = BidImports.VendorId
				join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
						 and Bids.Active = 1
						 and Bids.VendorId = Vendors.VendorId
				join BidManufacturers on BidManufacturers.BidId = Bids.BidId
									 and BidManufacturers.ManufacturerId = BidMSRPResults.ManufacturerId
				outer apply (select COUNT(*) RangeCount
							   from (
								 select wep.VendorId, wep.RangeValue 
								   from vw_WinningMSRPEntryPrices wep 
								  where wep.BidHeaderId = BidHeaders.BidHeaderId
									and wep.ManufacturerId = rmpl.ManufacturerId
									and wep.BidMSRPResultsProductLineId = rmpl.ManufacturerProductLineId
								  group by wep.VendorId, wep.RangeValue) s) WinningPrices
			   where BidHeaders.BidHeaderId = @pBidHeaderId
				 and BidMSRPResultsProductLines.ManufacturerProductLineId = rmpl.ManufacturerProductLineId
			   group by BidManufacturers.BMAId, BidHeaders.BidHeaderId, rmpl.ManufacturerId, rmpl.ManufacturerProductLineId, 
					 rmpl.MSRPOptionId, WinningPrices.RangeCount, coalesce(BidMSRPResultsProductLines.WeightedDiscount,0)
*/
			End Try
			Begin Catch
				Goto ErrorHandler;
			End Catch
	         
		Begin Try
			insert BidProductLinePrices(BidProductLineId, RangeBase, DiscountRate)
			  select BidProductLines.BidProductLineId, BidMSRPResultPrices.RangeBase, BidMSRPResultPrices.RangeValue
				from BidHeaders
				join vw_BidMSRPRankedManufacturerProductLines rmpl on rmpl.BidHeaderId = BidHeaders.BidHeaderId
				join BidMSRPResultsProductLines on BidMSRPResultsProductLines.ManufacturerProductLineId = rmpl.ManufacturerProductLineId
				                               and BidMSRPResultsProductLines.MSRPOptionId = rmpl.MSRPOptionId
				                               and BidMSRPResultsProductLines.BidMSRPResultsProductLineId =
				  (select Top 1 bmrmplo.BidMSRPResultsProductLineId
					 from vw_BidMSRPRankedManufacturerProductLinesOrdered bmrmplo 
					 join BidMSRPResults bmr on bmr.BidMSRPResultsId = bmrmplo.BidMSRPResultsId
											and bmr.Active = 1
					 join BidImports bi on bi.BidImportId = bmr.BidImportId
									   and bi.Active = 1
									   and bi.BidHeaderId = BidHeaders.BidHeaderId
					where bmrmplo.ManufacturerProductLineId = rmpl.ManufacturerProductLineId
					  and bmrmplo.MSRPOptionId = rmpl.MSRPOptionId
					  and bmrmplo.AllActive = 1
					order by bmrmplo.SortKey)
				join BidMSRPResults on BidMSRPResults.BidMSRPResultsId = BidMSRPResultsProductLines.BidMSRPResultsId
				join BidMSRPResultPrices on BidMSRPResultPrices.BidMSRPResultsProductLineId = BidMSRPResultsProductLines.BidMSRPResultsProductLineId
				join BidImports on BidImports.BidImportId = BidMSRPResults.BidImportId
		 					   and BidImports.Active = 1
				join Vendors on Vendors.VendorId = BidImports.VendorId
				join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
						 and Bids.Active = 1
						 and Bids.VendorId = Vendors.VendorId
				join BidManufacturers on BidManufacturers.BidId = Bids.BidId
									 and BidManufacturers.ManufacturerId = BidMSRPResults.ManufacturerId
				join BidProductLines on BidProductLines.BMAId = BidManufacturers.BMAId
									and BidProductLines.ManufacturerProductLineId = rmpl.ManufacturerProductLineId
									and BidProductLines.MSRPOptionId = rmpl.MSRPOptionId
			   where BidHeaders.BidHeaderId = @pBidHeaderId
			   order by BidProductLines.BidProductLineId, BidMSRPResultPrices.RangeBase, BidMSRPResultPrices.RangeValue
			End Try
			Begin Catch
				Goto ErrorHandler;
			End Catch

	end
else
begin
	declare @CurrentEntry table (AwardingId int, StartTimestamp datetime)

	Begin Try
		Insert Awardings (BidHeaderId)
			output inserted.AwardingId, inserted.StartTimestamp
			into @CurrentEntry
			values (@pBidHeaderId)
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

	Begin Try
		Update Awards
		   set Active = 0
		  from Awards with (updlock,rowlock)
		 where BidHeaderId = @pBidHeaderId
		   and Active =1
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

	Begin Try
		Update Bids
		   set Active = 0
		  from Bids with (updlock,rowlock)
		 where BidHeaderId = @pBidHeaderId
		   and Active =1
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

	Begin Try
		Update BidResults
		   set PackedVendorItemCode = dbo.uf_PackCodeCatalog(Bidresults.VendorItemCode, BidImportCatalogList.CatalogId)
		  from BidResults with (updlock,rowlock)
		  join BidImports on BidImports.BidImportId = BidResults.BidImportId
						 and BidImports.BidHeaderId = @pBidHeaderId
		  join BidImportCatalogList on BidImportCatalogList.BidimportId = BidImports.BidImportId
		 where isnull(PackedVendorItemCode,'') != dbo.uf_PackCodeCatalog(isnull(Bidresults.VendorItemCode,''), BidImportCatalogList.CatalogId)
		   and BidResults.Active = 1
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

	Begin Try
		Update BidResults
		   set PackedVendorItemCode = dbo.uf_PackCode(Bidresults.VendorItemCode)
		  from BidResults with (updlock,rowlock)
		  join BidImports on BidImports.BidImportId = BidResults.BidImportId
						 and BidImports.BidHeaderId = @pBidHeaderId
		  left outer join BidImportCatalogList on BidImportCatalogList.BidimportId = BidImports.BidImportId
		 where isnull(BidResults.PackedVendorItemCode,'') != dbo.uf_PackCode(isnull(Bidresults.VendorItemCode,''))
		   and BidImportCatalogList.BidImportCatalogId is null
		   and BidResults.Active = 1
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch


	/* Textbooks */
	if @Type = 2
	begin
	Begin Try
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
			   Vendors.Name,
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
		  join Vendors on Vendors.VendorId = BidImports.VendorId
		 where BidHeaders.BidHeaderId = @pBidHeaderId
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

	Begin Try
	  insert BidsCatalogList (BidId, CatalogId, DiscountRate)
		select Bids.BidId, BidImportCatalogList.CatalogId, BidImportCatalogList.DiscountRate
		  from BidHeaders
		  join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
		  join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId
		  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
				   and Bids.VendorId = BidImports.VendorId
				   and Bids.Active = 1
		 where BidHeaders.BidHeaderId = @pBidHeaderId
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

	Begin Try
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
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

	Begin Try
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
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

	Begin Try
	  insert BidItems (BidId, ItemId, Price, Alternate, BidQuantity, BidRequest, AwardId, VendorItemCode, CrossRefId, ItemBidType, PackedItemCode, PackedVendorItemCode, PageNo, ContractNumber, DateUpdated)
		select Bids.BidId, BidResults.ItemId, BidResults.UnitPrice, BidResults.Alternate, BidResults.QuantityBid, BidResults.Quantity, Awards.AwardId, case isnull(BidResults.VendorItemCode,'') when '' then (select top 1 CrossRefs.VendorItemCode from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 where CrossRefs.ItemId = Items.ItemId and CrossRefs.Active = 1 order by CrossRefs.CrossRefId) else BidResults.VendorItemCode end, (select top 1 CrossRefs.CrossRefId from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 where CrossRefs.ItemId = Items.ItemId and CrossRefs.Active = 1 order by CrossRefs.CrossRefId), case isnull(BidResults.ItemBidType,'') when '' then 'Not Specified' when 'N' then 'Non-Compliant' when 'C' then 'Compliant' when 'S' then 'As Specified' else 'Unknown' end ItemBidType, Items.PackedCode, case isnull(BidResults.VendorItemCode,'') when '' then (select top 1 CrossRefs.PackedCode from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 where CrossRefs.ItemId = Items.ItemId and CrossRefs.Active = 1 order by CrossRefs.CrossRefId) else BidResults.PackedVendorItemCode end, BidResults.PageNo, BidResults.ContractNumber, getdate()
		  from BidHeaders
		  join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
						 and BidImports.Active = 1
		  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
				   and Bids.VendorId = BidImports.VendorId
				   and Bids.Active = 1
		  join Awards on Awards.BidHeaderId = BidHeaders.BidHeaderId
					 and Awards.VendorId = BidImports.VendorId
					 and Awards.Active = 1
		  join BidResults on BidResults.BidImportId = BidImports.BidImportId
						 and BidResults.Active = 1
						 and BidResults.ItemBidType in ('C', 'S')
		  join Items on Items.ItemId = BidResults.ItemId
					and Items.Active = 1
		 where BidHeaders.BidHeaderId = @pBidHeaderId
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

	-- Create Bids for Catalog Items
	Begin Try
	  insert Bids (Active, EffectiveFrom, EffectiveUntil, Name, PricePlanId, CategoryId, VendorId, BidDiscountRate, VendorBidNumber, DistrictId, ItemsBid, AmountBid, Description, BidHeaderId, BidImportId, WebsiteLink)
		select 1,
			   convert(datetime,'01/01/2001'),
			   convert(datetime,'12/31/2038'),
			   Vendors.Name,
			   null PriceplanId,
			   BidHeaders.CategoryId,
			   Catalog.VendorId,
			   0 BidItemDiscountRate,
			   null VendorBidNumber,
			   BidHeaders.DistrictId,
			   0 ItemsBid,
			   0 AmountBid,
			   '' Description,
			   null BidHeaderId,
			   null BidImportId,
			   Catalog.WebLink
		  from BidHeaders
		  join Category on Category.CategoryId = BidHeaders.CategoryId
		  join Catalog on Catalog.CategoryId = Category.CategoryId
					  and Catalog.Active = 1
		  join Vendors on Vendors.VendorId = Catalog.VendorId
					  and Vendors.Active = 1
		  left outer join Bids on Bids.CategoryId = Category.CategoryId
							  and Bids.VendorId = Catalog.VendorId
							  and Bids.Active = 1
							  and Bids.EffectiveFrom <= getdate()
							  and Bids.EffectiveUntil >= getdate()
		 where BidHeaders.BidHeaderId = @pBidHeaderId
		   and Bids.BidId is null
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

	Begin Try
	  insert Awards (Active, BidId, VendorId, PricePlanId, CategoryId, BidStartDate, BidEndDate, VendorBidNumber, ItemsBid, AmountBid, BidDiscountRate, StateContractDiscount, BidHeaderId)
		select 1,
			   Bids.BidId,
			   Vendors.VendorId,
			   null PricePlanId,
			   BidHeaders.CategoryId,
			   convert(datetime,'01/01/2001'),
			   convert(datetime,'12/31/2038'),
			   null VendorBidNumber,
			   null ItemsBid,
			   null AmountBid,
			   null BidItemDiscountRate,
			   null,
			   null BidHeaderId
		  from BidHeaders
		  join Category on Category.CategoryId = BidHeaders.CategoryId
		  join Catalog on Catalog.CategoryId = Category.CategoryId
					  and Catalog.Active = 1
		  join Vendors on Vendors.VendorId = Catalog.VendorId
					  and Vendors.Active = 1
		  join Bids on Bids.CategoryId = BidHeaders.CategoryId
				   and Bids.VendorId = Catalog.VendorId
				   and Bids.Active = 1
				   and Bids.EffectiveFrom <= getdate()
				   and Bids.EffectiveUntil >= getdate()
		  left outer join Awards on Awards.CategoryId = Category.CategoryId
								and Awards.VendorId = Vendors.VendorId
								and Awards.Active = 1
								and Awards.BidStartDate <= getdate()
								and Awards.BidEndDate >= getdate()
		 where BidHeaders.BidHeaderId = @pBidHeaderId
		   and Awards.AwardId is null
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch
	end
	else /* Normal Items */
	begin
	Begin Try
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
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

	Begin Try
	  insert BidsCatalogList (BidId, CatalogId, DiscountRate)
		select Bids.BidId, BidImportCatalogList.CatalogId, BidImportCatalogList.DiscountRate
		  from BidHeaders
		  join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
		  join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId
		  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
				   and Bids.VendorId = BidImports.VendorId
				   and Bids.Active = 1
		 where BidHeaders.BidHeaderId = @pBidHeaderId
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

	Begin Try	
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
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

	Begin Try
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
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

	Begin Try
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
						-- Line Below Added 2/7/23 to resolve Color issue on Bid Items
						  and coalesce(trim(CrossRefs.UniqueItemNumber),'') = case when coalesce(trim(BidResults.UniqueItemNumber),'') = '' then coalesce(trim(CrossRefs.UniqueItemNumber),'') else coalesce(trim(BidResults.UniqueItemNumber),'') end
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
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

	Begin Try
	  insert BidItems (BidId, ItemId, Price, Alternate, BidQuantity, BidRequest, AwardId, VendorItemCode, CrossRefId, ItemBidType, PackedItemCode, PackedVendorItemCode, PageNo, ContractNumber, DateUpdated, BidResultsId)
		select BidId, ItemId, UnitPrice, Alternate, QuantityBid, BidRequest, AwardId, VendorItemCode, CrossRefId, ItemBidType, PackedItemCode, PackedVendorItemCode, PageNo, ContractNumber, DateUpdated, BidResultsId
		  from #BidItems
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

	Begin Try
	 drop table #BidItems
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

	Begin Try	  
	  if @MarkAsOriginal = 1 or @BidType = 1
	  begin
		Update BidResults
		   set OriginalAwardedItem = case isnull(BidItems.BidItemId,0) when 0 then 0 else 1 end
		  from BidResults with (updlock,rowlock)
		  join BidImports on BidImports.BidImportId = BidResults.BidImportId
						 and BidImports.BidHeaderId = @pBidHeaderId
		  left outer join BidItems on BidItems.BidItemId = 
			  (select top 1 BidItemId
				 from BidItems
				 join Bids on Bids.BidId = BidItems.BidId
						  and Bids.BidImportId = BidImports.BidImportId
						  and Bids.Active = 1
				where BidItems.BidResultsId = BidResults.BidResultsId)
	  end
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

	Begin Try	  
		delete BidMappedItems with (updlock,rowlock)
		 where BidMappedItems.BidHeaderId = @pBidHeaderId
		   and BidMappedItems.ReasonCode = 'DVSIAB'
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch
	
	Begin Try	  
		select BidHeaders.BidHeaderId, CrossRefs.ItemId, coalesce(BidMappedItems.NewItemId, BidItems.ItemId) NewItemId, 'DVSIAB' Reason into #DVSIAB
		  from BidHeaders
		  join BidRequestItems on BidRequestItems.BidHeaderId = BidHeaders.BidHeaderId
							  and BidRequestItems.Active = 1
		  join Items on Items.ItemId = BidRequestItems.ItemId
					and Items.ItemCode like 'EDS%'
		  join BidResults vbr on vbr.BidRequestItemId = BidRequestItems.BidRequestItemId
							 and vbr.ItemBidType = 'S'
		  join BidImports vbi on vbi.BidHeaderId = BidHeaders.BidHeaderId
							 and vbi.BidImportId = vbr.BidImportId
		  join BidImportCatalogList on BidImportCatalogList.BidImportId = vbi.BidImportId
		  join CrossRefs on CrossRefs.CatalogId = BidImportCatalogList.CatalogId
						and CrossRefs.Active = 1
						and CrossRefs.PackedCode = vbr.PackedVendorItemCode
						and CrossRefs.ItemId != Items.ItemId
		  join BidImports nbi on nbi.BidHeaderId = BidHeaders.BidHeaderId
							 and nbi.BidImportId != vbi.BidImportId
		  join BidResults nbr on nbr.BidImportId = nbi.BidImportId
							 and nbr.BidRequestItemId = vbr.BidRequestItemId
							 and nbr.ItemBidType = 'S'
		  join BidItems on BidItems.BidResultsId = nbr.BidResultsId
		  join Bids on Bids.BidId = BidItems.BidId
				   and Bids.Active = 1
		  left outer join BidMappedItems on BidMappedItems.BidHeaderId = BidHeaders.BidHeaderId
										and BidMappedItems.OrigItemId = BidItems.ItemId
		 where BidHeaders.BidHeaderId = @pBidHeaderId
--		   and BidHeaders.BidType = 1
		 group by BidHeaders.BidHeaderId, CrossRefs.ItemId, coalesce(BidMappedItems.NewItemId, BidItems.ItemId)

		insert BidMappedItems(BidHeaderId, OrigItemId, NewItemId, ReasonCode)
		select BidHeaderId, ItemId, NewItemId, Reason
		  from #DVSIAB
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

	Begin Try	  
		delete BidMappedItems
		 where BidMappedItems.BidHeaderId = @pBidHeaderId
		   and BidMappedItems.ReasonCode = 'SVCI2BI'
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch
	
	Begin Try	  	    
/*		select BidHeaders.BidHeaderId, CrossRefs.ItemId, bia.ItemId NewItemId, 'SVCI2BI' Reason into #SVCI2BI-- Same Vendor Catalog Item 2 Bid Item mapping
		  from BidHeaders
		  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
				   and Bids.Active = 1
				   and Bids.VendorId != 7691
          join BidItems on BidItems.BidId = Bids.BidId
          join BidItems bia on bia.BidId = Bids.BidId
                           and bia.BidItemId =
            (select Top 1 bi.BidItemId
               from BidItems bi
               join Items on Items.ItemId = bi.ItemId
              where bi.BidId = Bids.BidId
                and bi.CrossRefId = BidItems.CrossRefId
				-- DCH added Line below 4/3/2018 and removed 9/5/18
--				and bi.BidItemId != BidItems.BidItemId
              order by bi.Price, Items.SortSeq)
          join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
		  left outer join BidMappedItems on BidMappedItems.BidHeaderId = BidHeaders.BidHeaderId
										and BidMappedItems.OrigItemId = CrossRefs.ItemId
		 where BidHeaders.BidHeaderId = @pBidHeaderId
--		   and BidHeaders.BidType = 1
		   and BidMappedItems.BidMappedItemId is null
		   and CrossRefs.ItemId != bia.ItemId
		 group by BidHeaders.BidHeaderId, CrossRefs.ItemId, bia.ItemId
*/
 		select BidHeaders.BidHeaderId, CrossRefs.ItemId, BidItems.ItemId NewItemId, 'SVCI2BI' Reason into #SVCI2BI-- Same Vendor Catalog Item 2 Bid Item mapping
		  from BidHeaders
		  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
				   and Bids.Active = 1
				   and Bids.VendorId != 7691
          join BidItems on BidItems.BidId = Bids.BidId
          join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
		  left outer join BidMappedItems on BidMappedItems.BidHeaderId = BidHeaders.BidHeaderId
										and BidMappedItems.OrigItemId = CrossRefs.ItemId
		 where BidHeaders.BidHeaderId = @pBidHeaderId
--		   and BidHeaders.BidType = 1
		   and BidMappedItems.BidMappedItemId is null
		   and CrossRefs.ItemId != BidItems.ItemId
		 group by BidHeaders.BidHeaderId, CrossRefs.ItemId, BidItems.ItemId

		insert BidMappedItems(BidHeaderId, OrigItemId, NewItemId, ReasonCode)
		select BidHeaderId, ItemId, NewItemId, Reason
		  from #SVCI2BI
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

	  -- Create Temp List of Items to Reproc	  
	Begin Try
	  create table #DetailList (DetailId int not null primary key)
	  insert #DetailList (DetailId)
	  select Detail.DetailId
		from detail
		join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
		left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
		left outer join BidItems on BidItems.BidItemId = Detail.BidItemId
		left outer join Bids on Bids.BidId = BidItems.BidId
	   where PO.POId is null
		 and case isnull(Detail.BidHeaderId,0) when 0 then case when Bids.BidHeaderId is null then Requisitions.BidHeaderId else Bids.BidHeaderId end else Detail.BidHeaderId end = @pBidHeaderId
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch
 
	Begin Try
	  -- Force Reprocess of Items
	  update Detail
		 set Reproc = 1
		from detail with (updlock,rowlock)
		join #DetailList dl on dl.DetailId = Detail.DetailId
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

	Begin Try
		Update Awardings 
		   set EndTimestamp = getdate(),
		       NotificationsCreated = (select count(*) 
			                             from #DetailList dl 
										 join Detail on Detail.DetailId = dl.DetailId 
										 join DetailNotifications on DetailNotifications.DetailId = dl.DetailId 
										                         and DetailNotifications.DateCreated between Awardings.StartTimestamp and getdate())
		  from @CurrentEntry ce
		  join Awardings on Awardings.AwardingId = ce.AwardingId
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

	  drop table #DetailList
	  drop table #BidSummary
	end

	-- Mark Bid Completed -- Added 2/1/2005 dch
	Begin Try
		insert Approvals (Level, StatusId, RequisitionId, ApprovalDate)
		  select 5, 28, Detail.RequisitionId, getdate()
			from BidHeaders
			join BidHeaderDetail on BidHeaderDetail.BidHeaderId = BidHeaders.BidHeaderId
			join Detail on Detail.DetailId = BidHeaderDetail.DetailId
			join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
			left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
			join Approvals on Approvals.RequisitionId = Requisitions.RequisitionId
			              and Approvals.ApprovalId = 
			   (select top 1 ap.ApprovalId
				  from Approvals ap
				 where ap.RequisitionId = Requisitions.RequisitionId
				 order by ap.ApprovalDate desc)
						  and Approvals.StatusId = 29
		   where BidHeaders.BidHeaderId = @pBidHeaderId
			 and BidHeaders.BidType = 2
			 and PO.POId is null
		   group by Detail.RequisitionId
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

	/* Update Bid Header on Req */
	Begin Try
		Update Requisitions
		   set BidHeaderId = BidHeaders.BidHeaderId
		  from Detail with (updlock,rowlock)
		  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
						   and isnull(Requisitions.BidHeaderId,0) = 0
		  join BidHeaderDetail on BidHeaderDetail.DetailId = Detail.DetailId
		  join BidHeaders on BidHeaders.BidHeaderId = BidHeaderDetail.BidHeaderId
						 and BidHeaders.BidHeaderId = @pBidHeaderId
						 and BidHeaders.BidType = 2
		 where isnull(Requisitions.BidHeaderId,0) = 0
		-- Added Above line 7/17/2006 dch
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

	/* Update Bid Header on Detail */
	Begin Try
		Update Detail
		   set BidHeaderId = BidHeaders.BidHeaderId
		  from Detail with (updlock,rowlock)
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
	End Try
	Begin Catch
		Goto ErrorHandler;
	End Catch

end

/* Reinstate Update Trigger Actions */
Update BidHeaders
   set Active = 1,
	   ScheduledReaward = null,
	   MarkAsOriginal = 0
  from BidHeaders with (updlock,rowlock)
 where BidHeaderId = @pBidHeaderId

--commit transaction AwardBidHeader

Return 0;

/*************************************************/
ErrorHandler:
/*************************************************/
	DECLARE @ErrorMessage NVARCHAR(4000);  
	DECLARE @ErrorSeverity INT;  
	DECLARE @ErrorState INT;
	DECLARE @lAdditionalInfo nvarchar(4000) = N'BidHeader=' + Cast(@pBidHeaderId as nvarchar(10));

	SELECT   
		@ErrorMessage = ERROR_MESSAGE(),  
		@ErrorSeverity = ERROR_SEVERITY(),  
		@ErrorState = ERROR_STATE();
  
--	EXEC [Utility].[Log_ProcedureCall] @objectID = @@PROCID, @AdditionalInfo=@lAdditionalInfo
   	Print Error_Message();
	RAISERROR (@ErrorMessage, -- Message text.  
				@ErrorSeverity, -- Severity.  
				@ErrorState -- State.  
				);  				
 --   rollback transaction AwardBidHeader

	RETURN 1
```
