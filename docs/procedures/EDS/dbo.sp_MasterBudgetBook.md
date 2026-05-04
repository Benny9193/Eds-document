# Procedure: `dbo.sp_MasterBudgetBook`

_Generated on 2026-05-04T13:04:00.413Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_MasterBudgetBook` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2004-10-01 14:05:29 |
| Modified | 2016-11-04 15:55:21 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pCategoryId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `DistrictCategories` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `OrderBookDetail` | USER_TABLE |  |
| `OrderBooks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_MasterBudgetBook] @pCategoryId int as
declare @DistrictLetter char(1),
	@OrderBookId int

set nocount on

declare CodeCur cursor fast_forward read_only for
select substring(District.Name,1,1)
  from District
  join DistrictCategories on DistrictCategories.DistrictId = District.DistrictId
                         and DistrictCategories.CategoryId = @pCategoryId
 where District.Active = 1
 group by substring(District.Name,1,1)
 order by substring(District.Name,1,1)

open CodeCur

fetch next from CodeCur into @DistrictLetter

while @@fetch_status = 0
begin
    insert OrderBooks (PricePlanDescription, Category, CategoryId, PricePlanId, Type, DistrictId, Markup, Active, MasterBook, MasterLetter)
      select 'Budget Book for Districts Starting with the Letter ' + @DistrictLetter, Category.Name, Category.CategoryId, null, 'B', null, 0, 1, 1, @DistrictLetter
        from Category
       where Category.CategoryId = @pCategoryId

    if @@rowcount != 0
    begin
      select @OrderBookId = Scope_Identity() --DCH 11/24/2015 @@identity
/*
      insert OrderBookDetail (OrderBookId, Active, ItemId, CatalogId)
        select @OrderBookId, 1, Items.ItemId, Items.ParentCatalogId
          from Items
         where Items.CategoryId = @pCategoryId
           and Items.Active = 1
           and isnull(Items.DistrictId,0) = 0
           and (select COUNT(*) from Detail join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId and Requisitions.DateEntered > DATEADD(year,-4,getdate()) join Budgets on Budgets.BudgetId = Requisitions.BudgetId join District on District.DistrictId = Budgets.DistrictId and District.Active = 1 and District.Name like @DistrictLetter + '%' where Detail.ItemId = Items.ItemId) > 0
         group by Items.ItemId, Items.ParentCatalogId
*/
      insert OrderBookDetail (OrderBookId, Active, ItemId, CatalogId)
        select @OrderBookId, 1, Items.ItemId, Items.ParentCatalogId
          from Items
          join District on District.DistrictId = Items.DistrictId
                       and District.Active = 1
                       and substring(District.Name,1,1) = @DistrictLetter
         where Items.CategoryId = @pCategoryId
           and Items.Active = 1
           and (   Items.DistrictId = District.DistrictId
                or (select COUNT(*) from Detail join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId and Requisitions.DateEntered > DATEADD(year,-4,getdate()) join Budgets on Budgets.BudgetId = Requisitions.BudgetId and Budgets.DistrictId = District.DistrictId join BidItems on BidItems.BidItemId = Detail.BidItemId join Bids on Bids.BidId = BidItems.BidId join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId and BidHeaders.BidType = 2 where Detail.ItemId = Items.ItemId) > 0)
         group by Items.ItemId, Items.ParentCatalogId
    end

  fetch next from CodeCur into @DistrictLetter
end
close CodeCur
deallocate CodeCur

set nocount off
```
