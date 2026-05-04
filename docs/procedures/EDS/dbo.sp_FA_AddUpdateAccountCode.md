# Procedure: `dbo.sp_FA_AddUpdateAccountCode`

_Generated on 2026-05-04T14:49:07.266Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_AddUpdateAccountCode` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-14 00:06:04 |
| Modified | 2023-02-21 16:01:42 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@sessionID` | IN | varchar(40) |  |
| 2 | `@accountID` | IN | int |  |
| 3 | `@schoolID` | IN | int |  |
| 4 | `@code` | IN | varchar(50) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE [dbo].[sp_FA_AddUpdateAccountCode] @sessionID varchar(40), @accountID int, @schoolID int, @code varchar(50)
 
AS

	DECLARE @error int, @errorMessage varchar(255), @districtID int, @selectAccountID int, @budgetID int;
	SET @error = 0;
	SET	@errorMessage = '';
	SET @selectAccountID = 0;
	DECLARE @previousSchoolID int = 0;
	
	SELECT @budgetID = BudgetID, @districtID = DistrictId FROM SessionTable where SessionId = @sessionID
	
	-- VALIDATION
	IF @accountID > 0
		BEGIN
			
			-- edit code: this code already exists
			IF (SELECT COUNT(*) FROM Accounts WHERE	Code = @code AND AccountId <> @accountID AND DistrictId = @districtID AND Active = 1) > 0
				BEGIN
					SET @error = 1;
					SET @errorMessage = 'The new code is a duplicate of an existing code; you may not use it.';
				END
			
			ELSE IF (SELECT COUNT(*) FROM Accounts WHERE Code = @code AND DistrictId = @districtID AND Active = 1) = 0
				BEGIN
					-- Code is OK to update
					UPDATE	Accounts
						SET	SchoolID = @schoolID
							, Code = @code
							, Active = 1
					WHERE	AccountId = @accountID
						AND	DistrictId = @districtID
						
					-- 5/16/2012: Build 3 enhancements - 'If an account code is edited, update all requisitions that are tied to that account code'
					UPDATE	R
						SET	AccountCode = @code, Active = 1
					FROM	BudgetAccounts BA, Requisitions R
					WHERE	R.BudgetAccountID = BA.BudgetAccountID
						AND	BA.AccountId = @accountID
					
					SET	@errorMessage = 'Code Updated Successfully.';
				END

		END
	ELSE
		BEGIN
		
			-- ADDING
			
			-- adding a new code: this code already exists for all schools
			IF (SELECT COUNT(*) FROM Accounts WHERE	Code = @code AND ISNULL(SchoolId,0) = 0 AND DistrictId = @districtID AND Active = 1) > 0
				BEGIN
					SET @error = 1;
					SET @errorMessage = 'The new code is a duplicate of an existing code; you may not use it.';
				END
			-- add new code: this code already exists for this school
			ELSE IF (SELECT COUNT(*) FROM Accounts WHERE Code = @code AND DistrictId = @districtID AND SchoolID = @schoolID AND Active = 1) > 0
				BEGIN
					SET @error = 1;
					SET @errorMessage = 'The new code is a duplicate of an existing code; you may not use it.';
				END
			-- adding new code: this code already exists for another school
			ELSE IF (SELECT COUNT(*) FROM Accounts WHERE Code = @code AND SchoolID <> @schoolID AND ISNULL(SchoolId,0) > 0 AND DistrictId = @districtID AND Active = 1) > 0
				BEGIN
				
					SELECT @previousSchoolID = ISNULL(SchoolID,0) FROM Accounts WHERE Code = @code AND DistrictId = @districtID
					
					-- Adding an old code to a new school, we will just update this code with SchoolID of NULL to make it district wide
					UPDATE	Accounts
						SET	SchoolID = NULL
					WHERE	Code = @code
						AND	DistrictId = @districtID
										
					SET	@errorMessage = 'Code Updated to All Schools.';
					SET @accountID = (SELECT AccountID FROM Accounts WHERE Code = @code AND DistrictId = @districtID);
					SET @schoolID = 0;
					
				END
			-- add new code: this account already exists for this school or for all schools, but is inactive (BH 5/16/2012: Build 3 enhancements)
			ELSE IF (ISNULL(CASE WHEN ISNULL(@schoolID,0) > 0 THEN (SELECT MAX(AccountID) FROM Accounts WHERE Code=@code AND SchoolId=@schoolID AND DistrictId = @districtID AND Active=0) ELSE (SELECT MAX(AccountID) FROM Accounts WHERE Code=@code AND ISNULL(SchoolID,0) = 0 AND DistrictId = @districtID AND Active=0) END,0) > 0)
				BEGIN
					
					SELECT	@selectAccountID = 	CASE
													WHEN ISNULL(@schoolID,0) > 0 THEN (SELECT MAX(AccountID) FROM Accounts WHERE Code=@code AND SchoolId=@schoolID AND Active=0)
													ELSE (SELECT MAX(AccountID) FROM Accounts WHERE Code=@code AND ISNULL(SchoolID,0) = 0 AND Active=0)
												END
					
					SELECT @previousSchoolID = ISNULL(SchoolID,0) FROM Accounts WHERE AccountId = @selectAccountID
					
					UPDATE	Accounts
						SET	Active = 1
					WHERE	AccountId = @selectAccountID
					
					SET @accountID = @selectAccountID
										
				END	
			-- add new code: this code already exists for another school, but inactive. Activate it, and make it for all schools (BH 5/16/2012: Build 3 enhancements)
			ELSE IF ((SELECT MAX(AccountID) FROM Accounts WHERE Code=@code AND DistrictId = @districtID AND Active=0) > 0)
				BEGIN
					
					SELECT	@selectAccountID = (SELECT MAX(AccountID) FROM Accounts WHERE Code=@code AND DistrictId = @districtID AND Active=0)
					
					SELECT @previousSchoolID = ISNULL(SchoolID,0) FROM Accounts WHERE AccountId = @selectAccountID
					
					UPDATE	Accounts
						SET	Active = 1
							, SchoolId = NULL
					WHERE	AccountId = @selectAccountID
					
					SET	@errorMessage = 'Code Updated to All Schools.';
					SET @accountID = @selectAccountID;
					SET @schoolID = 0;
										
				END
			ELSE
				BEGIN
				
					-- Add this new code
					INSERT	INTO Accounts(Active, DistrictId, SchoolId, Code, [Description])
					VALUES	(1, @districtID, @schoolID, @code, NULL)
					
					SET @selectAccountID = SCOPE_IDENTITY();
					SET	@errorMessage = 'Code Added Successfully.';
					SET @accountID = @selectAccountID
					
					/* BH 1/29/2013: If we are adding an account, create a BudgetAccount also since we will not be making changes to the BA allocations */
					INSERT INTO BudgetAccounts(Active, BudgetId, AccountId, BudgetAmount, UseAllocations)
					VALUES (1, @budgetID, @accountID, 0, 0)
				
				END
		END

	SELECT	@error AS Error, @errorMessage AS ErrorMessage, @selectAccountID AS SelectAccountID, @accountID AS AccountID, @schoolID AS SchoolID, @previousSchoolID AS PreviousSchoolID
```
