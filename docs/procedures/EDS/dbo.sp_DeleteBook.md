# Procedure: `dbo.sp_DeleteBook`

_Generated on 2026-05-04T13:07:57.431Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_DeleteBook` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-02-27 11:19:20 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pBatchId` | IN | int |  |
| 3 | `@pBookId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BatchBook` | USER_TABLE |  |
| `BatchDetail` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  procedure sp_DeleteBook @pSessionId int, @pBatchId int, @pBookId int as

begin transaction

Delete BatchDetail
 where BatchId = @pBatchId and BatchBookId = @pBookId

Delete BatchBook
 where BatchBookId = @pBookId

commit transaction
```
