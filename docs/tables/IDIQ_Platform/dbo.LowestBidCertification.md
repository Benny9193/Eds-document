# Table: `dbo.LowestBidCertification`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `solicitationId` | nvarchar(1000) | NO |  |  |
| 3 | `bidId` | nvarchar(1000) | NO |  |  |
| 4 | `tenantId` | nvarchar(1000) | NO |  |  |
| 5 | `lowestBidAmount` | decimal(18,2) | NO |  |  |
| 6 | `nextLowestBidAmount` | decimal(18,2) | NO |  |  |
| 7 | `differencePercentage` | decimal(5,2) | NO |  |  |
| 8 | `certificationRequired` | bit | NO |  |  |
| 9 | `certificationReceived` | bit | NO | `((0))` |  |
| 10 | `certificationDate` | datetime2 | YES |  |  |
| 11 | `certificationDocumentKey` | nvarchar(1000) | YES |  |  |
| 12 | `certifierName` | nvarchar(1000) | YES |  |  |
| 13 | `certifierTitle` | nvarchar(1000) | YES |  |  |
| 14 | `certificationStatement` | nvarchar(max) | YES |  |  |
| 15 | `status` | nvarchar(1000) | NO | `('PENDING')` |  |
| 16 | `statusReason` | nvarchar(max) | YES |  |  |
| 17 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 18 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `LowestBidCertification_bidId_fkey` | `bidId` | [`dbo.Bid.id`](dbo.Bid.md) | NO_ACTION | NO_ACTION |
| `LowestBidCertification_solicitationId_fkey` | `solicitationId` | [`dbo.Solicitation.id`](dbo.Solicitation.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `LowestBidCertification_certificationRequired_idx` | no | NONCLUSTERED | `certificationRequired` |  |
| `LowestBidCertification_solicitationId_bidId_key` | YES | NONCLUSTERED | `solicitationId`, `bidId` |  |
| `LowestBidCertification_solicitationId_idx` | no | NONCLUSTERED | `solicitationId` |  |
| `LowestBidCertification_status_idx` | no | NONCLUSTERED | `status` |  |
| `LowestBidCertification_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
