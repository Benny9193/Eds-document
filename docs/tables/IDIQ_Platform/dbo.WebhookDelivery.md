# Table: `dbo.WebhookDelivery`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `endpointId` | nvarchar(1000) | NO |  |  |
| 3 | `eventType` | nvarchar(1000) | NO |  |  |
| 4 | `eventId` | nvarchar(1000) | NO |  |  |
| 5 | `payload` | nvarchar(max) | NO |  |  |
| 6 | `status` | nvarchar(1000) | NO | `('PENDING')` |  |
| 7 | `attempts` | int | NO | `((0))` |  |
| 8 | `lastAttemptAt` | datetime2 | YES |  |  |
| 9 | `nextRetryAt` | datetime2 | YES |  |  |
| 10 | `responseStatus` | int | YES |  |  |
| 11 | `responseBody` | nvarchar(max) | YES |  |  |
| 12 | `responseTime` | int | YES |  |  |
| 13 | `errorMessage` | nvarchar(max) | YES |  |  |
| 14 | `createdAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `WebhookDelivery_endpointId_fkey` | `endpointId` | [`dbo.WebhookEndpoint.id`](dbo.WebhookEndpoint.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `WebhookDelivery_createdAt_idx` | no | NONCLUSTERED | `createdAt` |  |
| `WebhookDelivery_endpointId_idx` | no | NONCLUSTERED | `endpointId` |  |
| `WebhookDelivery_eventType_idx` | no | NONCLUSTERED | `eventType` |  |
| `WebhookDelivery_status_idx` | no | NONCLUSTERED | `status` |  |
