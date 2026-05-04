# Procedure: `dbo.sp_SmallPOCheck`

_Generated on 2026-05-04T14:49:07.325Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_SmallPOCheck` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2015-03-19 16:25:51 |
| Modified | 2015-03-23 13:11:00 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@SessionId` | IN | int |  |
| 2 | `@RSId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `ReportSessionLinks` | USER_TABLE |  |
| `vw_ApproveRequisitionsBySession` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_SmallPOCheck] @SessionId int, @RSId int
as
select ar.RequisitionNumber,ar.StatusDesc Status,ar.CategoryName,ar.SchoolName,ar.AccountCode,ar.Attention,ar.CometId UserNumber,ar.OrderTypeDisplay OrderType,ar.TotalRequisitionCost Total,ar.LowPOCount SmallPOCount
  from ReportSessionLinks rsl
  join vw_ApproveRequisitionsBySession ar on ar.RequisitionId = rsl.IntId
                                         and ar.SessionId = @SessionId
                                         and ar.LowPOCount != 0
 where rsl.RSId = @RSId
```
