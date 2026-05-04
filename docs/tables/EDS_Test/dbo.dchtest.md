# Table: `dbo.dchtest`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1192

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `POId` | int | NO |  |  |
| 2 | `PONumber` | varchar(24) | YES |  |  |
| 3 | `ItemCount` | int | YES |  |  |
| 4 | `Amount` | money | YES |  |  |
| 5 | `BudgetName` | varchar(30) | YES |  |  |
| 6 | `RequisitionNumber` | varchar(24) | YES |  |  |
| 7 | `AccountCode` | varchar(50) | YES |  |  |
| 8 | `Attention` | varchar(50) | YES |  |  |
| 9 | `CometId` | int | YES |  |  |
| 10 | `DistrictCode` | varchar(4) | YES |  |  |
| 11 | `DistrictName` | varchar(50) | YES |  |  |
| 12 | `DistrictNameAddress` | varchar(237) | YES |  |  |
| 13 | `SchoolName` | varchar(50) | YES |  |  |
| 14 | `SchoolNameAddress` | varchar(189) | YES |  |  |
| 15 | `VendorCode` | varchar(16) | YES |  |  |
| 16 | `VendorPhone` | varchar(25) | YES |  |  |
| 17 | `DistrictVendorCode` | varchar(20) | YES |  |  |
| 18 | `VendorName` | varchar(50) | YES |  |  |
| 19 | `VendorNameAddress` | varchar(249) | YES |  |  |
| 20 | `PODate` | datetime | YES |  |  |
| 21 | `DatePrinted` | datetime | YES |  |  |
| 22 | `DatePrintedDetail` | datetime | YES |  |  |
| 23 | `DateExported` | datetime | YES |  |  |
| 24 | `DistrictId` | int | YES |  |  |
| 25 | `CategoryId` | int | YES |  |  |
| 26 | `BudgetId` | int | YES |  |  |
| 27 | `AccountId` | int | YES |  |  |
| 28 | `VendorId` | int | YES |  |  |
| 29 | `UserId` | int | YES |  |  |
| 30 | `SchoolId` | int | NO |  |  |
| 31 | `VendorBidNumber` | varchar(50) | YES |  |  |
| 32 | `VendorBidComments` | varchar(540) | YES |  |  |
| 33 | `CategoryCode` | char(1) | YES |  |  |
| 34 | `CategoryName` | varchar(50) | YES |  |  |
| 35 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 36 | `DiscountAmount` | money | YES |  |  |
| 37 | `TotalGross` | money | YES |  |  |
| 38 | `LocationCode` | varchar(32) | NO |  |  |
| 39 | `ShippingAmount` | money | YES |  |  |
| 40 | `ShippingPercentage` | decimal(9,5) | YES |  |  |
| 41 | `ShippingNameAddress` | varchar(189) | YES |  |  |
| 42 | `DistrictAddress1` | varchar(30) | YES |  |  |
| 43 | `DistrictAddress2` | varchar(30) | YES |  |  |
| 44 | `DistrictAddress3` | varchar(30) | YES |  |  |
| 45 | `DistrictCity` | varchar(25) | YES |  |  |
| 46 | `DistrictState` | varchar(2) | YES |  |  |
| 47 | `DistrictZipcode` | varchar(10) | YES |  |  |
| 48 | `SchoolAddress1` | varchar(30) | YES |  |  |
| 49 | `SchoolAddress2` | varchar(30) | YES |  |  |
| 50 | `SchoolAddress3` | varchar(30) | YES |  |  |
| 51 | `SchoolCity` | varchar(25) | YES |  |  |
| 52 | `SchoolState` | varchar(2) | YES |  |  |
| 53 | `SchoolZipcode` | varchar(10) | YES |  |  |
| 54 | `VendorsAddress1` | varchar(50) | YES |  |  |
| 55 | `VendorsAddress2` | varchar(50) | YES |  |  |
| 56 | `VendorsAddress3` | varchar(50) | YES |  |  |
| 57 | `VendorsCity` | varchar(50) | YES |  |  |
| 58 | `VendorsState` | varchar(2) | YES |  |  |
| 59 | `VendorsZipcode` | varchar(10) | YES |  |  |
| 60 | `ShipLocationsAddress1` | varchar(30) | YES |  |  |
| 61 | `ShipLocationsAddress2` | varchar(30) | YES |  |  |
| 62 | `ShipLocationsAddress3` | varchar(30) | YES |  |  |
| 63 | `ShipLocationsCity` | varchar(25) | YES |  |  |
| 64 | `ShipLocationsState` | varchar(2) | YES |  |  |
| 65 | `ShipLocationsZipcode` | varchar(10) | YES |  |  |
| 66 | `ShipLocationsName` | varchar(50) | YES |  |  |
| 67 | `DistrictMessage` | varchar(4096) | YES |  |  |
| 68 | `BidDate` | datetime | YES |  |  |
| 69 | `UsersDistrictAcctgCode` | varchar(20) | YES |  |  |
| 70 | `AwardsBidHeaderId` | int | YES |  |  |
| 71 | `ExportedToVendor` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
