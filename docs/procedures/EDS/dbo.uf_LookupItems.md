# Function: table-valued: `dbo.uf_LookupItems`

_Generated on 2026-05-04T14:49:07.390Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_LookupItems` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2004-05-05 14:23:16 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pCategoryId` | IN | int |  |
| 2 | `@pEffectiveDate` | IN | datetime |  |
| 3 | `@pPricePlanId` | IN | int |  |
| 4 | `@pDistrictId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidsCatalogList` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `dbo.Awards` | USER_TABLE |  |
| `dbo.AwardsCatalogList` | USER_TABLE |  |
| `dbo.BidItems` | USER_TABLE |  |
| `dbo.Bids` | USER_TABLE |  |
| `dbo.Catalog` | USER_TABLE |  |
| `dbo.CrossRefs` | USER_TABLE |  |
| `dbo.DistrictPP` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.Units` | USER_TABLE |  |
| `dbo.Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE           function dbo.uf_LookupItems (@pCategoryId int, @pEffectiveDate datetime, @pPricePlanId int, @pDistrictId int)
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
BidHeaderId	int null
)
as
begin
declare @CrossRefId int,	
	@PricePlanId int,
	@DistrictId int,
	@CategoryId int,
	@ItemId int

  Select @PricePlanId = isnull(@pPricePlanId,0),
	 @DistrictId = isnull(@pDistrictId,0),
	 @CategoryId = isnull(@pCategoryId,0)

  if @PricePlanId = 0
  begin
    select @PricePlanId = DistrictPP.PricePlanId
      from dbo.DistrictPP
      join dbo.Awards on Awards.CategoryId = @CategoryId
                     and Awards.PricePlanId = DistrictPP.PricePlanId
                     and Awards.BidStartdate <= @pEffectiveDate
                     and Awards.BidEndDate >= @pEffectiveDate
                     and Awards.Active = 1
     where DistrictPP.DistrictId = @DistrictId
  end

    -- Load Catalog Price for Item
    insert @ItemTable (ItemId, CrossRefId, CrossRefIdBid, BidPrice, GrossPrice, CatalogPrice, AwardId, VendorId, PricePlanId, CatalogId, VendorItemCode, ParentCatalogId, ItemCode, Description, UnitId, UnitCode, Page, CatalogYear, DiscountRate, Name, VendorName, CategoryId, PackedItemCode, BidItemId, Alternate, PackedVendorItemCode, BidHeaderId)
      select Items.ItemId, 
             CrossRefs.CrossRefId, 
             (select top 1 case isnull(BidItems.CrossRefId,0) 
                             when 0 then (select top 1 CrossRefId 
                                            from CrossRefs 
                                            join BidsCatalogList on BidsCatalogList.CatalogId = CrossRefs.CatalogId 
                                                                and BidsCatalogList.BidId = BidItems.BidId 
                                           where CrossRefs.ItemId = BidItems.ItemId 
                                             and CrossRefs.Active = 1 
                                           order by CrossRefs.CatalogYear desc, CrossRefs.CatalogPrice Desc, CrossRefs.CrossRefId )
                             else BidItems.CrossRefId 
                           end
                from dbo.BidItems
                join dbo.Bids on Bids.BidId = BidItems.BidId
                             and Bids.PricePlanId = @PricePlanId
                             and Bids.EffectiveFrom <= @pEffectiveDate
                             and Bids.EffectiveUntil >= @pEffectiveDate
                             and Bids.Active = 1
                join dbo.Awards aw1 on aw1.BidId = Bids.BidId
                                   and aw1.Active = 1
                           where BidItems.ItemId = Items.ItemId
                           order by BidItems.Price, BidItems.BidItemId) CrossRefIdBid, 
             case isnull((select top 1 BidItems.BidItemId
                            from dbo.BidItems
                            join dbo.Bids on Bids.BidId = BidItems.BidId
                                         and Bids.PricePlanId = @PricePlanId
                                         and Bids.EffectiveFrom <= @pEffectiveDate
                                         and Bids.EffectiveUntil >= @pEffectiveDate
                                         and Bids.Active = 1
                            join dbo.Awards on Awards.BidId = Bids.BidId
                                           and Awards.Active = 1
                           where BidItems.ItemId = Items.ItemId
                           order by BidItems.Price, BidItems.BidItemId),0) 
               when 0 then CrossRefs.GrossPrice - round((CrossRefs.GrossPrice * isnull(Awards.DiscountRate,0))/100,2) 
               else isnull((select top 1 BidItems.Price
                              from dbo.BidItems
                              join dbo.Bids on Bids.BidId = BidItems.BidId
                                           and Bids.PricePlanId = @PricePlanId
                                           and Bids.EffectiveFrom <= @pEffectiveDate
                                           and Bids.EffectiveUntil >= @pEffectiveDate
                                           and Bids.Active = 1
                              join dbo.Awards on Awards.BidId = Bids.BidId
                                             and Awards.Active = 1
                             where BidItems.ItemId = Items.ItemId
                             order by BidItems.Price, BidItems.BidItemId),0)
                     - round((isnull((select top 1 BidItems.Price
                                        from dbo.BidItems
                                        join dbo.Bids on Bids.BidId = BidItems.BidId
                                                     and Bids.PricePlanId = @PricePlanId
                                                     and Bids.EffectiveFrom <= @pEffectiveDate
                                                     and Bids.EffectiveUntil >= @pEffectiveDate
                                                     and Bids.Active = 1
                                        join dbo.Awards on Awards.BidId = Bids.BidId
                                                       and Awards.Active = 1
                                       where BidItems.ItemId = Items.ItemId
                                       order by BidItems.Price, BidItems.BidItemId),0) 
                    * isnull((select top 1 Awards.BidDiscountRate
                                from dbo.BidItems
                                join dbo.Bids on Bids.BidId = BidItems.BidId
                                             and Bids.PricePlanId = @PricePlanId
                                             and Bids.EffectiveFrom <= @pEffectiveDate
                                             and Bids.EffectiveUntil >= @pEffectiveDate
                                             and Bids.Active = 1
                                join dbo.Awards on Awards.BidId = Bids.BidId
                                               and Awards.Active = 1
                               where BidItems.ItemId = Items.ItemId
                               order by BidItems.Price, BidItems.BidItemId),0))/100,2) 
             end BidPrice, 
             case isnull((select top 1 BidItems.BidItemId
                            from dbo.BidItems
                            join dbo.Bids on Bids.BidId = BidItems.BidId
                                         and Bids.PricePlanId = @PricePlanId
                                         and Bids.EffectiveFrom <= @pEffectiveDate
                                         and Bids.EffectiveUntil >= @pEffectiveDate
                                         and Bids.Active = 1
                            join dbo.Awards on Awards.BidId = Bids.BidId
                                           and Awards.Active = 1
                           where BidItems.ItemId = Items.ItemId
                           order by BidItems.Price, BidItems.BidItemId),0) 
               when 0 then CrossRefs.GrossPrice 
               else (select top 1 BidItems.Price
                       from dbo.BidItems
                       join dbo.Bids on Bids.BidId = BidItems.BidId
                                    and Bids.PricePlanId = @PricePlanId
                                    and Bids.EffectiveFrom <= @pEffectiveDate
                                    and Bids.EffectiveUntil >= @pEffectiveDate
                                    and Bids.Active = 1
                       join dbo.Awards on Awards.BidId = Bids.BidId
                                      and Awards.Active = 1
                      where BidItems.ItemId = Items.ItemId
                      order by BidItems.Price, BidItems.BidItemId)
             end GrossPrice, 
             CrossRefs.CatalogPrice, 
             case isnull((select top 1 BidItems.BidItemId
                            from dbo.BidItems
                            join dbo.Bids on Bids.BidId = BidItems.BidId
                                         and Bids.PricePlanId = @PricePlanId
                                         and Bids.EffectiveFrom <= @pEffectiveDate
                                         and Bids.EffectiveUntil >= @pEffectiveDate
                                         and Bids.Active = 1
                            join dbo.Awards on Awards.BidId = Bids.BidId
                                           and Awards.Active = 1
                           where BidItems.ItemId = Items.ItemId
                           order by BidItems.Price, BidItems.BidItemId),0)
               when 0 then Awards.AwardId
               else isnull((select top 1 Awards.AwardId
                              from dbo.BidItems
                              join dbo.Bids on Bids.BidId = BidItems.BidId
                                           and Bids.PricePlanId = @PricePlanId
                                           and Bids.EffectiveFrom <= @pEffectiveDate
                                           and Bids.EffectiveUntil >= @pEffectiveDate
                                           and Bids.Active = 1
                              join dbo.Awards on Awards.BidId = Bids.BidId
                                             and Awards.Active = 1
                             where BidItems.ItemId = Items.ItemId
                             order by BidItems.Price, BidItems.BidItemId),0)
             end AwardId, 
             case isnull((select top 1 BidItems.BidItemId
                            from dbo.BidItems
                            join dbo.Bids on Bids.BidId = BidItems.BidId
                                         and Bids.PricePlanId = @PricePlanId
                                         and Bids.EffectiveFrom <= @pEffectiveDate
                                         and Bids.EffectiveUntil >= @pEffectiveDate
                                         and Bids.Active = 1
                            join dbo.Awards on Awards.BidId = Bids.BidId
                                           and Awards.Active = 1
                           where BidItems.ItemId = Items.ItemId
                           order by BidItems.Price, BidItems.BidItemId),0)
               when 0 then Vendors.VendorId
               else (select top 1 Bids.VendorId
                       from dbo.BidItems
                       join dbo.Bids on Bids.BidId = BidItems.BidId
                                    and Bids.PricePlanId = @PricePlanId
                                    and Bids.EffectiveFrom <= @pEffectiveDate
                                    and Bids.EffectiveUntil >= @pEffectiveDate
                                    and Bids.Active = 1
                       join dbo.Awards aw1 on aw1.BidId = Bids.BidId
                                          and aw1.Active = 1
                      where BidItems.ItemId = Items.ItemId
                      order by BidItems.Price, BidItems.BidItemId)
             end VendorId, 
             Awards.PricePlanId, 
             CrossRefs.CatalogId, 
             case isnull(CrossRefs.VendorItemCode,'') 
               when '' then
                 (select top 1 BidItems.VendorItemCode
                    from dbo.BidItems
                    join dbo.Bids on Bids.BidId = BidItems.BidId
                                 and Bids.PricePlanId = @PricePlanId
                                 and Bids.EffectiveFrom <= @pEffectiveDate
                                 and Bids.EffectiveUntil >= @pEffectiveDate
                                 and Bids.Active = 1
                    join dbo.Awards aw1 on aw1.BidId = Bids.BidId
                                       and aw1.Active = 1
                   where BidItems.ItemId = Items.ItemId
                   order by BidItems.Price, BidItems.BidItemId)
               else
                 CrossRefs.VendorItemCode
             end VendorItemCode,
             Items.ParentCatalogId, 
             Items.ItemCode, 
             Items.Description, 
             Items.UnitId, 
             Units.Code, 
             CrossRefs.Page, 
             CrossRefs.CatalogYear, 
             case isnull((select top 1 BidItems.BidItemId
                            from dbo.BidItems
                            join dbo.Bids on Bids.BidId = BidItems.BidId
                                         and Bids.PricePlanId = @PricePlanId
                                         and Bids.EffectiveFrom <= @pEffectiveDate
                                         and Bids.EffectiveUntil >= @pEffectiveDate
                                         and Bids.Active = 1
                            join dbo.Awards on Awards.BidId = Bids.BidId
                                           and Awards.Active = 1
                           where BidItems.ItemId = Items.ItemId
                           order by BidItems.Price, BidItems.BidItemId),0) 
               when 0 then Awards.DiscountRate 
               else isnull((select top 1 Awards.BidDiscountRate
                            from dbo.BidItems
                            join dbo.Bids on Bids.BidId = BidItems.BidId
                                         and Bids.PricePlanId = @PricePlanId
                                         and Bids.EffectiveFrom <= @pEffectiveDate
                                         and Bids.EffectiveUntil >= @pEffectiveDate
                                         and Bids.Active = 1
                            join dbo.Awards on Awards.BidId = Bids.BidId
                                           and Awards.Active = 1
                           where BidItems.ItemId = Items.ItemId
                           order by BidItems.Price, BidItems.BidItemId),0) 
             end DiscountRate, 
             Catalog.Name, 
             case isnull((select top 1 BidItems.BidItemId
                            from dbo.BidItems
                            join dbo.Bids on Bids.BidId = BidItems.BidId
                                         and Bids.PricePlanId = @PricePlanId
                                         and Bids.EffectiveFrom <= @pEffectiveDate
                                         and Bids.EffectiveUntil >= @pEffectiveDate
                                         and Bids.Active = 1
                            join dbo.Awards aw1 on aw1.BidId = Bids.BidId
                                               and aw1.Active = 1
                            join dbo.Vendors on Vendors.VendorId = Bids.VendorId
                           where BidItems.ItemId = Items.ItemId
                           order by BidItems.Price, BidItems.BidItemId),0)
               when 0 then Vendors.Name
               else (select top 1 Vendors.Name
                       from dbo.BidItems
                       join dbo.Bids on Bids.BidId = BidItems.BidId
                                    and Bids.PricePlanId = @PricePlanId
                                    and Bids.EffectiveFrom <= @pEffectiveDate
                                    and Bids.EffectiveUntil >= @pEffectiveDate
                                    and Bids.Active = 1
                       join dbo.Awards aw1 on aw1.BidId = Bids.BidId
                                          and aw1.Active = 1
                       join dbo.Vendors on Vendors.VendorId = Bids.VendorId
                      where BidItems.ItemId = Items.ItemId
                      order by BidItems.Price, BidItems.BidItemId)
             end VendorName, 
             Items.CategoryId, 
             Items.PackedCode, 
             (select top 1 BidItems.BidItemId
                from dbo.BidItems
                join dbo.Bids on Bids.BidId = BidItems.BidId
                             and Bids.PricePlanId = @PricePlanId
                             and Bids.EffectiveFrom <= @pEffectiveDate
                             and Bids.EffectiveUntil >= @pEffectiveDate
                             and Bids.Active = 1
                join dbo.Awards aw1 on aw1.BidId = Bids.BidId
                                   and aw1.Active = 1
               where BidItems.ItemId = Items.ItemId
               order by BidItems.Price, BidItems.BidItemId) BidItemId, 
             case isnull((select top 1 BidItems.Alternate
                            from dbo.BidItems
                            join dbo.Bids on Bids.BidId = BidItems.BidId
                                         and Bids.PricePlanId = @PricePlanId
                                         and Bids.EffectiveFrom <= @pEffectiveDate
                                         and Bids.EffectiveUntil >= @pEffectiveDate
                                         and Bids.Active = 1
                            join dbo.Awards aw1 on aw1.BidId = Bids.BidId
                           where BidItems.ItemId = Items.ItemId
                           order by BidItems.Price, BidItems.BidItemId),'') 
               when '' then ''
               else
                 (select top 1 BidItems.Alternate
                    from dbo.BidItems
                    join dbo.Bids on Bids.BidId = BidItems.BidId
                                 and Bids.PricePlanId = @PricePlanId
                                 and Bids.EffectiveFrom <= @pEffectiveDate
                                 and Bids.EffectiveUntil >= @pEffectiveDate
                                 and Bids.Active = 1
                    join dbo.Awards aw1 on aw1.BidId = Bids.BidId
                                       and aw1.Active = 1
                   where BidItems.ItemId = Items.ItemId
                   order by BidItems.Price, BidItems.BidItemId) + char(13) + char(10)
             end +
             case isnull((select top 1 BidItems.VendorItemCode
                            from dbo.BidItems
                            join dbo.Bids on Bids.BidId = BidItems.BidId
                                         and Bids.PricePlanId = @PricePlanId
                                         and Bids.EffectiveFrom <= @pEffectiveDate
                                         and Bids.EffectiveUntil >= @pEffectiveDate
                                         and Bids.Active = 1
                            join dbo.Awards aw1 on aw1.BidId = Bids.BidId
                                               and aw1.Active = 1
                           where BidItems.ItemId = Items.ItemId
                           order by BidItems.Price, BidItems.BidItemId),'') 
               when '' then ''
               else
                 'Winning Vendors Item Code: ' +
                 isnull((select top 1 BidItems.VendorItemCode
                           from dbo.BidItems
                           join dbo.Bids on Bids.BidId = BidItems.BidId
                                        and Bids.PricePlanId = @PricePlanId
                                        and Bids.EffectiveFrom <= @pEffectiveDate
                                        and Bids.EffectiveUntil >= @pEffectiveDate
                                        and Bids.Active = 1
                           join dbo.Awards aw1 on aw1.BidId = Bids.BidId
                                              and aw1.Active = 1
                          where BidItems.ItemId = Items.ItemId
                          order by BidItems.Price, BidItems.BidItemId),'') 
             end Alternate,
             CrossRefs.PackedCode PackedVendorItemCode,
             Awards.BidHeaderId
        from dbo.CrossRefs
        join dbo.Items on Items.ItemId = CrossRefs.ItemId
        join dbo.Units on Units.UnitId = Items.UnitId
        join dbo.Catalog on Catalog.CatalogId = CrossRefs.CatalogId
        join dbo.AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
        join dbo.Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.CategoryId = @CategoryId
                       and Awards.PricePlanId = @PricePlanId
                       and Awards.BidStartDate <= @pEffectiveDate
                       and Awards.BidEndDate >= @pEffectiveDate
                       and Awards.Active = 1
        join dbo.Vendors on Vendors.VendorId = Awards.VendorId
       where CrossRefs.Active = 1
         and Items.Active = 1

    -- Load Bid Only Price for Item - No Catalog Refs
    insert @ItemTable (ItemId, CrossRefId, CrossRefIdBid, BidPrice, GrossPrice, CatalogPrice, AwardId, VendorId, PricePlanId, CatalogId, VendorItemCode, ParentCatalogId, ItemCode, Description, UnitId, UnitCode, Page, CatalogYear, DiscountRate, Name, VendorName, CategoryId, PackedItemCode, BidItemId, Alternate, PackedVendorItemCode, BidHeaderId)
      select Items.ItemId, 
             (select case Items.CategoryId when 2 then case isnull(CrossRefs.CrossRefId,0) when 0 then /* Following Code is for Allied Lookup */ (select top 1 CrossRefId from CrossRefs cr1 where cr1.ItemId = Items.ItemId and cr1.CatalogId = 23 and cr1.Active = 1 order by cr1.CatalogYear desc, cr1.CrossRefId) else CrossRefs.CrossRefId end else CrossRefs.CrossRefId End) CrossRefId, 
             (select top 1 case isnull(BidItems.CrossRefId,0) 
                             when 0 then (select top 1 CrossRefId 
                                            from CrossRefs 
                                            join BidsCatalogList on BidsCatalogList.CatalogId = CrossRefs.CatalogId 
                                                                and BidsCatalogList.BidId = BidItems.BidId 
                                           where CrossRefs.ItemId = BidItems.ItemId 
                                             and CrossRefs.Active = 1 
                                           order by CrossRefs.CatalogYear desc, CrossRefs.CatalogPrice Desc, CrossRefs.CrossRefId )
                             else BidItems.CrossRefId 
                           end
                from dbo.BidItems
                join dbo.Bids on Bids.BidId = BidItems.BidId
                             and Bids.PricePlanId = @PricePlanId
                             and Bids.EffectiveFrom <= @pEffectiveDate
                             and Bids.EffectiveUntil >= @pEffectiveDate
                             and Bids.Active = 1
                join dbo.Awards on Awards.BidId = Bids.BidId
                               and Awards.Active = 1
               where BidItems.ItemId = Items.ItemId
               order by BidItems.Price, BidItems.BidItemId) CrossRefIdBid, 
             case isnull((select top 1 BidItems.BidItemId
                            from dbo.BidItems
                            join dbo.Bids on Bids.BidId = BidItems.BidId
                                         and Bids.PricePlanId = @PricePlanId
                                         and Bids.EffectiveFrom <= @pEffectiveDate
                                         and Bids.EffectiveUntil >= @pEffectiveDate
                                         and Bids.Active = 1
                            join dbo.Awards on Awards.BidId = Bids.BidId
                                           and Awards.Active = 1
                           where BidItems.ItemId = Items.ItemId
                           order by BidItems.Price, BidItems.BidItemId),0) 
               when 0 then CrossRefs.GrossPrice - round((CrossRefs.GrossPrice * isnull(Awards.DiscountRate,0))/100,2) 
               else isnull((select top 1 BidItems.Price
                              from dbo.BidItems
                              join dbo.Bids on Bids.BidId = BidItems.BidId
                                           and Bids.PricePlanId = @PricePlanId
                                           and Bids.EffectiveFrom <= @pEffectiveDate
                                           and Bids.EffectiveUntil >= @pEffectiveDate
                                           and Bids.Active = 1
                              join dbo.Awards on Awards.BidId = Bids.BidId
                                             and Awards.Active = 1
                             where BidItems.ItemId = Items.ItemId
                             order by BidItems.Price, BidItems.BidItemId),0)
                     - round((isnull((select top 1 BidItems.Price
                                        from dbo.BidItems
                                        join dbo.Bids on Bids.BidId = BidItems.BidId
                                                     and Bids.PricePlanId = @PricePlanId
                                                     and Bids.EffectiveFrom <= @pEffectiveDate
                                                     and Bids.EffectiveUntil >= @pEffectiveDate
                                                     and Bids.Active = 1
                                        join dbo.Awards on Awards.BidId = Bids.BidId
                                                       and Awards.Active = 1
                                       where BidItems.ItemId = Items.ItemId
                                       order by BidItems.Price, BidItems.BidItemId),0) 
                    * isnull((select top 1 Awards.BidDiscountRate
                                from dbo.BidItems
                                join dbo.Bids on Bids.BidId = BidItems.BidId
                                             and Bids.PricePlanId = @PricePlanId
                                             and Bids.EffectiveFrom <= @pEffectiveDate
                                             and Bids.EffectiveUntil >= @pEffectiveDate
                                             and Bids.Active = 1
                                join dbo.Awards on Awards.BidId = Bids.BidId
                                               and Awards.Active = 1
                               where BidItems.ItemId = Items.ItemId
                               order by BidItems.Price, BidItems.BidItemId),0))/100,2) 
             end BidPrice, 
             case isnull((select top 1 BidItems.BidItemId
                            from dbo.BidItems
                            join dbo.Bids on Bids.BidId = BidItems.BidId
                                         and Bids.PricePlanId = @PricePlanId
                                         and Bids.EffectiveFrom <= @pEffectiveDate
                                         and Bids.EffectiveUntil >= @pEffectiveDate
                                         and Bids.Active = 1
                            join dbo.Awards on Awards.BidId = Bids.BidId
                                           and Awards.Active = 1
                           where BidItems.ItemId = Items.ItemId
                           order by BidItems.Price, BidItems.BidItemId),0) 
               when 0 then CrossRefs.GrossPrice 
               else (select top 1 BidItems.Price
                       from dbo.BidItems
                       join dbo.Bids on Bids.BidId = BidItems.BidId
                                    and Bids.PricePlanId = @PricePlanId
                                    and Bids.EffectiveFrom <= @pEffectiveDate
                                    and Bids.EffectiveUntil >= @pEffectiveDate
                                    and Bids.Active = 1
                       join dbo.Awards on Awards.BidId = Bids.BidId
                                      and Awards.Active = 1
                      where BidItems.ItemId = Items.ItemId
                      order by BidItems.Price, BidItems.BidItemId)
             end GrossPrice, 
