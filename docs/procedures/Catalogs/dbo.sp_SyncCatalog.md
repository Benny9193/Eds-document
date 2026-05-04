# Procedure: `dbo.sp_SyncCatalog`

_Generated on 2026-05-04T13:07:58.743Z_

**Database:** `Catalogs` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_SyncCatalog` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2014-01-07 01:22:56 |
| Modified | 2018-01-23 12:24:17 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pMasterCatalogId` | IN | int |  |
| 2 | `@pSlaveCatalogId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Master Catalog` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure dbo.sp_SyncCatalog @pMasterCatalogId int, @pSlaveCatalogId int
as
update mcs
   set GrossPrice = mcm.GrossPrice,
       NoDiscount = mcm.NoDiscount,
       CatalogPrice = mcm.CatalogPrice
  from [Master Catalog] mcm
  join [Master Catalog] mcs on mcs.CatalogId = @pSlaveCatalogId
                           and mcs.PackedCode = mcm.PackedCode
 where mcm.CatalogId = @pMasterCatalogId
```
