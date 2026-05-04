# Procedure: `dbo.sp_BatchProcess`

_Generated on 2026-05-04T13:43:18.704Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_BatchProcess` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-11-21 14:58:45 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Batches` | USER_TABLE |  |
| `sp_BatchVerify` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure sp_BatchProcess AS
declare @BatchId int

declare BatchCur cursor fast_forward read_only for
select BatchId 
  from Batches
 where Scheduled is not null
   and Started is null
   and Completed is null

open BatchCur

fetch next from BatchCur into @BatchId

while @@fetch_status = 0
begin
  execute sp_BatchVerify @BatchId

  fetch next from BatchCur into @BatchId
end

close BatchCur
deallocate BatchCur
```
