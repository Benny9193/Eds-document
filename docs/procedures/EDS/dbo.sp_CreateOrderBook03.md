# Procedure: `dbo.sp_CreateOrderBook03`

_Generated on 2026-05-04T13:43:18.783Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CreateOrderBook03` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-08-24 14:30:09 |
| Modified | 2015-11-24 23:37:38 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidHeaderId` | IN | int |  |
| 2 | `@pAwardId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `PricePlans` | USER_TABLE |  |
| `dbo.BidItems` | USER_TABLE |  |
| `dbo.Bids` | USER_TABLE |  |
| `dbo.Budgets` | USER_TABLE |  |
| `dbo.Detail` | USER_TABLE |  |
| `dbo.Headings` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.OrderBookDetail` | USER_TABLE |  |
| `dbo.OrderBooks` | USER_TABLE |  |
| `dbo.Requisitions` | USER_TABLE |  |
| `dbo.sp_CreateOrderBook` | SQL_STORED_PROCEDURE |  |
| `dbo.sp_RebuildOBPricesSingle` | unresolved |  |
| `dbo.uf_PackCodeCatalog` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_CreateOrderBook03] @pBidHeaderId int, @pAwardId int as
declare @OrderBookId int

set NOCOUNT ON

exec dbo.sp_CreateOrderBook @pBidHeaderId, @pAwardId

set NOCOUNT OFF
return

Update BidItems
set ItemBidType = case BidResults.ItemBidType when 'S' then 'As Specified' when 'C' then 'Compliant' when 'N' then 'Non-Compliant' end
  from BidResults
  join BidImports on BidImports.BidImportId = BidResults.BidImportId
  join Bids on Bids.BidHeaderId = BidImports.BidHeaderId
           and Bids.VendorId = BidImports.VendorId
  join BidItems on BidItems.BidId = Bids.BidId
               and BidItems.ItemId = BidResults.ItemId
 where BidItems.ItemBidType is null
   and Bids.BidHeaderId = @pBidHeaderId

Update BidItems
   set CrossRefId = CrossRefs.CrossRefId
  from BidItems
  join Bids on Bids.BidId = BidItems.BidId
  join Catalog on Catalog.CatalogId = Bids.CatalogId
  join CrossRefs on CrossRefs.PackedCode = dbo.uf_PackCodeCatalog(BidItems.VendorItemCode, Bids.CatalogId)
                and isnull(CrossRefs.ManufacturorPartNumber,'') = case isnull(Catalog.ImportFormat,0) when 1 then isnull(CrossRefs.ManufacturorPartNumber,'') else BidItems.VendorItemCode end
                and CrossRefs.CatalogId = Bids.CatalogId
                and CrossRefs.Active = 1
 where isnull(BidItems.CrossRefId,0) = 0
   and Bids.BidHeaderId = @pBidHeaderId

insert dbo.OrderBooks (PricePlanDescription, Category, CategoryId, PricePlanId, Type, AwardId, BidHeaderId)
  select isnull(PricePlans.Code,'') + ' - ' + isnull(PricePlans.Description,''), isnull(Category.Name,''), Category.CategoryId, PricePlans.PricePlanId, 'O', @pAwardId, @pBidHeaderId
    from BidHeaders
    join Category on Category.CategoryId = BidHeaders.CategoryId
    join PricePlans on PricePlans.PricePlanId = BidHeaders.PricePlanId
   where BidHeaders.BidHeaderId = @pBidHeaderId

select @OrderBookId = Scope_Identity() --DCH 11/24/2015 @@identity

insert dbo.OrderBookDetail (OrderBookId, ItemId, Active, Weight, BidItemId)
  select @OrderBookId, Items.ItemId, 1, (count(Detail.RequisitionId) * 100000) + sum(Detail.Quantity), BidItems.BidItemId
    from dbo.Items
    left outer join dbo.Headings on dbo.Headings.HeadingId = dbo.Items.HeadingId
    join dbo.Detail on dbo.Detail.ItemId = dbo.Items.ItemId
    join dbo.Requisitions on dbo.Requisitions.RequisitionId = dbo.Detail.RequisitionId
    join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
                    and Budgets.StartDate <= convert(datetime,'11/02/2003')
                    and Budgets.EndDate >= convert(datetime,'11/02/2003')
    join dbo.Bids on Bids.BidHeaderId = @pBidHeaderId
                 and Bids.CategoryId = Items.CategoryId
                 and Bids.Active = 1
    join dbo.BidItems on BidItems.BidId = Bids.BidId
                     and BidItems.Itemid = Items.ItemId
   where dbo.Items.Active = 1
   group by Items.ItemId, BidItems.BidItemId
   order by ((count(dbo.Detail.RequisitionId) * 100000) + sum(dbo.Detail.Quantity)) desc

insert dbo.OrderBookDetail (OrderBookId, ItemId, Active, Weight, BidItemId)
  select @OrderBookId, Items.ItemId, 1, (select max(Weight) MaxWeight
        from dbo.OrderBookDetail 
        join dbo.Items I1 on I1.ItemId = OrderBookDetail.ItemId 
       where OrderBookId = @OrderBookId 
         and I1.HeadingId = Headings.HeadingId), null
    from dbo.OrderBooks OrderBooks
    join dbo.Items on Items.CategoryId = OrderBooks.CategoryId
                  and Items.Active = 1
    join dbo.Headings on Headings.HeadingId = Items.HeadingId
                     and Headings.ExpandAll = 1
    left outer join dbo.OrderBookDetail OrderBookDetail on OrderBookDetail.OrderBookId = @OrderBookId
                                                       and OrderBookDetail.ItemId = Items.ItemId
   where OrderBooks.OrderBookId = @OrderBookId
     and OrderBookDetail.OrderBookDetailId is null
  group by Items.ItemId, Headings.HeadingId, OrderBookDetail.ItemId

exec dbo.sp_RebuildOBPricesSingle @OrderBookId

set NOCOUNT off

select @OrderBookId
```
