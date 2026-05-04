# Table: `dbo.AddendumDistributionLog`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `addendumId` | nvarchar(1000) | NO |  |  |
| 3 | `eventTimestamp` | datetime2 | NO | `(getdate())` |  |
| 4 | `eventType` | nvarchar(1000) | NO |  |  |
| 5 | `recipient` | nvarchar(500) | YES |  |  |
| 6 | `status` | nvarchar(1000) | NO | `('ok')` |  |
| 7 | `details` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `AddendumDistributionLog_addendumId_fkey` | `addendumId` | [`dbo.SolicitationAddendum.id`](dbo.SolicitationAddendum.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `AddendumDistributionLog_addendumId_idx` | no | NONCLUSTERED | `addendumId` |  |
| `AddendumDistributionLog_eventType_idx` | no | NONCLUSTERED | `eventType` |  |
