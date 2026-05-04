# Procedure: `dbo.sp_CreateBidHeaderItems`

_Generated on 2026-05-04T13:04:24.102Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CreateBidHeaderItems` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-05-08 11:52:12 |
| Modified | 2015-11-24 23:37:33 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRSId` | IN | int |  |
| 2 | `@pBidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `ReportSession` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_CreateBidHeaderItems] @pRSId int, @pBidHeaderId int as

declare @RSId int,
	@BidType int

set NOCOUNT ON
set transaction isolation level read uncommitted
select @BidType = isnull(BidType,2)
  from BidHeaders with (nolock)
 where BidHeaderId = @pBidHeaderId

-- Create Report Session
insert ReportSession (ReportStarted) values (getdate())

select @RSId = Scope_Identity() --DCH 11/24/2015 @@IDENTITY

if @BidType = 1
begin
  -- Attach Requested Items to Bid Request
  insert ReportSessionLinks (RSId, IntId)
    select @RSId, Detail.ItemId
      from Detail with (nolock)
      join Items on Items.ItemId = Detail.ItemId
      join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
      join ReportSessionLinks on ReportSessionLinks.IntId = Requisitions.RequisitionId
      join BidHeaders on BidHeaders.BidHeaderId = @pBidHeaderId
     where ReportSessionLinks.RSId = @pRSId
     group by Detail.ItemId
end
else
begin
  -- Attach Requested Items to Bid Request
  insert ReportSessionLinks (RSId, IntId)
    select @RSId, Detail.ItemId
      from Detail with (nolock)
      join Items on Items.ItemId = Detail.ItemId
      join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
      join ReportSessionLinks on ReportSessionLinks.IntId = Requisitions.RequisitionId
      join BidHeaders on BidHeaders.BidHeaderId = @pBidHeaderId
     where ReportSessionLinks.RSId = @pRSId
       and Detail.ItemMustBeBid = 1 
     group by Detail.ItemId
end

SET NOCOUNT OFF

select @RSId RSId
```
