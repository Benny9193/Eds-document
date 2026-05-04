# Table: `dbo.SSOConfiguration`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `providerType` | nvarchar(1000) | NO |  |  |
| 4 | `providerName` | nvarchar(1000) | NO |  |  |
| 5 | `enabled` | bit | NO | `((1))` |  |
| 6 | `config` | nvarchar(max) | NO |  |  |
| 7 | `groupRoleMapping` | nvarchar(max) | YES |  |  |
| 8 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 9 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SSOConfiguration_enabled_idx` | no | NONCLUSTERED | `enabled` |  |
| `SSOConfiguration_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
| `SSOConfiguration_tenantId_providerType_key` | YES | NONCLUSTERED | `tenantId`, `providerType` |  |
