# View: `dbo.vw_MPIHeadings`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `HeadingId` | bigint | YES |  |  |
| 3 | `HeadingTitle` | varchar(308) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidItems` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `DistrictPP` | USER_TABLE |
| `Headings` | USER_TABLE |
| `Items` | USER_TABLE |
| `Keywords` | USER_TABLE |
| `PPCategory` | USER_TABLE |
| `Requisitions` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_MPIHeadings] as
select Requisitions.RequisitionId, (cast(case when Keywords.KeywordId is null then 0 else Keywords.KeywordId end as bigint) * cast(4294967296 as bigint)) + cast(Headings.HeadingId as bigint) HeadingId, Headings.Title + case when Keywords.KeywordId is null then '' else ' - ' + Keywords.Keyword end HeadingTitle
--  from vw_ItemsByBid with (nolock)
  from Requisitions with (nolock)
  join BidHeaders on BidHeaders.CategoryId = Requisitions.CategoryId
                 and BidHeaders.BidHeaderId in (
	  select bh.BidHeaderId
		from Budgets with (nolock)
		join Category on Category.CategoryId = Requisitions.CategoryId
		join BidHeaders bh on bh.CategoryId = Category.CategoryId
		                  and bh.Active = 1
		                  and bh.ParentBidHeaderId = Requisitions.BidHeaderId
 		                  and isnull(bh.DistrictId,0) = case isnull(bh.BidType,1) when 2 then Budgets.DistrictId else isnull(bh.DistrictId,0) end
					      and getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
		join PPCategory on PPCategory.PricePlanId = bh.PricePlanId
				       and PPCategory.CategoryId = bh.CategoryId
		join DistrictPP on DistrictPP.PricePlanId = bh.PricePlanId
					   and DistrictPP.DistrictId = Budgets.DistrictId
	   where bh.PricePlanId = DistrictPP.PricePlanId
	     and Budgets.BudgetId = Requisitions.BudgetId
	  union 	  select bh.BidHeaderId
		from Budgets with (nolock)
		join Category on Category.CategoryId = Requisitions.CategoryId
		join BidHeaders bh on bh.CategoryId = Category.CategoryId
		                  and bh.Active = 1
		                  and bh.BidHeaderId = Requisitions.BidHeaderId
 		                  and isnull(bh.DistrictId,0) = case isnull(bh.BidType,1) when 2 then Budgets.DistrictId else isnull(bh.DistrictId,0) end
					      and getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
		join PPCategory on PPCategory.PricePlanId = bh.PricePlanId
				       and PPCategory.CategoryId = bh.CategoryId
		join DistrictPP on DistrictPP.PricePlanId = bh.PricePlanId
					   and DistrictPP.DistrictId = Budgets.DistrictId
	   where bh.PricePlanId = DistrictPP.PricePlanId
	     and Budgets.BudgetId = Requisitions.BudgetId
  )
  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           and Bids.Active = 1
  join BidItems on BidItems.BidId = Bids.BidId
  join Items on Items.ItemId = BidItems.ItemId
            and Items.Active = 1
            and Items.CategoryId = Requisitions.CategoryId
  join Headings on Headings.HeadingId = Items.HeadingId
               and Headings.CategoryId = Requisitions.CategoryId
  left outer join Keywords on Keywords.KeywordId = Items.KeywordId
                          and Keywords.CategoryId = Requisitions.CategoryId
 group by Requisitions.RequisitionId, (cast(case when Keywords.KeywordId is null then 0 else Keywords.KeywordId end as bigint) * cast(4294967296 as bigint)) + cast(Headings.HeadingId as bigint), Headings.Title + case when Keywords.KeywordId is null then '' else ' - ' + Keywords.Keyword end
```
