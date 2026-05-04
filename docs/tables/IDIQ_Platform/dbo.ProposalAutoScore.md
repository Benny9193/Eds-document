# Table: `dbo.ProposalAutoScore`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `proposalId` | nvarchar(1000) | NO |  |  |
| 3 | `solicitationId` | nvarchar(1000) | NO |  |  |
| 4 | `countyId` | nvarchar(1000) | YES |  |  |
| 5 | `priceScore` | decimal(9,4) | YES |  |  |
| 6 | `qualificationsScore` | decimal(9,4) | YES |  |  |
| 7 | `referencesScore` | decimal(9,4) | YES |  |  |
| 8 | `compositeScore` | decimal(9,4) | NO |  |  |
| 9 | `rank` | int | NO |  |  |
| 10 | `awardType` | nvarchar(1000) | YES |  |  |
| 11 | `tieBreakApplied` | nvarchar(1000) | YES |  |  |
| 12 | `isPreliminary` | bit | NO | `((1))` |  |
| 13 | `computedAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `ProposalAutoScore_proposalId_fkey` | `proposalId` | [`dbo.Bid.id`](dbo.Bid.md) | CASCADE | CASCADE |
| `ProposalAutoScore_solicitationId_fkey` | `solicitationId` | [`dbo.Solicitation.id`](dbo.Solicitation.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `ProposalAutoScore_countyId_idx` | no | NONCLUSTERED | `countyId` |  |
| `ProposalAutoScore_proposalId_idx` | no | NONCLUSTERED | `proposalId` |  |
| `ProposalAutoScore_solicitationId_idx` | no | NONCLUSTERED | `solicitationId` |  |
