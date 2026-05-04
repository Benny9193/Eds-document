# Function: table-valued: `dbo.uf_LookupItemCode`

_Generated on 2026-05-04T13:04:00.556Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_LookupItemCode` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2004-06-14 15:40:08 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pItemCode` | IN | varchar(255) |  |
| 2 | `@pCategoryId` | IN | int |  |
| 3 | `@pCatalogId` | IN | int |  |
| 4 | `@pEffectiveDate` | IN | datetime |  |
| 5 | `@pPricePlanId` | IN | int |  |
| 6 | `@pDistrictId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Vendors` | USER_TABLE |  |
| `dbo.Catalog` | USER_TABLE |  |
| `dbo.Category` | USER_TABLE |  |
| `dbo.CrossRefs` | USER_TABLE |  |
| `dbo.DistrictPP` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.PPCategory` | USER_TABLE |  |
| `dbo.Prices` | USER_TABLE |  |
| `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_PackCodeCatalog` | SQL_SCALAR_FUNCTION |  |
| `dbo.Units` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
/*
declare @td datetime
select @td = getdate()
select * from dbo.uf_LookupItemCode('C2012073',7,0,@td,1,0)
*/





CREATE    function dbo.uf_LookupItemCode (@pItemCode varchar(255), @pCategoryId int, @pCatalogId int, @pEffectiveDate datetime, @pPricePlanId int, @pDistrictId int)
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
	@CrossRefIdBid int,	
	@PricePlanId int,
	@DistrictId int,
	@CatalogId int,
	@ItemId int,
	@BidItemId int,
	@AwardId int,
	@CategoryId int,
	@ItemCount int,
	@ItemCode varchar(50),
	@DropSeq varchar(16)

  Select @PricePlanId = isnull(@pPricePlanId,0),
	 @DistrictId = isnull(@pDistrictId,0),
	 @CatalogId = isnull(@pCatalogId,0),
	 @CategoryId = isnull(@pCategoryId,0)

  if @CatalogId != 0
  begin
    select @ItemCode = dbo.uf_PackCodeCatalog(@pItemCode, @CatalogId)
  end
  else
  begin
    select @ItemCode = dbo.uf_PackCode(@pItemCode)
  end

  if @PricePlanId = 0
  begin
    select top 1 @PricePlanId = DistrictPP.PricePlanId
      from dbo.DistrictPP
      join dbo.PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId
                         and PPCategory.CategoryId = @CategoryId
     where DistrictPP.DistrictId = @DistrictId
     order by DistrictPP.PricePlanId
  end

  if @CatalogId = 0
  begin
    -- Load Bid Price for Item
    insert @ItemTable ([ItemId], [CrossRefId], [CrossRefIdBid], [BidPrice], [GrossPrice], [CatalogPrice], [AwardId], [VendorId], [PricePlanId], [CatalogId], [VendorItemCode], [Alternate], [BidItemId], [ParentCatalogId], [ItemCode], [Description], [UnitId], [UnitCode], [Page], [CatalogYear], [DiscountRate], [Name], [VendorName], [CategoryId], [PackedItemCode], [PackedVendorItemCode] )
      SELECT [ItemId], [CrossRefId], [CrossRefIdBid], [BidPrice], [GrossPrice], [CatalogPrice], [AwardId], [VendorId], [PricePlanId], [CatalogId], [VendorItemCode], [Alternate], [BidItemId], [ParentCatalogId], [ItemCode], [Description], [UnitId], [UnitCode], [Page], [CatalogYear], [DiscountRate], [Name], [VendorName], [CategoryId], [PackedItemCode], [PackedVendorItemCode] 
        from (
          select (select top 1 p1.PriceId
                    FROM dbo.Prices p1
                   where p1.ItemId = Prices.ItemId
                     and p1.PricePlanId = Prices.PricePlanId
                   order by case isnull(BidItemId,0) when 0 then 1 else 0 end, BidPrice, CatalogYear desc, CrossRefId
                  ) PriceId
            from dbo.Prices
           where CategoryId = @CategoryId
             and PricePlanId = @PricePlanId
             and PackedItemCode = @ItemCode
           group by Prices.ItemId, Prices.PricePlanId
             ) ss
         join dbo.Prices on Prices.PriceId = ss.PriceId
        order by Prices.VendorItemCode, Prices.ItemCode, Prices.PriceId
  end
  else
  begin
    -- Load Bid Price for Item(s)
    insert @ItemTable ([ItemId], [CrossRefId], [CrossRefIdBid], [BidPrice], [GrossPrice], [CatalogPrice], [AwardId], [VendorId], [PricePlanId], [CatalogId], [VendorItemCode], [Alternate], [BidItemId], [ParentCatalogId], [ItemCode], [Description], [UnitId], [UnitCode], [Page], [CatalogYear], [DiscountRate], [Name], [VendorName], [CategoryId], [PackedItemCode], [PackedVendorItemCode] )
      SELECT [ItemId], [CrossRefId], [CrossRefIdBid], [BidPrice], [GrossPrice], [CatalogPrice], [AwardId], [VendorId], [PricePlanId], [CatalogId], [VendorItemCode], [Alternate], [BidItemId], [ParentCatalogId], [ItemCode], [Description], [UnitId], [UnitCode], [Page], [CatalogYear], [DiscountRate], [Name], [VendorName], [CategoryId], [PackedItemCode], [PackedVendorItemCode] 
        from (
          select (select top 1 p1.PriceId
                    FROM dbo.Prices p1
                   where p1.ItemId = Prices.ItemId
                     and p1.PricePlanId = Prices.PricePlanId
                   order by case isnull(BidItemId,0) when 0 then 1 else 0 end, BidPrice, CatalogYear desc, CrossRefId
                  ) PriceId
            from dbo.Prices
           where CategoryId = @CategoryId
             and PricePlanId = @PricePlanId
             and CatalogId = @CatalogId
             and PackedVendorItemCode = @ItemCode
           group by Prices.ItemId, Prices.PricePlanId
             ) ss
         join dbo.Prices on Prices.PriceId = ss.PriceId
        order by Prices.VendorItemCode, Prices.ItemCode, Prices.PriceId
  end

  select @ItemCount = count(*)
    from (select ItemId from @ItemTable) it

  if @ItemCount = 0
  begin
    insert @ItemTable (ItemId, CrossRefId, CrossRefIdBid, BidPrice, GrossPrice, CatalogPrice, AwardId, VendorId, PricePlanId, CatalogId, VendorItemCode, ParentCatalogId, ItemCode, Description, UnitId, UnitCode, PriceId, Page, DiscountRate, Name, VendorName, CategoryId, PackedItemCode, BidItemId, Alternate, PackedVendorItemCode, ItemMustBeBid)
      select distinct I1.ItemId, CrossRefs.CrossRefId, null, CrossRefs.GrossPrice, CrossRefs.GrossPrice, CrossRefs.CatalogPrice, null, I1.VendorId, null PricePlanId, CrossRefs.CatalogId, CrossRefs.VendorItemCode, I1.ParentCatalogId, I1.ItemCode, I1.Description, I1.UnitId, Units.Code, null, CrossRefs.Page, null DiscountRate, Catalog.Name, Vendors.Name, I1.CategoryId, I1.PackedCode, null, 'Item Not Bid', CrossRefs.PackedCode, 1
        from dbo.Items I1
        join dbo.Units on Units.UnitId = I1.UnitId
        join dbo.Category on Category.CategoryId = I1.CategoryId
                         and Category.Active = 1
--                       and Category.AllowAddenda = 1
        join dbo.CrossRefs on CrossRefs.ItemId = I1.ItemId
                          and CrossRefs.PackedCode = @ItemCode
                          and CrossRefs.Active = 1
        join dbo.Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
                        and Catalog.Name = case isnull(Category.Type,0) when 2 then Catalog.Name else 'EDS' end
--        join dbo.DistrictPP on DistrictPP.DistrictId = @DistrictId
        join dbo.PPCategory on PPCategory.CategoryId = Category.CategoryId
--                           and PPCategory.PricePlanId = DistrictPP.PricePlanId 
                           and PPCategory.PricePlanId = @PricePlanId 
                           and PPCategory.AllowAddenda = 1
        left outer join Vendors on Vendors.VendorId = I1.VendorId
       where I1.Active = 1
         and I1.CategoryId = @CategoryId

    select @ItemCount = count(*)
      from (select ItemId from @ItemTable) it
  end

  Update @ItemTable
     set ItemCount = @ItemCount

  return
end
```
