# Table: `dbo.CompetitiveBiddingCompliance`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `solicitationId` | nvarchar(1000) | NO |  |  |
| 3 | `tenantId` | nvarchar(1000) | NO |  |  |
| 4 | `publicNoticeDate` | datetime2 | YES |  |  |
| 5 | `publicNoticeDocument` | nvarchar(1000) | YES |  |  |
| 6 | `publicationVenues` | nvarchar(1000) | YES |  |  |
| 7 | `minimumNoticeDays` | int | NO | `((20))` |  |
| 8 | `bidOpeningDate` | datetime2 | YES |  |  |
| 9 | `bidOpeningPublic` | bit | NO | `((1))` |  |
| 10 | `bidOpeningLocation` | nvarchar(1000) | YES |  |  |
| 11 | `bidOpeningWitnesses` | nvarchar(1000) | YES |  |  |
| 12 | `vendorsNotified` | int | NO | `((0))` |  |
| 13 | `bidsReceived` | int | NO | `((0))` |  |
| 14 | `responsiveVendors` | int | NO | `((0))` |  |
| 15 | `minimumBidsRequired` | int | NO | `((3))` |  |
| 16 | `isCompliant` | bit | NO | `((1))` |  |
| 17 | `complianceIssues` | nvarchar(max) | YES |  |  |
| 18 | `hasWaiver` | bit | NO | `((0))` |  |
| 19 | `waiverType` | nvarchar(1000) | YES |  |  |
| 20 | `waiverJustification` | nvarchar(max) | YES |  |  |
| 21 | `waiverApprovedById` | nvarchar(1000) | YES |  |  |
| 22 | `waiverApprovedDate` | datetime2 | YES |  |  |
| 23 | `verifiedAt` | datetime2 | YES |  |  |
| 24 | `verifiedById` | nvarchar(1000) | YES |  |  |
| 25 | `verificationNotes` | nvarchar(max) | YES |  |  |
| 26 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 27 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `CompetitiveBiddingCompliance_solicitationId_fkey` | `solicitationId` | [`dbo.Solicitation.id`](dbo.Solicitation.md) | CASCADE | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `CompetitiveBiddingCompliance_hasWaiver_idx` | no | NONCLUSTERED | `hasWaiver` |  |
| `CompetitiveBiddingCompliance_isCompliant_idx` | no | NONCLUSTERED | `isCompliant` |  |
| `CompetitiveBiddingCompliance_solicitationId_idx` | no | NONCLUSTERED | `solicitationId` |  |
| `CompetitiveBiddingCompliance_solicitationId_key` | YES | NONCLUSTERED | `solicitationId` |  |
| `CompetitiveBiddingCompliance_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