--             CrossRefs.CatalogPrice, 
             (select case Items.CategoryId when 2 then case isnull(CrossRefs.CrossRefId,0) when 0 then /* Following Code is for Allied Lookup */ (select top 1 CatalogPrice from CrossRefs cr1 where cr1.ItemId = Items.ItemId and cr1.CatalogId = 23 and cr1.Active = 1 order by cr1.CatalogYear desc, cr1.CrossRefId) else CrossRefs.CatalogPrice end else CrossRefs.CatalogPrice End) CatalogPrice, 
             case isnull((select top 1 BidItems.BidItemId
                            from dbo.BidItems
                            join dbo.Bids on Bids.BidId = BidItems.BidId
                                         and Bids.PricePlanId = @PricePlanId
                                         and Bids.EffectiveFrom <= @pEffectiveDate
                                         and Bids.EffectiveUntil >= @pEffectiveDate
                                         and Bids.Active = 1
                            join dbo.Awards on Awards.BidId = Bids.BidId
                                           and Awards.Active = 1
                           where BidItems.ItemId = Items.ItemId
                           order by BidItems.Price, BidItems.BidItemId),0)
               when 0 then Awards.AwardId
               else isnull((select top 1 Awards.AwardId
                              from dbo.BidItems
                              join dbo.Bids on Bids.BidId = BidItems.BidId
                                           and Bids.PricePlanId = @PricePlanId
                                           and Bids.EffectiveFrom <= @pEffectiveDate
                                           and Bids.EffectiveUntil >= @pEffectiveDate
                                           and Bids.Active = 1                              join dbo.Awards on Awards.BidId = Bids.BidId
                                             and Awards.Active = 1
                             where BidItems.ItemId = Items.ItemId
                             order by BidItems.Price, BidItems.BidItemId),0)
             end AwardId, 
             case isnull((select top 1 BidItems.BidItemId
                            from dbo.BidItems
                            join dbo.Bids on Bids.BidId = BidItems.BidId
                                         and Bids.PricePlanId = @PricePlanId
                                         and Bids.EffectiveFrom <= @pEffectiveDate
                                         and Bids.EffectiveUntil >= @pEffectiveDate
                                         and Bids.Active = 1
                            join dbo.Awards on Awards.BidId = Bids.BidId
                                           and Awards.Active = 1
                           where BidItems.ItemId = Items.ItemId
                           order by BidItems.Price, BidItems.BidItemId),0)
               when 0 then Vendors.VendorId
               else (select top 1 Bids.VendorId
                       from dbo.BidItems
                       join dbo.Bids on Bids.BidId = BidItems.BidId
                                    and Bids.PricePlanId = @PricePlanId
                                    and Bids.EffectiveFrom <= @pEffectiveDate
                                    and Bids.EffectiveUntil >= @pEffectiveDate
                                    and Bids.Active = 1
                       join dbo.Awards aw1 on aw1.BidId = Bids.BidId
                                          and aw1.Active = 1
                      where BidItems.ItemId = Items.ItemId
                      order by BidItems.Price, BidItems.BidItemId)
             end VendorId, 
             Awards.PricePlanId, 
