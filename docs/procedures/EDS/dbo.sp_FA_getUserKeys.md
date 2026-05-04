# Procedure: `dbo.sp_FA_getUserKeys`

_Generated on 2026-05-04T14:49:07.274Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_getUserKeys` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-14 00:05:35 |
| Modified | 2025-03-20 14:07:38 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@userID` | IN | varchar(50) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `SecurityKeys` | USER_TABLE |  |
| `SecurityRoleKeys` | USER_TABLE |  |
| `SecurityRoles` | USER_TABLE |  |
| `SecurityRoleUsers` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE [dbo].[sp_FA_getUserKeys] @userID varchar(50) AS

SELECT	SK.KeyName AS [Key]
FROM	SecurityRoleUsers SRU, SecurityRoles SR, SecurityRoleKeys SRK, SecurityKeys SK
WHERE	SK.SecurityKeyID = SRK.SecurityKeyID
	AND	SRK.SecurityRoleID = SR.SecurityRoleID
	AND	SR.SecurityRoleID = SRU.SecurityRoleID
	AND	SRU.UserID = @userID
 group by SK.KeyName
```
