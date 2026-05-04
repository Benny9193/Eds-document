# Table: `dbo.SolicitationAdvertisementNewspaper`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `advertisementId` | nvarchar(1000) | NO |  |  |
| 3 | `newspaperId` | nvarchar(1000) | NO |  |  |
| 4 | `publicationDate` | datetime2 | NO |  |  |
| 5 | `proofDocumentKey` | nvarchar(1000) | YES |  |  |
| 6 | `proofDocumentFilename` | nvarchar(1000) | YES |  |  |
| 7 | `proofDocumentSize` | int | YES |  |  |
| 8 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 9 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `SolicitationAdvertisementNewspaper_advertisementId_fkey` | `advertisementId` | [`dbo.SolicitationAdvertisement.id`](dbo.SolicitationAdvertisement.md) | CASCADE | CASCADE |
| `SolicitationAdvertisementNewspaper_newspaperId_fkey` | `newspaperId` | [`dbo.Newspaper.id`](dbo.Newspaper.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SolicitationAdvertisementNewspaper_advertisementId_newspaperId_key` | YES | NONCLUSTERED | `advertisementId`, `newspaperId` |  |
| `SolicitationAdvertisementNewspaper_newspaperId_idx` | no | NONCLUSTERED | `newspaperId` |  |
| `SolicitationAdvertisementNewspaper_publicationDate_idx` | no | NONCLUSTERED | `publicationDate` |  |
