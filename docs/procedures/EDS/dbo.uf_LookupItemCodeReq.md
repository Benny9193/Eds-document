# Function: table-valued: `dbo.uf_LookupItemCodeReq`

_Generated on 2026-05-04T13:04:24.282Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_LookupItemCodeReq` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2003-06-27 18:39:40 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pItemCode` | IN | varchar(255) |  |
| 2 | `@pCatalogId` | IN | int |  |
| 3 | `@pDetailId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.Awards` | USER_TABLE |  |
| `dbo.BidItems` | USER_TABLE |  |
| `dbo.Bids` | USER_TABLE |  |
| `dbo.Budgets` | USER_TABLE |  |
| `dbo.Catalog` | USER_TABLE |  |
| `dbo.Category` | USER_TABLE |  |
| `dbo.CrossRefs` | USER_TABLE |  |
| `dbo.Detail` | USER_TABLE |  |
| `dbo.DistrictPP` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.PPCatalogs` | USER_TABLE |  |
| `dbo.Requisitions` | USER_TABLE |  |
| `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_PackCodeCatalog` | SQL_SCALAR_FUNCTION |  |
| `dbo.Units` | USER_TABLE |  |
| `dbo.Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  function dbo.uf_LookupItemCodeReq (@pItemCode varchar(255), @pCatalogId int, @pDetailId int)
returns @ItemTable table (
ItemId		int null,
CrossRefId	int null,
CrossrefIdBid	int null,
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
ItemCount	int null
)
 
