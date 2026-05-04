# View: `dbo.BidMgrView`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidResultsId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `BidRequestItemId` | int | YES |  |  |
| 4 | `BidImportId` | int | YES |  |  |
| 5 | `VendorName` | varchar(50) | YES |  |  |
| 6 | `Quantity` | int | YES |  |  |
| 7 | `QuantityBid` | int | YES |  |  |
| 8 | `UnitPrice` | money | YES |  |  |
| 9 | `Cost` | money | YES |  |  |
| 10 | `VendorItemCode` | varchar(50) | YES |  |  |
| 11 | `Alternate` | varchar(512) | YES |  |  |
| 12 | `ItemsPerUnit` | varchar(50) | YES |  |  |
| 13 | `Status` | varchar(51) | YES |  |  |
| 14 | `ItemBidType` | char(1) | YES |  |  |
| 15 | `PageNo` | int | YES |  |  |
| 16 | `BidResultsActive` | int | YES |  |  |
| 17 | `BidImportsActive` | tinyint | YES |  |  |
| 18 | `SortStatus` | int | YES |  |  |
| 19 | `Compliance` | varchar(18) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidImports`](dbo.BidImports.md) | USER_TABLE |
| [`dbo.BidResults`](dbo.BidResults.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[BidMgrView]
AS
SELECT     dbo.BidResults.BidResultsId, dbo.BidResults.BidHeaderId, dbo.BidResults.BidRequestItemId, dbo.BidResults.BidImportId, dbo.Vendors.Name VendorName, dbo.BidResults.Quantity, dbo.BidResults.QuantityBid, dbo.BidResults.UnitPrice, dbo.BidResults.Cost,
                       dbo.BidResults.VendorItemCode, dbo.BidResults.Alternate, dbo.BidResults.ItemsPerUnit, dbo.BidResults.Status,  
                      dbo.BidResults.ItemBidType, dbo.BidResults.PageNo, dbo.BidResults.Active BidResultsActive, dbo.BidImports.Active BidImportsActive, CASE BidResults.ItemBidType WHEN 'S' THEN 0 WHEN 'C' THEN 0 WHEN 'N' THEN 4 ELSE 4 END + CASE WHEN ISNULL(BidImports.Active, 0)=1 THEN 0 ELSE 2 END + CASE WHEN ISNULL(BidResults.Active, 0)=1 THEN 0 ELSE 1 END SortStatus, 
                      CASE BidResults.ItemBidType WHEN 'S' THEN 'As Specified' WHEN 'C' THEN 'Compliant Item' WHEN 'N' THEN 'Non-Compliant Item' ELSE 'Not Bid' END Compliance
FROM         dbo.BidResults INNER JOIN
                      dbo.BidImports ON dbo.BidResults.BidImportId = dbo.BidImports.BidImportId INNER JOIN
                      dbo.Vendors ON dbo.BidImports.VendorId = dbo.Vendors.VendorId
```
