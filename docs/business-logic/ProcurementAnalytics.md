# Business Logic: `ProcurementAnalytics`

_Generated: 2026-05-04_

**Server:** `eds-sqlserver.eastus2.cloudapp.azure.com`

[← back to business-logic index](README.md)

---

## Domain Summary

`ProcurementAnalytics` is a clean, modern analytics flatten of EDS procurement data. It maintains a set of denormalized, analytics-friendly fact and dimension tables that decouple reporting workloads from the high-volume operational EDS tables. The database uses modern schema conventions (PascalCase names, `datetime2` timestamps, GUID-friendly keys) that contrast with EDS's legacy conventions.

**No stored procedures or triggers exist in this database.** It is a pure read-only reporting layer from an EDS perspective. All population logic is performed by an external ETL process (not visible in database artifacts). This database contains meaningful curated descriptions in `descriptions.json`, which are reflected in the table-level documentation.

---

## Schema and Key Tables

| Table | Rows | Purpose |
|-------|------|---------|
| `Entities` | 20 | Analytics-side customer master (districts/public orgs) |
| `Vendors` | 750 | Analytics-side vendor master (smaller, cleaner than EDS.dbo.Vendors) |
| `Contracts` | 815 | Cooperative contract master: value, term, savings, auto-renew |
| `BudgetAllocations` | 80 | Org-level budget allocations by department/cost center/project/category |
| `EntityBudgets` | 240 | Per-entity, per-fiscal-year budget allocations and amendments |
| `EntityVendors` | 910 | Many-to-many entity-vendor transaction relationships |
| `EntityPurchaseOrders` | 4,035 | Flattened PO headers |
| `PurchaseOrders` | 5,355 | PO header analytics flatten with denormalized department/cost-center fields |
| `PurchaseOrderLines` | 16,159 | PO line detail with received qty for variance analysis |
| `SpendTransactions` | 16,159 | Atomic spend events pairing PO lines to contracts (or off-contract) |
| `EntitySpend` | 12,261 | Bridge: entity → SpendTransaction rollup |
| `VendorPerformance` | 4,712 | Periodic vendor scorecards (on-time, quality, cost competitiveness) |
| `PricingHistory` | 8,480 | Historical pricing records |

---

## Design Patterns

### Spend Classification

`SpendTransactions.IsOffContract` (inferred from description: "maverick spend") classifies each spend event as either under a cooperative contract or off-contract. This enables contract-compliance reporting without re-traversing the EDS PO chain.

### Budget vs. Actual

`EntityBudgets` has both `AllocatedAmount` and `AmendedAmount`, enabling budget-vs-amended-budget analysis alongside actual spend from `SpendTransactions`.

### Vendor Performance Scoring

`VendorPerformance` stores periodic scorecards with dimensions including on-time-delivery percent, quality, defect rate, responsiveness, cost competitiveness, and overall score — enabling vendor ranking and trend analysis over time.

---

## Cross-Database Touchpoints

`ProcurementAnalytics` has no outbound cross-database references in its stored procedures (there are none). It is a terminal sink database — data flows into it from EDS via an external ETL, and analytics consumers read from it directly.

EDS does not reference `ProcurementAnalytics` in any of its stored procedures or views (based on the dependency scan). The two databases are operationally isolated; the ETL pipeline is the only bridge.

---

## Open Questions and Ambiguities

1. **ETL pipeline.** The population mechanism — how EDS data arrives in `ProcurementAnalytics` — is entirely external to the database. Whether it is SSIS, Azure Data Factory, a scheduled SQL Agent job, or an application-level batch is not determinable from database artifacts alone.

2. **Data freshness.** Without knowing the ETL cadence, analysts should not assume `ProcurementAnalytics` is real-time. A human reviewer should document the refresh frequency.

3. **`EntityPurchaseOrders` vs `PurchaseOrders`.** Both tables have similar row counts (4,035 and 5,355). Their exact relationship — whether one is a subset, a different granularity, or a different source — should be documented.

4. **Historical coverage.** The earliest date represented in `SpendTransactions` and `PurchaseOrders` is unknown. Before using these tables for trend analysis, the historical coverage period should be confirmed.

---

## Source Queries

This document was synthesized from the following artifact sources — no additional live queries were executed:

| Source | Used for |
|--------|----------|
| `docs/tables/ProcurementAnalytics/README.md` | Table list, row counts, descriptions |
| `docs/dependencies/ProcurementAnalytics/outbound.md` | Cross-database reference edges (none found) |
| `SCHEMA.md` | Cross-database dependency matrix |
