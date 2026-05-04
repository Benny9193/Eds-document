# Table: `dbo.BidCounty`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2197

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `bidId` | nvarchar(1000) | NO |  |  |
| 3 | `countyId` | nvarchar(1000) | NO |  |  |
| 4 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 5 | `pricingConfirmedAt` | datetime2 | YES |  |  |
| 6 | `pricingConfirmedById` | nvarchar(1000) | YES |  |  |
| 7 | `pricingRejectedAt` | datetime2 | YES |  |  |
| 8 | `pricingRejectedById` | nvarchar(1000) | YES |  |  |
| 9 | `pricingRejectionReason` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `BidCounty_bidId_fkey` | `bidId` | [`dbo.Bid.id`](dbo.Bid.md) | CASCADE | CASCADE |
| `BidCounty_countyId_fkey` | `countyId` | [`dbo.County.id`](dbo.County.md) | NO_ACTION | CASCADE |
| `BidCounty_pricingConfirmedById_fkey` | `pricingConfirmedById` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `BidCounty_pricingRejectedById_fkey` | `pricingRejectedById` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `BidCounty_bidId_countyId_key` | YES | NONCLUSTERED | `bidId`, `countyId` |  |
| `BidCounty_bidId_idx` | no | NONCLUSTERED | `bidId` |  |
| `BidCounty_countyId_idx` | no | NONCLUSTERED | `countyId` |  |
