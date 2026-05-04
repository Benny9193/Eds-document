# Business Logic: `IDIQ_Platform`

_Generated: 2026-05-04_

**Server:** `eds-sqlserver.eastus2.cloudapp.azure.com`

[← back to business-logic index](README.md)

---

## Domain Summary

`IDIQ_Platform` is an Indefinite-Delivery / Indefinite-Quantity contract management platform for public procurement. It manages the full IDIQ contract lifecycle: solicitations, bid submissions, evaluation and scoring, award recommendations, task orders, mini-bids, certified payroll, prevailing wage compliance, debarment tracking, and cooperative procurement compliance.

The platform appears to be a newer, purpose-built application with a modern schema (PascalCase names, `datetime2`, GUID PKs, SSO configuration, AI verification, e-signature). As of 2026-05-04, most tables have 0 rows, suggesting the platform is in early deployment or UAT phase. A parallel UAT environment exists as `IDIQ_Platform_UAT`.

**No stored procedures were found in this database.** All business logic appears to be implemented in the application layer, not the database layer. This is consistent with a modern API-driven architecture where the database is a pure persistence store.

---

## Observable Schema Structure

Based on the table inventory (130+ tables, almost all in `dbo`), the domain covers:

| Domain area | Key tables |
|-------------|------------|
| Solicitations | `Solicitation`, `SolicitationAddendum`, `SolicitationAdvertisement`, `SolicitationRequiredDocument`, `SolicitationCounty` |
| Bidding | `Bid`, `BidDocument`, `BidLineItem`, `BidScore`, `BidSubmissionReceipt`, `BidAuditLog` |
| Evaluation and scoring | `EvaluationFramework`, `EvaluationCriterion`, `EvaluationSection`, `CriterionTier`, `VendorCriterionResponse`, `VendorTierSelection` |
| Award | `AwardRecommendation`, `RecommendedVendor`, `BidCountyAward` |
| Task orders | `TaskOrder`, `TaskOrderAmendment`, `TaskOrderCostSavings`, `MiniBid`, `MiniBidLineItem`, `MiniBidResponse` |
| Vendors | `Vendor`, `VendorCertification`, `VendorRelationship`, `VendorPricingIndex`, `DebarmentRecord` |
| Users and tenants | `Tenant`, `User`, `UserInvitation`, `SSO Configuration`, `PasswordResetToken`, `EmailVerificationToken` |
| Compliance | `CertifiedPayroll`, `CompetitiveBiddingCompliance`, `ApprenticeshipCompliance`, `NJWageHubSubmission`, `PrevailingWageRate` |
| Notifications and audit | `Notification`, `AuditTrail` (~60K rows), `EmailLog`, `QAThread` |
| AI features | `AIVerification` (~18 rows), `AIVerificationFeedback` |
| Configuration | `CooperativeSystemConfig`, `FormTemplate`, `ProcurementType` |

The `Tenant` table (~131 rows) and `CooperativeSystemConfig` (1 row) suggest a multi-tenant SaaS architecture where each tenant is a cooperative or consortium.

---

## Active Data

Despite most tables being empty, the following have live data that indicates real usage:

| Table | Rows |
|-------|------|
| `AuditTrail` | 59,782 |
| `Notification` | 2,886 |
| `Tenant` | 131 |
| `BidCounty` | 2,197 |
| `VendorCriterionResponse` | 3,310 |
| `VendorTierSelection` | 2,429 |
| `EvaluationCriterion` | 578 |
| `DebarmentRecord` | 329 |
| `SolicitationCounty` | 819 |
| `Solicitation` | 39 |
| `Bid` | 144 |

The active `AuditTrail` and `Notification` data alongside live `Solicitation` and `Bid` rows confirms the platform is operational at some level.

---

## Cross-Database Touchpoints

Based on the dependency scan, `IDIQ_Platform` has no outbound cross-database stored procedure references. It is not referenced by EDS or other databases in the outbound dependency list. It appears to be a fully self-contained platform, isolated from the EDS procurement database by design.

See [`docs/dependencies/IDIQ_Platform/outbound.md`](../dependencies/IDIQ_Platform/outbound.md) for confirmation.

---

## Open Questions and Ambiguities

1. **Application-layer business logic.** With no stored procedures, all business rules (bid window validation, scoring calculation, prevailing wage checks, etc.) are in the application. This documentation cannot capture those rules from database artifacts alone.

2. **UAT mirror.** `IDIQ_Platform_UAT` is a parallel environment. Whether it tracks production exactly or diverges (e.g., different schema version) should be confirmed before UAT data is used for any analysis.

3. **AI verification feature.** `AIVerification` (18 rows) and `AIVerificationFeedback` (0 rows) tables suggest an AI-assisted evaluation or compliance-verification feature. The exact integration (external API? embedded model?) is not visible from schema alone.

4. **Tenant isolation model.** Whether tenants are isolated by row-level filtering (a `TenantId` FK on every table) or by schema is not confirmed from the table list alone.

---

## Source Queries

This document was synthesized from the following artifact sources — no additional live queries were executed:

| Source | Used for |
|--------|----------|
| `docs/tables/IDIQ_Platform/README.md` | Table list, row counts |
| `docs/dependencies/IDIQ_Platform/outbound.md` | Cross-database reference edges (none found) |
| `SCHEMA.md` | Cross-database dependency matrix |
