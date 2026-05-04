# Procedure: `dbo.sp_OrderBookMaint`

_Generated on 2026-05-04T13:04:00.421Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_OrderBookMaint` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-10-08 21:02:13 |
| Modified | 2015-11-24 23:37:31 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pOrderBookId` | IN | int |  |
| 3 | `@pCategoryId` | IN | int |  |
| 4 | `@pPricePlanId` | IN | int |  |
| 5 | `@pDistrictId` | IN | int |  |
| 6 | `@pAwardId` | IN | int |  |
| 7 | `@pCategoryDescription` | IN | varchar(255) |  |
| 8 | `@pPricePlanDescription` | IN | varchar(255) |  |
| 9 | `@pMarkup` | IN | varchar(255) |  |
| 10 | `@pAction` | IN | tinyint |  |
| 11 | `@pCopyMode` | IN | varchar(255) |  |
| 12 | `@pActive` | IN | int |  |
| 13 | `@pUseParentCatalog` | IN | int |  |
| 14 | `@pKeepZeroPages` | IN | int |  |
| 15 | `@pOrderBookYear` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `OrderBookDetail` | USER_TABLE |  |
| `OrderBooks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `dbo.sp_CopyToBudgetBook` | SQL_STORED_PROCEDURE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_OrderBookMaint] @pSessionId int, @pOrderBookId int, @pCategoryId int, @pPricePlanId int, @pDistrictId int, @pAwardId int, @pCategoryDescription varchar(255), @pPricePlanDescription varchar(255), @pMarkup varchar(255), @pAction tinyint, @pCopyMode varchar(255), @pActive int, @pUseParentCatalog int, @pKeepZeroPages int, @pOrderBookYear int as
declare @ApprovalLevel int,
	@OrderBookId int,
	@OrderBookType char(1),
	@Markup decimal(9,5)

set nocount on
set transaction isolation level serializable
begin transaction

if isnumeric(@pMarkup) = 1
begin
  select @Markup = convert(decimal(9,5),@pMarkup)
end
else
begin
  select @Markup = null
end

select @ApprovalLevel = ApprovalLevel
  from SessionTable
 where SessionId = @pSessionId

if @@rowcount = 0
begin
  select @ApprovalLevel = 0
end

select @OrderBookType = OrderBooks.Type
  from OrderBooks
 where OrderBookId = @pOrderBookId

if @@rowcount = 0
begin
  select @OrderBookType = ''
end

--print 'ApprovalLevel = ' + convert(varchar(10),@ApprovalLevel)

if @ApprovalLevel >= 5
begin
--  print 'Action = ' + convert(varchar(10),@pAction)

  if @pAction = 1 -- Create
  begin
    insert OrderBooks (PricePlanDescription, Category, CategoryId, PricePlanId, Type, DistrictId, Markup, Active, UseParentCatalog, KeepZeroPages)
      select case rtrim(isnull(@pPricePlanDescription,'')) when '' then 'Budget Book' + case isnull(@pDistrictId,0) when 0 then '' else ' for ' + rtrim(isnull(District.Name,'')) end else @pPricePlanDescription end, case rtrim(isnull(@pCategoryDescription,'')) when '' then Category.Name else @pCategoryDescription end, Category.CategoryId, @pPricePlanId, 'B', District.DistrictId, case isnull(@pMarkup,0) when 0 then 10 else @pMarkup end, 1, @pUseParentCatalog, @pKeepZeroPages
        from Category
        left outer join District on District.DistrictId = @pDistrictId
       where Category.CategoryId = @pCategoryId

    if @@rowcount != 0
    begin
      select @OrderBookId = Scope_Identity() --DCH 11/24/2015 @@identity
     insert OrderBookDetail (OrderBookId, Active, ItemId, CatalogId)
        select @OrderBookId, 1, Items.ItemId, Items.ParentCatalogId
          from Items
         where Items.CategoryId = @pCategoryId
           and Items.Active = 1
           and isnull(Items.DistrictId,0) = 0
           and Items.ItemId in (
             select Detail.ItemId
               from Detail with (nolock)
               join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
                                and Requisitions.CategoryId = @pCategoryId
               join Budgets on Budgets.BudgetId = Requisitions.BudgetId
                           and Budgets.EndDate > DATEADD(year,-5,getdate())
                           and Budgets.DistrictId = @pDistrictId
              group by Detail.ItemId)
         group by Items.ItemId, Items.ParentCatalogId

      insert OrderBookDetail (OrderBookId, Active, ItemId, CatalogId)
        select @OrderBookId, 1, Items.ItemId, Items.ParentCatalogId
          from Items
          join District on District.DistrictId = Items.DistrictId
                       and District.Active = 1
                       and District.DistrictId = @pDistrictId
         where Items.CategoryId = @pCategoryId
           and Items.Active = 1
         group by Items.ItemId, Items.ParentCatalogId
/*
      insert OrderBookDetail (OrderBookId, Active, ItemId, CatalogId, BasePrice, Weight)
        select @OrderBookId, 1, Items.ItemId, 
               Items.ParentCatalogId, 
               round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2),
               (BidRequestItems.RequisitionCount * BidRequestItems.RequisitionCount ) + BidRequestItems.BidRequest 
          from Items with (nolock)
          left outer join BidRequestItems on BidRequestItems.BidRequestItemId = 
            (select top 1 bri.BidRequestItemId
               from BidRequestItems bri with (nolock)
               join BidHeaders on BidHeaders.BidHeaderId = bri.BidHeaderId
                              and BidHeaders.PricePlanId = @pPricePlanId
                              and BidHeaders.CategoryId = Items.CategoryId
                              and BidHeaders.BidAwardDate > dateadd(year,-1,getdate())
              where bri.ItemId = Items.ItemId 
              order by BidHeaders.BidAwardDate desc, bri.BidRequest desc) 
          left outer join BidItems on BidItems.BidItemId = 
            (select top 1 bi.BidItemId
               from BidItems bi with (nolock)
               join Bids b on b.BidId = bi.BidId 
                          and b.Active = 1 
               join BidHeaders on BidHeaders.BidHeaderId = b.BidHeaderId
                              and BidHeaders.PricePlanId = @pPricePlanId
                              and BidHeaders.CategoryId = Items.CategoryId
                              and BidHeaders.BidAwardDate > dateadd(year,-1,getdate())
              where bi.ItemId = Items.ItemId 
              order by BidHeaders.BidAwardDate desc, bi.Price desc)
          left outer join Bids on Bids.BidId = BidItems.BidId
         where Items.CategoryId = @pCategoryId
           and Items.Active = 1
           and case isnull(Items.DistrictId,0) when 0 then @pDistrictId else isnull(Items.DistrictId,0) end = @pDistrictId
         group by Items.ItemId, Items.ParentCatalogId, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2), (BidRequestItems.RequisitionCount * BidRequestItems.RequisitionCount ) + BidRequestItems.BidRequest 
--         option (maxdop 1)
*/
    end
  end
  else
  if @pAction = 2 and @OrderBookType != '' -- Change
  begin
    if rtrim(@pCopyMode) = 'Copy'
    begin
      exec dbo.sp_CopyToBudgetBook @pOrderBookId, @pCategoryId, @pPricePlanId, @pDistrictId, @pAwardId, @pCategoryDescription, @pPricePlanDescription, @Markup
    end
    else
    begin
      if @ApprovalLevel >= 9
      begin
        Update OrderBooks
           set Category = rtrim(@pCategoryDescription),
               PricePlanDescription = rtrim(@pPricePlanDescription),
               CategoryId = @pCategoryId,
               PricePlanId = @pPricePlanId,
               DistrictId = @pDistrictId,
               AwardId = @pAwardId,
               Markup = @Markup,
               Active = @pActive,
               OrderBookYear = @pOrderBookYear,
               KeepZeroPages = @pKeepZeroPages,
               UseParentCatalog = @pUseParentCatalog
         where OrderBookId = @pOrderBookId

--         exec dbo.sp_RebuildOBPricesSingle @pOrderBookId
      end
      else
      begin
        Update OrderBooks
           set Category = rtrim(@pCategoryDescription),
               PricePlanDescription = rtrim(@pPricePlanDescription),
               DistrictId = @pDistrictId,
               Markup = @Markup,
               Active = @pActive,
               KeepZeroPages = @pKeepZeroPages,
               UseParentCatalog = @pUseParentCatalog
         where OrderBookId = @pOrderBookId
      end
    end
  end
  else
  if @pAction = 3 and @OrderBookType != '' -- Delete
  begin
    if @ApprovalLevel >= 9
    begin
      select BidItems.AwardId, Bids.BidHeaderId, Bids.BidId
        into #DeleteItems
        from OrderBooks
        join OrderBookDetail on OrderBookDetail.OrderBookId = OrderBooks.OrderBookId
        join BidItems on BidItems.BidItemId = OrderBookDetail.BidItemId
        join Bids on Bids.BidId = BidItems.BidId
       where OrderBooks.OrderBookId = @pOrderBookId
       group by BidItems.AwardId, Bids.BidHeaderId, Bids.BidId

      insert #DeleteItems (AwardId, BidHeaderId, BidId)
        select Awards.AwardId, Bids.BidHeaderId, Bids.BidId
          from BidHeaders
          join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
          join #DeleteItems dih on dih.BidHeaderId = BidHeaders.BidHeaderId
          left outer join Awards on Awards.BidId = Bids.BidId
          left outer join #DeleteItems di on di.BidId = Bids.BidId
         where di.BidId is null
         group by Awards.AwardId, Bids.BidHeaderId, Bids.BidId

      Delete BidItems
        from BidItems
        join (select BidId from #DeleteItems group by BidId) ss on ss.BidId = BidItems.BidId

      Delete OrderBookDetail
        from OrderBooks
        join OrderBookDetail on OrderBookDetail.OrderBookId = OrderBooks.OrderBookId
       where OrderBooks.OrderBookId = @pOrderBookId

      Delete OrderBooks
       where OrderBookId = @pOrderBookId

      Delete Awards
        from Awards
        join (select AwardId from #DeleteItems group by AwardId) ss on ss.AwardId = Awards.AwardId

      Delete Bids
        from Bids
        join (select BidId from #DeleteItems group by BidId) ss on ss.BidId = Bids.BidId

      drop table #DeleteItems
    end
    else
    begin
      if @OrderBookType = 'B'
      begin
        Delete OrderBookDetail
          from OrderBooks
          join OrderBookDetail on OrderBookDetail.OrderBookId = OrderBooks.OrderBookId
         where OrderBooks.OrderBookId = @pOrderBookId
           and OrderBooks.Type = 'B'

        Delete OrderBooks
         where OrderBookId = @pOrderBookId
           and OrderBooks.Type = 'B'
      end
    end
  end
end
commit
set nocount off
```
