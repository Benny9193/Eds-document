# Procedure: `dbo.sp_ReturnUserReqs`

_Generated on 2026-05-04T14:49:07.318Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_ReturnUserReqs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-08-24 14:40:45 |
| Modified | 2013-02-22 16:16:21 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `CXmlSession` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `StatusTable` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `dbo.uf_RequisitionIsVisible` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_RequisitionStatus` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE           PROCEDURE [dbo].[sp_ReturnUserReqs] @pSessionId int AS

declare @HoldId int

set Transaction isolation level read uncommitted

-- Validate Session
UPDATE SessionTable
   SET SessionLast = GetDate()
 WHERE SessionId = @pSessionId
   AND SessionEnd is null

-- Get On Hold Id
select @HoldId = ISNULL(StatusId,0)
  from StatusTable with (nolock)
 where StatusCode = 'H'

-- Mark Uninitialized as On Hold
update Requisitions
   set StatusId = @HoldId
  from SessionTable
  inner join Requisitions on Requisitions.SchoolId = SessionTable.SchoolId
 where SessionTable.SessionId = @pSessionId
   and (StatusId = 0 or StatusId is null)

-- Return Requisitions
SELECT Requisitions.RequisitionId as RequisitionId, Requisitions.RequisitionNumber as RequisitionNumber, Requisitions.Attention as Attention, Requisitions.DateEntered as DateEntered, ISNULL(Requisitions.TotalItemsCost,0) as TotalItemsCost,
         Category.Name as CategoryName, Requisitions.AccountCode as AccountCode, StatusTable.Name as StatusName, Requisitions.ApprovalLevel, dbo.uf_RequisitionStatus(Requisitions.RequisitionId) RequisitionStatus, case isnull(UserAccounts.UseAllocations,0) when 0 then case isnull(BudgetAccounts.UseAllocations,0) when 0 then 0 else isnull(BudgetAccounts.AmountAvailable,0) end else isnull(UserAccounts.AllocationAvailable,0) end Available
  FROM Requisitions with (nolock)
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  LEFT OUTER JOIN Category on Category.CategoryId = Requisitions.CategoryId
  LEFT OUTER JOIN BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId
  LEFT OUTER JOIN UserAccounts on UserAccounts.UserAccountId = Requisitions.UserAccountId
  LEFT OUTER JOIN Accounts on Accounts.AccountId = BudgetAccounts.AccountId
  LEFT OUTER JOIN StatusTable on StatusTable.StatusId = Requisitions.StatusId
  LEFT OUTER JOIN SessionTable on SessionTable.UserId = Requisitions.UserId
  left outer join CXmlSession on CXmlSession.SessionId = SessionTable.SessionId
 WHERE SessionTable.SessionId = @pSessionId
   AND Requisitions.BudgetId = SessionTable.BudgetId
   AND SessionTable.SessionEnd is null
   and dbo.uf_RequisitionIsVisible(SessionTable.SessionId, Requisitions.RequisitionId) = 1
   and case 
         when isnull(CXmlSession.SessionId,0) = 0 then null 
         when isnull(CXmlSession.SessionId,0) != 0 
          /*and Budgets.DistrictId != 246*/ then Requisitions.DateExported 
         else 
           (select top 1 PO.POId 
              from PO with (Nolock) 
             where PO.RequisitionId = Requisitions.RequisitionId) 
       end is null
   and case isnull(CXmlSession.SessionId,0) when 0 then isnull(Requisitions.CategoryId,0) else isnull(CXmlSession.CategoryId,0) end = Requisitions.CategoryId
```
