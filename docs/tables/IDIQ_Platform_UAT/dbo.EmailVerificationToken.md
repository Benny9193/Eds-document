# Table: `dbo.EmailVerificationToken`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `userId` | nvarchar(1000) | NO |  |  |
| 3 | `tokenHash` | nvarchar(1000) | NO |  |  |
| 4 | `expiresAt` | datetime2 | NO |  |  |
| 5 | `usedAt` | datetime2 | YES |  |  |
| 6 | `createdAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `EmailVerificationToken_userId_fkey` | `userId` | [`dbo.User.id`](dbo.User.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `EmailVerificationToken_tokenHash_idx` | no | NONCLUSTERED | `tokenHash` |  |
| `EmailVerificationToken_tokenHash_key` | YES | NONCLUSTERED | `tokenHash` |  |
| `EmailVerificationToken_userId_idx` | no | NONCLUSTERED | `userId` |  |
