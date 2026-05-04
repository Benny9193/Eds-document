# Procedure: `dbo.sp_MPIHeadings`

_Generated on 2026-05-04T13:04:00.418Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_MPIHeadings` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2015-02-25 16:39:25 |
| Modified | 2021-03-23 10:22:14 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@RequisitionId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `DistrictPP` | USER_TABLE |  |
| `Headings` | USER_TABLE |  |
| `Keywords` | USER_TABLE |  |
| `PPCategory` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `dbo.PricingConsolidated` | unresolved | `SearchData` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_MPIHeadings] @RequisitionId int as
set nocount on
declare @BidHeaderId int, @DistrictId int, @CategoryId int
declare @BidsList table (RequisitionId int, BidHeaderId int)
declare @Headings table (HeadingId bigint, HeadingTitle varchar(255))

select @BidHeaderId = isnull(Requisitions.BidHeaderId,0),
	   @DistrictId = isnull(Budgets.DistrictId,0),
	   @CategoryId = isnull(Requisitions.CategoryId,0)
  from Requisitions with (nolock) 
  left outer join Budgets on Budgets.BudgetId = Requisitions.BudgetId
 where RequisitionId = @RequisitionId

-- Build Base List of Bids for each Requisition
  if @BidHeaderId is not null and @BidHeaderId != 0
  begin
	  insert @BidsList (RequisitionId, BidHeaderId)
		values (@RequisitionId, @BidHeaderId)
  end
     
  -- Add All other bids needed to list
  while @@rowcount != 0
  begin
	-- Add Parent PreBids
	insert @BidsList (RequisitionId, BidHeaderId)
	  select Requisitions.RequisitionId, BidHeaders.BidHeaderId
		from Requisitions with (nolock)
		join @BidsList bl on bl.RequisitionId = Requisitions.RequisitionId
		join Budgets on Budgets.BudgetId = Requisitions.BudgetId
		join Category on Category.CategoryId = Requisitions.CategoryId
		             and Category.CategoryId = @CategoryId
		join BidHeaders on BidHeaders.CategoryId = Requisitions.CategoryId
		               and BidHeaders.Active = 1
		               and BidHeaders.ParentBidHeaderId = bl.BidHeaderId
 		               and isnull(BidHeaders.DistrictId,0) = case isnull(BidHeaders.BidType,1) when 2 then Budgets.DistrictId else isnull(BidHeaders.DistrictId,0) end
					   and getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
		join PPCategory on PPCategory.PricePlanId = BidHeaders.PricePlanId
				       and PPCategory.CategoryId = BidHeaders.CategoryId
		join DistrictPP on DistrictPP.PricePlanId = BidHeaders.PricePlanId
					   and DistrictPP.DistrictId = Budgets.DistrictId
		left outer join @BidsList ble on ble.RequisitionId = Requisitions.RequisitionId
		                             and ble.BidHeaderId = BidHeaders.BidHeaderId
	   where BidHeaders.PricePlanId = DistrictPP.PricePlanId
	     and ble.BidHeaderId is null
	   group by Requisitions.RequisitionId, BidHeaders.BidHeaderId
  end

/* Old Code Removed 2/9/2016 DCH
  -- Build Base List of Bids for each Requisition
  insert @BidsList (BidHeaderId)
    select Requisitions.BidHeaderId
      from Requisitions
     where Requisitions.RequisitionId = @RequisitionId
   
  -- Add All other bids needed to list
  while @@rowcount != 0
  begin
	-- Add Parent PreBids
	insert @BidsList (BidHeaderId)
	  select BidHeaders.BidHeaderId
		from BidHeaders 
		left outer join @BidsList ble on ble.BidHeaderId = BidHeaders.BidHeaderId
	   where BidHeaders.ParentBidHeaderId = BidHeaders.BidHeaderId
		 and BidHeaders.Active = 1
		 and getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
	     and ble.BidHeaderId is null
	   group by BidHeaders.BidHeaderId
  end
*/
insert @Headings (HeadingId, HeadingTitle)
select min(cast(Headings.HeadingId as bigint)) HeadingId, Headings.Title HeadingTitle
  from @BidsList bl
  join SearchData.dbo.PricingConsolidated on PricingConsolidated.BidHeaderId = bl.BidHeaderId
                                         and PricingConsolidated.BidItemFlag = 1
										 and PricingConsolidated.VendorId != 7691
/*
  join BidHeaders on BidHeaders.BidHeaderId = bl.BidHeaderId
  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           and Bids.Active = 1
           and Bids.VendorId != 7691
  join BidItems on BidItems.BidId = Bids.BidId
  join Items on Items.ItemId = BidItems.ItemId
            and Items.Active = 1
            and Items.CategoryId = BidHeaders.CategoryId
			and Items.CategoryId = @CategoryId
*/
  join Headings on Headings.HeadingId = PricingConsolidated.HeadingId
               and Headings.CategoryId in (0, PricingConsolidated.CategoryId)
 group by Headings.Title
union
select min((cast(case when Keywords.KeywordId is null then 0 else Keywords.KeywordId end as bigint) * cast(4294967296 as bigint)) + cast(Headings.HeadingId as bigint)) HeadingId, Headings.Title + case when Keywords.KeywordId is null then '' else ' - ' + Keywords.Keyword end HeadingTitle
  from @BidsList bl
  join SearchData.dbo.PricingConsolidated on PricingConsolidated.BidHeaderId = bl.BidHeaderId
                                         and PricingConsolidated.BidItemFlag = 1
										 and PricingConsolidated.VendorId != 7691
/*
  join BidHeaders on BidHeaders.BidHeaderId = bl.BidHeaderId
  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           and Bids.Active = 1
           and Bids.VendorId != 7691
  join BidItems on BidItems.BidId = Bids.BidId
  join Items on Items.ItemId = BidItems.ItemId
            and Items.Active = 1
            and Items.CategoryId = BidHeaders.CategoryId
			and Items.CategoryId = @CategoryId
*/
  join Headings on Headings.HeadingId = PricingConsolidated.HeadingId
               and Headings.CategoryId in (0, PricingConsolidated.CategoryId)
  join Keywords on Keywords.KeywordId = PricingConsolidated.KeywordId
               and Keywords.CategoryId in (0, PricingConsolidated.CategoryId)
 group by Headings.Title + case when Keywords.KeywordId is null then '' else ' - ' + Keywords.Keyword end

select HeadingId, HeadingTitle from @Headings order by HeadingTitle
```
