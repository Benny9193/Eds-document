# Table: `dbo.EntityBudgets`

**Database:** `ProcurementAnalytics` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 240

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Per-entity, per-fiscal-year budget allocations by category. `AllocatedAmount` is the original amount; `AmendedAmount` reflects mid-year revisions.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `EntityBudgetID` | int | NO |  | YES |
| 2 | `EntityID` | int | NO |  |  |
| 3 | `FiscalYear` | int | NO |  |  |
| 4 | `BudgetCategory` | nvarchar(100) | NO |  |  |
| 5 | `AllocatedAmount` | decimal(15,2) | NO | `((0))` |  |
| 6 | `AmendedAmount` | decimal(15,2) | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK__EntityBud__Entit__0C85DE4D` | `EntityID` | [`dbo.Entities.EntityID`](dbo.Entities.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_EntityBudgets_EntityID` | no | NONCLUSTERED | `EntityID` |  |
| `IX_EntityBudgets_FiscalYear` | no | NONCLUSTERED | `FiscalYear` |  |
| `UQ_EntityBudget` | YES | NONCLUSTERED | `EntityID`, `FiscalYear`, `BudgetCategory` |  |
