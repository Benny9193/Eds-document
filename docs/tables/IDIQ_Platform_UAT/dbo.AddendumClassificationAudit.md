# Table: `dbo.AddendumClassificationAudit`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `addendumId` | nvarchar(1000) | NO |  |  |
| 3 | `suggestedClassification` | nvarchar(1000) | NO |  |  |
| 4 | `suggestedTriggers` | nvarchar(max) | NO |  |  |
| 5 | `userClassification` | nvarchar(1000) | NO |  |  |
| 6 | `userJustification` | nvarchar(max) | YES |  |  |
| 7 | `agreedWithSuggestion` | bit | NO |  |  |
| 8 | `decidedByUserId` | nvarchar(1000) | NO |  |  |
| 9 | `decidedAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `AddendumClassificationAudit_addendumId_fkey` | `addendumId` | [`dbo.SolicitationAddendum.id`](dbo.SolicitationAddendum.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `AddendumClassificationAudit_addendumId_idx` | no | NONCLUSTERED | `addendumId` |  |
| `AddendumClassificationAudit_addendumId_key` | YES | NONCLUSTERED | `addendumId` |  |
