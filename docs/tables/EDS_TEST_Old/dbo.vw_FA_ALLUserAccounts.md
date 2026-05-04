# View: `dbo.vw_FA_ALLUserAccounts`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

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
| 15 | `UserId` | int | YES |  |  |
| 16 | `AllocationAmount` | money | NO |  |  |
| 17 | `AllocationAvailable` | money | NO |  |  |
| 18 | `UseAllocations` | tinyint | NO |  |  |
| 19 | `UserSpent` | money | NO |  |  |
| 20 | `Active` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Requisitions` | USER_TABLE |
| `UserAccounts` | USER_TABLE |
| `vw_FA_ALLBudgetAccounts` | VIEW |

## Used by

| Object | Type |
|--------|------|
| `dbo.sp_GetUserRequisitions` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE   view  [dbo].[vw_FA_ALLUserAccounts]

AS

	SELECT	BA.BudgetAccountID, 
	        BA.BudgetAmount, 
	        BA.AmountAvailable, 
	        BA.UseAllocations AS UseBudgetAccountAllocations, 
	        BA.BudgetName, 
	        BA.BudgetID, 
	        BA.Code, 
	        BA.[Type], 
	        BA.AccountID, 
	        BA.Allocated, 
	        BA.Spent, 
	        BA.SchoolID, 
	        BA.SessionID,
	        UA.UserAccountId, 
	        UA.UserId, 
	        ISNULL(UA.AllocationAmount,0) AS AllocationAmount, 
	        ISNULL(UA.AllocationAvailable,0) AS AllocationAvailable, 
	        ISNULL(UA.UseAllocations,0) AS UseAllocations,
			ISNULL((SELECT SUM(TotalRequisitionCost) 
			          FROM Requisitions 
			         WHERE UserAccountId = UA.UserAccountID),0) AS UserSpent,
			CASE
				WHEN BA.Active = 1 AND UA.Active = 1 THEN 1
				ELSE 0
			END AS Active
	FROM	vw_FA_ALLBudgetAccounts BA, 
	        UserAccounts UA
	WHERE	BA.BudgetAccountID = UA.BudgetAccountID
```
