# Procedure: `dbo.sp_ConvertReqs`

_Generated on 2026-05-04T13:04:24.088Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_ConvertReqs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-03-20 22:18:07 |
| Modified | 2022-04-01 08:49:58 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pRSId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `DebugMsgs` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `sp_RefreshDistrictVendors` | unresolved |  |
| `Users` | USER_TABLE |  |
| `vw_RequisitionShippingCosts` | VIEW |  |
| `dbo.sp_CreatePO` | SQL_STORED_PROCEDURE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE          procedure [dbo].[sp_ConvertReqs] @pSessionId int, @pRSId int AS

declare @ReqId int,
	@DistrictId int,
	@ReqList varchar(max) = '',
	@ErrorMsg varchar(max) = ''

set transaction isolation level read uncommitted

select @ReqList = STRING_AGG(cast(Requisitions.RequisitionNumber as varchar(max)),', ') 
  from ReportSessionLinks
  join Requisitions on Requisitions.RequisitionId = ReportSessionLinks.IntId
  outer apply (Select sum(rsc.Extended + rsc.ShippingCost + rsc.TotalShippingCost) Total from vw_RequisitionShippingCosts rsc where rsc.RequisitionId = Requisitions.RequisitionId) ReqTotal
 where ReportSessionLinks.RSId = @pRSId
   and coalesce(Requisitions.TotalRequisitionCost,0) != coalesce(ReqTotal.Total,0)

if isnull(@ReqList,'') = ''
begin
	declare ReqCur cursor fast_forward read_only for
	select RequisitionId 
	  from ReportSessionLinks
	  join Requisitions on Requisitions.RequisitionId = ReportSessionLinks.IntId
	  join Users on Users.UserId = Requisitions.UserId 
	 where ReportSessionLinks.RSId = @pRSId
	 order by Requisitions.CategoryId, Requisitions.SchoolId, Users.CometId, Requisitions.RequisitionId

	open ReqCur

	fetch next from ReqCur into @ReqId

	while @@fetch_status = 0
	begin
	  select @DistrictId = Budgets.DistrictId
		from Requisitions
		join Budgets on Budgets.BudgetId = Requisitions.BudgetId
	   where Requisitions.RequisitionId = @ReqId

	  exec dbo.sp_CreatePO @pSessionId, @ReqId
  
	  fetch next from ReqCur into @ReqId
	end

	close ReqCur
	deallocate ReqCur

	exec sp_RefreshDistrictVendors @DistrictId
end
else
begin
  insert DebugMsgs(Msg) values ('Request to Convert Reqs Failed due to Requisition Totals being incorrect. RSId=' + cast(@pRSId as varchar(50)))
  select @ErrorMsg = 'Requisition Totals Incorrect. Reprocess Reqs ' + @ReqList + ' First.'
  raiserror(@ErrorMsg,16,1)
  return
end
```
