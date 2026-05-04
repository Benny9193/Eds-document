# Procedure: `null.sp_ConvertReadyBatches`

_Generated on 2026-05-04T13:04:00.214Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `sp_ConvertReadyBatches` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-02-11 19:54:47 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BatchDetail` | USER_TABLE |  |
| `Batches` | USER_TABLE |  |
| `sp_BatchConvert` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  procedure sp_ConvertReadyBatches as

declare @BatchId int

declare CVCur cursor read_only for
select Batches.BatchId
  from Batches
  join BatchDetail on BatchDetail.BatchId = Batches.BatchId
 where Batches.ErrorCount = 0
   and Batches.Converted is null
   and Batches.BatchDate >= convert(datetime,'11/01/2002')
   and BatchDetail.OrigBookAmount is not null
 group by Batches.BatchId

open CVCur

fetch next from CVCur into @BatchId

while @@fetch_status = 0
begin
  print 'Converting Batch ' + convert(varchar(16),@BatchId)

  exec sp_BatchConvert 20638, @BatchId

  fetch next from CVCur into @BatchId
end

close CVCur
deallocate CVCur
```
