# Table: `dbo.RecommendedVendor`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `recommendationId` | nvarchar(1000) | NO |  |  |
| 3 | `vendorId` | nvarchar(1000) | YES |  |  |
| 4 | `bidId` | nvarchar(1000) | YES |  |  |
| 5 | `rank` | int | NO |  |  |
| 6 | `evaluationScore` | float | NO | `((0))` |  |
| 7 | `recommendedAmount` | decimal(18,2) | NO | `((0))` |  |
| 8 | `justification` | nvarchar(max) | NO | `('')` |  |
| 9 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 10 | `ceirDocumentKey` | nvarchar(1000) | YES |  |  |
| 11 | `ceirDueDate` | datetime2 | YES |  |  |
| 12 | `ceirSubmitted` | bit | NO | `((0))` |  |
| 13 | `ceirSubmittedAt` | datetime2 | YES |  |  |
| 14 | `awardType` | nvarchar(1000) | NO | `('GENERAL')` |  |
| 15 | `countyId` | nvarchar(1000) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `RecommendedVendor_bidId_fkey` | `bidId` | [`dbo.Bid.id`](dbo.Bid.md) | SET_NULL | NO_ACTION |
| `RecommendedVendor_countyId_fkey` | `countyId` | [`dbo.County.id`](dbo.County.md) | NO_ACTION | NO_ACTION |
| `RecommendedVendor_recommendationId_fkey` | `recommendationId` | [`dbo.AwardRecommendation.id`](dbo.AwardRecommendation.md) | CASCADE | CASCADE |
| `RecommendedVendor_vendorId_fkey` | `vendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | SET_NULL | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `RecommendedVendor_countyId_idx` | no | NONCLUSTERED | `countyId` |  |
| `RecommendedVendor_recommendationId_countyId_idx` | no | NONCLUSTERED | `recommendationId`, `countyId` |  |
| `RecommendedVendor_recommendationId_idx` | no | NONCLUSTERED | `recommendationId` |  |
| `RecommendedVendor_vendorId_idx` | no | NONCLUSTERED | `vendorId` |  |
