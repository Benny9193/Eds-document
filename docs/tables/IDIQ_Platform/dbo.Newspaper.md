# Table: `dbo.Newspaper`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 5

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `name` | nvarchar(1000) | NO |  |  |
| 4 | `city` | nvarchar(1000) | YES |  |  |
| 5 | `state` | nvarchar(1000) | YES |  |  |
| 6 | `active` | bit | NO | `((1))` |  |
| 7 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 8 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `Newspaper_tenantId_fkey` | `tenantId` | [`dbo.Tenant.id`](dbo.Tenant.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.SolicitationAdvertisementNewspaper`](dbo.SolicitationAdvertisementNewspaper.md) | `newspaperId` | `id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `Newspaper_active_idx` | no | NONCLUSTERED | `active` |  |
| `Newspaper_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
| `Newspaper_tenantId_name_key` | YES | NONCLUSTERED | `tenantId`, `name` |  |