--             CrossRefs.CatalogId, 
             (select case Items.CategoryId when 2 then case isnull(CrossRefs.CrossRefId,0) when 0 then /* Following Code is for Allied Lookup */ (select top 1 CatalogId from CrossRefs cr1 where cr1.ItemId = Items.ItemId and cr1.CatalogId = 23 and cr1.Active = 1 order by cr1.CatalogYear desc, cr1.CrossRefId) else CrossRefs.CatalogId end else CrossRefs.CatalogId End) CatalogId, 
/*
             case rtrim(isnull((select top 1 BidItems.VendorItemCode
                                  from dbo.BidItems
                                  join dbo.Bids on Bids.BidId = BidItems.BidId
                                               and Bids.PricePlanId = @PricePlanId
                                               and Bids.EffectiveFrom <= @pEffectiveDate
                                               and Bids.EffectiveUntil >= @pEffectiveDate
                                               and Bids.Active = 1
                                 where BidItems.ItemId = Items.ItemId
                                 order by BidItems.Price, BidItems.BidItemId),'')) 
               when '' then CrossRefs.VendorItemCode 
               else (select top 1 BidItems.VendorItemCode
                       from dbo.BidItems
                       join dbo.Bids on Bids.BidId = BidItems.BidId
                                    and Bids.PricePlanId = @PricePlanId
                                    and Bids.EffectiveFrom <= @pEffectiveDate
                                    and Bids.EffectiveUntil >= @pEffectiveDate
                                    and Bids.Active = 1
                       join dbo.Awards on Awards.BidId = Bids.BidId
                      where BidItems.ItemId = Items.ItemId
                      order by BidItems.Price, BidItems.BidItemId)
             end VendorItemCode, 
*/
--             CrossRefs.VendorItemCode,
/*             (select case Items.CategoryId 
                       when 2 then
                         case isnull(CrossRefs.CrossRefId,0) 
                           when 0 then /* Following Code is for Allied Lookup */ 
                             (select top 1 VendorItemCode from CrossRefs cr1 where cr1.ItemId = Items.ItemId and cr1.CatalogId = 23 and cr1.Active = 1 order by cr1.CatalogYear desc, cr1.CrossRefId) 
                           else CrossRefs.VendorItemCode 
                         end 
                       else CrossRefs.VendorItemCode 
                     End) VendorItemCode, */
             case Items.CategoryId
               when 2 then
                 case isnull(CrossRefs.CrossRefId,0) 
                   when 0 then /* Following Code is for Allied Lookup */ 
                     (select top 1 VendorItemCode from CrossRefs cr1 where cr1.ItemId = Items.ItemId and cr1.CatalogId = 23 and cr1.Active = 1 order by cr1.CatalogYear desc, cr1.CrossRefId) 
                   else
                     CrossRefs.VendorItemCode
                 end
               else
                 case isnull((select top 1 BidItems.VendorItemCode
                        from dbo.BidItems
                        join dbo.Bids on Bids.BidId = BidItems.BidId
                                     and Bids.PricePlanId = @PricePlanId
                                     and Bids.EffectiveFrom <= @pEffectiveDate
                                     and Bids.EffectiveUntil >= @pEffectiveDate
                                     and Bids.Active = 1
                        join dbo.Awards aw1 on aw1.BidId = Bids.BidId
                                           and aw1.Active = 1
                       where BidItems.ItemId = Items.ItemId
                       order by BidItems.Price, BidItems.BidItemId),'') 
                   when '' then
                     (select top 1 CrossRefs.VendorItemCode
                        from dbo.BidItems
                        join dbo.Bids on Bids.BidId = BidItems.BidId
                                     and Bids.PricePlanId = @PricePlanId
                                     and Bids.EffectiveFrom <= @pEffectiveDate
                                     and Bids.EffectiveUntil >= @pEffectiveDate
                                     and Bids.Active = 1
                        join dbo.Awards aw1 on aw1.BidId = Bids.BidId
                                           and aw1.Active = 1
                        join dbo.AwardsCatalogList acl1 on acl1.AwardId = aw1.AwardId
                        join dbo.CrossRefs xr1 on xr1.ItemId = BidItems.ItemId
                                              and xr1.CatalogId = acl1.CatalogId
                                              and xr1.Active = 1
                       where BidItems.ItemId = Items.ItemId
                       order by BidItems.Price, BidItems.BidItemId, xr1.CatalogYear desc, xr1.CrossRefId desc)
                   else
                     (select top 1 BidItems.VendorItemCode
                        from dbo.BidItems
                        join dbo.Bids on Bids.BidId = BidItems.BidId
                                     and Bids.PricePlanId = @PricePlanId
                                     and Bids.EffectiveFrom <= @pEffectiveDate
                                     and Bids.EffectiveUntil >= @pEffectiveDate
                                     and Bids.Active = 1
                        join dbo.Awards aw1 on aw1.BidId = Bids.BidId
                                           and aw1.Active = 1
                       where BidItems.ItemId = Items.ItemId
                       order by BidItems.Price, BidItems.BidItemId)
                 end
             end VendorItemCode,
             Items.ParentCatalogId, 
             Items.ItemCode, 
             Items.Description, 
             Items.UnitId, 
             Units.Code, 
