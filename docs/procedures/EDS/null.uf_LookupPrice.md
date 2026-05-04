# Function: table-valued: `null.uf_LookupPrice`

_Generated on 2026-05-04T13:04:00.229Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `uf_LookupPrice` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2003-07-02 01:43:17 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Vendors` | USER_TABLE |  |
| `dbo.Awards` | USER_TABLE |  |
| `dbo.BidItems` | USER_TABLE |  |
| `dbo.Bids` | USER_TABLE |  |
| `dbo.Catalog` | USER_TABLE |  |
| `dbo.Category` | USER_TABLE |  |
| `dbo.CrossRefs` | USER_TABLE |  |
| `dbo.DistrictPP` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.PPCatalogs` | USER_TABLE |  |
| `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION |  |
| `dbo.Units` | USER_TABLE |  |
| `dbo.Vendors` | USER_TABLE |  |

## Called by

| Caller | Type |
|--------|------|
| `null.sp_CombineReqsNoDelete` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE                     function EDSIQWebUser.uf_LookupPrice (@pItemId int, @pEffectiveDate datetime, @pPricePlanId int, @pDistrictId int)
returns @ItemTable table (
ItemId		int null,
CrossRefId	int null,
CrossRefIdBid	int null,
BidPrice	money null,
GrossPrice	money null,
CatalogPrice	money null,
AwardId		int null,
VendorId	int null,
PricePlanId	int null,
CatalogId	int null,
VendorItemCode	varchar(32) null,
Alternate       varchar(1024) null,
BidItemId	int null,
ParentCatalogId int null,
ItemCode	varchar(50) null,
Description	varchar(1024) null,
UnitId		int null,
UnitCode	varchar(16) null,
PriceId		int null,
Page		varchar(16) null,
DiscountRate	decimal(9,5) null,
Name		varchar(255) null,
VendorName	varchar(255) null,
CategoryId	int null,
PackedItemCode	varchar(50) null,
PackedVendorItemCode varchar(50) null,
ItemCount	int
)
 
as
begin
declare @CrossRefId int,	
	@PricePlanId int,
	@DistrictId int,
	@CrossRefIdBid int,
	@BidItemId int,
	@AwardId int,
	@ItemCount int

  Select @PricePlanId = isnull(@pPricePlanId,0),
	 @DistrictId = isnull(@pDistrictId,0)

  if @DistrictId != 0
  begin
    -- Load Catalog and Bid Price for Item
    insert @ItemTable (ItemId, CrossRefId, CrossRefIdBid, BidPrice, GrossPrice, CatalogPrice, AwardId, VendorId, PricePlanId, CatalogId, VendorItemCode, ParentCatalogId, ItemCode, Description, UnitId, UnitCode, PriceId, Page, DiscountRate, Name, VendorName, CategoryId, PackedItemCode, BidItemId, Alternate, PackedVendorItemCode)
      select distinct I1.ItemId, CrCat.CrossRefId, CrBid.CrossRefId, case isnull(BidItems.BidItemId,0) when 0 then CrCat.GrossPrice - round((CrCat.GrossPrice * isnull(Awards.DiscountRate,0))/100,2) else BidItems.Price - round((BidItems.Price * isnull(Awards.BidDiscountRate,0))/100,2) end, case isnull(BidItems.BidItemId,0) when 0 then CrCat.GrossPrice else BidItems.Price end, CrCat.CatalogPrice, Awards.AwardId, Vendors.VendorId, Awards.PricePlanId, CrCat.CatalogId, case isnull(BidItems.BidItemId,0) when 0 then CrCat.VendorItemCode else BidItems.VendorItemCode end, I1.ParentCatalogId, I1.ItemCode, I1.Description, I1.UnitId, Units.Code, null, CrCat.Page, case isnull(BidItems.BidItemId,0) when 0 then Awards.DiscountRate else Awards.BidDiscountRate end DiscountRate, Catalog.Name, Vendors.Name, I1.CategoryId, I1.PackedCode, BidItems.BidItemId, BidItems.Alternate, case isnull(BidItems.ItemId,0) when 0 then CrCat.PackedCode else case BidItems.VendorItemCode when ss.ItemCode then CrCat.PackedCode else dbo.uf_PackCode(BidItems.VendorItemCode) end end
        from dbo.Items I1
        join (
          select Items.ItemId, Items.ItemCode, sCat.CrossRefId, sBid.CrossRefId CrossRefIdBid, case isnull(sBid.AwardId,0) when 0 then sCat.AwardId else sBid.AwardId end AwardId, sBid.BidItemId
            from dbo.Items
            left outer  join (
		    select Items.ItemId, CrCat.CrossRefId, Awards.AwardId
		      from dbo.Items
		      join dbo.Awards on Awards.CategoryId = Items.CategoryId
		                     and Awards.Active = 1
		                     and Awards.BidStartDate <= @pEffectiveDate
		                     and Awards.BidEndDate >= @pEffectiveDate
		      join dbo.DistrictPP on DistrictPP.PricePlanId = Awards.PricePlanId
		                         and DistrictPP.DistrictId = @DistrictId
		      join dbo.CrossRefs CrCat on CrCat.ItemId = Items.ItemId
		                              and CrCat.CatalogId != 0
		                              and CrCat.CatalogId = Awards.CatalogId
		                              and CrCat.Active = 1
                      join dbo.PPCatalogs on PPCatalogs.PricePlanId = DistrictPP.PricePlanId
                                         and PPCatalogs.CategoryId = Items.CategoryId
                                         and PPCatalogs.CatalogId = Awards.CatalogId
		     where Items.ItemId = @pItemId
	               and Items.Active = 1
                               ) sCat on sCat.ItemId = Items.ItemId
            left outer join (
		    select Items.ItemId, CrBid.CrossRefId, BidItems.BidItemId, Awards.AwardId
		      from dbo.Items
		      join dbo.Awards on Awards.CategoryId = Items.CategoryId
		                     and Awards.Active = case Awards.CategoryId when 41 then 9 else 1 end
		                     and Awards.BidStartDate <= @pEffectiveDate
		                     and Awards.BidEndDate >= @pEffectiveDate
		      join dbo.DistrictPP on DistrictPP.PricePlanId = Awards.PricePlanId
		                         and DistrictPP.DistrictId = @DistrictId
		      join dbo.BidItems on BidItems.ItemId = Items.ItemId
		                                  and BidItems.AwardId = Awards.AwardId
		      join dbo.Bids on Bids.BidId = BidItems.BidId
		                              and Bids.Active = 1
		      join dbo.CrossRefs CrBid on CrBid.ItemId = Items.ItemId
		                                         and isnull(CrBid.CatalogId,0) = 0
		                                         and CrBid.Active = 1
		     where Items.ItemId = @pItemId
	               and Items.Active = 1
                             ) sBid on sBid.ItemId = Items.ItemId
	     where Items.ItemId = @pItemId
               and Items.Active = 1
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
       where I1.ItemId = @pItemId
         and I1.Active = 1
  end
  else
  begin
    -- Load Catalog Price for Item
    insert @ItemTable (ItemId, CrossRefId, CrossRefIdBid, BidPrice, GrossPrice, CatalogPrice, AwardId, VendorId, PricePlanId, CatalogId, VendorItemCode, ParentCatalogId, ItemCode, Description, UnitId, UnitCode, PriceId, Page, DiscountRate, Name, VendorName, CategoryId, PackedItemCode, BidItemId, Alternate, PackedVendorItemCode)
      select distinct I1.ItemId, CrCat.CrossRefId, CrBid.CrossRefId, case isnull(BidItems.BidItemId,0) when 0 then CrCat.GrossPrice - round((CrCat.GrossPrice * isnull(Awards.DiscountRate,0))/100,2) else BidItems.Price - round((BidItems.Price * isnull(Awards.BidDiscountRate,0))/100,2) end, case isnull(BidItems.BidItemId,0) when 0 then CrCat.GrossPrice else BidItems.Price end, CrCat.CatalogPrice, Awards.AwardId, Vendors.VendorId, Awards.PricePlanId, CrCat.CatalogId, case isnull(BidItems.BidItemId,0) when 0 then CrCat.VendorItemCode else BidItems.VendorItemCode end, I1.ParentCatalogId, I1.ItemCode, I1.Description, I1.UnitId, Units.Code, null, CrCat.Page, case isnull(BidItems.BidItemId,0) when 0 then Awards.DiscountRate else Awards.BidDiscountRate end DiscountRate, Catalog.Name, Vendors.Name, I1.CategoryId, I1.PackedCode, BidItems.BidItemId, BidItems.Alternate, case isnull(BidItems.ItemId,0) when 0 then CrCat.PackedCode else case BidItems.VendorItemCode when ss.ItemCode then CrCat.PackedCode else dbo.uf_PackCode(BidItems.VendorItemCode) end end
        from dbo.Items I1
        join (
          select Items.ItemId, Items.ItemCode, sCat.CrossRefId, sBid.CrossRefId CrossRefIdBid, case isnull(sBid.AwardId,0) when 0 then sCat.AwardId else sBid.AwardId end AwardId, sBid.BidItemId
            from dbo.Items
            left outer  join (
		    select Items.ItemId, CrCat.CrossRefId, Awards.AwardId
		      from dbo.Items
		      join dbo.Awards on Awards.CategoryId = Items.CategoryId
		                     and Awards.Active = 1
		                     and Awards.BidStartDate <= @pEffectiveDate
		                     and Awards.BidEndDate >= @pEffectiveDate
                                     and Awards.PricePlanId = @PricePlanId
		      join dbo.CrossRefs CrCat on CrCat.ItemId = Items.ItemId
		                              and CrCat.CatalogId != 0
		                              and CrCat.CatalogId = Awards.CatalogId
		                              and CrCat.Active = 1
                      join dbo.PPCatalogs on PPCatalogs.PricePlanId = @PricePlanId
                                         and PPCatalogs.CategoryId = Items.CategoryId
                                         and PPCatalogs.CatalogId = Awards.CatalogId
		     where Items.ItemId = @pItemId
	               and Items.Active = 1
                               ) sCat on sCat.ItemId = Items.ItemId
            left outer join (
		    select Items.ItemId, CrBid.CrossRefId, BidItems.BidItemId, Awards.AwardId
		      from dbo.Items
		      join dbo.Awards on Awards.CategoryId = Items.CategoryId
		                     and Awards.Active = 1
		                     and Awards.BidStartDate <= @pEffectiveDate
		                     and Awards.BidEndDate >= @pEffectiveDate
                                     and Awards.PricePlanId = @PricePlanId
		      join dbo.BidItems on BidItems.ItemId = Items.ItemId
		                                  and BidItems.AwardId = Awards.AwardId
		      join dbo.Bids on Bids.BidId = BidItems.BidId
		                              and Bids.Active = 1
		      join dbo.CrossRefs CrBid on CrBid.ItemId = Items.ItemId
		                                         and isnull(CrBid.CatalogId,0) = 0
		                                         and CrBid.Active = 1
		     where Items.ItemId = @pItemId
	               and Items.Active = 1
                             ) sBid on sBid.ItemId = Items.ItemId
	     where Items.ItemId = @pItemId
               and Items.Active = 1
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
       where I1.ItemId = @pItemId
         and I1.Active = 1
  end

  select @ItemCount = count(*)
    from (select ItemId from @ItemTable) it

  if @ItemCount = 0
  begin
    insert @ItemTable (ItemId, CrossRefId, CrossRefIdBid, BidPrice, GrossPrice, CatalogPrice, AwardId, VendorId, PricePlanId, CatalogId, VendorItemCode, ParentCatalogId, ItemCode, Description, UnitId, UnitCode, PriceId, Page, DiscountRate, Name, VendorName, CategoryId, PackedItemCode, BidItemId, Alternate, PackedVendorItemCode)
      select distinct I1.ItemId, CrossRefs.CrossRefId, null, CrossRefs.GrossPrice, CrossRefs.GrossPrice, CrossRefs.CatalogPrice, null, I1.VendorId, DistrictPP.PricePlanId, CrossRefs.CatalogId, CrossRefs.VendorItemCode, I1.ParentCatalogId, I1.ItemCode, I1.Description, I1.UnitId, Units.Code, null, CrossRefs.Page, null DiscountRate, Catalog.Name, Vendors.Name, I1.CategoryId, I1.PackedCode, null, 'Item Not Bid', CrossRefs.PackedCode
        from dbo.Items I1
        join dbo.Units on Units.UnitId = I1.UnitId
        join dbo.Category on Category.CategoryId = I1.CategoryId
                         and Category.Active = 1
                         and Category.AllowAddenda = 1
        join dbo.CrossRefs on CrossRefs.ItemId = I1.ItemId
                          and CrossRefs.Active = 1
        join dbo.Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
                        and Catalog.Name = 'EDS'
        join dbo.PPCatalogs on PPCatalogs.CatalogId = Catalog.CatalogId
        join dbo.DistrictPP on DistrictPP.DistrictId = @DistrictId
                           and DistrictPP.PricePlanId = PPCatalogs.PricePlanId
        left outer join Vendors on Vendors.VendorId = I1.VendorId
       where I1.ItemId = @pItemId

    select @ItemCount = count(*)
      from (select ItemId from @ItemTable) it
  end

  Update @ItemTable
     set ItemCount = @ItemCount

  return
end
```
