# Table: `dbo.OrderLineItem`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `taskOrderId` | nvarchar(1000) | NO |  |  |
| 3 | `bidLineItemId` | nvarchar(1000) | YES |  |  |
| 4 | `solicitationLineItemId` | nvarchar(1000) | YES |  |  |
| 5 | `description` | nvarchar(max) | NO |  |  |
| 6 | `unit` | nvarchar(1000) | NO |  |  |
| 7 | `bidRate` | decimal(18,2) | NO |  |  |
| 8 | `quantity` | decimal(18,4) | NO |  |  |
| 9 | `extension` | decimal(18,2) | NO |  |  |
| 10 | `notes` | nvarchar(max) | YES |  |  |
| 11 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 12 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `OrderLineItem_bidLineItemId_fkey` | `bidLineItemId` | [`dbo.BidLineItem.id`](dbo.BidLineItem.md) | NO_ACTION | NO_ACTION |
| `OrderLineItem_solicitationLineItemId_fkey` | `solicitationLineItemId` | [`dbo.SolicitationLineItem.id`](dbo.SolicitationLineItem.md) | NO_ACTION | NO_ACTION |
| `OrderLineItem_taskOrderId_fkey` | `taskOrderId` | [`dbo.TaskOrder.id`](dbo.TaskOrder.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `OrderLineItem_solicitationLineItemId_idx` | no | NONCLUSTERED | `solicitationLineItemId` |  |
| `OrderLineItem_taskOrderId_idx` | no | NONCLUSTERED | `taskOrderId` |  |
