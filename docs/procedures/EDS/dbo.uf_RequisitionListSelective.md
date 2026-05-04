# Function: table-valued: `dbo.uf_RequisitionListSelective`

_Generated on 2026-05-04T13:04:00.620Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_RequisitionListSelective` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2009-01-06 15:54:52 |
| Modified | 2011-11-22 14:21:02 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pRSId` | IN | int |  |
| 3 | `@pCategoryId` | IN | int |  |
| 4 | `@pBudgetId` | IN | int |  |
| 5 | `@pAccountId` | IN | int |  |
| 6 | `@pSchoolId` | IN | int |  |
| 7 | `@pUserId` | IN | int |  |
| 8 | `@pStatusId` | IN | int |  |

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
| `District` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `StatusTable` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `dbo.uf_RequisitionIsVisible` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  function [dbo].[uf_RequisitionListSelective] (@pSessionId int, @pRSId int, @pCategoryId int, @pBudgetId int, @pAccountId int, @pSchoolId int, @pUserId int, @pStatusId int)
returns @@PendingApprovals table (
	[SysId] [int] IDENTITY(1,1) NOT NULL primary key,
	[SessionId] [int] NULL,
	[SchoolId] [int] NULL,
	[UserId] [int] NULL,
	[RequisitionId] [int] NULL,
	[BudgetId] [int] NULL,
	[AccountId] [int] NULL,
	[CategoryId] [int] NULL,
	[StatusId] [int] NULL,
	[Amount] [money] NULL,
	[ApprovalLevel] [tinyint] NULL,
	[ApprovalDate] [datetime] NULL,
	[LastApprovalId] [int] NULL,
	[NextApproverId] [int] NULL,
	[LastApproverId] [int] NULL,
    RequisitionNumber varchar(50) null,
    Status varchar(255) null,
    AccountCode varchar(50) null,
    DistrictName varchar(50) null,
    SchoolName varchar(50) null,
    CategoryName varchar(50) null,
    Attention varchar(50) null,
    CometId varchar(10) null,
    DateEntered datetime null,
    OrderDate datetime null,
    POCreated tinyint null,
    BidInfo varchar(255) null,
    TotalAmount money null,
	SelectionCategoryName varchar(50) null,
	SelectionBudgetName varchar(50) null,
	SelectionAccountCode varchar(50) null,
	SelectionSchoolName varchar(50) null,
	SelectionUserName varchar(50) null,
	SelectionStatusName varchar(50) null)
as
begin
declare @SessionId int,
	@SchoolId int,
	@DistrictId int,
	@UserId int,
	@UserApprovalLevel int,
	@DistrictApprovalLevel int,
	@ApprovalStatusId int,
	@PendingStatusId int,
	@OnHoldStatusId int,
	@BudgetId int,
	@DistrictName varchar(50)

select  @SessionId = ISNULL(SessionId,0),
	@SchoolId = ISNULL(SchoolId,0),
	@DistrictId = ISNULL(DistrictId,0),
	@UserId = ISNULL(UserId,0),
	@BudgetId = isnull(BudgetId,0),
        @UserApprovalLevel = ISNULL(ApprovalLevel,0)
  from SessionTable with (nolock)
 where SessionId = convert(int,@pSessionId)
   and SessionEnd is null

select @DistrictApprovalLevel = RequiredApprovalLevel,
	   @DistrictName = District.Name
  from District with (nolock)
 where DistrictId = @DistrictId

select @ApprovalStatusId = StatusId
  from StatusTable with (nolock)
 where StatusCode = 'A'

select @PendingStatusId = StatusId
  from StatusTable with (nolock)
 where StatusCode = 'P'

select @OnHoldStatusId = StatusId
  from StatusTable with (nolock)
 where StatusCode = 'H'

