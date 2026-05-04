# Table: `dbo.ProposalDocumentAcknowledgment`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 153

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `bidId` | nvarchar(1000) | NO |  |  |
| 3 | `documentType` | nvarchar(1000) | NO |  |  |
| 4 | `acknowledgedAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `ProposalDocumentAcknowledgment_bidId_fkey` | `bidId` | [`dbo.Bid.id`](dbo.Bid.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `ProposalDocumentAcknowledgment_bidId_documentType_key` | YES | NONCLUSTERED | `bidId`, `documentType` |  |
| `ProposalDocumentAcknowledgment_bidId_idx` | no | NONCLUSTERED | `bidId` |  |
