# Table: `dbo.Bid`

**Database:** `IDIQ_Platform` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 144

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `id` | nvarchar(1000) | NO |  | YES |
| 2 | `solicitationId` | nvarchar(1000) | NO |  |  |
| 3 | `vendorId` | nvarchar(1000) | NO |  |  |
| 4 | `status` | nvarchar(1000) | NO | `('DRAFT')` |  |
| 5 | `totalAmount` | decimal(18,2) | YES |  |  |
| 6 | `formData` | nvarchar(max) | YES |  |  |
| 7 | `signedBy` | nvarchar(1000) | YES |  |  |
| 8 | `signedAt` | datetime2 | YES |  |  |
| 9 | `signatureData` | nvarchar(max) | YES |  |  |
| 10 | `submittedAt` | datetime2 | YES |  |  |
| 11 | `amendedAt` | datetime2 | YES |  |  |
| 12 | `isSealed` | bit | NO | `((0))` |  |
| 13 | `sealedAt` | datetime2 | YES |  |  |
| 14 | `submissionHash` | nvarchar(1000) | YES |  |  |
| 15 | `receiptNumber` | nvarchar(1000) | YES |  |  |
| 16 | `sealedLineItems` | nvarchar(max) | YES |  |  |
| 17 | `encryptedDek` | nvarchar(max) | YES |  |  |
| 18 | `withdrawnAt` | datetime2 | YES |  |  |
| 19 | `withdrawnBy` | nvarchar(1000) | YES |  |  |
| 20 | `awardWithdrawnAt` | datetime2 | YES |  |  |
| 21 | `awardWithdrawnBy` | nvarchar(1000) | YES |  |  |
| 22 | `awardWithdrawalReason` | nvarchar(max) | YES |  |  |
| 23 | `isProxyEntry` | bit | NO | `((0))` |  |
| 24 | `proxyEnteredByUserId` | nvarchar(1000) | YES |  |  |
| 25 | `proxyEnteredAt` | datetime2 | YES |  |  |
| 26 | `proxyNotes` | nvarchar(max) | YES |  |  |
| 27 | `createdAt` | datetime2 | NO | `(getdate())` |  |
| 28 | `updatedAt` | datetime2 | NO |  |  |
| 29 | `awardedContractId` | nvarchar(1000) | YES |  |  |
| 30 | `encryptedTotalAmount` | nvarchar(max) | YES |  |  |
| 31 | `sealedCountyLineItems` | nvarchar(max) | YES |  |  |
| 32 | `sealedEvaluationResponses` | nvarchar(max) | YES |  |  |
| 33 | `sealedResponsePdfKey` | nvarchar(1000) | YES |  |  |
| 34 | `evaluationScore` | float | YES |  |  |
| 35 | `pricingConfirmedAt` | datetime2 | YES |  |  |
| 36 | `pricingConfirmedById` | nvarchar(1000) | YES |  |  |
| 37 | `evaluatorRejectionReason` | nvarchar(max) | YES |  |  |
| 38 | `evaluatorVerdict` | nvarchar(1000) | YES |  |  |
| 39 | `evaluatorVerdictAt` | datetime2 | YES |  |  |
| 40 | `evaluatorVerdictById` | nvarchar(1000) | YES |  |  |
| 41 | `passFailConfirmedAt` | datetime2 | YES |  |  |
| 42 | `passFailConfirmedById` | nvarchar(1000) | YES |  |  |
| 43 | `pricingRejectedAt` | datetime2 | YES |  |  |
| 44 | `pricingRejectedById` | nvarchar(1000) | YES |  |  |
| 45 | `pricingRejectionReason` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `Bid_awardedContractId_fkey` | `awardedContractId` | [`dbo.Contract.id`](dbo.Contract.md) | NO_ACTION | NO_ACTION |
| `Bid_evaluatorVerdictById_fkey` | `evaluatorVerdictById` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `Bid_passFailConfirmedById_fkey` | `passFailConfirmedById` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `Bid_pricingConfirmedById_fkey` | `pricingConfirmedById` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `Bid_pricingRejectedById_fkey` | `pricingRejectedById` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `Bid_proxyEnteredByUserId_fkey` | `proxyEnteredByUserId` | [`dbo.User.id`](dbo.User.md) | NO_ACTION | NO_ACTION |
| `Bid_solicitationId_fkey` | `solicitationId` | [`dbo.Solicitation.id`](dbo.Solicitation.md) | NO_ACTION | NO_ACTION |
| `Bid_vendorId_fkey` | `vendorId` | [`dbo.Vendor.id`](dbo.Vendor.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.BidAuditLog`](dbo.BidAuditLog.md) | `bidId` | `id` | CASCADE | CASCADE |
| [`dbo.BidCounty`](dbo.BidCounty.md) | `bidId` | `id` | CASCADE | CASCADE |
| [`dbo.BidCountyAward`](dbo.BidCountyAward.md) | `bidId` | `id` | CASCADE | CASCADE |
| [`dbo.BidCountyLineItem`](dbo.BidCountyLineItem.md) | `bidId` | `id` | CASCADE | CASCADE |
| [`dbo.BidDocument`](dbo.BidDocument.md) | `bidId` | `id` | CASCADE | CASCADE |
| [`dbo.BidLineItem`](dbo.BidLineItem.md) | `bidId` | `id` | CASCADE | CASCADE |
| [`dbo.BidScore`](dbo.BidScore.md) | `bidId` | `id` | CASCADE | CASCADE |
| [`dbo.BidSubmissionReceipt`](dbo.BidSubmissionReceipt.md) | `bidId` | `id` | CASCADE | CASCADE |
| [`dbo.LowestBidCertification`](dbo.LowestBidCertification.md) | `bidId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.MiniBidResponse`](dbo.MiniBidResponse.md) | `bidId` | `id` | NO_ACTION | NO_ACTION |
| [`dbo.ProposalAutoScore`](dbo.ProposalAutoScore.md) | `proposalId` | `id` | CASCADE | CASCADE |
| [`dbo.ProposalDocumentAcknowledgment`](dbo.ProposalDocumentAcknowledgment.md) | `bidId` | `id` | CASCADE | CASCADE |
| [`dbo.RecommendedVendor`](dbo.RecommendedVendor.md) | `bidId` | `id` | SET_NULL | NO_ACTION |
| [`dbo.VendorCriterionResponse`](dbo.VendorCriterionResponse.md) | `bidId` | `id` | CASCADE | CASCADE |
| [`dbo.VendorPricingIndex`](dbo.VendorPricingIndex.md) | `bidId` | `id` | CASCADE | CASCADE |
| [`dbo.VendorScenarioPrice`](dbo.VendorScenarioPrice.md) | `bidId` | `id` | CASCADE | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `Bid_proxyEnteredByUserId_idx` | no | NONCLUSTERED | `proxyEnteredByUserId` |  |
| `Bid_solicitationId_idx` | no | NONCLUSTERED | `solicitationId` |  |
| `Bid_solicitationId_vendorId_key` | YES | NONCLUSTERED | `solicitationId`, `vendorId` |  |
| `Bid_status_idx` | no | NONCLUSTERED | `status` |  |
| `Bid_vendorId_idx` | no | NONCLUSTERED | `vendorId` |  |
