# Table: `archive.PODetailItems`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `archive`
**Approx rows:** 22905929

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PODetailItemId` | int | NO |  |  |
| 2 | `POId` | int | YES |  |  |
| 3 | `DetailId` | int | YES |  |  |
| 4 | `ItemId` | int | YES |  |  |
| 5 | `Quantity` | int | YES |  |  |
| 6 | `BidItemId` | int | YES |  |  |
| 7 | `BidPrice` | money | YES |  |  |
| 8 | `GrossPrice` | money | YES |  |  |
| 9 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 10 | `AwardId` | int | YES |  |  |
| 11 | `VendorId` | int | YES |  |  |
| 12 | `VendorItemCode` | varchar(50) | YES |  |  |
| 13 | `Alternate` | varchar(1024) | YES |  |  |
| 14 | `ContractNumber` | varchar(50) | YES |  |  |
| 15 | `rowguid` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
