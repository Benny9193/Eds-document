# Procedure: `dbo.sp_QueueReqs`

_Generated on 2026-05-04T13:04:24.172Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_QueueReqs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2015-03-24 15:58:54 |
| Modified | 2015-03-24 15:58:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pRSId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Category` | USER_TABLE |  |
| `CopyRequests` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure dbo.sp_QueueReqs @pSessionId int, @pRSId int
as
insert CopyRequests (RSId, SessionId)
 values (@pRSId, @pSessionId)

select Category.Name CategoryName, Users.CometId, Requisitions.RequisitionNumber, Requisitions.Attention  
  from ReportSessionLinks rsl    
  join Requisitions on Requisitions.RequisitionId = rsl.IntId    
  join Category on Category.CategoryId = Requisitions.CategoryId    
  join Users on Users.UserId = Requisitions.UserId   
 where rsl.RSId = @pRSId
 order by Category.Name, Users.CometId, Requisitions.Attention
```
