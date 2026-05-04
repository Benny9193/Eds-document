# Table: `dbo.Notification`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 107

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `userId` | nvarchar(1000) | YES |  |  |
| 4 | `type` | nvarchar(1000) | NO |  |  |
| 5 | `title` | nvarchar(1000) | NO |  |  |
| 6 | `message` | nvarchar(max) | NO |  |  |
| 7 | `link` | nvarchar(1000) | YES |  |  |
| 8 | `read` | bit | NO | `((0))` |  |
| 9 | `readAt` | datetime2 | YES |  |  |
| 10 | `createdAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `Notification_tenantId_fkey` | `tenantId` | [`dbo.Tenant.id`](dbo.Tenant.md) | CASCADE | CASCADE |
| `Notification_userId_fkey` | `userId` | [`dbo.User.id`](dbo.User.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `Notification_createdAt_idx` | no | NONCLUSTERED | `createdAt` |  |
| `Notification_tenantId_userId_read_idx` | no | NONCLUSTERED | `tenantId`, `userId`, `read` |  |
