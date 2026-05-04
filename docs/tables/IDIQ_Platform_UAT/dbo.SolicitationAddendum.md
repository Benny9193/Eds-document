# Table: `dbo.SolicitationAddendum`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `solicitationId` | nvarchar(1000) | NO |  |  |
| 3 | `addendumNumber` | int | NO |  |  |
| 4 | `title` | nvarchar(1000) | NO |  |  |
| 5 | `description` | nvarchar(max) | NO |  |  |
| 6 | `issuedById` | nvarchar(1000) | NO |  |  |
| 7 | `issuedAt` | datetime2 | NO | `(getdate())` |  |
| 8 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 9 | `updatedAt` | datetime2 | NO |  |  |
| 10 | `classification` | nvarchar(1000) | NO | `('non_material')` |  |
| 11 | `classificationJustification` | nvarchar(max) | YES |  |  |
| 12 | `deadlineExtensionJustification` | nvarchar(max) | YES |  |  |
| 13 | `issuedByTitle` | nvarchar(1000) | YES |  |  |
| 14 | `issuedFinalizedAt` | datetime2 | YES |  |  |
| 15 | `legalNoticePdfBlobReference` | nvarchar(500) | YES |  |  |
| 16 | `originalSubmissionDueDate` | datetime2 | YES |  |  |
| 17 | `pdfBlobReference` | nvarchar(500) | YES |  |  |
| 18 | `procurementTypeSlug` | nvarchar(1000) | NO |  |  |
| 19 | `procurementTypeVersion` | int | NO | `((1))` |  |
| 20 | `readvertisingCompletedDate` | datetime2 | YES |  |  |
| 21 | `readvertisingPublication` | nvarchar(500) | YES |  |  |
| 22 | `readvertisingRequired` | bit | NO | `((0))` |  |
| 23 | `revisedSubmissionDueDate` | datetime2 | YES |  |  |
| 24 | `status` | nvarchar(1000) | NO | `('draft')` |  |
| 25 | `tenantId` | nvarchar(1000) | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `SolicitationAddendum_solicitationId_fkey` | `solicitationId` | [`dbo.Solicitation.id`](dbo.Solicitation.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.AddendumAcknowledgment`](dbo.AddendumAcknowledgment.md) | `addendumId` | `id` | CASCADE | CASCADE |
| [`dbo.AddendumClassificationAudit`](dbo.AddendumClassificationAudit.md) | `addendumId` | `id` | CASCADE | CASCADE |
| [`dbo.AddendumDistributionLog`](dbo.AddendumDistributionLog.md) | `addendumId` | `id` | CASCADE | CASCADE |
| [`dbo.AddendumModification`](dbo.AddendumModification.md) | `addendumId` | `id` | CASCADE | CASCADE |
| [`dbo.AddendumQAEntry`](dbo.AddendumQAEntry.md) | `addendumId` | `id` | CASCADE | CASCADE |
| [`dbo.SolicitationAdvertisementAddendum`](dbo.SolicitationAdvertisementAddendum.md) | `addendumId` | `id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SolicitationAddendum_solicitationId_addendumNumber_key` | YES | NONCLUSTERED | `solicitationId`, `addendumNumber` |  |
| `SolicitationAddendum_solicitationId_idx` | no | NONCLUSTERED | `solicitationId` |  |
| `SolicitationAddendum_status_idx` | no | NONCLUSTERED | `status` |  |
| `SolicitationAddendum_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
