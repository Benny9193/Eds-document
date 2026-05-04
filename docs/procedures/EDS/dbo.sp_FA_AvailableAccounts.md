# Procedure: `dbo.sp_FA_AvailableAccounts`

_Generated on 2026-05-04T14:49:07.269Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_AvailableAccounts` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-14 00:06:19 |
| Modified | 2012-06-14 00:06:19 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@sessionID` | IN | varchar(40) |  |
| 2 | `@schoolID` | IN | int |  |
| 3 | `@budgetID` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `vw_FA_BudgetAccounts` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE [dbo].[sp_FA_AvailableAccounts] @sessionID varchar(40), @schoolID int, @budgetID int
 
AS

	DECLARE @availableAccounts TABLE (
		AccountId int
		, Active tinyint
		, DistrictId int
		, SchoolId int
		, Code varchar(50)
		, [Description] varchar(512)
		, [Type] varchar(255)
		, Allocated money
		, Spent money
	)

	INSERT	INTO @availableAccounts
	SELECT	A.AccountId, A.Active, A.DistrictId, ISNULL(A.SchoolId,0) AS SchoolId, A.Code, A.[Description]
			, CASE 
				WHEN ISNULL(A.SchoolId,0) > 0 THEN S.Name
				ELSE 'All Schools'
			END AS [Type]
			, ISNULL((SELECT Allocated FROM vw_FA_BudgetAccounts WHERE AccountId = A.AccountId AND BudgetId=@budgetID AND SessionID=@sessionID),0) AS Allocated
			, ISNULL((SELECT Spent FROM vw_FA_BudgetAccounts WHERE AccountId = A.AccountId AND BudgetId=@budgetID AND SessionID=@sessionID),0) AS Spent
	FROM	SessionTable ST, Accounts A
			LEFT OUTER JOIN School S ON S.SchoolID = A.SchoolID
	WHERE	A.DistrictId = ST.DistrictId
		AND ST.SessionId = @sessionID
		AND	A.Active = 1
		
	IF (ISNULL(@schoolID,0) > 0)
		SELECT	AccountId, Active, DistrictId, SchoolId, Code, [Description], [Type], Allocated, Spent
		FROM	@availableAccounts
		WHERE	(ISNULL(SchoolId,0) = 0 OR SchoolId = @schoolID)
		ORDER	BY Code ASC
	ELSE
		SELECT	AccountId, Active, DistrictId, SchoolId, Code, [Description], [Type], Allocated, Spent
		FROM	@availableAccounts
		ORDER	BY Code ASC
```
