# Procedure: `dbo.sp_FA_SetUserAccount`

_Generated on 2026-05-04T14:49:07.281Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_SetUserAccount` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-13 23:51:12 |
| Modified | 2019-05-01 13:54:48 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@sessionID` | IN | varchar(40) |  |
| 2 | `@userID` | IN | int |  |
| 3 | `@budgetAccountID` | IN | int |  |
| 4 | `@useAllocations` | IN | tinyint |  |
| 5 | `@allocationAmount` | IN | money |  |
| 6 | `@active` | IN | tinyint |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BudgetAccounts` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE [dbo].[sp_FA_SetUserAccount] @sessionID varchar(40), @userID int, @budgetAccountID int, @useAllocations tinyint, @allocationAmount money, @active tinyint
 
AS

	DECLARE @userAccountID integer;
	
	SET @userAccountID =	(
						SELECT	top 1 UserAccountID
						FROM	UserAccounts
						WHERE	UserID = @userID
							AND	BudgetAccountId = @budgetAccountID
							--AND	Active = 1
						order by isnull(Active,0) desc, UserAccountId
						)

	IF @useAllocations = 0
		SET @allocationAmount = NULL

	IF @userAccountID > 0
	
		UPDATE	UserAccounts
			SET	UseAllocations = @useAllocations
				, AllocationAmount = @allocationAmount
				, Active = @active
		WHERE	UserAccountId = @userAccountID
	
	ELSE
		
		INSERT INTO UserAccounts(Active, AccountId, BudgetId, BudgetAccountId, UserId, AllocationAmount, UseAllocations)
		SELECT	@active, BA.AccountID, BA.BudgetID,BA.BudgetAccountID,@userID, @allocationAmount,@useAllocations
		FROM	BudgetAccounts BA
		WHERE	BA.BudgetAccountId = @budgetAccountID
		
	SELECT	@userAccountID AS [userAccountID], @@ROWCOUNT AS [saved]
```
