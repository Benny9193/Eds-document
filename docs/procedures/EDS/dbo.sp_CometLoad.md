# Procedure: `dbo.sp_CometLoad`

_Generated on 2026-05-04T13:07:57.390Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CometLoad` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-02-19 08:08:40 |
| Modified | 2015-11-24 23:37:34 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSourceFile` | IN | varchar(255) |  |
| 2 | `@pDistrictCode` | IN | varchar(2) |  |
| 3 | `@pCategoryCode` | IN | varchar(1) |  |

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
CREATE procedure [dbo].[sp_CometLoad] @pSourceFile varchar(255), @pDistrictCode varchar(2), @pCategoryCode varchar(1) AS

-- Create Temp Table
create table #ImportBatch (
DataRow	varchar(256),
RowId	int identity(1,1)
)

-- Declare Local Varaiables
declare @Records int,
	@BatchId int,
	@SQLStmt varchar(1024)

print 'Ready to Import DataFile'

-- Build Load Ascii File into TempDB statement
select @SQLStmt = 'BULK INSERT #ImportBatch FROM ''' + @pSourceFile + ''' WITH (FORMATFILE = ''C:\INETPUB\ASP\EDSIQ\ImportQty1.fmt'')'

execute(@SQLStmt)

print 'Data File Loaded'

-- Get Import Count
select @Records = count(RowId) from #ImportBatch

print 'Records=' + isnull(convert(varchar(16),@Records),'<null>')

-- Create New Batch Entry
insert Batches (BatchDate,Records,Type,ImportedRecords,SourceId, InputRecords) values (getdate(),@Records,'Q',@Records,2, 0)

-- Get Batch Id
select @BatchId = Scope_Identity() --DCH 11/24/2015 @@identity

print 'Ready to Load Detail'

-- Load Batch Detail
insert BatchDetail (Active, BatchId, RecordNumber, Type, DistrictCode, Category, CometId, ItemCode, Quantity, SourceId, OrigType, OrigDistrictCode, OrigCategory, OrigCometCode, OrigItemCode, OrigQuantity)
 select 1, @BatchId, RowId, 'Q', @pDistrictCode, @pCategoryCode, 
        substring(DataRow,1,5), right('0000000000000000' + rtrim(substring(DataRow,6,8)),15), right('000000' + rtrim(substring(DataRow,15,6)),6), 3,
        'Q', @pDistrictCode, @pCategoryCode, 
        substring(DataRow,1,5), right('0000000000000000' + rtrim(substring(DataRow,6,8)),15), right('000000' + rtrim(substring(DataRow,15,6)),6)
   from #ImportBatch

-- Remove Temp Table
drop table #ImportBatch
print 'Ready to Verify'

execute sp_BatchVerify @BatchId
```
