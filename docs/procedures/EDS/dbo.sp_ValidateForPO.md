# Procedure: `dbo.sp_ValidateForPO`

_Generated on 2026-05-04T14:49:07.340Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_ValidateForPO` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-04-13 15:54:14 |
| Modified | 2015-03-23 19:14:07 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRSId` | IN | int |  |
| 2 | `@Response` | INOUT | varchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_ValidateForPO] @pRSId int, @Response varchar(max) output
as
declare @TestMsg varchar(max),@AlreadyPO varchar(max), @NotApproved varchar(max), @ItemsNotBid varchar(max), @VendorsNotActive varchar(max), @InvalidBidNumber varchar(max), @ExpiredBid varchar(max), @NotSubmitted varchar(max), @RejectedReqs varchar(max), @ManualPO varchar(max), @Downloaded varchar(max)

select @Response = null

-- Check for Already being made into PO
select @AlreadyPO = null
select @AlreadyPO = coalesce(@AlreadyPO + char(13) + char(10),'') + 'Requisition Number ' + isnull(Requisitions.RequisitionNumber,'') + ' has already been made into a Purchase Order.'
  from ReportSessionLinks rsl with (nolock)
  join Requisitions on Requisitions.RequisitionId = rsl.IntId
  left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
 where rsl.RSId = @pRSId
   and PO.POId is not null
 group by Requisitions.RequisitionId, isnull(Requisitions.RequisitionNumber,'')
 order by Requisitions.RequisitionId
 
-- Check for Already being made into Manual PO
select @ManualPO = null
select @ManualPO = coalesce(@ManualPO + char(13) + char(10),'') + 'Requisition Number ' + isnull(Requisitions.RequisitionNumber,'') + ' has already been made into a Manual Purchase Order.'
  from ReportSessionLinks rsl with (nolock)
  join Requisitions on Requisitions.RequisitionId = rsl.IntId
 where rsl.RSId = @pRSId
   and exists(select Approvals.ApprovalId from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId and Approvals.StatusId = 45)
 group by Requisitions.RequisitionId, isnull(Requisitions.RequisitionNumber,'')
 order by Requisitions.RequisitionId
 
-- Check for Already being Downloaded 
select @Downloaded = null
select @Downloaded = coalesce(@Downloaded + char(13) + char(10),'') + 'Requisition Number ' + isnull(Requisitions.RequisitionNumber,'') + ' has already been Downloaded.'
  from ReportSessionLinks rsl with (nolock)
  join Requisitions on Requisitions.RequisitionId = rsl.IntId
 where rsl.RSId = @pRSId
   and exists(select Approvals.ApprovalId from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId and Approvals.StatusId = 35)
 group by Requisitions.RequisitionId, isnull(Requisitions.RequisitionNumber,'')
 order by Requisitions.RequisitionId
 
-- Check for Not being Submitted
select @NotSubmitted = null
select @NotSubmitted = coalesce(@NotSubmitted + char(13) + char(10),'') + 'Requisition Number ' + isnull(Requisitions.RequisitionNumber,'') + ' has not been submitted.'
  from ReportSessionLinks rsl with (nolock)
  join Requisitions on Requisitions.RequisitionId = rsl.IntId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
 where rsl.RSId = @pRSId
   and not exists(select Approvals.ApprovalId from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId and Approvals.StatusId in (2,3))
 group by Requisitions.RequisitionId, isnull(Requisitions.RequisitionNumber,'')
 order by Requisitions.RequisitionId
 
-- Check for being Rejected
select @RejectedReqs = null
select @RejectedReqs = coalesce(@RejectedReqs + char(13) + char(10),'') + 'Requisition Number ' + isnull(Requisitions.RequisitionNumber,'') + ' is a Rejected Requisition.'
  from ReportSessionLinks rsl with (nolock)
  join Requisitions on Requisitions.RequisitionId = rsl.IntId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
 where rsl.RSId = @pRSId
   and (select top 1 Approvals.StatusId from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId order by Approvals.ApprovalDate desc) = 4
 group by Requisitions.RequisitionId, isnull(Requisitions.RequisitionNumber,'')
 order by Requisitions.RequisitionId
 
-- Check for Not having required approvals
select @NotApproved = null
select @NotApproved = coalesce(@NotApproved + char(13) + char(10),'') + 'Requisition Number ' + isnull(Requisitions.RequisitionNumber,'') + ' does not have the required approvals.'
  from ReportSessionLinks rsl with (nolock)
  join Requisitions on Requisitions.RequisitionId = rsl.IntId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
 where rsl.RSId = @pRSId
   and isnull(Requisitions.ApprovalLevel,0) < isnull(District.RequiredApprovalLevel,0)
 group by Requisitions.RequisitionId, isnull(Requisitions.RequisitionNumber,'')
 order by Requisitions.RequisitionId
 
-- Check for having Items which must be bid
select @ItemsNotBid = null
select @ItemsNotBid = coalesce(@ItemsNotBid + char(13) + char(10),'') + 'Requisition Number ' + isnull(Requisitions.RequisitionNumber,'') + ' contains items which have not been bid.'
  from ReportSessionLinks rsl with (nolock)
  join Requisitions on Requisitions.RequisitionId = rsl.IntId
 where rsl.RSId = @pRSId
   and exists(select DetailId
                from Detail with (nolock)
               where Detail.RequisitionId = Requisitions.RequisitionId
                 and Detail.ItemMustBeBid = 1)
 group by Requisitions.RequisitionId, isnull(Requisitions.RequisitionNumber,'')
 order by Requisitions.RequisitionId
 
