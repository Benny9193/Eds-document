# Function: table-valued: `dbo.uf_LookupItemCodeByReqVendorTest`

_Generated on 2026-05-04T13:43:19.031Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_LookupItemCodeByReqVendorTest` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2017-04-04 11:49:38 |
| Modified | 2017-04-04 12:36:49 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRequisitionId` | IN | int |  |
| 2 | `@pItemCode` | IN | varchar(255) |  |
| 3 | `@pVendorId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidImportCatalogList` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `BidManufacturers` | USER_TABLE |  |
| `BidMappedItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `BidsCatalogList` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `DistrictCategories` | USER_TABLE |  |
| `DistrictPP` | USER_TABLE |  |
| `Headings` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Keywords` | USER_TABLE |  |
| `MappedItems` | USER_TABLE |  |
| `PPCategory` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Units` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `vw_ItemDescription` | VIEW |  |
| `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_PackCodeCatalog` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[uf_LookupItemCodeByReqVendorTest] (@pRequisitionId int, @pItemCode varchar(255), @pVendorId int)
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
ItemMustBeBid	int null,
PriceType	int null,
ItemBidType		int null,
SortSeq		varchar(255) null,
StandardItem char(1) null,
LastYearsQuantity int null,
SysId int identity(1,1) not null
)
 
as
begin
declare @CrossRefId int,
	@CrossRefIdBid int,	
	@PricePlanId int,
	@DistrictId int,
	@CatalogId int,
	@VendorId int,
	@ItemId int,
	@BidItemId int,
	@AwardId int,
	@CategoryId int,
	@ItemCount int,
	@BidHeaderId int,
	@BudgetId int,
	@ItemCode varchar(50),
	@DropSeq varchar(16)

declare @BidsList table (RequisitionId int, BidHeaderId int)
declare @catlist table (CatalogId int, PackedCode varchar(50))

  select @CategoryId = isnull(Requisitions.CategoryId,0),
         @BidHeaderId = isnull(Requisitions.BidHeaderId,0),
         @DistrictId = isnull(Budgets.DistrictId,0),
         @BudgetId = isnull(Budgets.BudgetId,0)
    from Requisitions with (nolock) 
    left outer join Budgets on Budgets.BudgetId = Requisitions.BudgetId
   where RequisitionId = @pRequisitionId

  -- Build Base List of Bids for each Requisition
  insert @BidsList (RequisitionId, BidHeaderId)
    select Requisitions.RequisitionId, Requisitions.BidHeaderId
      from Requisitions 
     where Requisitions.RequisitionId = @pRequisitionId
     group by Requisitions.RequisitionId, Requisitions.BidHeaderId
   
  -- Add All other bids needed to list
  while @@rowcount != 0
  begin
	-- Add Parent PreBids
	insert @BidsList (RequisitionId, BidHeaderId)
	  select Requisitions.RequisitionId, BidHeaders.BidHeaderId
		from Requisitions with (nolock)
		join @BidsList bl on bl.RequisitionId = Requisitions.RequisitionId
		join Budgets on Budgets.BudgetId = Requisitions.BudgetId
		join Category on Category.CategoryId = Requisitions.CategoryId
		join BidHeaders on BidHeaders.CategoryId = Requisitions.CategoryId
		               and BidHeaders.Active = 1
		               and BidHeaders.ParentBidHeaderId = bl.BidHeaderId
 		               and isnull(BidHeaders.DistrictId,0) = case isnull(BidHeaders.BidType,1) when 2 then Budgets.DistrictId else isnull(BidHeaders.DistrictId,0) end
					   and getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
		join PPCategory on PPCategory.PricePlanId = BidHeaders.PricePlanId
				       and PPCategory.CategoryId = BidHeaders.CategoryId
		join DistrictPP on DistrictPP.PricePlanId = BidHeaders.PricePlanId
					   and DistrictPP.DistrictId = Budgets.DistrictId
		left outer join @BidsList ble on ble.RequisitionId = Requisitions.RequisitionId
		                             and ble.BidHeaderId = BidHeaders.BidHeaderId
	   where BidHeaders.PricePlanId = DistrictPP.PricePlanId
	     and ble.BidHeaderId is null
	   group by Requisitions.RequisitionId, BidHeaders.BidHeaderId
  end

  Select @VendorId = isnull(@pVendorId,0)

  if @VendorId != 0 and @VendorId != 7853
  begin
    insert @CatList (CatalogId, PackedCode)
    select CatalogId, PackedCode
      from (
		select Catalog.CatalogId, dbo.uf_PackCodeCatalog(@pItemCode, Catalog.CatalogId) PackedCode 
		  from BidHeaders with (nolock)
		  join @BidsList bl on bl.BidHeaderId = BidHeaders.BidHeaderId
		  join Bids on Bids.BidHeaderId = Bidheaders.BidHeaderId
				   and Bids.Active = 1
				   and Bids.vendorId = @VendorID
		  join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
		  join Catalog on Catalog.CatalogId = BidsCatalogList.CatalogId
					  and Catalog.Active = 1
	) ss
	group by CatalogId, PackedCode

-- Beginning of New Code 2/19/17 DCH vvvvvvvvvvvvvvvvvvvvvvvvvvvv
   insert @ItemTable ([ItemId])
        select Items.ItemId
          from BidHeaders with (nolock)
  		  join @BidsList bl on bl.BidHeaderId = BidHeaders.BidHeaderId
          join Bids on Bids.BidHeaderId = Bidheaders.BidHeaderId
                   and Bids.Active = 1
                   and Bids.vendorId = @VendorID
          join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
          join Catalog on Catalog.CatalogId = BidsCatalogList.CatalogId
                      and Catalog.Active = 1
                      and Catalog.VendorId = @VendorId
          join Category on Category.CategoryId = BidHeaders.CategoryId
                       and Category.Active = 1
          join BidItems on BidItems.BidId = Bids.BidId
          join Items on Items.ItemId = BidItems.ItemId
                    and Items.Active = 1
                    and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
          join @CatList cl on Cl.CatalogId = Catalog.CatalogId
          join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
                          and CrossRefs.Active = 1
                          and CrossRefs.CatalogId = cl.CatalogId
                          and CrossRefs.PackedCode = cl.PackedCode
        group by Items.ItemId

    insert @ItemTable ([ItemId])
          select Items.ItemId
            from BidHeaders with (nolock)
  		    join @BidsList bl on bl.BidHeaderId = BidHeaders.BidHeaderId
            join Bids on Bids.BidHeaderId = Bidheaders.BidHeaderId
                     and Bids.Active = 1
                     and Bids.vendorId = @VendorID
            join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
            join Catalog on Catalog.CatalogId = BidsCatalogList.CatalogId
                        and Catalog.Active = 1
                        and Catalog.VendorId = @VendorId
            join Category on Category.CategoryId = BidHeaders.CategoryId
                         and Category.Active = 1
            join @CatList cl on Cl.CatalogId = Catalog.CatalogId
            join BidItems on BidItems.BidId = Bids.BidId
                         and BidItems.PackedVendorItemCode = cl.PackedCode
            join Items on Items.ItemId = BidItems.ItemId
                      and Items.Active = 1
                      and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
            left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
            left outer join @ItemTable it on it.ItemId = Items.ItemId
           where it.ItemId is null
           group by Items.ItemId

    insert @ItemTable ([ItemId])
          select Items.ItemId
            from BidHeaders with (nolock)
  		    join @BidsList bl on bl.BidHeaderId = BidHeaders.BidHeaderId
            join Bids on Bids.BidHeaderId = Bidheaders.BidHeaderId
                     and Bids.Active = 1
                     and Bids.vendorId = @VendorID
            join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
            join Catalog on Catalog.CatalogId = BidsCatalogList.CatalogId
                        and Catalog.Active = 1
                        and Catalog.VendorId = @VendorId
            join Category on Category.CategoryId = BidHeaders.CategoryId
                         and Category.Active = 1
            join @CatList cl on Cl.CatalogId = Catalog.CatalogId
            join CrossRefs on CrossRefs.CatalogId = cl.CatalogId
                          and CrossRefs.PackedCode = cl.PackedCode
                          and CrossRefs.Active = 1
            join Items on Items.ItemId = CrossRefs.ItemId
                      and Items.Active = 1
                      and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
            left outer join @ItemTable it on it.ItemId = Items.ItemId
           where it.ItemId is null
           group by Items.ItemId

    insert @ItemTable ([ItemId])
          select Items.ItemId 
		    from DistrictCategories with (nolock)
  			join Catalog on Catalog.CategoryId = DistrictCategories.CategoryId
  						and Catalog.Active = 1
            join @CatList cl on Cl.CatalogId = Catalog.CatalogId
            join CrossRefs on CrossRefs.CatalogId = cl.CatalogId
                          and CrossRefs.PackedCode = cl.PackedCode
                          and CrossRefs.Active = 1
            join Items on Items.ItemId = CrossRefs.ItemId
                      and Items.Active = 1
                      and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
            left outer join @ItemTable it on it.ItemId = Items.ItemId 
  		   where DistrictCategories.DistrictId = @DistrictId
  			 and DistrictCategories.CategoryId = @categoryId
  			 and DistrictCategories.Active = 1
  			 and DistrictCategories.AllowAddenda = 1
             and it.ItemId is null
           group by Items.ItemId

    insert @ItemTable ([ItemId])
        select Items.ItemId
          from BidHeaders with (nolock)
  		  join @BidsList bl on bl.BidHeaderId = BidHeaders.BidHeaderId
          join BidImports on BidImports.BidHeaderId = Bidheaders.BidHeaderId
                   and BidImports.Active = 1
                   and BidImports.VendorId = @VendorID
          join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId
          join Catalog on Catalog.CatalogId = BidImportCatalogList.CatalogId
                      and Catalog.Active = 1
                      and Catalog.VendorId = @VendorId
          join Category on Category.CategoryId = BidHeaders.CategoryId
                       and Category.Active = 1
          join @CatList cl on Cl.CatalogId = Catalog.CatalogId
          join BidResults on BidResults.BidImportId = BidImports.BidImportId
                         and BidResults.PackedVendorItemCode = cl.PackedCode
                         and BidResults.ItemBidType = 'S'
          join Items on Items.ItemId = BidResults.ItemId
                    and Items.Active = 1
                    and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
          join CrossRefs on CrossRefs.Active = 1
                        and CrossRefs.CatalogId = cl.CatalogId
                        and CrossRefs.PackedCode = cl.PackedCode
          left outer join @ItemTable it on it.ItemId = Items.ItemId
        where (select COUNT(*) from Bids join BidItems on BidItems.BidId = Bids.BidId and BidItems.ItemId = Items.ItemId where Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 and Bids.VendorId != 7691) > 0
          and it.ItemId is null
        group by Items.ItemId
-- End of New code 2/19/17 DCH ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  end
  else
  begin
    select @ItemCode = dbo.uf_PackCode(@pItemCode)
-- Beginning of New Code 2/19/17 DCH vvvvvvvvvvvvvvvvvvvvvvvvvvvv
    insert @ItemTable ([ItemId])
        select Items.ItemId
          from Items with (nolock) 
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
--                         and BidHeaders.BidHeaderId = @BidHeaderId
                         and BidHeaders.Active = 1
  		  join @BidsList bl on bl.BidHeaderId = BidHeaders.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.PackedCode = @ItemCode
           and Items.Active = 1
           and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
         group by Items.ItemId

        insert @ItemTable ([ItemId])
          select Items.ItemId
            from Items with (nolock) 
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join BidsCatalogList on BidsCatalogList.CatalogId = Catalog.CatalogId
            join Bids on Bids.BidId = BidsCatalogList.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
--                           and BidHeaders.BidHeaderId = @BidHeaderId
                           and BidHeaders.Active = 1
  		    join @BidsList bl on bl.BidHeaderId = BidHeaders.BidHeaderId
            left outer join BidMappedItems on BidMappedItems.BidHeaderId = BidHeaders.BidHeaderId
                                          and BidMappedItems.OrigItemId = Items.ItemId
            left outer join @ItemTable it on it.ItemId = coalesce(BidMappedItems.NewItemId,Items.ItemId) 
           where Items.PackedCode = @ItemCode
             and Items.Active = 1
             and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
             and it.ItemId is null
        group by Items.ItemId

        insert @ItemTable ([ItemId])
          select Items.ItemId
            from Items with (nolock) 
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join DistrictCategories on DistrictCategories.DistrictId = @DistrictId
                                   and DistrictCategories.CategoryId = @CategoryId
                                   and DistrictCategories.CategoryId = Items.CategoryId
                                   and DistrictCategories.Active = 1
                                   and DistrictCategories.AllowAddenda = 1

            left outer join @ItemTable it on it.ItemId = Items.ItemId
           where Items.PackedCode = @ItemCode
             and Items.Active = 1
             and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
             and it.ItemId is null
           group by Items.ItemId

 -- END New Code ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  end

  -- Remap items with new Id's
  Update it
     set ItemId = MappedItems.NewItemId
    from @ItemTable it
    join MappedItems on MappedItems.OrigItemId = it.ItemId
   where it.ItemId != MappedItems.NewItemId

  -- Bid specific Remap items with new Id's
  Update it
     set ItemId = BidMappedItems.NewItemId
    from @ItemTable it
    join BidMappedItems on BidMappedItems.OrigItemId = it.ItemId
    join @BidsList bl on bl.BidHeaderId = BidMappedItems.BidHeaderId
   where it.ItemId != BidMappedItems.NewItemId

  -- Delete Duplicates post mapping
  delete it
    from @ItemTable it
    join (select ItemId, min(sysId) minSysId
            from @ItemTable it1
           group by ItemId) ss on ss.ItemId = it.ItemId
                                   and ss.minSysId != it.SysId
  -- Reset info for All Items
  Update it
     set CatalogId = null,
         BidPrice = null,
         CatalogPrice = null,
         GrossPrice = null,
         DiscountRate = null,
         Page = null,
         PricePlanId = null,
         AwardId = null,
         VendorId = null,
         VendorItemCode = null,
         Alternate = null,
         BidItemId = null,
         ItemMustBeBid = null
    from @ItemTable it

--  insert DebugMsgs (Msg) values ((select Detail.DetailId, Detail.CatalogId, Detail.BidItemId, Detail.BidPrice, Detail.ItemMustBeBid from inserted join Detail on Detail.DetailId = inserted.DetailId for xml auto))
  -- Set Bid Item info if valid and no other prices are set
  Update it
     set CatalogId = CrossRefs.CatalogId,
         BidPrice = round(BidItems.Price - round(BidItems.Price * isnull(Bids.BidDiscountRate,0) / 100,2),2),
         CatalogPrice = CrossRefs.CatalogPrice,
         GrossPrice = round(BidItems.Price,2),
         DiscountRate = isnull(Bids.BidDiscountRate,0),
         Page = CrossRefs.Page,
         PricePlanId = BidHeaders.PricePlanId,
         AwardId = Awards.AwardId,
         VendorId = Bids.VendorId,
         VendorItemCode = BidItems.VendorItemCode,
         Alternate = BidItems.Alternate,
         BidItemId = BidItems.BidItemId,
         ItemMustBeBid = 0
    from @ItemTable it
    join Category on Category.CategoryId = @CategoryId
                 and Category.Type in (1,2,4)
    join BidHeaders on BidHeaders.BidHeaderId in (select bl.BidHeaderId from @BidsList bl group by bl.BidHeaderId )
    join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
             and Bids.Active = 1
    join BidItems on BidItems.ItemId = it.ItemId
                 and BidItems.BidId = Bids.BidId
    join Awards on Awards.BidId = Bids.BidId
    left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
   where it.ItemMustBeBid is null

  -- Set Catalog Prices for Catalog Items
--  insert DebugMsgs (Msg) values ((select Detail.DetailId, Detail.CatalogId, Detail.BidItemId, Detail.BidPrice, Detail.ItemMustBeBid from inserted join Detail on Detail.DetailId = inserted.DetailId for xml auto))
  Update it
     set CatalogId = CrossRefs.CatalogId,
         BidPrice = round(case isnull(Crossrefs.DoNotDiscount,0) when 0 then CrossRefs.GrossPrice - round(CrossRefs.GrossPrice * isnull(BidsCatalogList.DiscountRate,0) / 100,2) else Crossrefs.GrossPrice end,2),
         CatalogPrice = CrossRefs.CatalogPrice,
         GrossPrice = round(CrossRefs.GrossPrice,2),
         DiscountRate = case isnull(Crossrefs.DoNotDiscount,0) when 0 then isnull(BidsCatalogList.DiscountRate,0) else 0 end,
         Page = CrossRefs.Page,
         PricePlanId = BidHeaders.PricePlanId,
         AwardId = Awards.AwardId,
         VendorId = Bids.VendorId,
         VendorItemCode = CrossRefs.VendorItemCode,
         Alternate = null,
         BidItemId = null,
         ItemMustBeBid = 0
    from @Itemtable it
    join Category on Category.CategoryId = @CategoryId
                 and Category.Type in (1,2,4)
    join CrossRefs on CrossRefs.CrossRefId = 
      (select top 1 xr.CrossRefId
         from CrossRefs xr with (nolock)
         join Catalog cat on Cat.CatalogId = xr.CatalogId
         join BidsCatalogList bcl on bcl.CatalogId = Cat.CatalogId
         join Bids b on b.BidId = bcl.BidId
                    and b.Active = 1
         join BidHeaders bh on bh.BidHeaderId = b.BidHeaderId
         join @BidsList bl on bl.RequisitionId = @pRequisitionId
                          and bl.BidHeaderId = bh.BidHeaderId
        where xr.ItemId = it.ItemId
          and xr.Active = 1
        order by case isnull(xr.DoNotDiscount,0) when 0 then xr.GrossPrice - round(xr.GrossPrice * isnull(bcl.DiscountRate,0) / 100,2) else xr.GrossPrice end, xr.CatalogYear desc, xr.CrossRefId
       )
    join BidsCatalogList on BidsCatalogList.BidCatalogId = 
      (select top 1 bcl.BidCatalogId
         from CrossRefs xr with (nolock)
         join Catalog cat on cat.CatalogId = xr.CatalogId
         join BidsCatalogList bcl on bcl.CatalogId = cat.CatalogId
         join Bids b on b.BidId = bcl.BidId
                    and b.Active = 1
         join BidHeaders bh on bh.BidHeaderId = b.BidHeaderId
         join @BidsList bl on bl.RequisitionId = @pRequisitionId
                          and bl.BidHeaderId = bh.BidHeaderId
        where xr.ItemId = it.ItemId
          and xr.Active = 1
        order by case isnull(xr.DoNotDiscount,0) when 0 then xr.GrossPrice - round(xr.GrossPrice * isnull(bcl.DiscountRate,0) / 100,2) else xr.GrossPrice end, xr.CatalogYear desc, xr.CrossRefId
       )
    join Bids on Bids.BidId = BidsCatalogList.BidId
    join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
    join Awards on Awards.BidId = Bids.BidId
   where it.ItemMustBeBid is null
     
  -- Set MSRP Pricing 
  Update it
     set CatalogId = CrossRefs.CatalogId,
         BidPrice = coalesce(round(Items.ListPrice - round(Items.ListPrice * isnull(BidManufacturers.DiscountRate,0) / 100,2),2),0),
         CatalogPrice = coalesce(Items.ListPrice,0),
         GrossPrice = coalesce(Items.ListPrice,0),
         DiscountRate = isnull(BidManufacturers.DiscountRate,0),
         Page = CrossRefs.Page,
         PricePlanId = null,
         AwardId = null,
         VendorId = Bids.VendorId,
         VendorItemCode = case coalesce(rtrim(Items.VendorPartNumber),'') when '' then 'N/A' else Items.VendorPartNumber end,
         Alternate = null,
         BidItemId = null,
         ItemMustBeBid = 0
    from @ItemTable it
    join Category on Category.CategoryId = @CategoryId
                 and Category.Type = 5
    join Items on Items.ItemId = it.ItemId
    join BidHeaders on BidHeaders.BidHeaderId in (select bl.BidHeaderId from @BidsList bl where bl.RequisitionId = @pRequisitionId group by bl.BidHeaderId)
    join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
             and Bids.Active = 1
    join BidManufacturers on BidManufacturers.BidId = Bids.BidId
                         and BidManufacturers.ManufacturerId = Items.ManufacturerId
    left outer join CrossRefs on CrossRefs.CrossRefId = 
      (select top 1 xr.CrossRefId
         from CrossRefs xr with (nolock)
         join Catalog cat on Cat.CatalogId = xr.CatalogId
                         and Cat.Active = 1
                         and Cat.CategoryId = @CategoryId
        where xr.ItemId = it.ItemId
          and xr.Active = 1
        order by case isnull(xr.GrossPrice,0) when 0 then 0 else 1 end desc, xr.CatalogYear desc, isnull(xr.GrossPrice,0), xr.CrossRefId desc) 
   where it.ItemMustBeBid is null

  -- Set Addenda item info if valid and no other prices are set
--  insert DebugMsgs (Msg) values ((select Detail.DetailId, Detail.CatalogId, Detail.BidItemId, Detail.BidPrice, Detail.ItemMustBeBid from inserted join Detail on Detail.DetailId = inserted.DetailId for xml auto))
  Update it
     set CatalogId = CrossRefs.CatalogId,
         BidPrice = round(coalesce(Items.ListPrice,CrossRefs.CatalogPrice, CrossRefs.GrossPrice / .85,0),2),--round(case coalesce(Items.ListPrice,0) when 0 then coalesce(CrossRefs.CatalogPrice, CrossRefs.GrossPrice / .85) else Items.ListPrice end,2),
         CatalogPrice = round(coalesce(Items.ListPrice,CrossRefs.CatalogPrice, CrossRefs.GrossPrice / .85,0),2),--case coalesce(Items.ListPrice,0) when 0 then coalesce(CrossRefs.CatalogPrice, CrossRefs.GrossPrice) else Items.ListPrice end,
         GrossPrice = round(coalesce(Items.ListPrice,CrossRefs.CatalogPrice, CrossRefs.GrossPrice / .85,0),2),--round(case coalesce(Items.ListPrice,0) when 0 then coalesce(CrossRefs.CatalogPrice, CrossRefs.GrossPrice / .85) else Items.ListPrice end,2),
         DiscountRate = null,
         Page = CrossRefs.Page,
         PricePlanId = null,
         AwardId = null,
         VendorId = null,
         VendorItemCode = null,
         Alternate = null,
         BidItemId = null,
         ItemMustBeBid = 1
    from @ItemTable it
    join Budgets on Budgets.BudgetId = @BudgetId
    join DistrictCategories on DistrictCategories.DistrictId = Budgets.DistrictId
                           and DistrictCategories.CategoryId = @CategoryId
                           and DistrictCategories.AllowAddenda = 1
    join Items on Items.ItemId = it.ItemId
    left outer join CrossRefs on CrossRefs.CrossRefId = 
      (select top 1 xr.CrossRefId
         from CrossRefs xr with (nolock)
         join Catalog cat on Cat.CatalogId = xr.CatalogId
                         and Cat.Active = 1
                         and Cat.CategoryId = @CategoryId
        where xr.ItemId = it.ItemId
          and xr.Active = 1
        order by case isnull(xr.GrossPrice,0) when 0 then 0 else 1 end desc, xr.CatalogYear desc, isnull(xr.GrossPrice,0), xr.CrossRefId desc) 
   where it.ItemMustBeBid is null

  -- Mark items which did not fall into any of the previous updates as NoBid items
  Update it
     set CatalogId = null,
         BidPrice = null,
         CatalogPrice = null,
         GrossPrice = null,
         DiscountRate = null,
         Page = null,
         PricePlanId = null,
         AwardId = null,
         VendorId = 7691,
         VendorItemCode = null,
         Alternate = null,
         BidItemId = null,
         ItemMustBeBid = 0
    from @ItemTable it
   where it.ItemMustBeBid is null
   
  --Update Common Information 
--  insert DebugMsgs (Msg) values ((select Detail.DetailId, Detail.CatalogId, Detail.BidItemId, Detail.BidPrice, Detail.ItemMustBeBid from inserted join Detail on Detail.DetailId = inserted.DetailId for xml auto))
  Update it
     set ItemCode = Items.ItemCode,
         Description = case when datalength(dd.ItemDescription) > 1024 then left(dd.ItemDescription,1021) + '...' else dd.ItemDescription end,
         UnitId = Items.UnitId,
         UnitCode = Units.Code,
         SortSeq = Items.SortSeq
    from @ItemTable it
    join vw_ItemDescription dd on dd.ItemId = it.ItemId
    join Items on Items.ItemId = it.ItemId
    left outer join Units on Units.UnitId = Items.UnitId
    left outer join Headings on Headings.HeadingId = Items.HeadingId
    left outer join Keywords on Keywords.KeywordId = Items.KeywordId
--************************************* Del Down *******************************************************
/*
Update @ItemTable
   set CatalogId = CrossRefs.CatalogId,
       ItemCode = Items.ItemCode,
       Description = 
           case 
             when len(
               case isnull(Category.AllowAddenda,0) 
				 when 0 then ''
				 else
				   case isnull(Headings.HeadingId,0)
					 when 0 then ''
					 else 
					   ltrim(rtrim(isnull(Headings.Title,''))) +
					   case isnull(Keywords.KeywordId,0)
						 when 0 then ''
						 else
						   ' ' + ltrim(rtrim(isnull(Keywords.Keyword,'')))
					   end + char(13) + char(10)
					end 
			   end +
			   isnull(Items.Description,'') +   
			   case isnull(Category.Type,1)
				 when 2 then   
				   case isnull(Items.ParentCatalogId,0)   
					 when 0 then ''   
					 else char(13) + char(10) + 'Publisher: ' + isnull(pc.Name,'')  
				   end +   
				   case isnull(BookTypes.BookTypeId,0)   
					 when 0 then ''   
					 else char(13) + char(10) + 'Edition: ' + isnull(BookTypes.BookType,'')   
				   end +   
				   case isnull(Items.CopyrightYear,0)   
					 when 0 then ''   
					 else char(13) + char(10) + 'Copyright Year: ' + isnull(convert(varchar(32),Items.CopyrightYear,101),'None')
				   end    
				 else   
				   case isnull(Category.AllowAddenda,0)   
					 when 0 then ''                         
					 else   
					   case isnull(Items.BrandName,'')  
						 when '' then ''  
						 else char(13) + char(10) + 'Brand Name: ' + isnull(Items.BrandName,'')  
					   end +  
					   case isnull(Items.ManufacturorNumber,'')  
						 when '' then ''  
						 else char(13) + char(10) + 'Manufacturer Number:' + isnull(Items.ManufacturorNumber,'')  
					   end +  
					   case isnull(Items.VendorId,0)  
						 when 0 then ''  
						 else char(13) + char(10) + 'Vendor: ' + isnull(Vendors.Name,'')  
					   end +  
					   case isnull(Items.VendorPartNumber,'')  
						 when '' then ''  
						 else char(13) + char(10) + 'Vendor Part Number: ' + isnull(Items.VendorPartNumber,'')  
					   end +  
					   case isnull(Items.ItemsPerUnit,'')  
						 when '' then ''
						 when '0' then ''  
						 else char(13) + char(10) + 'Items Per Unit: ' + isnull(Items.ItemsPerUnit,'')  
					   end 
				   end   
			   end +
           case 
             when isnull(BidItems.BidItemId,0) != 0 then ''
             when isnull(cxr.CrossRefId,0) != 0 then
               case isnull(cxr.AdditionalShipping,0)
                 when 0 then ''
                 else '*** Additional Shipping Charges May Apply ***'
               end
             when isnull(axr.CrossRefId,0) != 0 then
               case isnull(axr.AdditionalShipping,0)
                 when 0 then ''
                 else '*** Additional Shipping Charges May Apply ***'
               end
             else ''
           end) >= 1024 then
           substring(case isnull(Category.AllowAddenda,0) 
             when 0 then ''
             else
               case isnull(Headings.HeadingId,0)
                 when 0 then ''
                 else 
                   ltrim(rtrim(isnull(Headings.Title,''))) +
                   case isnull(Keywords.KeywordId,0)
                     when 0 then ''
                     else
                       ' ' + ltrim(rtrim(isnull(Keywords.Keyword,'')))
                   end + char(13) + char(10)
                end 
           end +
           isnull(Items.Description,'') +   
           case isnull(Category.Type,1)
             when 2 then   
               case isnull(Items.ParentCatalogId,0)   
                 when 0 then ''   
                 else char(13) + char(10) + 'Publisher: ' + isnull(pc.Name,'')  
               end +   
               case isnull(BookTypes.BookTypeId,0)   
                 when 0 then ''   
                 else char(13) + char(10) + 'Edition: ' + isnull(BookTypes.BookType,'')   
               end +   
               case isnull(Items.CopyrightYear,0)   
                 when 0 then ''   
                 else char(13) + char(10) + 'Copyright Year: ' + isnull(convert(varchar(32),Items.CopyrightYear,101),'None')
               end    
             else   
               case isnull(Category.AllowAddenda,0)   
                 when 0 then ''                         
                 else   
                   case isnull(Items.BrandName,'')  
                     when '' then ''  
                     else char(13) + char(10) + 'Brand Name: ' + isnull(Items.BrandName,'')  
                   end +  
                   case isnull(Items.ManufacturorNumber,'')  
                     when '' then ''  
                     else char(13) + char(10) + 'Manufacturer Number:' + isnull(Items.ManufacturorNumber,'')  
                   end +  
                   case isnull(Items.VendorId,0)  
                     when 0 then ''  
                     else char(13) + char(10) + 'Vendor: ' + isnull(Vendors.Name,'')  
                   end +  
                   case isnull(Items.VendorPartNumber,'')  
                     when '' then ''  
                     else char(13) + char(10) + 'Vendor Part Number: ' + isnull(Items.VendorPartNumber,'')  
                   end +  
                   case isnull(Items.ItemsPerUnit,'')  
                     when '' then ''
                     when '0' then ''  
                     else char(13) + char(10) + 'Items Per Unit: ' + isnull(Items.ItemsPerUnit,'')  
                   end 
               end   
           end +
           case 
             when isnull(BidItems.BidItemId,0) != 0 then ''
             when isnull(cxr.CrossRefId,0) != 0 then
               case isnull(cxr.AdditionalShipping,0)
                 when 0 then ''
                 else '*** Additional Shipping Charges May Apply ***'
               end
             when isnull(axr.CrossRefId,0) != 0 then
               case isnull(axr.AdditionalShipping,0)
                 when 0 then ''
                 else '*** Additional Shipping Charges May Apply ***'
               end
             else ''
           end,1,1021) + '...'
           else
           case isnull(Category.AllowAddenda,0) 
             when 0 then ''
             else
               case isnull(Headings.HeadingId,0)
                 when 0 then ''
                 else 
                   ltrim(rtrim(isnull(Headings.Title,''))) +
                   case isnull(Keywords.KeywordId,0)
                     when 0 then ''
                     else
                       ' ' + ltrim(rtrim(isnull(Keywords.Keyword,'')))
                   end + char(13) + char(10)
                end 
           end +
           isnull(Items.Description,'') +   
           case isnull(Category.Type,1)
             when 2 then   
               case isnull(Items.ParentCatalogId,0)   
                 when 0 then ''   
                 else char(13) + char(10) + 'Publisher: ' + isnull(pc.Name,'')  
               end +   
               case isnull(BookTypes.BookTypeId,0)   
                 when 0 then ''   
                 else char(13) + char(10) + 'Edition: ' + isnull(BookTypes.BookType,'')   
               end +   
               case isnull(Items.CopyrightYear,0)   
                 when 0 then ''   
                 else char(13) + char(10) + 'Copyright Year: ' + isnull(convert(varchar(32),Items.CopyrightYear,101),'None')
               end    
             else   
               case isnull(Category.AllowAddenda,0)   
                 when 0 then ''                         
                 else   
                   case isnull(Items.BrandName,'')  
                     when '' then ''  
                     else char(13) + char(10) + 'Brand Name: ' + isnull(Items.BrandName,'')  
                   end +  
                   case isnull(Items.ManufacturorNumber,'')  
                     when '' then ''  
                     else char(13) + char(10) + 'Manufacturer Number:' + isnull(Items.ManufacturorNumber,'')  
                   end +  
                   case isnull(Items.VendorId,0)  
                     when 0 then ''  
                     else char(13) + char(10) + 'Vendor: ' + isnull(Vendors.Name,'')  
                   end +  
                   case isnull(Items.VendorPartNumber,'')  
                     when '' then ''  
                     else char(13) + char(10) + 'Vendor Part Number: ' + isnull(Items.VendorPartNumber,'')  
                   end +  
                   case isnull(Items.ItemsPerUnit,'')  
                     when '' then ''
                     when '0' then ''  
                     else char(13) + char(10) + 'Items Per Unit: ' + isnull(Items.ItemsPerUnit,'')  
                   end   
               end   
           end +
           case 
             when isnull(BidItems.BidItemId,0) != 0 then ''
             when isnull(cxr.CrossRefId,0) != 0 then
               case isnull(cxr.AdditionalShipping,0)
                 when 0 then ''
                 else '*** Additional Shipping Charges May Apply ***'
               end
             when isnull(axr.CrossRefId,0) != 0 then
               case isnull(axr.AdditionalShipping,0)
                 when 0 then ''
                 else '*** Additional Shipping Charges May Apply ***'
               end
             else ''
           end           
           end,
       UnitId = Items.UnitId,
       UnitCode = Units.Code,
       BidPrice = case
                    when isnull(BidItems.BidItemId,0) != 0 then round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) 
                    when isnull(cxr.CrossRefId,0) != 0 then round(case isnull(cxr.DoNotDiscount,0) when 0 then isnull(cxr.GrossPrice,0) - round(cxr.GrossPrice * cacl.DiscountRate / 100,2) else cxr.GrossPrice end,2)
                    when isnull(axr.CrossRefId,0) != 0 then case when isnull(Items.ListPrice,0) != 0 then Items.ListPrice else axr.GrossPrice end
                    else 
                      case isnull(DistrictCategories.AllowAddenda,0) 
                        when 1 then Items.ListPrice
                        else 0
                      end
                  end,
       CatalogPrice = case
                    when isnull(BidItems.BidItemId,0) != 0 then case isnull(bpxr.CatalogPrice,0) when 0 then round(cast(BidItems.Price - ROUND(BidItems.Price * (Bids.BidDiscountRate / 100),2) as money) / .60,2) else bpxr.CatalogPrice end
                    when isnull(cxr.CrossRefId,0) != 0 then cpxr.CatalogPrice
                    when isnull(axr.CrossRefId,0) != 0 then axr.CatalogPrice
                    else 
                      case isnull(DistrictCategories.AllowAddenda,0) 
                        when 1 then Items.ListPrice
                        else 0
                      end
                  end,
       GrossPrice = case
                    when isnull(BidItems.BidItemId,0) != 0 then isnull(BidItems.Price,0)
                    when isnull(cxr.CrossRefId,0) != 0 then cxr.GrossPrice
                    when isnull(axr.CrossRefId,0) != 0 then case when isnull(Items.ListPrice,0) != 0 then Items.ListPrice else axr.GrossPrice end
                    else 
                      case isnull(DistrictCategories.AllowAddenda,0) 
                        when 1 then Items.ListPrice
                        else 0
                      end
                  end,
       DiscountRate = case
                    when isnull(BidItems.BidItemId,0) != 0 then isnull(Bids.BidDiscountRate,0)
                    when isnull(cxr.CrossRefId,0) != 0 then case isnull(cxr.DoNotDiscount,0) when 0 then cacl.DiscountRate else 0 end 
                    when isnull(axr.CrossRefId,0) != 0 then 0
                    else 0
                  end,
       Page = case
                    when isnull(BidItems.BidItemId,0) != 0 then 
                      case isnull(BidItems.PageNo,0) 
                        when 0 then bxr.Page 
                        else 
                          case 
                            when len(cast(BidItems.PageNo as varchar(10))) > 4 then substring(cast(BidItems.PageNo as varchar(10)),1,4) 
                            else cast(BidItems.PageNo as varchar(10)) 
                          end
                      end
                    when isnull(cxr.CrossRefId,0) != 0 then cxr.Page
                    when isnull(axr.CrossRefId,0) != 0 then axr.Page
                    else null
                  end,
       PricePlanId = BidHeaders.PricePlanId,
       AwardId = case
                    when isnull(BidItems.BidItemId,0) != 0 then isnull(ba.AwardId,0)
                    when isnull(cxr.CrossRefId,0) != 0 then isnull(ca.AwardId,0)
                    when isnull(axr.CrossRefId,0) != 0 then 0
                    else 0
                  end,
       VendorId = case
                    when isnull(BidItems.BidItemId,0) != 0 then isnull(Bids.VendorId,7691)
                    when isnull(cxr.CrossRefId,0) != 0 then isnull(ca.VendorId,7691)
                    when isnull(axr.CrossRefId,0) != 0 then case isnull(ac.VendorId,7691) when 7853 then isnull(Items.VendorId,7691) else isnull(ac.VendorId,7691) end
                    else 
                      case isnull(DistrictCategories.AllowAddenda,0) 
                        when 1 then null
                        else 7691
                      end
                  end,
       VendorItemCode = case
                    when isnull(BidItems.BidItemId,0) != 0 then case isnull(BidItems.VendorItemCode,'') when '' then bxr.VendorItemCode else BidItems.VendorItemCode end
                    when isnull(cxr.CrossRefId,0) != 0 then cxr.VendorItemCode
                    when isnull(axr.CrossRefId,0) != 0 then axr.VendorItemCode
                    else 
                      case isnull(DistrictCategories.AllowAddenda,0) 
                        when 1 then isnull(Items.VendorPartNumber,'')
                        else null
                      end
                  end,
       Alternate = case
                    when isnull(BidItems.BidItemId,0) != 0 then BidItems.Alternate
                    when isnull(cxr.CrossRefId,0) != 0 then null
                    when isnull(axr.CrossRefId,0) != 0 then null
                    else null
                  end,
       SortSeq = Items.SortSeq,
       BidItemId = BidItems.BidItemId,
       ItemMustBeBid = case
                    when isnull(BidItems.BidItemId,0) != 0 then 0
                    when isnull(cxr.CrossRefId,0) != 0 then 0
                    when isnull(axr.CrossRefId,0) != 0 then 
                      case isnull(DistrictCategories.AllowAddenda,0) 
                        when 1 then 1
                        else 0
                      end
                    else
                      case isnull(DistrictCategories.AllowAddenda,0) 
                        when 1 then 1
                        else 0
                      end
                  end,
       CrossRefId = case
                      when isnull(BidItems.BidItemId,0) != 0 then bxr.CrossRefId
                      when isnull(cxr.CrossRefId,0) != 0 then cxr.CrossRefId
                      when isnull(axr.CrossRefId,0) != 0 then axr.CrossRefId
                      else null
					end,
       PriceType = case
                     when isnull(BidItems.BidItemid,0) != 0 then -1
                     when isnull(cxr.CrossRefId,0) != 0 then 0
                     when isnull(axr.CrossRefId,0) != 0 then 1
                     else 1
                   end,
       ItemBidType = case isnull(substring(BidItems.ItemBidType,1,1),'') 
                       when 'A' then 0 
                       when 'C' then 1 
                       when '' then 2 
                       else 3 
                     end,
       StandardItem = isnull(cast(Items.StandardItem as char(1)),'0')
  from @ItemTable it 
  join Items on Items.ItemId = it.ItemId
  join Requisitions on Requisitions.RequisitionId = @pRequisitionId
  join Category on Category.categoryId = Requisitions.CategoryId
  join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
  join DistrictCategories on DistrictCategories.DistrictId = Budgets.DistrictId
                         and DistrictCategories.CategoryId = Requisitions.CategoryId
                         and DistrictCategories.Active = 1
  left outer join BidItems on BidItems.BidItemId = 
    (select top 1 bi.BidItemId 
       from BidItems bi with (nolock)
       join Bids b on b.BidId = bi.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
      where bi.ItemId = Items.ItemId)
  left outer join Bids on Bids.BidId = 
    (select top 1 b.BidId 
       from BidItems bi with (nolock) 
       join Bids b on b.BidId = bi.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
      where bi.ItemId = Items.ItemId)
  left outer join CrossRefs bxr on bxr.CrossRefId = 
    (select top 1 bi.CrossRefId
       from BidItems bi with (nolock) 
       join Bids b on b.BidId = bi.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
      where bi.ItemId = Items.ItemId)
  left outer join CrossRefs bpxr on bpxr.CrossRefId = 
    (select top 1 bi.CrossRefId
       from BidItems bi with (nolock) 
       join Bids b on b.BidId = bi.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
       join BidsCatalogList bcl on bcl.BidId = b.BidId
       join Catalog cat on cat.CatalogId = bcl.CatalogId
                       and cat.Active = 1
       join CrossRefs xr on xr.CatalogId = Cat.CatalogId
                        and xr.Active = 1
                        and xr.PackedCode = bi.PackedVendorItemCode
      where bi.ItemId = Items.ItemId
      order by xr.CatalogPrice desc, xr.CrossRefId)
  left outer join Awards ba on ba.AwardId = 
    (select top 1 a.AwardId
       from BidItems bi with (nolock) 
       join Bids b on b.BidId = bi.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
       join Awards a on a.BidId = b.BidId
                    and a.Active =  1
      where bi.ItemId = Items.ItemId)
  left outer join CrossRefs cxr on cxr.CrossRefId = 
    (select top 1 xr.CrossRefId
       from Crossrefs xr with (nolock)
       join Catalog cat on cat.CatalogId = xr.CatalogId
       join AwardsCatalogList acl on acl.CatalogId = cat.CatalogId
       join Awards a on a.AwardId = acl.AwardId
                    and a.Active = 1
       join Bids b on b.BidId = a.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
      where xr.ItemId = Items.ItemId
        and xr.Active = 1
      order by round(case isnull(xr.DoNotDiscount,0) when 0 then isnull(xr.GrossPrice,0) - round(acl.DiscountRate * isnull(xr.GrossPrice,0) / 100,2) else xr.GrossPrice end,2), xr.CrossRefId)
  left outer join CrossRefs cpxr on cpxr.CrossRefId = 
    (select top 1 xr.CrossRefId
       from Crossrefs xr with (nolock)
       join Catalog cat on cat.CatalogId = xr.CatalogId
       join AwardsCatalogList acl on acl.CatalogId = cat.CatalogId
       join Awards a on a.AwardId = acl.AwardId
                    and a.Active = 1
       join Bids b on b.BidId = a.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
      where xr.ItemId = Items.ItemId
        and xr.Active = 1
      order by xr.CatalogPrice desc, xr.CrossRefId)
  left outer join Catalog cc on Cc.CatalogId = 
    (select top 1 cat.CatalogId
       from Crossrefs xr with (nolock)
       join Catalog cat on cat.CatalogId = xr.CatalogId
       join AwardsCatalogList acl on acl.CatalogId = cat.CatalogId
       join Awards a on a.AwardId = acl.AwardId
                    and a.Active = 1
       join Bids b on b.BidId = a.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
      where xr.ItemId = Items.ItemId
        and xr.Active = 1
      order by round(case isnull(xr.DoNotDiscount,0) when 0 then isnull(xr.GrossPrice,0) - round(acl.DiscountRate * isnull(xr.GrossPrice,0) / 100,2) else xr.GrossPrice end,2), xr.CrossRefId)
  left outer join Awards ca on ca.AwardId = 
    (select top 1 a.AwardId
       from Crossrefs xr with (nolock)
       join Catalog cat on cat.CatalogId = xr.CatalogId
       join AwardsCatalogList acl on acl.CatalogId = cat.CatalogId
       join Awards a on a.AwardId = acl.AwardId
                    and a.Active = 1
       join Bids b on b.BidId = a.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
      where xr.ItemId = Items.ItemId
        and xr.Active = 1
      order by round(case isnull(xr.DoNotDiscount,0) when 0 then isnull(xr.GrossPrice,0) - round(acl.DiscountRate * isnull(xr.GrossPrice,0) / 100,2) else xr.GrossPrice end,2), xr.CrossRefId)
  left outer join AwardsCatalogList cacl on cacl.AwardCatalogId = 
    (select top 1 acl.AwardCatalogId
       from Crossrefs xr with (nolock)
       join Catalog cat on cat.CatalogId = xr.CatalogId

       join AwardsCatalogList acl on acl.CatalogId = cat.CatalogId
       join Awards a on a.AwardId = acl.AwardId
                    and a.Active = 1
       join Bids b on b.BidId = a.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
      where xr.ItemId = Items.ItemId
        and xr.Active = 1
      order by round(case isnull(xr.DoNotDiscount,0) when 0 then isnull(xr.GrossPrice,0) - round(acl.DiscountRate * isnull(xr.GrossPrice,0) / 100,2) else xr.GrossPrice end,2), xr.CrossRefId)
  left outer join CrossRefs axr on axr.CrossRefId = 
    (select top 1 xr.CrossRefId
       from Crossrefs xr with (nolock)
       join Catalog cat on cat.CatalogId = xr.CatalogId
                       and cat.Active = 1
      where xr.ItemId = Items.ItemId
        and xr.Active = 1
        and DistrictCategories.AllowAddenda = 1
      order by isnull(xr.GrossPrice,0), xr.CrossRefId)
  left outer join Catalog ac on ac.CatalogId = axr.CatalogId
  left outer join CrossRefs on CrossRefs.CrossRefId = case 
                                                        when isnull(bxr.CrossRefId,0) != 0 then bxr.CrossRefId
                                                        when isnull(cxr.CrossRefId,0) != 0 then cxr.CrossRefId
                                                        when isnull(axr.CrossRefId,0) != 0 then axr.CrossRefId
                                                        else null
                                                      end
  left outer join Units on Units.UnitId = Items.UnitId
  left outer join Catalog pc on pc.CatalogId = Items.ParentCatalogId  
  left outer join Headings on Headings.HeadingId = Items.HeadingId  
  left outer join BookTypes on BookTypes.BookTypeId = Items.EditionId  
  left outer join Keywords on Keywords.KeyWordId = Items.KeywordId  
  left outer join Vendors on Vendors.VendorId = Items.VendorId  
*/
/*Update @ItemTable
   set ItemBidType = case isnull(substring(BidItems.ItemBidType,1,1),'') when 'A' then 0 when 'C' then 1 when '' then 2 else 3 end
  from @ItemTable it 
  left outer join BidItems on BidItems.BidItemId = it.BidItemId
*/

/* Replaced code 2/19/17 by DCH
  delete @ItemTable
    from @ItemTable it
   where convert(char(1),isnull(PriceType,-1) + 1) + 
         convert(char(1),isnull(ItemBidType,3)) + 
         cast(case isnull(BidItemId,0) 
                           when 0 then 0 
                           else 1 
                         end as char(1)) +
         StandardItem +
         SortSeq > 
         (select top 1 cast(isnull(PriceType,-1) + 1 as char(1)) + 
                       cast(isnull(ItemBidType,3) as char(1)) + 
                       cast(case isnull(BidItemId,0) 
                              when 0 then 0 
                              else 1 
                            end as char(1)) +
                       StandardItem +
                       SortSeq
            from @ItemTable it1 
            join CrossRefs on CrossRefs.CrossRefId = it1.CrossRefId 
           where CrossRefs.ItemId = (select top 1 x1.ItemId 
                                       from CrossRefs x1 with (nolock) 
                                      where x1.CrossRefId = it.CrossRefId) 
           order by cast(isnull(PriceType,-1) + 1 as char(1)) + 
                    cast(isnull(ItemBidType,3) as char(1)) + 
                    cast(case isnull(BidItemId,0) 
                           when 0 then 0 
                           else 1 
                         end as char(1)) +
         StandardItem +
         SortSeq)
*/
  -- Delete Other Items if any item is Super Item
  if (select count(*) from @ItemTable it where it.ItemCode like 'EDS%') > 0
  begin
	delete @ItemTable
	  from @ItemTable it
	 where it.ItemCode not like 'EDS%'
  end
  
  delete @ItemTable
    from @ItemTable it
   where convert(char(1),isnull(PriceType,-1) + 1) + 
                    RIGHT(replicate('0',10) + cast(BidPrice * 100 as varchar),10) +
         convert(char(1),isnull(ItemBidType,3)) + 
         cast(case isnull(BidItemId,0) 
                           when 0 then 0 
                           else 1 
                         end as char(1)) +
         StandardItem +
         SortSeq > 
         (select top 1 cast(isnull(PriceType,-1) + 1 as char(1)) + 
                    RIGHT(replicate('0',10) + cast(BidPrice * 100 as varchar),10) +
                       cast(isnull(ItemBidType,3) as char(1)) + 
                       cast(case isnull(BidItemId,0) 
                              when 0 then 0 
                              else 1 
                            end as char(1)) +
                       StandardItem +
                       SortSeq
            from @ItemTable it1 
            join CrossRefs on CrossRefs.CrossRefId = it1.CrossRefId 
           where CrossRefs.ItemId = (select top 1 x1.ItemId 
                                       from CrossRefs x1 with (nolock) 
                                      where x1.CrossRefId = it.CrossRefId) 
           order by cast(isnull(PriceType,-1) + 1 as char(1)) + 
                    RIGHT(replicate('0',10) + cast(BidPrice * 100 as varchar),10) +
                    cast(isnull(ItemBidType,3) as char(1)) + 
                    cast(case isnull(BidItemId,0) 
                           when 0 then 0 
                           else 1 
                         end as char(1)) +
         StandardItem +
         SortSeq)


  Update it
     set ItemCount = (select count(*) from @ItemTable),
         LastYearsQuantity = Detail.LastYearsQuantity,
         VendorName = Vendors.Name
    from @ItemTable it
    left outer join Vendors on Vendors.VendorId = it.VendorId
    left outer join Detail on Detail.RequisitionId = @pRequisitionId
                          and Detail.ItemId = it.ItemId

  return
end
```
