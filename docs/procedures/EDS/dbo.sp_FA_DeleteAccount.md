# Procedure: `dbo.sp_FA_DeleteAccount`

_Generated on 2026-05-04T14:49:07.272Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_DeleteAccount` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-13 23:50:56 |
| Modified | 2012-06-13 23:50:56 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@accountID` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE [dbo].[sp_FA_DeleteAccount] @accountID int
 
AS
 
	DECLARE @userAssigned int, @schoolAssigned int, @error int, @errorMessage varchar(255);

	/*
	SET	@userAssigned = (SELECT ISNULL(COUNT(UserAccountID),0) FROM UserAccounts WHERE AccountId = @accountID AND Active=1);
	SET	@schoolAssigned = (SELECT ISNULL(COUNT(BudgetAccountID),0) FROM BudgetAccounts WHERE AccountId = @accountID AND Active=1);
	*/
	SET @error = 0;
	SET @errorMessage = 'Account deleted.';
 /*
	IF @userAssigned != 0 OR @schoolAssigned != 0
		BEGIN
			SET @error = 1;
			SET @errorMessage = 'You may not delete a code that is currently in use.';
		END
*/		
	IF @error = 0
		BEGIN
			
			UPDATE	Accounts
				SET	Active = 0
			WHERE	AccountId = @accountID
				AND	Active = 1
		END

	SELECT	@error AS Error, @errorMessage AS ErrorMessage
```
