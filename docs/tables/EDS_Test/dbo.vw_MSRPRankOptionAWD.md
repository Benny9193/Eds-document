# View: `dbo.vw_MSRPRankOptionAWD`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidMSRPResultsId` | int | NO |  |  |
| 2 | `BidMSRPResultsProductLineId` | int | NO |  |  |
| 3 | `BidRequestOptionId` | int | YES |  |  |
| 4 | `BidRequestProductLineId` | int | YES |  |  |
| 5 | `ManufacturerProductLineId` | int | YES |  |  |
| 6 | `MSRPOptionId` | int | YES |  |  |
| 7 | `OptionName` | varchar(50) | YES |  |  |
| 8 | `Weight` | decimal(9,5) | YES |  |  |
| 9 | `AverageWeightedDiscount` | decimal(38,6) | YES |  |  |

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
create   view  [dbo].[vw_MSRPRankOptionAWD] as
-- Calculate Average Discount Routine
select BidMSRPResultsProductLines.BidMSRPResultsId, BidMSRPResultsProductLines.BidMSRPResultsProductLineId, BidMSRPResultsProductLines.BidRequestOptionId, BidMSRPResultsProductLines.BidRequestProductLineId, BidMSRPResultsProductLines.ManufacturerProductLineId, BidMSRPResultsProductLines.MSRPOptionId, BidMSRPResultsProductLines.OptionName, BidMSRPResultsProductLines.Weight,
		case 
			-- Test for All Weights being Zero
			when (select COUNT(*) 
					from BidMSRPResultPrices
				   where BidMSRPResultPrices.BidMSRPResultsProductLineId = BidMSRPResultsProductLines.BidMSRPResultsProductLineId
				     and BidMSRPResultPrices.Active = 1
				     and isnull(BidMSRPResultPrices.RangeWeight,0) != 0) = 0 then 
					( select SUM(BidMSRPResultPrices.RangeValue)
						from BidMSRPResultPrices
					   where BidMSRPResultPrices.BidMSRPResultsProductLineId = BidMSRPResultsProductLines.BidMSRPResultsProductLineId
					     and BidMSRPResultPrices.Active = 1) / 
					( select Count(*)
						from BidMSRPResultPrices
					   where BidMSRPResultPrices.BidMSRPResultsProductLineId = BidMSRPResultsProductLines.BidMSRPResultsProductLineId
					     and BidMSRPResultPrices.Active = 1)
			-- Not All Zero
			else
					( select SUM(BidMSRPResultPrices.RangeValue * BidMSRPResultPrices.RangeWeight)
						from BidMSRPResultPrices
					   where BidMSRPResultPrices.BidMSRPResultsProductLineId = BidMSRPResultsProductLines.BidMSRPResultsProductLineId
					     and BidMSRPResultPrices.Active = 1) / 
					( select SUM(BidMSRPResultPrices.RangeWeight)
						from BidMSRPResultPrices
					   where BidMSRPResultPrices.BidMSRPResultsProductLineId = BidMSRPResultsProductLines.BidMSRPResultsProductLineId
					     and BidMSRPResultPrices.Active = 1)
		end as AverageWeightedDiscount
  from BidMSRPResultsProductLines
 where BidMSRPResultsProductLines.Active = 1
```
