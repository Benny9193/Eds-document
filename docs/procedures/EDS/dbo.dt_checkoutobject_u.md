# Procedure: `dbo.dt_checkoutobject_u`

_Generated on 2026-05-04T13:04:00.244Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `dt_checkoutobject_u` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2006-08-29 12:12:36 |
| Modified | 2006-08-29 12:12:36 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@chObjectType` | IN | char(4) |  |
| 2 | `@vchObjectName` | IN | nvarchar(255) |  |
| 3 | `@vchComment` | IN | nvarchar(255) |  |
| 4 | `@vchLoginName` | IN | nvarchar(255) |  |
| 5 | `@vchPassword` | IN | nvarchar(255) |  |
| 6 | `@iVCSFlags` | IN | int |  |
| 7 | `@iActionFlag` | IN | int |  |

## Depends on

_None resolved._

## Called by

_No other objects in this database reference it._

## Definition

```sql
create proc dbo.dt_checkoutobject_u
    @chObjectType  char(4),
    @vchObjectName nvarchar(255),
    @vchComment    nvarchar(255),
    @vchLoginName  nvarchar(255),
    @vchPassword   nvarchar(255),
    @iVCSFlags     int = 0,
    @iActionFlag   int = 0/* 0 => Checkout, 1 => GetLatest, 2 => UndoCheckOut */

as

	-- This procedure should no longer be called;  dt_checkoutobject should be called instead.
	-- Calls are forwarded to dt_checkoutobject to maintain backward compatibility.
	set nocount on
	exec dbo.dt_checkoutobject
		@chObjectType,  
		@vchObjectName, 
		@vchComment,    
		@vchLoginName,  
		@vchPassword,  
		@iVCSFlags,    
		@iActionFlag
```
