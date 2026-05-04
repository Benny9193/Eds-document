# Procedure: `dbo.sp_CreateTextBookBidRequest`

_Generated on 2026-05-04T13:04:00.358Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CreateTextBookBidRequest` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-06-08 15:19:01 |
| Modified | 2015-11-24 23:37:32 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRSId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_CreateTextBookBidRequest] @pRSId int AS

declare @BidHeaderId int

insert BidHeaders (Active, CategoryId, PricePlanId, DistrictId, BidMessage)
  select 1, Requisitions.CategoryId, Detail.PricePlanId, 
         District.DistrictId, 'Textbook Bid Request for ' + rtrim(District.Name)
    from ReportSessionLinks
    join Requisitions on Requisitions.RequisitionId = ReportSessionLinks.IntId
    join Detail on Detail.RequisitionId = Requisitions.RequisitionId
    join School on School.SchoolId = Requisitions.SchoolId
    join District on District.DistrictId = School.DistrictId
    join Category on Category.CategoryId = Requisitions.CategoryId
   where ReportSessionLinks.RSId = @pRSId and Category.Type = 2
   group by Requisitions.CategoryId, Detail.PricePlanId, District.DistrictId, District.Name

select @BidHeaderId = Scope_Identity() --DCH 11/24/2015 @@IDENTITY

insert BidRequestItems (BidHeaderId, ItemId, BidRequest)
  select @BidHeaderId, Detail.ItemId, sum(Detail.Quantity)
    from ReportSessionLinks
    join Requisitions on Requisitions.RequisitionId = ReportSessionLinks.IntId
    join Detail on Detail.RequisitionId = Requisitions.RequisitionId
    join School on School.SchoolId = Requisitions.SchoolId
    join District on District.DistrictId = School.DistrictId
    join Category on Category.CategoryId = Requisitions.CategoryId
   where ReportSessionLinks.RSId = @pRSId and Category.Type = 2
  group by Detail.ItemId
```
