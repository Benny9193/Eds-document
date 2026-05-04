# Procedure: `dbo.sp_CreateQuoteRequestPrebid`

_Generated on 2026-05-04T13:04:24.109Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CreateQuoteRequestPrebid` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2010-10-26 16:14:34 |
| Modified | 2022-12-08 10:21:58 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaderDetail` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `dbo.BidHeaders` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure [dbo].[sp_CreateQuoteRequestPrebid] @pBidHeaderId int as

declare @NewBidHeaderId int,
		@NewBidHeaderKey int

INSERT INTO dbo.BidHeaders([Active], [CategoryId], [PricePlanId], [DistrictId], [BidDate], [BidAwardDate], [BidMessage], [BidType], [PriceVarianceLevel], [MinimumPOAmount], [Section], [BudgetYearOption], [DateCreated], [EffectiveFrom], [EffectiveUntil], [Description], ParentBidHeaderId)
SELECT [Active], [CategoryId], [PricePlanId], [DistrictId], [BidDate], [BidAwardDate], [BidMessage], [BidType], [PriceVarianceLevel], [MinimumPOAmount], [Section], [BudgetYearOption], [DateCreated], [EffectiveFrom], [EffectiveUntil], 'Quote for No Bid Items from Bid ' + isnull(convert(varchar(16),@pBidHeaderId),''), @pBidHeaderId
  FROM [dbo].[BidHeaders] with (nolock)
 where BidHeaderId = @pBidHeaderId
select @NewBidHeaderKey = Scope_Identity() --DCH 11/24/2015 @@identity

select @NewBidHeaderId = BidHeaderId
  from BidHeaders
 where BidHeaderKey = @NewBidHeaderKey

if @@rowcount > 0
begin

  insert BidRequestItems (BidHeaderId, ItemId, BidRequest, Active, RequisitionCount, BidHeaderKey)
    select @NewBidHeaderId, OldBRI.ItemId, OldBRI.BidRequest, 1, OldBRI.RequisitionCount, @NewBidHeaderKey
      from BidRequestItems OldBRI  with (nolock)
     where OldBRI.BidHeaderId = @pBidHeaderId and OldBRI.Active = 1
       and (select top 1 BidResults.BidResultsId from BidResults join BidImports on BidImports.BidImportId = BidResults.BidImportId and BidImports.Active = 1 where BidResults.BidRequestItemId = OldBRI.BidRequestItemId and BidResults.Active = 1 and BidResults.UnitPrice > 0 and BidResults.ItemBidType in ('S','C')) is null

  insert BidHeaderDetail (BidHeaderId, DetailId, BidRequestItemId, Quantity, BidHeaderKey, RequisitionId)
    select @NewBidHeaderId, BidHeaderDetail.DetailId, NewBRI.BidRequestItemId, BidHeaderDetail.Quantity, @NewBidHeaderKey, BidHeaderDetail.RequisitionId
      from BidHeaderDetail with (nolock)
	  join BidRequestItems OldBRI on OldBRI.BidRequestItemId=BidHeaderDetail.BidRequestItemId
	                             and OldBRI.Active = 1
      join BidRequestItems NewBRI on NewBRI.ItemId = OldBRI.ItemId  -- extra detail not needed for prebid (for duplicate ItemIds)
                                 and NewBRI.BidHeaderId = @NewBidHeaderId
      where BidHeaderDetail.BidHeaderId = @pBidHeaderId

  /* replaced code 12/7/2022
  insert BidRequestItems (BidHeaderId, ItemId, BidRequest, Active, RequisitionCount)
    select @NewBidHeaderId, Detail.ItemId, sum(Detail.Quantity), 1, count(Detail.ItemId)
      from BidHeaderDetail with (nolock)
      join BidRequestItems on BidRequestItems.BidRequestItemId = BidHeaderDetail.BidRequestItemId
                          and BidRequestItems.Active = 1    -- added 10/26/2010 kjm
      join Detail on Detail.DetailId = BidHeaderDetail.DetailId
      join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
      join Budgets on Budgets.BudgetId = Requisitions.BudgetId
      --left outer join PO on PO.RequisitionId = Requisitions.RequisitionId  -- removed for Prebid Quote - kjm
     where BidHeaderDetail.BidHeaderId = @pBidHeaderId
       --and PO.POId is null    -- removed for Prebid Quote - kjm
       and (select top 1 BidResults.BidResultsId from BidResults join BidImports on BidImports.BidImportId = BidResults.BidImportId and BidImports.Active = 1 where BidResults.BidRequestItemId = BidRequestItems.BidRequestItemId and BidResults.Active = 1 and BidResults.UnitPrice > 0 and BidResults.ItemBidType in ('S','C')) is null
     group by Detail.ItemId

  insert BidHeaderDetail (BidHeaderId, DetailId, BidRequestItemId, Quantity)
    select @NewBidHeaderId, Detail.DetailId, NewBRI.BidRequestItemId, Detail.Quantity
      from BidHeaderDetail with (nolock)
      join Detail on Detail.DetailId = BidHeaderDetail.DetailId
      join BidRequestItems on BidRequestItems.ItemId = Detail.ItemId
                          and BidRequestItems.BidHeaderId = BidHeaderDetail.BidHeaderId
                          and BidRequestItems.Active = 1    -- added 10/26/2010 kjm  
      join BidRequestItems NewBRI on NewBRI.ItemId = Detail.ItemId
                                 and NewBRI.BidHeaderId = @NewBidHeaderId
      join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
      join Budgets on Budgets.BudgetId = Requisitions.BudgetId
      --left outer join PO on PO.RequisitionId = Requisitions.RequisitionId  -- 12/6/2022 removed for Prebid Quote - kjm
     where BidHeaderDetail.BidHeaderId = @pBidHeaderId
       --and PO.POId is null  -- 12/6/2022 removed for Prebid Quote - kjm
       and (select top 1 BidResults.BidResultsId from BidResults join BidImports on BidImports.BidImportId = BidResults.BidImportId and BidImports.Active = 1 where BidResults.BidRequestItemId = BidRequestItems.BidRequestItemId and BidResults.Active = 1 and BidResults.UnitPrice > 0 and BidResults.ItemBidType in ('S','C')) is null
  */

end
```
