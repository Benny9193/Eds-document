# Procedure: `dbo.sp_WarningsForPO`

_Generated on 2026-05-04T13:04:24.211Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_WarningsForPO` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2013-08-07 10:37:33 |
| Modified | 2015-04-07 10:00:23 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRSId` | IN | int |  |
| 2 | `@Response` | INOUT | varchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BudgetAccounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_WarningsForPO] @pRSId int, @Response varchar(max) output
as
declare @OverBudget varchar(max), @SmallPOs varchar(max)

select @Response = null

-- Check for being overbudget
select @OverBudget = null
select @OverBudget = coalesce(@OverBudget + char(13) + char(10),'') + 'Requisition Number ' + isnull(Requisitions.RequisitionNumber,'') + ' is over budget.'
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
select @SmallPOs = null
select @SmallPOs = coalesce(@SmallPOs + char(13) + char(10),'') + 'Requisition Number ' + isnull(spc.RequisitionNumber,'') + ' will generate ' + cast(spc.LowPOCount as varchar) + ' Purchase Orders below the District Minimum of $' + cast(CAST(isnull(spc.MinimumPOAmount,0) as Int) as varchar) + '.00'
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
 order by spc.RequisitionId

-- Append any Messages to Final response
select @Response = coalesce(@Response + char(13) + char(10),'') + ISNULL(msg,'')
  from (select @OverBudget msg
		union select @SmallPOs msg
		) spc

if coalesce(@OverBudget,@SmallPOs) is null
begin
  select @Response = 'OK'
end
else
begin
  select @Response = 'One or more of the selected Requisitions have warnings that must be verified prior to being converted to Purchase Orders. Please check the warning messages listed below.' + CHAR(13) + CHAR(10) + CHAR(13) + CHAR(10) + @Response
end
```
