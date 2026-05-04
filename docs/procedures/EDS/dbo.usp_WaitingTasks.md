# Procedure: `dbo.usp_WaitingTasks`

_Generated on 2026-05-04T14:49:07.490Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_WaitingTasks` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2019-08-14 13:07:26 |
| Modified | 2019-08-16 12:13:35 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pUserId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `CSRep` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--exec usp_WaitingTasks 194513

create   procedure usp_WaitingTasks @pUserId int
as
begin
create table #Tasks (
TaskId int identity(1,1) not null primary key,
DistrictId	int not null,
BudgetId	int null,
TaskName	varchar(255) not null,
Priority	int null,
Quantity	int null)


create table #UserList (
UserListId int identity(1,1) not null primary key,
TaskId	int not null,
UserId	int not null)

-- Find Districts that have Reqs at Ready to Bid
insert #Tasks (DistrictId, BudgetId, TaskName, Priority, Quantity)
  select District.DistrictId, Budgets.BudgetId, 'Requisitions Ready to Bid', 1, ReqStatus.ReadyToBidCount
	from District with (nolock)
	join Budgets on Budgets.DistrictId = District.DistrictId
				and getdate() between Budgets.VisibleFrom and Budgets.VisibleUntil
	join CSRep on CSRep.CSRepId = District.CSRepId
	          and CSRep.UserId = @pUserId
	outer apply (select COUNT(*) ReadyToBidCount
				   from Requisitions R1 with (nolock)
				   join Budgets B1 on B1.BudgetId = R1.BudgetId
								  and B1.BudgetId = Budgets.BudgetId
				  where (select top 1 ap.StatusId
						 from Approvals ap
						where ap.RequisitionId = R1.RequisitionId
						order by ap.ApprovalDate desc) = 27) ReqStatus
	where District.Active = 1
	and District.County != 'TEST'
	and isnull(District.State,'') != ''
	and ReqStatus.ReadyToBidCount > 0
	group by District.DistrictId, Budgets.BudgetId, ReqStatus.ReadyToBidCount


-- Find Districts that have Reqs over-Budget
insert #Tasks (DistrictId, BudgetId, TaskName, Priority, Quantity)
  select District.DistrictId, Budgets.BudgetId, 'Requisitions Over-Budget', 2, ReqStatus.ReqsOverBudget
	from District with (nolock)
	join Budgets on Budgets.DistrictId = District.DistrictId
				and getdate() between Budgets.VisibleFrom and Budgets.VisibleUntil
	join CSRep on CSRep.CSRepId = District.CSRepId
	          and CSRep.UserId = @pUserId
	outer apply (select COUNT(*) ReqsOverBudget
				   from Requisitions R1 with (nolock)
				   join Budgets B1 on B1.BudgetId = R1.BudgetId
								  and B1.BudgetId = Budgets.BudgetId
				  where isnull((select top 1 ap.StatusId
						 from Approvals ap
						where ap.RequisitionId = R1.RequisitionId
						order by ap.ApprovalDate desc),0) not in (4, 6, 27)
					and (
						  (select top 1 ba.BudgetAccountId
							 from BudgetAccounts ba with (nolock)
							where ba.BudgetAccountId = R1.BudgetAccountId
							  and ba.UseAllocations = 1
							  and ba.AmountAvailable < 0) IS not null
						 or
						  (select top 1 ua.UserAccountId
							 from UserAccounts ua with (nolock)
							where ua.UserAccountId = R1.UserAccountId
							  and ua.UseAllocations = 1
							  and ua.AllocationAvailable < 0) is not null
						)) ReqStatus
	where District.Active = 1
	and District.County != 'TEST'
	and isnull(District.State,'') != ''
	and ReqStatus.ReqsOverBudget > 0
	group by District.DistrictId, Budgets.BudgetId, ReqStatus.ReqsOverBudget


	-- Find Districts that have Excessive Reqs
insert #Tasks (DistrictId, BudgetId, TaskName, Priority, Quantity)
  select District.DistrictId, Budgets.BudgetId, 'Excessive Requisitions', 3, ReqStatus.ExcessiveReqs
	from District with (nolock)
	join Budgets on Budgets.DistrictId = District.DistrictId
				and getdate() between Budgets.VisibleFrom and Budgets.VisibleUntil
	join CSRep on CSRep.CSRepId = District.CSRepId
	          and CSRep.UserId = @pUserId
	outer apply (select COUNT(*) ExcessiveReqs
				   from Users U1, Category c1 with (nolock)
				  where U1.DistrictId = District.DistrictId
					and U1.Active = 1
					and c1.Active = 1
					and (select COUNT(*)
						   from Requisitions r2 with (nolock)
						  where isnull((select top 1 ap.StatusId
						 from Approvals ap
						where ap.RequisitionId = R2.RequisitionId
						order by ap.ApprovalDate desc),0) not in (4, 6, 27) 
							and r2.UserId = U1.UserId
							and r2.CategoryId = c1.CategoryId
							and r2.BudgetId = Budgets.BudgetId) > 5) ReqStatus
	where District.Active = 1
	and District.County != 'TEST'
	and isnull(District.State,'') != ''
	and ReqStatus.ExcessiveReqs > 0
	group by District.DistrictId, Budgets.BudgetId, ReqStatus.ExcessiveReqs


	-- Find Districts that have Reqs that are not submitted but will need bidding
insert #Tasks (DistrictId, BudgetId, TaskName, Priority, Quantity)
  select District.DistrictId, Budgets.BudgetId, 'Requisitions Not Submitted', 4, ReqStatus.NeedBidding
	from District with (nolock)
	join Budgets on Budgets.DistrictId = District.DistrictId
				and getdate() between Budgets.VisibleFrom and Budgets.VisibleUntil
	join CSRep on CSRep.CSRepId = District.CSRepId
	          and CSRep.UserId = @pUserId
	outer apply (select COUNT(*) NeedBidding
				   from Requisitions R1 
				   join Budgets B1 on B1.BudgetId = R1.BudgetId
								  and B1.BudgetId = Budgets.BudgetId
				  where isnull((select top 1 ap.StatusId
						 from Approvals ap
						where ap.RequisitionId = R1.RequisitionId
						order by ap.ApprovalDate desc),0) not in (4, 27, 29)
					and (select count(*) from Detail D1 with (nolock) where D1.RequisitionId = R1.RequisitionId and D1.ItemMustBeBid = 1) > 0) ReqStatus
	where District.Active = 1
	and District.County != 'TEST'
	and isnull(District.State,'') != ''
	and ReqStatus.NeedBidding > 0
	group by District.DistrictId, Budgets.BudgetId, ReqStatus.NeedBidding


-- Find Districts that have Reqs that have BA Approval and Not Downloaded or Made into PO
insert #Tasks (DistrictId, BudgetId, TaskName, Priority, Quantity)
  select District.DistrictId, Budgets.BudgetId, 'BA Approved Requisitions', 5, ReqStatus.BAApprovals
	from District with (nolock)
	join Budgets on Budgets.DistrictId = District.DistrictId
				and getdate() between Budgets.VisibleFrom and Budgets.VisibleUntil
	join CSRep on CSRep.CSRepId = District.CSRepId
	          and CSRep.UserId = @pUserId
	outer apply (select COUNT(*) BAApprovals
				   from Requisitions R1 with (nolock)
				   join Budgets B1 on B1.BudgetId = R1.BudgetId
								  and B1.BudgetId = Budgets.BudgetId
				  where isnull((select top 1 ap.StatusId
						 from Approvals ap
						where ap.RequisitionId = R1.RequisitionId
						order by ap.ApprovalDate desc),0) not in (4, 6, 27, 35, 45, 48, 49)
					and (select top 1 a.Level
						   from Approvals a with (nolock) 
						  where a.RequisitionId = R1.RequisitionId
						  order by a.ApprovalDate desc, a.ApprovalId desc) = 2) ReqStatus
	where District.Active = 1
	and District.County != 'TEST'
	and isnull(District.State,'') != ''
	and ReqStatus.BAApprovals > 0
	group by District.DistrictId, Budgets.BudgetId, ReqStatus.BAApprovals


select t.Priority, District.Name DistrictName, Budgets.Name Budgetname, t.TaskName, t.Quantity
  from #Tasks t
  join District on District.DistrictId = t.DistrictId
  join Budgets on Budgets.BudgetId = t.BudgetId
 order by t.Priority, District.Name, Budgets.Name

end
```
