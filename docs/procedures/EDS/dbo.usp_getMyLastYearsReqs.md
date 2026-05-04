# Procedure: `dbo.usp_getMyLastYearsReqs`

_Generated on 2026-05-04T13:07:57.775Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_getMyLastYearsReqs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2025-03-26 17:44:57 |
| Modified | 2025-03-26 17:44:57 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pUserId` | IN | int |  |
| 2 | `@pBudgetId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `dbo.uf_RequisitionStatus` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--exec usp_getMyLastYearsReqs 207252,1685926
create     procedure [dbo].[usp_getMyLastYearsReqs] @pUserId int, @pBudgetId int
as
declare @PriorBudgetId int,
		@CurrentBudgetId int

select @PriorBudgetId = rb.BudgetId, @CurrentBudgetId = cb.BudgetId
  from Budgets cb
  join Budgets rb on rb.DistrictId = cb.DistrictId
                 and Year(rb.StartDate) = Year(cb.StartDate) - 1
				 and rb.Active = 1
 where cb.BudgetId = @pBudgetId

select Requisitions.RequisitionId, 
	   Category.Name CategoryName, 
	   Requisitions.RequisitionNumber, 
	   Requisitions.Attention, 
	   coalesce(Requisitions.AccountCode,'') AccountCode, 
	   Requisitions.TotalRequisitionCost Amount, 
	   dbo.uf_RequisitionStatus(Requisitions.RequisitionId) [Status],
	   case when coalesce(ap.StatusId,0) in (6,35,45,49) and nr.ReqNumbers is null then 'Ready to Copy' when nr.ReqNumbers is not null then 'Copied to Req' + case when nr.CopyCount > 1 then 's' else '' end + ' ' + nr.ReqNumbers else 'Set to Skip' end copyStatus,
	   '<input type="radio" id="bfrCopy_' + cast(Requisitions.RequisitionId as varchar) + '" name="bfrGroup_' + cast(Requisitions.RequisitionId as varchar) + '" ' + case when nr.CopyCount > 0 or coalesce(ap.StatusId,0) not in (6,35,45,49) then '' else 'checked' end + ' /><label for="bfrCopy_' + cast(Requisitions.RequisitionId as varchar) + '">Copy</label><br/>' +
	   '<input type="radio" id="bfrSkip_' + cast(Requisitions.RequisitionId as varchar) + '" name="bfrGroup_' + cast(Requisitions.RequisitionId as varchar) + '" ' + case when nr.CopyCount > 0 or coalesce(ap.StatusId,0) not in (6,35,45,49) then 'checked' else '' end + ' /><label for="bfrSkip_' + cast(Requisitions.RequisitionId as varchar) + '">Skip</label>' [Action]
  from Requisitions
  join Category on Category.CategoryId = Requisitions.CategoryId
  outer apply (Select top 1 StatusId from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId order by Approvals.ApprovalDate desc) ap
  outer apply (Select top 1000 String_Agg(cr.RequisitionNumber, ', ') ReqNumbers, count(*) CopyCount from Requisitions cr where cr.BudgetId = @CurrentBudgetId and cr.UserId = @pUserId and cr.BookId = Requisitions.RequisitionId group by cr.BookId order by cr.BookId) nr
 where Requisitions.UserId = @pUserId
   and Requisitions.BudgetId = @PriorBudgetId
 order by Category.Name, Requisitions.RequisitionId
```
