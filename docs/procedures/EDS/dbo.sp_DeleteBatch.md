# Procedure: `dbo.sp_DeleteBatch`

_Generated on 2026-05-04T13:43:18.796Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_DeleteBatch` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-02-27 11:15:00 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pBatchId` | IN | int |  |

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
create procedure sp_DeleteBatch @pSessionId int, @pBatchId int as

begin transaction

delete BatchDetail
 where BatchId = @pBatchId

delete BatchBook
 where BatchId = @pBatchId

delete Batches
 where BatchId = @pBatchId

commit transaction
```