--             CrossRefs.Page, 
             (select case Items.CategoryId when 2 then case isnull(CrossRefs.CrossRefId,0) when 0 then /* Following Code is for Allied Lookup */ (select top 1 Page from CrossRefs cr1 where cr1.ItemId = Items.ItemId and cr1.CatalogId = 23 and cr1.Active = 1 order by cr1.CatalogYear desc, cr1.CrossRefId) else CrossRefs.Page end else CrossRefs.Page End) Page, 
--             CrossRefs.CatalogYear, 
             (select case Items.CategoryId when 2 then case isnull(CrossRefs.CrossRefId,0) when 0 then /* Following Code is for Allied Lookup */ (select top 1 CatalogYear from CrossRefs cr1 where cr1.ItemId = Items.ItemId and cr1.CatalogId = 23 and cr1.Active = 1 order by cr1.CatalogYear desc, cr1.CrossRefId) else CrossRefs.CatalogYear end else CrossRefs.CatalogYear End) CatalogYear, 
             case isnull((select top 1 BidItems.BidItemId
                            from dbo.BidItems
                            join dbo.Bids on Bids.BidId = BidItems.BidId
                                         and Bids.PricePlanId = @PricePlanId
                                         and Bids.EffectiveFrom <= @pEffectiveDate
                                         and Bids.EffectiveUntil >= @pEffectiveDate
                                         and Bids.Active = 1
                            join dbo.Awards on Awards.BidId = Bids.BidId
                                           and Awards.Active = 1
                           where BidItems.ItemId = Items.ItemId
                           order by BidItems.Price, BidItems.BidItemId),0) 
               when 0 then Awards.DiscountRate 
               else isnull((select top 1 Awards.BidDiscountRate
                            from dbo.BidItems
                            join dbo.Bids on Bids.BidId = BidItems.BidId
                                         and Bids.PricePlanId = @PricePlanId
                                         and Bids.EffectiveFrom <= @pEffectiveDate
                                         and Bids.EffectiveUntil >= @pEffectiveDate
                                         and Bids.Active = 1
                            join dbo.Awards on Awards.BidId = Bids.BidId
                                           and Awards.Active = 1
                           where BidItems.ItemId = Items.ItemId
                           order by BidItems.Price, BidItems.BidItemId),0) 
             end DiscountRate, 
