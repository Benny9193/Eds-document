# Procedure: `dbo.sp_ImportVendorsBid`

_Generated on 2026-05-04T13:07:57.482Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_ImportVendorsBid` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2011-08-15 21:46:11 |
| Modified | 2022-08-12 11:04:50 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pPassPhrase` | IN | varchar(255) |  |
| 2 | `@pVendorBidId` | IN | varchar(50) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidMSRPResultPrices` | USER_TABLE |  |
| `BidMSRPResults` | USER_TABLE |  |
| `BidMSRPResultsProductLines` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `BidRequestManufacturer` | USER_TABLE |  |
| `BidRequestOptions` | USER_TABLE |  |
| `BidRequestProductLines` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `ManufacturerProductLines` | USER_TABLE |  |
| `Manufacturers` | USER_TABLE |  |
| `Units` | USER_TABLE |  |
| `vw_BidAnswers` | VIEW |  |
| `dbo.uf_vendorbidanswersview` | unresolved | `VendorBids` |
| `dbo.uf_vendorbiditemsview` | unresolved | `VendorBids` |
| `dbo.uf_VendorBidMSRPResultsView` | unresolved | `VendorBids` |
| `dbo.uf_vendorbidsview` | unresolved | `VendorBids` |
| `dbo.VendorBids` | unresolved | `VendorBids` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_ImportVendorsBid] @pPassPhrase varchar(255), @pVendorBidId varchar(50)
as
declare @VendorBidId int,
		@BidImportId int,
		@ReturnCode varchar(50),
		@CategoryType int,
		@DecryptedPW varchar(1024)
		
select @VendorBidId = CAST(@pVendorBidId as int)
select @DecryptedPW = null
select @CategoryType = isnull(Category.Type,1)
  from Category with (nolock)
  join BidHeaders on BidHeaders.CategoryId = Category.CategoryId
  join VendorBids.dbo.VendorBids VendorBids on VendorBids.calendarid = BidHeaders.BidHeaderId
                                           and VendorBids.vendorbidid = @VendorBidId
                                           
select @DecryptedPW = isnull(cast(DECRYPTBYPASSPHRASE(@pPassPhrase,VendorBids.bidpwd,1,CAST(VendorBids.VendorBidId as varbinary(1024))) as varchar(255)),'')
  from VendorBids.dbo.VendorBids VendorBids with (nolock)
 where VendorBids.VendorBidId = @VendorBidId

if isnull(@pPassPhrase,'') = ''
begin
  select @ReturnCode = 'A Valid Entryption Code MUST be entered.'
end
else
if @DecryptedPW is null
begin
  select @ReturnCode = 'Invalid Vendor Bid Id entered.'
end
else
if isnull(@DecryptedPW,'') = isnull(@pPassPhrase,'')
begin
	select @BidImportId = MAX(BidImportId)+1 
	  from BidImports with (nolock)

    if @CategoryType = 3 -- T&M
    begin
		-- Create Import record
		insert BidImports (BidImportId, Active, AmountBid, BidHeaderKey, BidHeaderId, Comments, ItemsBid, VendorId, VendorBidNumber, UseVendorContactInfo, VendorBidId)
		  select @BidImportId, 1, vb.TotalCost, BidHeaders.BidHeaderKey, BidHeaders.BidHeaderId, vb.vendorbidcomments, vb.ItemsBid, vb.vendorid, vb.VendorBidNumber, 1, vb.vendorbidid
			from VendorBids.dbo.uf_vendorbidsview(@pPassPhrase,@VendorBidId) AS vb 
			join BidHeaders on BidHeaders.BidHeaderId = vb.CalendarId
		
		insert vw_BidAnswers (BidImportId, BidQuestionId, CountyId, BidTradeId, VendorBidTMAnswerId, SessionId, BidAnswer, VendorBidTMAnswerJournalId)
          select @BidImportId, vbav.BidQuestionId, vbav.CountyId, vbav.BidTradeId, vbav.VendorBidTMAnswerId, vbav.SessionId, vbav.BidAnswer, vbav.vendorBidTMAnswerJournalId
		    from VendorBids.dbo.uf_vendorbidanswersview(@pPassPhrase,@VendorBidId) vbav
		
		-- Temp Fix for trigger calc problem on Total records  
	/*	update ba
		   set BidAnswer = ba.BidAnswer
		  from vw_BidAnswers ba
		 where ba.BidImportId = @BidImportId
		   and ba.AnswerTypeId in (4,5,6)
	*/	
		-- added kjm 2/28/12    
		update ba
		   set BidAnswer = ba.BidAnswer
		  from vw_BidAnswers ba
		 where ba.BidImportId = @BidImportId
		   and ba.AnswerTypeId in (1,2,3)
		    
/*
		insert BidAnswers (BidImportId, BidQuestionId, CountyId, BidTradeId, VendorBidTMAnswerId)
		  select @BidImportId, vbav.BidQuestionId, vbav.CountyId, vbav.BidTradeId, vbav.VendorBidTMAnswerId
		    from VendorBids.dbo.uf_vendorbidanswersview(@pPassPhrase,@VendorBidId) vbav
		    
		insert BidAnswersJournal (BidAnswerId, Sessionid, DateModified, BidAnswer, BidAnswerExtended, VendorBidTMAnswerJournalId)
		  select BidAnswers.BidAnswerId, vbav.SessionId, vbav.DateModified, vbav.BidAnswer, vbav.BidAnswerExtended, vbav.VendorBidTMAnswerJournalId
		    from VendorBids.dbo.uf_vendorbidanswersview(@pPassPhrase,@VendorBidId) vbav
		    join BidAnswers on BidAnswers.VendorBidTMAnswerId = vbav.VendorBidTMAnswerId
*/
    end
    else
    if @CategoryType = 5 -- MSRP
    begin
		-- Create Import record
		insert BidImports (BidImportId, Active, AmountBid, BidHeaderKey, BidHeaderId, BidItemDiscountRate, CatalogDiscountRate, Comments, ItemsBid, VendorId, VendorBidNumber, UseVendorContactInfo, VendorBidId, CatalogDiscountComments)
		  select @BidImportId, 1, vb.TotalCost, BidHeaders.BidHeaderKey, BidHeaders.BidHeaderId, vb.biditemdiscountrate, vb.catalogdiscountrate, vb.vendorbidcomments, vb.ItemsBid, vb.vendorid, vb.VendorBidNumber, 1, vb.vendorbidid, vb.CatalogDiscountComments
			from VendorBids.dbo.uf_vendorbidsview(@pPassPhrase,@VendorBidId) AS vb 
			join BidHeaders on BidHeaders.BidHeaderId = vb.CalendarId

  		insert BidMSRPResults (Active, BidHeaderKey, BidHeaderId, BidImportId, ManufacturerId, Modified, WriteInManufacturer, BidRequestManufacturerId, PriceListTypeId, WriteInFlag, TotalAwardDiscount, TotalAwardString) -- kjm
--  		insert BidMSRPResults (Active, BidHeaderId, BidImportId, ManufacturerId, ManufacturerProductLineId, DiscountRate, Weight, Modified, DiscountRateString, WriteInManufacturer, BidRequestManufacturerId, BidRequestProductLineId, PriceListTypeId, WriteInProductLineName, BidRequestOptionId, MSRPOptionId, OptionName, WriteInFlag, WriteInProductLineFlag, TotalAwardDiscount, TotalAwardString) -- kjm
		  select 1,
				 BidHeaders.BidHeaderKey, 
				 BidHeaders.BidHeaderId, 
				 @BidImportId, 
				 brm.ManufacturerId, 
--				 brpl.ManufacturerProductLineId, 
--				 bro.Weight, 
				 max(vbmrv.Modified), 
                 case when vbmrv.WriteInManufacturer = 1 then vbmrv.ManufacturerName else '' end, -- kjm 
				 --vbmrv.ManufacturerName,  
				 vbmrv.BidRequestManufacturerId, 
--				 vbmrv.BidRequestProductLineId, 
				 vbmrv.PriceListType, 
--                 case when vbmrv.WriteInProductLine = 1 then vbmrv.ProductLineName else '' end, -- kjm 
				 --vbmrv.ProductLineName, 
--				 vbmrv.BidRequestOptionId, 
--				 bro.OptionId,
--                 case when vbmrv.WriteInProductLine = 1 then vbmrv.OptionName else bro.Name end, -- kjm 
				 vbmrv.WriteInManufacturer,  --added  kjm
--				 vbmrv.WriteInProductLine,  -- added  kjm  (note: added this field to BidMSRPResults),
				 cast(case isnull(vbmrv.TotalAwardDiscount,'') when '' then '0' else vbmrv.TotalAwardDiscount end as decimal(9,5)),
				 isnull(vbmrv.TotalAwardDiscount,'')
			from VendorBids.dbo.uf_VendorBidMSRPResultsView(@pPassPhrase, @VendorBidId) vbmrv 
            join VendorBids.dbo.VendorBids vb on vb.vendorbidid = vbmrv.VendorBidId
            join BidHeaders on BidHeaders.BidHeaderId = vb.calendarid
            left outer join BidRequestManufacturer brm on brm.BidRequestManufacturerId = vbmrv.BidRequestManufacturerId
--            left outer join BidRequestProductLines brpl on brpl.BidRequestProductLineId = vbmrv.BidRequestProductLineId
--            left outer join BidRequestOptions bro on bro.BidRequestOptionId = vbmrv.BidRequestOptionId
           group by BidHeaders.BidHeaderKey, BidHeaders.BidHeaderId, brm.ManufacturerId, vbmrv.ManufacturerName, vbmrv.BidRequestManufacturerId, vbmrv.PriceListType, vbmrv.WriteInManufacturer, vbmrv.TotalAwardDiscount   
--           group by BidHeaders.BidHeaderId, brm.ManufacturerId, brpl.ManufacturerProductLineId, vbmrv.WeightedDiscount, bro.Weight, vbmrv.Modified, cast(vbmrv.WeightedDiscount as varchar(50)), vbmrv.ManufacturerName, vbmrv.BidRequestManufacturerId, vbmrv.BidRequestProductLineId, vbmrv.PriceListType, vbmrv.ProductLineName, vbmrv.BidRequestOptionId, bro.OptionId, case when vbmrv.WriteInProductLine = 1 then vbmrv.OptionName else bro.Name end, vbmrv.WriteInManufacturer, vbmrv.WriteInProductLine, vbmrv.TotalAwardDiscount   -- replaced next line  kjm

          insert BidMSRPResultsProductLines (BidMSRPResultsId, BidRequestProductLineId, Active, Weight, WriteInProductLineName, BidRequestOptionId, MSRPOptionId, OptionName, WriteInProductLineFlag, Modified, WeightedDiscount, ManufacturerProductLineId)
          select br.BidMSRPResultsId,
		         isnull(brpl.BidRequestProductLineId,0),
		         1,
                 bro.Weight, 
                 --case when vbmrv.WriteInProductLine = 1 then vbmrv.ProductLineName else '' end, 
                 case when vbmrv.WriteInManufacturer = 1 or vbmrv.WriteInProductLine = 1 then vbmrv.ProductLineName else '' end, 
                 vbmrv.BidRequestOptionId, 
                 bro.OptionId, 
                 --case when vbmrv.WriteInProductLine = 1 then vbmrv.OptionName else bro.Name end, 
                 case when vbmrv.WriteInManufacturer = 1 or vbmrv.WriteInProductLine = 1 then vbmrv.OptionName else bro.Name end, 
                 --vbmrv.WriteInProductLine,
                 case when vbmrv.WriteInManufacturer = 1 or vbmrv.WriteInProductLine = 1 then 1 else 0 end, 
                 vbmrv.Modified,
                 vbmrv.WeightedDiscount,
                 brpl.ManufacturerProductLineId
			from VendorBids.dbo.uf_VendorBidMSRPResultsView(@pPassPhrase, @VendorBidId) vbmrv 
            join VendorBids.dbo.VendorBids vb on vb.vendorbidid = vbmrv.VendorBidId
            join BidHeaders on BidHeaders.BidHeaderId = vb.calendarid
            join BidMSRPResults br on br.BidImportId = @BidImportId
                                  and br.Active = 1
                                  and br.WriteInManufacturer = case when vbmrv.WriteInManufacturer = 1 then vbmrv.ManufacturerName else '' end
                                  and case when br.WriteInFlag = 1 then br.WriteInManufacturer else cast(br.BidRequestManufacturerId as varchar) end = case when vbmrv.WriteInManufacturer = 1 then vbmrv.ManufacturerName else cast(vbmrv.BidRequestManufacturerId as varchar) end
--                                  and br.BidRequestManufacturerId = case when vbmrv.WriteInManufacturer = 1 then 0 else vbmrv.BidRequestManufacturerId end
            left outer join BidRequestManufacturer brm on brm.BidRequestManufacturerId = vbmrv.BidRequestManufacturerId
            left outer join BidRequestProductLines brpl on brpl.BidRequestProductLineId = vbmrv.BidRequestProductLineId
            left outer join BidRequestOptions bro on bro.BidRequestOptionId = vbmrv.BidRequestOptionId
           group by br.BidMSRPResultsId,
		         isnull(brpl.BidRequestProductLineId,0), 
                 bro.Weight, 
                 --vbmrv.ProductLineName, 
                 case when vbmrv.WriteInManufacturer = 1 or vbmrv.WriteInProductLine = 1 then vbmrv.ProductLineName else '' end, 
                 vbmrv.BidRequestOptionId, 
                 bro.OptionId, 
                 --case when vbmrv.WriteInProductLine = 1 then vbmrv.OptionName else bro.Name end, 
                 case when vbmrv.WriteInManufacturer = 1 or vbmrv.WriteInProductLine = 1 then vbmrv.OptionName else bro.Name end, 
                 --vbmrv.WriteInProductLine,
                 case when vbmrv.WriteInManufacturer = 1 or vbmrv.WriteInProductLine = 1 then 1 else 0 end, 
                 vbmrv.Modified,
                 vbmrv.WeightedDiscount,
                 brpl.ManufacturerProductLineId
			
          insert BidMSRPResultPrices (BidMSRPResultsId, Active, BidRequestPriceRangeId, BidMSRPResultsProductLineId, RangeBase, RangeWeight, RangeValue)
          select br.BidMSRPResultsId, 1, vbmrv.BidRequestPriceRangeId, bmrpl.BidMSRPResultsProductLineId, vbmrv.PriceRangeLow, vbmrv.PriceRangeWeight, vbmrv.PriceRangeDiscount
			from VendorBids.dbo.uf_VendorBidMSRPResultsView(@pPassPhrase, @VendorBidId) vbmrv 
            join VendorBids.dbo.VendorBids vb on vb.vendorbidid = vbmrv.VendorBidId
            join BidHeaders on BidHeaders.BidHeaderId = vb.calendarid
            join BidMSRPResults br on br.BidImportId = @BidImportId
                                  and br.Active = 1
                                  and br.WriteInManufacturer = case when vbmrv.WriteInManufacturer = 1 then vbmrv.ManufacturerName else '' end
                                  and case when br.WriteInFlag = 1 then br.WriteInManufacturer else cast(br.BidRequestManufacturerId as varchar) end = case when vbmrv.WriteInManufacturer = 1 then vbmrv.ManufacturerName else cast(vbmrv.BidRequestManufacturerId as varchar) end
--                                  and br.BidRequestManufacturerId = case when vbmrv.WriteInManufacturer = 1 then 0 else vbmrv.BidRequestManufacturerId end
            join BidMSRPResultsProductLines bmrpl on bmrpl.BidMSRPResultsId = br.BidMSRPResultsId
                                  and bmrpl.OptionName = vbmrv.OptionName
                                  and bmrpl.WriteInProductLineName = case when vbmrv.WriteInManufacturer = 1 or vbmrv.WriteInProductLine = 1 then vbmrv.ProductLineName else '' end
                                  --and bmrpl.WriteInProductLineName = case when vbmrv.WriteInProductLine = 1 then vbmrv.ProductLineName else '' end
                                  and bmrpl.BidRequestProductLineId = case when vbmrv.BidRequestProductLineId = 0 and vbmrv.WriteInManufacturer = 1 or vbmrv.WriteInProductLine = 1 then 0 else vbmrv.BidRequestProductLineId end
--                                  and bmrpl.BidRequestProductLineId = case when vbmrv.WriteInManufacturer = 1 or vbmrv.WriteInProductLine = 1 then 0 else vbmrv.BidRequestProductLineId end
                                  --and bmrpl.BidRequestProductLineId = case when vbmrv.WriteInProductLine = 1 then 0 else vbmrv.BidRequestProductLineId end
            left outer join BidRequestManufacturer brm on brm.BidRequestManufacturerId = vbmrv.BidRequestManufacturerId
            left outer join Manufacturers man on man.ManufacturerId = brm.ManufacturerId
            left outer join BidRequestProductLines brpl on brpl.BidRequestProductLineId = vbmrv.BidRequestProductLineId
            left outer join ManufacturerProductLines manpl on manpl.ManufacturerProductLineId = brpl.ManufacturerProductLineId
            left outer join BidRequestOptions bro on bro.BidRequestOptionId = vbmrv.BidRequestOptionId
    end
    else -- Normal Line Item Bids
    begin
		-- Create Import record
		insert BidImports (BidImportId, Active, AmountBid, BidHeaderKey, BidHeaderId, BidItemDiscountRate, CatalogDiscountRate, Comments, ItemsBid, VendorId, VendorBidNumber, UseVendorContactInfo, VendorBidId, CatalogDiscountComments)
		  select @BidImportId, 1, vb.TotalCost, BidHeaders.BidHeaderKey, BidHeaders.BidHeaderId, vb.biditemdiscountrate, vb.catalogdiscountrate, vb.vendorbidcomments, vb.ItemsBid, vb.vendorid, vb.VendorBidNumber, 1, vb.vendorbidid, vb.CatalogDiscountComments
			from VendorBids.dbo.uf_vendorbidsview(@pPassPhrase,@VendorBidId) AS vb 
			join BidHeaders on BidHeaders.BidHeaderId = vb.CalendarId
		  
		--Add Items  
		insert BidResults (Active, Alternate, BidHeaderKey, BidHeaderId, BidImportId, BidRequestItemId, CategoryId, Cost, DistrictId, ItemBidType, ItemCode, ItemId, ItemsPerUnit, PageNo, Quantity, QuantityBid, UnitId, UnitPrice, Units, VendorItemCode, ManufacturerBid, ManufPartNoBid, LinerGaugeMicrons, LinerGaugeMil, LinerCaseWeight, LinerDimWidth, LinerDimDepth, LinerDimLength,SDS_URL,ImageURL,UPC_ISBN,UniqueItemNumber)
		  select 1,
				 vbi.Alternate,
				 BidHeaders.BidHeaderKey,
				 BidHeaders.BidHeaderId,
				 BidImports.BidImportId,
				 BidRequestItems.BidRequestItemId,
				 BidHeaders.CategoryId,
				 vbi.Cost,
				 Items.DistrictId,
				 vbi.ItemBidType,
				 Items.ItemCode,
				 Items.ItemId,
				 vbi.ItemsPerUnit,
				 vbi.PageNo,
				 BidRequestItems.BidRequest,
				 BidRequestItems.BidRequest,
				 Units.UnitId,
				 vbi.UnitPrice,
				 Units.Code,
				 vbi.VendorItemCode,
				 vbi.Manufacturer,
				 vbi.ManufacturerPartNumber,
				 vbi.LinerGaugeMicrons,
				 vbi.LinerGaugeMil,
				 vbi.LinerCaseWeight,
				 vbi.LinerDimWidth,
				 vbi.LinerDimDepth,
				 vbi.LinerDimLength,
				 vbi.SDS_URL,
				 vbi.ImageURL,
				 vbi.UPC_ISBN,
				 vbi.UniqueItemNumber
			from BidRequestItems with (nolock)
			join Items on Items.ItemId = BidRequestItems.ItemId
			join Units on Units.UnitId = Items.UnitId
			join BidHeaders on BidHeaders.BidHeaderId = BidRequestItems.BidHeaderId
			join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
						   and BidImports.BidImportId = @BidImportId
			join VendorBids.dbo.uf_vendorbiditemsview(@pPassPhrase, @VendorBidId) AS vbi on vbi.BidRequestItemId = BidRequestItems.BidRequestItemId
--			join VendorBids.dbo.uf_vendorbiditemsview(@pPassPhrase, @VendorBidId) AS vbi on coalesce(vbi.BidRequestItemId_Old, vbi.BidRequestItemId) = coalesce(BidRequestItems.BidRequestItemId_OLD, BidRequestItems.BidRequestItemId)
	end
	--Save Pass Phrase in Clear Text
    update VendorBids
       set ctEncryptionCode = @pPassPhrase
      from VendorBids.dbo.vendorbids VendorBids
     where VendorBids.vendorbidid = @VendorBidId
     
    --Set Return Code
	select @ReturnCode = 'OK'
end
else
begin
	select @ReturnCode = 'Invalid Encryption Code.'
end
select @ReturnCode as ReturnCode
```
