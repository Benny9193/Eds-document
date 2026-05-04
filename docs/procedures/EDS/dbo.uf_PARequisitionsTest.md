# Function: table-valued: `dbo.uf_PARequisitionsTest`

_Generated on 2026-05-04T13:43:19.063Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_PARequisitionsTest` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2006-06-26 16:49:15 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pCategoryId` | IN | int |  |
| 3 | `@pBudgetId` | IN | int |  |
| 4 | `@pAccountId` | IN | int |  |
| 5 | `@pSchoolId` | IN | int |  |
| 6 | `@pUserId` | IN | int |  |
| 7 | `@pStatusId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `Approvals` | USER_TABLE |  |
| `BidHeaderDetail` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `StatusTable` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `dbo.Requisitions` | USER_TABLE |  |
| `dbo.uf_RequisitionIsVisible` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_SetSortSeq` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--select * from uf_PARequisitions(618919, null, 3055, null, null, null, 50569889/*33792673*/)


create function dbo.uf_PARequisitionsTest (@pSessionId int, @pCategoryId int, @pBudgetId int, @pAccountId int, @pSchoolId int, @pUserId int, @pStatusId int)
returns @ReqList table (
SysId int,
RequisitionId int null,
RequisitionNumber varchar(50) null,
Amount money null,
Status varchar(255) null,
ApprovalLevel tinyint null,
AccountCode varchar(50) null,
SchoolName varchar(64) null,
CategoryName varchar(64) null,
Attention varchar(64) null,
CometId varchar(10) null,
CategoryId int null,
BudgetId int null,
AccountId int null,
SchoolId int null,
UserId int null,
StatusId int null,
TotalAmount money null,
SelectionCategoryName varchar(50) null,
SelectionBudgetName varchar(50) null,
SelectionAccountCode varchar(50) null,
SelectionSchoolName varchar(50) null,
SelectionUserName varchar(64) null,
SelectionStatusName varchar(255) null
)
AS
begin
declare @TotalAmount money

insert @ReqList (SysId, RequisitionId, RequisitionNumber, Amount, Status, ApprovalLevel, 
                 AccountCode, SchoolName, CategoryName, Attention, CometId, CategoryId, 
                 BudgetId, AccountId, SchoolId, UserId, StatusId, 
                 SelectionCategoryName, SelectionBudgetName, SelectionAccountCode, 
                 SelectionSchoolName, SelectionUserName, SelectionStatusName)
  SELECT PendingApprovals.SysId, PendingApprovals.RequisitionId, Requisitions.RequisitionNumber, 
         PendingApprovals.Amount, 
         isnull(StatusTable.Name,'On Hold') + isnull(case PendingApprovals.StatusId when 2 then ' by ' + NextApprover.Attention else ' by ' + LastApprover.Attention end,'') Status,
     --  StatusTable.Name + ' at Level ' + convert(varchar(10),isnull(PendingApprovals.ApprovalLevel,0)) as Status, 
         isnull(PendingApprovals.ApprovalLevel,0) ApprovalLevel, Accounts.Code as AccountCode, 
         School.[Name] as SchoolName, Category.[Name] as CategoryName, Users.Attention, 
         RIGHT('00000' + convert(varchar(6),Users.CometId),5) as CometId, 
         isnull(PendingApprovals.CategoryId,0), isnull(PendingApprovals.BudgetId,0), 
         isnull(PendingApprovals.AccountId,0), isnull(PendingApprovals.SchoolId,0), 
         isnull(PendingApprovals.UserId,0), 
         isnull((PendingApprovals.StatusId * 16777216) + 
           case isnull(PendingApprovals.StatusId,0)
             when 29 then isnull(bh.BidHeaderId,0)
             else isnull(case PendingApprovals.StatusId when 2 then NextApprover.UserId else LastApprover.UserId end,0)
           end,0) StatusId,
         case isnull(sc.CategoryId,0) when 0 then 'All Categories' else sc.[Name] end,
         case isnull(sb.BudgetId,0) when 0 then 'All Budgets' else sb.[Name] end,
         case isnull(sa.AccountId,0) when 0 then 'All Accounts' else sa.[Code] end,
         case isnull(ss.SchoolId,0) when 0 then 'All Schools' else ss.[Name] end,
         case isnull(su.UserId,0) when 0 then 'All Users' else su.[Attention] end,
         case isnull(st.StatusId,0) when 0 then 'All Statuses' else st.[Name] end
     from (
  select @pSessionId SessionId, Requisitions.SchoolId, Requisitions.UserId, 
         Requisitions.RequisitionId, 
         Requisitions.BudgetId, BudgetAccounts.AccountId, Requisitions.CategoryId,
         ISNULL(Requisitions.TotalRequisitionCost,0) TotalRequisitionCost,
         isnull(Approvals.Level,0) ApprovalLevel,
         isnull(Approvals.StatusId,1 /*@OnHoldStatusId*/) StatusId,
         isnull(Approvals.ApprovalId,0) LastApprovalId,
         Approvals.ApprovalById LastApproverId,
         Approvals.ApproverId NextApproverId,
         null SysId,
         Requisitions.TotalRequisitionCost Amount
    from Requisitions with (nolock)
    left outer join BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId
    left outer join Approvals on Approvals.ApprovalId = (select top 1 Approvals.ApprovalId from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId Order by ApprovalDate desc)
   Where Requisitions.BudgetId = @pBudgetId
     and dbo.uf_RequisitionIsVisible(@pSessionId,Requisitions.RequisitionId) = 1) PendingApprovals