as
begin
declare @CrossRefId int,
	@CrossRefIdBid int,	
	@DistrictId int,
	@CatalogId int,
	@ItemId int,
	@BidItemId int,
	@AwardId int,
	@CategoryId int,
	@ItemCount int,
	@ItemCode varchar(50),
	@DropSeq varchar(16),
	@BidHeaderId int,
	@EffectiveDate datetime

  Select @DistrictId = isnull(Budgets.DistrictId,0),
	 @CatalogId = isnull(@pCatalogId,0),
	 @CategoryId = isnull(Requisitions.CategoryId,0),
         @BidHeaderId = Detail.BidHeaderId,
         @EffectiveDate = Requisitions.DateEntered
    from dbo.Detail
    join dbo.Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
    join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
   where Detail.DetailId = isnull(@pDetailId,0)

  if @CatalogId != 0
  begin
    select @ItemCode = dbo.uf_PackCodeCatalog(@pItemCode, @CatalogId)
  end
  else
  begin
    select @ItemCode = dbo.uf_PackCode(@pItemCode)
  end

    -- Load Catalog and Bid Price for Item
    insert @ItemTable (ItemId, CrossRefId, CrossRefIdBid, BidPrice, GrossPrice, CatalogPrice, AwardId, VendorId, PricePlanId, CatalogId, VendorItemCode, ParentCatalogId, ItemCode, Description, UnitId, UnitCode, PriceId, Page, DiscountRate, Name, VendorName, CategoryId, PackedItemCode, BidItemId, Alternate, PackedVendorItemCode)
      select distinct I1.ItemId, CrCat.CrossRefId, CrBid.CrossRefId, case isnull(BidItems.BidItemId,0) when 0 then CrCat.GrossPrice - round((CrCat.GrossPrice * isnull(Awards.DiscountRate,0))/100,2) else BidItems.Price - round((BidItems.Price * isnull(Awards.BidDiscountRate,0))/100,2) end, case isnull(BidItems.BidItemId,0) when 0 then CrCat.GrossPrice else BidItems.Price end, CrCat.CatalogPrice, Awards.AwardId, Vendors.VendorId, Awards.PricePlanId, CrCat.CatalogId, case isnull(BidItems.BidItemId,0) when 0 then CrCat.VendorItemCode else BidItems.VendorItemCode end, I1.ParentCatalogId, I1.ItemCode, I1.Description, I1.UnitId, Units.Code, null, CrCat.Page, case isnull(BidItems.BidItemId,0) when 0 then Awards.DiscountRate else Awards.BidDiscountRate end DiscountRate, Catalog.Name, Vendors.Name, I1.CategoryId, I1.PackedCode, BidItems.BidItemId, BidItems.Alternate, case isnull(BidItems.ItemId,0) when 0 then CrCat.PackedCode else case BidItems.VendorItemCode when ss.ItemCode then CrCat.PackedCode else dbo.uf_PackCode(BidItems.VendorItemCode) end end
        from dbo.Items I1
        join dbo.CrossRefs on CrossRefs.ItemId = I1.ItemId
                          and CrossRefs.PackedCode = @ItemCode
                          and isnull(CrossRefs.CatalogId,0) = @CatalogId
                          and CrossRefs.Active = 1
        join (
          select Items.ItemId, Items.ItemCode, sCat.CrossRefId, sBid.CrossRefId CrossRefIdBid, case isnull(sBid.AwardId,0) when 0 then sCat.AwardId else sBid.AwardId end AwardId, sBid.BidItemId
            from dbo.Items
            left outer  join (
		    select Items.ItemId, CrCat.CrossRefId, Awards.AwardId
		      from dbo.Items
		      join dbo.Awards on Awards.CategoryId = Items.CategoryId
		                     and Awards.Active = 1
		                     and Awards.BidStartDate <= @EffectiveDate
		                     and Awards.BidEndDate >= @EffectiveDate
		      join dbo.DistrictPP on DistrictPP.PricePlanId = Awards.PricePlanId
		                         and DistrictPP.DistrictId = @DistrictId
		      join dbo.CrossRefs CrCat on CrCat.ItemId = Items.ItemId
		                              and CrCat.CatalogId != 0
		                              and CrCat.CatalogId = Awards.CatalogId
		                              and CrCat.Active = 1
                      join dbo.PPCatalogs on PPCatalogs.PricePlanId = DistrictPP.PricePlanId
                                         and PPCatalogs.CategoryId = Items.CategoryId
                                         and PPCatalogs.CatalogId = Awards.CatalogId
		     where Items.CategoryId = @CategoryId
	               and Items.Active = 1
                               ) sCat on sCat.ItemId = Items.ItemId
            left outer join (
		    select Items.ItemId, CrBid.CrossRefId, BidItems.BidItemId, Awards.AwardId
		      from dbo.Items
		      join dbo.Awards on Awards.CategoryId = Items.CategoryId
		                     and Awards.Active = 1
		                     and Awards.BidStartDate <= @EffectiveDate
		                     and Awards.BidEndDate >= @EffectiveDate
		      join dbo.DistrictPP on DistrictPP.PricePlanId = Awards.PricePlanId
		                         and DistrictPP.DistrictId = @DistrictId
		      join dbo.BidItems on BidItems.ItemId = Items.ItemId
		                                  and BidItems.AwardId = Awards.AwardId
		      join dbo.Bids on Bids.BidId = BidItems.BidId
		                              and Bids.Active = 1
		      join dbo.CrossRefs CrBid on CrBid.ItemId = Items.ItemId
		                                         and isnull(CrBid.CatalogId,0) = 0
		                                         and CrBid.Active = 1
		     where Items.CategoryId = @CategoryId
	               and Items.Active = 1
                       and isnull(Bids.BidHeaderId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else isnull(@BidHeaderId,0) end
                             ) sBid on sBid.ItemId = Items.ItemId
	     where Items.CategoryId = @CategoryId
               and Items.Active = 1
            ) ss on ss.ItemId = I1.ItemId
        join dbo.Awards on Awards.AwardId = ss.AwardId
        join dbo.Vendors on Vendors.VendorId = Awards.VendorId
        join dbo.Category on Category.CategoryId = I1.CategoryId
        left outer join dbo.Catalog on Catalog.CatalogId = Awards.CatalogId
        left outer join dbo.Units on Units.UnitId = I1.UnitId
        left outer join dbo.CrossRefs CrCat on CrCat.CrossRefId = ss.CrossRefId
        left outer join dbo.CrossRefs CrBid on CrBid.CrossRefId = ss.CrossRefIdBid
        left outer join dbo.BidItems on BidItems.BidItemId = ss.BidItemId
                                    and BidItems.AwardId = Awards.AwardId
        left outer join dbo.Bids on Bids.BidId = BidItems.BidId
       where I1.CategoryId = @CategoryId
         and I1.Active = 1
         and isnull(Bids.BidHeaderId,0) = case isnull(I1.DistrictId,0) when 0 then 0 else isnull(@BidHeaderId,0) end

  select @ItemCount = count(*)
    from (select ItemId from @ItemTable) it

  Update @ItemTable
     set ItemCount = @ItemCount

  return
end
```
