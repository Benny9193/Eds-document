# Table: `dbo.SolicitationAdvertisement`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 11

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `title` | nvarchar(1000) | YES |  |  |
| 4 | `documentKey` | nvarchar(1000) | YES |  |  |
| 5 | `documentFilename` | nvarchar(1000) | YES |  |  |
| 6 | `documentSize` | int | YES |  |  |
| 7 | `status` | nvarchar(1000) | NO | `('DRAFT')` |  |
| 8 | `publishedAt` | datetime2 | YES |  |  |
| 9 | `publishedById` | nvarchar(1000) | YES |  |  |
| 10 | `uploadedById` | nvarchar(1000) | NO |  |  |
| 11 | `uploadedAt` | datetime2 | NO | `(getdate())` |  |
| 12 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 13 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `SolicitationAdvertisement_publishedById_fkey` | `publishedById` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `SolicitationAdvertisement_tenantId_fkey` | `tenantId` | [`dbo.Tenant.id`](dbo.Tenant.md) | NO_ACTION | NO_ACTION |
| `SolicitationAdvertisement_uploadedById_fkey` | `uploadedById` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.SolicitationAdvertisementAddendum`](dbo.SolicitationAdvertisementAddendum.md) | `advertisementId` | `id` | CASCADE | CASCADE |
| [`dbo.SolicitationAdvertisementNewspaper`](dbo.SolicitationAdvertisementNewspaper.md) | `advertisementId` | `id` | CASCADE | CASCADE |
| [`dbo.SolicitationAdvertisementSolicitation`](dbo.SolicitationAdvertisementSolicitation.md) | `advertisementId` | `id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SolicitationAdvertisement_status_idx` | no | NONCLUSTERED | `status` |  |
| `SolicitationAdvertisement_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
