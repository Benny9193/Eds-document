# Procedure: `dbo.usp_StoreImageDone`

_Generated on 2026-05-04T13:04:24.392Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_StoreImageDone` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2021-05-03 22:02:22 |
| Modified | 2021-05-03 22:02:22 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@imageLogId` | IN | bigint |  |
| 2 | `@writeStatus` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `ImageLog` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create   procedure [dbo].[usp_StoreImageDone] @imageLogId bigint, @writeStatus int
as
begin

	update ImageLog
	   set WriteStatus = @writeStatus,
		   WriteDate = getdate()
	 where ImageLogId = @ImageLogId
end
```
