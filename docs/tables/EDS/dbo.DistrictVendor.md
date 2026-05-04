# Table: `dbo.DistrictVendor`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 316658

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictVendorId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `DistrictId` | int | YES |  |  |
| 4 | `VendorId` | int | YES |  |  |
| 5 | `Value` | varchar(20) | YES |  |  |
| 6 | `VendorsAccountCode` | varchar(50) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DistrictVendor_District` | `DistrictId` | [`dbo.District.DistrictId`](dbo.District.md) | NO_ACTION | CASCADE |
| `FK_DistrictVendor_Vendors` | `VendorId` | [`dbo.Vendors.VendorId`](dbo.Vendors.md) | NO_ACTION | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_District` | no | NONCLUSTERED | `DistrictId` |  |
| `SK_DistrictVendor` | YES | NONCLUSTERED | `DistrictId`, `VendorId` | `DistrictVendorId`, `VendorsAccountCode` |
| `SKI_District_DistrictvendorVendorValueVAC` | no | NONCLUSTERED | `DistrictId`, `VendorId`, `Active` | `DistrictVendorId`, `Value`, `VendorsAccountCode` |
