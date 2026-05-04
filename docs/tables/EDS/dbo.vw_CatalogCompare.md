# View: `dbo.vw_CatalogCompare`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CatalogIdOld` | int | YES |  |  |
| 2 | `CrossRefId` | int | NO |  |  |
| 3 | `VendorItemCodeOld` | varchar(50) | YES |  |  |
| 4 | `PageOld` | char(4) | YES |  |  |
| 5 | `CatalogPriceOld` | money | YES |  |  |
| 6 | `GrossPriceOld` | money | YES |  |  |
| 7 | `DoNotDiscountOld` | int | YES |  |  |
| 8 | `DescriptionOld` | varchar(512) | YES |  |  |
| 9 | `UnitCodeOld` | varchar(20) | YES |  |  |
| 10 | `NewCatalogId` | int | YES |  |  |
| 11 | `sysid` | int | NO |  |  |
| 12 | `VendorItemCodeNew` | varchar(50) | YES |  |  |
| 13 | `PageNew` | int | YES |  |  |
| 14 | `CatalogPriceNew` | money | YES |  |  |
| 15 | `GrossPriceNew` | money | YES |  |  |
| 16 | `DoNotDiscountNew` | int | YES |  |  |
| 17 | `DescriptionNew` | varchar(512) | YES |  |  |
| 18 | `UnitCodeNew` | varchar(16) | YES |  |  |
| 19 | `CatalogPriceChangePercent` | money | YES |  |  |
| 20 | `GrossPriceChangePercent` | money | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.CrossRefs`](dbo.CrossRefs.md) | USER_TABLE |
| [`dbo.Items`](dbo.Items.md) | USER_TABLE |
| `dbo.Master Catalog` | unresolved |
| [`dbo.Units`](dbo.Units.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[vw_CatalogCompare] as
select -- info from last year catalog via [crossrefs] table
       xr.CatalogId CatalogIdOld,  xr.CrossRefId, xr.VendorItemCode VendorItemCodeOld,
       xr.Page PageOld, xr.CatalogPrice CatalogPriceOld, xr.GrossPrice GrossPriceOld, xr.DoNotDiscount DoNotDiscountOld,  
       Items.Description DescriptionOld, Units.Code UnitCodeOld,
       -- info from this year catalog via [master catalog] 
       mc.CatalogId NewCatalogId,  mc.sysid, mc.VendorItemCode VendorItemCodeNew,
       mc.PageNumber PageNew, mc.CatalogPrice CatalogPriceNew, mc.GrossPrice GrossPriceNew, mc.NoDiscount DoNotDiscountNew,
       mc.Description DescriptionNew, mc.UnitCode UnitCodeNew,
       -- price comparisons
       case when mc.CatalogPrice=0 then 100 else ((mc.CatalogPrice - xr.CatalogPrice)/mc.CatalogPrice)* 100 end CatalogPriceChangePercent,
       case when mc.GrossPrice=0 then 100 else ((mc.GrossPrice - xr.GrossPrice)/mc.GrossPrice)* 100 end GrossPriceChangePercent
from catalogs.dbo.[Master Catalog] mc
join dbo.CrossRefs xr on isnull(ltrim(rtrim(xr.UniqueItemNumber)),'') = isnull(ltrim(rtrim(mc.UniqueItemNumber)),'')
                         and xr.Active = 1
left join dbo.Items on Items.ItemId = xr.ItemId  
left join dbo.Units on Units.UnitId = Items.UnitId                       
--where xr.CatalogId = 2879 and mc.CatalogId = 3056 
--where CatalogIdOld = 2879 and CatalogIdNew = 3056
--order by xr.Page
```
