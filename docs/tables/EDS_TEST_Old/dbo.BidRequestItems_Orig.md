# Table: `dbo.BidRequestItems_Orig`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 25521585

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidRequestItemId` | int | NO |  | YES |
| 2 | `BidRequestItemId_OLD` | int | YES |  |  |
| 3 | `BidHeaderId` | int | YES |  |  |
| 4 | `ItemId` | int | YES |  |  |
| 5 | `BidRequest` | int | YES |  |  |
| 6 | `Active` | tinyint | YES |  |  |
| 7 | `RequisitionCount` | int | YES |  |  |
| 8 | `Status` | varchar(50) | YES |  |  |
| 9 | `Comments` | varchar(1024) | YES |  |  |
| 10 | `BidRequestAmount` | money | YES |  |  |
| 11 | `Checksum` | int | YES |  |  |
| 12 | `MasterItemCodePtr` | int | YES |  |  |
| 13 | `BidHeaderKey` | int | YES |  |  |
| 14 | `ImageURL` | varchar(300) | YES |  |  |
| 15 | `SDS_URL` | varchar(300) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_BidRequestItems_7_363200394__K2_K1_K5` | no | NONCLUSTERED | `BidHeaderId`, `BidRequestItemId`, `Active` |  |
| `_dta_index_BidRequestItems_7_363200394__K2_K5_K1_3_4_7_8` | no | NONCLUSTERED | `BidHeaderId`, `Active`, `BidRequestItemId` | `ItemId`, `BidRequest`, `Status`, `Comments` |
| `_dta_index_BidRequestItems_7_363200394__K2_K5_K1_K3` | no | NONCLUSTERED | `BidHeaderId`, `Active`, `BidRequestItemId`, `ItemId` |  |
| `IX_BidRequestItemID_OLD` | no | NONCLUSTERED | `BidRequestItemId_OLD` |  |
| `SK_BidItem` | no | NONCLUSTERED | `BidHeaderId`, `ItemId` |  |
| `SK_ItemBidRequestHeader` | no | NONCLUSTERED | `ItemId`, `BidHeaderId`, `BidRequest` |  |
| `SKI_BidHeader_RequestItemItemQuantityActiveReqcount` | no | NONCLUSTERED | `BidHeaderId`, `BidRequestItemId` | `ItemId`, `BidRequest`, `Active`, `RequisitionCount` |
