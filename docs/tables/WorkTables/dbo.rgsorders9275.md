# Table: `dbo.rgsorders9275`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2651

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictName` | varchar(50) | YES |  |  |
| 2 | `Budgetname` | varchar(30) | YES |  |  |
| 3 | `SchoolName` | varchar(50) | YES |  |  |
| 4 | `CometId` | int | YES |  |  |
| 5 | `Attention` | varchar(50) | YES |  |  |
| 6 | `ItemCode` | varchar(50) | YES |  |  |
| 7 | `VendorItemCode` | varchar(50) | NO |  |  |
| 8 | `Quantity` | int | YES |  |  |
| 9 | `BidPrice` | money | YES |  |  |
| 10 | `description` | varchar(1024) | YES |  |  |
| 11 | `ItemBidType` | varchar(32) | NO |  |  |
| 12 | `Alternate` | varchar(1024) | NO |  |  |
| 13 | `ReqStatus` | varchar(255) | YES |  |  |
| 14 | `POId` | int | NO |  |  |
| 15 | `PONumber` | varchar(24) | NO |  |  |
| 16 | `ExportedToVendor` | datetime | YES |  |  |
| 17 | `BidHeaderId` | int | YES |  |  |
| 18 | `BudgetId` | int | NO |  |  |
| 19 | `DistrictId` | int | NO |  |  |
| 20 | `RequisitionId` | int | NO |  |  |
| 21 | `detailId` | int | NO |  |  |
| 22 | `ItemId` | int | YES |  |  |
| 23 | `CategoryId` | int | YES |  |  |
| 24 | `UserId` | int | NO |  |  |
| 25 | `BidItemId` | int | YES |  |  |
| 26 | `VendorId` | int | YES |  |  |
| 27 | `SortSeq` | varchar(64) | YES |  |  |
| 28 | `LastYearsQuantity` | int | YES |  |  |
| 29 | `ItemMustBeBid` | int | NO |  |  |
| 30 | `RequisitionNumber` | varchar(24) | YES |  |  |
| 31 | `UseAllocations` | tinyint | YES |  |  |
| 32 | `AllocationAvailable` | money | YES |  |  |
| 33 | `AllocationAmount` | money | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
