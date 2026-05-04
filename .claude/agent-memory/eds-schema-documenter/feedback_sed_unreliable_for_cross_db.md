---
name: sys.sql_expression_dependencies for cross-DB on this Azure SQL instance
description: SED returns rows where referenced_database_name is NULL even when the routine has fully-qualified cross-DB references; do not trust it as the sole source for cross-DB graph work.
type: feedback
---

**Rule:** When building cross-database reference reports on the EDS Azure SQL Server, do NOT rely solely on `sys.sql_expression_dependencies`. Combine it with a text-grep over `sys.sql_modules.definition` for `[<db>].` and `<db>.` patterns.

**Why:** As of 2026-05-04, on this server the catalog view's behavior is split:
- It misses 385+ edges that the text-grep finds (the originally noted "zero cross-DB rows for EDS" finding from earlier work).
- It also reports 163 edges the text-grep misses — these are typically references with empty schema (`Db..Object`) or dynamic-resolved targets.
The two methods are complementary, not redundant. Reporting both detection sources per edge (`detected_by: sed | text | sed,text`) makes the discrepancy auditable.

**How to apply:**
- For any cross-DB graph, run both detection methods and merge.
- When the regex form is `(?:\[\s*<db>\s*\]|(?<![A-Za-z0-9_])<db>)\s*\.\s*(\[?\w+\]?)?\s*\.\s*(\[?\w+\]?)`, note that it requires *something* between the two dots. Empty-schema references (`Db..Object`) are missed by this form — SED catches them.
- Strip `--` line comments and `/* */` block comments before grepping to cut false positives.
- Filter `sys.sql_expression_dependencies` by `referenced_database_name <> '<dbname>'` literal — `DB_NAME()` in a cross-DB query returns the *connection* DB, not the target DB, which produces phantom self-references (hit during initial implementation).
