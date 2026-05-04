# Table: `dbo.Detail`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 32609098

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Line items for both requisitions and purchase orders — ~30M rows, the largest transactional table in the procurement chain. Each row links back to its `Requisitions` (and after conversion, to its `PO`) and references either a vendor catalog item via `CrossRefs` or a free-text entry. Pricing, quantities, and account distribution all live here.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DetailId` | int | NO |  | YES |
| 2 | `RequisitionId` | int | YES |  |  |
| 3 | `CatalogId` | int | YES |  |  |
| 4 | `ItemId` | int | YES |  |  |
| 5 | `AddendumItem` | tinyint | YES |  |  |
| 6 | `ItemCode` | varchar(50) | YES |  |  |
| 7 | `Quantity` | int | YES |  |  |
| 8 | `LastYearsQuantity` | int | YES |  |  |
| 9 | `Description` | varchar(1024) | YES |  |  |
| 10 | `UnitId` | int | YES |  |  |
| 11 | `UnitCode` | varchar(20) | YES |  |  |
| 12 | `BidPrice` | money | YES |  |  |
| 13 | `CatalogPrice` | money | YES |  |  |
| 14 | `GrossPrice` | money | YES |  |  |
| 15 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 16 | `CatalogPage` | char(4) | YES |  |  |
| 17 | `PricePlanId` | int | YES |  |  |
| 18 | `PriceId` | int | YES |  |  |
| 19 | `AwardId` | int | YES |  |  |
| 20 | `VendorId` | int | YES |  |  |
| 21 | `VendorItemCode` | varchar(50) | YES |  |  |
| 22 | `Alternate` | varchar(1024) | YES |  |  |
| 23 | `POId` | int | YES |  |  |
| 24 | `BatchDetailId` | int | YES |  |  |
| 25 | `Modified` | datetime | YES |  |  |
| 26 | `ModifiedById` | int | YES |  |  |
| 27 | `SourceId` | int | YES |  |  |
| 28 | `SortSeq` | varchar(64) | YES |  |  |
| 29 | `BidItemId` | int | YES |  |  |
| 30 | `ExtraDescription` | varchar(1024) | YES |  |  |
| 31 | `ReProc` | tinyint | YES |  |  |
| 32 | `UseGrossPrices` | tinyint | YES |  |  |
| 33 | `BidHeaderId` | int | YES |  |  |
| 34 | `DistrictRequisitionNumber` | varchar(50) | YES |  |  |
| 35 | `HeadingTitle` | varchar(255) | YES |  |  |
| 36 | `Keyword` | varchar(50) | YES |  |  |
| 37 | `SectionId` | int | YES |  |  |
| 38 | `SectionName` | varchar(255) | YES |  |  |
| 39 | `OriginalItemId` | int | YES |  |  |
| 40 | `HeadingId` | int | YES |  |  |
| 41 | `KeywordId` | int | YES |  |  |
| 42 | `ItemMustBeBid` | int | YES |  |  |
| 43 | `SessionId` | int | YES |  |  |
| 44 | `Active` | tinyint | YES |  |  |
| 45 | `RTK_MSDSId` | int | YES |  |  |
| 46 | `AddedFromAddenda` | datetime | YES |  |  |
| 47 | `LastAlteredSessionId` | int | YES |  |  |
| 48 | `AdditionalShipping` | tinyint | YES |  |  |
| 49 | `CrossRefId` | int | YES |  |  |
| 50 | `ShippingCost` | decimal(9,2) | YES |  |  |
| 51 | `ShippingQuantity` | int | YES |  |  |
| 52 | `ShippingUpdated` | datetime | YES |  |  |
| 53 | `PerishableItem` | bit | YES | `((0))` |  |
| 54 | `DeliveryDate` | date | YES |  |  |
| 55 | `PrescriptionRequired` | bit | YES | `((0))` |  |
| 56 | `DoctorsName` | varchar(100) | YES | `('')` |  |
| 57 | `DEANumber` | varchar(9) | YES | `('')` |  |
| 58 | `Email` | varchar(255) | YES |  |  |
| 59 | `DigitallyDelivered` | tinyint | YES |  |  |
| 60 | `DigitallyDeliveredEmail` | varchar(255) | YES |  |  |
| 61 | `MinimumOrderQuantity` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.PODetailItems`](dbo.PODetailItems.md) | `DetailId` | `DetailId` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_Detail_7_581629165__K1_K2_7` | no | NONCLUSTERED | `DetailId`, `RequisitionId` | `Quantity` |
| `_dta_index_Detail_7_581629165__K1_K2_K4_29_30` | no | NONCLUSTERED | `DetailId`, `RequisitionId`, `ItemId` | `BidItemId`, `ExtraDescription` |
| `_dta_index_Detail_9_16055143__K2_K4_K7` | no | NONCLUSTERED | `RequisitionId`, `ItemId`, `Quantity` |  |
| `Detail_ItemId_index` | no | NONCLUSTERED | `ItemId` |  |
| `IX_Detail_RequisitionId_ItemId` | no | NONCLUSTERED | `CrossRefId` | `RequisitionId`, `ItemId` |
| `SK_BHOnly` | no | NONCLUSTERED | `BidHeaderId` |  |
| `SK_DetailReq` | YES | NONCLUSTERED | `DetailId`, `RequisitionId` |  |
| `SK_ItemReq` | no | NONCLUSTERED | `ItemId`, `RequisitionId` |  |
| `SK_ReqItem` | no | NONCLUSTERED | `RequisitionId`, `ItemId`, `DetailId` | `ExtraDescription`, `OriginalItemId` |
| `SK_ReqSortSeq` | no | NONCLUSTERED | `RequisitionId`, `SortSeq` |  |
| `SK_Requisition` | no | NONCLUSTERED | `RequisitionId` |  |
| `SKI_BidItem_QuantityDetailReq` | no | NONCLUSTERED | `BidItemId` | `Quantity`, `DetailId`, `RequisitionId` |
| `SKI_CrossRef_BidItemId` | no | NONCLUSTERED | `CrossRefId` | `BidItemId` |
| `SKI_Detail_RequisitionItem` | YES | NONCLUSTERED | `DetailId` | `RequisitionId`, `ItemId`, `BidItemId`, `ExtraDescription`, `SortSeq` |
| `SKI_MustBeBid_DetailReqItemPrice` | no | NONCLUSTERED | `ItemMustBeBid` | `DetailId`, `RequisitionId`, `ItemId`, `BidPrice`, `AwardId`, `VendorId`, `BidItemId`, `BidHeaderId` |
| `SKI_Requisition_QuantityBidPriceVendorBidHeader` | no | NONCLUSTERED | `RequisitionId` | `Quantity`, `BidPrice`, `VendorId`, `BidHeaderId`, `DetailId`, `ItemId`, `BidItemId`, `ItemMustBeBid`, `AddedFromAddenda` |
| `ski_RequisitionVendor_BidItemBidHeader` | no | NONCLUSTERED | `RequisitionId`, `VendorId` | `BidItemId`, `BidHeaderId`, `DetailId` |
| `SKI_ReqVendorBidHeader` | no | NONCLUSTERED | `RequisitionId`, `VendorId`, `BidHeaderId` |  |
| `ti_CrossRef_Detail` | no | NONCLUSTERED | `CrossRefId` | `DetailId` |
