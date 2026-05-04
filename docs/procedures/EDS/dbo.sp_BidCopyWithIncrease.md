# Procedure: `dbo.sp_BidCopyWithIncrease`

_Generated on 2026-05-04T13:43:18.717Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_BidCopyWithIncrease` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2024-11-12 16:08:11 |
| Modified | 2025-11-12 14:11:43 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSourceBidId` | IN | int |  |
| 2 | `@pIncrease` | IN | decimal(11,5) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaderDetail` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidImportCatalogList` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--exec sp_BidCopyWithIncrease 13002, 1.8

CREATE     procedure [dbo].[sp_BidCopyWithIncrease] @pSourceBidId int, @pIncrease decimal(11,5) as
set transaction isolation level read uncommitted
declare @BidHeaderId int, @BidImportId int, @NewBidImportId int, @LoopCounter int, @SourceBidHeaderId int, @BidHeaderKey int

select @SourceBidHeaderId = @pSourceBidId
select @LoopCounter = 0
while @LoopCounter < 1
begin
  select @LoopCounter = @LoopCounter + 1

insert BidHeaders (Active, CategoryId, PricePlanId, BidDate, BidAwardDate, BidMessage, BidType, PriceVarianceLevel, MinimumPOAmount, Section, BudgetYearOption, EffectiveFrom, EffectiveUntil, Description, AllowTotalAward, TotalAwardMinimumDiscount, CalendarId, StateId, HostDistrictId, AwardMsg, AlertLink, AlertMsg, BidManagerId, CompliantAlert, HostAwardDate, AllowAdditionalManufacturers, AllowAdditionalProductLines, UseOptions, ImageURLRuleset, ReadyToUseDate)
  select Active, CategoryId, PricePlanId, BidDate, BidAwardDate, BidMessage, BidType, PriceVarianceLevel, MinimumPOAmount, Section, BudgetYearOption, EffectiveFrom, EffectiveUntil, Description, AllowTotalAward, TotalAwardMinimumDiscount, CalendarId, StateId, HostDistrictId, AwardMsg, AlertLink, AlertMsg, BidManagerId, CompliantAlert, HostAwardDate, AllowAdditionalManufacturers, AllowAdditionalProductLines, UseOptions, ImageURLRuleset, ReadyToUseDate
    from BidHeaders
   where BidHeaderId = @SourceBidHeaderId

select @BidHeaderKey = Scope_Identity() --DCH 11/24/2015 @@identity

select @BidHeaderId = BidHeaderId
  from BidHeaders
 where BidHeaderKey = @BidHeaderKey
 
/* replaced 4/2/2018 kjm - new code part A
insert BidRequestItems (BidHeaderKey, BidHeaderId, ItemId, BidRequest, Active, RequisitionCount, Status, Comments)
  select @BidheaderKey, @BidHeaderId, ItemId, BidRequest, Active, RequisitionCount, Status, Comments
    from BidRequestItems
   where BidHeaderId = @SourceBidHeaderId

insert BidHeaderDetail (BidHeaderKey, BidHeaderId, DetailId, BidRequestItemId)
  select @BidHeaderKey, @BidHeaderId, Detail.DetailId, brn.BidRequestItemId
    from BidHeaderDetail
    join Detail on Detail.DetailId = BidHeaderDetail.DetailId
    join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
    join Budgets on Budgets.BudgetId = Requisitions.BudgetId
    join BidRequestItems bro on bro.BidRequestItemId = BidHeaderDetail.BidRequestItemId
    join BidRequestItems brn on brn.BidHeaderId = @BidHeaderId
                            and brn.ItemId = Detail.ItemId      -- ItemId is not unique - new code below
   where BidHeaderDetail.BidHeaderId = @SourceBidHeaderId
*/

-- ============================ Begin new code Part A ==================================

CREATE TABLE #TempBRI
(
OldBidRequestItemId bigint,
NewBidRequestItemId bigint
)


declare @BidRequestItemId int, @NewBidRequestItemId int
declare BidReqCur cursor fast_forward read_only for
  select BidRequestItemId
    from BidRequestItems
   where BidHeaderId = @SourceBidHeaderId

open BidReqCur

fetch next from BidReqCur into @BidRequestItemId

while @@fetch_Status = 0
begin

  -- copy each old bidrequestitem to a new bidrequestitem
  insert BidRequestItems (BidHeaderKey, BidHeaderId, ItemId, BidRequest, Active, RequisitionCount, Status, Comments)
  select @BidheaderKey, @BidHeaderId, ItemId, BidRequest, Active, RequisitionCount, Status, Comments
    from BidRequestItems
   where BidRequestItemId = @BidRequestItemId

  select @NewBidRequestItemId = Scope_Identity() 

  -- build temp table of BRI crosswalk between old id and new id (for use copying bidresults below)
  insert #TempBRI (OldBidRequestItemId, NewBidRequestItemId) Values (@BidRequestItemId, @NewBidRequestItemId)

  -- copy all of the related BidHeaderDetail for the old bidrequestitem to the new bidrequestitem
  insert BidHeaderDetail (BidHeaderKey, BidHeaderId, DetailId, Quantity, BidRequestItemId, RequisitionId)
  select @BidHeaderKey, @BidHeaderId, BidHeaderDetail.DetailId, BidHeaderDetail.Quantity, @NewBidRequestItemId, BidHeaderDetail.RequisitionId -- added requisitionId 12/8/2022 kjm
    from BidHeaderDetail
   where BidHeaderDetail.BidRequestItemId = @BidRequestItemId

  fetch next from BidReqCur into @BidRequestItemId

end

close BidReqCur
deallocate BidReqCur
-- ============================ End new code Part A ==================================

declare BICur cursor fast_forward read_only for
  select BidImportId
    from BidImports
   where BidHeaderId = @SourceBidHeaderId

