# Table: `dbo.BidScore`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `bidId` | nvarchar(1000) | NO |  |  |
| 3 | `category` | nvarchar(1000) | NO |  |  |
| 4 | `score` | float | NO |  |  |
| 5 | `maxScore` | float | NO |  |  |
| 6 | `comments` | nvarchar(max) | YES |  |  |
| 7 | `scoredBy` | nvarchar(1000) | NO |  |  |
| 8 | `qualificationsScore` | decimal(5,2) | YES |  |  |
| 9 | `referencesScore` | decimal(5,2) | YES |  |  |
| 10 | `compositeScore` | decimal(5,2) | YES |  |  |
| 11 | `createdAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `BidScore_bidId_fkey` | `bidId` | [`dbo.Bid.id`](dbo.Bid.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `BidScore_bidId_idx` | no | NONCLUSTERED | `bidId` |  |
