# Procedure: `null.sp_CopyReqs`

_Generated on 2026-05-04T13:04:00.215Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `sp_CopyReqs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-06-30 12:55:48 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `DebugMsgs` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `dbo.sp_CopyReqsBulk` | SQL_STORED_PROCEDURE |  |
| `EDSIQWebUser.sp_CopyReq` | SQL_STORED_PROCEDURE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_ProcessCopyRequests` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE          procedure EDSIQWebUser.sp_CopyReqs @pReqList varchar(255) as

exec dbo.sp_CopyReqsBulk @pReqList
return

declare @ReqId int,
	@ReqCount int,
	@ReqList int

set transaction isolation level read uncommitted
select @ReqList = convert(int,@pReqList)
select @ReqCount = count(*) from ReportSessionLinks where RSId = @ReqList
insert DebugMsgs (Msg) values ('ReqList=' + convert(varchar(16),@ReqList) + ',' + @pReqList)

declare ReqListCur cursor read_only for
/*select IntId from ReportSessionLinks where RSId = @ReqList*/
select IntId 
  from ReportSessionLinks 
  join Requisitions on Requisitions.RequisitionId = ReportSessionLinks.IntId
  join Users on Users.UserId = Requisitions.UserId
            and Users.Active = 1
 where RSId = @ReqList

open ReqListCur

fetch next from ReqListCur into @ReqId

while @@fetch_status = 0
begin
  insert DebugMsgs (Msg) values ('Copying Requisition ' + isnull(convert(varchar(16),@ReqId),'<null>'))
  exec EDSIQWebUser.sp_CopyReq @ReqId

  fetch next from ReqListCur into @ReqId
end

close ReqListCur
deallocate ReqListCur
```
