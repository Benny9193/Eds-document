# Procedure: `null.sp_DeletePOList`

_Generated on 2026-05-04T13:04:00.217Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `sp_DeletePOList` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-05-02 09:50:18 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `PO` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `sp_DeletePO` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure sp_DeletePOList @pRSId int AS

declare @POId int

declare dpocur cursor fast_forward read_only for
select PO.POId
  from PO
  join ReportSessionLinks on ReportSessionLinks.IntId = PO.POId
 where ReportSessionLinks.RSId = @pRSId

open dpocur

fetch next from dpocur into @POId

while @@fetch_status = 0
begin
  exec sp_DeletePO @POId

  fetch next from dpocur into @POId
end

close dpocur
deallocate dpocur
```
