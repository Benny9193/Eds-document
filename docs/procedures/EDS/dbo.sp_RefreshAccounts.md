# Procedure: `dbo.sp_RefreshAccounts`

_Generated on 2026-05-04T13:43:18.892Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_RefreshAccounts` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-12-12 13:22:13 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BudgetAccounts` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure sp_RefreshAccounts AS

set transaction isolation level serializable

begin transaction

Update UserAccounts
   set AllocationAvailable = AllocationAmount
 where UseAllocations = 1

update UserAccounts
   set AllocationAvailable = AllocationAvailable - Requisitions.TotalRequisitionCost
  from UserAccounts
  join Requisitions on Requisitions.UserAccountId = UserAccounts.UserAccountId
 where UserAccounts.UseAllocations = 1

Update BudgetAccounts
   set AmountAvailable = BudgetAmount
 where UseAllocations = 1

Update BudgetAccounts
   set AmountAvailable = AmountAvailable - Requisitions.TotalRequisitionCost
  from BudgetAccounts
  join Requisitions on Requisitions.BudgetAccountId = BudgetAccounts.BudgetAccountId
 where UseAllocations = 1

commit transaction
```
