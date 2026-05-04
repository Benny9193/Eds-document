# Procedure: `dbo.sp_UnpostCatalog`

_Generated on 2026-05-04T13:04:24.191Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UnpostCatalog` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-01-03 22:11:08 |
| Modified | 2025-04-09 15:57:20 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@CatalogId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidItems` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `dbo.Master Catalog` | unresolved | `Catalogs` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_UnpostCatalog] @CatalogId int
as
--Delete CrossRefs
Delete CrossRefs
  from CrossRefs with (rowlock, updlock)
--  join Catalogs.dbo.[Master Catalog] mc on mc.CrossRefId = CrossRefs.CrossRefId
 where CrossRefs.CatalogId = @CatalogId
   and not exists (select DetailId
                     from Detail with (nolock)
                    where Detail.ItemId = CrossRefs.ItemId)
   and not exists (select BidItems.BidItemId
                     from BidItems with (nolock)
                    where BidItems.ItemId = CrossRefs.ItemId
                      and BidItems.CrossRefId = CrossRefs.CrossRefId)

--Check for item having no other references and no ordering info
Delete CrossRefs
  from Catalogs.dbo.[Master Catalog] mc with (rowlock, updlock)
  join Items on Items.ItemId = mc.ItemId
  join CrossRefs on CrossRefs.ItemId = Items.ItemId
 where mc.CatalogId = @CatalogId
   and not exists (select CrossRefId 
                     from CrossRefs xr with (nolock) 
                     join Catalog cat on Cat.CatalogId = xr.CatalogId
                                     and Cat.Name != 'EDS'
                    where xr.ItemId = Items.ItemId 
                      and xr.Active = 1)
   and not exists (select DetailId
                     from Detail with (nolock)
                    where Detail.ItemId = Items.ItemId)

Delete Items
  from Catalogs.dbo.[Master Catalog] mc with (rowlock, updlock)
  join Items on Items.ItemId = mc.ItemId
--  join CrossRefs on CrossRefs.ItemId = Items.ItemId
 where mc.CatalogId = @CatalogId
   and not exists(select bri.BidRequestItemId
                    from BidRequestItems bri
                   where bri.ItemId = Items.ItemId)
   and not exists (select CrossRefId 
                     from CrossRefs xr with (nolock) 
                     join Catalog cat on Cat.CatalogId = xr.CatalogId
                                     and Cat.Name != 'EDS'
                    where xr.ItemId = Items.ItemId 
                      and xr.Active = 1)
   and not exists (select DetailId
                     from Detail with (nolock)
                    where Detail.ItemId = Items.ItemId)

Update mc
   set CrossRefId = CrossRefs.CrossRefId,
       ItemId = Items.ItemId
  from Catalogs.dbo.[Master Catalog] mc with (rowlock, updlock)
  left outer join CrossRefs on CrossRefs.CrossRefId = mc.CrossRefId
  left outer join Items on Items.ItemId = mc.ItemId
 where mc.CatalogId = @CatalogId
```
