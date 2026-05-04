# Table: `dbo.MiniBidLineItem`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `miniBidId` | nvarchar(1000) | NO |  |  |
| 3 | `solicitationLineItemId` | nvarchar(1000) | NO |  |  |
| 4 | `quantity` | decimal(18,4) | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `MiniBidLineItem_miniBidId_fkey` | `miniBidId` | [`dbo.MiniBid.id`](dbo.MiniBid.md) | CASCADE | CASCADE |
| `MiniBidLineItem_solicitationLineItemId_fkey` | `solicitationLineItemId` | [`dbo.SolicitationLineItem.id`](dbo.SolicitationLineItem.md) | NO_ACTION | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `MiniBidLineItem_miniBidId_idx` | no | NONCLUSTERED | `miniBidId` |  |
| `MiniBidLineItem_solicitationLineItemId_idx` | no | NONCLUSTERED | `solicitationLineItemId` |  |
