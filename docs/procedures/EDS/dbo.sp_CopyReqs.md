# Procedure: `dbo.sp_CopyReqs`

_Generated on 2026-05-04T13:04:00.338Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CopyReqs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2013-10-16 12:57:21 |
| Modified | 2013-10-16 12:57:21 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@SessionId` | IN | int |  |
| 2 | `@RSId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `DebugMsgs` | USER_TABLE |  |
| `dbo.sp_CopyReqsBulk` | SQL_STORED_PROCEDURE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure dbo.sp_CopyReqs @SessionId int, @RSId int
as
  declare @ReqList varchar(255)
  insert DebugMsgs (Msg) values ('Copying Requisitions from RSId=' + CAST(@RSId as varchar) + ' SessionId=' + CAST(@SessionId as varchar))
  select @ReqList = cast(@RSId as varchar(255))
  exec dbo.sp_CopyReqsBulk @ReqList
```
