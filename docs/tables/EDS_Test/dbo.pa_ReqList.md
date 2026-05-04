# View: `dbo.pa_ReqList`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Accounts_Code` | varchar(50) | YES |  |  |
| 2 | `ApprovalDescription` | varchar(50) | YES |  |  |
| 3 | `ApprovalDate` | datetime | YES |  |  |
| 4 | `CategoryName` | varchar(50) | YES |  |  |
| 5 | `CometId` | int | YES |  |  |
| 6 | `RequisitionNumber` | varchar(24) | YES |  |  |
| 7 | `Requisitions_Attention` | varchar(50) | YES |  |  |
| 8 | `AccountCode` | varchar(50) | YES |  |  |
| 9 | `DateEntered` | datetime | YES |  |  |
| 10 | `TotalRequisitionCost` | money | YES |  |  |
| 11 | `BidHeaderId` | int | YES |  |  |
| 12 | `PendingApprovals_SchoolId` | int | YES |  |  |
| 13 | `PendingApprovals_UserId` | int | YES |  |  |
| 14 | `PendingApprovals_BudgetId` | int | YES |  |  |
| 15 | `PendingApprovals_AccountId` | int | YES |  |  |
| 16 | `PendingApprovals_CategoryId` | int | YES |  |  |
| 17 | `PendingApprovals_StatusId` | int | YES |  |  |
| 18 | `PendingApprovals_ApprovalDate` | datetime | YES |  |  |
| 19 | `PendingApprovals_ApprovalLevel` | tinyint | YES |  |  |
| 20 | `SessionId` | int | YES |  |  |
| 21 | `Tagged` | int | NO |  |  |
| 22 | `RequisitionId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Accounts`](dbo.Accounts.md) | USER_TABLE |
| [`dbo.ApprovalLevels`](dbo.ApprovalLevels.md) | USER_TABLE |
| [`dbo.Approvals`](dbo.Approvals.md) | USER_TABLE |
| [`dbo.Category`](dbo.Category.md) | USER_TABLE |
| [`dbo.PendingApprovals`](dbo.PendingApprovals.md) | USER_TABLE |
| [`dbo.Requisitions`](dbo.Requisitions.md) | USER_TABLE |
| [`dbo.Users`](dbo.Users.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[pa_ReqList]
AS
SELECT     dbo.Accounts.Code AS Accounts_Code, dbo.ApprovalLevels.Description AS ApprovalDescription, dbo.Approvals.ApprovalDate, 
                      dbo.Category.Name AS CategoryName, dbo.Users.CometId, dbo.Requisitions.RequisitionNumber, dbo.Requisitions.Attention AS Requisitions_Attention,
                       dbo.Requisitions.AccountCode, dbo.Requisitions.DateEntered, dbo.Requisitions.TotalRequisitionCost, dbo.Requisitions.BidHeaderId, 
                      dbo.PendingApprovals.SchoolId AS PendingApprovals_SchoolId, dbo.PendingApprovals.UserId AS PendingApprovals_UserId, 
                      dbo.PendingApprovals.BudgetId AS PendingApprovals_BudgetId, dbo.PendingApprovals.AccountId AS PendingApprovals_AccountId, 
                      dbo.PendingApprovals.CategoryId AS PendingApprovals_CategoryId, dbo.PendingApprovals.StatusId AS PendingApprovals_StatusId, 
                      dbo.PendingApprovals.ApprovalDate AS PendingApprovals_ApprovalDate, dbo.PendingApprovals.ApprovalLevel AS PendingApprovals_ApprovalLevel, 
                      dbo.PendingApprovals.SessionId, 0 AS Tagged, dbo.PendingApprovals.RequisitionId
FROM         dbo.PendingApprovals with (nolock) INNER JOIN
                      dbo.Requisitions ON dbo.Requisitions.RequisitionId = dbo.PendingApprovals.RequisitionId INNER JOIN
                      dbo.Category ON dbo.Category.CategoryId = dbo.PendingApprovals.CategoryId INNER JOIN
                      dbo.Accounts ON dbo.Accounts.AccountId = dbo.PendingApprovals.AccountId LEFT OUTER JOIN
                      dbo.ApprovalLevels ON dbo.ApprovalLevels.ApprovalLevel = dbo.PendingApprovals.ApprovalLevel LEFT OUTER JOIN
                      dbo.Users ON dbo.Users.UserId = dbo.PendingApprovals.UserId LEFT OUTER JOIN
                      dbo.Approvals ON dbo.Approvals.ApprovalId = dbo.PendingApprovals.LastApprovalId
```
