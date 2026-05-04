# Procedure: `dbo.sp_UpdateReqDetailList`

_Generated on 2026-05-04T14:49:07.336Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UpdateReqDetailList` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2004-05-05 16:33:26 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRSId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Detail` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure dbo.sp_UpdateReqDetailList @pRSId int AS

    Update Detail
       set Reproc = 1
      from Detail
      join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
      join ReportSessionLinks on ReportSessionLinks.IntId = Requisitions.RequisitionId
                             and ReportSessionLinks.RSId = @pRSId
```
