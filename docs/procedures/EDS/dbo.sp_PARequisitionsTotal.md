# Procedure: `dbo.sp_PARequisitionsTotal`

_Generated on 2026-05-04T13:07:57.499Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_PARequisitionsTotal` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-06-30 12:55:52 |
| Modified | 2003-06-30 12:55:52 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | varchar(255) |  |
| 2 | `@pCategoryId` | IN | varchar(255) |  |
| 3 | `@pBudgetId` | IN | varchar(255) |  |
| 4 | `@pAccountId` | IN | varchar(255) |  |
| 5 | `@pSchoolId` | IN | varchar(255) |  |
| 6 | `@pUserId` | IN | varchar(255) |  |
| 7 | `@pStatusId` | IN | varchar(255) |  |

## Depends on

_None resolved._

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE                PROCEDURE dbo.sp_PARequisitionsTotal @pSessionId varchar(255), @pCategoryId varchar(255), @pBudgetId varchar(255), @pAccountId varchar(255), @pSchoolId varchar(255), @pUserId varchar(255), @pStatusId varchar(255) AS

declare @DynamicSelect varchar(4096)

set transaction isolation level read uncommitted
select @DynamicSelect = 'set transaction isolation level read uncommitted' +
                        ' SELECT ISNULL(sum(PendingApprovals.Amount),0) as TotalAmount' + 
                        ' FROM dbo.PendingApprovals with (nolock)' +
                        ' JOIN SessionTable on SessionTable.SessionId = PendingApprovals.SessionId' +
--                        '                   and (SessionTable.ApprovalLevel <= PendingApprovals.ApprovalLevel' +
--                        '                     or SessionTable.ApprovalLevel >= 5)' +
                        ' JOIN dbo.Requisitions on dbo.Requisitions.RequisitionId = dbo.PendingApprovals.RequisitionId ' +
                        ' JOIN StatusTable on StatusTable.StatusId = PendingApprovals.StatusId ' +
--                        ' LEFT OUTER JOIN School on School.SchoolId = Requisitions.SchoolId ' +
--                        ' LEFT OUTER JOIN Category on Category.CategoryId = Requisitions.CategoryId ' +
--                        ' LEFT OUTER JOIN Users on Users.UserId = Requisitions.UserId ' +
--                        ' LEFT OUTER JOIN BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId ' +
--                        ' LEFT OUTER JOIN Accounts on Accounts.AccountId = BudgetAccounts.AccountId ' +
                        ' LEFT OUTER JOIN Users LastApprover on LastApprover.UserId = PendingApprovals.LastApproverId ' +
                        ' LEFT OUTER JOIN Users NextApprover on NextApprover.UserId = PendingApprovals.NextApproverId ' +
                        '  left outer join BidHeaders bh on bh.BidHeaderId = (select top 1 BidHeaders.BidHeaderId from BidHeaderDetail join BidHeaders on BidHeaders.BidHeaderId = BidHeaderDetail.BidHeaderId and BidHeaders.Active = 1 and isnull(BidHeaders.BidType,2) = 2 join Detail on Detail.DetailId = BidHeaderDetail.DetailId join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId and Requisitions.RequisitionId = PendingApprovals.RequisitionId order by BidHeaders.BidHeaderId desc)' +
                        ' WHERE SessionTable.SessionId = ' + @pSessionId
--                        '   and dbo.uf_RequisitionIsVisible(' + @pSessionId + ',Requisitions.RequisitionId) = 1'

if CONVERT(int,@pCategoryId) <> 0
begin
  select @DynamicSelect = @DynamicSelect + ' AND isnull(PendingApprovals.CategoryId,0) = ' + @pCategoryId
end

if CONVERT(int,@pBudgetId) <> 0
begin
  select @DynamicSelect = @DynamicSelect + ' AND isnull(PendingApprovals.BudgetId,0) = ' + @pBudgetId
end

if CONVERT(int,@pAccountId) <> 0
begin
  select @DynamicSelect = @DynamicSelect + ' AND isnull(PendingApprovals.AccountId,0) = ' + @pAccountId
end

if CONVERT(int,@pSchoolId) <> 0
begin
  select @DynamicSelect = @DynamicSelect + ' AND isnull(PendingApprovals.SchoolId,0) = ' + @pSchoolId
end

if CONVERT(int,@pUserId) <> 0
begin
  select @DynamicSelect = @DynamicSelect + ' AND isnull(PendingApprovals.UserId,0) = ' + @pUserId
end

if CONVERT(int,@pStatusId) <> 0
begin
  select @DynamicSelect = @DynamicSelect + ' AND isnull((dbo.PendingApprovals.StatusId * 16777216) + case isnull(PendingApprovals.StatusId,0) ' +
                        '   when 29 then isnull(bh.BidHeaderId,0) ' + 
                        '   else isnull(case PendingApprovals.StatusId when 2 then NextApprover.UserId else LastApprover.UserId end,0)  ' +
                        ' end,0) = ' + @pStatusId
end

execute(@DynamicSelect)
```
