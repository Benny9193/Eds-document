# Business rules: `IDIQ_Platform`

_Generated on 2026-05-04T15:27:10.930Z_

**Database:** `IDIQ_Platform`

[← back to business-rules index](../README.md)

Auto-extracted enforcement layer: triggers, check constraints, computed columns, non-trivial defaults, filtered indexes, alternate-key uniqueness, and indexed/schema-bound views. Hand-curated narrative lives in [`docs/business-logic/`](../../business-logic/).

## Summary

| Category | Count |
|----------|-------|
| Triggers | 0 |
| Check constraints | 0 |
| Computed columns | 0 |
| Default constraints | 306 (0 non-trivial) |
| Filtered indexes | 0 |
| Unique constraints (non-PK) | 64 |
| Indexed views | 0 |
| Schema-bound views (non-indexed) | 0 |

## Triggers

_None._

## Check constraints

_None._

## Computed columns

_None._

## Default constraints

**306** total. **0** non-trivial (UDF / NEWID / etc.) shown below; 306 literal/timestamp defaults omitted.

_All defaults are simple literals or timestamps._

## Filtered indexes

_None._

## Unique constraints (non-PK)

**64** alternate-key uniqueness rule(s).

| Table | Index | Source | Key columns |
|-------|-------|--------|-------------|
| `dbo.AddendumAcknowledgment` | `AddendumAcknowledgment_proposalId_addendumId_key` | UNIQUE constraint | [proposalId], [addendumId] |
| `dbo.AddendumClassificationAudit` | `AddendumClassificationAudit_addendumId_key` | UNIQUE constraint | [addendumId] |
| `dbo.AddendumModification` | `AddendumModification_addendumId_sequenceNumber_key` | UNIQUE constraint | [addendumId], [sequenceNumber] |
| `dbo.AddendumQAEntry` | `AddendumQAEntry_solicitationId_qaNumber_key` | UNIQUE constraint | [solicitationId], [qaNumber] |
| `dbo.AIVerificationFeedback` | `AIVerificationFeedback_verificationId_userId_key` | UNIQUE constraint | [verificationId], [userId] |
| `dbo.ApprenticeshipCompliance` | `ApprenticeshipCompliance_vendorId_craft_key` | UNIQUE constraint | [vendorId], [craft] |
| `dbo.Bid` | `Bid_solicitationId_vendorId_key` | UNIQUE constraint | [solicitationId], [vendorId] |
| `dbo.BidCounty` | `BidCounty_bidId_countyId_key` | UNIQUE constraint | [bidId], [countyId] |
| `dbo.BidCountyAward` | `BidCountyAward_bidId_countyId_key` | UNIQUE constraint | [bidId], [countyId] |
| `dbo.BidCountyLineItem` | `BidCountyLineItem_bidId_countyId_solicitationLineItemId_key` | UNIQUE constraint | [bidId], [countyId], [solicitationLineItemId] |
| `dbo.BidForm` | `BidForm_solicitationId_key` | UNIQUE constraint | [solicitationId] |
| `dbo.BidOpenerCredential` | `BidOpenerCredential_tenantId_key` | UNIQUE constraint | [tenantId] |
| `dbo.BidOpeningEvent` | `BidOpeningEvent_solicitationId_key` | UNIQUE constraint | [solicitationId] |
| `dbo.BidSubmissionReceipt` | `BidSubmissionReceipt_bidId_key` | UNIQUE constraint | [bidId] |
| `dbo.BidSubmissionReceipt` | `BidSubmissionReceipt_receiptNumber_key` | UNIQUE constraint | [receiptNumber] |
| `dbo.CertifiedPayrollSubmission` | `CertifiedPayrollSubmission_certifiedPayrollId_key` | UNIQUE constraint | [certifiedPayrollId] |
| `dbo.CompetitiveBiddingCompliance` | `CompetitiveBiddingCompliance_solicitationId_key` | UNIQUE constraint | [solicitationId] |
| `dbo.Contract` | `Contract_tenantId_contractNumber_key` | UNIQUE constraint | [tenantId], [contractNumber] |
| `dbo.CooperativeDebarment` | `CooperativeDebarment_cooperativeId_key` | UNIQUE constraint | [cooperativeId] |
| `dbo.CooperativeSystemConfig` | `CooperativeSystemConfig_configKey_key` | UNIQUE constraint | [configKey] |
| `dbo.CooperativeSystemConfigSnapshot` | `CooperativeSystemConfigSnapshot_solicitationId_key` | UNIQUE constraint | [solicitationId] |
| `dbo.County` | `County_state_code_key` | UNIQUE constraint | [state], [code] |
| `dbo.EmailVerificationToken` | `EmailVerificationToken_tokenHash_key` | UNIQUE constraint | [tokenHash] |
| `dbo.ESignatureConfig` | `ESignatureConfig_tenantId_key` | UNIQUE constraint | [tenantId] |
| `dbo.ESignatureEnvelope` | `ESignatureEnvelope_provider_externalId_key` | UNIQUE constraint | [provider], [externalId] |
| `dbo.EvaluationFramework` | `EvaluationFramework_solicitationId_key` | UNIQUE constraint | [solicitationId] |
| `dbo.FinalPaymentCertification` | `FinalPaymentCertification_taskOrderId_key` | UNIQUE constraint | [taskOrderId] |
| `dbo.FormTemplate` | `FormTemplate_formType_tenantId_version_key` | UNIQUE constraint | [formType], [tenantId], [version] |
| `dbo.JobSitePosting` | `JobSitePosting_taskOrderId_key` | UNIQUE constraint | [taskOrderId] |
| `dbo.LeadAgencyCompliance` | `LeadAgencyCompliance_leadAgencyId_key` | UNIQUE constraint | [leadAgencyId] |
| `dbo.LowestBidCertification` | `LowestBidCertification_solicitationId_bidId_key` | UNIQUE constraint | [solicitationId], [bidId] |
| `dbo.ManualCloseEvent` | `ManualCloseEvent_solicitationId_key` | UNIQUE constraint | [solicitationId] |
| `dbo.MiniBidResponse` | `MiniBidResponse_miniBidId_vendorId_key` | UNIQUE constraint | [miniBidId], [vendorId] |
| `dbo.MonthlyPublicPosting` | `MonthlyPublicPosting_tenantId_postingMonth_postingYear_contractorName_key` | UNIQUE constraint | [tenantId], [postingMonth], [postingYear], [contractorName] |
| `dbo.Newspaper` | `Newspaper_tenantId_name_key` | UNIQUE constraint | [tenantId], [name] |
| `dbo.PasswordResetToken` | `PasswordResetToken_tokenHash_key` | UNIQUE constraint | [tokenHash] |
| `dbo.PayrollFailureTracking` | `PayrollFailureTracking_vendorId_key` | UNIQUE constraint | [vendorId] |
| `dbo.PrevailingWageThreshold` | `PrevailingWageThreshold_state_entityType_effectiveDate_key` | UNIQUE constraint | [state], [entityType], [effectiveDate] |
| `dbo.ProcurementType` | `ProcurementType_slug_key` | UNIQUE constraint | [slug] |
| `dbo.ProcurementTypeHistory` | `ProcurementTypeHistory_slug_version_key` | UNIQUE constraint | [slug], [version] |
| `dbo.ProposalDocumentAcknowledgment` | `ProposalDocumentAcknowledgment_bidId_documentType_key` | UNIQUE constraint | [bidId], [documentType] |
| `dbo.PublicPostingReport` | `PublicPostingReport_tenantId_reportNumber_key` | UNIQUE constraint | [tenantId], [reportNumber] |
| `dbo.PublicWorksContractorRegistration` | `PublicWorksContractorRegistration_vendorId_registrationNumber_key` | UNIQUE constraint | [vendorId], [registrationNumber] |
| `dbo.ReferencePricingIndex` | `ReferencePricingIndex_sectionId_key` | UNIQUE constraint | [sectionId] |
| `dbo.Solicitation` | `Solicitation_tenantId_solicitationNumber_key` | UNIQUE constraint | [tenantId], [solicitationNumber] |
| `dbo.SolicitationAddendum` | `SolicitationAddendum_solicitationId_addendumNumber_key` | UNIQUE constraint | [solicitationId], [addendumNumber] |
| `dbo.SolicitationAdvertisementAddendum` | `SolicitationAdvertisementAddendum_advertisementId_addendumId_key` | UNIQUE constraint | [advertisementId], [addendumId] |
| `dbo.SolicitationAdvertisementNewspaper` | `SolicitationAdvertisementNewspaper_advertisementId_newspaperId_key` | unique index | [advertisementId], [newspaperId] |
| `dbo.SolicitationAdvertisementSolicitation` | `SolicitationAdvertisementSolicitation_advertisementId_solicitationId_key` | UNIQUE constraint | [advertisementId], [solicitationId] |
| `dbo.SolicitationCounty` | `SolicitationCounty_solicitationId_countyId_key` | UNIQUE constraint | [solicitationId], [countyId] |
| `dbo.SolicitationLineItem` | `SolicitationLineItem_solicitationId_itemNumber_key` | UNIQUE constraint | [solicitationId], [itemNumber] |
| `dbo.SolicitationSealKey` | `SolicitationSealKey_solicitationId_key` | UNIQUE constraint | [solicitationId] |
| `dbo.SSOConfiguration` | `SSOConfiguration_tenantId_providerType_key` | UNIQUE constraint | [tenantId], [providerType] |
| `dbo.TaskOrder` | `TaskOrder_tenantId_orderNumber_key` | UNIQUE constraint | [tenantId], [orderNumber] |
| `dbo.TaskOrderCostSavings` | `TaskOrderCostSavings_taskOrderId_key` | UNIQUE constraint | [taskOrderId] |
| `dbo.Tenant` | `Tenant_slug_key` | UNIQUE constraint | [slug] |
| `dbo.TieBreakParticipant` | `TieBreakParticipant_eventId_proposalId_key` | UNIQUE constraint | [eventId], [proposalId] |
| `dbo.User` | `User_email_key` | UNIQUE constraint | [email] |
| `dbo.UserInvitation` | `UserInvitation_tokenHash_key` | UNIQUE constraint | [tokenHash] |
| `dbo.VendorCriterionResponse` | `VendorCriterionResponse_bidId_criterionId_countyId_key` | UNIQUE constraint | [bidId], [criterionId], [countyId] |
| `dbo.VendorPricingIndex` | `VendorPricingIndex_bidId_indexId_countyId_key` | UNIQUE constraint | [bidId], [indexId], [countyId] |
| `dbo.VendorRelationship` | `VendorRelationship_vendorId_relatedVendorId_relationshipType_key` | UNIQUE constraint | [vendorId], [relatedVendorId], [relationshipType] |
| `dbo.VendorScenarioPrice` | `VendorScenarioPrice_bidId_scenarioId_countyId_key` | UNIQUE constraint | [bidId], [scenarioId], [countyId] |
| `dbo.VendorTierSelection` | `VendorTierSelection_responseId_tierId_key` | UNIQUE constraint | [responseId], [tierId] |

## Indexed views (materialised)

_None._

## Schema-bound views (non-indexed)

_None._

## Source queries

Rendered from these catalog views:

- `sys.triggers` + `sys.trigger_events` + `sys.sql_modules` — DML triggers and their bodies
- `sys.check_constraints` — column- and table-level CHECK rules (with `is_not_trusted` / `is_disabled`)
- `sys.computed_columns` — derived columns (persisted vs. inline)
- `sys.default_constraints` — column defaults (filtered to non-trivial)
- `sys.indexes WHERE has_filter = 1` — filtered indexes
- `sys.indexes WHERE is_unique = 1 AND is_primary_key = 0` — alternate-key uniqueness
- `sys.views` joined to `sys.indexes` — indexed and schema-bound views
