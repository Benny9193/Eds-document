# Table: `dbo.SolicitationAdvertisementAddendum`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `advertisementId` | nvarchar(1000) | NO |  |  |
| 3 | `addendumId` | nvarchar(1000) | NO |  |  |
| 4 | `createdAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `SolicitationAdvertisementAddendum_addendumId_fkey` | `addendumId` | [`dbo.SolicitationAddendum.id`](dbo.SolicitationAddendum.md) | NO_ACTION | NO_ACTION |
| `SolicitationAdvertisementAddendum_advertisementId_fkey` | `advertisementId` | [`dbo.SolicitationAdvertisement.id`](dbo.SolicitationAdvertisement.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SolicitationAdvertisementAddendum_addendumId_idx` | no | NONCLUSTERED | `addendumId` |  |
| `SolicitationAdvertisementAddendum_advertisementId_addendumId_key` | YES | NONCLUSTERED | `advertisementId`, `addendumId` |  |
