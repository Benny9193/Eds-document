# Table: `dbo.JobReference`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 233

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `bullJobId` | nvarchar(100) | YES |  |  |
| 3 | `queueName` | nvarchar(50) | NO |  |  |
| 4 | `kind` | nvarchar(100) | NO |  |  |
| 5 | `tenantId` | nvarchar(1000) | NO |  |  |
| 6 | `userId` | nvarchar(1000) | YES |  |  |
| 7 | `resourceType` | nvarchar(50) | YES |  |  |
| 8 | `resourceId` | nvarchar(100) | YES |  |  |
| 9 | `status` | nvarchar(20) | NO | `('queued')` |  |
| 10 | `progress` | int | NO | `((0))` |  |
| 11 | `progressNote` | nvarchar(500) | YES |  |  |
| 12 | `errorMessage` | nvarchar(max) | YES |  |  |
| 13 | `resultUrl` | nvarchar(500) | YES |  |  |
| 14 | `resultBlob` | nvarchar(max) | YES |  |  |
| 15 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 16 | `startedAt` | datetime2 | YES |  |  |
| 17 | `completedAt` | datetime2 | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `JobReference_tenantId_fkey` | `tenantId` | [`dbo.Tenant.id`](dbo.Tenant.md) | NO_ACTION | NO_ACTION |
| `JobReference_userId_fkey` | `userId` | [`dbo.User.id`](dbo.User.md) | SET_NULL | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `JobReference_bullJobId_idx` | no | NONCLUSTERED | `bullJobId` |  |
| `JobReference_resourceType_resourceId_idx` | no | NONCLUSTERED | `resourceType`, `resourceId` |  |
| `JobReference_tenantId_status_createdAt_idx` | no | NONCLUSTERED | `tenantId`, `status`, `createdAt` |  |
