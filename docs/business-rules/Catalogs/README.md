# Business rules: `Catalogs`

_Generated on 2026-05-04T15:27:06.569Z_

**Database:** `Catalogs`

[← back to business-rules index](../README.md)

Auto-extracted enforcement layer: triggers, check constraints, computed columns, non-trivial defaults, filtered indexes, alternate-key uniqueness, and indexed/schema-bound views. Hand-curated narrative lives in [`docs/business-logic/`](../../business-logic/).

## Summary

| Category | Count |
|----------|-------|
| Triggers | 0 |
| Check constraints | 0 |
| Computed columns | 0 |
| Default constraints | 1 (0 non-trivial) |
| Filtered indexes | 0 |
| Unique constraints (non-PK) | 0 |
| Indexed views | 0 |
| Schema-bound views (non-indexed) | 0 |

## Triggers

_None._

## Check constraints

_None._

## Computed columns

_None._

## Default constraints

**1** total. **0** non-trivial (UDF / NEWID / etc.) shown below; 1 literal/timestamp defaults omitted.

_All defaults are simple literals or timestamps._

## Filtered indexes

_None._

## Unique constraints (non-PK)

_None._

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