--             Catalog.Name, 
             (select case Items.CategoryId when 2 then case isnull(CrossRefs.CrossRefId,0) when 0 then /* Following Code is for Allied Lookup */ (select top 1 Cat.Name from CrossRefs cr1 join Catalog cat on Cat.CatalogId = Cr1.CatalogId where cr1.ItemId = Items.ItemId and cr1.CatalogId = 23 and cr1.Active = 1 order by cr1.CatalogYear desc, cr1.CrossRefId) else Catalog.Name end else Catalog.Name End) Name, 
             case isnull((select top 1 BidItems.BidItemId
                            from dbo.BidItems
                            join dbo.Bids on Bids.BidId = BidItems.BidId
                                         and Bids.PricePlanId = @PricePlanId
                                         and Bids.EffectiveFrom <= @pEffectiveDate
                                         and Bids.EffectiveUntil >= @pEffectiveDate
                                         and Bids.Active = 1
                            join dbo.Awards aw1 on aw1.BidId = Bids.BidId
                                               and aw1.Active = 1
                            join dbo.Vendors on Vendors.VendorId = Bids.VendorId
                           where BidItems.ItemId = Items.ItemId
                           order by BidItems.Price, BidItems.BidItemId),0)
               when 0 then Vendors.Name
               else (select top 1 Vendors.Name
                       from dbo.BidItems
                       join dbo.Bids on Bids.BidId = BidItems.BidId
                                    and Bids.PricePlanId = @PricePlanId
                                    and Bids.EffectiveFrom <= @pEffectiveDate
                                    and Bids.EffectiveUntil >= @pEffectiveDate
                                    and Bids.Active = 1
                       join dbo.Awards aw1 on aw1.BidId = Bids.BidId
                                          and aw1.Active = 1
                       join dbo.Vendors on Vendors.VendorId = Bids.VendorId
                      where BidItems.ItemId = Items.ItemId
                      order by BidItems.Price, BidItems.BidItemId)
             end VendorName, 
             Items.CategoryId, 
             Items.PackedCode, 
             (select top 1 BidItems.BidItemId
                from dbo.BidItems
                join dbo.Bids on Bids.BidId = BidItems.BidId
                             and Bids.PricePlanId = @PricePlanId
                             and Bids.EffectiveFrom <= @pEffectiveDate
                             and Bids.EffectiveUntil >= @pEffectiveDate
                             and Bids.Active = 1
                join dbo.Awards aw1 on aw1.BidId = Bids.BidId
                                   and aw1.Active = 1
               where BidItems.ItemId = Items.ItemId
               order by BidItems.Price, BidItems.BidItemId) BidItemId, 
