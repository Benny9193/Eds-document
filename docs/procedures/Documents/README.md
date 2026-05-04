# Procedures & Functions: `Documents`

_Generated on 2026-05-04T13:43:21.513Z_

**Database:** `Documents`

[← back to procedures index](../README.md)

## Summary

- Procedures: **12**
- Functions: **4**
- Encrypted: **0**
- Described (curated): **0**

## Procedures

| Name | Parameters | Created | Modified | Encrypted | Description |
|------|------------|---------|----------|-----------|-------------|
| [`dbo.sp_AcceptDocs`](dbo.sp_AcceptDocs.md) | 1 | 2014-11-18 23:31:13 | 2024-06-21 20:33:45 | no |  |
| [`dbo.sp_alterdiagram`](dbo.sp_alterdiagram.md) | 4 | 2014-07-08 14:52:56 | 2024-06-21 20:33:45 | no |  |
| [`dbo.sp_creatediagram`](dbo.sp_creatediagram.md) | 4 | 2014-07-08 14:52:56 | 2024-06-21 20:33:45 | no |  |
| [`dbo.sp_DeleteDocs`](dbo.sp_DeleteDocs.md) | 1 | 2014-11-19 11:15:20 | 2024-06-21 20:33:45 | no |  |
| [`dbo.sp_dropdiagram`](dbo.sp_dropdiagram.md) | 2 | 2014-07-08 14:52:56 | 2024-06-21 20:33:45 | no |  |
| [`dbo.sp_FieldMerge`](dbo.sp_FieldMerge.md) | 2 | 2014-10-08 14:39:03 | 2024-06-21 20:33:45 | no |  |
| [`dbo.sp_helpdiagramdefinition`](dbo.sp_helpdiagramdefinition.md) | 2 | 2014-07-08 14:52:56 | 2024-06-21 20:33:45 | no |  |
| [`dbo.sp_helpdiagrams`](dbo.sp_helpdiagrams.md) | 2 | 2014-07-08 14:52:56 | 2024-06-21 20:33:45 | no |  |
| [`dbo.sp_MultiEditCheck`](dbo.sp_MultiEditCheck.md) | 1 | 2014-11-25 14:57:27 | 2024-06-21 20:33:45 | no |  |
| [`dbo.sp_renamediagram`](dbo.sp_renamediagram.md) | 3 | 2014-07-08 14:52:56 | 2024-06-21 20:33:45 | no |  |
| [`dbo.sp_UpdateDocumentFields`](dbo.sp_UpdateDocumentFields.md) | 1 | 2014-12-30 19:58:32 | 2024-06-21 20:33:45 | no |  |
| [`dbo.sp_upgraddiagrams`](dbo.sp_upgraddiagrams.md) | 0 | 2014-07-08 14:52:56 | 2024-06-21 20:33:45 | no |  |

## Functions

| Name | Kind | Parameters | Created | Modified | Encrypted | Description |
|------|------|------------|---------|----------|-----------|-------------|
| [`dbo.fn_diagramobjects`](dbo.fn_diagramobjects.md) | Function (scalar) | 0 | 2014-07-08 14:52:56 | 2024-06-21 20:33:45 | no |  |
| [`dbo.ufn_LookupSelectFields`](dbo.ufn_LookupSelectFields.md) | Function (scalar) | 1 | 2017-03-08 20:35:18 | 2024-06-21 20:33:45 | no |  |
| [`dbo.ufn_LookupSelectStatement`](dbo.ufn_LookupSelectStatement.md) | Function (scalar) | 1 | 2017-03-08 20:38:54 | 2024-06-21 20:33:45 | no |  |
| [`dbo.ufn_LookupWhereFields`](dbo.ufn_LookupWhereFields.md) | Function (scalar) | 1 | 2017-03-08 13:41:13 | 2024-06-21 20:33:45 | no |  |

## Source queries

This page is rendered from the following catalog views:

- `INFORMATION_SCHEMA.ROUTINES` — routine kind and return type
- `INFORMATION_SCHEMA.PARAMETERS` — parameter list, mode, type
- `sys.objects` — object kind code (`P`/`FN`/`IF`/`TF`), create/modify dates
- `sys.sql_modules` — full T-SQL definition + `is_encrypted` flag
- `sys.parameters` — parameter defaults (not exposed via `INFORMATION_SCHEMA`)
- `sys.sql_expression_dependencies` — depends-on and called-by relationships
