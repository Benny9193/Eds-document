# Function: table-valued: `dbo.uf_LookupPriceByBHLong`

_Generated on 2026-05-04T13:43:19.036Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_LookupPriceByBHLong` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2020-12-23 19:13:05 |
| Modified | 2024-12-11 16:36:03 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pItemId` | IN | int |  |
| 2 | `@pBidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `BidManufacturers` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `BidsCatalogList` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Headings` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Keywords` | USER_TABLE |  |
| `MappedItems` | USER_TABLE |  |
| `Units` | USER_TABLE |  |
| `vw_BidItemLongDescription` | VIEW |  |
| `vw_CrossRefsLongDescription` | VIEW |  |
| `vw_ItemDescription` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--select * from uf_LookupPriceByBH(2528876,10454)
--select * from CrossRefs where CrossRefId = 582092902
--select * from BidItems where BidItemId = 59664528
CREATE     function [dbo].[uf_LookupPriceByBHLong] (@pItemId int, @pBidHeaderId int)
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
Description	varchar(4500) null,
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
BidType		int null
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
	@ItemCount int,
	@BidHeaderId int,
	@BudgetId int,
	@ItemCode varchar(50),
	@DropSeq varchar(16)

declare @BidsList table (BidHeaderId int)

  -- Build Base List of Bids 
  insert @BidsList (BidHeaderId)
    select @pBidHeaderId
   
  -- Add All other bids needed to list
  while @@rowcount != 0
  begin
	-- Add Parent PreBids
	insert @BidsList (BidHeaderId)
	  select BidHeaders.BidHeaderId
		from @BidsList bl 
		join BidHeaders on BidHeaders.ParentBidHeaderId = bl.BidHeaderId
					   and getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
		left outer join @BidsList ble on ble.BidHeaderId = BidHeaders.BidHeaderId
	   where ble.BidHeaderId is null
	   group by BidHeaders.BidHeaderId
  end

-- Beginning of New Code 2/19/17 DCH vvvvvvvvvvvvvvvvvvvvvvvvvvvv
   insert @ItemTable (BidHeaderId, [ItemId])
     values (@pBidHeaderId, @pItemId)

  -- Remap items with new Id's
  Update it
     set ItemId = MappedItems.NewItemId
    from @ItemTable it
    join MappedItems on MappedItems.OrigItemId = it.ItemId
                    and MappedItems.NewItemId != it.ItemId
/*
  -- Bid specific Remap items with new Id's
  Update it
     set ItemId = BidMappedItems.NewItemId
    from @ItemTable it
    join BidMappedItems on BidMappedItems.OrigItemId = it.ItemId
    join @BidsList bl on bl.BidHeaderId = BidMappedItems.BidHeaderId
   where it.ItemId != BidMappedItems.NewItemId
*/
  -- Delete Duplicates post mapping
/*  delete it
    from @ItemTable it
    join (select ItemId, min(sysId) minSysId
            from @ItemTable it1
           group by ItemId) ss on ss.ItemId = it.ItemId
                                   and ss.minSysId != it.SysId
*/
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
		 BidType = BestBid.BidType,
		 CrossRefId = BestBid.CrossRefId
    from @ItemTable it
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
				                  and BidHeaders.BidHeaderId in (select bl.BidHeaderId 
																   from @BidsList bl 
																  group by bl.BidHeaderId)
				   join Awards on Awards.BidId = Bids.BidId
			       left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
				  where BidItems.ItemId = it.ItemId
				  order by case when isnull(Bids.VendorId,0) in (0,7691) then 1 else 0 end, round(BidItems.Price - round(BidItems.Price * isnull(Bids.BidDiscountRate,0) / 100,2),2)) BestBid
	where BestBid.BidItemId > 0
/*
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
		 CrossRefId = BidItems.CrossRefId
    from @ItemTable it
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
		 CrossRefId = CrossRefs.CrossRefId
    from @Itemtable it
    join CrossRefs on CrossRefs.CrossRefId = 
      (select top 1 xr.CrossRefId
         from CrossRefs xr with (nolock)
         join Catalog cat on Cat.CatalogId = xr.CatalogId
         join BidsCatalogList bcl on bcl.CatalogId = Cat.CatalogId
         join Bids b on b.BidId = bcl.BidId
                    and b.Active = 1
         join BidHeaders bh on bh.BidHeaderId = b.BidHeaderId
         join @BidsList bl on bl.BidHeaderId = bh.BidHeaderId
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
         join @BidsList bl on bl.BidHeaderId = bh.BidHeaderId
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
		 CrossRefId = CrossRefs.CrossRefId
    from @ItemTable it
    join Items on Items.ItemId = it.ItemId
    join BidHeaders on BidHeaders.BidHeaderId in (select bl.BidHeaderId from @BidsList bl group by bl.BidHeaderId)
    join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
             and Bids.Active = 1
    join BidManufacturers on BidManufacturers.BidId = Bids.BidId
                         and BidManufacturers.ManufacturerId = Items.ManufacturerId
    left outer join CrossRefs on CrossRefs.CrossRefId = 
      (select top 1 xr.CrossRefId
         from CrossRefs xr with (nolock)
         join Catalog cat on Cat.CatalogId = xr.CatalogId
                         and Cat.Active = 1
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
--         Description = case when datalength(dd.ItemDescription) > 1024 then left(dd.ItemDescription,1021) + '...' else dd.ItemDescription end,
		 Description = coalesce(vxr.ItemDescription, vBid.ItemDescription,vid.ItemDescription,''),
         UnitId = Items.UnitId,
         UnitCode = Units.Code,
         SortSeq = Items.SortSeq
    from @ItemTable it
    join Items on Items.ItemId = it.ItemId
--    join vw_ItemDescription dd on dd.ItemId = it.ItemId
	left outer join vw_BidItemLongDescription vbid on isnull(vbid.BidHeaderId,0) = it.BidHeaderId
											  and vbid.ItemId = it.ItemId
	left outer join vw_CrossRefsLongDescription vxr on vxr.CrossRefId = it.CrossRefId
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

  return
end
```
