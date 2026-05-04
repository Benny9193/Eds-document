# Procedure: `dbo.sp_BatchLoad`

_Generated on 2026-05-04T14:49:07.209Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_BatchLoad` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-08-28 15:08:57 |
| Modified | 2015-11-24 23:37:34 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSourceFile` | IN | varchar(255) |  |

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
CREATE procedure [dbo].[sp_BatchLoad] @pSourceFile varchar(255) AS

-- Create Temp Table
create table #ImportBatch (
DataRow	varchar(256),
RowId	int identity(1,1)
)

-- Declare Local Varaiables
declare @Records int,
	@BatchId int,
	@SQLStmt varchar(1024)

-- Build Load Ascii File into TempDB statement
select @SQLStmt = 'BULK INSERT #ImportBatch FROM ''' + @pSourceFile + ''' WITH (FORMATFILE = ''C:\INETPUB\ASP\EDSIQ\ImportQty1.fmt'')'

execute(@SQLStmt)

-- Get Import Count
select @Records = count(RowId) from #ImportBatch

-- Create New Batch Entry
insert Batches (Active, BatchDate,Records,Type,ImportedRecords,SourceId, InputRecords, Loaded) 
  values (1, getdate(),@Records,'Q',@Records,2, 0, getdate())

-- Get Batch Id
select @BatchId = Scope_Identity() --DCH 11/24/2015 @@identity

-- Load Batch Detail
insert BatchDetail (Active, BatchId, RecordNumber, Type, DistrictCode, Category, CometId, ItemCode, Quantity, SourceId, OrigType, OrigDistrictCode, OrigCategory, OrigCometCode, OrigItemCode, OrigQuantity, OrigBookAmount, BatchFileName)
 select 1, @BatchId, RowId, substring(DataRow,1,1), substring(DataRow,3,2), substring(DataRow,5,1), 
        substring(DataRow,6,5), substring(DataRow,11,15), substring(DataRow,26,6), 2,
        substring(DataRow,1,1), substring(DataRow,3,2), substring(DataRow,5,1), 
        substring(DataRow,6,5), substring(DataRow,11,15), substring(DataRow,26,6), 
        substring(DataRow,32,10), substring(DataRow,42,8)
   from #ImportBatch

-- Remove Temp Table
drop table #ImportBatch

execute sp_BatchVerify @BatchId
```