--    FROM PendingApprovals
    JOIN SessionTable on SessionTable.SessionId = PendingApprovals.SessionId
    JOIN dbo.Requisitions on dbo.Requisitions.RequisitionId = PendingApprovals.RequisitionId
    JOIN StatusTable on StatusTable.StatusId = PendingApprovals.StatusId
    LEFT OUTER JOIN School on School.SchoolId = Requisitions.SchoolId
    LEFT OUTER JOIN Category on Category.CategoryId = Requisitions.CategoryId
    LEFT OUTER JOIN Users on Users.UserId = Requisitions.UserId
    LEFT OUTER JOIN BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId
    LEFT OUTER JOIN Accounts on Accounts.AccountId = BudgetAccounts.AccountId
    Left Outer Join Category sc on sc.CategoryId = @pCategoryId
    Left Outer Join Budgets sb on sb.BudgetId = @pBudgetId
    Left Outer Join Accounts sa on sa.AccountId = @pAccountId
    Left Outer Join School ss on ss.SchoolId = @pSchoolId
    Left Outer Join Users su on su.UserId = @pUserId
    Left Outer Join StatusTable st on st.StatusId = @pStatusId
    LEFT OUTER JOIN Users LastApprover on LastApprover.UserId = PendingApprovals.LastApproverId 
    LEFT OUTER JOIN Users NextApprover on NextApprover.UserId = PendingApprovals.NextApproverId 
    left outer join BidHeaders bh on bh.BidHeaderId = (select top 1 BidHeaders.BidHeaderId from BidHeaderDetail join BidHeaders on BidHeaders.BidHeaderId = BidHeaderDetail.BidHeaderId and BidHeaders.Active = 1 join Detail on Detail.DetailId = BidHeaderDetail.DetailId join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId and Requisitions.RequisitionId = PendingApprovals.RequisitionId order by BidHeaders.BidHeaderId desc)
   WHERE PendingApprovals.SessionId = @pSessionId
   ORDER BY dbo.uf_SetSortSeq(Requisitions.RequisitionNumber)

if isnull(@pCategoryId,0) != 0
begin
  delete @ReqList 
   where CategoryId != @pCategoryId
end

if isnull(@pBudgetId,0) != 0
begin
  delete @ReqList 
   where BudgetId != @pBudgetId
end

if isnull(@pAccountId,0) != 0
begin
  delete @ReqList 
   where AccountId != @pAccountId
end

if isnull(@pSchoolId,0) != 0
begin
  delete @ReqList 
   where SchoolId != @pSchoolId
end

if isnull(@pUserId,0) != 0
begin
  delete @ReqList 
   where UserId != @pUserId
end

if isnull(@pStatusId,0) != 0
begin
  delete @ReqList 
   where StatusId != @pStatusId
end

select @TotalAmount = sum(Amount)
  from @ReqList

Update @ReqList
   Set TotalAmount = @TotalAmount

return
end
```
