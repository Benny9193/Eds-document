# View: `dbo.vw_FA_BudgetAccounts`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BudgetAccountID` | int | NO |  |  |
| 2 | `BudgetAmount` | money | NO |  |  |
| 3 | `AmountAvailable` | money | NO |  |  |
| 4 | `UseAllocations` | tinyint | NO |  |  |
| 5 | `BudgetName` | varchar(30) | YES |  |  |
| 6 | `BudgetID` | int | NO |  |  |
| 7 | `Code` | varchar(50) | YES |  |  |
| 8 | `Type` | varchar(50) | YES |  |  |
| 9 | `AccountID` | int | NO |  |  |
| 10 | `Allocated` | money | NO |  |  |
| 11 | `Spent` | money | NO |  |  |
| 12 | `SchoolID` | int | NO |  |  |
| 13 | `SessionID` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Accounts` | USER_TABLE |
| `BudgetAccounts` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `School` | USER_TABLE |
| `UserAccounts` | USER_TABLE |
| `vw_FA_BudgetsView` | VIEW |

## Used by

| Object | Type |
|--------|------|
| `dbo.sp_FA_AvailableAccounts` | SQL_STORED_PROCEDURE |
| [`dbo.vw_FA_UserAccounts`](dbo.vw_FA_UserAccounts.md) | VIEW |

## Definition

```sql
--select 

CREATE   view  [dbo].[vw_FA_BudgetAccounts]

AS
	
	SELECT	BA.BudgetAccountID, ISNULL(BA.BudgetAmount,0) AS BudgetAmount, ISNULL(BA.AmountAvailable,0) AS AmountAvailable, ISNULL(BA.UseAllocations,0) AS UseAllocations
			, B.Name AS BudgetName
			, B.BudgetID
			, A.Code
			, CASE 
				WHEN ISNULL(A.SchoolId,0) > 0 THEN S.Name
				ELSE 'All Schools'
			END AS [Type]
			, A.AccountID
			,ISNULL((SELECT SUM(AllocationAmount) FROM UserAccounts WHERE BudgetAccountId = BA.BudgetAccountID AND Active = 1),0) AS Allocated
			,ISNULL((SELECT SUM(TotalRequisitionCost) FROM Requisitions WHERE BudgetAccountId = BA.BudgetAccountID),0) AS Spent
			, ISNULL(A.SchoolId,0) AS SchoolID
			, BV.SessionID
	FROM	vw_FA_BudgetsView BV, Budgets B, BudgetAccounts BA, Accounts A
	LEFT OUTER JOIN School S ON S.SchoolId = A.SchoolID
	WHERE	A.AccountId = BA.AccountId
		AND	A.Active = 1
		AND	BA.BudgetId = B.BudgetID
		AND	BA.Active = 1
		AND	B.Active = 1
		AND B.BudgetID = BV.BudgetID
```
