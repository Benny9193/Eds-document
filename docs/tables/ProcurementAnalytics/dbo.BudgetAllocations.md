# Table: `dbo.BudgetAllocations`

**Database:** `ProcurementAnalytics` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 80

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BudgetID` | int | NO |  | YES |
| 2 | `FiscalYear` | int | NO |  |  |
| 3 | `Department` | nvarchar(100) | NO |  |  |
| 4 | `CostCenter` | varchar(20) | YES |  |  |
| 5 | `ProjectCode` | varchar(30) | YES |  |  |
| 6 | `BudgetCategory` | nvarchar(100) | YES |  |  |
| 7 | `AllocatedAmount` | decimal(18,2) | NO |  |  |
| 8 | `AmendedAmount` | decimal(18,2) | YES | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_Budget_Dept` | no | NONCLUSTERED | `Department` |  |
| `IX_Budget_FY` | no | NONCLUSTERED | `FiscalYear` |  |
| `UQ_Budget` | YES | NONCLUSTERED | `FiscalYear`, `Department`, `CostCenter`, `ProjectCode`, `BudgetCategory` |  |
