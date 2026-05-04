# Procedure: `dbo.sp_DeleteNoBids`

_Generated on 2026-05-04T13:07:57.433Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_DeleteNoBids` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-02-24 21:15:37 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | varchar(255) |  |
| 2 | `@pRequisitionId` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `detail` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create  procedure sp_DeleteNoBids @pSessionId varchar(255),@pRequisitionId varchar(255) AS

delete detail
  from Detail
  join Vendors on Vendors.VendorId = detail.VendorId
 where RequisitionId = convert(int,@pRequisitionId)
   and Vendors.Code = '0000'
```
