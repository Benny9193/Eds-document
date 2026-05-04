# View: `dbo.vw_BidVendorsSinceLastYear`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `VendorId` | int | NO |  |  |
| 3 | `CategoryId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidRequestItems` | USER_TABLE |
| `DistrictPP` | USER_TABLE |
| `Items` | USER_TABLE |
| `VendorCategoryPP` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_BidVendorList`](dbo.vw_BidVendorList.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_BidVendorsSinceLastYear] as
    select bh1.BidHeaderId, Vendors.VendorId, Items.CategoryId
      from BidHeaders bh1 with (nolock)
/*      join BidHeaderDetail on BidHeaderDetail.BidHeaderId = bh1.BidHeaderId
      join Detail on Detail.DetailId = BidHeaderDetail.DetailId
*/
      join BidRequestItems on BidRequestItems.BidHeaderId = bh1.BidHeaderId
/*      join Items on Items.ItemId = Detail.ItemId*/
      join Items on Items.ItemId = BidRequestItems.ItemId
      join Vendors on Vendors.VendorId = Items.VendorId
                  and Vendors.Active = 1
     where bh1.BidAwardDate > DATEADD(year,-1,getdate())
       and bh1.Active = 1
/*     group by BidHeaderDetail.BidHeaderId, Vendors.VendorId, Items.CategoryId */
     group by bh1.BidHeaderId, Vendors.VendorId, Items.CategoryId
   union (
    select bh.BidHeaderId, VendorCategoryPP.VendorId, VendorCategoryPP.CategoryId
      from BidHeaders bh with (nolock)
      join DistrictPP on DistrictPP.PricePlanId = bh.PricePlanId
      join VendorCategoryPP on VendorCategoryPP.CategoryId = bh.CategoryId
                           and case isnull(VendorCategoryPP.PricePlanId,0) when 0 then bh.PricePlanId else VendorCategoryPP.PricePlanId end = bh.PricePlanId
                           and case isnull(VendorCategoryPP.DistrictId,0) when 0 then case isnull(bh.DistrictId,0) when 0 then DistrictPP.DistrictId else bh.DistrictId end else VendorCategoryPP.DistrictId end = case isnull(bh.DistrictId,0) when 0 then DistrictPP.DistrictId else bh.DistrictId end
      join Vendors on Vendors.VendorId = VendorCategoryPP.VendorId
                  and Vendors.Active = 1
     where bh.BidAwardDate > DATEADD(year,-1,getdate())
       and bh.Active = 1
     group by bh.BidHeaderId, VendorCategoryPP.VendorId, VendorCategoryPP.CategoryId
   )
```
