# Table: `dbo.VendorCategory`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 6898

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Vendor-by-category directory (~6.9K rows). Lighter-weight than `VendorCategoryPP` — one row per (`VendorId`, `CategoryId`) with the denormalized `VendorName` and a marketing `WebLink`. Used in directory / search displays where the price-plan dimension isn't needed.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VCId` | int | NO |  | YES |
| 2 | `VendorId` | int | YES |  |  |
| 3 | `CategoryId` | int | YES |  |  |
| 4 | `VendorName` | varchar(50) | YES |  |  |
| 5 | `WebLink` | varchar(512) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_Category` | no | NONCLUSTERED | `CategoryId` |  |
| `SK_Vendor` | no | NONCLUSTERED | `VendorId` |  |
| `SKI_VendorCategory_Name` | no | NONCLUSTERED | `VendorId`, `CategoryId` | `VCId`, `VendorName`, `WebLink` |
