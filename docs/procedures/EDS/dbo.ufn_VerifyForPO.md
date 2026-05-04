# Function: table-valued: `dbo.ufn_VerifyForPO`

_Generated on 2026-05-04T13:43:19.140Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `ufn_VerifyForPO` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2015-03-23 22:06:45 |
| Modified | 2015-03-23 22:06:45 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRSId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create function [dbo].[ufn_VerifyForPO](@pRSId int)
returns @we table (
RequisitionId int, 
DistrictName varchar(50) null, 
BudgetName varchar(50) null, 
RequisitionNumber varchar(50) null, 
SchoolName varchar(50) null, 
UserNumber int null, 
Attention varchar(50) null,
ErrorMsg varchar(255)
)
as
begin
-- Check for Already being made into PO
insert @we(RequisitionId, ErrorMsg)
select Requisitions.RequisitionId, 'Already been made into a Purchase Order.'
  from ReportSessionLinks rsl with (nolock)
  join Requisitions on Requisitions.RequisitionId = rsl.IntId
  left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
 where rsl.RSId = @pRSId
   and PO.POId is not null
 group by Requisitions.RequisitionId, isnull(Requisitions.RequisitionNumber,'')
 order by Requisitions.RequisitionId
 
-- Check for Already being made into Manual PO
insert @we(RequisitionId, ErrorMsg)
select Requisitions.RequisitionId, 'Already been made into a Manual Purchase Order.'
  from ReportSessionLinks rsl with (nolock)
  join Requisitions on Requisitions.RequisitionId = rsl.IntId
 where rsl.RSId = @pRSId
   and exists(select Approvals.ApprovalId from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId and Approvals.StatusId = 45)
 group by Requisitions.RequisitionId, isnull(Requisitions.RequisitionNumber,'')
 order by Requisitions.RequisitionId
 
-- Check for Already being Downloaded 
insert @we(RequisitionId, ErrorMsg)
select Requisitions.RequisitionId, 'Already been Downloaded.'
  from ReportSessionLinks rsl with (nolock)
  join Requisitions on Requisitions.RequisitionId = rsl.IntId
 where rsl.RSId = @pRSId
   and exists(select Approvals.ApprovalId from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId and Approvals.StatusId = 35)
 group by Requisitions.RequisitionId, isnull(Requisitions.RequisitionNumber,'')
 order by Requisitions.RequisitionId
 
-- Check for Not being Submitted
insert @we(RequisitionId, ErrorMsg)
select Requisitions.RequisitionId, 'Has not been submitted.'
  from ReportSessionLinks rsl with (nolock)
  join Requisitions on Requisitions.RequisitionId = rsl.IntId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
 where rsl.RSId = @pRSId
   and not exists(select Approvals.ApprovalId from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId and Approvals.StatusId in (2,3))
 group by Requisitions.RequisitionId, isnull(Requisitions.RequisitionNumber,'')
 order by Requisitions.RequisitionId
 
-- Check for being Rejected
insert @we(RequisitionId, ErrorMsg)
select Requisitions.RequisitionId, 'Is a Rejected Requisition.'
  from ReportSessionLinks rsl with (nolock)
  join Requisitions on Requisitions.RequisitionId = rsl.IntId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
 where rsl.RSId = @pRSId
   and (select top 1 Approvals.StatusId from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId order by Approvals.ApprovalDate desc) = 4
 group by Requisitions.RequisitionId, isnull(Requisitions.RequisitionNumber,'')
 order by Requisitions.RequisitionId
 
-- Check for Not having required approvals
insert @we(RequisitionId, ErrorMsg)
select Requisitions.RequisitionId, 'Does not have the required approvals.'
  from ReportSessionLinks rsl with (nolock)
  join Requisitions on Requisitions.RequisitionId = rsl.IntId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
 where rsl.RSId = @pRSId
   and isnull(Requisitions.ApprovalLevel,0) < isnull(District.RequiredApprovalLevel,0)
 group by Requisitions.RequisitionId, isnull(Requisitions.RequisitionNumber,'')
 order by Requisitions.RequisitionId
 
