---
name: Azure SQL is_encrypted location
description: On the EDS Azure SQL Server, sys.sql_modules.is_encrypted does not exist; use OBJECTPROPERTY instead.
type: feedback
---

When querying for encrypted procedure/function definitions on the EDS Azure SQL Server, do NOT select `m.is_encrypted` from `sys.sql_modules` — the column is unavailable on this instance and the query fails with `Invalid column name 'is_encrypted'`.

**Why:** Azure SQL DB exposes a more limited `sys.sql_modules` than on-prem SQL Server. The encryption flag is reachable via `OBJECTPROPERTY(object_id, 'IsEncrypted')` on `sys.objects`, or by checking whether `sys.sql_modules.definition` is NULL.

**How to apply:** In any cross-DB introspection query targeting Azure SQL, prefer `CAST(OBJECTPROPERTY(o.object_id, 'IsEncrypted') AS bit) AS is_encrypted` joined from `sys.objects` rather than reading the column directly off `sys.sql_modules`.
