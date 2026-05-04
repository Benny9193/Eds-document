# Table: `dbo.BidCountyLineItem`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `bidId` | nvarchar(1000) | NO |  |  |
| 3 | `countyId` | nvarchar(1000) | NO |  |  |
| 4 | `solicitationLineItemId` | nvarchar(1000) | NO |  |  |
| 5 | `unitPrice` | decimal(18,3) | NO |  |  |
| 6 | `quantity` | decimal(18,4) | YES |  |  |
| 7 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 8 | `updatedAt` | datetime2 | NO |  |  |
| 9 | `encryptedPricing` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `BidCountyLineItem_bidId_fkey` | `bidId` | [`dbo.Bid.id`](dbo.Bid.md) | CASCADE | CASCADE |
| `BidCountyLineItem_countyId_fkey` | `countyId` | [`dbo.County.id`](dbo.County.md) | NO_ACTION | CASCADE |
| `BidCountyLineItem_solicitationLineItemId_fkey` | `solicitationLineItemId` | [`dbo.SolicitationLineItem.id`](dbo.SolicitationLineItem.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `BidCountyLineItem_bidId_countyId_solicitationLineItemId_key` | YES | NONCLUSTERED | `bidId`, `countyId`, `solicitationLineItemId` |  |
| `BidCountyLineItem_bidId_idx` | no | NONCLUSTERED | `bidId` |  |
| `BidCountyLineItem_countyId_idx` | no | NONCLUSTERED | `countyId` |  |
| `BidCountyLineItem_solicitationLineItemId_idx` | no | NONCLUSTERED | `solicitationLineItemId` |  |
