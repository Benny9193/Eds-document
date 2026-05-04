# Table: `dbo.SpendTransactions`

**Database:** `ProcurementAnalytics` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 16159

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Atomic spend events feeding the analytics fact tables. Each row pairs a PO line with a contract (or `IsOffContract = 1` for maverick spend) plus fiscal-period attributes.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TransactionID` | int | NO |  | YES |
| 2 | `POID` | int | YES |  |  |
| 3 | `VendorID` | int | NO |  |  |
| 4 | `ContractID` | int | YES |  |  |
| 5 | `Department` | nvarchar(100) | YES |  |  |
| 6 | `CostCenter` | varchar(20) | YES |  |  |
| 7 | `ProjectCode` | varchar(30) | YES |  |  |
| 8 | `TransactionDate` | date | NO |  |  |
| 9 | `ItemCode` | varchar(30) | YES |  |  |
| 10 | `Category` | nvarchar(100) | YES |  |  |
| 11 | `Amount` | decimal(18,2) | NO |  |  |
| 12 | `IsOffContract` | bit | YES | `((0))` |  |
| 13 | `InvoiceNumber` | varchar(30) | YES |  |  |
| 14 | `FiscalYear` | int | YES |  |  |
| 15 | `FiscalQuarter` | int | YES |  |  |
| 16 | `CreatedDate` | datetime2 | YES | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK__SpendTran__Contr__5CD6CB2B` | `ContractID` | [`dbo.Contracts.ContractID`](dbo.Contracts.md) | NO_ACTION | NO_ACTION |
| `FK__SpendTran__Vendo__5BE2A6F2` | `VendorID` | [`dbo.Vendors.VendorID`](dbo.Vendors.md) | NO_ACTION | NO_ACTION |
| `FK__SpendTrans__POID__5AEE82B9` | `POID` | [`dbo.PurchaseOrders.POID`](dbo.PurchaseOrders.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.EntitySpend`](dbo.EntitySpend.md) | `TransactionID` | `TransactionID` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_Spend_Category` | no | NONCLUSTERED | `Category` |  |
| `IX_Spend_Date` | no | NONCLUSTERED | `TransactionDate` |  |
| `IX_Spend_Dept` | no | NONCLUSTERED | `Department` |  |
| `IX_Spend_FY` | no | NONCLUSTERED | `FiscalYear` |  |
| `IX_Spend_VendorID` | no | NONCLUSTERED | `VendorID` |  |
