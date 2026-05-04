# Procedure: `dbo.sp_CatalogPrepareForPost`

_Generated on 2026-05-04T13:43:20.004Z_

**Database:** `Catalogs` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CatalogPrepareForPost` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2015-03-09 14:10:39 |
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
| `dbo.uf_PackCodeCatalog` | unresolved | `eds` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_CatalogPrepareForPost] @pCatalogId int as
declare @catalogId int, @ImportFormat int, @CategoryId int

select @CatalogId = CatalogId, @ImportFormat = ImportFormat, @CategoryId = CategoryId
  from EDS.dbo.Catalog
 where CatalogId = @pCatalogId

Update mc
   set PackedCode = eds.dbo.uf_PackCodeCatalog(VendorItemCode,@catalogId)
  from [Master Catalog] mc
 where mc.CatalogId = @catalogId

/* possible new code to replace segment below 
Update mc
   set UniqueItemNumber = case 
                          when isnull(rtrim(ltrim(mc.UniqueItemNumber)),'') = '' 
                          then PackedCode 
                          else eds.dbo.uf_PackCode(mc.UniqueItemNumber) 
                          end
  from [Master Catalog] mc
 where mc.CatalogId = @catalogId
*/ 

Update mc
   set UniqueItemNumber = PackedCode
  from [Master Catalog] mc
 where mc.CatalogId = @catalogId
   and isnull(rtrim(ltrim(mc.UniqueItemNumber)),'') = ''

-- Remove duplicates involving only multiple pages
DELETE MC1 
--Select MC1.UniqueItemNumber, MC1.PageNumber, MC2.PageNumber, *
FROM [Master Catalog] MC1
JOIN [Master Catalog] MC2 ON MC2.SysId = (Select Top 1 MC3.SysId 
                                          From [Master Catalog] MC3
                                          Where MC3.CatalogId = @CatalogId
                                            AND MC3.UniqueItemNumber = MC1.UniqueItemNumber 
                                            AND MC3.CatalogPrice = MC1.CatalogPrice
                                            AND MC3.GrossPrice = MC1.GrossPrice
                                            AND MC3.Description = MC1.Description
                                            AND MC3.UnitCode = MC1.UnitCode
                                            AND MC3.NoDiscount = MC1.NoDiscount
                                          Order By Case Isnull(MC3.PageNumber,0) When 0 Then 9999 Else MC3.PageNumber End, MC3.SysId)
Where MC1.CatalogId = @CatalogId and MC1.SysId != MC2.SysId
--Order by MC1.UniqueItemNumber

-- Make sure UniqueItemNumber is set for other vendor catalogs (this deals with catalogs imported before the "UniqueItemNumber" was implemented.)
-- Note: this code is also done in the "post" code.  Added here 11/18/16 to allow testing for crossrefs BEFORE posting.
update xr
   set UniqueItemNumber = eds.dbo.uf_PackCodeCatalog(xr.VendorItemCode,xr.CatalogId)
  from eds.dbo.Catalog Catalog
  join eds.dbo.Catalog Catalog1 on Catalog1.CategoryId = Catalog.CategoryId
                               and Catalog1.VendorId = Catalog.VendorId
                               and Catalog1.Active = 1
                               and Catalog1.CatalogId != Catalog.CatalogId
  join eds.dbo.CrossRefs xr on xr.CatalogId = catalog1.CatalogId
                           and xr.Active = 1
                           and xr.UniqueItemNumber is null
 where Catalog.CatalogId = @CatalogId

/*
-- Unresolved Duplicates
If Exists
(
SELECT UniqueItemNumber, count(*)
FROM [Catalogs].[dbo].[Master Catalog]
where catalogid=@CatalogId 
group by UniqueItemNumber having count(*) > 1
)
BEGIN
  RAISERROR('Unresolved duplicates were found, process cancelled.',16,1)
  return
END
*/
```