/*             (select top 1 BidItems.Alternate
                from dbo.BidItems
                join dbo.Bids on Bids.BidId = BidItems.BidId
                             and Bids.PricePlanId = @PricePlanId
                             and Bids.EffectiveFrom <= @pEffectiveDate
                             and Bids.EffectiveUntil >= @pEffectiveDate
                             and Bids.Active = 1
               where BidItems.ItemId = Items.ItemId
               order by BidItems.Price, BidItems.BidItemId) Alternate, */
             case isnull((select top 1 BidItems.Alternate
                            from dbo.BidItems
                            join dbo.Bids on Bids.BidId = BidItems.BidId
                                         and Bids.PricePlanId = @PricePlanId
                                         and Bids.EffectiveFrom <= @pEffectiveDate
                                         and Bids.EffectiveUntil >= @pEffectiveDate
                                         and Bids.Active = 1
                            join dbo.Awards aw1 on aw1.BidId = Bids.BidId
                                               and aw1.Active = 1
                           where BidItems.ItemId = Items.ItemId
                           order by BidItems.Price, BidItems.BidItemId),'') 
               when '' then ''
               else
                 (select top 1 BidItems.Alternate
                    from dbo.BidItems
                    join dbo.Bids on Bids.BidId = BidItems.BidId
                                 and Bids.PricePlanId = @PricePlanId
                                 and Bids.EffectiveFrom <= @pEffectiveDate
                                 and Bids.EffectiveUntil >= @pEffectiveDate
                                 and Bids.Active = 1
                    join dbo.Awards aw1 on aw1.BidId = Bids.BidId
                                       and aw1.Active = 1
                   where BidItems.ItemId = Items.ItemId
                   order by BidItems.Price, BidItems.BidItemId) + char(13) + char(10) 
             end +
             case isnull((select top 1 BidItems.VendorItemCode
                            from dbo.BidItems
                            join dbo.Bids on Bids.BidId = BidItems.BidId
                                         and Bids.PricePlanId = @PricePlanId
                                         and Bids.EffectiveFrom <= @pEffectiveDate
                                         and Bids.EffectiveUntil >= @pEffectiveDate
                                         and Bids.Active = 1
                            join dbo.Awards aw1 on aw1.BidId = Bids.BidId
                                               and aw1.Active = 1
                           where BidItems.ItemId = Items.ItemId
                           order by BidItems.Price, BidItems.BidItemId),'') 
               when '' then ''
               else
                 'Winning Vendors Item Code: ' +
                 isnull((select top 1 BidItems.VendorItemCode
                            from dbo.BidItems
                            join dbo.Bids on Bids.BidId = BidItems.BidId
                                         and Bids.PricePlanId = @PricePlanId
                                         and Bids.EffectiveFrom <= @pEffectiveDate
                                         and Bids.EffectiveUntil >= @pEffectiveDate
                                         and Bids.Active = 1
                            join dbo.Awards aw1 on aw1.BidId = Bids.BidId
                                               and aw1.Active = 1
                           where BidItems.ItemId = Items.ItemId
                           order by BidItems.Price, BidItems.BidItemId),'') 
             end Alternate,
