# Table: `dbo.ApiKey`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `name` | nvarchar(1000) | NO |  |  |
| 4 | `keyHash` | nvarchar(1000) | NO |  |  |
| 5 | `keyPrefix` | nvarchar(1000) | NO |  |  |
| 6 | `scopes` | nvarchar(1000) | NO |  |  |
| 7 | `rateLimit` | int | NO | `((1000))` |  |
| 8 | `lastUsedAt` | datetime2 | YES |  |  |
| 9 | `requestCount` | int | NO | `((0))` |  |
| 10 | `enabled` | bit | NO | `((1))` |  |
| 11 | `expiresAt` | datetime2 | YES |  |  |
| 12 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 13 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `ApiKey_enabled_idx` | no | NONCLUSTERED | `enabled` |  |
| `ApiKey_keyHash_idx` | no | NONCLUSTERED | `keyHash` |  |
| `ApiKey_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
