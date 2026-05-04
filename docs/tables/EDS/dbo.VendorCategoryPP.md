# Table: `dbo.VendorCategoryPP`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 17891

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Per-(vendor, category, district, price plan) visibility row (~18K rows). Determines whether a vendor's items in a given category appear to a district under a specific price plan. Combined with `DistrictPP` and `DistrictCategories` to compute catalog visibility.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VCPId` | int | NO |  | YES |
| 2 | `VendorId` | int | NO |  |  |
| 3 | `CategoryId` | int | NO |  |  |
| 4 | `DistrictId` | int | YES |  |  |
| 5 | `PricePlanId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_VendorId` | no | NONCLUSTERED | `VendorId` |  |
