# View: `dbo.vw_FA_UserAccounts`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BudgetAccountID` | int | NO |  |  |
| 2 | `BudgetAmount` | money | NO |  |  |
| 3 | `AmountAvailable` | money | NO |  |  |
| 4 | `UseBudgetAccountAllocations` | tinyint | NO |  |  |
| 5 | `BudgetName` | varchar(30) | YES |  |  |
| 6 | `BudgetID` | int | NO |  |  |
| 7 | `Code` | varchar(50) | YES |  |  |
| 8 | `Type` | varchar(50) | YES |  |  |
| 9 | `AccountID` | int | NO |  |  |
| 10 | `Allocated` | money | NO |  |  |
| 11 | `Spent` | money | NO |  |  |
| 12 | `SchoolID` | int | NO |  |  |
| 13 | `SessionID` | int | NO |  |  |
| 14 | `UserAccountId` | int | NO |  |  |
| 15 | `Active` | tinyint | YES |  |  |
| 16 | `UserId` | int | YES |  |  |
| 17 | `AllocationAmount` | money | NO |  |  |
| 18 | `AllocationAvailable` | money | NO |  |  |
| 19 | `UseAllocations` | tinyint | NO |  |  |
| 20 | `UserSpent` | money | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Requisitions` | USER_TABLE |
| `UserAccounts` | USER_TABLE |
| `Users` | USER_TABLE |
| `vw_FA_BudgetAccounts` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[vw_FA_UserAccounts]

AS

	SELECT	BA.BudgetAccountID, BA.BudgetAmount, BA.AmountAvailable, BA.UseAllocations AS UseBudgetAccountAllocations, BA.BudgetName, BA.BudgetID, BA.Code, BA.[Type], BA.AccountID, BA.Allocated, BA.Spent, BA.SchoolID, BA.SessionID
			,UA.UserAccountId, UA.Active, UA.UserId, ISNULL(UA.AllocationAmount,0) AS AllocationAmount, ISNULL(UA.AllocationAvailable,0) AS AllocationAvailable, ISNULL(UA.UseAllocations,0) AS UseAllocations
			,ISNULL((SELECT SUM(TotalRequisitionCost) FROM Requisitions WHERE UserAccountId = UA.UserAccountID),0) AS UserSpent
	FROM	vw_FA_BudgetAccounts BA
	join UserAccounts UA on ua.BudgetAccountId = BA.BudgetAccountId
	                    and ua.Active = 1
	join Users U on u.UserId = ua.UserId
	            and u.Active = 1
```
