# Table: `dbo.PasswordResetToken`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 7

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `email` | nvarchar(1000) | NO |  |  |
| 3 | `tokenHash` | nvarchar(1000) | NO |  |  |
| 4 | `expiresAt` | datetime2 | NO |  |  |
| 5 | `usedAt` | datetime2 | YES |  |  |
| 6 | `createdAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `PasswordResetToken_email_idx` | no | NONCLUSTERED | `email` |  |
| `PasswordResetToken_tokenHash_idx` | no | NONCLUSTERED | `tokenHash` |  |
| `PasswordResetToken_tokenHash_key` | YES | NONCLUSTERED | `tokenHash` |  |
