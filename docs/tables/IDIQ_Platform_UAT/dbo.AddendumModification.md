# Table: `dbo.AddendumModification`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `addendumId` | nvarchar(1000) | NO |  |  |
| 3 | `sequenceNumber` | int | NO |  |  |
| 4 | `documentAffected` | nvarchar(1000) | NO |  |  |
| 5 | `documentOtherDescription` | nvarchar(500) | YES |  |  |
| 6 | `sectionReference` | nvarchar(1000) | YES |  |  |
| 7 | `pageReference` | nvarchar(1000) | YES |  |  |
| 8 | `action` | nvarchar(1000) | NO |  |  |
| 9 | `originalText` | nvarchar(max) | YES |  |  |
| 10 | `revisedText` | nvarchar(max) | YES |  |  |
| 11 | `reasonForChange` | nvarchar(max) | NO |  |  |
| 12 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 13 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `AddendumModification_addendumId_fkey` | `addendumId` | [`dbo.SolicitationAddendum.id`](dbo.SolicitationAddendum.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.AddendumQAEntry`](dbo.AddendumQAEntry.md) | `relatedModificationId` | `id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `AddendumModification_addendumId_idx` | no | NONCLUSTERED | `addendumId` |  |
| `AddendumModification_addendumId_sequenceNumber_key` | YES | NONCLUSTERED | `addendumId`, `sequenceNumber` |  |
