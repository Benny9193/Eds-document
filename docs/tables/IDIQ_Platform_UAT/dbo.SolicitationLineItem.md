# Table: `dbo.SolicitationLineItem`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `solicitationId` | nvarchar(1000) | NO |  |  |
| 3 | `itemNumber` | nvarchar(1000) | NO |  |  |
| 4 | `description` | nvarchar(max) | NO |  |  |
| 5 | `unit` | nvarchar(1000) | NO |  |  |
| 6 | `estimatedQuantity` | decimal(18,4) | YES |  |  |
| 7 | `category` | nvarchar(1000) | YES |  |  |
| 8 | `specifications` | nvarchar(max) | YES |  |  |
| 9 | `required` | bit | NO | `((1))` |  |
| 10 | `order` | int | NO | `((0))` |  |
| 11 | `evaluationWeight` | decimal(6,3) | YES |  |  |
| 12 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 13 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `SolicitationLineItem_solicitationId_fkey` | `solicitationId` | [`dbo.Solicitation.id`](dbo.Solicitation.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.BidCountyLineItem`](dbo.BidCountyLineItem.md) | `solicitationLineItemId` | `id` | CASCADE | CASCADE |
| [`dbo.MiniBidLineItem`](dbo.MiniBidLineItem.md) | `solicitationLineItemId` | `id` | NO_ACTION | CASCADE |
| [`dbo.OrderLineItem`](dbo.OrderLineItem.md) | `solicitationLineItemId` | `id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SolicitationLineItem_solicitationId_idx` | no | NONCLUSTERED | `solicitationId` |  |
| `SolicitationLineItem_solicitationId_itemNumber_key` | YES | NONCLUSTERED | `solicitationId`, `itemNumber` |  |
