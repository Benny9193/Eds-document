# Function: table-valued: `dbo.uf_LookupPrice`

_Generated on 2026-05-04T13:07:57.651Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_LookupPrice` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2004-05-27 15:10:26 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pItemId` | IN | int |  |
| 2 | `@pEffectiveDate` | IN | datetime |  |
| 3 | `@pPricePlanId` | IN | int |  |
| 4 | `@pDistrictId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Units` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `dbo.Catalog` | USER_TABLE |  |
| `dbo.Category` | USER_TABLE |  |
| `dbo.CrossRefs` | USER_TABLE |  |
| `dbo.DistrictPP` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.PPCategory` | USER_TABLE |  |
| `dbo.Prices` | USER_TABLE |  |
| `dbo.Units` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE       function dbo.uf_LookupPrice (@pItemId int, @pEffectiveDate datetime, @pPricePlanId int, @pDistrictId int)
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
VendorItemCode	varchar(50) null,
Alternate       varchar(1024) null,
BidItemId	int null,
ParentCatalogId int null,
ItemCode	varchar(50) null,
Description	varchar(1024) null,
UnitId		int null,
UnitCode	varchar(16) null,
PriceId		int null,
Page		varchar(16) null,
CatalogYear     char(02) null,
DiscountRate	decimal(9,5) null,
Name		varchar(255) null,
VendorName	varchar(255) null,
CategoryId	int null,
PackedItemCode	varchar(50) null,
PackedVendorItemCode varchar(50) null,
ItemCount	int null,
ItemMustBeBid	int null
)
 
as
begin
declare @CrossRefId int,	
	@PricePlanId int,
	@DistrictId int,
	@CrossRefIdBid int,
	@BidItemId int,
	@AwardId int,
	@ItemCount int,
	@CategoryId int,
	@Type int

  Select @PricePlanId = isnull(@pPricePlanId,0),
	 @DistrictId = isnull(@pDistrictId,0)

  select @CategoryId = CategoryId
    from Items
   where ItemId = @pItemId

  select @Type = Type
    from Category
   where CategoryId = @CategoryId

  if @Type = 2
  begin
    insert @ItemTable ([ItemId], [CrossRefId], [CrossRefIdBid], [BidPrice], [GrossPrice], [CatalogPrice], [AwardId], [VendorId], [PricePlanId], [CatalogId], [VendorItemCode], [Alternate], [BidItemId], [ParentCatalogId], [ItemCode], [Description], [UnitId], [UnitCode], [Page], [CatalogYear], [DiscountRate], [Name], [VendorName], [CategoryId], [PackedItemCode], [PackedVendorItemCode] )
      SELECT top 1 Items.[ItemId], CrossRefs.[CrossRefId], null CrossRefIdBid, CrossRefs.GrossPrice [BidPrice], CrossRefs.GrossPrice [GrossPrice], CrossRefs.[CatalogPrice], Awards.[AwardId], Awards.[VendorId], Awards.[PricePlanId], CrossRefs.[CatalogId], CrossRefs.[VendorItemCode], null [Alternate], null [BidItemId], Items.[ParentCatalogId], Items.[ItemCode], Items.[Description], Items.[UnitId], Units.Code [UnitCode], CrossRefs.[Page], CrossRefs.[CatalogYear], null [DiscountRate], Catalog.[Name], Vendors.Name [VendorName], Items.[CategoryId], Items.PackedCode [PackedItemCode], CrossRefs.PackedCode [PackedVendorItemCode] 
        FROM Items
        join CrossRefs on CrossRefs.ItemId = Items.ItemId
                      and CrossRefs.Active = 1
        join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                    and Catalog.Active = 1
        join Awards on Awards.CategoryId = @CategoryId
                   and Awards.VendorId = Catalog.VendorId
                   and Awards.Active = 1
        join Vendors on Vendors.VendorId = Catalog.VendorId
        left outer join Units on Units.UnitId = Items.UnitId
       where Items.ItemId = @pItemId
       order by GrossPrice, CrossRefId
  end
  else
  begin
    if @PricePlanId = 0
    begin
      select top 1 @PricePlanId = DistrictPP.PricePlanId
        from dbo.DistrictPP
        join dbo.PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId
                           and PPCategory.CategoryId = @CategoryId
       where DistrictPP.DistrictId = @DistrictId
       order by DistrictPP.PricePlanId
    end

    insert @ItemTable ([ItemId], [CrossRefId], [CrossRefIdBid], [BidPrice], [GrossPrice], [CatalogPrice], [AwardId], [VendorId], [PricePlanId], [CatalogId], [VendorItemCode], [Alternate], [BidItemId], [ParentCatalogId], [ItemCode], [Description], [UnitId], [UnitCode], [Page], [CatalogYear], [DiscountRate], [Name], [VendorName], [CategoryId], [PackedItemCode], [PackedVendorItemCode] )
      SELECT top 1 [ItemId], [CrossRefId], [CrossRefIdBid], [BidPrice], [GrossPrice], [CatalogPrice], [AwardId], [VendorId], [PricePlanId], [CatalogId], [VendorItemCode], [Alternate], [BidItemId], [ParentCatalogId], [ItemCode], [Description], [UnitId], [UnitCode], [Page], [CatalogYear], [DiscountRate], [Name], [VendorName], [CategoryId], [PackedItemCode], [PackedVendorItemCode] 
        FROM dbo.Prices
       where Prices.PricePlanId = @PricePlanId
         and Prices.ItemId = @pItemId
       order by case isnull(BidItemId,0) when 0 then 1 else 0 end, BidPrice, CatalogYear desc, CrossRefId

    select @ItemCount = count(*)
      from (select ItemId from @ItemTable) it

    if @ItemCount = 0
    begin
      insert @ItemTable (ItemId, CrossRefId, CrossRefIdBid, BidPrice, GrossPrice, CatalogPrice, AwardId, VendorId, PricePlanId, CatalogId, VendorItemCode, ParentCatalogId, ItemCode, Description, UnitId, UnitCode, PriceId, Page, DiscountRate, Name, VendorName, CategoryId, PackedItemCode, BidItemId, Alternate, PackedVendorItemCode, ItemMustBeBid)
        select distinct I1.ItemId, CrossRefs.CrossRefId, null, CrossRefs.GrossPrice, CrossRefs.GrossPrice, CrossRefs.CatalogPrice, null, I1.VendorId, DistrictPP.PricePlanId, CrossRefs.CatalogId, CrossRefs.VendorItemCode, I1.ParentCatalogId, I1.ItemCode, I1.Description, I1.UnitId, Units.Code, null, CrossRefs.Page, null DiscountRate, Catalog.Name, Vendors.Name, I1.CategoryId, I1.PackedCode, null, 'Item Not Bid', CrossRefs.PackedCode, 1
          from dbo.Items I1
          join dbo.Units on Units.UnitId = I1.UnitId
          join dbo.Category on Category.CategoryId = I1.CategoryId
                           and Category.Active = 1
          join dbo.CrossRefs on CrossRefs.ItemId = I1.ItemId
                            and CrossRefs.Active = 1
          join dbo.Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                          and Catalog.Active = 1
          join dbo.PPCategory on PPCategory.CategoryId = Category.CategoryId
                             and PPCategory.AllowAddenda = 1
          join dbo.DistrictPP on DistrictPP.DistrictId = @DistrictId
                             and DistrictPP.PricePlanId = PPCategory.PricePlanId
          left outer join Vendors on Vendors.VendorId = I1.VendorId
         where I1.ItemId = @pItemId
--         order by Catalog.CatalogYear desc, Catalog.CatalogId Desc, CrossRefs.CrossRefId desc

      select @ItemCount = count(*)
        from (select ItemId from @ItemTable) it
    end
  end

  Update @ItemTable
     set ItemCount = @ItemCount

  return
end
```
