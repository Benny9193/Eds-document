# Procedure: `dbo._sp_FA_UpdateRequisitionStatus`

_Generated on 2026-05-04T14:49:07.177Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `_sp_FA_UpdateRequisitionStatus` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-14 00:03:50 |
| Modified | 2012-06-14 00:03:50 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@requisitionID` | IN | int |  |
| 2 | `@statusID` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Requisitions` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE [dbo].[_sp_FA_UpdateRequisitionStatus] @requisitionID int, @statusID int
AS
	UPDATE	Requisitions
		SET	StatusID = @statusID
	WHERE	RequisitionID = @requisitionID
```
