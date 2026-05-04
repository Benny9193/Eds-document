# View: `dbo.vw_WinningMSRPEntryPrices`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `VendorId` | int | YES |  |  |
| 3 | `ManufacturerId` | int | YES |  |  |
| 4 | `ManufacturerProductLineId` | int | YES |  |  |
| 5 | `MSRPOptionId` | int | YES |  |  |
| 6 | `RangeBase` | money | YES |  |  |
| 7 | `RangeValue` | decimal(9,5) | YES |  |  |
| 8 | `BidMSRPResultPricesId` | int | NO |  |  |
| 9 | `BidMSRPResultsProductLineId` | int | NO |  |  |
| 10 | `BidMSRPResultsId` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidImports` | USER_TABLE |
| `BidMSRPResultPrices` | USER_TABLE |
| `BidMSRPResults` | USER_TABLE |
| `BidMSRPResultsProductLines` | USER_TABLE |
| `vw_BidMSRPRankedManufacturerProductLines` | VIEW |
| `vw_BidMSRPRankedManufacturerProductLinesOrdered` | VIEW |

## Used by

| Object | Type |
|--------|------|
| `dbo.sp_AwardBidHeader` | SQL_STORED_PROCEDURE |

## Definition

```sql
create   view  [dbo].[vw_WinningMSRPEntryPrices] as
select rmpl.BidHeaderId, BidImports.VendorId, BidMSRPResults.ManufacturerId, BidMSRPResultsProductLines.ManufacturerProductLineId, BidMSRPResultsProductLines.MSRPOptionId, BidMSRPResultPrices.RangeBase, BidMSRPResultPrices.RangeValue, BidMSRPResultPrices.BidMSRPResultPricesId, BidMSRPResultsProductLines.BidMSRPResultsProductLineId, BidMSRPResults.BidMSRPResultsId
  from vw_BidMSRPRankedManufacturerProductLines rmpl 
  join BidMSRPResultsProductLines on BidMSRPResultsProductLines.ManufacturerProductLineId = rmpl.ManufacturerProductLineId
                                 and BidMSRPResultsProductLines.MSRPOptionId = rmpl.MSRPOptionId
                                 and BidMSRPResultsProductLines.BidMSRPResultsProductLineId =
    (select Top 1 bmrmplo.BidMSRPResultsProductLineId
	   from vw_BidMSRPRankedManufacturerProductLinesOrdered bmrmplo 
	   join BidMSRPResults bmr on bmr.BidMSRPResultsId = bmrmplo.BidMSRPResultsId
						      and bmr.Active = 1
	   join BidImports bi on bi.BidImportId = bmr.BidImportId
						 and bi.Active = 1
						 and bi.BidHeaderId = rmpl.BidHeaderId
	  where bmrmplo.ManufacturerProductLineId = rmpl.ManufacturerProductLineId
		and bmrmplo.MSRPOptionId = rmpl.MSRPOptionId
	  order by bmrmplo.SortKey)
  join BidMSRPResults on BidMSRPResults.BidMSRPResultsId = BidMSRPResultsProductLines.BidMSRPResultsId
  join BidMSRPResultPrices on BidMSRPResultPrices.BidMSRPResultsProductLineId = BidMSRPResultsProductLines.BidMSRPResultsProductLineId
  join BidImports on BidImports.BidImportId = BidMSRPResults.BidImportId
	 			 and BidImports.Active = 1
```
