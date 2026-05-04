# Function: inline table-valued: `null.uf_LookupPrice1`

_Generated on 2026-05-04T13:04:00.230Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `uf_LookupPrice1` |
| Kind | Function (inline TVF) |
| sys.objects.type | `IF` (SQL_INLINE_TABLE_VALUED_FUNCTION) |
| Created | 2002-10-06 15:23:03 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.Awards` | USER_TABLE |  |
| `dbo.BidItems` | USER_TABLE |  |
| `dbo.Bids` | USER_TABLE |  |
| `dbo.Catalog` | USER_TABLE |  |
| `dbo.CrossRefs` | USER_TABLE |  |
| `dbo.District` | USER_TABLE |  |
| `dbo.DistrictPP` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.PPCatalogs` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  function uf_LookupPrice1 (@pItemId int, @pCatalogId int, @pEffectiveDate datetime, @pDistrictId int)
returns table 
as
return(  -- Load Catalog Price for Item
    select Items.ItemId, CrossRefs.CrossRefId, case isnull(BidItems.BidItemId,0) when 0 then CrossRefs.CatalogPrice - round((CrossRefs.CatalogPrice * isnull(Awards.DiscountRate,0))/100,2) else BidItems.Price end BidPrice, CrossRefs.CatalogPrice GrossPrice, CrossRefs.CatalogPrice, Awards.AwardId, Catalog.VendorId, Awards.PricePlanId, CrossRefs.CatalogId, CrossRefs.VendorItemCode
      from dbo.Items
      join dbo.Awards on Awards.CategoryId = Items.CategoryId
                 and Awards.Active = 1
                 and Awards.BidStartDate <= @pEffectiveDate
                 and Awards.BidEndDate >= @pEffectiveDate
      join dbo.DistrictPP on DistrictPP.PricePlanId = Awards.PricePlanId
                     and DistrictPP.DistrictId = @pDistrictId
      join dbo.District on District.DistrictId = DistrictPP.DistrictId
      join dbo.PPCatalogs on PPCatalogs.PricePlanId = Awards.PricePlanId
      join dbo.Catalog on Catalog.CatalogId = Awards.CatalogId
      left outer join dbo.CrossRefs on CrossRefs.ItemId = Items.ItemId
                               and CrossRefs.Active = 1
                               and isnull(CrossRefs.CatalogId,0) = @pCatalogId
      join dbo.BidItems on BidItems.ItemId = Items.ItemId
                       and BidItems.AwardId = Awards.AwardId
      join dbo.Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
   where Items.ItemId = @pItemId
)
```
