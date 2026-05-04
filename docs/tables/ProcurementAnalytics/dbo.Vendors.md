# Table: `dbo.Vendors`

**Database:** `ProcurementAnalytics` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 750

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Analytics-side vendor master. Smaller and cleaner than `EDS.dbo.Vendors` — kept in sync via the analytics ETL.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorID` | int | NO |  | YES |
| 2 | `VendorCode` | varchar(20) | NO |  |  |
| 3 | `VendorName` | nvarchar(200) | NO |  |  |
| 4 | `Category` | nvarchar(100) | YES |  |  |
| 5 | `SubCategory` | nvarchar(100) | YES |  |  |
| 6 | `Status` | varchar(20) | NO | `('Active')` |  |
| 7 | `TaxID` | varchar(20) | YES |  |  |
| 8 | `Address` | nvarchar(500) | YES |  |  |
| 9 | `City` | nvarchar(100) | YES |  |  |
| 10 | `State` | varchar(2) | YES |  |  |
| 11 | `Country` | varchar(3) | YES | `('USA')` |  |
| 12 | `ContactName` | nvarchar(200) | YES |  |  |
| 13 | `ContactEmail` | varchar(200) | YES |  |  |
| 14 | `ContactPhone` | varchar(30) | YES |  |  |
| 15 | `PaymentTerms` | varchar(20) | YES | `('Net30')` |  |
| 16 | `OverallRating` | decimal(3,2) | YES |  |  |
| 17 | `RiskLevel` | varchar(10) | YES | `('Low')` |  |
| 18 | `AnnualSpend` | decimal(18,2) | YES | `((0))` |  |
| 19 | `ContractCount` | int | YES | `((0))` |  |
| 20 | `CreatedDate` | datetime2 | YES | `(getdate())` |  |
| 21 | `ModifiedDate` | datetime2 | YES | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.Contracts`](dbo.Contracts.md) | `VendorID` | `VendorID` | NO_ACTION | NO_ACTION |
| [`dbo.EntityVendors`](dbo.EntityVendors.md) | `VendorID` | `VendorID` | NO_ACTION | NO_ACTION |
| [`dbo.PricingHistory`](dbo.PricingHistory.md) | `VendorID` | `VendorID` | NO_ACTION | NO_ACTION |
| [`dbo.PurchaseOrders`](dbo.PurchaseOrders.md) | `VendorID` | `VendorID` | NO_ACTION | NO_ACTION |
| [`dbo.SpendTransactions`](dbo.SpendTransactions.md) | `VendorID` | `VendorID` | NO_ACTION | NO_ACTION |
| [`dbo.VendorPerformance`](dbo.VendorPerformance.md) | `VendorID` | `VendorID` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_Vendors_Category` | no | NONCLUSTERED | `Category` |  |
| `IX_Vendors_Status` | no | NONCLUSTERED | `Status` |  |
| `IX_Vendors_VendorName` | no | NONCLUSTERED | `VendorName` |  |
| `UQ__Vendors__10C18F5C9A61C01F` | YES | NONCLUSTERED | `VendorCode` |  |
