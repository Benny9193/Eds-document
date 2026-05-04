# Table: `dbo.AddendumAcknowledgment`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `proposalId` | nvarchar(1000) | NO |  |  |
| 3 | `addendumId` | nvarchar(1000) | NO |  |  |
| 4 | `acknowledgedAt` | datetime2 | NO | `(getdate())` |  |
| 5 | `acknowledgedByUserId` | nvarchar(1000) | NO |  |  |
| 6 | `acknowledgmentIpAddress` | nvarchar(1000) | YES |  |  |
| 7 | `createdAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `AddendumAcknowledgment_addendumId_fkey` | `addendumId` | [`dbo.SolicitationAddendum.id`](dbo.SolicitationAddendum.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `AddendumAcknowledgment_addendumId_idx` | no | NONCLUSTERED | `addendumId` |  |
| `AddendumAcknowledgment_proposalId_addendumId_key` | YES | NONCLUSTERED | `proposalId`, `addendumId` |  |
| `AddendumAcknowledgment_proposalId_idx` | no | NONCLUSTERED | `proposalId` |  |
