# Procedure: `null.sp_MultiBatchLoad`

_Generated on 2026-05-04T13:04:00.218Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `sp_MultiBatchLoad` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-09-23 10:28:01 |
| Modified | 2015-11-24 23:37:34 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BatchDetail` | USER_TABLE |  |
| `Batches` | USER_TABLE |  |
| `sp_BatchVerify` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [EDSIQWebUser].[sp_MultiBatchLoad] @pCategory char(1), @pSourceFile varchar(255) AS

declare @SQLStmt varchar(1024),
	@BatchId int,
	@Records int,
        @DistrictCode char(2)

print '**********************' + @pSourceFile + '*********************'

-- Create Temp Table
create table #ImportBatch (
DataRow	varchar(512),
RowId	int identity(1,1)
)

-- Build Load Ascii File into TempDB statement
select @SQLStmt = 'BULK INSERT #ImportBatch FROM ''' + @pSourceFile + ''' WITH (FORMATFILE = ''C:\INETPUB\ASP\EDSIQ\ImportQty1.fmt'')'

execute(@SQLStmt)

declare BatchCur cursor fast_forward read_only for
  select substring(DataRow,1,2) 
    from #ImportBatch
   group by substring(DataRow,1,2)

open BatchCur

fetch next from BatchCur into @DistrictCode

while @@fetch_status = 0
begin
  select @Records = count(*) 
    from #ImportBatch
   where substring(DataRow,1,2) = @DistrictCode

  insert Batches (Active, BatchDate, Imported, Records, Type, ImportedRecords, SourceId, Description)
    values ( 1, getdate(), getdate(), @Records, 'Q', @Records, 2, 'Batch Load of ' + @pSourceFile)

  select @BatchId = Scope_Identity() --DCH 11/24/2015 @@IDENTITY

  insert BatchDetail (Active, BatchId, RecordNumber, Type, DistrictCode, Category,
                      CometId, ItemCode, Quantity, OrigType, OrigDistrictCode,
                      OrigCategory, OrigCometCode, OrigItemCode, OrigQuantity,
                      SourceId)
    select 1, @BatchId, RowId, 'Q', substring(DataRow,1,2), @pCategory,
           substring(DataRow,3,5), right('00000000' + substring(DataRow,8,8),15), 
           substring(DataRow,17,6), 'Q', substring(DataRow,1,2),
           @pCategory, substring(DataRow,3,5), 
           right('00000000' + substring(DataRow,8,8),15), substring(DataRow,17,6), 2
      from #ImportBatch
     where substring(DataRow,1,2) = @DistrictCode

  exec sp_BatchVerify @BatchId

  fetch next from BatchCur into @DistrictCode
end

drop table #ImportBatch
```
