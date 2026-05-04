# Procedures & Functions: `NJ_RTK`

_Generated on 2026-05-04T14:49:13.962Z_

**Database:** `NJ_RTK`

[← back to procedures index](../README.md)

## Summary

- Procedures: **3**
- Functions: **2**
- Encrypted: **0**
- Described (curated): **0**

## Procedures

| Name | Parameters | Created | Modified | Encrypted | Description |
|------|------------|---------|----------|-----------|-------------|
| [`dbo.sp_refreshEmployer`](dbo.sp_refreshEmployer.md) | 3 | 2015-01-13 17:58:58 | 2024-06-21 19:09:19 | no |  |
| [`dbo.sp_refreshFacility`](dbo.sp_refreshFacility.md) | 10 | 2015-01-13 19:54:07 | 2024-06-21 19:09:19 | no |  |
| [`dbo.usp_UpdateSurvey`](dbo.usp_UpdateSurvey.md) | 13 | 2017-07-27 11:08:02 | 2024-06-21 19:09:19 | no |  |

## Functions

| Name | Kind | Parameters | Created | Modified | Encrypted | Description |
|------|------|------------|---------|----------|-----------|-------------|
| [`dbo.uf_SanitizeData`](dbo.uf_SanitizeData.md) | Function (scalar) | 1 | 2015-01-16 12:46:59 | 2024-06-21 19:09:19 | no |  |
| [`dbo.uf_SanitizeDataTest`](dbo.uf_SanitizeDataTest.md) | Function (scalar) | 1 | 2015-02-02 21:00:47 | 2024-06-21 19:09:19 | no |  |

## Source queries

This page is rendered from the following catalog views:

- `INFORMATION_SCHEMA.ROUTINES` — routine kind and return type
- `INFORMATION_SCHEMA.PARAMETERS` — parameter list, mode, type
- `sys.objects` — object kind code (`P`/`FN`/`IF`/`TF`), create/modify dates
- `sys.sql_modules` — full T-SQL definition + `is_encrypted` flag
- `sys.parameters` — parameter defaults (not exposed via `INFORMATION_SCHEMA`)
- `sys.sql_expression_dependencies` — depends-on and called-by relationships
