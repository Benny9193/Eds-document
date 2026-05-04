# Table: `dbo.VendorCertification`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `vendorId` | nvarchar(1000) | NO |  |  |
| 3 | `type` | nvarchar(1000) | NO |  |  |
| 4 | `certNumber` | nvarchar(1000) | YES |  |  |
| 5 | `issuedBy` | nvarchar(1000) | YES |  |  |
| 6 | `issuedDate` | datetime2 | YES |  |  |
| 7 | `expirationDate` | datetime2 | YES |  |  |
| 8 | `documentKey` | nvarchar(1000) | YES |  |  |
| 9 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 10 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `VendorCertification_vendorId_fkey` | `vendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `VendorCertification_type_idx` | no | NONCLUSTERED | `type` |  |
| `VendorCertification_vendorId_idx` | no | NONCLUSTERED | `vendorId` |  |
