# View: `dbo.vw_MSRPRankProductLineAWD`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidMSRPResultsId` | int | NO |  |  |
| 2 | `ManufacturerProductLineId` | int | YES |  |  |
| 3 | `AverageWeightedDiscount` | decimal(38,6) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidMSRPResultPrices` | USER_TABLE |
| `BidMSRPResultsProductLines` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedNew`](dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedNew.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_MSRPRankProductLineAWD] as
-- Calculate Average Discount Routine
select BidMSRPResultsId, ManufacturerProductLineId,
		case 
			-- Test for All Weights being Zero
			when (select COUNT(*) 
					from BidMSRPResultPrices
					join BidMSRPResultsProductLines bmrpl on bmrpl.BidMSRPResultsProductLineId = BidMSRPResultPrices.BidMSRPResultsProductLineId
					                                     and bmrpl.BidMSRPResultsId = il.BidMSRPResultsId
				                                         and bmrpl.ManufacturerProductLineId = il.ManufacturerProductLineId
				   where BidMSRPResultPrices.Active = 1
				     and isnull(BidMSRPResultPrices.RangeWeight,0) != 0) = 0 then 
					( select SUM(BidMSRPResultPrices.RangeValue)
						from BidMSRPResultPrices
						join BidMSRPResultsProductLines bmrpl on bmrpl.BidMSRPResultsProductLineId = BidMSRPResultPrices.BidMSRPResultsProductLineId
															 and bmrpl.BidMSRPResultsId = il.BidMSRPResultsId
															 and bmrpl.ManufacturerProductLineId = il.ManufacturerProductLineId
					   where BidMSRPResultPrices.Active = 1) / 
					( select Count(*)
						from BidMSRPResultPrices
						join BidMSRPResultsProductLines bmrpl on bmrpl.BidMSRPResultsProductLineId = BidMSRPResultPrices.BidMSRPResultsProductLineId
															 and bmrpl.BidMSRPResultsId = il.BidMSRPResultsId
															 and bmrpl.ManufacturerProductLineId = il.ManufacturerProductLineId
					   where BidMSRPResultPrices.Active = 1)
			-- Not All Zero
			else
					( select SUM(BidMSRPResultPrices.RangeValue * BidMSRPResultPrices.RangeWeight)
						from BidMSRPResultPrices
						join BidMSRPResultsProductLines bmrpl on bmrpl.BidMSRPResultsProductLineId = BidMSRPResultPrices.BidMSRPResultsProductLineId
															 and bmrpl.BidMSRPResultsId = il.BidMSRPResultsId
															 and bmrpl.ManufacturerProductLineId = il.ManufacturerProductLineId
					   where BidMSRPResultPrices.Active = 1) / 
					( select SUM(BidMSRPResultPrices.RangeWeight)
						from BidMSRPResultPrices
						join BidMSRPResultsProductLines bmrpl on bmrpl.BidMSRPResultsProductLineId = BidMSRPResultPrices.BidMSRPResultsProductLineId
															 and bmrpl.BidMSRPResultsId = il.BidMSRPResultsId
															 and bmrpl.ManufacturerProductLineId = il.ManufacturerProductLineId
					   where BidMSRPResultPrices.Active = 1)
		end as AverageWeightedDiscount
  from (
select BidMSRPResultsProductLines.BidMSRPResultsId, BidMSRPResultsProductLines.ManufacturerProductLineId
  from BidMSRPResultsProductLines
 where BidMSRPResultsProductLines.Active = 1
 group by BidMSRPResultsProductLines.BidMSRPResultsId, BidMSRPResultsProductLines.ManufacturerProductLineId
		) il
```
