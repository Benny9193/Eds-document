# Procedure: `dbo.sp_MakeReq`

_Generated on 2026-05-04T13:07:57.485Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_MakeReq` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-07-30 19:17:59 |
| Modified | 2015-11-24 23:37:35 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pImportId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BatchDetail` | USER_TABLE |  |
| `Batches` | USER_TABLE |  |
| `ImportDetail` | USER_TABLE |  |
| `sp_BatchVerify` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_MakeReq] @pImportId int as

-- Declare Local Variables
declare @BatchId int,
        @Records int

-- Get Record Count
select @Records = count(*)
  from ImportDetail
 where ImportId = @pImportId

-- Create New Batch Entry
insert Batches (BatchDate,Records,Type,ImportedRecords,SourceId, InputRecords)
  values (getdate(), @Records, 'Q', @Records, 2, @Records)

-- Get Batch Id
select @BatchId = Scope_Identity() --DCH 11/24/2015 @@identity

-- Load Batch Detail
insert BatchDetail (Active, BatchId, RecordNumber, Type, DistrictCode, Category, CometId, ItemCode, Quantity, SourceId, OrigType, OrigDistrictCode, OrigCategory, OrigCometCode, OrigItemCode, OrigQuantity)
 select 1, @BatchId, min(ImportDetailId), 'Q', substring(ImportData,1,2), substring(ImportData,3,1), 
        '00000', right('0000000000000000' + rtrim(substring(ImportData,305,8)),15), right('000000' + rtrim(substring(ImportData,315,6)),6), 3,
        'Q', substring(ImportData,1,2), substring(ImportData,3,1), 
        '00000', right('0000000000000000' + rtrim(substring(ImportData,305,8)),15), right('000000' + rtrim(substring(ImportData,315,6)),6)
   from ImportDetail
  group by ImportId, ImportData
  having ImportId = @pImportId

exec sp_BatchVerify @BatchId
```
