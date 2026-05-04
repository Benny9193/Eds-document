# Procedure: `dbo.sp_CreateQuoteRequest`

_Generated on 2026-05-04T13:07:57.423Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CreateQuoteRequest` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2004-05-07 17:37:37 |
| Modified | 2022-12-08 10:21:10 |
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
| `Budgets` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `dbo.BidHeaders` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_CreateQuoteRequest] @pBidHeaderId int as

declare @NewBidHeaderId int, @NewBidHeaderKey int

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
    select @NewBidHeaderId, Detail.ItemId, sum(Detail.Quantity), 1, count(Detail.ItemId), @NewBidHeaderKey
      from BidHeaderDetail with (nolock)
      join BidRequestItems on BidRequestItems.BidRequestItemId = BidHeaderDetail.BidRequestItemId
                          and BidRequestItems.Active = 1    -- added 10/26/2010 kjm
      join Detail on Detail.DetailId = BidHeaderDetail.DetailId
      join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
      join Budgets on Budgets.BudgetId = Requisitions.BudgetId
      left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
     where BidHeaderDetail.BidHeaderId = @pBidHeaderId
       and PO.POId is null
       and (select top 1 BidResults.BidResultsId from BidResults join BidImports on BidImports.BidImportId = BidResults.BidImportId and BidImports.Active = 1 where BidResults.BidRequestItemId = BidRequestItems.BidRequestItemId and BidResults.Active = 1 and BidResults.UnitPrice > 0 and BidResults.ItemBidType in ('S','C')) is null
     group by Detail.ItemId

/*      from Requisitions with (nolock)
      join Detail on Detail.RequisitionId = Requisitions.RequisitionId
                 and (   case isnull(Detail.VendorId,0) when 0 then 7691 else Detail.VendorId end = 7691
                      or Detail.ItemMustBeBid = 1)
      left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
     where case isnull(Detail.BidHeaderId,0) when 0 then case isnull(Requisitions.BidHeaderId,0) when 0 then @pBidHeaderId else Requisitions.BidHeaderId end else Detail.BidHeaderId end = @pBidHeaderId
       and PO.POId is null
     group by Detail.ItemId
*/
  insert BidHeaderDetail (BidHeaderId, DetailId, BidRequestItemId, Quantity, BidHeaderKey, RequisitionId)
    select @NewBidHeaderId, Detail.DetailId, NewBRI.BidRequestItemId, Detail.Quantity, @NewBidHeaderKey, Detail.RequisitionId
      from BidHeaderDetail with (nolock)
      join Detail on Detail.DetailId = BidHeaderDetail.DetailId
      join BidRequestItems on BidRequestItems.ItemId = Detail.ItemId
                          and BidRequestItems.BidHeaderId = BidHeaderDetail.BidHeaderId
                          and BidRequestItems.Active = 1    -- added 10/26/2010 kjm  
      join BidRequestItems NewBRI on NewBRI.ItemId = Detail.ItemId
                                 and NewBRI.BidHeaderId = @NewBidHeaderId
      join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
      join Budgets on Budgets.BudgetId = Requisitions.BudgetId
      left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
     where BidHeaderDetail.BidHeaderId = @pBidHeaderId
       and PO.POId is null
       and (select top 1 BidResults.BidResultsId from BidResults join BidImports on BidImports.BidImportId = BidResults.BidImportId and BidImports.Active = 1 where BidResults.BidRequestItemId = BidRequestItems.BidRequestItemId and BidResults.Active = 1 and BidResults.UnitPrice > 0 and BidResults.ItemBidType in ('S','C')) is null
/*
      from Requisitions with (nolock)
      join Detail on Detail.RequisitionId = Requisitions.RequisitionId
                 and (   case isnull(Detail.VendorId,0) when 0 then 7691 else Detail.VendorId end = 7691
                      or Detail.ItemMustBeBid = 1)
      join BidRequestItems on BidRequestItems.BidHeaderId = @NewBidHeaderId
                          and BidRequestItems.ItemId = Detail.ItemId
      left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
     where case isnull(Detail.BidHeaderId,0) when 0 then case isnull(Requisitions.BidHeaderId,0) when 0 then @pBidHeaderId else Requisitions.BidHeaderId end else Detail.BidHeaderId end = @pBidHeaderId
       and PO.POId is null
*/
end
```
