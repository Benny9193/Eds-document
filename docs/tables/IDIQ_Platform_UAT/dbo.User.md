# Table: `dbo.User`

**Database:** `IDIQ_Platform_UAT` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 12

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `email` | nvarchar(1000) | NO |  |  |
| 3 | `name` | nvarchar(1000) | YES |  |  |
| 4 | `tenantId` | nvarchar(1000) | NO |  |  |
| 5 | `roles` | nvarchar(1000) | NO | `('')` |  |
| 6 | `emailPreferences` | nvarchar(max) | YES |  |  |
| 7 | `emailVerified` | datetime2 | YES |  |  |
| 8 | `ssoProvider` | nvarchar(1000) | YES |  |  |
| 9 | `passwordHash` | nvarchar(1000) | YES |  |  |
| 10 | `mfaEnabled` | bit | NO | `((0))` |  |
| 11 | `mfaSecret` | nvarchar(1000) | YES |  |  |
| 12 | `mfaBackupCodes` | nvarchar(max) | YES |  |  |
| 13 | `mfaVerifiedAt` | datetime2 | YES |  |  |
| 14 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 15 | `updatedAt` | datetime2 | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `User_tenantId_fkey` | `tenantId` | [`dbo.Tenant.id`](dbo.Tenant.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.AwardRecommendation`](dbo.AwardRecommendation.md) | `createdByUserId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.AwardRecommendation`](dbo.AwardRecommendation.md) | `decidedByUserId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.Bid`](dbo.Bid.md) | `evaluatorVerdictById` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.Bid`](dbo.Bid.md) | `passFailConfirmedById` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.Bid`](dbo.Bid.md) | `pricingConfirmedById` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.Bid`](dbo.Bid.md) | `pricingRejectedById` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.Bid`](dbo.Bid.md) | `proxyEnteredByUserId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.BidCounty`](dbo.BidCounty.md) | `pricingConfirmedById` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.BidCounty`](dbo.BidCounty.md) | `pricingRejectedById` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.BidDocument`](dbo.BidDocument.md) | `reviewDecisionById` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.ContractorPayrollViolation`](dbo.ContractorPayrollViolation.md) | `createdById` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.ContractorPayrollViolation`](dbo.ContractorPayrollViolation.md) | `resolvedById` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.ContractTermination`](dbo.ContractTermination.md) | `terminatedById` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.EmailLog`](dbo.EmailLog.md) | `userId` | `id` | SET_NULL | NO_ACTION |
| [`dbo.EmailVerificationToken`](dbo.EmailVerificationToken.md) | `userId` | `id` | CASCADE | CASCADE |
| [`dbo.FormTemplate`](dbo.FormTemplate.md) | `createdById` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.JobReference`](dbo.JobReference.md) | `userId` | `id` | SET_NULL | NO_ACTION |
| [`dbo.MiniBid`](dbo.MiniBid.md) | `createdById` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.Notification`](dbo.Notification.md) | `userId` | `id` | CASCADE | CASCADE |
| [`dbo.Solicitation`](dbo.Solicitation.md) | `createdById` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.Solicitation`](dbo.Solicitation.md) | `withdrawnById` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.SolicitationAdvertisement`](dbo.SolicitationAdvertisement.md) | `publishedById` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.SolicitationAdvertisement`](dbo.SolicitationAdvertisement.md) | `uploadedById` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.Subcontractor`](dbo.Subcontractor.md) | `terminatedById` | `id` | SET_NULL | CASCADE |
| [`dbo.TaskOrder`](dbo.TaskOrder.md) | `approvedById` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.TaskOrder`](dbo.TaskOrder.md) | `createdById` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.TaskOrder`](dbo.TaskOrder.md) | `pricingConfirmedById` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.TaskOrder`](dbo.TaskOrder.md) | `professionalDocReviewedById` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.UserInvitation`](dbo.UserInvitation.md) | `invitedById` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.WageRateDetermination`](dbo.WageRateDetermination.md) | `confirmedById` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.WageRateDetermination`](dbo.WageRateDetermination.md) | `requestedById` | `id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `User_email_idx` | no | NONCLUSTERED | `email` |  |
| `User_email_key` | YES | NONCLUSTERED | `email` |  |
| `User_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
