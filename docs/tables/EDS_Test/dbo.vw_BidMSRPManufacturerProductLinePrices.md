# View: `dbo.vw_BidMSRPManufacturerProductLinePrices`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidMSRPResultsId` | int | NO |  |  |
| 2 | `BidMSRPResultsProductLineId` | int | YES |  |  |
| 3 | `ManufacturerProductLineId` | int | YES |  |  |
| 4 | `MSRPOptionId` | int | YES |  |  |
| 5 | `OptionName` | varchar(50) | NO |  |  |
| 6 | `TotalAwardDiscount` | decimal(9,5) | YES |  |  |
| 7 | `TotalAward` | tinyint | YES |  |  |
| 8 | `WeightedDiscount` | decimal(9,5) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidMSRPResults` | USER_TABLE |
| `BidMSRPResultsProductLines` | USER_TABLE |
| `BidRequestManufacturer` | USER_TABLE |
| `BidRequestOptions` | USER_TABLE |
| `BidRequestProductLines` | USER_TABLE |
| `ManufacturerProductLines` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_BidMSRPManufacturerProductLinePrices] as
select bmr.BidMSRPResultsId, bmrpl.BidMSRPResultsProductLineId, BidRequestProductLines.ManufacturerProductLineId, BidRequestOptions.OptionId MSRPOptionId, BidRequestOptions.Name OptionName, 
       bmr.TotalAwardDiscount, bmr.TotalAward, 
       case
         when bmrpl.BidMSRPResultsProductLineId is null then
           (select BidMSRPResultsProductLines.WeightedDiscount
              from BidMSRPResults
              join BidMSRPResultsProductLines on BidMSRPResultsProductLines.BidMSRPResultsId = BidMSRPResults.BidMSRPResultsId
                                             and BidMSRPResultsProductLines.OptionName = bmrpl.OptionName
                                             and BidMSRPResultsProductLines.Active = 1
              join ManufacturerProductLines on ManufacturerProductLines.ManufacturerProductLineId = BidMSRPResultsProductLines.ManufacturerProductLineId
                                           and ManufacturerProductLines.Name = 'ALL'
                                           and ManufacturerProductLines.Active = 1
             where BidMSRPResults.BidMSRPResultsId = bmr.BidMSRPResultsId
               and BidMSRPResults.Active = 1) 
         else
           bmrpl.WeightedDiscount
       end WeightedDiscount
  from BidMSRPResults bmr
  join BidRequestManufacturer on BidRequestManufacturer.BidRequestManufacturerId = bmr.BidRequestManufacturerId
  join BidRequestProductLines on BidRequestProductLines.BidRequestManufacturerId = bmr.BidRequestManufacturerId
  join BidRequestOptions on BidRequestOptions.BidRequestManufacturerId = BidRequestProductLines.BidRequestManufacturerId
                        and BidRequestOptions.BidRequestProductLineId = BidRequestProductLines.BidRequestProductLineId
  left outer join BidMSRPResultsProductLines bmrpl on bmrpl.BidMSRPResultsId = bmr.BidMSRPResultsId
                                                  and bmrpl.ManufacturerProductLineId = BidRequestProductLines.ManufacturerProductLineId
                                                  and bmrpl.MSRPOptionId = BidRequestOptions.OptionId
                                                  and bmrpl.Active = 1
 where bmr.Active = 1
```