-- Check for having Vendors no longer Active
select @VendorsNotActive = null
select @VendorsNotActive = coalesce(@VendorsNotActive + char(13) + char(10),'') + 'Requisition Number ' + isnull(Requisitions.RequisitionNumber,'') + ' contains vendors which are no longer active. Please contact Customer Service.'
  from ReportSessionLinks rsl with (nolock)
  join Requisitions on Requisitions.RequisitionId = rsl.IntId
 where rsl.RSId = @pRSId
   and exists(select DetailId
                from Detail with (nolock)
                left outer join Vendors on Vendors.VendorId = case when isnull(Detail.VendorId,7691) = 0 then 7691 else isnull(Detail.VendorId,7691) end
                                       and Vendors.Active = 1
               where Detail.RequisitionId = Requisitions.RequisitionId
                 and Detail.ItemMustBeBid = 1)
 group by Requisitions.RequisitionId, isnull(Requisitions.RequisitionNumber,'')
 order by Requisitions.RequisitionId
 
-- Check for Bids that are not valid
select @InvalidBidNumber = null
select @InvalidBidNumber = coalesce(@InvalidBidNumber + char(13) + char(10),'') + 'Bid Number ' + cast(isnull(bhact.BidHeaderId,0) as varchar) + ' on Requisition Number ' + isnull(Requisitions.RequisitionNumber,'') + ' is not valid.'
  from ReportSessionLinks rsl with (nolock)
  join Requisitions on Requisitions.RequisitionId = rsl.IntId
  left outer join BidHeaders bhact on bhact.BidHeaderId in
    (select Bh.BidHeaderId
       from Detail with (nolock)
       left outer join BidHeaders bh on bh.BidHeaderId = case ISNULL(Requisitions.BidHeaderId,0) when 0 then Detail.BidHeaderId else Requisitions.BidHeaderId end
      where Detail.RequisitionId = Requisitions.RequisitionId)
  left outer join BidHeaders on isnull(BidHeaders.Active,0) = 1
                            and GETDATE() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
                            and BidHeaders.BidHeaderId = isnull(bhact.BidHeaderId,0)
  where rsl.RSId = @pRSId
    and BidHeaders.BidHeaderId is null
 group by Requisitions.RequisitionId, isnull(bhact.BidHeaderId,0), ISNULL(Requisitions.RequisitionNumber,'')
 order by Requisitions.RequisitionId
 
-- Check for Bids that are not valid by Date
select @ExpiredBid = null
select @ExpiredBid = coalesce(@ExpiredBid + char(13) + char(10),'') + 'Bid Number ' + cast(isnull(BidHeaders.BidHeaderId,0) as varchar) + ' on Requisition Number ' + isnull(Requisitions.RequisitionNumber,'') + 
       case 
         when isnull(BidHeaders.Active,0) = 0 then ' is not valid.' 
         when BidHeaders.EffectiveFrom is null or BidHeaders.EffectiveUntil is null then ' needs it''s Effective Dates set. Please contact Customer Service.'
         when GETDATE() not between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil then ' is no longer valid. Please Contact Customer Service.'
         else ' has an unknown error. Please Contact Customer Service.'
       end
  from ReportSessionLinks rsl with (nolock)
  join Requisitions on Requisitions.RequisitionId = rsl.IntId
  left outer join BidHeaders on BidHeaders.BidHeaderId in
    (select Bh.BidHeaderId
       from Detail with (nolock)
       left outer join BidHeaders bh on bh.BidHeaderId = case ISNULL(Requisitions.BidHeaderId,0) when 0 then Detail.BidHeaderId else Requisitions.BidHeaderId end
      where Detail.RequisitionId = Requisitions.RequisitionId)
 where rsl.RSId = @pRSId
   and (   ISNULL(Bidheaders.Active,0) = 0
        or BidHeaders.EffectiveFrom is null
        or BidHeaders.EffectiveUntil is null 
        or GETDATE() not between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil)
 group by Requisitions.RequisitionId, isnull(BidHeaders.BidHeaderId,0), ISNULL(Requisitions.RequisitionNumber,''),ISNULL(Bidheaders.Active,0), BidHeaders.EffectiveFrom, BidHeaders.EffectiveUntil
 order by Requisitions.RequisitionId

select @Response = null
-- Append any Messages to Final response
select @Response = coalesce(@Response + char(13) + char(10),'') + ISNULL(Msg,'')
  from (
	select @AlreadyPO msg
	union select @NotApproved msg
	union select @ItemsNotBid msg
	union select @ExpiredBid msg
	union select @InvalidBidNumber msg
	union select @VendorsNotActive msg
	union select @ManualPO msg
	union select @NotSubmitted msg
	union select @RejectedReqs msg
	union select @Downloaded msg
		) ss

if Coalesce(@AlreadyPO, @NotApproved, @ItemsNotBid, @ExpiredBid, @InvalidBidNumber, @VendorsNotActive, @ManualPO, @NotSubmitted, @RejectedReqs, @Downloaded) is null
begin
  select @Response = 'OK'
end
else
begin
  select @Response = 'One or more of the selected Requisitions cannot be converted to Purchase Orders. Please check the error messages listed below.' + CHAR(13) + CHAR(10) + CHAR(13) + CHAR(10) + @Response
end
```
