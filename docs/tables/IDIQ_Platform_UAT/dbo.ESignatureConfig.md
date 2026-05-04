# Table: `dbo.ESignatureConfig`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `provider` | nvarchar(1000) | NO |  |  |
| 4 | `enabled` | bit | NO | `((1))` |  |
| 5 | `config` | nvarchar(max) | NO |  |  |
| 6 | `defaultSettings` | nvarchar(max) | YES |  |  |
| 7 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 8 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `ESignatureConfig_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
| `ESignatureConfig_tenantId_key` | YES | NONCLUSTERED | `tenantId` |  |
