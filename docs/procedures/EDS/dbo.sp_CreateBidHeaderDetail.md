# Procedure: `dbo.sp_CreateBidHeaderDetail`

_Generated on 2026-05-04T13:04:00.340Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CreateBidHeaderDetail` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-05-08 09:09:37 |
| Modified | 2022-12-08 10:20:19 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRSId` | IN | int |  |
| 2 | `@pRSId2` | IN | int |  |
| 3 | `@pBidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `BidHeaderDetail` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `vw_DetailDescription` | VIEW |  |
| `vw_ItemDescription` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE       procedure [dbo].[sp_CreateBidHeaderDetail] @pRSId int, @pRSId2 int, @pBidHeaderId int as

SET NOCOUNT ON
set transaction isolation level read uncommitted
declare @RecCount int,
	@BidType int

-- Get Bid Type
select @BidType = isnull(BidType,2)
  from BidHeaders
 where BidHeaderId = @pBidHeaderId

-- Attach Requested Items to Bid Request
--insert BidRequestItems (BidHeaderId, ItemId, BidRequest, RequisitionCount, Active)
--  select @pBidHeaderId, Detail.ItemId, sum(Detail.Quantity), count(*), 1)
--Changed 2 lines below dch 1/16/2012 to Fixed Same Item with differenct extraInformation
insert BidRequestItems (BidHeaderId, ItemId, BidRequest, RequisitionCount, Active, [Checksum])
  select @pBidHeaderId, Detail.ItemId, sum(Detail.Quantity), count(*), 1, CHECKSUM(case @BidType when 2 then dd.ItemDescription else id.ItemDescription end)
    from ReportSessionLinks rsl with (nolock)
--    join Requisitions on Requisitions.RequisitionId = rsl.IntId
    join Detail on Detail.RequisitionId = rsl.IntId --Requisitions.RequisitionId
    join vw_DetailDescription dd on dd.DetailId = Detail.DetailId
    join vw_ItemDescription id on id.ItemId = Detail.ItemId
--    join Items on Items.ItemId = Detail.ItemId
    join ReportSessionLinks RS2 on RS2.IntId = Detail.ItemId
                               and RS2.RSId = @pRSId2
   where rsl.RSId = @pRSId
--added line below dch 1/16/2012 to Fixed Same Item with differenct extraInformation
   group by Detail.ItemId, checksum(case @BidType when 2 then dd.ItemDescription else id.ItemDescription end)
--   group by Detail.ItemId

select @RecCount = @@rowcount

--if @BidType = 2 -- DCH 7/7/05
--begin
  -- Attach Requested Detail to Bid Header
  insert BidHeaderDetail (BidHeaderId, DetailId, BidRequestItemId, Quantity, RequisitionId)
    select @pBidHeaderId, Detail.DetailId, BidRequestItems.BidRequestItemId, Quantity, Detail.RequisitionId
      from Detail with (nolock)
--      join Items on Items.ItemId = Detail.ItemId
--      join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
      join vw_DetailDescription dd on dd.DetailId = Detail.DetailId
      join vw_ItemDescription id on id.ItemId = Detail.ItemId
      join ReportSessionLinks on ReportSessionLinks.RSId = @pRSId
                             and ReportSessionLinks.IntId = Detail.RequisitionId --Requisitions.RequisitionId
      join ReportSessionLinks RS2 on RS2.RSId = @pRSId2
                                 and RS2.IntId = Detail.ItemId
      join BidRequestItems on BidRequestItems.BidHeaderId = @pBidHeaderId
                          and BidRequestItems.ItemId = Detail.ItemId
--added line below dch 1/16/2012 to Fixed Same Item with differenct extraInformation
                          and BidRequestItems.[Checksum] = CHECKSUM(case @BidType when 2 then dd.ItemDescription else id.ItemDescription end)
                          
if @BidType = 2
begin
  insert Approvals (Level, StatusId, RequisitionId, ApprovalDate)
    select 5, 29, Requisitions.RequisitionId, getdate()
      from Detail with (nolock)
      join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
      join ReportSessionLinks on ReportSessionLinks.RSId = @pRSId
                             and ReportSessionLinks.IntId = Requisitions.RequisitionId
      join ReportSessionLinks RS2 on RS2.RSId = @pRSId2
                                 and RS2.IntId = Detail.ItemId
      join BidRequestItems on BidRequestItems.BidHeaderId = @pBidHeaderId
                          and BidRequestItems.ItemId = Detail.ItemId
     group by Requisitions.RequisitionId
/*
-- Update Reqs with BidHeaderId
Update Detail
   set BidHeaderId = @pBidHeaderId
  from Detail
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join ReportSessionLinks on ReportSessionLinks.IntId = Requisitions.RequisitionId
  join ReportSessionLinks RS2 on RS2.IntId = Detail.ItemId
 where ReportSessionLinks.RSId = @pRSId
   and RS2.RSId = @pRSId2
*/
end

/*
Update BidHeaders
   set Active = 1
 where BidHeaderId = @pBidHeaderId
*/

SET NOCOUNT OFF

select @RecCount ItemCount
```