open BICur

fetch next from BICur into @BidImportId

while @@fetch_Status = 0
begin
  select @NewBidImportId = max(BidImportId) + 1 from BidImports

  insert BidImports (BidImportId, BidheaderKey, BidHeaderId, Active, VendorId, BidItemDiscountRate, CatalogId, CatalogDiscountRate, VendorBidNumber, ItemsBid, AmountBid, Status, Comments)
    select @NewBidImportId, @BidHeaderKey, @BidHeaderId, Active, VendorId, BidItemDiscountRate, CatalogId, CatalogDiscountRate, VendorBidNumber, ItemsBid, AmountBid, Status, Comments
      from BidImports
     where BidImportId = @BidImportId

  insert BidImportCatalogList(BidImportId, CatalogId, DiscountRate, DateModified)
    select @NewBidImportId, CatalogId, DiscountRate, DateModified
	  from BidImportCatalogList
	 where BidImportCatalogList.BidImportId = @BidImportId

/* replaced 4/2/2018 kjm - new code part B
  insert BidResults (BidImportId, BidHeaderKey, BidHeaderId, BidRequestItemId, CategoryId, DistrictId, ItemId, ItemCode, Units, Alternate, Quantity, ItemBidType, UnitPrice, Cost, VendorItemCode, QuantityBid, ItemsPerUnit, UnitId, Status, Comments, Active, PageNo, PackedVendorItemCode, RTK_MSDSId, RTK_MSDSNotNeeded, ContractNumber, OriginalAwardedItem, VOMId, AdditionalShipping, ManufacturerBid, ManufPartNoBid, LinerGaugeMicrons, LinerGaugeMil, LinerCaseWeight, LinerDimWidth, LinerDimDepth, LinerDimLength)
    select @NewBidImportId, @BidHeaderKey, @BidHeaderId, BidRequestItems.BidRequestItemId, BidResults.CategoryId, BidResults.DistrictId, BidResults.ItemId, BidResults.ItemCode, BidResults.Units, BidResults.Alternate, BidResults.Quantity, BidResults.ItemBidType, BidResults.UnitPrice, BidResults.Cost, BidResults.VendorItemCode, BidResults.QuantityBid, BidResults.ItemsPerUnit, BidResults.UnitId, BidResults.Status, BidResults.Comments, BidResults.Active, PageNo, PackedVendorItemCode, RTK_MSDSId, RTK_MSDSNotNeeded, ContractNumber, OriginalAwardedItem, VOMId, AdditionalShipping, ManufacturerBid, ManufPartNoBid, LinerGaugeMicrons, LinerGaugeMil, LinerCaseWeight, LinerDimWidth, LinerDimDepth, LinerDimLength
      from BidResults
      join BidImports on BidImports.BidImportId = BidResults.BidImportId
      join BidRequestItems on BidRequestItems.BidHeaderId = @BidHeaderId
                          and BidRequestItems.ItemId = BidResults.ItemId   -- ItemId is not unique - new code below
     where BidResults.BidImportId = @BidImportId
*/
-- ============================ Begin new code Part B ==================================
  insert BidResults (BidImportId, BidHeaderKey, BidHeaderId, BidRequestItemId, CategoryId, DistrictId, ItemId, ItemCode, Units, Alternate, Quantity, ItemBidType, UnitPrice, Cost, VendorItemCode, QuantityBid, ItemsPerUnit, UnitId, Status, Comments, Active, PageNo, PackedVendorItemCode, RTK_MSDSId, RTK_MSDSNotNeeded, ContractNumber, OriginalAwardedItem, VOMId, AdditionalShipping, ManufacturerBid, ManufPartNoBid, LinerGaugeMicrons, LinerGaugeMil, LinerCaseWeight, LinerDimWidth, LinerDimDepth, LinerDimLength)
    select @NewBidImportId, @BidHeaderKey, @BidHeaderId, #TempBRI.NewBidRequestItemId, BidResults.CategoryId, BidResults.DistrictId, BidResults.ItemId, BidResults.ItemCode, BidResults.Units, BidResults.Alternate, 
	       BidResults.Quantity, BidResults.ItemBidType, 
		   BidResults.UnitPrice + round(BidResults.UnitPrice * (@pIncrease / 100),2), 
		   (BidResults.UnitPrice + round(BidResults.UnitPrice * (@pIncrease / 100),2)) * BidResults.Quantity, 
		   BidResults.VendorItemCode, BidResults.QuantityBid, BidResults.ItemsPerUnit, BidResults.UnitId, BidResults.Status, BidResults.Comments, BidResults.Active, PageNo, PackedVendorItemCode, RTK_MSDSId, RTK_MSDSNotNeeded, 
		   ContractNumber, OriginalAwardedItem, VOMId, AdditionalShipping, ManufacturerBid, ManufPartNoBid, LinerGaugeMicrons, LinerGaugeMil, LinerCaseWeight, LinerDimWidth, LinerDimDepth, LinerDimLength
      from BidResults
      join BidImports on BidImports.BidImportId = BidResults.BidImportId
      join #TempBRI on #tempBRI.OldBidRequestItemId = BidResults.BidRequestItemId
     where BidResults.BidImportId = @BidImportId
-- ============================ End new code Part B ==================================

  Update BidImports
     set AmountBid = (Select sum(BidResults.Cost) from BidResults where BidResults.BidImportId = @NewBidImportId and BidResults.ItemBidType in ('C','S'))
	where BidImports.BidImportId = @NewBidImportId

  fetch next from BICur into @BidImportId
end

close BICur
deallocate BICur

end

print 'New BidHeaderId = ' + convert(varchar(16),@BidHeaderId)

select Top 100 * from BidHeaders order by BidHeaderId desc
```