insert @@PendingApprovals (SessionId, SchoolId, UserId, RequisitionId, BudgetId, AccountId, CategoryId, Amount, ApprovalLevel, StatusId, LastApprovalId, RequisitionNumber,
    AccountCode,
    DistrictName,
    SchoolName,
    CategoryName,
    Attention,
    CometId,
    DateEntered,
    OrderDate,
    POCreated,
    BidInfo,
	SelectionCategoryName,
	SelectionBudgetName,
	SelectionAccountCode,
	SelectionSchoolName,
	SelectionUserName,
	SelectionStatusName)
  select @SessionId, Requisitions.SchoolId, Requisitions.UserId, 
         Requisitions.RequisitionId, 
         Requisitions.BudgetId, BudgetAccounts.AccountId, Requisitions.CategoryId,
         ISNULL(Requisitions.TotalRequisitionCost,0) TotalRequisitionCost,
         isnull((select top 1 Approvals.Level from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId Order by ApprovalDate desc),0) ApprovalLevel,
         isnull((select top 1 Approvals.StatusId from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId Order by ApprovalDate desc),@OnHoldStatusId) StatusId,
         isnull((select top 1 Approvals.ApprovalId from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId Order by ApprovalDate desc),@OnHoldStatusId) LastApprovalId,
         RequisitionNumber,
         Accounts.Code as AccountCode, 
         isnull(@DistrictName,'') as DistrictName,
         School.[Name] as SchoolName, 
         Category.[Name] as CategoryName, 
         Requisitions.Attention, 
         RIGHT('00000' + convert(varchar(6),Users.CometId),5) as CometId, 
         Requisitions.DateEntered, 
         Requisitions.OrderDate, 
         case isnull((select top 1 PO.POId from PO where PO.RequisitionId = Requisitions.RequisitionId order by PO.POId),0)
           when 0 then 0 
           else 1 
         end POCreated, 
         case isnull(BidHeaders.BidHeaderId,0) 
           when 0 then 'Not Bid' 
           else convert(varchar(16),BidHeaders.BidHeaderId) + ' - ' + convert(varchar(32),BidHeaders.BidAwardDate,101) 
         end BidInfo,
	isnull((select top 1 Name from Category where Category.CategoryId = @pCategoryId),'All Categories'),
	isnull((select top 1 Name from Budgets where Budgets.BudgetId = @pBudgetId),'All Budgets'),
	isnull((select top 1 Code from Accounts where Accounts.AccountId = @pAccountId),'All Accounts'),
	isnull((select top 1 Name from School where School.SchoolId = @pSchoolId),'All Schools'),
	substring(isnull((select top 1 Attention from Users where Users.UserId = @pUserId),'All Users'),1,50),
	substring(isnull((select top 1 StatusTable.Name + case isnull(@pStatusId,0) / 16777216 when 0 then '' else ' by ' + Users.Attention end from StatusTable left outer join Users on Users.UserId = @pStatusId & 16777215 where StatusTable.StatusId = @pStatusId / 16777216),'All Statuses'),1,50)
    from Requisitions with (nolock)
    join ReportSessionLinks rsl on rsl.IntId = Requisitions.RequisitionId
                               and rsl.RSId = @pRSId
    left outer join BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId
    LEFT OUTER JOIN School on School.SchoolId = Requisitions.SchoolId
    LEFT OUTER JOIN Category on Category.CategoryId = Requisitions.CategoryId
    LEFT OUTER JOIN Users on Users.UserId = Requisitions.UserId
    LEFT OUTER JOIN UserAccounts on UserAccounts.UserAccountId = Requisitions.UserAccountId and UserAccounts.Active = 1
    LEFT OUTER JOIN Accounts on Accounts.AccountId = UserAccounts.AccountId
    LEFT OUTER JOIN BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId
   Where Requisitions.BudgetId = @BudgetId
     and dbo.uf_RequisitionIsVisible(@SessionId,Requisitions.RequisitionId) = 1
   AND isnull(Requisitions.CategoryId,0) = case isnull(@pCategoryId,0) when 0 then isnull(Requisitions.CategoryId,0) else isnull(@pCategoryId,0) end
   AND isnull(BudgetAccounts.AccountId,0) = case isnull(@pAccountId,0) when 0 then isnull(BudgetAccounts.AccountId,0) else isnull(@pAccountId,0) end
   AND isnull(Requisitions.SchoolId,0) = case isnull(@pSchoolId,0) when 0 then isnull(Requisitions.SchoolId,0)  else isnull(@pSchoolId,0) end
   AND isnull(Requisitions.UserId,0) = case isnull(@pUserId,0) when 0 then isnull(Requisitions.UserId,0) else isnull(@pUserId,0) end
