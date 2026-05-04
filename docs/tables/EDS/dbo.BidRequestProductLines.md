# Table: `dbo.BidRequestProductLines`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 175875

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Bid-request side of `BidProductLines` (~176K rows). Lists the product lines under a `BidRequestManufacturer` row that vendors can respond to, with `UseOptions` and `Active` flags. Resolves which `ManufacturerProductLineId` rows the response form will offer.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidRequestProductLineId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `BidRequestManufacturerId` | int | NO |  |  |
| 4 | `ManufacturerProductLineId` | int | YES |  |  |
| 5 | `UseOptions` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_BidRequestManufacturer_` | no | NONCLUSTERED | `BidRequestManufacturerId` | `BidRequestProductLineId`, `Active`, `ManufacturerProductLineId` |
| `SKI_BidRequestProduct_` | no | NONCLUSTERED | `BidRequestManufacturerId` | `BidRequestProductLineId`, `Active`, `ManufacturerProductLineId` |
