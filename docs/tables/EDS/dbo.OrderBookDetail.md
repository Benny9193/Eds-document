# Table: `dbo.OrderBookDetail`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 37829973

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Aggregated order/spending facts used by reporting (~37.8M rows). Fed from completed `PODetailItems`. The `OrderBookDetailOld` table (~187M rows) is the prior-format archive — read but do not write.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `OrderBookDetailId` | int | NO |  | YES |
| 2 | `OrderBookId` | int | YES |  |  |
| 3 | `Active` | tinyint | YES |  |  |
| 4 | `ItemId` | int | YES |  |  |
| 5 | `BidItemId` | int | YES |  |  |
| 6 | `Weight` | int | YES |  |  |
| 7 | `BasePrice` | money | YES |  |  |
| 8 | `CatalogId` | int | YES |  |  |
| 9 | `CrossRefId` | int | YES |  |  |
| 10 | `BidPrice` | money | YES |  |  |
| 11 | `GrossPrice` | money | YES |  |  |
| 12 | `CatalogPrice` | money | YES |  |  |
| 13 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 14 | `CatalogPage` | varchar(4) | YES |  |  |
| 15 | `CatalogYear` | varchar(2) | YES |  |  |
| 16 | `VendorCode` | varchar(16) | YES |  |  |
| 17 | `VendorName` | varchar(255) | YES |  |  |
| 18 | `VendorItemCode` | varchar(50) | YES |  |  |
| 19 | `Alternate` | varchar(1024) | YES |  |  |
| 20 | `AwardId` | int | YES |  |  |
| 21 | `ParentAwardId` | int | YES |  |  |
| 22 | `VendorId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_OrderBook_Item` | no | NONCLUSTERED | `OrderBookId` | `ItemId` |
| `ti_CrossRef_OrderBookDetailId` | no | NONCLUSTERED | `CrossRefId` | `OrderBookDetailId` |
