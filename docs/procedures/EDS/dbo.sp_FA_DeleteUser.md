# Procedure: `dbo.sp_FA_DeleteUser`

_Generated on 2026-05-04T13:04:24.129Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_DeleteUser` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-13 23:51:17 |
| Modified | 2012-06-13 23:51:17 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@sessionID` | IN | int |  |
| 2 | `@userID` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE [dbo].[sp_FA_DeleteUser] @sessionID int, @userID int
	
AS
	BEGIN
		
		UPDATE	UserAccounts
			SET	Active = 0
		WHERE	UserId = @userID
		
		UPDATE	Users
			SET	Active = 0
		WHERE	UserId = @userID
		
		SELECT	0 AS Error, 'User Deleted.' AS ErrorMessage
		
	END
```
