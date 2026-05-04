# Table: `dbo.VendorCategory`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 6767

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

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
