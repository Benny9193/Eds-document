# EDS Trigger catalog

_Generated 2026-05-04_

Purpose-grouped view of every DML trigger across all documented databases. Triggers are classified by what they *do* rather than where they live — useful for onboarding, impact analysis, and finding write-side side-effects.

Complementary to [`docs/business-rules/`](../business-rules/) which embeds triggers inside the full enforcement-layer audit alongside checks, constraints, and views.

## Category definitions

- **Date-stamping** — Sets a timestamp column (DateCreated, DateModified, etc.) via GETDATE() or similar.
- **Audit / history** — Writes to an audit, history, or log table, or is explicitly named as an audit trigger.
- **Validation / guard** — Enforces a business rule by raising an error or rolling back the transaction.
- **Cascade / derived data** — Propagates changes to related tables — inserts child rows, updates denormalised counts, or synchronises derived columns.
- **Other** — did not match any pattern; review manually.

## Summary by database

| Database | Total | Date-stamping | Audit / history | Validation / guard | Cascade / derived data | Other |
|----------| -----:| ------: | ------: | ------: | ------: | ------: |
| [`EDS`](EDS/README.md) | 52 | 28 | 1 | 0 | 23 | 0 |
| [`Catalogs`](Catalogs/README.md) | 0 | 0 | 0 | 0 | 0 | 0 |
| [`ContentCentral`](ContentCentral/README.md) | 0 | 0 | 0 | 0 | 0 | 0 |
| [`Documents`](Documents/README.md) | 1 | 0 | 0 | 0 | 1 | 0 |
| [`VendorBids`](VendorBids/README.md) | 2 | 2 | 0 | 0 | 0 | 0 |
| [`IDIQ_Platform`](IDIQ_Platform/README.md) | 0 | 0 | 0 | 0 | 0 | 0 |
| [`ProcurementAnalytics`](ProcurementAnalytics/README.md) | 0 | 0 | 0 | 0 | 0 | 0 |
| [`NJ_RTK`](NJ_RTK/README.md) | 0 | 0 | 0 | 0 | 0 | 0 |

## Disabled triggers

> **2** trigger(s) are currently disabled. Disabled triggers are silently skipped — confirm this is intentional.

| Database | Table | Trigger | Events |
|----------|-------|---------|--------|
| `EDS` | `dbo.Detail` | `trig_DetailAuditDelete` | DELETE |
| `EDS` | `dbo.Detail` | `trig_DetailAuditUpdate` | INSERT, UPDATE |

## Cascade / derived-data triggers across all databases

These triggers write to tables *other than their own* — knowing them prevents surprise side-effects during writes.

