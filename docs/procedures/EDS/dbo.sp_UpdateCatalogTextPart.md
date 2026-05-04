# Procedure: `dbo.sp_UpdateCatalogTextPart`

_Generated on 2026-05-04T13:07:57.538Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UpdateCatalogTextPart` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-07-31 22:48:04 |
| Modified | 2012-08-01 22:43:06 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pCatalogTextId` | IN | int |  |
| 2 | `@pPartText` | IN | varchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `CatalogTextParts` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_UpdateCatalogTextPart] @pCatalogTextId int, @pPartText varchar(max)
as
		
  insert CatalogTextParts (CatalogTextId, TextPart)
    values (@pCatalogTextId, @pPartText)
```
