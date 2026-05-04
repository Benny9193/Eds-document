# Table: `dbo.VendorRelationship`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `vendorId` | nvarchar(1000) | NO |  |  |
| 4 | `relatedVendorId` | nvarchar(1000) | NO |  |  |
| 5 | `relationshipType` | nvarchar(1000) | NO |  |  |
| 6 | `relationshipDetails` | nvarchar(max) | YES |  |  |
| 7 | `sharedAddress` | nvarchar(1000) | YES |  |  |
| 8 | `sharedPhone` | nvarchar(1000) | YES |  |  |
| 9 | `sharedStaffNames` | nvarchar(1000) | YES |  |  |
| 10 | `sharedEquipment` | nvarchar(1000) | YES |  |  |
| 11 | `ownershipDetails` | nvarchar(1000) | YES |  |  |
| 12 | `familyRelation` | nvarchar(1000) | YES |  |  |
| 13 | `detectionMethod` | nvarchar(1000) | NO |  |  |
| 14 | `detectedAt` | datetime2 | NO | `(getdate())` |  |
| 15 | `detectedById` | nvarchar(1000) | YES |  |  |
| 16 | `status` | nvarchar(1000) | NO | `('PENDING_REVIEW')` |  |
| 17 | `verifiedAt` | datetime2 | YES |  |  |
| 18 | `verifiedById` | nvarchar(1000) | YES |  |  |
| 19 | `verificationNotes` | nvarchar(max) | YES |  |  |
| 20 | `debarmentImpact` | bit | NO | `((0))` |  |
| 21 | `debarmentNotes` | nvarchar(max) | YES |  |  |
| 22 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 23 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `VendorRelationship_relatedVendorId_fkey` | `relatedVendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | NO_ACTION | NO_ACTION |
| `VendorRelationship_vendorId_fkey` | `vendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `VendorRelationship_debarmentImpact_idx` | no | NONCLUSTERED | `debarmentImpact` |  |
| `VendorRelationship_relatedVendorId_idx` | no | NONCLUSTERED | `relatedVendorId` |  |
| `VendorRelationship_relationshipType_idx` | no | NONCLUSTERED | `relationshipType` |  |
| `VendorRelationship_status_idx` | no | NONCLUSTERED | `status` |  |
| `VendorRelationship_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
| `VendorRelationship_vendorId_idx` | no | NONCLUSTERED | `vendorId` |  |
| `VendorRelationship_vendorId_relatedVendorId_relationshipType_key` | YES | NONCLUSTERED | `vendorId`, `relatedVendorId`, `relationshipType` |  |
