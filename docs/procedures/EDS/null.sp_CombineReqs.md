# Procedure: `null.sp_CombineReqs`

_Generated on 2026-05-04T13:04:00.211Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `sp_CombineReqs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-01-08 20:30:11 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `ReportSession` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `sp_DeleteRequisitionWithDetail` | unresolved |  |
| `sp_NewRequisitionId` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE        procedure EDSIQWebUser.sp_CombineReqs @pRSId int, @pDelete tinyint, @rRequisitionId int output as

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
	@StatusId int

-- Verify Session
select @TodaysDate = getdate()

-- Verify Reqs Match
select Distinct @BudgetAccountId = BudgetAccountId, 
                @UserAccountId = UserAccountId, 
                @UserId = UserId, 
                @CategoryId = CategoryId, 
                @StatusId = isnull(Approvals.StatusId,0)
  from Requisitions
  join ReportSessionLinks on ReportSessionLinks.IntId = Requisitions.RequisitionId
  left outer join Approvals on Approvals.RequisitionId = Requisitions.RequisitionId
 where ReportSessionLinks.RSId = @pRSId

if @@rowcount != 1 or @StatusId != 0
begin
  raiserror('Requested Requisitions cannot be combined',16,1)
  return
end

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

-- Create New Requisition
execute sp_NewRequisitionId @DistrictId, @SchoolId, @BudgetId, @UserId, @RequisitionId output

-- Set Return Value
select @rRequisitionId = @RequisitionId

/*
declare CICur cursor fast_forward read_only for
  select Detail.DetailId, Detail.ItemId, Detail.Quantity, Detail.SourceId
    from ReportSessionLinks
    join Requisitions on Requisitions.RequisitionId = ReportSessionLinks.IntId
    join Detail on Detail.RequisitionId = Requisitions.RequisitionId
   where ReportSessionLinks.RSId = @pRSId

  open CICur

  fetch next from CICur into @DetailId, @ItemId, @Qty, @SourceId

  while @@fetch_status = 0
  begin
    insert Detail (RequisitionId, CatalogId, ItemId, AddendumItem, ItemCode, 
	  	   Quantity, LastYearsQuantity, [Description], UnitId, UnitCode, 
		   BidPrice, CatalogPrice, GrossPrice, DiscountRate, CatalogPage, 
                   PricePlanId, PriceId, VendorId, VendorItemCode, Alternate, POId, 
                   BatchDetailId, SourceId, AwardId)
      select top 1 @RequisitionId, li.ParentCatalogId, li.ItemId, 0, li.ItemCode, @Qty, 0, li.[Description], 
             li.UnitId, li.UnitCode, li.BidPrice, li.CatalogPrice, li.GrossPrice, li.DiscountRate, li.Page, li.PricePlanId, li.PriceId, li.VendorId, li.VendorItemCode, li.Alternate, 0, null, @SourceId, li.AwardId
        from dbo.uf_LookupPrice(@ItemId, @TodaysDate, 0, @DistrictId) li
       order by li.BidItemId desc
    
    if @@rowcount = 0
    begin
      -- Load Item with No Information and Mark as NO BID ***
      insert Detail (RequisitionId, CatalogId, ItemId, AddendumItem, ItemCode, 
	    	     Quantity, LastYearsQuantity, [Description], UnitId, UnitCode, 
		     BidPrice, CatalogPrice, GrossPrice, DiscountRate, CatalogPage, 
                     PricePlanId, PriceId, VendorId, VendorItemCode, Alternate, POId, 
                     BatchDetailId, SourceId, AwardId)
        select @RequisitionId, null, null, null, Detail.ItemCode, Detail.Quantity, 
               Detail.LastYearsQuantity, Detail.Description, Detail.UnitId, Detail.UnitCode,
               null, null, null, null, Detail.CatalogPage, 
               null, null, 7691, Detail.VendorItemCode, Detail.Alternate, Detail.POId,
               Detail.BatchDetailId, Detail.SourceId, null
          from Detail
         where Detail.DetailId = @DetailId
    end

    fetch next from CICur into @DetailId, @ItemId, @Qty, @SourceId
  end

  close CICur
  deallocate CICur

*/

  /* Combine Reqs */
  insert Detail (RequisitionId, ItemId, 
 	   Quantity, LastYearsQuantity, BatchDetailId, SourceId)
    select @RequisitionId, Detail.ItemId, Detail.Quantity, Detail.LastYearsQuantity, Detail.BatchDetailId, Detail.SourceId
      from ReportSessionLinks
      join Requisitions on Requisitions.RequisitionId = ReportSessionLinks.IntId
      join Detail on Detail.RequisitionId = Requisitions.RequisitionId
     where ReportSessionLinks.RSId = @pRSId

/* -- Old Code
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
*/
  -- Combine Duplicated Items in Temp
  select distinct d1.RequisitionId, d1.ItemId, ItemCode,
         LastYearsQuantity, Description, UnitId, UnitCode, s1.Quantity 
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

/* -- Old Code
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
*/

  -- ReInsert Combined Items
  insert Detail (RequisitionId, ItemId, ItemCode, Quantity,
                 LastYearsQuantity, Description, UnitId, UnitCode)
    select RequisitionId, ItemId, ItemCode, Quantity,
         LastYearsQuantity, Description, UnitId, UnitCode
      from #TempDetail

  -- Remove Temp Table
  drop table #TempDetail

  -- Update Requisition Header
  update Requisitions
     set CategoryId = @CategoryId,
	 SourceId = 4
   where RequisitionId = @RequisitionId

  -- Update Accounting
--  exec sp_UpdateReq @RequisitionId, @BudgetAccountId, @BudgetId, @UserId

--if @pDelete = 1
--begin
  declare RDCur cursor fast_forward read_only for
    select IntId from ReportSessionLinks where RSId = @pRSId

  open RDCur

  fetch next from RDCur into @DelReqId

  while @@fetch_status = 0
  begin
--    print 'Deleting Requisition ' + convert(varchar(16),@DelReqId)
    exec sp_DeleteRequisitionWithDetail 1, @DelReqId, @rStatus output
  
    fetch next from RDCur into @DelReqId
  end

  close RDCur
  deallocate RDCur
--end

delete ReportSessionLinks
 where RSId = @pRSId

Delete ReportSession
 where RSId = @pRSId

Update Detail
   set Reproc = 1
  from detail
 where RequisitionId = @RequisitionId
```
