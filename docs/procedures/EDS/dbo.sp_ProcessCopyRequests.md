# Procedure: `dbo.sp_ProcessCopyRequests`

_Generated on 2026-05-04T13:43:18.883Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_ProcessCopyRequests` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2004-10-26 19:36:05 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `CopyRequests` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `EDSIQWebUser.sp_CopyReqs` | SQL_STORED_PROCEDURE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE    procedure dbo.sp_ProcessCopyRequests
as
declare @CopyRequestId int,
	@RSId int

delete ReportSessionLinks
  from CopyRequests
  join ReportSessionLinks rsl on rsl.RSId = CopyRequests.RSId
 where CopyRequests.StartTime is null
   and CopyRequests.CopyRequestId != (select top 1 cr1.CopyRequestId
                                        from CopyRequests cr1
                                        join ReportSessionLinks rsl1 on rsl1.RSId = cr1.RSId
                                                                    and rsl1.IntId = rsl.IntId
                                       where CR1.StartTime is null
                                       order by cr1.CopyRequestId)

declare QCC cursor  read_only for
select CopyRequestId, RSId
  from CopyRequests
 where StartTime is null

open QCC

fetch next from QCC into @CopyRequestId, @RSId

while @@fetch_status = 0
begin
  Update CopyRequests
     set StartTime = getdate()
   where CopyRequestId = @CopyRequestId

  exec EDSIQWebUser.sp_CopyReqs @RSId

  Update CopyRequests
     set EndTime = getdate()
   where CopyRequestId = @CopyRequestId

  fetch next from QCC into @CopyRequestId, @RSId
end

close QCC
deallocate QCC
```
