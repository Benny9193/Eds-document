# Table: `dbo.FormTemplate`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 65

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | YES |  |  |
| 3 | `formType` | nvarchar(1000) | NO |  |  |
| 4 | `name` | nvarchar(1000) | NO |  |  |
| 5 | `description` | nvarchar(1000) | YES |  |  |
| 6 | `category` | nvarchar(1000) | YES |  |  |
| 7 | `version` | int | NO | `((1))` |  |
| 8 | `isActive` | bit | NO | `((1))` |  |
| 9 | `storageKey` | nvarchar(1000) | NO |  |  |
| 10 | `fieldCount` | int | NO | `((0))` |  |
| 11 | `createdById` | nvarchar(1000) | NO |  |  |
| 12 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 13 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FormTemplate_createdById_fkey` | `createdById` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `FormTemplate_tenantId_fkey` | `tenantId` | [`dbo.Tenant.id`](dbo.Tenant.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `FormTemplate_formType_idx` | no | NONCLUSTERED | `formType` |  |
| `FormTemplate_formType_tenantId_version_key` | YES | NONCLUSTERED | `formType`, `tenantId`, `version` |  |
| `FormTemplate_isActive_idx` | no | NONCLUSTERED | `isActive` |  |
| `FormTemplate_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
