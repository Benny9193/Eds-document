# Table: `dbo.PricingAddenda`

**Database:** `SearchData_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PricingAddendaId` | bigint | NO |  | YES |
| 2 | `CrossRefId` | int | YES |  |  |
| 3 | `CatalogId` | int | YES |  |  |
| 4 | `HeadingId` | int | YES |  |  |
| 5 | `KeywordId` | int | YES |  |  |
| 6 | `CategoryId` | int | YES |  |  |
| 7 | `ItemId` | int | YES |  |  |
| 8 | `VendorId` | int | YES |  |  |
| 9 | `DistrictId` | int | YES |  |  |
| 10 | `HeadingKeywordId` | bigint | YES |  |  |
| 11 | `ListPrice` | money | YES |  |  |
| 12 | `LastBidPrice` | money | YES |  |  |
| 13 | `CatalogPrice` | money | YES |  |  |
| 14 | `CatalogPage` | char(4) | YES |  |  |
| 15 | `AwardId` | int | YES |  |  |
| 16 | `BidType` | tinyint | YES |  |  |
| 17 | `ItemBidType` | varchar(32) | YES |  |  |
| 18 | `UnitId` | int | YES |  |  |
| 19 | `Unitcode` | varchar(20) | YES |  |  |
| 20 | `SortSeq` | varchar(64) | YES |  |  |
| 21 | `FullDescription` | varchar(4096) | YES |  |  |
| 22 | `PackedItemCode` | varchar(50) | YES |  |  |
| 23 | `ItemCode` | varchar(50) | YES |  |  |
| 24 | `VendorItemCode` | varchar(50) | YES |  |  |
| 25 | `Manufacturer` | varchar(50) | YES |  |  |
| 26 | `ManufacturerPartNumber` | varchar(50) | YES |  |  |
| 27 | `ItemHeading` | varchar(255) | YES |  |  |
| 28 | `ItemKeyword` | varchar(50) | YES |  |  |
| 29 | `AllStringFields` | varchar(6000) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
