# Table: `dbo.VendorPricingIndex`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 125

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `bidId` | nvarchar(1000) | NO |  |  |
| 3 | `indexId` | nvarchar(1000) | NO |  |  |
| 4 | `countyId` | nvarchar(1000) | YES |  |  |
| 5 | `rates` | nvarchar(max) | NO |  |  |
| 6 | `markups` | nvarchar(max) | NO |  |  |
| 7 | `indexValue` | decimal(18,4) | YES |  |  |
| 8 | `calculatedScore` | decimal(5,2) | YES |  |  |
| 9 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 10 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `VendorPricingIndex_bidId_fkey` | `bidId` | [`dbo.Bid.id`](dbo.Bid.md) | CASCADE | CASCADE |
| `VendorPricingIndex_countyId_fkey` | `countyId` | [`dbo.County.id`](dbo.County.md) | NO_ACTION | NO_ACTION |
| `VendorPricingIndex_indexId_fkey` | `indexId` | [`dbo.ReferencePricingIndex.id`](dbo.ReferencePricingIndex.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `VendorPricingIndex_bidId_idx` | no | NONCLUSTERED | `bidId` |  |
| `VendorPricingIndex_bidId_indexId_countyId_key` | YES | NONCLUSTERED | `bidId`, `indexId`, `countyId` |  |
| `VendorPricingIndex_countyId_idx` | no | NONCLUSTERED | `countyId` |  |
| `VendorPricingIndex_indexId_idx` | no | NONCLUSTERED | `indexId` |  |
