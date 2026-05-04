# View: `dbo.vw_BidMSRPResultsPriceRanges`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | NO |  |  |
| 2 | `BidImportId` | int | NO |  |  |
| 3 | `BidMSRPResultsId` | int | NO |  |  |
| 4 | `BidMSRPResultsProductLineId` | int | YES |  |  |
| 5 | `ManufacturerProductLineId` | int | YES |  |  |
| 6 | `MSRPOptionId` | int | YES |  |  |
| 7 | `OptionName` | varchar(50) | YES |  |  |
| 8 | `TotalAwardDiscount` | decimal(9,5) | YES |  |  |
| 9 | `TotalAward` | tinyint | YES |  |  |
| 10 | `BidMSRPResultPricesId` | int | YES |  |  |
| 11 | `ManufacturerId` | int | YES |  |  |
| 12 | `RangeValue` | decimal(9,5) | YES |  |  |
| 13 | `RangeBase` | money | YES |  |  |
| 14 | `RangeWeight` | decimal(9,5) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidMSRPResultPrices`](dbo.BidMSRPResultPrices.md) | USER_TABLE |
| [`dbo.BidMSRPResults`](dbo.BidMSRPResults.md) | USER_TABLE |
| [`dbo.BidMSRPResultsProductLines`](dbo.BidMSRPResultsProductLines.md) | USER_TABLE |
| [`dbo.BidRequestManufacturer`](dbo.BidRequestManufacturer.md) | USER_TABLE |
| [`dbo.BidRequestOptions`](dbo.BidRequestOptions.md) | USER_TABLE |
| [`dbo.BidRequestPriceRanges`](dbo.BidRequestPriceRanges.md) | USER_TABLE |
| [`dbo.BidRequestProductLines`](dbo.BidRequestProductLines.md) | USER_TABLE |
| [`dbo.ManufacturerProductLines`](dbo.ManufacturerProductLines.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_BidMSRPResultsPriceRanges]
as

SELECT     bmr.BidHeaderId, bmr.BidImportId, bmr.BidMSRPResultsId, bmrpl.BidMSRPResultsProductLineId, bmrs.ManufacturerProductLineId, bmrs.MSRPOptionId, bmrs.OptionName, 
                      bmr.TotalAwardDiscount, bmr.TotalAward, bmrp.BidMSRPResultPricesId, bmr.ManufacturerId, CASE WHEN bmrp.BidMSRPResultPricesId IS NULL 
                      THEN bmrpa.RangeValue ELSE bmrp.RangeValue END AS RangeValue, bmrs.RangeBase, CASE WHEN bmrp.BidMSRPResultPricesId IS NULL 
                      THEN bmrpa.RangeWeight ELSE bmrp.RangeWeight END AS RangeWeight
FROM         (SELECT     bmr1.BidHeaderId, bmr1.ManufacturerId, bmrpl1.ManufacturerProductLineId, bmrpl1.MSRPOptionId, bmrpl1.OptionName, bmrp1.RangeBase
                       FROM          dbo.BidMSRPResults AS bmr1 INNER JOIN
                                              dbo.BidMSRPResultsProductLines AS bmrpl1 ON bmrpl1.BidMSRPResultsId = bmr1.BidMSRPResultsId AND bmrpl1.Active = 1 INNER JOIN
                                              dbo.BidMSRPResultPrices AS bmrp1 ON bmrp1.BidMSRPResultsId = bmr1.BidMSRPResultsId AND bmrp1.BidMSRPResultsProductLineId = bmrpl1.BidMSRPResultsProductLineId AND 
                                              bmrp1.Active = 1
                       WHERE      (bmr1.Active = 1)
                       UNION
                       SELECT     brm.BidHeaderId, brm.ManufacturerId, brpl.ManufacturerProductLineId, bro.OptionId AS MSRPOptionId, bro.Name AS OptionName, brpr.RangeBase
                       FROM         dbo.BidRequestManufacturer AS brm INNER JOIN
                                             dbo.BidRequestProductLines AS brpl ON brpl.BidRequestManufacturerId = brm.BidRequestManufacturerId AND brpl.Active = 1 INNER JOIN
                                             dbo.BidRequestOptions AS bro ON bro.BidRequestManufacturerId = brpl.BidRequestManufacturerId AND bro.BidRequestProductLineId = brpl.BidRequestProductLineId INNER JOIN
                                             dbo.BidRequestPriceRanges AS brpr ON brpr.BidRequestManufacturerId = brm.BidRequestManufacturerId AND brpr.BidRequestProductLineId = brpl.BidRequestProductLineId
                       WHERE     (brm.Active = 1)) AS bmrs INNER JOIN
                      dbo.BidMSRPResults AS bmr ON bmr.BidHeaderId = bmrs.BidHeaderId AND bmr.ManufacturerId = bmrs.ManufacturerId AND bmr.Active = 1 LEFT OUTER JOIN
                      dbo.BidMSRPResultsProductLines AS bmrpl ON bmrpl.BidMSRPResultsId = bmr.BidMSRPResultsId AND bmrpl.ManufacturerProductLineId = bmrs.ManufacturerProductLineId AND 
                      bmrpl.Active = 1 LEFT OUTER JOIN
                      dbo.BidMSRPResultPrices AS bmrp ON bmrp.BidMSRPResultsProductLineId = bmrpl.BidMSRPResultsProductLineId AND bmrp.RangeBase = bmrs.RangeBase AND 
                      bmrp.Active = 1 LEFT OUTER JOIN
                      dbo.BidMSRPResultPrices AS bmrpa ON bmrpa.BidMSRPResultsId = bmr.BidMSRPResultsId
                                                      and bmrpa.RangeBase = bmrs.RangeBase
                                                      and bmrpa.BidMSRPResultPricesId =
                          (SELECT     bmrps.BidMSRPResultPricesId
                            FROM          dbo.BidMSRPResults AS bmrs1 INNER JOIN
                                                   dbo.BidMSRPResultsProductLines AS bmrpls ON bmrpls.BidMSRPResultsId = bmrs1.BidMSRPResultsId AND bmrpls.Active = 1 INNER JOIN
                                                   dbo.BidMSRPResultPrices AS bmrps ON bmrps.BidMSRPResultsId = bmrpls.BidMSRPResultsId AND 
                                                   bmrps.BidMSRPResultsProductLineId = bmrpls.BidMSRPResultsProductLineId INNER JOIN
                                                   dbo.ManufacturerProductLines AS mpls ON mpls.ManufacturerProductLineId = bmrpls.ManufacturerProductLineId AND mpls.Active = 1 AND mpls.Name = 'ALL'
                            WHERE      (bmrps.Active = 1) AND (bmrps.BidMSRPResultsId = bmr.BidMSRPResultsId) AND (bmrps.RangeBase = bmrs.RangeBase))
```
