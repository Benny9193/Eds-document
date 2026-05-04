# Function: table-valued: `dbo.uf_BatchChanges`

_Generated on 2026-05-04T14:49:07.346Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_BatchChanges` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2002-03-01 01:08:49 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BatchBook` | USER_TABLE |  |
| `BatchDetail` | USER_TABLE |  |
| `Batches` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create function uf_BatchChanges () 
returns @TempChanges table (
ChangeId int identity(1,1) not null,
BatchId	int null,
BatchBookId int null,
BatchDetailId int null,
RecordNumber int null,
Field	varchar(16) null,
OrigValue varchar(16) null,
CorrectedValue varchar(16) null )
AS
begin
-- Insert District Code Changes
insert @TempChanges (BatchId, BatchBookId, BatchDetailId, RecordNumber, Field, OrigValue, CorrectedValue)
  select BatchDetail.BatchId, BatchDetail.BatchBookId, BatchDetail.BatchDetailId, BatchDetail.RecordNumber, 'District Code', BatchDetail.OrigDistrictCode, BatchDetail.DistrictCode
    from Batches
    join BatchBook on BatchBook.BatchId = Batches.BatchId
    join BatchDetail on BatchDetail.BatchBookId = BatchBook.BatchBookId
   where isnull(OrigDistrictCode,'') != isnull(BatchDetail.DistrictCode,'')
     and BatchDetail.Active = 1

-- Insert Category Code Changes
insert @TempChanges (BatchId, BatchBookId, BatchDetailId, RecordNumber, Field, OrigValue, CorrectedValue)
  select BatchDetail.BatchId, BatchDetail.BatchBookId, BatchDetail.BatchDetailId, BatchDetail.RecordNumber, 'Category', BatchDetail.OrigCategory, BatchDetail.Category
    from Batches
    join BatchBook on BatchBook.BatchId = Batches.BatchId
    join BatchDetail on BatchDetail.BatchBookId = BatchBook.BatchBookId
   where isnull(OrigCategory,'') != isnull(BatchDetail.Category,'')
     and BatchDetail.Active = 1

-- Insert Comet Id Changes
insert @TempChanges (BatchId, BatchBookId, BatchDetailId, RecordNumber, Field, OrigValue, CorrectedValue)
  select BatchDetail.BatchId, BatchDetail.BatchBookId, BatchDetail.BatchDetailId, BatchDetail.RecordNumber, 'User Code', BatchDetail.OrigCometCode, BatchDetail.CometId
    from Batches
    join BatchBook on BatchBook.BatchId = Batches.BatchId
    join BatchDetail on BatchDetail.BatchBookId = BatchBook.BatchBookId
   where isnull(OrigCometCode,'') != isnull(CometCode,'')
     and BatchDetail.Active = 1

-- Insert Item Code Changes
insert @TempChanges (BatchId, BatchBookId, BatchDetailId, RecordNumber, Field, OrigValue, CorrectedValue)
  select BatchDetail.BatchId, BatchDetail.BatchBookId, BatchDetail.BatchDetailId, BatchDetail.RecordNumber, 'Item Code', BatchDetail.OrigItemCode, BatchDetail.ItemCode
    from Batches
    join BatchBook on BatchBook.BatchId = Batches.BatchId
    join BatchDetail on BatchDetail.BatchBookId = BatchBook.BatchBookId
   where isnull(OrigItemCode,'') != isnull(ItemCode,'')
     and BatchDetail.Active = 1

-- Insert Quantity Changes
insert @TempChanges (BatchId, BatchBookId, BatchDetailId, RecordNumber, Field, OrigValue, CorrectedValue)
  select BatchDetail.BatchId, BatchDetail.BatchBookId, BatchDetail.BatchDetailId, BatchDetail.RecordNumber, 'Quantity', BatchDetail.OrigQuantity, BatchDetail.Quantity
    from Batches
    join BatchBook on BatchBook.BatchId = Batches.BatchId
    join BatchDetail on BatchDetail.BatchBookId = BatchBook.BatchBookId
   where isnull(OrigQuantity,'') != isnull(Quantity,'')
     and BatchDetail.Active = 1

-- Insert Deleted Records
insert @TempChanges (BatchId, BatchBookId, BatchDetailId, RecordNumber, Field, OrigValue, CorrectedValue)
  select BatchDetail.BatchId, BatchDetail.BatchBookId, BatchDetail.BatchDetailId, BatchDetail.RecordNumber, 'Deleted', BatchDetail.OrigQuantity, BatchDetail.Quantity
    from Batches
    join BatchBook on BatchBook.BatchId = Batches.BatchId
    join BatchDetail on BatchDetail.BatchBookId = BatchBook.BatchBookId
   where BatchDetail.Active = 0

--select * 
--  from @TempChanges
-- order by BatchId, BatchBookId, BatchDetailId, RecordNumber, Field

--drop table @TempChanges

return
end
```
