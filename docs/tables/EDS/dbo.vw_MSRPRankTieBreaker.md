# View: `dbo.vw_MSRPRankTieBreaker`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidMSRPResultsId` | int | NO |  |  |
| 2 | `BidMSRPResultsProductLineId` | int | NO |  |  |
| 3 | `SortKey` | varchar(2) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidImports` | USER_TABLE |
| `BidMSRPResults` | USER_TABLE |
| `BidMSRPResultsProductLines` | USER_TABLE |
| `ManufacturerProductLines` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedNew`](dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedNew.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_MSRPRankTieBreaker] as
select BidMSRPResults.BidMSRPResultsId, BidMSRPResultsProductLines.BidMSRPResultsProductLineId,
	   case
	     when (select COUNT(*)
	             from (select bmrpl.ManufacturerProductLineId
	                     from BidMSRPResults bmr
	                     join BidMSRPResultsProductLines bmrpl on bmrpl.BidMSRPResultsId = bmr.BidMSRPResultsId
	                                                          and bmrpl.Active = 1
	                    where bmr.BidHeaderId = BidMSRPResults.BidHeaderId
	                      and bmr.ManufacturerId = BidMSRPResults.ManufacturerId
	                      and bmr.Active = 1) vpl) > 1 and
	          upper((select mpl.Name
	                   from ManufacturerProductLines mpl
	                  where mpl.ManufacturerProductLineId = BidMSRPResultsProductLines.ManufacturerProductLineId)) != 'ALL' then
	     -- Rank by ALL winner then Position
		   '0'
	     else
	     -- Rank by Position
	       '1'
	   end +
	   case 
	     when ((BidMSRPResults.BidHeaderId % (select COUNT(*) from BidImports where BidImports.BidHeaderId = BidMSRPResults.BidHeaderId and BidImports.Active = 1)) + 1) = bc.RowNumber then '0' 
	     else '1' 
	   end SortKey
  from BidMSRPResults
  join BidMSRPResultsProductLines on BidMSRPResultsProductLines.BidMSRPResultsId = BidMSRPResults.BidMSRPResultsId
  join (select BidImports.BidHeaderId, ROW_NUMBER() over (partition by BidImports.BidHeaderId Order by BidImportId) RowNumber
	      from BidImports
	     where BidImports.Active = 1) bc on bc.BidHeaderId = BidMSRPResults.BidHeaderId
```
