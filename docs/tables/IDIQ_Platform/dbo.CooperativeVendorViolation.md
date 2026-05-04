# Table: `dbo.CooperativeVendorViolation`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `cooperativeId` | nvarchar(1000) | NO |  |  |
| 3 | `vendorId` | nvarchar(1000) | NO |  |  |
| 4 | `violationType` | nvarchar(1000) | NO |  |  |
| 5 | `violationDate` | datetime2 | NO |  |  |
| 6 | `detectedDate` | datetime2 | NO |  |  |
| 7 | `njDolCaseNumber` | nvarchar(1000) | YES |  |  |
| 8 | `njDolListingDate` | datetime2 | YES |  |  |
| 9 | `description` | nvarchar(max) | NO |  |  |
| 10 | `documentKey` | nvarchar(1000) | YES |  |  |
| 11 | `cooperativeDebarredAt` | datetime2 | YES |  |  |
| 12 | `cooperativeDebarmentEnd` | datetime2 | YES |  |  |
| 13 | `status` | nvarchar(1000) | NO | `('ACTIVE')` |  |
| 14 | `createdById` | nvarchar(1000) | YES |  |  |
| 15 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 16 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `CooperativeVendorViolation_vendorId_fkey` | `vendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | NO_ACTION | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `CooperativeVendorViolation_cooperativeDebarmentEnd_idx` | no | NONCLUSTERED | `cooperativeDebarmentEnd` |  |
| `CooperativeVendorViolation_cooperativeId_idx` | no | NONCLUSTERED | `cooperativeId` |  |
| `CooperativeVendorViolation_status_idx` | no | NONCLUSTERED | `status` |  |
| `CooperativeVendorViolation_vendorId_idx` | no | NONCLUSTERED | `vendorId` |  |
