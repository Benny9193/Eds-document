# Procedure: `dbo.sp_PARequisitions`

_Generated on 2026-05-04T14:49:07.303Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_PARequisitions` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-06-30 12:55:51 |
| Modified | 2003-06-30 12:55:51 |
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
--sp_PARequisitionsTest '1264774', '', '4351', '', '', '', ''

CREATE  PROCEDURE dbo.sp_PARequisitions @pSessionId varchar(255), @pCategoryId varchar(255), @pBudgetId varchar(255), @pAccountId varchar(255), @pSchoolId varchar(255), @pUserId varchar(255), @pStatusId varchar(255) AS

declare @DynamicSelect varchar(4096)

set transaction isolation level read uncommitted
select @DynamicSelect = 'set transaction isolation level read uncommitted' +
                        ' SELECT PendingApprovals.SysId, PendingApprovals.RequisitionId, Requisitions.RequisitionNumber, PendingApprovals.Amount, ' +
                        ' case isnull(PendingApprovals.StatusId,0) ' +
                        '   when 29 then StatusTable.Name + '' on Bid '' + convert(varchar(16),isnull(bh.BidHeaderId,0)) ' + 
                        '   else isnull(StatusTable.Name,''On Hold'') + isnull(case PendingApprovals.StatusId when 2 then '' by '' + NextApprover.Attention else '' by '' + LastApprover.Attention end,'''') ' +
                        ' end Status, isnull(PendingApprovals.ApprovalLevel,0) ApprovalLevel, Accounts.Code as AccountCode, School.[Name] as SchoolName, Category.[Name] as CategoryName, Requisitions.Attention, RIGHT(''00000'' + convert(varchar(6),Users.CometId),5) as CometId, Requisitions.DateEntered, Requisitions.OrderDate, case StatusTable.StatusCode when ''O'' then 1 else 0 end POCreated, case isnull(BidHeaders.BidHeaderId,0) when 0 then ''Not Bid'' else convert(varchar(16),BidHeaders.BidHeaderId) + '' - '' + convert(varchar(32),BidHeaders.BidAwardDate,101) end BidInfo,' + 
                        'isnull((dbo.PendingApprovals.StatusId * 16777216) + case isnull(PendingApprovals.StatusId,0) ' +
                        '   when 29 then isnull(bh.BidHeaderId,0) ' + 
                        '   else isnull(case PendingApprovals.StatusId when 2 then NextApprover.UserId else LastApprover.UserId end,0)  ' +
                        ' end,0) Stat, case isnull(UserAccounts.UseAllocations,0) when 0 then case isnull(BudgetAccounts.UseAllocations,0) when 0 then 0 else isnull(BudgetAccounts.AmountAvailable,0) end else isnull(UserAccounts.AllocationAvailable,0) end Available FROM dbo.PendingApprovals with (nolock)' +
                        ' JOIN SessionTable on SessionTable.SessionId = PendingApprovals.SessionId' +
--                        '                   and (SessionTable.ApprovalLevel <= PendingApprovals.ApprovalLevel' +
--                        '                     or SessionTable.ApprovalLevel >= 5)' +
                        ' JOIN dbo.Requisitions on dbo.Requisitions.RequisitionId = dbo.PendingApprovals.RequisitionId ' +
                        ' JOIN StatusTable on StatusTable.StatusId = PendingApprovals.StatusId ' +
                        ' LEFT OUTER JOIN School on School.SchoolId = Requisitions.SchoolId ' +
                        ' LEFT OUTER JOIN Category on Category.CategoryId = Requisitions.CategoryId ' +
                        ' LEFT OUTER JOIN Users on Users.UserId = Requisitions.UserId ' +
                        ' LEFT OUTER JOIN BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId ' +
                        ' LEFT OUTER JOIN UserAccounts on UserAccounts.UserAccountId = Requisitions.UserAccountId and UserAccounts.Active = 1 ' +
                        ' LEFT OUTER JOIN Accounts on Accounts.AccountId = UserAccounts.AccountId ' +
                        ' Left Outer JOIN Approvals on Approvals.ApprovalId = PendingApprovals.LastApprovalId ' +
                        ' LEFT OUTER JOIN Users LastApprover on LastApprover.UserId = PendingApprovals.LastApproverId ' +
                        ' LEFT OUTER JOIN Users NextApprover on NextApprover.UserId = PendingApprovals.NextApproverId ' +
                        ' LEFT OUTER JOIN BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId ' +
                        '  left outer join BidHeaders bh on bh.BidHeaderId = (select top 1 BidHeaders.BidHeaderId from BidHeaderDetail join BidHeaders on BidHeaders.BidHeaderId = BidHeaderDetail.BidHeaderId and BidHeaders.Active = 1 and isnull(BidHeaders.BidType,2) = 2 join Detail on Detail.DetailId = BidHeaderDetail.DetailId join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId and Requisitions.RequisitionId = PendingApprovals.RequisitionId order by BidHeaders.BidHeaderId desc)' +
                        ' WHERE PendingApprovals.SessionId = ' + @pSessionId 
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

select @DynamicSelect = @DynamicSelect + ' ORDER BY Category.Name, Users.CometId, Requisitions.RequisitionNumber'

execute(@DynamicSelect)
```
