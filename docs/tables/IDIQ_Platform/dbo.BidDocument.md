# Table: `dbo.BidDocument`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 270

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `bidId` | nvarchar(1000) | NO |  |  |
| 3 | `requiredDocumentId` | nvarchar(1000) | YES |  |  |
| 4 | `filename` | nvarchar(1000) | NO |  |  |
| 5 | `fileType` | nvarchar(1000) | NO |  |  |
| 6 | `fileSize` | int | NO |  |  |
| 7 | `storageKey` | nvarchar(1000) | NO |  |  |
| 8 | `uploadedAt` | datetime2 | NO | `(getdate())` |  |
| 9 | `reviewDecision` | nvarchar(1000) | YES |  |  |
| 10 | `reviewDecisionAt` | datetime2 | YES |  |  |
| 11 | `reviewDecisionById` | nvarchar(1000) | YES |  |  |
| 12 | `reviewRejectionReason` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `BidDocument_bidId_fkey` | `bidId` | [`dbo.Bid.id`](dbo.Bid.md) | CASCADE | CASCADE |
| `BidDocument_requiredDocumentId_fkey` | `requiredDocumentId` | [`dbo.SolicitationRequiredDocument.id`](dbo.SolicitationRequiredDocument.md) | SET_NULL | NO_ACTION |
| `BidDocument_reviewDecisionById_fkey` | `reviewDecisionById` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `BidDocument_bidId_idx` | no | NONCLUSTERED | `bidId` |  |
| `BidDocument_requiredDocumentId_idx` | no | NONCLUSTERED | `requiredDocumentId` |  |
| `BidDocument_reviewDecision_idx` | no | NONCLUSTERED | `reviewDecision` |  |
