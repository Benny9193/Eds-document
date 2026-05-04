# Procedure: `dbo.sp_BatchConvertNew`

_Generated on 2026-05-04T13:04:00.292Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_BatchConvertNew` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2009-02-26 10:25:33 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pBatchId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `BatchBook` | USER_TABLE |  |
| `BatchDetail` | USER_TABLE |  |
| `Batches` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `sp_NewRequisitionId` | unresolved |  |
| `StatusTable` | USER_TABLE |  |
| `TaskSchedule` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure dbo.sp_BatchConvertNew @pSessionId int, @pBatchId int AS

-- Declare Local Variables
declare	@BatchId int,
	@BatchBookId int,
	@RequisitionId int,
	@DistrictId int,
	@CategoryId int,
	@SchoolId int,
	@UserId int,
	@BudgetId int,
	@AccountId int,
	@BudgetAccountId int,
	@UserAccountId int,
	@Errors int,
	@AccountCode varchar(30),
	@Total money,
	@TodaysDate datetime,
	@BatchDetailId int,
	@Qty int,
	@SourceId int,
	@ItemId int,
	@ConvertedId int,
	@BidHeaderId int

set transaction isolation level read uncommitted

-- Verify Session
select @TodaysDate = getdate()

select @ConvertedId = StatusId
  from StatusTable
 where StatusCode = 'J'

--Assign Local Variable
select @BatchId = @pBatchId

-- Verify Batch is Clean
select @Errors = ErrorCount
  from Batches
 where BatchId = @BatchId

-- Declare Cursor for Books
declare BookCursor cursor forward_only read_only for
select BatchBook.BatchBookId, BatchBook.DistrictId, BatchBook.CategoryId, 
       BatchBook.UserId, BatchBook.AccountCode, BatchBook.AccountId, 
       BatchBook.BudgetId, BatchBook.BudgetAccountId, BatchBook.UserAccountId, 
       BatchBook.CalcAmount, Users.SchoolId
  from BatchBook
  join Batches on Batches.BatchId = BatchBook.BatchId
              and Batches.Converted is null
  join Users on Users.UserId = BatchBook.UserId
 where BatchBook.BatchId = @BatchId

-- Open Cursor
open BookCursor

-- Loop Thru Result Set
fetch next from BookCursor into @BatchBookId, @DistrictId, @CategoryId, @UserId, @AccountCode, @AccountId, @BudgetId, @BudgetAccountId, @UserAccountId, @Total, @SchoolId

while @@fetch_status = 0
begin
  -- Get Current Budget
  select @BudgetId = BudgetId
    from Budgets
   where DistrictId = @DistrictId
     and dateadd(month,4,StartDate) <= dateadd(year,1,getdate())
     and dateadd(month,4,EndDate) >= dateadd(year,1,getdate())
     and Active = 1

  -- Create New Requisition
  execute sp_NewRequisitionId @DistrictId, @SchoolId, @BudgetId, @UserId, @RequisitionId output

/*
  -- Insert Detail for Requisition
  insert Detail (RequisitionId, CatalogId, ItemId, AddendumItem, ItemCode, 
		 Quantity, LastYearsQuantity, [Description], UnitId, UnitCode, 
		 BidPrice, CatalogPrice, GrossPrice, DiscountRate, CatalogPage, PricePlanId, PriceId, VendorId, VendorItemCode, Alternate, POId, BatchDetailId, SourceId, AwardId)
    select @RequisitionId, li.ParentCatalogId, BatchDetail.ItemId, 0, li.ItemCode, BatchDetail.Qty, 0, li.[Description], 
           li.UnitId, li.UnitCode, li.BidPrice, li.CatalogPrice, li.GrossPrice, li.DiscountRate, li.Page, li.PricePlanId, li.PriceId, li.VendorId, li.VendorItemCode, li.Alternate, 0, BatchDetail.BatchDetailId, BatchDetail.SourceId, li.AwardId
      from BatchDetail
      join EDSIQWebUser.uf_LookupItems(@CategoryId, @TodaysDate, 0, @DistrictId) li on li.PackedItemCode = BatchDetail.PackedCode
     where BatchDetail.BatchBookId = @BatchBookId
       and BatchDetail.Active = 1
*/

  -- Update Requisition Header
  update Requisitions
     set CategoryId = @CategoryId,
	 BookId = @BatchBookId,
         BudgetAccountId = @BudgetAccountId,
         UserAccountId = @UserAccountId,
         AccountCode = @AccountCode,
	 SourceId = 2
   where RequisitionId = @RequisitionId

  select @BidHeaderId = BidHeaderId
    from Requisitions
   where RequisitionId = @RequisitionId

/*
  insert Detail (RequisitionId, ItemId, Quantity, BatchDetailId, SourceId)
    select @RequisitionId, BatchDetail.ItemId, BatchDetail.Qty, BatchDetail.BatchDetailId, BatchDetail.SourceId
      from BatchDetail 
     where BatchBookId = @BatchBookId
       and Active = 1
*/
  -- Update Accounting
--  exec sp_UpdateReq @RequisitionId, @BudgetAccountId, @BudgetId, @UserId

  -- Insert Status
  insert Approvals (Level, StatusId, RequisitionId, ApprovalDate)
    values (0, @ConvertedId, @RequisitionId, getdate())

  -- Get Next Book
  fetch next from BookCursor into @BatchBookId, @DistrictId, @CategoryId, @UserId, @AccountCode, @AccountId, @BudgetId, @BudgetAccountId, @UserAccountId, @Total, @SchoolId
end

-- Close and Deallocate Cursor
close BookCursor
deallocate BookCursor

  insert Detail (RequisitionId, ItemId, Quantity, BatchDetailId, SourceId)
    select Requisitions.RequisitionId, BatchDetail.ItemId, BatchDetail.Qty, BatchDetail.BatchDetailId, BatchDetail.SourceId
      from BatchDetail 
      join Requisitions on Requisitions.BookId = BatchDetail.BatchBookId
                       and Requisitions.SourceId = 2
     where BatchDetail.BatchId = @BatchId
       and BatchDetail.Active = 1

  -- Combine Duplicated Items in Temp
  select d1.RequisitionId, d1.ItemId, sum(Quantity) Quantity, min(BatchDetailId) BatchDetailId, 2 SourceId
    into #TempDetail
    from detail d1
    join Requisitions on Requisitions.RequisitionId = d1.RequisitionId
                     and Requisitions.SourceId = 2
    join BatchBook on BatchBook.BatchBookId = Requisitions.BookId
                  and BatchBook.BatchId = @BatchId
   group by d1.RequisitionId, d1.ItemId
   having count(*) > 1

/*    join (select RequisitionId, ItemId, sum(isnull(Quantity,0)) as Quantity, min(isnull(BatchDetailId,0)) as BatchDetailId, min(isnull(SourceId,0)) as SourceId
            from Detail
           group by RequisitionId, ItemId
          having count(ItemId) > 1) s1 on s1.RequisitionId = D1.RequisitionId
                                      and s1.ItemId = D1.ItemId
*/
  -- Remove Duplicated Items from Actual
  delete Detail
    from Detail
    join #TempDetail on #TempDetail.RequisitionId = Detail.RequisitionId
                    and #TempDetail.ItemId = Detail.ItemId

  -- ReInsert Combined Items
  insert Detail (RequisitionId, ItemId, Quantity, BatchDetailId, SourceId)
    select RequisitionId, ItemId, Quantity, BatchDetailId, SourceId
      from #TempDetail

  -- Remove Temp Table
  drop table #TempDetail

-- Update Last Years Qty
Update Detail
   set LastYearsQuantity = (select sum(Quantity) from detail d join Requisitions r on r.RequisitionId = d.RequisitionId and r.categoryId = Requisitions.CategoryId and r.UserId = Requisitions.UserId join Budgets b on b.BudgetId = r.BudgetId and b.StartDate <= dateadd(year,-1,Budgets.StartDate) and b.EndDate >= dateadd(year,-1,Budgets.EndDate) where d.ItemId = Detail.ItemId)
  from detail
  join Requisitions on Requisitions.RequisitionId = detail.RequisitionId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join BatchBook on BatchBook.BatchBookId = Requisitions.BookId
                and BatchBook.BatchId = @BatchId

-- Update Book Headers
Update BatchBook
   set RequisitionId = Requisitions.RequisitionId
  from BatchBook
  inner join Requisitions on Requisitions.BookId = BatchBook.BatchBookId
 where BatchId = @BatchId

-- Mark Conversion Done
update Batches
   set Converted = getdate()
 where BatchId = @BatchId

-- Mark Batches Converted in Schedule
Update TaskSchedule
   set EndDateActual = Batches.Converted,
       StartDateActual = isnull(TaskSchedule.StartDateActual,Batches.Converted)
  from TaskSchedule
  join BatchBook on BatchBook.DistrictId = TaskSchedule.DistrictId
                and BatchBook.CategoryId = TaskSchedule.CategoryId
                and BatchBook.BatchId = @BatchId
  join Batches on Batches.BatchId = BatchBook.BatchId
 where TaskSchedule.ProjectTasksId = 6
   and TaskSchedule.BidCycleDate >= convert(datetime,'08/01/' + convert(char(4),case month(getdate()) when 11 then year(getdate()) when 12 then year(getdate()) else year(getdate()) - 1 end))
```
