# Table: `dbo.Requisitions`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2204102

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Header record for every purchase request created in EDS. One row per requisition; line items live in `Detail`. Drives the approval workflow that ultimately produces a PO. Belongs to a District and originating User.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `RequisitionNumber` | varchar(24) | YES |  |  |
| 4 | `SchoolId` | int | YES |  |  |
| 5 | `UserId` | int | YES |  |  |
| 6 | `BudgetId` | int | YES |  |  |
| 7 | `BudgetAccountId` | int | YES |  |  |
| 8 | `UserAccountId` | int | YES |  |  |
| 9 | `CategoryId` | int | YES |  |  |
| 10 | `ShippingId` | int | YES |  |  |
| 11 | `Attention` | varchar(50) | YES |  |  |
| 12 | `AccountCode` | varchar(50) | YES |  |  |
| 13 | `DateEntered` | datetime | YES |  |  |
| 14 | `ShippingPercent` | decimal(9,5) | YES |  |  |
| 15 | `DiscountPercent` | decimal(9,5) | YES |  |  |
| 16 | `ShippingCost` | money | YES |  |  |
| 17 | `TotalItemsCost` | money | YES |  |  |
| 18 | `TotalRequisitionCost` | money | YES |  |  |
| 19 | `Comments` | varchar(1023) | YES |  |  |
| 20 | `ApprovalRequired` | tinyint | YES |  |  |
| 21 | `ApprovalId` | int | YES |  |  |
| 22 | `ApprovalLevel` | tinyint | YES |  |  |
| 23 | `StatusId` | int | YES |  |  |
| 24 | `OrderDate` | datetime | YES |  |  |
| 25 | `DateExported` | datetime | YES |  |  |
| 26 | `BidId` | int | YES |  |  |
| 27 | `BookId` | int | YES |  |  |
| 28 | `SourceId` | int | YES |  |  |
| 29 | `BidHeaderId` | int | YES |  |  |
| 30 | `LastAlteredSessionId` | int | YES |  |  |
| 31 | `DateUpdated` | datetime | YES | `(getdate())` |  |
| 32 | `OrderType` | tinyint | YES |  |  |
| 33 | `NotesCount` | int | YES |  |  |
| 34 | `AddendaTotal` | money | YES |  |  |
| 35 | `ApprovalCount` | int | YES |  |  |
| 36 | `AdditionalFreight` | tinyint | YES |  |  |
| 37 | `HistoryCount` | int | YES |  |  |
| 38 | `POCount` | int | YES |  |  |
| 39 | `LowPOCount` | int | YES |  |  |
| 40 | `AdditionalShippingCost` | money | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_Requisitions_Budgets` | `BudgetId` | [`dbo.Budgets.BudgetId`](dbo.Budgets.md) | NO_ACTION | NO_ACTION |
| `FK_Requisitions_Category` | `CategoryId` | [`dbo.Category.CategoryId`](dbo.Category.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.PO`](dbo.PO.md) | `RequisitionId` | `RequisitionId` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_Requisitions_7_354152357__K4_K1_K6_K10_K5_K9_K7_K29_K8_3_11` | no | NONCLUSTERED | `SchoolId`, `RequisitionId`, `BudgetId`, `ShippingId`, `UserId`, `CategoryId`, `BudgetAccountId`, `BidHeaderId`, `UserAccountId` | `RequisitionNumber`, `Attention` |
| `Requisitions9` | no | NONCLUSTERED | `UserAccountId` |  |
| `SK_BidHeader` | no | NONCLUSTERED | `BidHeaderId` |  |
| `SK_Budget` | no | NONCLUSTERED | `BudgetId` | `RequisitionId`, `BidHeaderId` |
| `SK_BudgetAccount` | no | NONCLUSTERED | `BudgetAccountId` |  |
| `SK_BudgetUser` | no | NONCLUSTERED | `BudgetId`, `UserId` |  |
| `SK_CatBudget` | no | NONCLUSTERED | `CategoryId`, `BudgetId` |  |
| `SK_Category` | no | NONCLUSTERED | `CategoryId` |  |
| `SK_CatSchool` | no | NONCLUSTERED | `CategoryId`, `SchoolId` |  |
| `SK_ReqBudget` | no | NONCLUSTERED | `RequisitionId`, `BudgetId` | `RequisitionNumber`, `BudgetAccountId`, `UserAccountId`, `CategoryId`, `ShippingId`, `Attention`, `BidHeaderId` |
| `SK_RUBBaCSRnAAc` | no | NONCLUSTERED | `RequisitionId`, `UserId`, `BudgetId`, `BudgetAccountId`, `CategoryId`, `ShippingId`, `RequisitionNumber`, `Attention`, `AccountCode` |  |
| `SK_SchoolId` | no | NONCLUSTERED | `SchoolId` |  |
| `SK_User` | no | NONCLUSTERED | `UserId` | `BudgetId`, `CategoryId` |
| `SKI_BudgetAccountShippingUserSchool_ReqNbr` | no | NONCLUSTERED | `BudgetAccountId`, `ShippingId`, `UserId`, `SchoolId` | `RequisitionNumber` |
| `SKI_BudgetCategory_Etc` | no | NONCLUSTERED | `BudgetId`, `CategoryId`, `RequisitionId` | `RequisitionNumber`, `SchoolId`, `UserId`, `BudgetAccountId`, `UserAccountId`, `ShippingId`, `Attention`, `BidHeaderId` |
| `SKI_CategoryEntered_UserBudgetBid` | no | NONCLUSTERED | `CategoryId`, `DateEntered` | `UserId`, `BudgetId`, `BidHeaderId` |
| `SKI_UserAccount_Req` | no | NONCLUSTERED | `UserAccountId`, `RequisitionId` | `SchoolId`, `UserId`, `BudgetId`, `BudgetAccountId`, `CategoryId`, `ShippingId`, `DateEntered`, `BidHeaderId`, `OrderType` |
