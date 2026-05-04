# Table: `dbo.Entities`

**Database:** `ProcurementAnalytics` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 20

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `EntityID` | int | NO |  | YES |
| 2 | `EntityCode` | varchar(20) | NO |  |  |
| 3 | `EntityName` | nvarchar(200) | NO |  |  |
| 4 | `EntityType` | varchar(20) | NO |  |  |
| 5 | `Status` | varchar(20) | NO | `('active')` |  |
| 6 | `Region` | nvarchar(100) | YES |  |  |
| 7 | `State` | char(2) | NO |  |  |
| 8 | `City` | nvarchar(100) | NO |  |  |
| 9 | `Address` | nvarchar(300) | YES |  |  |
| 10 | `ContactName` | nvarchar(150) | YES |  |  |
| 11 | `ContactEmail` | nvarchar(200) | YES |  |  |
| 12 | `ContactPhone` | varchar(20) | YES |  |  |
| 13 | `StudentCount` | int | YES |  |  |
| 14 | `Population` | int | YES |  |  |
| 15 | `FiscalYearStart` | int | NO | `((1))` |  |
| 16 | `CreatedAt` | datetime2 | NO | `(getdate())` |  |
| 17 | `UpdatedAt` | datetime2 | NO | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.EntityBudgets`](dbo.EntityBudgets.md) | `EntityID` | `EntityID` | NO_ACTION | NO_ACTION |
| [`dbo.EntityPurchaseOrders`](dbo.EntityPurchaseOrders.md) | `EntityID` | `EntityID` | NO_ACTION | NO_ACTION |
| [`dbo.EntitySpend`](dbo.EntitySpend.md) | `EntityID` | `EntityID` | NO_ACTION | NO_ACTION |
| [`dbo.EntityVendors`](dbo.EntityVendors.md) | `EntityID` | `EntityID` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_Entities_State` | no | NONCLUSTERED | `State` |  |
| `IX_Entities_Status` | no | NONCLUSTERED | `Status` |  |
| `IX_Entities_Type` | no | NONCLUSTERED | `EntityType` |  |
| `UQ__Entities__D062AD0AD1D59629` | YES | NONCLUSTERED | `EntityCode` |  |
