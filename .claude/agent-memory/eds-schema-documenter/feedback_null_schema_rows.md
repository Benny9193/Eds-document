---
name: Defensive null-schema filter for sys.objects
description: sys.objects on EDS occasionally returns rows with NULL schema or name; always filter before sorting/rendering.
type: feedback
---

When iterating `sys.objects` results on the EDS Azure SQL Server, filter out rows where `SCHEMA_NAME(schema_id)` or `o.name` is NULL before any `localeCompare`/path-building.

**Why:** Without the filter, the renderer blew up with `Cannot read properties of null (reading 'localeCompare')` mid-run. The bad rows appear to be edge cases (possibly orphaned system metadata), not real user objects worth documenting.

**How to apply:** In any new introspection script that pulls from `sys.objects`, follow the pattern:
```js
info.modules = info.modules.filter((m) => m.schema && m.name);
```
…before sorting or path generation. Do this even if the SQL filters by `o.type IN ('P','FN','IF','TF')`.
