# Procedure: `dbo.sp_CombineReqs`

_Generated on 2026-05-04T13:43:18.745Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CombineReqs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2007-06-04 10:46:17 |
| Modified | 2015-07-10 13:36:30 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRSId` | IN | int |  |
| 2 | `@pDelete` | IN | tinyint |  |
| 3 | `@rRequisitionId` | INOUT | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `ApprovalsHistory` | USER_TABLE |  |
| `DebugMsgs` | USER_TABLE |  |
| `detail` | USER_TABLE |  |
| `ReportSession` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `sp_DeleteRequisitionWithDetail` | unresolved |  |
| `sp_UpdateReq` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE    procedure [dbo].[sp_CombineReqs] @pRSId int, @pDelete tinyint, @rRequisitionId int output as

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

set transaction isolation level read uncommitted
insert DebugMsgs(Msg) values ('Start dbo.sp_CombineReqs RSId=' + cast(@pRSId as varchar(18)) + ' Delete=' + cast(@pDelete as varchar(18)))

-- Verify Session
select @TodaysDate = getdate()

-- Verify Reqs Match
select Distinct @BudgetAccountId = BudgetAccountId, 
                @UserAccountId = UserAccountId, 
                @UserId = UserId, 
                @CategoryId = CategoryId, 
                @StatusId = isnull(Approvals.StatusId,0)
  from Requisitions with (nolock)
  join ReportSessionLinks on ReportSessionLinks.IntId = Requisitions.RequisitionId
  left outer join Approvals on Approvals.RequisitionId = Requisitions.RequisitionId
 where ReportSessionLinks.RSId = @pRSId

if @@rowcount != 1 or @StatusId != 0
begin
  insert DebugMsgs(Msg) values ('Requested Requisitions cannot be combined')
  raiserror('Requested Requisitions cannot be combined',16,1)
  return
end

select top 1 @RequisitionId = Detail.RequisitionId
  from detail with (nolock)
  join ReportSessionLinks rsl on rsl.RSId = @pRSId
                             and rsl.IntId = Detail.RequisitionId
 group by Detail.RequisitionId
 order by Count(*) desc, Detail.RequisitionId
  
select top 1 @DistrictId = School.DistrictId,
	@SchoolId = School.SchoolId,
	@BudgetId = Requisitions.BudgetId,
	@BudgetAccountId = Requisitions.BudgetAccountId,
        @UserAccountId = Requisitions.UserAccountId,
	@UserId = Requisitions.UserId
  from Requisitions with (nolock)
  join School on School.SchoolId = Requisitions.SchoolId
  join ReportSessionLinks on ReportSessionLinks.IntId = Requisitions.RequisitionId
 where ReportSessionLinks.RSId = @pRSId
   and Requisitions.REquisitionId = @RequisitionId
 order by Requisitions.RequisitionId

-- Set Return Value
select @rRequisitionId = @RequisitionId

begin transaction

  select DetailId into #ReprocList
    from Detail with (nolock)
    join ReportSessionLinks rsl on rsl.RSId = @pRSId
                               and rsl.IntId = Detail.RequisitionId
                               and rsl.IntId != @RequisitionId

  /* Combine Reqs */
  Update Detail
     set RequisitionId = @RequisitionId
      from ReportSessionLinks
      join Requisitions on Requisitions.RequisitionId = ReportSessionLinks.IntId
                       and Requisitions.RequisitionId != @RequisitionId
      join Detail on Detail.RequisitionId = Requisitions.RequisitionId
     where ReportSessionLinks.RSId = @pRSId

 insert DebugMsgs(Msg) values (' dbo.sp_CombineReqs RSId=' + cast(@pRSId as varchar(18)) + ' Delete=' + cast(@pDelete as varchar(18)) + ' NewReqId=' + cast(@rRequisitionId as varchar(18)) + ' Select Dup Items')

  Update Approvals
     set RequisitionId = @RequisitionId
      from ReportSessionLinks
      join Requisitions on Requisitions.RequisitionId = ReportSessionLinks.IntId
                       and Requisitions.RequisitionId != @RequisitionId
      join Approvals on Approvals.RequisitionId = Requisitions.RequisitionId
     where ReportSessionLinks.RSId = @pRSId

  Update ApprovalsHistory
     set RequisitionId = @RequisitionId
      from ReportSessionLinks
      join Requisitions on Requisitions.RequisitionId = ReportSessionLinks.IntId
                       and Requisitions.RequisitionId != @RequisitionId
      join ApprovalsHistory on ApprovalsHistory.RequisitionId = Requisitions.RequisitionId
     where ReportSessionLinks.RSId = @pRSId
     
  -- Combine Duplicated Items in Temp
  select distinct d1.RequisitionId, d1.ItemId, ItemCode,
         s1.LastYearsQuantity, Description, UnitId, UnitCode, s1.Quantity 
    into #TempDetail
    from detail d1
    join (select RequisitionId, ItemId, sum(isnull(Quantity,0)) as Quantity, sum(isnull(Detail.LastYearsQuantity,0)) as LastYearsQuantity, min(isnull(BatchDetailId,0)) as BatchDetailId, min(isnull(SourceId,0)) as SourceId
            from Detail with (nolock)
           group by RequisitionId, ItemId
          having count(ItemId) > 1) s1 on s1.RequisitionId = D1.RequisitionId
                                      and s1.ItemId = D1.ItemId
   where d1.RequisitionId = @RequisitionId

 insert DebugMsgs(Msg) values (' dbo.sp_CombineReqs RSId=' + cast(@pRSId as varchar(18)) + ' Delete=' + cast(@pDelete as varchar(18)) + ' NewReqId=' + cast(@rRequisitionId as varchar(18)) + ' Delete Dup Items')
  -- Remove Duplicated Items from Actual
  delete Detail
    from Detail
    join #TempDetail on #TempDetail.RequisitionId = Detail.RequisitionId
                    and #TempDetail.ItemId = Detail.ItemId

 insert DebugMsgs(Msg) values (' dbo.sp_CombineReqs RSId=' + cast(@pRSId as varchar(18)) + ' Delete=' + cast(@pDelete as varchar(18)) + ' NewReqId=' + cast(@rRequisitionId as varchar(18)) + '  Insert Dup Items')
  -- ReInsert Combined Items
  insert Detail (RequisitionId, ItemId, ItemCode, Quantity,
                 LastYearsQuantity, Description, UnitId, UnitCode)
    select RequisitionId, ItemId, ItemCode, Quantity,
         LastYearsQuantity, Description, UnitId, UnitCode
      from #TempDetail

 insert DebugMsgs(Msg) values (' dbo.sp_CombineReqs RSId=' + cast(@pRSId as varchar(18)) + ' Delete=' + cast(@pDelete as varchar(18)) + ' NewReqId=' + cast(@rRequisitionId as varchar(18)) + ' Add Dup Items to Reproc')

  insert #ReprocList (DetailId)
    select Detail.DetailId
      from Detail with (nolock)
      join #TempDetail td on td.ItemId = Detail.ItemId
     where Detail.RequisitionId = @RequisitionId

 insert DebugMsgs(Msg) values (' dbo.sp_CombineReqs RSId=' + cast(@pRSId as varchar(18)) + ' Delete=' + cast(@pDelete as varchar(18)) + ' NewReqId=' + cast(@rRequisitionId as varchar(18)) + ' drop tempDetail')
  -- Remove Temp Table
  drop table #TempDetail

 insert DebugMsgs(Msg) values (' dbo.sp_CombineReqs RSId=' + cast(@pRSId as varchar(18)) + ' Delete=' + cast(@pDelete as varchar(18)) + ' NewReqId=' + cast(@rRequisitionId as varchar(18)) + ' Update Accounting')
  -- Update Accounting
  exec sp_UpdateReq @RequisitionId, @BudgetAccountId, @BudgetId, @UserId

 insert DebugMsgs(Msg) values (' dbo.sp_CombineReqs RSId=' + cast(@pRSId as varchar(18)) + ' Delete=' + cast(@pDelete as varchar(18)) + ' NewReqId=' + cast(@rRequisitionId as varchar(18)) + ' Begin Commit')
commit transaction

--if @pDelete = 1
--begin
 insert DebugMsgs(Msg) values (' dbo.sp_CombineReqs RSId=' + cast(@pRSId as varchar(18)) + ' Delete=' + cast(@pDelete as varchar(18)) + ' NewReqId=' + cast(@rRequisitionId as varchar(18)) + ' Begin Delete')
  declare RDCur cursor fast_forward read_only for
    select IntId from ReportSessionLinks with (nolock) where RSId = @pRSId and IntId != @RequisitionId

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

 insert DebugMsgs(Msg) values (' dbo.sp_CombineReqs RSId=' + cast(@pRSId as varchar(18)) + ' Delete=' + cast(@pDelete as varchar(18)) + ' NewReqId=' + cast(@rRequisitionId as varchar(18)) + ' Begin Cleanup')
delete ReportSessionLinks
 where RSId = @pRSId

Delete ReportSession
 where RSId = @pRSId


 insert DebugMsgs(Msg) values (' dbo.sp_CombineReqs RSId=' + cast(@pRSId as varchar(18)) + ' Delete=' + cast(@pDelete as varchar(18)) + ' NewReqId=' + cast(@rRequisitionId as varchar(18)) + ' Begin Reproc')
Update Detail
   set Reproc = 1
  from detail
  join #ReprocList rl on rl.DetailId = Detail.DetailId
 where RequisitionId = @RequisitionId

insert DebugMsgs(Msg) values ('End dbo.sp_CombineReqs RSId=' + cast(@pRSId as varchar(18)) + ' Delete=' + cast(@pDelete as varchar(18)) + ' NewReqId=' + cast(@rRequisitionId as varchar(18)))
```
