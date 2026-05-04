# View: `dbo.vw_MSRPRankRequirements`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidMSRPResultsId` | int | NO |  |  |
| 2 | `BidMSRPResultsProductLineId` | int | NO |  |  |
| 3 | `SortKey` | varchar(3) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidMSRPResults` | USER_TABLE |
| `BidMSRPResultsProductLines` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedNew`](dbo.vw_BidMSRPRankedManufacturerProductLinesOrderedNew.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_MSRPRankRequirements] as
select BidMSRPResults.BidMSRPResultsId, BidMSRPResultsProductLines.BidMSRPResultsProductLineId,
	   right('00' + 
			 cast( (select count(*)
					  from 
						(select bmrpl.MSRPOptionId
						   from BidMSRPResultsProductLines bmrpl
						   join BidMSRPResults bmr on bmr.BidHeaderId = BidMSRPResults.BidHeaderId
												  and bmr.ManufacturerId = BidMSRPResults.ManufacturerId
												  and bmr.Active = 1
						  where bmrpl.Active = 1
							and bmrpl.ManufacturerProductLineId = BidMSRPResultsProductLines.ManufacturerProductLineId
						  group by bmrpl.MSRPOptionId) oc ) -
				   isnull((select count(*)
					  from BidMSRPResultsProductLines bmrpl
					 where bmrpl.Active = 1
					   and bmrpl.BidMSRPResultsId = BidMSRPResults.BidMSRPResultsId
					   and bmrpl.ManufacturerProductLineId = BidMSRPResultsProductLines.ManufacturerProductLineId),0) as varchar),2) +
	   case 
	     when isnull(BidMSRPResults.AuthorizationLetter,0) = 1 and isnull(BidMSRPResults.ProductCatalog,0) = 1 then '0'
	     else '1'
	   end SortKey
  from BidMSRPResults
  join BidMSRPResultsProductLines on BidMSRPResultsProductLines.BidMSRPResultsId = BidMSRPResults.BidMSRPResultsId
```
