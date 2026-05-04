# Procedure: `dbo.sp_CanDeleteRequisition`

_Generated on 2026-05-04T13:04:00.311Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CanDeleteRequisition` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-08-24 14:40:45 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRequisitionId` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure dbo.sp_CanDeleteRequisition @pRequisitionId varchar(255) AS

declare @CanDelete int

select @CanDelete = count(ApprovalId)
  from Approvals
 where RequisitionId = CONVERT(int,@pRequisitionId)

select @CanDelete
```
