# Table: `dbo.EmailLog`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `userId` | nvarchar(1000) | YES |  |  |
| 4 | `recipientEmail` | nvarchar(1000) | NO |  |  |
| 5 | `subject` | nvarchar(1000) | NO |  |  |
| 6 | `notificationType` | nvarchar(1000) | YES |  |  |
| 7 | `status` | nvarchar(1000) | NO |  |  |
| 8 | `messageId` | nvarchar(1000) | YES |  |  |
| 9 | `error` | nvarchar(max) | YES |  |  |
| 10 | `sentAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `EmailLog_userId_fkey` | `userId` | [`dbo.User.id`](dbo.User.md) | SET_NULL | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `EmailLog_sentAt_idx` | no | NONCLUSTERED | `sentAt` |  |
| `EmailLog_status_idx` | no | NONCLUSTERED | `status` |  |
| `EmailLog_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
| `EmailLog_userId_idx` | no | NONCLUSTERED | `userId` |  |
