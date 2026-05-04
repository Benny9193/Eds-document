# Table: `dbo.BidLineItem`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `bidId` | nvarchar(1000) | NO |  |  |
| 3 | `description` | nvarchar(max) | NO |  |  |
| 4 | `unit` | nvarchar(1000) | NO |  |  |
| 5 | `unitPrice` | decimal(18,3) | NO |  |  |
| 6 | `quantity` | decimal(18,4) | YES |  |  |
| 7 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 8 | `updatedAt` | datetime2 | NO |  |  |
| 9 | `encryptedPricing` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `BidLineItem_bidId_fkey` | `bidId` | [`dbo.Bid.id`](dbo.Bid.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.OrderLineItem`](dbo.OrderLineItem.md) | `bidLineItemId` | `id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `BidLineItem_bidId_idx` | no | NONCLUSTERED | `bidId` |  |
