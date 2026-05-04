# Table: `dbo.BidManufacturers`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 253038

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BMAId` | int | NO |  | YES |
| 2 | `BidId` | int | NO |  |  |
| 3 | `ManufacturerId` | int | NO |  |  |
| 4 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 5 | `Modified` | datetime | NO | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_BidManufacturer_Discount` | no | NONCLUSTERED | `BidId`, `ManufacturerId` | `DiscountRate` |
| `SKI_Manufacturer_BidDiscount` | no | NONCLUSTERED | `ManufacturerId` | `BidId`, `DiscountRate` |