-- Check for having Items which must be bid
insert @we(RequisitionId, ErrorMsg)
select Requisitions.RequisitionId, 'Contains items which have not been bid.'
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
insert @we(RequisitionId, ErrorMsg)
select Requisitions.RequisitionId, 'Contains vendors which are no longer active. Please contact Customer Service.'
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
insert @we(RequisitionId, ErrorMsg)
select Requisitions.RequisitionId, 'Bid Number ' + cast(isnull(bhact.BidHeaderId,0) as varchar) + ' is not valid.'
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
insert @we(RequisitionId, ErrorMsg)
select Requisitions.RequisitionId, 'Bid Number' + cast(isnull(BidHeaders.BidHeaderId,0) as varchar) + 
       case 
         when isnull(BidHeaders.Active,0) = 0 then ' is not valid.' 
         when BidHeaders.EffectiveFrom is null or BidHeaders.EffectiveUntil is null then ' needs it''s Effective Dates set.'
         when GETDATE() not between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil then ' is no longer valid.'
         else ' has an unknown error.'
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

-- Check for being overbudget
insert @we(RequisitionId, ErrorMsg)
select Requisitions.RequisitionId, 'Is over budget.'
  from ReportSessionLinks rsl with (nolock)
  join Requisitions on Requisitions.RequisitionId = rsl.IntId
  join BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId
  join UserAccounts on UserAccounts.UserAccountId = Requisitions.UserAccountId
 where rsl.RSId = @pRSId
   and (   (    BudgetAccounts.UseAllocations = 1
            and BudgetAccounts.AmountAvailable < 0)
        or (    UserAccounts.UseAllocations = 1
            and UserAccounts.AllocationAvailable < 0))
 group by Requisitions.RequisitionId, isnull(Requisitions.RequisitionNumber,'')
 order by Requisitions.RequisitionId

--Check for PO's below District Minimum
insert @we(RequisitionId, ErrorMsg)
select spc.RequisitionId, 'Will generate ' + cast(spc.LowPOCount as varchar) + ' Purchase Orders below the District Minimum of $' + cast(CAST(isnull(spc.MinimumPOAmount,0) as Int) as varchar) + '.00'
  from (
      select Requisitions.RequisitionId, isnull(Requisitions.RequisitionNumber,'') RequisitionNumber, isnull(District.MinimumPOAmount,0) MinimumPOAmount,
			(select COUNT(*) 
			   from (
				 select VendorId
				   from Detail 
				  where Detail.RequisitionId = Requisitions.RequisitionId
					and isnull(Detail.ItemMustBeBid,0) = 0
					and ISNULL(District.MinimumPOAmount,0) > 0
					and Detail.VendorId != 7691
				   group by VendorId
				   having sum(Detail.Quantity * Detail.BidPrice) < District.MinimumPOAmount) spoc) LowPOCount
		  from ReportSessionLinks rsl with (nolock)
		  join Requisitions on Requisitions.RequisitionId = rsl.IntId
		  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
		  join District on District.DistrictId = Budgets.DistrictId
					   and isnull(District.MinimumPOAmount,0) > 0
		 where rsl.RSId = @pRSId
		 ) spc
 where spc.LowPOCount > 0
 group by spc.RequisitionId, isnull(spc.RequisitionNumber,''), isnull(spc.MinimumPOAmount,0), spc.LowPOCount

update weu
   set DistrictName = ss.DistrictName,
       BudgetName = ss.BudgetName,
       RequisitionNumber = ss.RequisitionNumber,
       SchoolName = ss.SchoolName,
       UserNumber = ss.CometId,
       Attention = ss.Attention
  from @we weu
  join (
select we.RequisitionId, District.Name DistrictName, Budgets.Name BudgetName, Requisitions.RequisitionNumber, School.Name SchoolName, Users.CometId, Requisitions.Attention, we.ErrorMsg
  from @we we
  join Requisitions on Requisitions.RequisitionId = we.RequisitionId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
  join School on School.SchoolId = Requisitions.SchoolId
  join Users on Users.UserId = Requisitions.UserId
) ss on ss.RequisitionId = weu.RequisitionId 

	return
end
```
