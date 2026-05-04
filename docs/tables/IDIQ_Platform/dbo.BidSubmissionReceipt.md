# Table: `dbo.BidSubmissionReceipt`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 5

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `bidId` | nvarchar(1000) | NO |  |  |
| 3 | `receiptNumber` | nvarchar(1000) | NO |  |  |
| 4 | `submittedAt` | datetime2 | NO |  |  |
| 5 | `contentHash` | nvarchar(1000) | NO |  |  |
| 6 | `hashAlgorithm` | nvarchar(1000) | NO | `('SHA-256')` |  |
| 7 | `ipAddress` | nvarchar(1000) | YES |  |  |
| 8 | `createdAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `BidSubmissionReceipt_bidId_fkey` | `bidId` | [`dbo.Bid.id`](dbo.Bid.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `BidSubmissionReceipt_bidId_key` | YES | NONCLUSTERED | `bidId` |  |
| `BidSubmissionReceipt_receiptNumber_key` | YES | NONCLUSTERED | `receiptNumber` |  |
