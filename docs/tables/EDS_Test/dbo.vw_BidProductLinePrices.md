# View: `dbo.vw_BidProductLinePrices`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidProductLineId` | int | NO |  |  |
| 2 | `RangeBase` | money | YES |  |  |
| 3 | `RangeTop` | numeric(20,4) | YES |  |  |
| 4 | `DiscountRate` | decimal(9,5) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidProductLinePrices` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_MSRPMPLVendorsCategoriesBySession`](dbo.vw_MSRPMPLVendorsCategoriesBySession.md) | VIEW |
| [`dbo.vw_MSRPMPLVendorsCategoriesReport`](dbo.vw_MSRPMPLVendorsCategoriesReport.md) | VIEW |
| [`dbo.vw_MSRPMPLVendorsCategoriesReportBC`](dbo.vw_MSRPMPLVendorsCategoriesReportBC.md) | VIEW |

## Definition

```sql
--select * from vw_BidProductLinePrices where BidProductLineId = 6427 order by RangeBase

create   view  [dbo].[vw_BidProductLinePrices] as

	select bpl.BidProductLineId, bpl.RangeBase, bpl1.RangeBase - .01 RangeTop, bpl.DiscountRate
	  from BidProductLinePrices bpl
	  left outer join BidProductLinePrices bpl1 on bpl1.BidProductLineId = bpl.BidProductLineId
	                                           and bpl1.BidProductLinePriceId =
													(select top 1 bpl2.BidProductLinePriceId
													   from BidProductLinePrices bpl2
													  where bpl2.BidProductLineId = bpl.BidProductLineId
													    and bpl2.RangeBase > bpl.RangeBase
													    and bpl2.DiscountRate != bpl.DiscountRate
													  order by bpl2.RangeBase)
	 where bpl.BidProductLinePriceId not in (select bpl3.BidProductLinePriceId
	                                           from BidProductLinePrices bpl3
	                                          where bpl3.BidProductLineId = bpl.BidProductLineId
	                                            and bpl3.RangeBase between (select Top 1 bpl4.RangeBase
	                                                                          from BidProductLinePrices bpl4
	                                                                         where bpl4.BidProductLineId = bpl3.BidProductLineId
	                                                                           and bpl4.DiscountRate = bpl3.DiscountRate
	                                                                         Order by bpl4.RangeBase) + 0.01 and
	                                                                       (select Top 1 bpl4.RangeBase
	                                                                          from BidProductLinePrices bpl4
	                                                                         where bpl4.BidProductLineId = bpl3.BidProductLineId
	                                                                           and bpl4.DiscountRate = bpl3.DiscountRate
	                                                                         Order by bpl4.RangeBase desc))
```
