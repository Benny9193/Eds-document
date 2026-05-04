# Table: `dbo.UserInvitation`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 12

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `email` | nvarchar(1000) | NO |  |  |
| 3 | `name` | nvarchar(1000) | YES |  |  |
| 4 | `roles` | nvarchar(1000) | NO |  |  |
| 5 | `tenantId` | nvarchar(1000) | NO |  |  |
| 6 | `invitedById` | nvarchar(1000) | NO |  |  |
| 7 | `tokenHash` | nvarchar(1000) | NO |  |  |
| 8 | `expiresAt` | datetime2 | NO |  |  |
| 9 | `status` | nvarchar(1000) | NO | `('PENDING')` |  |
| 10 | `acceptedAt` | datetime2 | YES |  |  |
| 11 | `createdAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `UserInvitation_invitedById_fkey` | `invitedById` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `UserInvitation_tenantId_fkey` | `tenantId` | [`dbo.Tenant.id`](dbo.Tenant.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UserInvitation_email_idx` | no | NONCLUSTERED | `email` |  |
| `UserInvitation_status_idx` | no | NONCLUSTERED | `status` |  |
| `UserInvitation_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
| `UserInvitation_tokenHash_idx` | no | NONCLUSTERED | `tokenHash` |  |
| `UserInvitation_tokenHash_key` | YES | NONCLUSTERED | `tokenHash` |  |
