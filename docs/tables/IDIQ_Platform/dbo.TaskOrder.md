# Table: `dbo.TaskOrder`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `tenantId` | nvarchar(1000) | NO |  |  |
| 3 | `contractId` | nvarchar(1000) | NO |  |  |
| 4 | `vendorId` | nvarchar(1000) | NO |  |  |
| 5 | `awardedBidId` | nvarchar(1000) | YES |  |  |
| 6 | `countyId` | nvarchar(1000) | YES |  |  |
| 7 | `miniBidId` | nvarchar(1000) | YES |  |  |
| 8 | `orderNumber` | nvarchar(1000) | NO |  |  |
| 9 | `status` | nvarchar(1000) | NO | `('DRAFT')` |  |
| 10 | `description` | nvarchar(max) | NO |  |  |
| 11 | `totalValue` | decimal(18,2) | NO |  |  |
| 12 | `prevailingWageApplies` | bit | NO | `((0))` |  |
| 13 | `pricingStatus` | nvarchar(1000) | YES |  |  |
| 14 | `vendorPricingRequestedAt` | datetime2 | YES |  |  |
| 15 | `vendorPricingSubmittedAt` | datetime2 | YES |  |  |
| 16 | `pricingConfirmedAt` | datetime2 | YES |  |  |
| 17 | `pricingConfirmedById` | nvarchar(1000) | YES |  |  |
| 18 | `justification` | nvarchar(max) | YES |  |  |
| 19 | `aiVerificationId` | nvarchar(1000) | YES |  |  |
| 20 | `aiVerificationStatus` | nvarchar(1000) | YES |  |  |
| 21 | `projectScopeStatement` | nvarchar(max) | YES |  |  |
| 22 | `scopeClassification` | nvarchar(1000) | YES |  |  |
| 23 | `scopeVerificationStatus` | nvarchar(1000) | YES |  |  |
| 24 | `scopeVerificationNotes` | nvarchar(max) | YES |  |  |
| 25 | `createdById` | nvarchar(1000) | NO |  |  |
| 26 | `approvedById` | nvarchar(1000) | YES |  |  |
| 27 | `approvedAt` | datetime2 | YES |  |  |
| 28 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 29 | `updatedAt` | datetime2 | NO |  |  |
| 30 | `fundCertificationDate` | datetime2 | YES |  |  |
| 31 | `fundCertifiedByName` | nvarchar(1000) | YES |  |  |
| 32 | `fundCertifiedByTitle` | nvarchar(1000) | YES |  |  |
| 33 | `closeoutStatus` | nvarchar(1000) | YES |  |  |
| 34 | `closeoutAllPayrollsVerified` | bit | NO | `((0))` |  |
| 35 | `closeoutSubPayrollsVerified` | bit | NO | `((0))` |  |
| 36 | `closeoutInspectionComplete` | bit | NO | `((0))` |  |
| 37 | `closeoutDocumentsReceived` | bit | NO | `((0))` |  |
| 38 | `closeoutCertifiedByName` | nvarchar(1000) | YES |  |  |
| 39 | `closeoutCertifiedByTitle` | nvarchar(1000) | YES |  |  |
| 40 | `closeoutCertifiedAt` | datetime2 | YES |  |  |
| 41 | `miniCompExceptionCategory` | nvarchar(1000) | YES |  |  |
| 42 | `miniCompExceptionJustification` | nvarchar(max) | YES |  |  |
| 43 | `priceChallengeInvoked` | bit | NO | `((0))` |  |
| 44 | `priceChallengeCriterion` | nvarchar(1000) | YES |  |  |
| 45 | `priceChallengeDate` | datetime2 | YES |  |  |
| 46 | `priceChallengeIceDocumentKey` | nvarchar(1000) | YES |  |  |
| 47 | `priceChallengeIceDateCreated` | datetime2 | YES |  |  |
| 48 | `priceChallengeNoticeSentAt` | datetime2 | YES |  |  |
| 49 | `priceChallengeRevisionDeadline` | datetime2 | YES |  |  |
| 50 | `primaryRevisedPrice` | decimal(18,2) | YES |  |  |
| 51 | `primaryRevisedBoeDocumentKey` | nvarchar(1000) | YES |  |  |
| 52 | `secondaryTorIssuedAt` | datetime2 | YES |  |  |
| 53 | `secondaryProposalPrice` | decimal(18,2) | YES |  |  |
| 54 | `secondaryBoeDocumentKey` | nvarchar(1000) | YES |  |  |
| 55 | `priceChallengeAwardAction` | nvarchar(1000) | YES |  |  |
| 56 | `priceChallengeJustification` | nvarchar(max) | YES |  |  |
| 57 | `hasProfessionalDocumentation` | bit | NO | `((0))` |  |
| 58 | `maintenanceTradeDetermination` | nvarchar(max) | YES |  |  |
| 59 | `maintenanceTradeDocumentKey` | nvarchar(1000) | YES |  |  |
| 60 | `professionalDocReference` | nvarchar(1000) | YES |  |  |
| 61 | `aeTriggerCode` | nvarchar(1000) | YES |  |  |
| 62 | `aeTriggerCodeOther` | nvarchar(1000) | YES |  |  |
| 63 | `professionalDocFlaggedForReview` | bit | NO | `((0))` |  |
| 64 | `professionalDocReviewedById` | nvarchar(1000) | YES |  |  |
| 65 | `professionalDocReviewedAt` | datetime2 | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `TaskOrder_approvedById_fkey` | `approvedById` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `TaskOrder_contractId_fkey` | `contractId` | [`dbo.Contract.id`](dbo.Contract.md) | NO_ACTION | NO_ACTION |
| `TaskOrder_countyId_fkey` | `countyId` | [`dbo.County.id`](dbo.County.md) | NO_ACTION | NO_ACTION |
| `TaskOrder_createdById_fkey` | `createdById` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `TaskOrder_miniBidId_fkey` | `miniBidId` | [`dbo.MiniBid.id`](dbo.MiniBid.md) | NO_ACTION | NO_ACTION |
| `TaskOrder_pricingConfirmedById_fkey` | `pricingConfirmedById` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `TaskOrder_professionalDocReviewedById_fkey` | `professionalDocReviewedById` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `TaskOrder_vendorId_fkey` | `vendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.CertifiedPayroll`](dbo.CertifiedPayroll.md) | `taskOrderId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.CertifiedPayrollSubmission`](dbo.CertifiedPayrollSubmission.md) | `taskOrderId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.ContractorPayrollViolation`](dbo.ContractorPayrollViolation.md) | `taskOrderId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.ContractTermination`](dbo.ContractTermination.md) | `taskOrderId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.FinalPaymentCertification`](dbo.FinalPaymentCertification.md) | `taskOrderId` | `id` | CASCADE | CASCADE |
| [`dbo.JobSitePosting`](dbo.JobSitePosting.md) | `taskOrderId` | `id` | CASCADE | CASCADE |
| [`dbo.OrderLineItem`](dbo.OrderLineItem.md) | `taskOrderId` | `id` | CASCADE | CASCADE |
| [`dbo.PayrollRecordWithholding`](dbo.PayrollRecordWithholding.md) | `taskOrderId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.StopWorkOrder`](dbo.StopWorkOrder.md) | `taskOrderId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.Subcontractor`](dbo.Subcontractor.md) | `taskOrderId` | `id` | NO_ACTION | CASCADE |
| [`dbo.TaskOrderAmendment`](dbo.TaskOrderAmendment.md) | `taskOrderId` | `id` | CASCADE | CASCADE |
| [`dbo.TaskOrderCostSavings`](dbo.TaskOrderCostSavings.md) | `taskOrderId` | `id` | CASCADE | NO_ACTION |
| [`dbo.WageRateDetermination`](dbo.WageRateDetermination.md) | `taskOrderId` | `id` | SET_NULL | NO_ACTION |
| [`dbo.WorkerWageProtest`](dbo.WorkerWageProtest.md) | `taskOrderId` | `id` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `TaskOrder_contractId_idx` | no | NONCLUSTERED | `contractId` |  |
| `TaskOrder_countyId_idx` | no | NONCLUSTERED | `countyId` |  |
| `TaskOrder_hasProfessionalDocumentation_idx` | no | NONCLUSTERED | `hasProfessionalDocumentation` |  |
| `TaskOrder_miniBidId_idx` | no | NONCLUSTERED | `miniBidId` |  |
| `TaskOrder_pricingStatus_idx` | no | NONCLUSTERED | `pricingStatus` |  |
| `TaskOrder_status_idx` | no | NONCLUSTERED | `status` |  |
| `TaskOrder_tenantId_idx` | no | NONCLUSTERED | `tenantId` |  |
| `TaskOrder_tenantId_orderNumber_key` | YES | NONCLUSTERED | `tenantId`, `orderNumber` |  |
| `TaskOrder_vendorId_idx` | no | NONCLUSTERED | `vendorId` |  |
