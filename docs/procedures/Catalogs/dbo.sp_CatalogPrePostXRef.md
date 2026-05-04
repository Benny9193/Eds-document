# Procedure: `dbo.sp_CatalogPrePostXRef`

_Generated on 2026-05-04T13:43:20.005Z_

**Database:** `Catalogs` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CatalogPrePostXRef` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2015-03-17 15:11:25 |
| Modified | 2018-01-22 20:51:48 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pCatalogId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Master Catalog` | USER_TABLE |  |
| `dbo.Catalog` | unresolved | `EDS` |
| `dbo.CrossRefs` | unresolved | `eds` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_CatalogPrePostXRef] @pCatalogId int as
declare @catalogId int, @ImportFormat int, @CategoryId int

select @CatalogId = CatalogId, @ImportFormat = case when isnull(ImportFormat,0) in (0,1) then 4 else ImportFormat end, @CategoryId = CategoryId
  from EDS.dbo.Catalog
 where CatalogId = @pCatalogId

--select count(*) from [Master Catalog] where CatalogId = 3051 

if @ImportFormat = 4 
begin

Select count(*) from
(
select mc.sysid
  from [Master Catalog] mc
  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
  join eds.dbo.Catalog Catalog1 on Catalog1.CategoryId = Catalog.CategoryId
                               and Catalog1.VendorId = Catalog.VendorId
                               and Catalog1.Active = 1
                               and Catalog1.CatalogId != Catalog.CatalogId
  join eds.dbo.CrossRefs Crossrefs on Crossrefs.CatalogId = Catalog1.CatalogId
                                  and isnull(ltrim(rtrim(CrossRefs.UniqueItemNumber)),'') = isnull(ltrim(rtrim(mc.UniqueItemNumber)),'')
                                  and Crossrefs.Active = 1
 where mc.CatalogId = @CatalogId 
 group by mc.sysid
 --order by mc.sysid
) ss

end
else
begin

Select count(*) from
(
select mc.sysid
  from [Master Catalog] mc
  join eds.dbo.Catalog Catalog on Catalog.CatalogId = mc.CatalogId
  join eds.dbo.Catalog Catalog1 on Catalog1.CategoryId = Catalog.CategoryId
                               and Catalog1.VendorId = Catalog.VendorId
                               and Catalog1.Active = 1
                               and Catalog1.CatalogId != Catalog.CatalogId
  join eds.dbo.CrossRefs Crossrefs on Crossrefs.CatalogId = Catalog1.CatalogId
                                  and case isnull(Catalog.ImportFormat,1) 
                                        when 4 then mc.PackedCode 
                                        else Crossrefs.PackedCode 
                                      end = mc.PackedCode
                                  and case isnull(Catalog.ImportFormat,1) 
                                      when 0 then isnull(ltrim(rtrim(mc.UniqueItemNumber)),'') 
                                      when 1 then isnull(ltrim(rtrim(mc.UniqueItemNumber)),'') 
                                      when 4 then isnull(ltrim(rtrim(CrossRefs.UniqueItemNumber)),'') 
                                      else isnull(ltrim(rtrim(CrossRefs.UniqueItemNumber)),'') 
                                      end = isnull(ltrim(rtrim(mc.UniqueItemNumber)),'')
--                                  and case Catalog.ImportFormat when 1 then isnull(ltrim(rtrim(mc.Manufacturor)),'') when 3 then isnull(ltrim(rtrim(CrossRefs.Manufacturor)),'') else isnull(ltrim(rtrim(mc.Manufacturor)),'') end = isnull(ltrim(rtrim(mc.Manufacturor)),'')
                                  and Crossrefs.Active = 1
 where mc.CatalogId = @CatalogId
 group by mc.sysid
 -- order by mc.sysid
) ss

end
```
