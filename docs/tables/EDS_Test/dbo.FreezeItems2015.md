# Table: `dbo.FreezeItems2015`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 102339

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictName` | varchar(50) | YES |  |  |
| 2 | `BudgetName` | varchar(30) | YES |  |  |
| 3 | `SchoolName` | varchar(50) | YES |  |  |
| 4 | `CometId` | int | YES |  |  |
| 5 | `Attention` | varchar(50) | YES |  |  |
| 6 | `RequisitionNumber` | varchar(24) | YES |  |  |
| 7 | `ItemCode` | varchar(50) | YES |  |  |
| 8 | `VendorItemCode` | varchar(50) | YES |  |  |
| 9 | `Quantity` | int | YES |  |  |
| 10 | `BidPrice` | money | YES |  |  |
| 11 | `Extended` | money | YES |  |  |
| 12 | `OrigVendorItemCode` | varchar(50) | YES |  |  |
| 13 | `OrigBidPrice` | money | YES |  |  |
| 14 | `OrigExtended` | money | YES |  |  |
| 15 | `Description` | varchar(1024) | YES |  |  |
| 16 | `Status` | varchar(255) | YES |  |  |
| 17 | `UseAllocations` | tinyint | NO |  |  |
| 18 | `AllocationAvailable` | money | NO |  |  |
| 19 | `DetailId` | int | NO |  |  |
| 20 | `RequisitionId` | int | NO |  |  |
| 21 | `VendorId` | int | YES |  |  |
| 22 | `AwardId` | int | YES |  |  |
| 23 | `CatalogId` | int | YES |  |  |
| 24 | `CatalogPrice` | money | YES |  |  |
| 25 | `OrigVendorId` | int | YES |  |  |
| 26 | `OrigAwardId` | int | YES |  |  |
| 27 | `OrigCatalogId` | int | YES |  |  |
| 28 | `OrigCatalogPrice` | money | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_Detail_Etc` | no | NONCLUSTERED | `DetailId` | `OrigVendorItemCode`, `OrigBidPrice`, `OrigVendorId`, `OrigAwardId`, `OrigCatalogId`, `OrigCatalogPrice` |
