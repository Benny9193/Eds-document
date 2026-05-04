# Table: `dbo.BidResults`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 33204670

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Vendor line-item bid responses (~33.2M rows) — the prices, lead times, and notes a vendor submitted for each `BidRequestItems` line they chose to bid on.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidResultsId` | int | NO |  | YES |
| 2 | `BidImportId` | int | YES |  |  |
| 3 | `BidHeaderId` | int | YES |  |  |
| 4 | `BidRequestItemId` | int | YES |  |  |
| 5 | `CategoryId` | int | YES |  |  |
| 6 | `DistrictId` | int | YES |  |  |
| 7 | `ItemId` | int | YES |  |  |
| 8 | `ItemCode` | varchar(50) | YES |  |  |
| 9 | `Units` | varchar(16) | YES |  |  |
| 10 | `Alternate` | varchar(512) | YES |  |  |
| 11 | `Quantity` | int | YES |  |  |
| 12 | `ItemBidType` | char(1) | YES |  |  |
| 13 | `UnitPrice` | money | YES |  |  |
| 14 | `Cost` | money | YES |  |  |
| 15 | `VendorItemCode` | varchar(50) | YES |  |  |
| 16 | `QuantityBid` | int | YES |  |  |
| 17 | `ItemsPerUnit` | varchar(50) | YES |  |  |
| 18 | `UnitId` | int | YES |  |  |
| 19 | `Status` | varchar(51) | YES |  |  |
| 20 | `Comments` | varchar(1024) | YES |  |  |
| 21 | `Active` | int | YES |  |  |
| 22 | `PageNo` | int | YES |  |  |
| 23 | `PackedVendorItemCode` | varchar(50) | YES |  |  |
| 24 | `ModifiedDate` | datetime | YES |  |  |
| 25 | `ModifiedSessionId` | int | YES |  |  |
| 26 | `ModifiedBy` | int | YES |  |  |
| 27 | `RTK_MSDSId` | int | YES |  |  |
| 28 | `RTK_MSDSNotNeeded` | tinyint | YES |  |  |
| 29 | `ContractNumber` | varchar(50) | YES |  |  |
| 30 | `OriginalAwardedItem` | tinyint | YES |  |  |
| 31 | `VOMId` | int | YES |  |  |
| 32 | `AdditionalShipping` | tinyint | YES |  |  |
| 33 | `ManufacturerBid` | varchar(50) | YES |  |  |
| 34 | `ManufPartNoBid` | varchar(50) | YES |  |  |
| 35 | `LinerGaugeMicrons` | numeric(2,0) | YES |  |  |
| 36 | `LinerGaugeMil` | numeric(3,2) | YES |  |  |
| 37 | `LinerCaseWeight` | numeric(4,2) | YES |  |  |
| 38 | `LinerDimWidth` | numeric(4,2) | YES |  |  |
| 39 | `LinerDimDepth` | numeric(4,2) | YES |  |  |
| 40 | `LinerDimLength` | numeric(4,2) | YES |  |  |
| 41 | `PackedManufPartNoBid` | varchar(50) | YES |  |  |
| 42 | `BidHeaderKey` | int | YES |  |  |
| 43 | `SDS_URL` | varchar(300) | YES |  |  |
| 44 | `ImageURL` | varchar(300) | YES |  |  |
| 45 | `UPC_ISBN` | varchar(20) | YES |  |  |
| 46 | `UNSPSC` | varchar(50) | YES |  |  |
| 47 | `UniqueItemNumber` | varchar(50) | YES |  |  |
| 48 | `DigitallyDelivered` | tinyint | YES |  |  |
| 49 | `MinimumOrderQuantity` | int | YES |  |  |
| 50 | `PrescriptionRequired` | bit | YES |  |  |
| 51 | `PerishableItem` | bit | YES |  |  |
| 52 | `HashKey` | varbinary(64) | YES |  |  |
| 53 | `ProductNames` | varchar(4000) | YES |  |  |
| 54 | `TypeAheads` | nvarchar(4000) | YES |  |  |
| 55 | `AIShortDesc` | nvarchar(1024) | YES |  |  |
| 56 | `AIFullDesc` | nvarchar(4000) | YES |  |  |
| 57 | `AIUNSPSC` | varchar(20) | YES |  |  |
| 58 | `AIDate` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `Ix_BidHeaderId_2` | no | NONCLUSTERED | `BidHeaderId` |  |
| `IX_BidResults_SDSURL_ItemId` | no | NONCLUSTERED | `SDS_URL`, `ItemId` |  |
| `IX_SDS_URL` | no | NONCLUSTERED | `SDS_URL` |  |
| `SK_BidRequestItem_2` | no | NONCLUSTERED | `BidRequestItemId` |  |
| `SK_HashKey` | no | NONCLUSTERED | `HashKey` |  |
| `SK_ImportSDSRefSKI` | no | NONCLUSTERED | `BidImportId`, `SDS_URL` |  |
| `SKI_AIDate_HashKey` | no | NONCLUSTERED | `AIDate` | `HashKey` |
| `SKI_BidImportBidRequestItem_ActiveBidTypeBidResultsUnitPrice_2` | no | NONCLUSTERED | `BidImportId`, `BidRequestItemId` | `BidResultsId`, `DistrictId`, `Quantity`, `ItemBidType`, `UnitPrice` |
| `SKI_BidImportItemVOM_ItemBidTypeBidResults` | no | NONCLUSTERED | `BidImportId`, `ItemId`, `VOMId` | `BidResultsId`, `ItemBidType` |
| `SKI_BidImportVIC_ItemImage` | no | NONCLUSTERED | `BidImportId`, `VendorItemCode` | `ItemId`, `ImageURL` |
| `SKI_ItemId_Info` | no | NONCLUSTERED | `ItemId` | `ItemCode`, `VendorItemCode`, `ManufacturerBid`, `ManufPartNoBid`, `SDS_URL` |
| `SKI_SDSRef_Import` | no | NONCLUSTERED | `SDS_URL` | `BidImportId` |
| `SKI_SDSURL_Info` | no | NONCLUSTERED | `SDS_URL` | `ItemId`, `ItemCode`, `VendorItemCode`, `ManufacturerBid`, `ManufPartNoBid` |
| `ski_VendorItemCodeImageURL_BidImportId` | no | NONCLUSTERED | `VendorItemCode`, `ImageURL` | `BidImportId`, `BidResultsId` |
