# Table: `dbo.Solicitation`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 39

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `contractId` | nvarchar(1000) | YES |  |  |
| 4 | `solicitationNumber` | nvarchar(1000) | NO |  |  |
| 5 | `title` | nvarchar(1000) | NO |  |  |
| 6 | `description` | nvarchar(max) | YES |  |  |
| 7 | `scopeOfWork` | nvarchar(max) | YES |  |  |
| 8 | `generalConditions` | nvarchar(max) | YES |  |  |
| 9 | `specificConditions` | nvarchar(max) | YES |  |  |
| 10 | `bidSubmissionQuickReference` | nvarchar(max) | YES |  |  |
| 11 | `miniCompetitionProcedures` | nvarchar(max) | YES |  |  |
| 12 | `emergencyTaskOrderProcedures` | nvarchar(max) | YES |  |  |
| 13 | `s3041ComplianceAddendum` | nvarchar(max) | YES |  |  |
| 14 | `solicitationNotice` | nvarchar(max) | YES |  |  |
| 15 | `templateVariables` | nvarchar(max) | YES |  |  |
| 16 | `contractType` | nvarchar(1000) | YES |  |  |
| 17 | `procurementMethod` | nvarchar(1000) | NO | `('PROPOSAL')` |  |
| 18 | `state` | nvarchar(1000) | YES |  |  |
| 19 | `pricingType` | nvarchar(1000) | YES |  |  |
| 20 | `creatorTenantType` | nvarchar(1000) | YES |  |  |
| 21 | `createdByTenantId` | nvarchar(1000) | YES |  |  |
| 22 | `solicitationType` | nvarchar(1000) | NO | `('COOPERATIVE')` |  |
| 23 | `localApprovalRequired` | bit | NO | `((0))` |  |
| 24 | `status` | nvarchar(1000) | NO | `('DRAFT')` |  |
| 25 | `publishDate` | datetime2 | YES |  |  |
| 26 | `qaEndDate` | datetime2 | YES |  |  |
| 27 | `dueDate` | datetime2 | YES |  |  |
| 28 | `dueTime` | nvarchar(1000) | NO | `('14:00')` |  |
| 29 | `awardDate` | datetime2 | YES |  |  |
| 30 | `createdById` | nvarchar(1000) | NO |  |  |
| 31 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 32 | `updatedAt` | datetime2 | NO |  |  |
| 33 | `priceWeight` | int | NO | `((50))` |  |
| 34 | `qualificationsWeight` | int | NO | `((50))` |  |
| 35 | `referencesWeight` | int | NO | `((0))` |  |
| 36 | `eligibleCrafts` | nvarchar(max) | YES |  |  |
| 37 | `tieBreakerRules` | nvarchar(max) | YES |  |  |
| 38 | `procurementTypeSlug` | nvarchar(1000) | YES |  |  |
| 39 | `withdrawalReason` | nvarchar(max) | YES |  |  |
| 40 | `withdrawnAt` | datetime2 | YES |  |  |
| 41 | `withdrawnById` | nvarchar(1000) | YES |  |  |
| 42 | `dpmcClassificationCode` | nvarchar(1000) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `Solicitation_contractId_fkey` | `contractId` | [`dbo.Contract.id`](dbo.Contract.md) | NO_ACTION | NO_ACTION |
| `Solicitation_createdById_fkey` | `createdById` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `Solicitation_createdByTenantId_fkey` | `createdByTenantId` | [`dbo.Tenant.id`](dbo.Tenant.md) | NO_ACTION | NO_ACTION |
| `Solicitation_tenantId_fkey` | `tenantId` | [`dbo.Tenant.id`](dbo.Tenant.md) | NO_ACTION | NO_ACTION |
| `Solicitation_withdrawnById_fkey` | `withdrawnById` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.AwardRecommendation`](dbo.AwardRecommendation.md) | `solicitationId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.Bid`](dbo.Bid.md) | `solicitationId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.BidForm`](dbo.BidForm.md) | `solicitationId` | `id` | CASCADE | CASCADE |
| [`dbo.BidOpeningEvent`](dbo.BidOpeningEvent.md) | `solicitationId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.BidResultsReport`](dbo.BidResultsReport.md) | `solicitationId` | `id` | CASCADE | CASCADE |
| [`dbo.CompetitiveBiddingCompliance`](dbo.CompetitiveBiddingCompliance.md) | `solicitationId` | `id` | CASCADE | CASCADE |
| [`dbo.CooperativeSystemConfigSnapshot`](dbo.CooperativeSystemConfigSnapshot.md) | `solicitationId` | `id` | CASCADE | CASCADE |
| [`dbo.EvaluationFramework`](dbo.EvaluationFramework.md) | `solicitationId` | `id` | CASCADE | CASCADE |
| [`dbo.LowestBidCertification`](dbo.LowestBidCertification.md) | `solicitationId` | `id` | CASCADE | CASCADE |
| [`dbo.ManualCloseEvent`](dbo.ManualCloseEvent.md) | `solicitationId` | `id` | CASCADE | CASCADE |
| [`dbo.ProposalAutoScore`](dbo.ProposalAutoScore.md) | `solicitationId` | `id` | CASCADE | CASCADE |
| [`dbo.QAThread`](dbo.QAThread.md) | `solicitationId` | `id` | CASCADE | CASCADE |
| [`dbo.SolicitationAddendum`](dbo.SolicitationAddendum.md) | `solicitationId` | `id` | CASCADE | CASCADE |
| [`dbo.SolicitationAdvertisementSolicitation`](dbo.SolicitationAdvertisementSolicitation.md) | `solicitationId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.SolicitationCounty`](dbo.SolicitationCounty.md) | `solicitationId` | `id` | CASCADE | CASCADE |
| [`dbo.SolicitationLineItem`](dbo.SolicitationLineItem.md) | `solicitationId` | `id` | CASCADE | CASCADE |
| [`dbo.SolicitationRequiredDocument`](dbo.SolicitationRequiredDocument.md) | `solicitationId` | `id` | CASCADE | CASCADE |
| [`dbo.SolicitationSealKey`](dbo.SolicitationSealKey.md) | `solicitationId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.TieBreakEvent`](dbo.TieBreakEvent.md) | `solicitationId` | `id` | CASCADE | CASCADE |
| [`dbo.UnsuccessfulBidderClaim`](dbo.UnsuccessfulBidderClaim.md) | `solicitationId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.WageRateDetermination`](dbo.WageRateDetermination.md) | `solicitationId` | `id` | SET_NULL | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `Solicitation_createdByTenantId_idx` | no | NONCLUSTERED | `createdByTenantId` |  |
| `Solicitation_procurementMethod_idx` | no | NONCLUSTERED | `procurementMethod` |  |
| `Solicitation_solicitationType_idx` | no | NONCLUSTERED | `solicitationType` |  |
| `Solicitation_state_idx` | no | NONCLUSTERED | `state` |  |
| `Solicitation_status_idx` | no | NONCLUSTERED | `status` |  |
| `Solicitation_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
| `Solicitation_tenantId_solicitationNumber_key` | YES | NONCLUSTERED | `tenantId`, `solicitationNumber` |  |
