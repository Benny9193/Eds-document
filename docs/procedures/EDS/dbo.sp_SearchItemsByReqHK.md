# Procedure: `dbo.sp_SearchItemsByReqHK`

_Generated on 2026-05-04T13:04:24.184Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_SearchItemsByReqHK` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2015-03-02 22:18:49 |
| Modified | 2018-08-07 23:49:16 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRequisitionId` | IN | int |  |
| 2 | `@pVendorId` | IN | int |  |
| 3 | `@pHeadingId` | IN | bigint |  |
| 4 | `@pFilter` | IN | varchar(4096) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `BidManufacturers` | USER_TABLE |  |
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
| `PPCategory` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Units` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `dbo.uf_BidItemDescription` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_CatalogRefsItem` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_SetupSearch` | SQL_SCALAR_FUNCTION |  |
| `dbo.ufn_GoogleToFTS` | unresolved | `master` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--select * from dbo.uf_SearchItemsByReq(1726368, 0, 0, 'crayons') order by Ranking desc, SortSeq
--select * from Requisitions where RequisitionId = 1715646

CREATE procedure [dbo].[sp_SearchItemsByReqHK] @pRequisitionId int, @pVendorId int, @pHeadingId bigint, @pFilter varchar(4096)
as
declare @ItemTable table (
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
CatalogPage		varchar(16) null,
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
Quantity	int null,
LastYearsQuantity int null,
SysId int identity(1,1) not null,
Ranking int null,
CatalogRefs varchar(4096) null
)
 
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
	@DropSeq varchar(16),
	@fts varchar(8000),
	@TableCount int,
	@HeadingId int,
	@KeywordId int,
	@HeadingTitle varchar(255),
	@Keyword varchar(255)

declare @BidsList table (RequisitionId int, BidHeaderId int)
declare @HeadingsAndKeywords table (HeadingId int, KeywordId int)
declare @CatPrices table (sysid int identity(1,1) not null primary key, DetailId int, BidHeaderId int, BidId int, CrossRefId int, CatalogYear char(4), NetPrice money, DiscountRate decimal(9,5))
declare @catlist table (CatalogId int, PackedCode varchar(50))

select @fts = case rtrim(isnull(@pFilter,'')) when '' then '*' else master.dbo.ufn_GoogleToFTS(dbo.uf_SetupSearch(@pFilter)) end

select @CategoryId = isnull(Requisitions.CategoryId,0),
     @BidHeaderId = isnull(Requisitions.BidHeaderId,0),
     @DistrictId = isnull(Budgets.DistrictId,0),
     @BudgetId = isnull(Budgets.BudgetId,0)
from Requisitions with (nolock) 
left outer join Budgets on Budgets.BudgetId = Requisitions.BudgetId
where RequisitionId = @pRequisitionId

-- Extract HeadingId and KeywordId
  select @HeadingId = @pHeadingId & cast(0xFFFFFFFF as bigint)
  select @KeywordId = (@pHeadingId & cast(0xFFFFFFFF00000000 as bigint)) / cast(0x100000000 as bigint)

--Select Base Heading Name and Keyword Name
  select @HeadingTitle = Headings.Title, @Keyword = isnull(Keywords.Keyword,'')
    from Headings
    left outer join Keywords on Keywords.HeadingId = Headings.HeadingId
                            and Keywords.Active = 1
                            and Keywords.KeywordId = @KeywordId
   where Headings.HeadingId = @HeadingId

--Load All Headings and Matching Keywords
  insert @HeadingsAndKeywords (HeadingId, KeywordId)
    select Headings.HeadingId, Keywords.KeywordId
      from Headings
      left outer join Keywords on Keywords.HeadingId = Headings.HeadingId
                              and Keywords.Active = 1
                              and Keywords.Keyword = case when @Keyword = '' then Keywords.Keyword else @Keyword end
     where Headings.CategoryId = @CategoryId
       and Headings.Active = 1
       and Headings.Title = @HeadingTitle
       
-- Build Base List of Bids for each Requisition
  insert @BidsList (RequisitionId, BidHeaderId)
    values (@pRequisitionId, @BidHeaderId)
   
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

  --Find Items to Price

	if @pVendorId != -1
	begin
		insert @ItemTable (BidHeaderId, [ItemId], Ranking)
			select top 200 BidHeaders.BidHeaderId, Items.ItemId, sum(isnull(i.Rank,0) + isnull(bi.Rank,0) + isnull(br.Rank,0) + isnull(brpn.Rank,0) + isnull(c.Rank,0) + isnull(cpn.Rank,0) + isnull(h.Rank,0) + isnull(k.Rank,0)) Ranking
			  from Items with (nolock) 
			  left outer join containstable(Items, Description, @fts) i on i.[Key] = Items.ItemId
			  join Category on Category.CategoryId = Items.CategoryId
						   and Category.Type = 1
			  join BidItems on BidItems.ItemId = Items.ItemId
			  left outer join containstable(BidItems, Alternate, @fts) bi on bi.[Key] = BidItems.BidItemId
			  join BidResults on BidResults.BidResultsId = BidItems.BidResultsId
			  left outer join containstable(BidResults, ManufacturerBid, @fts) br on br.[Key] = BidResults.BidResultsId
			  left outer join containstable(BidResults, ManufPartNoBid, @fts) brpn on brpn.[Key] = BidResults.BidResultsId
			  join Bids on Bids.BidId = BidItems.BidId
					   and Bids.Active = 1
					   and Bids.VendorId = case isnull(@pVendorId,0)
											 when 0 then Bids.VendorId
											 else @pVendorId
										   end
			  join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
							 and BidHeaders.BidHeaderId = @BidHeaderId
							 and BidHeaders.Active = 1
			  left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
			  left outer join containstable(CrossRefs, Manufacturor, @fts) c on c.[Key] = CrossRefs.CrossRefId
			  left outer join containstable(CrossRefs, ManufacturorPartNumber, @fts) cpn on cpn.[Key] = CrossRefs.CrossRefId
			  left outer join Headings on Headings.HeadingId = Items.HeadingId
			  left outer join containstable(Headings, Title, @fts) h on h.[Key] = Headings.HeadingId
			  left outer join Keywords on Keywords.KeywordId = Items.KeywordId
			  left outer join containstable(Keywords, Keyword, @fts) k on k.[Key] = Keywords.KeywordId
			 where Items.Active = 1
			   and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
			   and cast(isnull(Items.KeywordId,0) as bigint) * cast(0x10000 as bigint) + cast(isnull(Items.HeadingId,0) as bigint) in (select case isnull(@pHeadingId,0) when 0 then cast(isnull(Items.HeadingId,0) as bigint) end union select (cast(keywordId as bigint) * cast(0x10000 as bigint)) + cast(HeadingId as bigint) from @HeadingsAndKeywords)
--			   and isnull(Items.HeadingId,0) = case isnull(@pHeadingId,0) when 0 then isnull(Items.HeadingId,0) else isnull(@pHeadingId,0) end
			   and case @fts when '*' then 1 else coalesce(i.[Key], bi.[Key], br.[Key], brpn.[Key], c.[Key], cpn.[Key], h.[Key], k.[Key]) end is not null
	--           and coalesce(i.[Key], bi.[Key], h.[Key], k.[Key]) is not null
		   group by BidHeaders.BidHeaderId, Items.ItemId
		   order by BidHeaders.BidHeaderId, Items.ItemId

		select @TableCount = count(*)
		  from @ItemTable
		  
		if @TableCount < 200
		begin  
		   insert @ItemTable(BidHeaderId, [ItemId], Ranking)
			  select top 200 BidHeaders.BidHeaderId, Items.ItemId, sum(isnull(ct.Rank,0) + isnull(c.Rank,0) + isnull(cpn.Rank,0) + isnull(h1.Rank,0) + isnull(k1.Rank,0)) Ranking
				from Items with (nolock) 
				left outer join containstable(Items, Description, @fts) ct on ct.[Key] = Items.ItemId
				join Category on Category.CategoryId = Items.CategoryId
							 and Category.Type = 1
				join CrossRefs on CrossRefs.ItemId = Items.ItemId
							  and CrossRefs.Active = 1
			    left outer join containstable(CrossRefs, Manufacturor, @fts) c on c.[Key] = CrossRefs.CrossRefId
			    left outer join containstable(CrossRefs, ManufacturorPartNumber, @fts) cpn on cpn.[Key] = CrossRefs.CrossRefId
				join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
							and Catalog.Active = 1
				join BidsCatalogList on BidsCatalogList.CatalogId = Catalog.CatalogId
				join Bids on Bids.BidId = BidsCatalogList.BidId
						 and Bids.Active = 1
						 and Bids.VendorId = case isnull(@pVendorId,0)
											   when 0 then Bids.VendorId
											   else @pVendorId
											 end
				join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
							   and BidHeaders.BidHeaderId = @BidHeaderId
							   and BidHeaders.Active = 1
				left outer join BidItems on BidItems.BidId = Bids.BidId
										and BidItems.PackedVendorItemCode = Crossrefs.PackedCode 
				left outer join Headings on Headings.HeadingId = Items.HeadingId
				left outer join containstable(Headings, Title, @fts) h1 on h1.[Key] = Headings.HeadingId
				left outer join Keywords on Keywords.KeywordId = Items.KeywordId
				left outer join containstable(Keywords, Keyword, @fts) k1 on k1.[Key] = Keywords.KeywordId
				left outer join @ItemTable it on it.ItemId = Items.ItemId
			   where Items.Active = 1
				 and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
				 and isnull(Items.HeadingId,0) = case isnull(@pHeadingId,0) when 0 then isnull(Items.HeadingId,0) else isnull(@pHeadingId,0) end
				 and coalesce(ct.[Key], c.[Key], cpn.[Key], h1.[Key], k1.[Key]) is not null
				 and it.ItemId is null
				 and BidItems.BidItemId is null
			   group by BidHeaders.BidHeaderId, Items.ItemId
		end
	end
	    
	select @TableCount = count(*)
	  from @ItemTable
    if @TableCount > 200
    begin
      delete @ItemTable
       where SysId > 200
    end         
     


  -- Reset info for All Items
  Update it
     set CatalogId = null,
         BidPrice = null,
         CatalogPrice = null,
         GrossPrice = null,
         DiscountRate = null,
         CatalogPage = null,
         PricePlanId = null,
         AwardId = null,
         VendorId = null,
         VendorItemCode = null,
         Alternate = null,
         BidItemId = null,
         ItemMustBeBid = null
    from @ItemTable it

  -- Set Bid Item info if valid and no other prices are set
  Update it
     set CatalogId = CrossRefs.CatalogId,
         BidPrice = round(BidItems.Price - round(BidItems.Price * isnull(Bids.BidDiscountRate,0) / 100,2),2),
         CatalogPrice = CrossRefs.CatalogPrice,
         GrossPrice = round(BidItems.Price,2),
         DiscountRate = isnull(Bids.BidDiscountRate,0),
         CatalogPage = CrossRefs.Page,
         PricePlanId = BidHeaders.PricePlanId,
         AwardId = Awards.AwardId,
         VendorId = Bids.VendorId,
         VendorItemCode = BidItems.VendorItemCode,
         Alternate = BidItems.Alternate,
         BidItemId = BidItems.BidItemId,
         ItemMustBeBid = 0,
         PriceType = -1,
         ItemBidType = case isnull(substring(BidItems.ItemBidType,1,1),'') 
                         when 'A' then 0 
                         when 'C' then 1 
                         when '' then 2 
                         else 3 
                       end
    from @ItemTable it
    join BidHeaders on BidHeaders.BidHeaderId in (select bl.BidHeaderId from @BidsList bl group by bl.BidHeaderId)
    join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
             and Bids.Active = 1
    join BidItems on BidItems.ItemId = it.ItemId
                 and BidItems.BidId = Bids.BidId
    join Awards on Awards.BidId = Bids.BidId
    left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
   where it.ItemMustBeBid is null

  Update it
     set CatalogId = CrossRefs.CatalogId,
         BidPrice = round(case isnull(Crossrefs.DoNotDiscount,0) when 0 then CrossRefs.GrossPrice - round(CrossRefs.GrossPrice * isnull(BidsCatalogList.DiscountRate,0) / 100,2) else Crossrefs.GrossPrice end,2),
         CatalogPrice = CrossRefs.CatalogPrice,
         GrossPrice = round(CrossRefs.GrossPrice,2),
         DiscountRate = case isnull(Crossrefs.DoNotDiscount,0) when 0 then isnull(BidsCatalogList.DiscountRate,0) else 0 end,
         CatalogPage = CrossRefs.Page,
         PricePlanId = BidHeaders.PricePlanId,
         AwardId = Awards.AwardId,
         VendorId = Bids.VendorId,
         VendorItemCode = CrossRefs.VendorItemCode,
         Alternate = null,
         BidItemId = null,
         PriceType = 0,
         ItemBidType = 2,
         ItemMustBeBid = 0
    from @ItemTable it
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
         BidPrice = coalesce(round(Items.ListPrice - round(Items.ListPrice * BidManufacturers.DiscountRate / 100,2),2),0),
         CatalogPrice = coalesce(Items.ListPrice,0),
         GrossPrice = coalesce(Items.ListPrice,0),
         DiscountRate = BidManufacturers.DiscountRate,
         CatalogPage = CrossRefs.Page,
         PricePlanId = null,
         AwardId = null,
         VendorId = Bids.VendorId,
         VendorItemCode = case coalesce(rtrim(Items.VendorPartNumber),'') when '' then 'N/A' else Items.VendorPartNumber end,
         Alternate = null,
         BidItemId = null,
         PriceType = -1,
         ItemBidType = 0,
         ItemMustBeBid = 0
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
                         and Cat.CategoryId = @CategoryId
        where xr.ItemId = it.ItemId
          and xr.Active = 1
        order by case isnull(xr.GrossPrice,0) when 0 then 0 else 1 end desc, xr.CatalogYear desc, isnull(xr.GrossPrice,0), xr.CrossRefId desc) 
   where it.ItemMustBeBid is null

  -- Set Addenda item info if valid and no other prices are set
  Update it
     set CatalogId = CrossRefs.CatalogId,
         BidPrice = round(case coalesce(Items.ListPrice,0) when 0 then coalesce(CrossRefs.CatalogPrice, CrossRefs.GrossPrice / .85) else Items.ListPrice end,2),
         CatalogPrice = case coalesce(Items.ListPrice,0) when 0 then coalesce(CrossRefs.CatalogPrice, CrossRefs.GrossPrice) else Items.ListPrice end,
         GrossPrice = round(case coalesce(Items.ListPrice,0) when 0 then coalesce(CrossRefs.CatalogPrice, CrossRefs.GrossPrice / .85) else Items.ListPrice end,2),
         DiscountRate = null,
         CatalogPage = CrossRefs.Page,
         PricePlanId = null,
         AwardId = null,
         VendorId = null,
         VendorItemCode = null,
         Alternate = null,
         BidItemId = null,
         PriceType = 1,
         ItemBidType = 3,
         ItemMustBeBid = 1
    from @ItemTable it
    join DistrictCategories on DistrictCategories.DistrictId = @DistrictId
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
         CatalogPage = null,
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
  Update it
     set ItemCode = Items.ItemCode,
         Description = dbo.uf_BidItemDescription(it.ItemId, it.BidHeaderId, it.BidItemId, it.VendorId),
         UnitId = Items.UnitId,
         UnitCode = Units.Code,
         SortSeq = Items.SortSeq
    from @ItemTable it
    join Items on Items.ItemId = it.ItemId
    left outer join Units on Units.UnitId = Items.UnitId

  -- Remove Items not bid
  delete it
    from @ItemTable it
   where isnull(ItemBidType,3) = 3
   
  delete @ItemTable
    from @ItemTable it
   where right('00000' + cast(99999 - it.Ranking as varchar(16)),5) +
         convert(char(1),isnull(PriceType,-1) + 1) + 
         convert(char(1),isnull(ItemBidType,3)) + 
         cast(case isnull(BidItemId,0) 
                           when 0 then 0 
                           else 1 
                         end as char(1)) +
         StandardItem +
         SortSeq > 
         (select top 1 right('00000' + cast(99999 - it.Ranking as varchar(16)),5) +
                       cast(isnull(PriceType,-1) + 1 as char(1)) + 
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
           order by right('00000' + cast(99999 - it.Ranking as varchar(16)),5) +
                    cast(isnull(PriceType,-1) + 1 as char(1)) + 
                    cast(isnull(ItemBidType,3) as char(1)) + 
                    cast(case isnull(BidItemId,0) 
                           when 0 then 0 
                           else 1 
                         end as char(1)) +
         StandardItem +
         SortSeq)


  Update it
     set ItemCount = (select count(*) from @ItemTable),
         Quantity = Detail.Quantity,
         LastYearsQuantity = Detail.LastYearsQuantity,
         VendorName = Vendors.Name,
         CatalogRefs = dbo.uf_CatalogRefsItem(@BidHeaderId, it.ItemId, it.VendorId, it.BidItemId)
    from @ItemTable it
    left outer join Detail on Detail.ItemId = it.ItemId
                          and Detail.RequisitionId = @pRequisitionId
    left outer join Vendors on Vendors.VendorId = it.VendorId

  select * from @ItemTable
```