--   AND isnull((select top 1 Approvals.StatusId from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId Order by ApprovalDate desc),@OnHoldStatusId) = case isnull(@pStatusId,0) when 0 then isnull((select top 1 Approvals.StatusId from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId Order by ApprovalDate desc),@OnHoldStatusId) else isnull(@pStatusId,0) end

update @@PendingApprovals
   set LastApproverId = Users.UserId,
       NextApproverId = Approvals.ApproverId --Users.ApproverId
  from @@PendingApprovals PendingApprovals
  join Approvals on Approvals.ApprovalId = PendingApprovals.LastApprovalId
  join Users on Users.UserId = Approvals.ApprovalById
 where SessionId = @SessionId

/*
update @@PendingApprovals
   set ApprovalLevel = @UserApprovalLevel,
       StatusId = @PendingStatusId
  from @@PendingApprovals
 where SessionId = @SessionId
   and NextApproverId = @UserId
   and (StatusId = @ApprovalStatusId or StatusId = @PendingStatusId)
*/
update @@PendingApprovals
   set ApprovalLevel = @UserApprovalLevel,
       StatusId = (isnull(PendingApprovals.StatusId,0) * 16777216) + 
                     case isnull(PendingApprovals.StatusId,0) 
                       when 29 then isnull((select top 1 BidHeaders.BidHeaderId 
                                              from BidHeaderDetail 
                                              join BidHeaders on BidHeaders.BidHeaderId = BidHeaderDetail.BidHeaderId 
                                                             and BidHeaders.Active = 1 
                                              join Detail on Detail.DetailId = BidHeaderDetail.DetailId 
                                              join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId 
                                                               and Requisitions.RequisitionId = PendingApprovals.RequisitionId 
                                             order by BidHeaders.BidHeaderId desc),0) 
                       else isnull(case PendingApprovals.StatusId 
                                     when 2 then NextApprover.UserId 
                                     else LastApprover.UserId 
                                   end,0)
                     end
  from @@PendingApprovals PendingApprovals
  JOIN StatusTable on StatusTable.StatusId = PendingApprovals.StatusId
    LEFT OUTER JOIN Users LastApprover on LastApprover.UserId = PendingApprovals.LastApproverId
    LEFT OUTER JOIN Users NextApprover on NextApprover.UserId = PendingApprovals.NextApproverId
-- where PendingApprovals.SessionId = @SessionId
--   and PendingApprovals.NextApproverId = @UserId
--   and (PendingApprovals.StatusId = @ApprovalStatusId or PendingApprovals.StatusId = @PendingStatusId)

update @@PendingApprovals
   set Status =  case isnull(PendingApprovals.StatusId,0) 
                   when 29 then StatusTable.Name + ' on Bid ' + convert(varchar(16),isnull((select top 1 BidHeaders.BidHeaderId from BidHeaderDetail join BidHeaders on BidHeaders.BidHeaderId = BidHeaderDetail.BidHeaderId and BidHeaders.Active = 1 join Detail on Detail.DetailId = BidHeaderDetail.DetailId join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId and Requisitions.RequisitionId = PendingApprovals.RequisitionId order by BidHeaders.BidHeaderId desc),0)) 
                   else isnull(StatusTable.Name,'On Hold') + isnull(case isnull(PendingApprovals.StatusId / 16777216,0) when 2 then ' by ' + NextApprover.Attention else ' by ' + LastApprover.Attention end,'') 
                 end 
  from @@PendingApprovals PendingApprovals
  JOIN StatusTable on StatusTable.StatusId = (PendingApprovals.StatusId / 16777216)
    LEFT OUTER JOIN Users LastApprover on LastApprover.UserId = PendingApprovals.LastApproverId
    LEFT OUTER JOIN Users NextApprover on NextApprover.UserId = PendingApprovals.NextApproverId

/*
if isnull(@pStatusId,0) != 0
begin
  delete @@pendingApprovals
    from @@PendingApprovals PendingApprovals
   where PendingApprovals.StatusId != @pStatusId
end
*/

update @@pendingApprovals
   set TotalAmount = (select sum(Amount) from @@PendingApprovals)

return
end
```
