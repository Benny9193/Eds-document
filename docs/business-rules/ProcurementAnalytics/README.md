# Business rules: `ProcurementAnalytics`

_Generated on 2026-05-04T15:27:12.013Z_

**Database:** `ProcurementAnalytics`

[← back to business-rules index](../README.md)

Auto-extracted enforcement layer: triggers, check constraints, computed columns, non-trivial defaults, filtered indexes, alternate-key uniqueness, and indexed/schema-bound views. Hand-curated narrative lives in [`docs/business-logic/`](../../business-logic/).

## Summary

| Category | Count |
|----------|-------|
| Triggers | 0 |
| Check constraints | 4 |
| Computed columns | 1 |
| Default constraints | 31 (0 non-trivial) |
| Filtered indexes | 0 |
| Unique constraints (non-PK) | 12 |
| Indexed views | 0 |
| Schema-bound views (non-indexed) | 0 |

## Triggers

_None._

## Check constraints

**4** constraint(s), **4** not trusted.

| Table | Column | Constraint | Definition | Flags |
|-------|--------|------------|------------|-------|
| `dbo.Entities` | `EntityType` | `CK__Entities__Entity__7A672E12` | `([EntityType]='municipality' OR [EntityType]='school_district')` | not trusted |
| `dbo.Entities` | `FiscalYearStart` | `CK__Entities__Fiscal__7E37BEF6` | `([FiscalYearStart]>=(1) AND [FiscalYearStart]<=(12))` | not trusted |
| `dbo.Entities` | `Status` | `CK__Entities__Status__7C4F7684` | `([Status]='onboarding' OR [Status]='inactive' OR [Status]='active')` | not trusted |
| `dbo.EntityVendors` | `RelationshipStatus` | `CK__EntityVen__Relat__07C12930` | `([RelationshipStatus]='suspended' OR [RelationshipStatus]='inactive' OR [RelationshipStatus]='active')` | not trusted |

## Computed columns

**1** computed column(s), **1** persisted.

| Table | Column | Type | Persisted | Nullable | Definition |
|-------|--------|------|-----------|----------|------------|
| `dbo.PurchaseOrderLines` | `LineTotal` | decimal | yes | yes | `([Quantity]*[UnitPrice])` |

## Default constraints

**31** total. **0** non-trivial (UDF / NEWID / etc.) shown below; 31 literal/timestamp defaults omitted.

_All defaults are simple literals or timestamps._

## Filtered indexes

_None._

## Unique constraints (non-PK)

**12** alternate-key uniqueness rule(s).

| Table | Index | Source | Key columns |
|-------|-------|--------|-------------|
| `dbo.BudgetAllocations` | `UQ_Budget` | UNIQUE constraint | [FiscalYear], [Department], [CostCenter], [ProjectCode], [BudgetCategory] |
| `dbo.Contracts` | `UQ__Contract__C51D43DA2E02AB86` | UNIQUE constraint | [ContractNumber] |
| `dbo.Entities` | `UQ__Entities__D062AD0AD1D59629` | UNIQUE constraint | [EntityCode] |
| `dbo.EntityBudgets` | `UQ_EntityBudget` | UNIQUE constraint | [EntityID], [FiscalYear], [BudgetCategory] |
| `dbo.EntityPurchaseOrders` | `UQ_EntityPO` | UNIQUE constraint | [EntityID], [POID] |
| `dbo.EntitySpend` | `UQ_EntitySpend` | UNIQUE constraint | [EntityID], [TransactionID] |
| `dbo.EntityVendors` | `UQ_EntityVendor` | UNIQUE constraint | [EntityID], [VendorID] |
| `dbo.PricingHistory` | `UQ_PriceHistory` | UNIQUE constraint | [VendorID], [ItemCode], [EffectiveDate] |
| `dbo.PurchaseOrderLines` | `UQ_POLine` | UNIQUE constraint | [POID], [LineNumber] |
| `dbo.PurchaseOrders` | `UQ__Purchase__69B9A8412F231885` | UNIQUE constraint | [PONumber] |
| `dbo.VendorPerformance` | `UQ_VendorPerf` | UNIQUE constraint | [VendorID], [EvaluationPeriod] |
| `dbo.Vendors` | `UQ__Vendors__10C18F5C9A61C01F` | UNIQUE constraint | [VendorCode] |

## Indexed views (materialised)

_None._

## Schema-bound views (non-indexed)

_None._

## Source queries

Rendered from these catalog views:

- `sys.triggers` + `sys.trigger_events` + `sys.sql_modules` — DML triggers and their bodies
- `sys.check_constraints` — column- and table-level CHECK rules (with `is_not_trusted` / `is_disabled`)
- `sys.computed_columns` — derived columns (persisted vs. inline)
- `sys.default_constraints` — column defaults (filtered to non-trivial)
- `sys.indexes WHERE has_filter = 1` — filtered indexes
- `sys.indexes WHERE is_unique = 1 AND is_primary_key = 0` — alternate-key uniqueness
- `sys.views` joined to `sys.indexes` — indexed and schema-bound views
