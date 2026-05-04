# Procedure: `dbo.sp_CombineReqsByVendorNoDelete`

_Generated on 2026-05-04T13:04:24.086Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CombineReqsByVendorNoDelete` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2008-06-16 09:52:45 |
| Modified | 2015-03-24 14:59:07 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pRSId` | IN | int |  |
| 3 | `@rRequisitionId` | INOUT | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `DebugMsgs` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `sp_NewRequisitionId` | unresolved |  |
| `sp_UpdateReq` | unresolved |  |
| `Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  procedure [dbo].[sp_CombineReqsByVendorNoDelete] @pSessionId int, @pRSId int, @rRequisitionId int output as

-- Declare Local Variables
declare	@RequisitionId int,
	@DistrictId int,
	@CategoryId int,
	@SchoolId int,
	@UserId int,
	@BudgetId int,
	@AccountId int,
	@BudgetAccountId int,
	@UserAccountId int,
	@AccountCode varchar(30),
	@Total money,
	@TodaysDate datetime,
	@Qty int,
	@ItemId int,
	@DetailId int,
	@DelReqId int,
	@rStatus int,
	@SourceId int,
	@StatusId int,
	@VendorId int

insert DebugMsgs(Msg) values ('Start dbo.sp_CombineReqsByVendorNoDelete RSId=' + cast(@pRSId as varchar(18)))

-- Verify Session
select @TodaysDate = getdate()

select top 1 @DistrictId = School.DistrictId,
	@SchoolId = School.SchoolId,
	@BudgetId = Requisitions.BudgetId,
	@BudgetAccountId = Requisitions.BudgetAccountId,
	@UserId = Requisitions.UserId
  from Requisitions
  join School on School.SchoolId = Requisitions.SchoolId
  join ReportSessionLinks on ReportSessionLinks.IntId = Requisitions.RequisitionId
 where ReportSessionLinks.RSId = @pRSId
 order by Requisitions.RequisitionId

declare VCur cursor fast_forward read_only for
  select Detail.VendorId, Requisitions.CategoryId
    from ReportSessionLinks
    join Requisitions on Requisitions.RequisitionId = ReportSessionLinks.IntId
    join Detail on Detail.RequisitionId = Requisitions.RequisitionId
   where ReportSessionLinks.RSId = @pRSId
   group by Detail.VendorId, Requisitions.CategoryId

open VCur

fetch next from VCur into @VendorId, @CategoryId

while @@fetch_status = 0
begin
  -- Create New Requisition
  execute sp_NewRequisitionId @DistrictId, @SchoolId, @BudgetId, @UserId, @RequisitionId output

  -- Update Requisition Header
  update Requisitions
     set CategoryId = @CategoryId,
         SourceId = 4,
         Attention = 'Combined ' + isnull(Vendors.Name,''),
         UserId = SessionTable.UserId,
         BudgetAccountId = null,
         UserAccountId = null,
         AccountCode = ''
    from Requisitions
    join Vendors on Vendors.VendorId = @VendorId
    left outer join SessionTable on SessionTable.SessionId = @pSessionId
   where Requisitions.RequisitionId = @RequisitionId

  -- Set Return Value
  select @rRequisitionId = @RequisitionId

  insert into Detail (RequisitionId, ItemId, Quantity, LastYearsQuantity, BatchDetailId, SourceId)
    select @RequisitionId, Detail.ItemId, Detail.Quantity, Detail.LastYearsQuantity, Detail.DetailId, Detail.SourceId
      from ReportSessionLinks
      join Requisitions on Requisitions.RequisitionId = ReportSessionLinks.IntId
      join Detail on Detail.RequisitionId = Requisitions.RequisitionId
                 and Detail.VendorId = @VendorId
     where ReportSessionLinks.RSId = @pRSId

  -- Combine Duplicated Items in Temp
  select distinct d1.RequisitionId,CatalogId,d1.ItemId,AddendumItem,ItemCode,
         LastYearsQuantity,Description,UnitId,UnitCode,BidPrice,CatalogPrice,GrossPrice, DiscountRate, CatalogPage,
         PricePlanId,PriceId,VendorId,VendorItemCode,Alternate,POId,s1.Quantity,s1.BatchDetailId,s1.SourceId, d1.AwardId 
    into #TempDetail
    from detail d1
    join (select RequisitionId, ItemId, sum(isnull(Quantity,0)) as Quantity, min(isnull(BatchDetailId,0)) as BatchDetailId, min(isnull(SourceId,0)) as SourceId
            from Detail
           group by RequisitionId, ItemId
          having count(ItemId) > 1) s1 on s1.RequisitionId = D1.RequisitionId
                                        and s1.ItemId = D1.ItemId
   where d1.RequisitionId = @RequisitionId

  -- Remove Duplicated Items from Actual
  delete Detail
    from Detail
    join #TempDetail on #TempDetail.RequisitionId = Detail.RequisitionId
                    and #TempDetail.ItemId = Detail.ItemId

  -- ReInsert Combined Items
  insert Detail (RequisitionId, CatalogId, ItemId, AddendumItem, ItemCode, Quantity,
                 LastYearsQuantity, Description, UnitId, UnitCode, BidPrice, CatalogPrice,GrossPrice, DiscountRate, 
                 CatalogPage, PricePlanId, PriceId, VendorId, VendorItemCode, Alternate,
                 POId, BatchDetailId, SourceId, AwardId)
    select RequisitionId, CatalogId, ItemId, AddendumItem, ItemCode, Quantity,
         LastYearsQuantity, Description, UnitId, UnitCode, BidPrice, CatalogPrice,GrossPrice, DiscountRate, 
         CatalogPage, PricePlanId, PriceId, VendorId, VendorItemCode, Alternate,
         POId, BatchDetailId, SourceId, AwardId
      from #TempDetail

  -- Remove Temp Table
  drop table #TempDetail

  Update Detail
     set Reproc = 1
    from Detail
   where RequisitionId = @RequisitionId

  -- Update Accounting
  exec sp_UpdateReq @RequisitionId, @BudgetAccountId, @BudgetId, @UserId

  fetch next from VCur into @VendorId, @CategoryId
end

close VCur
deallocate VCur

insert DebugMsgs(Msg) values ('End dbo.sp_CombineReqsByVendorNoDelete RSId=' + cast(@pRSId as varchar(18)) + ' NewReqId=' + cast(@rRequisitionId as varchar(18)))
```
