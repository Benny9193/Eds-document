# Table: `dbo.PricingConsolidated`

**Database:** `SearchData` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 13896847

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PricingConsolidatedId` | bigint | NO |  | YES |
| 2 | `CrossRefId` | int | YES |  |  |
| 3 | `CatalogId` | int | YES |  |  |
| 4 | `BidHeaderId` | int | YES |  |  |
| 5 | `HeadingId` | int | YES |  |  |
| 6 | `KeywordId` | int | YES |  |  |
| 7 | `CategoryId` | int | YES |  |  |
| 8 | `ItemId` | int | YES |  |  |
| 9 | `VendorId` | int | YES |  |  |
| 10 | `BidItemId` | int | YES |  |  |
| 11 | `DoNotDiscount` | int | YES |  |  |
| 12 | `DistrictId` | int | YES |  |  |
| 13 | `HeadingKeywordId` | bigint | YES |  |  |
| 14 | `GrossPrice` | money | YES |  |  |
| 15 | `BidPrice` | money | YES |  |  |
| 16 | `CatalogPrice` | money | YES |  |  |
| 17 | `CatalogPage` | char(4) | YES |  |  |
| 18 | `AwardId` | int | YES |  |  |
| 19 | `BidType` | tinyint | YES |  |  |
| 20 | `ItemBidType` | varchar(32) | YES |  |  |
| 21 | `DiscountRate` | numeric(9,5) | YES |  |  |
| 22 | `AdditionalShipping` | tinyint | YES |  |  |
| 23 | `UnitId` | int | YES |  |  |
| 24 | `UnitCode` | varchar(20) | YES |  |  |
| 25 | `SortSeq` | varchar(64) | YES |  |  |
| 26 | `ShortDescription` | varchar(1024) | YES |  |  |
| 27 | `FullDescription` | varchar(4096) | YES |  |  |
| 28 | `Alternate` | varchar(512) | YES |  |  |
| 29 | `PackedItemCode` | varchar(50) | YES |  |  |
| 30 | `ItemCode` | varchar(50) | YES |  |  |
| 31 | `PackedVendorItemCode` | varchar(50) | YES |  |  |
| 32 | `VendorItemCode` | varchar(50) | YES |  |  |
| 33 | `Headings` | varchar(50) | YES |  |  |
| 34 | `Keywords` | varchar(1024) | YES |  |  |
| 35 | `Manufacturer` | varchar(50) | YES |  |  |
| 36 | `ManufacturerPartNumber` | varchar(50) | YES |  |  |
| 37 | `ItemHeading` | varchar(255) | YES |  |  |
| 38 | `ItemKeyword` | varchar(50) | YES |  |  |
| 39 | `AllStringFields` | varchar(6000) | YES |  |  |
| 40 | `AltId` | bigint | YES |  |  |
| 41 | `OrderCounts` | int | YES |  |  |
| 42 | `RowNumberSort` | varchar(500) | YES |  |  |
| 43 | `BidItemFlag` | int | NO |  |  |
| 44 | `UniqueItemNumber` | varchar(50) | YES |  |  |
| 45 | `ProductNames` | varchar(4000) | YES |  |  |
| 46 | `TypeAheads` | varchar(4000) | YES |  |  |
| 47 | `PerishableItem` | tinyint | YES |  |  |
| 48 | `PrescriptionRequired` | tinyint | YES |  |  |
| 49 | `DigitallyDelivered` | tinyint | YES |  |  |
| 50 | `MinimumOrderQuantity` | int | YES |  |  |
| 51 | `TotalQuantity` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_PricingConsolidated_OrderCounts` | no | NONCLUSTERED | `OrderCounts` | `ItemId`, `ItemCode`, `ShortDescription`, `FullDescription`, `BidPrice`, `CatalogPrice`, `VendorId`, `CategoryId`, `Manufacturer`, `UnitCode` |
| `IX_PricingConsolidated_VendorId` | no | NONCLUSTERED | `VendorId` | `ItemId`, `ItemCode`, `ShortDescription`, `BidPrice`, `CategoryId`, `OrderCounts` |
| `SKI_BidHeaderItemBidFlagBidPriceID_VendorCategorySortBidtypeItembidtype` | no | NONCLUSTERED | `BidHeaderId`, `ItemId`, `BidItemFlag`, `BidPrice`, `PricingConsolidatedId` | `CategoryId`, `VendorId`, `BidType`, `ItemBidType`, `SortSeq` |
| `SKI_BidHeaderVendor_CrossrefCategoryBiditemBidtypeItemBidTypeSortseq` | no | NONCLUSTERED | `BidHeaderId`, `VendorId` | `CrossRefId`, `CategoryId`, `BidItemId`, `BidType`, `ItemBidType`, `SortSeq` |
