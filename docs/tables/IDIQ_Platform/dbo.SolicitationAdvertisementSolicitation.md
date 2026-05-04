# Table: `dbo.SolicitationAdvertisementSolicitation`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 147

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `advertisementId` | nvarchar(1000) | NO |  |  |
| 3 | `solicitationId` | nvarchar(1000) | NO |  |  |
| 4 | `createdAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `SolicitationAdvertisementSolicitation_advertisementId_fkey` | `advertisementId` | [`dbo.SolicitationAdvertisement.id`](dbo.SolicitationAdvertisement.md) | CASCADE | CASCADE |
| `SolicitationAdvertisementSolicitation_solicitationId_fkey` | `solicitationId` | [`dbo.Solicitation.id`](dbo.Solicitation.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SolicitationAdvertisementSolicitation_advertisementId_solicitationId_key` | YES | NONCLUSTERED | `advertisementId`, `solicitationId` |  |
| `SolicitationAdvertisementSolicitation_solicitationId_idx` | no | NONCLUSTERED | `solicitationId` |  |
