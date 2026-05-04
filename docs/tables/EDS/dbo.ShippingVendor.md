# Table: `dbo.ShippingVendor`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 38754

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ShippingVendorId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `VendorId` | int | NO |  |  |
| 4 | `ShippingId` | int | NO |  |  |
| 5 | `ShippingCode` | varchar(50) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_VendorId_Code` | no | NONCLUSTERED | `VendorId`, `ShippingId` | `ShippingCode` |
