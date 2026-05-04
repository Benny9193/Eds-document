# Procedure: `dbo.sp_BuildTopOrdered`

_Generated on 2026-05-04T14:49:07.219Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_BuildTopOrdered` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-06-30 12:55:47 |
| Modified | 2014-10-07 17:53:23 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `Headings` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `TopOrderedItems` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_BuildTopOrdered] as

declare @CategoryId int,
	@BudgetId int

declare cbcur cursor fast_forward read_only for
select Requisitions.CategoryId, Budgets.BudgetId
  from Requisitions 
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
              and Budgets.VisibleFrom <= getdate()
              and Budgets.VisibleUntil >= getdate()
 group by Requisitions.CategoryId, Budgets.BudgetId

truncate table TopOrderedItems

open cbcur

fetch next from cbcur into @CategoryId, @BudgetId

while @@fetch_status = 0
begin
  insert TopOrderedItems (CategoryId, BudgetId, ItemId, Quantity, ReqCount, Weight)
    select top 200 Requisitions.CategoryId, Requisitions.BudgetId, Detail.ItemId, sum(Detail.Quantity), count(*), count(*) * count(*) * sum(Detail.Quantity)
      from Detail
      join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
      join Budgets on Budgets.BudgetId = Requisitions.BudgetId
                  and Budgets.VisibleFrom <= getdate()
                  and Budgets.VisibleUntil >= getdate()
     where Requisitions.CategoryId = @CategoryId
       and Requisitions.BudgetId = @BudgetId
     group by Requisitions.CategoryId, Requisitions.BudgetId, Detail.ItemId
     order by Requisitions.CategoryId, Requisitions.BudgetId, count(*), count(*) * count(*) * sum(Detail.Quantity) * max(Detail.BidPrice), Detail.ItemId

  -- Add Expanded Items
  insert TopOrderedItems (CategoryId, BudgetId, ItemId, Quantity, ReqCount, Weight)
    select @CategoryId, @BudgetId, Items.ItemId, sum(Detail.Quantity), count(*), count(*) * count(*) * sum(Detail.Quantity)
      from TopOrderedItems
      join Items on Items.ItemId = TopOrderedItems.ItemId
      join Headings on Headings.HeadingId = Items.HeadingId
      left outer join Detail on Detail.ItemId = Items.ItemId
      left outer join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
                                  and Requisitions.CategoryId = TopOrderedItems.CategoryId
                                  and Requisitions.BudgetId = TopOrderedItems.BudgetId
     where TopOrderedItems.CategoryId = @CategoryId
       and TopOrderedItems.BudgetId = @BudgetId
       and Headings.ExpandAll = 1
       and Items.ItemId != TopOrderedItems.ItemId
       group by Items.ItemId

  fetch next from cbcur into @CategoryId, @BudgetId
end

close cbcur
deallocate cbcur
```
