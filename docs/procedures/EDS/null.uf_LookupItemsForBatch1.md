# Function: inline table-valued: `null.uf_LookupItemsForBatch1`

_Generated on 2026-05-04T13:04:00.226Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `uf_LookupItemsForBatch1` |
| Kind | Function (inline TVF) |
| sys.objects.type | `IF` (SQL_INLINE_TABLE_VALUED_FUNCTION) |
| Created | 2002-12-30 17:22:59 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.Awards` | USER_TABLE |  |
| `dbo.BatchDetail` | USER_TABLE |  |
| `dbo.BidItems` | USER_TABLE |  |
| `dbo.Bids` | USER_TABLE |  |
| `dbo.Catalog` | USER_TABLE |  |
| `dbo.CrossRefs` | USER_TABLE |  |
| `dbo.DistrictPP` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.PPCatalogs` | USER_TABLE |  |
| `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION |  |
| `dbo.Units` | USER_TABLE |  |
| `dbo.Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE    function EDSIQWebUser.uf_LookupItemsForBatch1 (@pEffectiveDate datetime, @pBatchId int)
returns table 
 
as
 return (
      select distinct BatchDetail.BatchDetailId, I1.ItemId, CrCat.CrossRefId, CrBid.CrossRefId CrossRefIdBid, case isnull(BidItems.BidItemId,0) when 0 then CrCat.GrossPrice - round((CrCat.GrossPrice * isnull(Awards.DiscountRate,0))/100,2) else BidItems.Price - round((BidItems.Price * isnull(Awards.BidDiscountRate,0))/100,2) end BidPrice, case isnull(BidItems.BidItemId,0) when 0 then CrCat.GrossPrice else BidItems.Price end GrossPrice, CrCat.CatalogPrice, Awards.AwardId, Vendors.VendorId, Awards.PricePlanId, CrCat.CatalogId, case isnull(BidItems.BidItemId,0) when 0 then CrCat.VendorItemCode else BidItems.VendorItemCode end VendorItemCode, I1.ParentCatalogId, I1.ItemCode, I1.Description, I1.UnitId, Units.Code UnitCode, null PriceId, CrCat.Page, case isnull(BidItems.BidItemId,0) when 0 then Awards.DiscountRate else Awards.BidDiscountRate end DiscountRate, Catalog.Name, Vendors.Name VendorName, I1.CategoryId, I1.PackedCode PackedItemCode, BidItems.BidItemId, BidItems.Alternate, case isnull(BidItems.ItemId,0) when 0 then CrCat.PackedCode else dbo.uf_PackCode(BidItems.VendorItemCode) end PackedVendorItemCode
        from dbo.Items I1
        join (
          select Items.ItemId, sCat.CrossRefId, sBid.CrossRefId CrossRefIdBid, case isnull(sBid.AwardId,0) when 0 then sCat.AwardId else sBid.AwardId end AwardId, sBid.BidItemId
            from dbo.Items
            left outer  join (
		    select Items.ItemId, CrCat.CrossRefId, Awards.AwardId
		      from dbo.Items
                      join dbo.BatchDetail on BatchDetail.PackedCode = Items.PackedCode
                                          and BatchDetail.CategoryId = Items.CategoryId
                                          and BatchDetail.Location is null
                                          and BatchDetail.BatchId = @pBatchId
                                          and BatchDetail.Active = 1
                                          and BatchDetail.ItemId is null
		      join dbo.Awards on Awards.CategoryId = Items.CategoryId
		                     and Awards.Active = 1
		                     and Awards.BidStartDate <= @pEffectiveDate
		                     and Awards.BidEndDate >= @pEffectiveDate
		      join dbo.DistrictPP on DistrictPP.PricePlanId = Awards.PricePlanId
		                         and DistrictPP.DistrictId = BatchDetail.DistrictId
		      join dbo.CrossRefs CrCat on CrCat.ItemId = Items.ItemId
		                              and CrCat.CatalogId != 0
		                              and CrCat.CatalogId = Awards.CatalogId
		                              and CrCat.Active = 1
                      join dbo.PPCatalogs on PPCatalogs.PricePlanId = DistrictPP.PricePlanId
                                         and PPCatalogs.CategoryId = Items.CategoryId
                                         and PPCatalogs.CatalogId = Awards.CatalogId
		     where Items.Active = 1
                               ) sCat on sCat.ItemId = Items.ItemId
            left outer join (
		    select Items.ItemId, CrBid.CrossRefId, BidItems.BidItemId, Awards.AwardId
		      from dbo.Items
                      join dbo.BatchDetail on BatchDetail.PackedCode = Items.PackedCode
                                          and BatchDetail.CategoryId = Items.CategoryId
                                          and BatchDetail.Location is null
                                          and BatchDetail.BatchId = @pBatchId
                                          and BatchDetail.Active = 1
                                          and BatchDetail.ItemId is null
		      join dbo.Awards on Awards.CategoryId = Items.CategoryId
		                     and Awards.Active = 1
		                     and Awards.BidStartDate <= @pEffectiveDate
		                     and Awards.BidEndDate >= @pEffectiveDate
		      join dbo.DistrictPP on DistrictPP.PricePlanId = Awards.PricePlanId
		                         and DistrictPP.DistrictId = BatchDetail.DistrictId
		      join dbo.BidItems on BidItems.ItemId = Items.ItemId
		                                  and BidItems.AwardId = Awards.AwardId
		      join dbo.Bids on Bids.BidId = BidItems.BidId
		                              and Bids.Active = 1
		      join dbo.CrossRefs CrBid on CrBid.ItemId = Items.ItemId
		                                         and isnull(CrBid.CatalogId,0) = 0
		                                         and CrBid.Active = 1
		     where Items.Active = 1
                             ) sBid on sBid.ItemId = Items.ItemId
	     where Items.Active = 1
            ) ss on ss.ItemId = I1.ItemId
        join dbo.Awards on Awards.AwardId = ss.AwardId
        join dbo.Vendors on Vendors.VendorId = Awards.VendorId
        join dbo.BatchDetail on BatchDetail.PackedCode = I1.PackedCode
                            and BatchDetail.CategoryId = I1.CategoryId
                            and BatchDetail.Location is null
                            and BatchDetail.BatchId = @pBatchId
                            and BatchDetail.Active = 1
                            and BatchDetail.ItemId is null
        left outer join dbo.Catalog on Catalog.CatalogId = Awards.CatalogId
        left outer join dbo.Units on Units.UnitId = I1.UnitId
        left outer join dbo.CrossRefs CrCat on CrCat.CrossRefId = ss.CrossRefId
        left outer join dbo.CrossRefs CrBid on CrBid.CrossRefId = ss.CrossRefIdBid
        left outer join dbo.BidItems on BidItems.BidItemId = ss.BidItemId
                                    and BidItems.AwardId = Awards.AwardId
        left outer join dbo.Bids on Bids.BidId = BidItems.BidId
       where I1.Active = 1

union (
      select distinct BatchDetail.BatchDetailId, I1.ItemId, CrCat.CrossRefId, CrBid.CrossRefId CrossRefIdBid, case isnull(BidItems.BidItemId,0) when 0 then CrCat.GrossPrice - round((CrCat.GrossPrice * isnull(Awards.DiscountRate,0))/100,2) else BidItems.Price - round((BidItems.Price * isnull(Awards.BidDiscountRate,0))/100,2) end BidPrice, case isnull(BidItems.BidItemId,0) when 0 then CrCat.GrossPrice else BidItems.Price end GrossPrice, CrCat.CatalogPrice, Awards.AwardId, Vendors.VendorId, Awards.PricePlanId, CrCat.CatalogId, case isnull(BidItems.BidItemId,0) when 0 then CrCat.VendorItemCode else BidItems.VendorItemCode end VendorItemCode, I1.ParentCatalogId, I1.ItemCode, I1.Description, I1.UnitId, Units.Code UnitCode, null PriceId, CrCat.Page, case isnull(BidItems.BidItemId,0) when 0 then Awards.DiscountRate else Awards.BidDiscountRate end DiscountRate, Catalog.Name, Vendors.Name VendorName, I1.CategoryId, I1.PackedCode PackedItemCode, BidItems.BidItemId, BidItems.Alternate, case isnull(BidItems.ItemId,0) when 0 then CrCat.PackedCode else dbo.uf_PackCode(BidItems.VendorItemCode) end PackedVendorItemCode
        from dbo.Items I1
        join (
          select Items.ItemId, sCat.CrossRefId, sBid.CrossRefId CrossRefIdBid, case isnull(sBid.AwardId,0) when 0 then sCat.AwardId else sBid.AwardId end AwardId, sBid.BidItemId
            from dbo.Items
            left outer  join (
		    select Items.ItemId, CrCat.CrossRefId, Awards.AwardId
		      from dbo.Items
		      join dbo.Awards on Awards.CategoryId = Items.CategoryId
		                     and Awards.Active = 1
		                     and Awards.BidStartDate <= @pEffectiveDate
		                     and Awards.BidEndDate >= @pEffectiveDate
		      join dbo.DistrictPP on DistrictPP.PricePlanId = Awards.PricePlanId
		      join dbo.CrossRefs CrCat on CrCat.ItemId = Items.ItemId
		                              and CrCat.CatalogId != 0
		                              and CrCat.CatalogId = Awards.CatalogId
		                              and CrCat.Active = 1
                      join dbo.PPCatalogs on PPCatalogs.PricePlanId = DistrictPP.PricePlanId
                   and PPCatalogs.CategoryId = Items.CategoryId
                                         and PPCatalogs.CatalogId = Awards.CatalogId
                      join dbo.BatchDetail on BatchDetail.PackedCode = CrCat.PackedCode
                                          and BatchDetail.BatchId = @pBatchId
                                          and BatchDetail.Active = 1
                                          and BatchDetail.ItemId is null
                      join dbo.Catalog on Catalog.CrossRefLetter = BatchDetail.Location
                                      and Catalog.CategoryId = BatchDetail.CategoryId
                                      and Catalog.Active = 1
		     where Items.Active = 1
                       and DistrictPP.DistrictId = BatchDetail.DistrictId
                               ) sCat on sCat.ItemId = Items.ItemId
            left outer join (
		    select Items.ItemId, CrBid.CrossRefId, BidItems.BidItemId, Awards.AwardId
		      from dbo.Items
		      join dbo.Awards on Awards.CategoryId = Items.CategoryId
		                     and Awards.Active = 1
		                     and Awards.BidStartDate <= @pEffectiveDate
		                     and Awards.BidEndDate >= @pEffectiveDate
		      join dbo.DistrictPP on DistrictPP.PricePlanId = Awards.PricePlanId
		      join dbo.BidItems on BidItems.ItemId = Items.ItemId
		                                  and BidItems.AwardId = Awards.AwardId
		      join dbo.Bids on Bids.BidId = BidItems.BidId
		                              and Bids.Active = 1
		      join dbo.CrossRefs CrBid on CrBid.ItemId = Items.ItemId
		                                         and isnull(CrBid.CatalogId,0) = 0
		                                         and CrBid.Active = 1
                      join dbo.BatchDetail on BatchDetail.PackedCode = CrBid.PackedCode
                                          and BatchDetail.Location is not null
                                          and BatchDetail.BatchId = @pBatchId
                                          and BatchDetail.Active = 1
                                          and BatchDetail.ItemId is null
                      join dbo.Catalog on Catalog.CrossRefLetter = BatchDetail.Location
                                      and Catalog.CategoryId = BatchDetail.CategoryId
                                      and Catalog.Active = 1
		     where Items.Active = 1
                       and DistrictPP.DistrictId = BatchDetail.DistrictId
                             ) sBid on sBid.ItemId = Items.ItemId
	     where Items.Active = 1
            ) ss on ss.ItemId = I1.ItemId
        join dbo.Awards on Awards.AwardId = ss.AwardId
        join dbo.Vendors on Vendors.VendorId = Awards.VendorId
        left outer join dbo.Catalog on Catalog.CatalogId = Awards.CatalogId
        left outer join dbo.Units on Units.UnitId = I1.UnitId
        left outer join dbo.CrossRefs CrCat on CrCat.CrossRefId = ss.CrossRefId
        left outer join dbo.CrossRefs CrBid on CrBid.CrossRefId = ss.CrossRefIdBid
        left outer join dbo.BidItems on BidItems.BidItemId = ss.BidItemId
                                    and BidItems.AwardId = Awards.AwardId
        left outer join dbo.Bids on Bids.BidId = BidItems.BidId
        join dbo.BatchDetail on BatchDetail.PackedCode = CrCat.PackedCode
                            and BatchDetail.Location is not null
                            and BatchDetail.BatchId = @pBatchId
                            and BatchDetail.Active = 1
                            and BatchDetail.ItemId is null
        join dbo.Catalog Cat1 on Cat1.CrossRefLetter = BatchDetail.Location
                             and Cat1.CategoryId = BatchDetail.CategoryId
                             and Cat1.Active = 1
       where I1.Active = 1
         and Cat1.CatalogId = CrCat.CatalogId
  )
)
```
