# View: `dbo.vw_ExistingRequisitions`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  |  |
| 2 | `RequisitionId` | int | NO |  |  |
| 3 | `RequisitionNumber` | varchar(24) | YES |  |  |
| 4 | `Attention` | varchar(50) | YES |  |  |
| 5 | `DateEntered` | datetime | YES |  |  |
| 6 | `TotalItemsCost` | money | NO |  |  |
| 7 | `CategoryId` | int | YES |  |  |
| 8 | `CategoryName` | varchar(50) | YES |  |  |
| 9 | `AccountCode` | varchar(50) | YES |  |  |
| 10 | `StatusName` | varchar(50) | YES |  |  |
| 11 | `ApprovalLevel` | tinyint | YES |  |  |
| 12 | `RequisitionStatus` | varchar(255) | YES |  |  |
| 13 | `Available` | money | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Accounts` | USER_TABLE |
| `BudgetAccounts` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `CXmlSession` | USER_TABLE |
| `PO` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `StatusTable` | USER_TABLE |
| `UserAccounts` | USER_TABLE |
| `dbo.uf_RequisitionIsVisible` | SQL_SCALAR_FUNCTION |
| `dbo.uf_RequisitionStatus` | SQL_SCALAR_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_ExistingRequisitions] AS

-- Return Requisitions
SELECT SessionTable.SessionId, 
       Requisitions.RequisitionId as RequisitionId, 
       Requisitions.RequisitionNumber as RequisitionNumber, 
       Requisitions.Attention as Attention, 
       Requisitions.DateEntered as DateEntered, 
       ISNULL(Requisitions.TotalItemsCost,0) as TotalItemsCost,
       Category.CategoryId,
       Category.Name as CategoryName, 
       Requisitions.AccountCode as AccountCode, 
       StatusTable.Name as StatusName, 
       Requisitions.ApprovalLevel, 
       dbo.uf_RequisitionStatus(Requisitions.RequisitionId) RequisitionStatus, 
       case isnull(UserAccounts.UseAllocations,0) 
         when 0 then 
           case isnull(BudgetAccounts.UseAllocations,0) 
             when 0 then 0 
             else isnull(BudgetAccounts.AmountAvailable,0) 
           end 
         else 
           isnull(UserAccounts.AllocationAvailable,0) 
       end Available
  FROM Requisitions with (nolock)
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  JOIN SessionTable on SessionTable.UserId = Requisitions.UserId
                   and SessionTable.BudgetId = Requisitions.BudgetId
  LEFT OUTER JOIN Category on Category.CategoryId = Requisitions.CategoryId
  LEFT OUTER JOIN BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId
  LEFT OUTER JOIN UserAccounts on UserAccounts.UserAccountId = Requisitions.UserAccountId
  LEFT OUTER JOIN Accounts on Accounts.AccountId = BudgetAccounts.AccountId
  LEFT OUTER JOIN StatusTable on StatusTable.StatusId = case isnull(Requisitions.StatusId,0) when 0 then 1 else Requisitions.StatusId end
  left outer join CXmlSession on CXmlSession.SessionId = SessionTable.SessionId
 WHERE Requisitions.BudgetId = SessionTable.BudgetId
   and dbo.uf_RequisitionIsVisible(SessionTable.SessionId, Requisitions.RequisitionId) = 1
   and case 
         when isnull(CXmlSession.SessionId,0) = 0 then null 
         when isnull(CXmlSession.SessionId,0) != 0 
          and Budgets.DistrictId != 246 then Requisitions.DateExported 
         else 
           (select top 1 PO.POId 
              from PO with (Nolock) 
             where PO.RequisitionId = Requisitions.RequisitionId) 
       end is null
   and case isnull(CXmlSession.SessionId,0) 
         when 0 then isnull(Requisitions.CategoryId,0) 
         else isnull(CXmlSession.CategoryId,0) 
       end = Requisitions.CategoryId
```
