# Table: `dbo.AddendumQAEntry`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `addendumId` | nvarchar(1000) | NO |  |  |
| 3 | `solicitationId` | nvarchar(1000) | NO |  |  |
| 4 | `qaNumber` | int | NO |  |  |
| 5 | `questionReceivedDate` | datetime2 | NO |  |  |
| 6 | `questionText` | nvarchar(max) | NO |  |  |
| 7 | `responseText` | nvarchar(max) | NO |  |  |
| 8 | `affectsSolicitationText` | bit | NO | `((0))` |  |
| 9 | `relatedModificationId` | nvarchar(1000) | YES |  |  |
| 10 | `responseAuthoredBy` | nvarchar(1000) | NO |  |  |
| 11 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 12 | `updatedAt` | datetime2 | NO |  |  |
| 13 | `sourceQaThreadId` | nvarchar(1000) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `AddendumQAEntry_addendumId_fkey` | `addendumId` | [`dbo.SolicitationAddendum.id`](dbo.SolicitationAddendum.md) | CASCADE | CASCADE |
| `AddendumQAEntry_relatedModificationId_fkey` | `relatedModificationId` | [`dbo.AddendumModification.id`](dbo.AddendumModification.md) | NO_ACTION | NO_ACTION |
| `AddendumQAEntry_sourceQaThreadId_fkey` | `sourceQaThreadId` | [`dbo.QAThread.id`](dbo.QAThread.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `AddendumQAEntry_addendumId_idx` | no | NONCLUSTERED | `addendumId` |  |
| `AddendumQAEntry_solicitationId_idx` | no | NONCLUSTERED | `solicitationId` |  |
| `AddendumQAEntry_solicitationId_qaNumber_key` | YES | NONCLUSTERED | `solicitationId`, `qaNumber` |  |
| `AddendumQAEntry_sourceQaThreadId_idx` | no | NONCLUSTERED | `sourceQaThreadId` |  |
