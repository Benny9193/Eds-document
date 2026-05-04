# Procedure: `dbo.sp_MoveReqs`

_Generated on 2026-05-04T13:04:00.417Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_MoveReqs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2014-04-07 11:35:31 |
| Modified | 2014-04-07 20:44:09 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@SourceBudget` | IN | int |  |
| 2 | `@TargetBudget` | IN | int |  |
| 3 | `@ReqNumbers` | IN | varchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure dbo.sp_MoveReqs  @SourceBudget int, @TargetBudget int, @ReqNumbers varchar(max) as

-- Create Budget Accounts as needed
insert BudgetAccounts (AccountId, Active, BudgetAmount, BudgetId, UseAllocations)
select a.AccountId, 1, bas.BudgetAmount, bt.BudgetId, bas.UseAllocations
  from BudgetAccounts bas
  join Accounts a on a.AccountId = bas.AccountId
  join Budgets bs on bs.BudgetId = bas.BudgetId
                 and bs.BudgetId = @SourceBudget
  join Budgets bt on bt.BudgetId = @TargetBudget
                 and bt.DistrictId = bs.DistrictId
  left outer join BudgetAccounts bat on bat.BudgetId = bt.BudgetId
                                    and bat.AccountId = a.AccountId
                                    and bat.Active = 1
 where bat.BudgetAccountId is null

-- Create Budget Accounts as needed
insert UserAccounts (AccountId, Active, BudgetId, UseAllocations, AllocationAmount, BudgetAccountId, UserId)
select a.AccountId, 1, bt.BudgetId, uas.UseAllocations, uas.AllocationAmount, bat.BudgetAccountId, uas.UserId
  from UserAccounts uas
  join BudgetAccounts bas on bas.BudgetAccountId = uas.BudgetAccountId
  join Accounts a on a.AccountId = uas.AccountId
  join Budgets bs on bs.BudgetId = uas.BudgetId
                 and bs.BudgetId = @SourceBudget
  join Budgets bt on bt.BudgetId = @TargetBudget
                 and bt.DistrictId = bs.DistrictId
  join BudgetAccounts bat on bat.BudgetId = bt.BudgetId
                         and bat.AccountId = a.AccountId
                         and bat.Active = 1
  left outer join UserAccounts uat on uat.BudgetId = bt.BudgetId
                                  and uat.AccountId = a.AccountId
                                  and uat.UserId = uas.UserId
 where uat.UserAccountId is null

--select Requisitions to Move
Update Requisitions
   set BudgetAccountId = Bat.BudgetAccountId,
       UserAccountId = uat.UserAccountId,
       BudgetId = @TargetBudget
--select *
  from Requisitions
  join BudgetAccounts bas on bas.BudgetAccountId = Requisitions.BudgetAccountId
  join UserAccounts uas on uas.UserAccountId = Requisitions.UserAccountId
  left outer join BudgetAccounts bat on bat.BudgetId = @TargetBudget
                                    and bat.AccountId = bas.AccountId
                                    and bat.Active = 1
  left outer join UserAccounts uat on uat.BudgetId = @TargetBudget
                                  and uat.AccountId = uas.AccountId
                                  and uat.UserId = uas.UserId
                                  and uat.BudgetAccountId = bat.BudgetAccountId
 where Requisitions.BudgetId = @SourceBudget
   and DateEntered < cast('04/04/2014' as datetime)
   and Requisitions.RequisitionNumber not in ('326','472','575','683','755','757','770','775','776','783','787','799','801','824','880','881','885','886','895','898','909','911','913','923','927','928','930','932','942','986','989')
```
