# Table: `dbo.BidCountyAward`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `bidId` | nvarchar(1000) | NO |  |  |
| 3 | `countyId` | nvarchar(1000) | NO |  |  |
| 4 | `awardedAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `BidCountyAward_bidId_fkey` | `bidId` | [`dbo.Bid.id`](dbo.Bid.md) | CASCADE | CASCADE |
| `BidCountyAward_countyId_fkey` | `countyId` | [`dbo.County.id`](dbo.County.md) | NO_ACTION | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `BidCountyAward_bidId_countyId_key` | YES | NONCLUSTERED | `bidId`, `countyId` |  |
| `BidCountyAward_bidId_idx` | no | NONCLUSTERED | `bidId` |  |
| `BidCountyAward_countyId_idx` | no | NONCLUSTERED | `countyId` |  |
