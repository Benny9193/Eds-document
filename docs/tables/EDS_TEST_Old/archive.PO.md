# Table: `archive.PO`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `archive`
**Approx rows:** 1300617

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `POId` | int | NO |  |  |
| 2 | `RequisitionId` | int | YES |  |  |
| 3 | `VendorId` | int | YES |  |  |
| 4 | `PONumber` | varchar(24) | YES |  |  |
| 5 | `PODate` | datetime | YES |  |  |
| 6 | `DatePrinted` | datetime | YES |  |  |
| 7 | `DatePrintedDetail` | datetime | YES |  |  |
| 8 | `DateExported` | datetime | YES |  |  |
| 9 | `DateOrdered` | datetime | YES |  |  |
| 10 | `DateReceived` | datetime | YES |  |  |
| 11 | `Amount` | money | YES |  |  |
| 12 | `ItemCount` | int | YES |  |  |
| 13 | `AwardId` | int | YES |  |  |
| 14 | `DiscountAmount` | money | YES |  |  |
| 15 | `TotalGross` | money | YES |  |  |
| 16 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 17 | `ShippingAmount` | money | YES |  |  |
| 18 | `ExportedToVendor` | datetime | YES |  |  |
| 19 | `UploadId` | int | YES |  |  |
| 20 | `Cancelled` | tinyint | YES |  |  |
| 21 | `POStatusID` | int | YES |  |  |
| 22 | `rowguid` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
