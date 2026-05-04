# Table: `dbo.SaxNotifications`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 78

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RepName` | varchar(30) | YES |  |  |
| 2 | `DistrictName` | varchar(50) | YES |  |  |
| 3 | `BudgetName` | varchar(30) | YES |  |  |
| 4 | `SchoolName` | varchar(50) | YES |  |  |
| 5 | `CometId` | int | YES |  |  |
| 6 | `UserId` | int | NO |  |  |
| 7 | `EMail` | varchar(255) | YES |  |  |
| 8 | `Attention` | varchar(50) | YES |  |  |
| 9 | `RequisitionNumber` | varchar(24) | YES |  |  |
| 10 | `ItemCode` | varchar(50) | YES |  |  |
| 11 | `VendorItemCode` | varchar(50) | YES |  |  |
| 12 | `Quantity` | int | YES |  |  |
| 13 | `Description` | varchar(1024) | YES |  |  |
| 14 | `BidPrice` | money | YES |  |  |
| 15 | `RequestedVendorItemCode` | varchar(50) | YES |  |  |
| 16 | `RequestedDescription` | varchar(1156) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
