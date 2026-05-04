# Table: `dbo.BidItems`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 27457031

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidItemId` | int | NO |  | YES |
| 2 | `BidItemId_Old` | int | YES |  |  |
| 3 | `BidId` | int | YES |  |  |
| 4 | `ItemId` | int | YES |  |  |
| 5 | `Price` | money | YES |  |  |
| 6 | `Alternate` | varchar(512) | YES |  |  |
| 7 | `BidQuantity` | int | YES |  |  |
| 8 | `BidRequest` | int | YES |  |  |
| 9 | `AwardId` | int | YES |  |  |
| 10 | `VendorItemCode` | varchar(50) | YES |  |  |
| 11 | `CrossRefId` | int | YES |  |  |
| 12 | `ItemBidType` | varchar(32) | YES |  |  |
| 13 | `PackedItemCode` | varchar(50) | YES |  |  |
| 14 | `PackedVendorItemCode` | varchar(50) | YES |  |  |
| 15 | `DateUpdated` | datetime | YES |  |  |
| 16 | `PageNo` | int | YES |  |  |
| 17 | `RTK_MSDSId` | int | YES |  |  |
| 18 | `BidResultsId` | int | YES |  |  |
| 19 | `ContractNumber` | varchar(50) | YES |  |  |
| 20 | `AdditionalShipping` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_BidItems_7_1321107797__K1_K2` | no | NONCLUSTERED | `BidItemId`, `BidId` |  |
| `_dta_index_BidItems_9_416056568__K2_K3_K6_K4_K10` | no | NONCLUSTERED | `BidId`, `ItemId`, `BidQuantity`, `Price`, `CrossRefId` | `BidResultsId` |
| `_dta_index_BidItems_9_416056568__K3_K2_K10_K1_K5_K9_K4` | no | NONCLUSTERED | `ItemId`, `BidId`, `CrossRefId`, `BidItemId`, `Alternate`, `VendorItemCode`, `Price` |  |
| `SK_BidPackedVendor` | no | NONCLUSTERED | `BidId`, `PackedVendorItemCode` | `BidItemId` |
| `SK_ItemBid` | no | NONCLUSTERED | `ItemId`, `BidId` | `BidItemId`, `Price`, `Alternate`, `VendorItemCode`, `CrossRefId` |
| `SK_Tune1` | no | NONCLUSTERED | `ItemId`, `BidItemId`, `BidId`, `Price`, `Alternate`, `BidQuantity`, `AwardId`, `VendorItemCode` |  |
| `SKI_BidResults_Bid_Item` | no | NONCLUSTERED | `BidResultsId` | `BidId`, `ItemId` |
| `SKI_BidResults_BidItem` | no | NONCLUSTERED | `BidResultsId` | `BidId`, `ItemId` |
| `ti_Crossref_BidItemId` | no | NONCLUSTERED | `CrossRefId` | `BidItemId` |
