# Table: `dbo.WebhookEndpoint`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `url` | nvarchar(1000) | NO |  |  |
| 4 | `description` | nvarchar(1000) | YES |  |  |
| 5 | `secret` | nvarchar(1000) | NO |  |  |
| 6 | `enabled` | bit | NO | `((1))` |  |
| 7 | `events` | nvarchar(1000) | NO |  |  |
| 8 | `lastDeliveryAt` | datetime2 | YES |  |  |
| 9 | `lastSuccessAt` | datetime2 | YES |  |  |
| 10 | `failureCount` | int | NO | `((0))` |  |
| 11 | `isHealthy` | bit | NO | `((1))` |  |
| 12 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 13 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.WebhookDelivery`](dbo.WebhookDelivery.md) | `endpointId` | `id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `WebhookEndpoint_enabled_idx` | no | NONCLUSTERED | `enabled` |  |
| `WebhookEndpoint_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
