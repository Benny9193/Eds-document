# Table: `dbo.BidHeaderDetail`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 123789151

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
| 8 | `RequisitionId` | int | YES |  |  |
| 9 | `id` | uniqueidentifier | NO | `(newsequentialid())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_BidHeaderDetail_K2_K4_K1_K3` | no | NONCLUSTERED | `BidHeaderId`, `BidRequestItemId`, `BidHeaderDetailId`, `DetailId` |  |
| `_dta_index_BidHeaderDetail_K4_K1_K3` | no | NONCLUSTERED | `BidRequestItemId`, `BidHeaderDetailId`, `DetailId` |  |
| `IX_BidHeaderDetail_2` | no | NONCLUSTERED | `BidHeaderId`, `DetailId` |  |
| `SK_BidHeader_2` | no | NONCLUSTERED | `BidHeaderId` |  |
| `SK_Detail_2` | no | NONCLUSTERED | `DetailId` | `BidHeaderDetailId`, `BidHeaderId` |
| `UQ__BidHeade__3213E83E12D014FD` | YES | NONCLUSTERED | `id` |  |
