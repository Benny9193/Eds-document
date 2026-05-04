# Table: `dbo.PurchaseOrders`

**Database:** `ProcurementAnalytics` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 5355

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

PO header — analytics flatten of EDS PO data with denormalized department / cost-center / project-code fields and lifecycle dates.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `POID` | int | NO |  | YES |
| 2 | `PONumber` | varchar(20) | NO |  |  |
| 3 | `VendorID` | int | NO |  |  |
| 4 | `ContractID` | int | YES |  |  |
| 5 | `Department` | nvarchar(100) | YES |  |  |
| 6 | `CostCenter` | varchar(20) | YES |  |  |
| 7 | `ProjectCode` | varchar(30) | YES |  |  |
| 8 | `Status` | varchar(20) | NO | `('Open')` |  |
| 9 | `OrderDate` | date | NO |  |  |
| 10 | `ExpectedDate` | date | YES |  |  |
| 11 | `ReceivedDate` | date | YES |  |  |
| 12 | `TotalAmount` | decimal(18,2) | NO |  |  |
| 13 | `Currency` | varchar(3) | YES | `('USD')` |  |
| 14 | `ApprovedBy` | nvarchar(200) | YES |  |  |
| 15 | `Notes` | nvarchar(1000) | YES |  |  |
| 16 | `CreatedDate` | datetime2 | YES | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK__PurchaseO__Contr__4BAC3F29` | `ContractID` | [`dbo.Contracts.ContractID`](dbo.Contracts.md) | NO_ACTION | NO_ACTION |
| `FK__PurchaseO__Vendo__4AB81AF0` | `VendorID` | [`dbo.Vendors.VendorID`](dbo.Vendors.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.EntityPurchaseOrders`](dbo.EntityPurchaseOrders.md) | `POID` | `POID` | NO_ACTION | NO_ACTION |
| [`dbo.PurchaseOrderLines`](dbo.PurchaseOrderLines.md) | `POID` | `POID` | NO_ACTION | NO_ACTION |
| [`dbo.SpendTransactions`](dbo.SpendTransactions.md) | `POID` | `POID` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_PO_Department` | no | NONCLUSTERED | `Department` |  |
| `IX_PO_OrderDate` | no | NONCLUSTERED | `OrderDate` |  |
| `IX_PO_Status` | no | NONCLUSTERED | `Status` |  |
| `IX_PO_VendorID` | no | NONCLUSTERED | `VendorID` |  |
| `UQ__Purchase__69B9A8412F231885` | YES | NONCLUSTERED | `PONumber` |  |
