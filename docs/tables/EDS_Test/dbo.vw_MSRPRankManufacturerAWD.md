# View: `dbo.vw_MSRPRankManufacturerAWD`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidMSRPResultsId` | int | NO |  |  |
| 2 | `ManufacturerId` | int | YES |  |  |
| 3 | `AverageWeightedDiscount` | decimal(38,6) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidMSRPResultPrices` | USER_TABLE |
| `BidMSRPResults` | USER_TABLE |
| `BidMSRPResultsProductLines` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedNew`](dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedNew.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_MSRPRankManufacturerAWD] as
-- Calculate Average Discount Routine
select BidMSRPResultsId, ManufacturerId,
		case 
			-- Test for All Weights being Zero
			when (select COUNT(*) 
					from BidMSRPResultPrices
					join BidMSRPResultsProductLines bmrpl on bmrpl.BidMSRPResultsProductLineId = BidMSRPResultPrices.BidMSRPResultsProductLineId
					                                     and bmrpl.BidMSRPResultsId = il.BidMSRPResultsId
				                                         and bmrpl.Active = 1
				   where BidMSRPResultPrices.Active = 1
				     and isnull(BidMSRPResultPrices.RangeWeight,0) != 0) = 0 then 
					( select SUM(BidMSRPResultPrices.RangeValue)
						from BidMSRPResultPrices
						join BidMSRPResultsProductLines bmrpl on bmrpl.BidMSRPResultsProductLineId = BidMSRPResultPrices.BidMSRPResultsProductLineId
															 and bmrpl.BidMSRPResultsId = il.BidMSRPResultsId
					                                         and bmrpl.Active = 1
					   where BidMSRPResultPrices.Active = 1) / 
					( select Count(*)
						from BidMSRPResultPrices
						join BidMSRPResultsProductLines bmrpl on bmrpl.BidMSRPResultsProductLineId = BidMSRPResultPrices.BidMSRPResultsProductLineId
															 and bmrpl.BidMSRPResultsId = il.BidMSRPResultsId
					                                         and bmrpl.Active = 1
					   where BidMSRPResultPrices.Active = 1)
			-- Not All Zero
			else
					( select SUM(BidMSRPResultPrices.RangeValue * BidMSRPResultPrices.RangeWeight)
						from BidMSRPResultPrices
						join BidMSRPResultsProductLines bmrpl on bmrpl.BidMSRPResultsProductLineId = BidMSRPResultPrices.BidMSRPResultsProductLineId
															 and bmrpl.BidMSRPResultsId = il.BidMSRPResultsId
					                                         and bmrpl.Active = 1
					   where BidMSRPResultPrices.Active = 1) / 
					( select SUM(BidMSRPResultPrices.RangeWeight)
						from BidMSRPResultPrices
						join BidMSRPResultsProductLines bmrpl on bmrpl.BidMSRPResultsProductLineId = BidMSRPResultPrices.BidMSRPResultsProductLineId
															 and bmrpl.BidMSRPResultsId = il.BidMSRPResultsId
					                                         and bmrpl.Active = 1
					   where BidMSRPResultPrices.Active = 1)
		end as AverageWeightedDiscount
  from (
select BidMSRPResults.BidMSRPResultsId, BidMSRPResults.ManufacturerId
  from BidMSRPResults
 group by BidMSRPResults.BidMSRPResultsId, BidMSRPResults.ManufacturerId
		) il
```
