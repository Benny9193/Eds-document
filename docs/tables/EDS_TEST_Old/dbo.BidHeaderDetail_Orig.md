# Table: `dbo.BidHeaderDetail_Orig`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 102658927

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderDetailId` | bigint | NO |  | YES |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `DetailId` | int | YES |  |  |
| 4 | `BidRequestItemId` | int | YES |  |  |
| 5 | `Quantity` | int | YES |  |  |
| 6 | `DateAdded` | datetime | YES | `(getdate())` |  |
| 7 | `BidHeaderKey` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_BidHeaderDetail_7_747201762__K2_K4_K1_K3` | no | NONCLUSTERED | `BidHeaderId`, `BidRequestItemId`, `BidHeaderDetailId`, `DetailId` |  |
| `_dta_index_BidHeaderDetail_7_747201762__K4_K1_K3` | no | NONCLUSTERED | `BidRequestItemId`, `BidHeaderDetailId`, `DetailId` |  |
| `IX_BidHeaderDetail` | no | NONCLUSTERED | `BidHeaderId`, `DetailId` |  |
| `SK_BidHeader` | no | NONCLUSTERED | `BidHeaderId` |  |
| `SK_Detail` | no | NONCLUSTERED | `DetailId` | `BidHeaderDetailId`, `BidHeaderId` |