--             CrossRefs.PackedCode PackedVendorItemCode
             (select case Items.CategoryId 
                       when 2 then 
                         case isnull(CrossRefs.CrossRefId,0) 
                           when 0 then /* Following Code is for Allied Lookup */ 
                             (select top 1 PackedCode from CrossRefs cr1 where cr1.ItemId = Items.ItemId and cr1.CatalogId = 23 and cr1.Active = 1 order by cr1.CatalogYear desc, cr1.CrossRefId) 
                           else CrossRefs.PackedCode 
                         end 
                       else 
--                         CrossRefs.PackedCode 
                 case isnull((select top 1 BidItems.VendorItemCode
                        from dbo.BidItems
                        join dbo.Bids on Bids.BidId = BidItems.BidId
                                     and Bids.PricePlanId = @PricePlanId
                                     and Bids.EffectiveFrom <= @pEffectiveDate
                                     and Bids.EffectiveUntil >= @pEffectiveDate
                                     and Bids.Active = 1
                        join dbo.Awards aw1 on aw1.BidId = Bids.BidId
                                           and aw1.Active = 1
                       where BidItems.ItemId = Items.ItemId
                       order by BidItems.Price, BidItems.BidItemId),'') 
                   when '' then
                     (select top 1 CrossRefs.VendorItemCode
                        from dbo.BidItems
                        join dbo.Bids on Bids.BidId = BidItems.BidId
                                     and Bids.PricePlanId = @PricePlanId
                                     and Bids.EffectiveFrom <= @pEffectiveDate
                                     and Bids.EffectiveUntil >= @pEffectiveDate
                                     and Bids.Active = 1
                        join dbo.Awards aw1 on aw1.BidId = Bids.BidId
                                           and aw1.Active = 1
                        join dbo.AwardsCatalogList acl1 on acl1.AwardId = aw1.AwardId
                        join dbo.CrossRefs xr1 on xr1.ItemId = BidItems.ItemId
                                              and xr1.CatalogId = acl1.CatalogId
                                              and xr1.Active = 1
                       where BidItems.ItemId = Items.ItemId
                       order by BidItems.Price, BidItems.BidItemId, xr1.CatalogYear desc, xr1.CrossRefId desc)
                   else
                     (select top 1 BidItems.VendorItemCode
                        from dbo.BidItems
                        join dbo.Bids on Bids.BidId = BidItems.BidId
                                     and Bids.PricePlanId = @PricePlanId
                                     and Bids.EffectiveFrom <= @pEffectiveDate
                                     and Bids.EffectiveUntil >= @pEffectiveDate
                                     and Bids.Active = 1
                        join dbo.Awards aw1 on aw1.BidId = Bids.BidId
                                           and aw1.Active = 1
                       where BidItems.ItemId = Items.ItemId
                       order by BidItems.Price, BidItems.BidItemId)
                 end
                     End) PackedVendorItemCode,
             Bids.BidHeaderId
        from dbo.BidItems
        join dbo.Bids on Bids.BidId = BidItems.BidId
                     and Bids.Active = 1
        join dbo.Items on Items.ItemId = BidItems.ItemId
        join dbo.Units on Units.UnitId = Items.UnitId
        join dbo.Awards on Awards.BidId = Bids.BidId
                       and Awards.CategoryId = @CategoryId
                       and Awards.PricePlanId = @PricePlanId
                       and Awards.BidStartDate <= @pEffectiveDate
                       and Awards.BidEndDate >= @pEffectiveDate
                       and Awards.Active = 1
        join dbo.Vendors on Vendors.VendorId = Awards.VendorId
        left outer join dbo.AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId
        left outer join dbo.Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId
        left outer join dbo.CrossRefs on CrossRefs.ItemId = Items.ItemId
                                     and CrossRefs.CatalogId = Catalog.CatalogId
                                     and CrossRefs.Active = 1
       where Items.Active = 1
         and CrossRefs.CrossRefId is null

  return
end
```
