# View: `dbo.BidMgrView2`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `BidImportId` | int | NO |  |  |
| 3 | `Active` | tinyint | YES |  |  |
| 4 | `BidItemDiscountRate` | decimal(9,5) | YES |  |  |
| 5 | `VendorBidNumber` | varchar(50) | YES |  |  |
| 6 | `ItemsBid` | int | YES |  |  |
| 7 | `AmountBid` | money | YES |  |  |
| 8 | `VendorsCode` | varchar(16) | YES |  |  |
| 9 | `VendorsName` | varchar(50) | YES |  |  |
| 10 | `CatalogName` | varchar(50) | YES |  |  |
| 11 | `BidId` | int | YES |  |  |
| 12 | `AwardId` | int | YES |  |  |
| 13 | `CalculatedItems` | int | NO |  |  |
| 14 | `CalculatedAmount` | int | NO |  |  |
| 15 | `CalculatedItemsBid` | int | NO |  |  |
| 16 | `CalculatedAmountBid` | int | NO |  |  |
| 17 | `PercentBid` | int | NO |  |  |
| 18 | `CatalogDiscountRate` | int | NO |  |  |
| 19 | `ItemsWon` | int | NO |  |  |
| 20 | `PercentWon` | int | NO |  |  |
| 21 | `POCount` | int | NO |  |  |
| 22 | `TotalPOs` | int | NO |  |  |
| 23 | `AveragePO` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Awards` | USER_TABLE |
| `Bids` | USER_TABLE |
| [`dbo.BidImports`](dbo.BidImports.md) | USER_TABLE |
| [`dbo.Catalog`](dbo.Catalog.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[BidMgrView2]
AS
SELECT     dbo.BidImports.BidHeaderId, dbo.BidImports.BidImportId, dbo.BidImports.Active, dbo.BidImports.BidItemDiscountRate, dbo.BidImports.VendorBidNumber, dbo.BidImports.ItemsBid, 
                      dbo.BidImports.AmountBid, dbo.Vendors.Code VendorsCode, dbo.Vendors.Name VendorsName, dbo.Catalog.Name CatalogName,
                          (SELECT     TOP 1 Bids.BidId
                            FROM          Bids
                            WHERE      Bids.BidHeaderId = BidImports.BidHeaderId AND Bids.VendorId = BidImports.VendorId AND Bids.Active = 1
                            ORDER BY Bids.BidId DESC) AS BidId,
                          (SELECT     TOP 1 Awards.AwardId
                            FROM          Awards LEFT OUTER JOIN
                                                   Bids ON Bids.BidId = Awards.BidId AND Bids.BidHeaderId = BidImports.BidHeaderId AND Bids.VendorId = BidImports.VendorId AND 
                                                   Bids.Active = 1
                            ORDER BY Awards.AwardId DESC) AS AwardId,
                          -- Note: the following fields are dynamically built in BidMgr.  They are defined here as placeholders to match the clarion file definition.
                           0 CalculatedItems, 0 CalculatedAmount, 0 CalculatedItemsBid, 0 CalculatedAmountBid, 0 PercentBid, 0 CatalogDiscountRate, 0 ItemsWon, 0 PercentWon, 0 POCount, 0 TotalPOs, 0 AveragePO
FROM         dbo.BidImports INNER JOIN
                      dbo.Vendors ON dbo.Vendors.VendorId = dbo.BidImports.VendorId LEFT OUTER JOIN
                      dbo.Catalog ON dbo.Catalog.CatalogId = dbo.BidImports.CatalogId
-- where BidImports.BidHeaderId =
```
