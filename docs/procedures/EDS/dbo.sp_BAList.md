# Procedure: `dbo.sp_BAList`

_Generated on 2026-05-04T13:43:18.699Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_BAList` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-08-24 14:40:44 |
| Modified | 2010-05-25 14:11:18 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE     procedure [dbo].[sp_BAList] @pSessionId varchar(255) AS

declare @SessionId int,
	@ApprovalLevel int,
	@UserId int

select @SessionId = convert(int,@pSessionId)

select @ApprovalLevel = ISNULL(ApprovalLevel,0),
       @UserId = ISNULL(UserId,0)
  from SessionTable
--  join Users on Users.UserId = SessionTable.UserId
 where SessionTable.SessionId = @SessionId

if @ApprovalLevel > 1
begin
  select Accounts.Code AccountCode, isnull(rt.RequisitionsTotal,0) RequisitionsTotal, 
         isnull(BudgetAccounts.BudgetAmount,0) BudgetAmount,
         isnull(BudgetAccounts.AmountAvailable,0) AmountAvailable, 
         isnull(ua.AllocationUsed,0) AllocationTotal, 
         isnull(ua.AllocationTotal,0) AllocatedAmount,
         isnull(BudgetAccounts.UseAllocations,0) UseBudgetAllocations, 
         0 UseUserAllocations
    from BudgetAccounts
    join Accounts on Accounts.AccountId = BudgetAccounts.AccountId
                 and Accounts.Active = 1
    join SessionTable on SessionTable.BudgetId = BudgetAccounts.BudgetId
                     and BudgetAccounts.Active = 1
    join (
      select UserAccounts.BudgetAccountId, sum(UserAccounts.AllocationAmount) AllocationTotal, sum(ss.RequisitionsTotal) AllocationUsed
        from UserAccounts
        join (
          select Requisitions.UserAccountId, sum(Requisitions.TotalRequisitionCost) RequisitionsTotal
            from Requisitions
           group by Requisitions.UserAccountId, Requisitions.Active
          having Requisitions.Active = 1
             ) ss on ss.UserAccountId = UserAccounts.UserAccountId
       group by UserAccounts.BudgetAccountId, UserAccounts.Active
      having UserAccounts.Active = 1
           ) ua on ua.BudgetAccountId = BudgetAccounts.BudgetAccountId
    left outer join (
      select Requisitions.BudgetAccountId, sum(Requisitions.TotalRequisitionCost) RequisitionsTotal
        from Requisitions
       group by Requisitions.BudgetAccountId, Requisitions.Active
      having Requisitions.Active = 1
          ) rt on rt.BudgetAccountId = BudgetAccounts.BudgetAccountId
   where SessionTable.SessionId = convert(int,@pSessionId)
     and BudgetAccounts.Active = 1
   order by AccountCode
end
else
begin
  select Accounts.Code AccountCode, isnull(rt.RequisitionsTotal,0) RequisitionsTotal, 
         isnull(BudgetAccounts.BudgetAmount,0) BudgetAmount,
         isnull(BudgetAccounts.AmountAvailable,0) AmountAvailable, 
         isnull(ua.AllocationUsed,0) AllocationTotal, 
         isnull(ua.AllocationTotal,0) AllocatedAmount,
         isnull(BudgetAccounts.UseAllocations,0) UseBudgetAllocations, 
         isnull(ua.UseAllocations,0) UseUserAllocations
    from BudgetAccounts
    join Accounts on Accounts.AccountId = BudgetAccounts.AccountId
                 and Accounts.Active = 1
    join SessionTable on SessionTable.BudgetId = BudgetAccounts.BudgetId
                     and BudgetAccounts.Active = 1
    join (
      select UserAccounts.BudgetAccountId, UserAccounts.UseAllocations, sum(UserAccounts.AllocationAmount) AllocationTotal, sum(ss.RequisitionsTotal) AllocationUsed
        from UserAccounts
        join (
          select Requisitions.UserAccountId, sum(Requisitions.TotalRequisitionCost) RequisitionsTotal
            from Requisitions
           group by Requisitions.UserAccountId, Requisitions.Active
          having Requisitions.Active = 1
             ) ss on ss.UserAccountId = UserAccounts.UserAccountId
       group by UserAccounts.BudgetAccountId, UserAccounts.UseAllocations, UserAccounts.Active, UserAccounts.UserId
      having UserAccounts.UserId = @UserId
         and UserAccounts.Active = 1
           ) ua on ua.BudgetAccountId = BudgetAccounts.BudgetAccountId
    left outer join (
      select Requisitions.BudgetAccountId, sum(Requisitions.TotalRequisitionCost) RequisitionsTotal
        from Requisitions
        join School on School.SchoolId = Requisitions.SchoolId
       group by Requisitions.BudgetAccountId, Requisitions.Active, Requisitions.UserId
      having Requisitions.UserId = @UserId
         and Requisitions.Active = 1
          ) rt on rt.BudgetAccountId = BudgetAccounts.BudgetAccountId
   where SessionTable.SessionId = convert(int,@pSessionId)
     and BudgetAccounts.Active = 1
   order by AccountCode
end
```
