# Table: `dbo.Contracts`

**Database:** `ProcurementAnalytics` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 815

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Cooperative-contract master used for spend analytics. Captures contract value, term, negotiated savings, status, and auto-renew settings per (vendor, contract).

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ContractID` | int | NO |  | YES |
| 2 | `ContractNumber` | varchar(30) | NO |  |  |
| 3 | `VendorID` | int | NO |  |  |
| 4 | `ContractType` | varchar(30) | YES |  |  |
| 5 | `Description` | nvarchar(500) | YES |  |  |
| 6 | `StartDate` | date | NO |  |  |
| 7 | `EndDate` | date | NO |  |  |
| 8 | `TotalValue` | decimal(18,2) | YES |  |  |
| 9 | `NegotiatedSavings` | decimal(18,2) | YES | `((0))` |  |
| 10 | `Status` | varchar(20) | YES | `('Active')` |  |
| 11 | `AutoRenew` | bit | YES | `((0))` |  |
| 12 | `RenewalNoticeDays` | int | YES | `((90))` |  |
| 13 | `CreatedDate` | datetime2 | YES | `(getdate())` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK__Contracts__Vendo__4222D4EF` | `VendorID` | [`dbo.Vendors.VendorID`](dbo.Vendors.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.PurchaseOrders`](dbo.PurchaseOrders.md) | `ContractID` | `ContractID` | NO_ACTION | NO_ACTION |
| [`dbo.SpendTransactions`](dbo.SpendTransactions.md) | `ContractID` | `ContractID` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_Contracts_EndDate` | no | NONCLUSTERED | `EndDate` |  |
| `IX_Contracts_Status` | no | NONCLUSTERED | `Status` |  |
| `IX_Contracts_VendorID` | no | NONCLUSTERED | `VendorID` |  |
| `UQ__Contract__C51D43DA2E02AB86` | YES | NONCLUSTERED | `ContractNumber` |  |
