# Procedure: `dbo.sp_FA_SetBudgetAccount`

_Generated on 2026-05-04T14:49:07.281Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_SetBudgetAccount` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-13 23:51:05 |
| Modified | 2013-02-04 00:10:19 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@sessionID` | IN | varchar(40) |  |
| 2 | `@budgetID` | IN | int |  |
| 3 | `@accountID` | IN | int |  |
| 4 | `@setBudget` | IN | tinyint |  |
| 5 | `@budget` | IN | money |  |
| 6 | `@active` | IN | tinyint |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BudgetAccounts` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE [dbo].[sp_FA_SetBudgetAccount] @sessionID varchar(40), @budgetID int, @accountID int, @setBudget tinyint, @budget money, @active tinyint
 
AS

	DECLARE @budgetAccountID integer;
	
	SET @budgetAccountID =	(
						SELECT	BudgetAccountID
						FROM	BudgetAccounts
						WHERE	BudgetId = @budgetID
							AND	AccountId = @accountID
							--AND	Active = 1
						)

	IF @setBudget = 0
		SET @budget = NULL

	IF @budgetAccountID > 0
	
		UPDATE	BudgetAccounts
			SET	UseAllocations = @setBudget
				, BudgetAmount = @budget
				, Active = @active
		WHERE	BudgetAccountId = @budgetAccountID
	
	ELSE
		INSERT INTO BudgetAccounts(Active, BudgetId, AccountId, BudgetAmount, UseAllocations)
		VALUES (@active, @budgetID, @accountID, @budget,  @setBudget)
		
	SELECT	@budgetAccountID AS [budgetAccountID], @@ROWCOUNT AS [saved]
```
