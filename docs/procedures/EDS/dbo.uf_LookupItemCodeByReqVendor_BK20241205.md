# Function: table-valued: `dbo.uf_LookupItemCodeByReqVendor_BK20241205`

_Generated on 2026-05-04T13:04:00.566Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_LookupItemCodeByReqVendor_BK20241205` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2024-12-05 00:05:47 |
| Modified | 2024-12-05 00:05:47 |
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
| `SDSDocs` | USER_TABLE |  |
| `Units` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `vw_BidItemDescription` | VIEW |  |
| `vw_DMSSDSDocuments` | VIEW |  |
| `vw_ItemDescription` | VIEW |  |
| `vw_SDSItems` | VIEW |  |
| `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_PackCodeCatalog` | SQL_SCALAR_FUNCTION |  |
| `dbo.CrossRefs` | USER_TABLE | `eds` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--select * from uf_LookupItemCodeByReqVendor(50025331,'016517',3)
CREATE function dbo.uf_LookupItemCodeByReqVendor_BK20241205 (@pRequisitionId int, @pItemCode varchar(255), @pVendorId int)
returns @ItemTable table (
BidHeaderId int null,
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
SysId int identity(1,1) not null,
AdditionalShipping tinyint null,
BidType		int null,
SDSAvail	tinyint,
SearchTermNum	varchar(50) null,
EDSSortKey	varchar(128) null,
SortKey		varchar(50) null,
Sort_Description varchar(1024) null,
Sort_VendorName varchar(128) null,
Sort_UnitCode varchar(20) null,
Sort_LastYearsQuantity varchar(20) null,
Sort_Quantity varchar(20) null,
Sort_BidPrice varchar(30) null,
Sort_VendorItemCode varchar(64) null,
Sort_EDSSortKey varchar(64) null,
Ranking		float null,
OrderCount	int null,
defaultSort	varchar(64) null,
ImageURL	varchar(512) null,
Thumbnail	varchar(512) null,
FullDescription varchar(8000) null,
RawQuantity int null,
ShippingUpdateRequired int null,
ShippingCost money null,
Extended	money null,
rowNumber	int null,
PerishableItem	bit,
PrescriptionRequired	bit
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

declare @BidsList table (RequisitionId int, BidHeaderId int null)
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
--				   and Bids.vendorId = @VendorID
		  join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
		  join Catalog on Catalog.CatalogId = BidsCatalogList.CatalogId
					  and Catalog.Active = 1
				      and Catalog.VendorId = @VendorID
	) ss
	group by CatalogId, PackedCode

-- Beginning of New Code 2/19/17 DCH vvvvvvvvvvvvvvvvvvvvvvvvvvvv
   insert @ItemTable (BidHeaderId, [ItemId])
        select BidHeaders.BidHeaderId, Items.ItemId
          from BidHeaders with (nolock)
  		  join @BidsList bl on bl.BidHeaderId = BidHeaders.BidHeaderId
          join Bids on Bids.BidHeaderId = Bidheaders.BidHeaderId
                   and Bids.Active = 1
--                   and Bids.vendorId = @VendorID
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
        group by BidHeaders.BidHeaderId, Items.ItemId

    insert @ItemTable (BidHeaderId, [ItemId])
          select BidHeaders.BidHeaderId, Items.ItemId
            from BidHeaders with (nolock)
  		    join @BidsList bl on bl.BidHeaderId = BidHeaders.BidHeaderId
            join Bids on Bids.BidHeaderId = Bidheaders.BidHeaderId
                     and Bids.Active = 1
 --                    and Bids.vendorId = @VendorID
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
           group by BidHeaders.BidHeaderId, Items.ItemId

    insert @ItemTable (BidHeaderId, [ItemId])
          select BidHeaders.BidHeaderId, Items.ItemId
            from BidHeaders with (nolock)
  		    join @BidsList bl on bl.BidHeaderId = BidHeaders.BidHeaderId
            join Bids on Bids.BidHeaderId = Bidheaders.BidHeaderId
                     and Bids.Active = 1
--                     and Bids.vendorId = @VendorID
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
           group by BidHeaders.BidHeaderId, Items.ItemId

    insert @ItemTable (BidHeaderId, [ItemId])
          select @BidHeaderId, Items.ItemId 
		    from DistrictCategories with (nolock)
  			join Catalog on Catalog.CategoryId = DistrictCategories.CategoryId
  						and Catalog.Active = 1
            join @CatList cl on Cl.CatalogId = Catalog.CatalogId
            join CrossRefs on CrossRefs.CatalogId = cl.CatalogId
                          and CrossRefs.PackedCode = cl.PackedCode
                          and CrossRefs.Active = 1
            join Items on Items.ItemId = CrossRefs.ItemId
                      and Items.Active = 1
                      and isnull(Items.DistrictId,0) = @DistrictId
--                      and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
            left outer join @ItemTable it on it.ItemId = Items.ItemId 
  		   where DistrictCategories.DistrictId = @DistrictId
  			 and DistrictCategories.CategoryId = @categoryId
  			 and DistrictCategories.Active = 1
  			 and DistrictCategories.AllowAddenda = 1
             and it.ItemId is null
           group by Items.ItemId

    insert @ItemTable (BidHeaderId, [ItemId])
        select bl.BidHeaderId, Items.ItemId
          from BidHeaders with (nolock)
  		  join @BidsList bl on bl.BidHeaderId = BidHeaders.BidHeaderId
          join BidImports on BidImports.BidHeaderId = Bidheaders.BidHeaderId
                   and BidImports.Active = 1
--                   and BidImports.VendorId = @VendorID
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
					and Items.ItemCode like 'EDS%'
          join CrossRefs on CrossRefs.Active = 1
                        and CrossRefs.CatalogId = cl.CatalogId
                        and CrossRefs.PackedCode = cl.PackedCode
          left outer join @ItemTable it on it.ItemId = Items.ItemId
        where (select COUNT(*) from Bids join BidItems on BidItems.BidId = Bids.BidId and BidItems.ItemId = Items.ItemId where Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 and Bids.VendorId != 7691) > 0
          and it.ItemId is null
        group by bl.BidHeaderId, Items.ItemId

-- End of New code 2/19/17 DCH ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  end
  else
  begin
    select @ItemCode = dbo.uf_PackCode(@pItemCode)
-- Beginning of New Code 2/19/17 DCH vvvvvvvvvvvvvvvvvvvvvvvvvvvv
    insert @ItemTable (BidHeaderId, [ItemId])
        select BidHeaders.BidHeaderId, Items.ItemId
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
         group by BidHeaders.BidHeaderId, Items.ItemId

        insert @ItemTable (BidHeaderId, [ItemId])
          select BidHeaders.BidHeaderId, Items.ItemId
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
        group by BidHeaders.BidHeaderId, Items.ItemId

        insert @ItemTable (BidHeaderId, [ItemId])
          select @BidHeaderId, Items.ItemId
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
			 -- The code below allows Global Items for Lumber but not other Cats
             and isnull(Items.DistrictId,0) = case when Items.CategoryId = 48 and isnull(Items.DistrictId,0) = 0 then 0 else @DistrictId end
--             and isnull(Items.DistrictId,0) = @DistrictId
--             and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
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
     set CatalogId = BestBid.CatalogId,
         BidPrice = BestBid.BidPrice,
         CatalogPrice = BestBid.CatalogPrice,
         GrossPrice = BestBid.GrossPrice,
         DiscountRate = BestBid.DiscountRate,
         Page = BestBid.Page,
         PricePlanId = BestBid.PricePlanId,
         AwardId = BestBid.AwardId,
         VendorId = BestBid.VendorId,
         VendorItemCode = BestBid.VendorItemCode,
         Alternate = BestBid.Alternate,
         BidItemId = BestBid.BidItemId,
         ItemMustBeBid = 0,
		 BidType = BestBid.BidType
    from @ItemTable it
    join Category on Category.CategoryId = @CategoryId
                 and Category.Type in (1,2,4)
	outer apply (select top 1 CrossRefs.CatalogId, 
	                    round(BidItems.Price - round(BidItems.Price * isnull(Bids.BidDiscountRate,0) / 100,2),2) BidPrice, 
						CrossRefs.CatalogPrice, 
						round(BidItems.Price,2) GrossPrice, 
						isnull(Bids.BidDiscountRate,0) DiscountRate,
						CrossRefs.Page,
						BidHeaders.PricePlanId,
						Awards.AwardId,
						Bids.VendorId,
						BidItems.VendorItemCode,
						BidItems.Alternate,
						BidItems.BidItemId,
						BidItems.CrossRefId,
						BidHeaders.BidType
				   from BidItems
				   join Bids on Bids.BidId = BidItems.BidId
				            and Bids.Active = 1
				   join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
				                  and BidHeaders.BidHeaderId in (select case coalesce(it.BidHeaderId,0) 
				                                                          when 0 then bl.BidHeaderId 
																		  else it.BidHeaderId 
																		end 
																   from @BidsList bl 
																  where bl.RequisitionId = @pRequisitionId 
																  group by case coalesce(it.BidHeaderId,0) 
																             when 0 then bl.BidHeaderId 
																			 else it.BidHeaderId 
																		   end)
				   join Awards on Awards.BidId = Bids.BidId
			       left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
				  where BidItems.ItemId = it.ItemId
				  order by case when isnull(Bids.VendorId,0) in (0,7691) then 1 else 0 end, round(BidItems.Price - round(BidItems.Price * isnull(Bids.BidDiscountRate,0) / 100,2),2)) BestBid
   where it.ItemMustBeBid is null
     and BestBid.BidItemId is not null

/* DCH Replaced 3/24/2019 Above Code is new, below is old
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
         ItemMustBeBid = 0,
		 BidType = BidHeaders.BidType,
		 SDSAvail = case when isnull(trim(CrossRefs.MSDSRef),'') > '' then 1 else 0 end
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

*/
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
         ItemMustBeBid = 0,
         AdditionalShipping = isnull(CrossRefs.AdditionalShipping,0),
		 BidType = BidHeaders.BidType,
		 SDSAvail = case when isnull(trim(CrossRefs.MSDSRef),'') > '' then 1 else 0 end,
		 PerishableItem = CrossRefs.PerishableItem,
         PrescriptionRequired = CrossRefs.PrescriptionRequired,
         CrossRefId = CrossRefs.CrossRefId
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
         ItemMustBeBid = 0,
		 BidType = BidHeaders.BidType,
		 SDSAvail = case when isnull(trim(CrossRefs.MSDSRef),'') > '' then 1 else 0 end
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
         ItemMustBeBid = 1,
		 BidType = 2,
		 SDSAvail = 0
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
         ItemMustBeBid = 0,
		 SDSAvail = 0
    from @ItemTable it
   where it.ItemMustBeBid is null
   
  --Update Common Information 
--  insert DebugMsgs (Msg) values ((select Detail.DetailId, Detail.CatalogId, Detail.BidItemId, Detail.BidPrice, Detail.ItemMustBeBid from inserted join Detail on Detail.DetailId = inserted.DetailId for xml auto))
  Update it
     set ItemCode = Items.ItemCode,
--         Description = case when datalength(dd.ItemDescription) > 1024 then left(dd.ItemDescription,1021) + '...' else dd.ItemDescription end,
		 Description = coalesce(vBid.ItemDescription,vid.ItemDescription,''),
         UnitId = Items.UnitId,
         UnitCode = Units.Code,
         SortSeq = Items.SortSeq
    from @ItemTable it
    join Items on Items.ItemId = it.ItemId
--    join vw_ItemDescription dd on dd.ItemId = it.ItemId
		left outer join vw_BidItemDescription vbid on isnull(vbid.BidHeaderId,0) = case when vBid.BidHeaderId is null then 0 else it.BidHeaderId end
												  and vbid.ItemId = it.ItemId
		left outer join vw_ItemDescription vid on vid.ItemId = it.ItemId
    left outer join Units on Units.UnitId = Items.UnitId
    left outer join Headings on Headings.HeadingId = Items.HeadingId
    left outer join Keywords on Keywords.KeywordId = Items.KeywordId

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
         VendorName = Vendors.Name,
		 SearchTermNum = CASE ISNULL(Detail.Quantity,0) WHEN 0 THEN '1' ELSE '0' END,
		 SortKey =  SearchTermNum + right(replicate('0',10) + cast(1000000 - 0 as varchar(10)),10),
		 Sort_Description = SearchTermNum + it.Description,
		 Sort_VendorName = SearchTermNum + Vendors.Name,
		 Sort_UnitCode = SearchTermNum + it.UnitCode,
		 Sort_LastYearsQuantity = SearchTermNum + it.LastYearsQuantity,
		 Sort_Quantity = SearchTermNum + Detail.Quantity,
		 Sort_BidPrice = SearchTermNum + right('0000000000' + cast(cast(it.BidPrice * 100 as int) as varchar(20)),10),
		 Sort_VendorItemCode = SearchTermNum + it.VendorItemCode,
		 Sort_EDSSortKey = SearchTermNum + it.SortSeq,
		 Ranking = 0,
		 OrderCount = 0,
		 defaultSort = SearchTermNum + right(replicate('0',10) + cast(1000000 - 0 as varchar(10)),10),
		 ImageURL = coalesce(bi.ImageURL,xr.ImageURL,''),
		 Thumbnail = '<img class="searchThumbnail" src="' + coalesce(bi.ImageURL,xr.ImageURL,'') + '" />',
		 FullDescription = coalesce(xr.FullDescription, it.Description,''),
		 RawQuantity = Quantity,
		 ShippingUpdateRequired = xr.AdditionalShipping,
		 ShippingCost = coalesce(Detail.ShippingCost,0),
		 Extended = coalesce(Detail.BidPrice * Detail.Quantity,0)
    from @ItemTable it
    left outer join Vendors on Vendors.VendorId = it.VendorId
    left outer join Detail on Detail.RequisitionId = @pRequisitionId
                          and Detail.ItemId = it.ItemId
	outer apply (select BidResults.ImageURL from BidItems join BidResults on BidResults.BidResultsId = BidItems.BidResultsId where BidItems.BidItemId = it.BidItemId) bi
	outer apply (select ImageURL, FullDescription, case when trim(coalesce(MSDSRef,'')) like 'http%' then 1 else 0 end SDSAvail, coalesce(AdditionalShipping,0) AdditionalShipping from eds.dbo.CrossRefs where CrossRefs.CrossRefId = it.CrossRefId) xr
    outer apply (select top 1 1 SDSAvail 
                   from SDSDocs 
	  			  where SDSDocs.ItemId = Detail.ItemId
			     union (
			       select top 1 1 SDSAvail
				     from vw_SDSItems si
				     join vw_DMSSDSDocuments dd on dd.MSDSId = si.MSDSId
				    where si.ItemId = Detail.ItemId
			     )) SDSStatus
	

  return
end
```
