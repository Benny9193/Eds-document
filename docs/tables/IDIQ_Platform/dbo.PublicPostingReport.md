# Table: `dbo.PublicPostingReport`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `contractId` | nvarchar(1000) | YES |  |  |
| 4 | `taskOrderId` | nvarchar(1000) | YES |  |  |
| 5 | `reportType` | nvarchar(1000) | NO |  |  |
| 6 | `reportNumber` | nvarchar(1000) | NO |  |  |
| 7 | `title` | nvarchar(1000) | NO |  |  |
| 8 | `periodStart` | datetime2 | YES |  |  |
| 9 | `periodEnd` | datetime2 | YES |  |  |
| 10 | `data` | nvarchar(max) | NO |  |  |
| 11 | `documentKey` | nvarchar(1000) | YES |  |  |
| 12 | `status` | nvarchar(1000) | NO | `('DRAFT')` |  |
| 13 | `publishedAt` | datetime2 | YES |  |  |
| 14 | `publishedUrl` | nvarchar(1000) | YES |  |  |
| 15 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 16 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `PublicPostingReport_contractId_idx` | no | NONCLUSTERED | `contractId` |  |
| `PublicPostingReport_reportType_idx` | no | NONCLUSTERED | `reportType` |  |
| `PublicPostingReport_status_idx` | no | NONCLUSTERED | `status` |  |
| `PublicPostingReport_taskOrderId_idx` | no | NONCLUSTERED | `taskOrderId` |  |
| `PublicPostingReport_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
| `PublicPostingReport_tenantId_reportNumber_key` | YES | NONCLUSTERED | `tenantId`, `reportNumber` |  |