| Database | Table | Trigger | Events | Also tagged |
|----------|-------|---------|--------|-------------|
| `EDS` | `dbo.Approvals` | `trig_Approvals` | DELETE, INSERT, UPDATE | — |
| `EDS` | `dbo.AwardsCatalogList` | `trig_AwardsCatalogListUpdate` | INSERT, UPDATE | — |
| `EDS` | `dbo.BidAnswers` | `BidAnswers_trig` | INSERT | — |
| `EDS` | `dbo.BidHeaders` | `trig_BidHeadersDateCreated` | INSERT | date-stamp |
| `EDS` | `dbo.BidImportCatalogList` | `trig_BICLUpdate` | INSERT, UPDATE | date-stamp |
| `EDS` | `dbo.BidItems` | `trig_BidItemsUpdate` | UPDATE | date-stamp |
| `EDS` | `dbo.BidItems_Old` | `trig_BidItemsUpdate_old` | UPDATE | date-stamp |
| `EDS` | `dbo.BidMSRPResults` | `trig_BidMSRPResults` | INSERT, UPDATE | — |
| `EDS` | `dbo.BidRequestItems_Orig` | `trig_BidRequestItems` | INSERT, UPDATE | — |
| `EDS` | `dbo.BidRequestManufacturer` | `trig_BidRequestManufacturer` | INSERT, UPDATE | — |
| `EDS` | `dbo.BidResults` | `trig_BidResultsUpdate` | INSERT, UPDATE | date-stamp |
| `EDS` | `dbo.Bids` | `trig_BidsUpdate` | INSERT, UPDATE | date-stamp |
| `EDS` | `dbo.BidsCatalogList` | `trig_BCLUpdate` | INSERT, UPDATE | — |
| `EDS` | `dbo.BudgetAccounts` | `trig_BudgetAccountUpdate` | INSERT, UPDATE | — |
| `EDS` | `dbo.Budgets` | `trig_BudgetsUpdate` | INSERT, UPDATE | date-stamp |
| `EDS` | `dbo.Catalog` | `trig_CatalogCreateDate` | INSERT | date-stamp |
| `EDS` | `dbo.Category` | `TRIG_CategoryCode` | INSERT, UPDATE | audit |
| `EDS` | `dbo.Category` | `TRIG_DistrictCategoriesCategory` | DELETE, INSERT | — |
| `EDS` | `dbo.CopyRequests` | `trig_CopyInsert` | INSERT | date-stamp |
| `EDS` | `dbo.CrossRefs` | `trig_CrossRefs` | INSERT, UPDATE | date-stamp |
| `EDS` | `dbo.Detail` | `trig_DetailAuditDelete` | DELETE | date-stamp, audit |
| `EDS` | `dbo.Detail` | `trig_DetailAuditUpdate` | INSERT, UPDATE | date-stamp, audit |
| `EDS` | `dbo.Detail` | `trig_DetailDelete` | DELETE | — |
| `EDS` | `dbo.Detail` | `trig_DetailUpdate` | INSERT, UPDATE | date-stamp |
| `EDS` | `dbo.District` | `TRIG_District` | INSERT, UPDATE | — |
| `EDS` | `dbo.District` | `TRIG_DistrictCategories` | DELETE, INSERT | date-stamp |
| `EDS` | `dbo.DistrictCategories` | `trig_DCUpdate` | INSERT, UPDATE | date-stamp |
| `EDS` | `dbo.DistrictCharges` | `trig_DistrictCharges` | UPDATE | — |
| `EDS` | `dbo.DistrictProposedCharges` | `trig_DistrictProposedCharges` | DELETE, INSERT, UPDATE | date-stamp |
| `EDS` | `dbo.DMSVendorBidDocuments` | `trig_DMSVendorBidDocuments` | INSERT, UPDATE | date-stamp |
| `EDS` | `dbo.DMSVendorDocuments` | `trig_DMSVendorDocuments` | INSERT, UPDATE | date-stamp |
| `EDS` | `dbo.Headings` | `trig_Headings` | INSERT, UPDATE | date-stamp |
| `EDS` | `dbo.Items` | `trig_Items` | INSERT, UPDATE | date-stamp |
| `EDS` | `dbo.Keywords` | `trig_Keywords` | INSERT, UPDATE | date-stamp |
| `EDS` | `dbo.MSDS` | `trig_MSDSInserted` | INSERT | — |
| `EDS` | `dbo.OrderBooks` | `trig_OrderBookCreate` | INSERT | date-stamp |
| `EDS` | `dbo.PricingAddenda` | `trig_PricingAddenda` | INSERT, UPDATE | — |
| `EDS` | `dbo.RequisitionNotes` | `trig_RequisitionNotes` | DELETE, INSERT, UPDATE | — |
| `EDS` | `dbo.Requisitions` | `trig_RequisitionsDelete` | DELETE | — |
| `EDS` | `dbo.Requisitions` | `trig_RequisitionsUpdate` | INSERT, UPDATE | date-stamp, validation |
| `EDS` | `dbo.RTK_CASFile` | `trig_SetSpecialHealthHazard` | INSERT, UPDATE | — |
| `EDS` | `dbo.RTK_Items` | `trig_MSDS` | INSERT | — |
| `EDS` | `dbo.RTK_Items` | `trig_RTK_Items_ReportItems` | DELETE, INSERT, UPDATE | — |
| `EDS` | `dbo.RTK_ReportItems` | `trig_RTK_ReportItems` | INSERT, UPDATE | — |
| `EDS` | `dbo.TMSurvey` | `TMSurvey_Trig` | INSERT | date-stamp |
| `EDS` | `dbo.UserAccounts` | `trig_UserAccountUpdate` | INSERT, UPDATE | — |
| `EDS` | `dbo.Users` | `trig_UsersUpdate` | INSERT, UPDATE | date-stamp |
| `EDS` | `dbo.VendorContacts` | `trig_Update` | DELETE, INSERT, UPDATE | — |
| `EDS` | `dbo.Vendors` | `trig_VendorUpdate` | INSERT, UPDATE | — |
| `Documents` | `dbo.DocumentFiles` | `trig_Insert` | INSERT | — |
| `VendorBids` | `dbo.biddocumentacks` | `trig_bdaInsert` | INSERT | date-stamp |
| `VendorBids` | `dbo.DocumentUploads` | `trig_DocumentUploads` | DELETE, INSERT, UPDATE | date-stamp |
