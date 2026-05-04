# Procedure: `dbo.usp_SearchItems_SearchDataDB`

_Generated on 2026-05-04T13:04:24.380Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_SearchItems_SearchDataDB` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2019-10-16 07:14:11 |
| Modified | 2019-10-16 07:35:16 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRequisitionId` | IN | int |  |
| 2 | `@pVendorId` | IN | int |  |
| 3 | `@pHeadingId` | IN | bigint |  |
| 4 | `@pFilter` | IN | varchar(4096) |  |
| 5 | `@pDistrictId` | IN | int |  |
| 6 | `@pDSHeadingId` | IN | bigint |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `DistrictPP` | USER_TABLE |  |
| `Headings` | USER_TABLE |  |
| `Keywords` | USER_TABLE |  |
| `PPCategory` | USER_TABLE |  |
| `PricingAddenda` | USER_TABLE |  |
| `PricingConsolidatedOrderCounts` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `vw_ItemDescription` | VIEW |  |
| `dbo.uf_SetupSearch` | SQL_SCALAR_FUNCTION |  |
| `dbo.utv_BidsList` | unresolved |  |
| `dbo.utv_HeadingAndKeywords` | unresolved |  |
| `dbo.ufn_GoogleToFTS` | unresolved | `master` |
| `dbo.PricingConsolidated` | unresolved | `SearchData` |
| `dbo.PricingAddenda` | unresolved | `SearchDb` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--USE [EDS]
--GO
--/****** Object:  StoredProcedure [dbo].[usp_SearchItemsByReqHKDS]    Script Date: 3/5/2019 7:27:22 AM ******/
--SET ANSI_NULLS ON
--GO
--SET QUOTED_IDENTIFIER ON
--GO
--USE [EDS]
--GO
--/****** Object:  StoredProcedure [dbo].[usp_SearchItemsByReqHKDS]    Script Date: 1/18/2019 11:26:47 AM ******/
--SET ANSI_NULLS ON
--GO
--SET QUOTED_IDENTIFIER ON
--GO


--set nocount on 
--select * from dbo.usp_SearchItemsByReqHKDS(24803674, 0, -1, '', 400, 78527) order by Ranking desc, SortSeq
--exec dbo.usp_SearchItemsByReqHKDS 44174806, 0, -1, '', 51, 0
----exec dbo.usp_SearchItemsByReqHKDS 50845401, 0, 0, '23604-1005', 400, -1
----select * from Requisitions where RequisitionId = 1715646
--declare @pRequisitionId int     = 50845401--44174806--50484832--35--8647--49415157
--declare @pVendorId int		    = 0--541 --2198
--declare @pHeadingId BigInt	    = 0
--declare @pFilter varchar(4096)  = 'pencil' --'TISSUE KLEENEX 100/BOX 28224'
--declare @pDistrictId int	    = 400--664
--declare @pDSHeadingId bigint    = -1-- 0--1521492941208


CREATE   procedure [dbo].[usp_SearchItems_SearchDataDB] (@pRequisitionId int, @pVendorId int, @pHeadingId bigint, @pFilter varchar(4096), @pDistrictId int, @pDSHeadingId bigint)
--returns 
as
begin
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
[Description]	varchar(1024) null,
UnitId		int null,
UnitCode	varchar(16) null,
PriceId		int null,
CatalogPage		varchar(16) null,
CatalogYear     char(02) null,
DiscountRate	decimal(9,5) null,
[Name]		varchar(255) null,
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
CatalogRefs varchar(4096) null,
AdditionalShipping tinyint null,
BidType		int null,
OrderCount int null
)
 

	declare @CrossRefId int,
		@CrossRefIdBid int,	
		@PricePlanId int,
		@DistrictId int,
		@CatalogId int,
		@VendorId int = @pVendorId,
		@HeadingKeyWordId bigint = @pHeadingId,
		@ItemId int,
		@BidItemId int,
		@AwardId int,
		@CategoryId int,
		@ItemCount int,
		@BidHeaderId int,
		@BudgetId int,
		@BidsCount int,
		@ItemCode varchar(50),
		@DropSeq varchar(16),
		@fts varchar(8000),
		@TableCount int,
		@HeadingId int,
		@KeywordId int,
		@DSHeadingId int,
		@DSKeywordId int,
		@HeadingTitle varchar(255),
		@Keyword varchar(255),
		@sql nvarchar(max),
		@sql_FTS_Join nvarchar(1000),
		@sql_Where_HeadingId nvarchar(1000),
		@sql_Where_KeyWordId nvarchar(1000),
		@sql_Where_VendorId nvarchar(1000),
		@nl char(2) = char(13) + char(10)

	declare @BidsList as dbo.utv_BidsList;  -- table it TYPE'd in Programmability section
	--declare @BidsList table (RequisitionId int, BidHeaderId int)
	declare @HeadingsAndKeywords as dbo.utv_HeadingAndKeywords;
	--declare @HeadingsAndKeywords table (HeadingId int, KeywordId int, DistrictId int)
	declare @VendorBidsList table (BidHeaderId int, BidId int)
	declare @ItemsList table (BidHeaderId int, ItemId int, CrossRefId int)

	select @fts = case rtrim(isnull(@pFilter,'')) 
					when '' then '*' 
					else [master].dbo.ufn_GoogleToFTS(dbo.uf_SetupSearch(@pFilter)) 
			  end

	select @CategoryId = isnull(Requisitions.CategoryId,0),
		 @BidHeaderId = isnull(Requisitions.BidHeaderId,0),
		 @DistrictId = isnull(Budgets.DistrictId,0),
		 @BudgetId = isnull(Budgets.BudgetId,0)
	from Requisitions with (nolock) 
	left outer join Budgets on Budgets.BudgetId = Requisitions.BudgetId
	where RequisitionId = @pRequisitionId
	OPTION(OPTIMIZE FOR UNKNOWN)

	-- Extract HeadingId and KeywordId
	if @pHeadingId != -1
	begin
	  select @HeadingId = @pHeadingId & cast(0x7FFFFFFF as bigint)
	  select @KeywordId = (@pHeadingId & cast(0x7FFFFFFF00000000 as bigint)) / cast(0x100000000 as bigint)
	end
	else
	begin
	  select @HeadingId = @pDSHeadingId & cast(0x7FFFFFFF as bigint)
	  select @KeywordId = (@pDSHeadingId & cast(0x7FFFFFFF00000000 as bigint)) / cast(0x100000000 as bigint)
	end
	-- insert @ItemTable(BidheaderId,ItemId) values(@HeadingId,@KeywordId)
	--declare @sql_Heading varchar(100)
	if @HeadingId <> 0 
		set @sql_Where_HeadingId = 'HeadingId = @HeadingId'

	--declare @sql_KeyWordId varchar(100)
	if @KeywordId <> 0
		set @sql_Where_KeyWordId = 'KeyWordId = @KeyWordId'

	-- Build Base List of Bids for each Requisition
	  if @BidHeaderId is not null and @BidHeaderId != 0
	  begin
		  insert @BidsList (RequisitionId, BidHeaderId)
			values (@pRequisitionId, @BidHeaderId)
	  end
     
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
		   where ble.BidHeaderId is null
		   group by Requisitions.RequisitionId, BidHeaders.BidHeaderId
--		   OPTION(OPTIMIZE FOR UNKNOWN)
	  end

	--Select Base Heading Name and Keyword Name
	  select @HeadingTitle = Headings.Title, @Keyword = isnull(Keywords.Keyword,'')
		from Headings
		left outer join Keywords on Keywords.HeadingId = Headings.HeadingId
								and Keywords.Active = 1
								and Keywords.KeywordId = @KeywordId
	  where Headings.HeadingId = @HeadingId

	--Load All Headings and Matching Keywords
		if @KeywordId = 0
         insert @HeadingsAndKeywords (HeadingId, KeywordId, DistrictId)
              select Headings.HeadingId, 0, Headings.DistrictId
                from Headings
              where Headings.CategoryId = @CategoryId
                 and Headings.Active = 1
                 and Headings.Title = @HeadingTitle
                 and (   Headings.DistrictId is null
                           or Headings.DistrictId in (0, @pDistrictId))


         insert @HeadingsAndKeywords (HeadingId, KeywordId, DistrictId)
              select Headings.HeadingId, isnull(Keywords.KeywordId,0), Headings.DistrictId
                from Headings
               join Keywords on Keywords.HeadingId = Headings.HeadingId
                                                         and Keywords.Active = 1
                                                         and Keywords.Keyword = case when @Keyword = '' then Keywords.Keyword else @Keyword end
                                                         and (   Keywords.DistrictId is null
                                                                 or Keywords.DistrictId in (0, @pDistrictId))
              where Headings.CategoryId = @CategoryId
                 and Headings.Active = 1
                 and Headings.Title = @HeadingTitle
                 and (   Headings.DistrictId is null
                           or Headings.DistrictId in (0, @pDistrictId))



--select * from @BidsList
--select * from @HeadingsAndKeywords
--select * from @VendorBidsList
--select @BidHeaderId as BidHeaderid
--select @VendorId as VendorId
--select @DistrictId as DistrictId

		-- Get Number of Bids to search
		select @BidsCount = (select count(*) from @BidsList)

		declare @TempPricing table  --used in place of temp table for now
		(
			BidHeaderId int
			,ItemId int
			,Rank int
			,CatalogID int
			,CrossRefId int
			,BidPrice money
			,CatalogPrice money
			,DiscountRate numeric(9,5)
			,CatalogPage char(4)
			,PricePlanId int
			,AwardId int
			,VendorId int
			,VendorItemCode varchar(50)
			,Alternate varchar(512)
			,BidItemId int
			,FullDescription varchar(4096)
			,UnitId int
			,UnitCode varchar(20)
			,SortSeq varchar(64)
			,ItemCode varchar(50)
			,BidType tinyint
			,RowNumber int
		)

			  set @sql = '
				declare @TempPricing table  
				(
					BidHeaderId int
					,ItemId int
					,Rank int
					,CatalogID int
					,CrossRefId int
					,BidPrice money
					,CatalogPrice money
					,DiscountRate numeric(9,5)
					,CatalogPage char(4)
					,PricePlanId int
					,AwardId int
					,VendorId int
					,VendorItemCode varchar(50)
					,Alternate varchar(512)
					,BidItemId int
					,FullDescription varchar(4096)
					,UnitId int
					,UnitCode varchar(20)
					,SortSeq varchar(64)
					,ItemCode varchar(50)
					,BidType tinyint
					,RowNumber int
				) 

			  insert into @TempPricing
				select Top 1000
				     items.BidHeaderId
				   , Items.ItemId '

				   if trim(@fts) <> '*' -- full-text indexed search needed
						set @Sql = trim(@Sql) + '
							, isnull(pa.Rank,0) as Rank'
				   else -- NO full-text
						set @Sql = trim(@Sql) + ' 
							, 0 as Rank'

				   set @Sql = trim(@Sql) + '
				   , items.CatalogId
				   , items.CrossRefId
				   , items.BidPrice  
				   , items.CatalogPrice
				   , items.DiscountRate 
				   , items.CatalogPage
				   , 0 as PricePlanId
				   , items.AwardId
				   , items.VendorId
				   , items.VendorItemCode
				   , items.Alternate
				   , items.BidItemId
				   , items.FullDescription
				   , items.UnitId
				   , items.UnitCode
				   , items.SortSeq
				   , items.ItemCode
				   , items.BidType
				   , row_number() over(partition by items.BidHeaderId, items.ItemId order by case when items.BidItemId > 0 then 0 else 1 end, items.BidPrice) as RowNumber ' +
				' from SearchData.dbo.PricingConsolidated items (nolock)'

				if @BidsCount > 1
					set @Sql = trim(@Sql) + '
					join @BidsList bl on bl.BidHeaderId = items.BidHeaderId '

				if trim(@fts) <> '*' 
					set @Sql = trim(@Sql) + '
					join containstable(PricingConsolidated, AllStringFields,''' + @fts + ''') pa on pa.[Key] = items.PricingConsolidatedId'

				if (select count(*) from @HeadingsAndKeywords) > 0
					set @Sql = trim(@Sql) + '
					join @HeadingsAndKeywords hak on hak.HeadingId = items.HeadingId and ((hak.KeyWordId = items.KeyWordId) or (hak.KeyWordId = 0)) '

				set @Sql = trim(@Sql) + '
				where items.CategoryId = ' + cast(@CategoryId as varchar(10))

				if @BidsCount = 1
					set @Sql = trim(@Sql) + '
					and items.BidHeaderId = ' + cast((select BidHeaderId from @BidsList) as varchar)

				if @VendorId <> 0 
					set @Sql = trim(@Sql) + '
						 and items.VendorId = ' + cast(@VendorId  as nvarchar(10))

				if @pDistrictId <> 0 and @pHeadingId = -1  
					set @Sql = trim(@Sql) + '
						and items.DistrictId = ' + cast(@pDistrictId as nvarchar(10))

			set @sql = trim(@Sql) + 'order by BidItemId desc ;select * from @TempPricing order by Rank'  -- this line is required so there is a return from the dynamic sql

			declare @debug bit = 0;
			--If @debug = 1
			--	select @sql
			--else
				insert into @TempPricing exec sp_executesql @sql,N'@BidsList utv_BidsList READONLY, @HeadingsAndKeywords utv_HeadingAndKeyWords READONLY'
				,@BidsList=@BidsList,@HeadingsAndKeywords = @HeadingsAndKeywords
				

			insert @ItemTable
					(
						BidHeaderId, [ItemId], Ranking, CatalogId, CrossRefId, BidPrice, CatalogPrice, DiscountRate
						,CatalogPage, PricePlanId, AwardId, VendorId, VendorItemCode, Alternate, BidItemId  --, ItemMustBeBid, ItemBidType)
   						, [Description], UnitId, UnitCode, SortSeq, ItemCode, BidType
					)
					select tp.BidHeaderId, tp.ItemId, Rank, CatalogId, CrossRefId, BidPrice, CatalogPrice, DiscountRate
						 , CatalogPage, PricePlanId, AwardId, VendorId ,VendorItemCode, Alternate, BidItemId
						 , /*id.ItemDescription*/FullDescription as FullDescription, UnitId, UnitCode, SortSeq, ItemCode, BidType
					from @TempPricing tp--#TempPricing  
--					join vw_ItemDescription id on id.ItemId = tp.ItemId
					where RowNumber = 1
					order by Rank

			if @pHeadingId > 0  -- if HeadingId is searched on then only include BidItems
				delete @ItemTable where BidItemId = 0


		if @pHeadingId = -1  -- District Specific item
		   begin
			   insert @ItemTable(BidHeaderId, [ItemId], Ranking, CatalogId, CrossRefId, BidPrice, CatalogPrice, DiscountRate
								,CatalogPage, PricePlanId, AwardId, VendorId, VendorItemCode, Alternate, BidItemId  --, ItemMustBeBid, ItemBidType)
								, [Description], UnitId, UnitCode, SortSeq, ItemCode)
				  select 0 as BidHeaderId
					   , Items.ItemId
					   , isnull(pa.Rank,0) --sum(isnull(pa.Rank,0)) --sum(isnull(ct.Rank,0) + isnull(c.Rank,0) + /*isnull(cpn.Rank,0) +*/ isnull(h1.Rank,0) + isnull(k1.Rank,0)) Ranking
					   , items.CatalogId
					   , items.CrossRefId
					   , case when items.LastBidPrice is null or items.LastBidPrice = 0 then items.ListPrice else round(items.LastBidPrice * 1.10,2) end --**** do we want to do this for Addenda items?
					   , items.CatalogPrice
					   , DiscountRate = 0
					   , items.CatalogPage
					   , 0 as PricePlanId
					   , items.AwardId
					   , items.VendorId
					   , items.VendorItemCode
					   , '' as Alternate
					   , 0 as BidItemId
					   , id.ItemDescription as FullDescription
					   , items.UnitId
					   , items.UnitCode
					   , items.SortSeq
					   , items.ItemCode
					   --, 0 as ItemMustBeBid  -- **** not sure this is correct
					   --, -1 as PriceType
					   --, 2 as ItemBidType -- **** blank value = 2 but not sure that is correct here or not
					from SearchDb.dbo.PricingAddenda items (nolock)
					join vw_ItemDescription id on id.ItemId = items.ItemId
					left outer join containstable(PricingAddenda, AllStringFields,@fts) pa on pa.[Key] = items.PricingAddendaId
					left outer join @ItemTable it on it.ItemId = Items.ItemId
				   where ( items.DistrictId = @DistrictId)
				     and items.CategoryId = @CategoryId
				   and cast(isnull(Items.KeywordId,cast(0 as bigint)) as bigint) * cast(0x10000 as bigint) +
					   cast(isnull(Items.HeadingId,cast(0 as bigint)) as bigint) in (select case cast(isnull(@HeadingId,cast(0 as bigint)) as bigint)
																			  when 0 then cast(isnull(items.KeywordId,cast(0 as bigint)) as bigint) * cast(0x10000 as bigint) + cast(isnull(Items.HeadingId,cast(0 as bigint)) as bigint) 
																			  else cast(isnull(@HeadingId,cast(0 as bigint)) as bigint)
																			end union all select (cast(keywordId as bigint) * cast(0x10000 as bigint)) + cast(HeadingId as bigint) from @HeadingsAndKeywords)
					 and case @fts when '*' then 1 else pa.[Key] end is not null --coalesce(ct.[Key], c.[Key], /*cpn.[Key],*/ h1.[Key], k1.[Key]) end is not null
				  order by isnull(pa.Rank,0)
					-- and it.ItemId is null
				   OPTION(OPTIMIZE FOR UNKNOWN)
		   end -- of statement "if @pHeadingId = -1"
		--drop table if exists #TempPricing
		--drop table if exists #TempPricingFilter
	
	--if @debug <> 1
	 --select len(Description) - len(replace(Description,
		--* from @ItemTable order by case when Ranking <> 0 then Ranking else BidPrice end 

	 --update @ItemTable
	 --set Rank =

	
	  -- add extra to Ranking for stop words that might exist
	;with cte_FilterTable (MyWord) as
	(
		select * 
		from string_split(@pFilter,' ')
	),
	cte_ExtraRankingCounts as
	(
		select ItemId--, BidItemId--, count(*)
		, sum( case when charindex(myWord,[Description])>0 then 1 else 0 end) as ExtraCount
		from @ItemTable it
		cross apply cte_FilterTable ft 
		group by ItemId, BidItemId
	)
	update @ItemTable
	Set Ranking = 1000 - Ranking - ExtraCount
	from @ItemTable it
	join cte_ExtraRankingCounts erc on it.ItemId = erc.ItemId

	-- add in any BidItems that have matching ItemIds 
   insert @ItemTable(   BidHeaderId, [ItemId], Ranking, CatalogId, CrossRefId, BidPrice, CatalogPrice, DiscountRate
					   ,CatalogPage,/* PricePlanId,*/ AwardId, VendorId, VendorItemCode, Alternate, BidItemId  --, ItemMustBeBid, ItemBidType)
					  , [Description], UnitId, UnitCode, SortSeq, ItemCode, BidType
					 )
	select pc.BidHeaderId, pc.ItemId, 0, CatalogId, CrossRefId, BidPrice, CatalogPrice, DiscountRate
		 , CatalogPage, AwardId, VendorId, VendorItemCode, Alternate, BidItemId
		 , /*id.ItemDescription*/ FullDescription as FullDescription, UnitId, UnitCode, SortSeq, ItemCode, BidType
	from SearchData.dbo.PricingConsolidated pc
--	join vw_ItemDescription id on id.ItemId = pc.ItemId
	join @BidsList bl on bl.BidHeaderId = pc.BidHeaderId
	where pc.ItemId in (select itemId from @ItemTable)
	  and BidItemId <> 0
	  and BidItemId not in (select BidItemId from @ItemTable)

	-- Remove catalog items if a BidItem is present
	;with cte_RemoveCatalogItems as
	(
		select ItemId, BidItemId, BidPrice
			   ,ROW_NUMBER() over (partition by ItemId order by BidItemId desc, BidPrice) as RowNumber
		from @ItemTable
	)
	delete @ItemTable
	from @ItemTable it
	join cte_RemoveCatalogItems cte on it.ItemId = cte.ItemId and it.BidItemId = 0
	where cte.RowNumber > 1
	 
	if @pHeadingId != -1  -- District Specific item
	begin
		delete @ItemTable
		from @ItemTable it
		where it.VendorId = 0 
		   or it.VendorId = null
		   or it.VendorId = 7691
		   or (@VendorId <> 0 and it.VendorId != @VendorId)
	end

	update it
    set VendorName = Vendors.Name,
        LastYearsQuantity = Detail.LastYearsQuantity,
  	    Quantity = Detail.Quantity,
		OrderCount = OrderCounts.OrderCount
    from @ItemTable it
	outer apply (select Name from Vendors v where v.VendorId = it.VendorId) Vendors
	outer apply (select LastYearsQuantity, Quantity from Detail d where d.RequisitionId = @pRequisitionId and d.ItemId = it.ItemId) Detail
	outer apply (select OrderCount from PricingConsolidatedOrderCounts oc where oc.BidHeaderId = it.BidHeaderId and oc.ItemId = it.ItemId) OrderCounts


	  --select * -- ItemId, BidItemId, BidPrice, Description, Ranking , VendorName
	  --from @ItemTable 
	  --order by isnull(BidItemId,0) desc, isnull(Ranking,0),  BidPrice 
	  --
 					SELECT  
							 u.ItemID, CASE WHEN isnull(u.BidItemId,0) > 0 THEN '<img src="/images/icons/star-on.png" title="This is a Most Popular Item" width="16" height="16" />' ELSE '' END + case when AdditionalShipping = 1 then ' <img class="addShip" src="/images/icons/Transport-Truck-icon.png" title="This Item requires additional shipping. Please contact vendor for additional information." width="16" height="16" />' else '&nbsp;' end AS MostPopular
							,'<a class="view-catalog'+case when u.BidType = 1 then ' popup-prebid' when u.BidType = 2 then ' popup-addenda' else '' end+'" itemid="'+CAST(coalesce(u.ItemID,0) AS VARCHAR)+'" crossrefid="'+cast(coalesce(u.CrossRefId,0) as varchar)+'" bidheaderid="'+cast(coalesce(u.BidHeaderID,0) as varchar)+'" vendorid="'+cast(coalesce(u.VendorID,0) as varchar)+'" biditemid="'+cast(coalesce(u.BidItemID,0) as varchar)+'">'+u.Description+'</a>' AS Description
							,'<a class="view-catalog'+case when u.BidType = 1 then ' popup-prebid' when u.BidType = 2 then ' popup-addenda' else '' end+'" itemid="'+CAST(coalesce(u.ItemID,0) AS VARCHAR)+'" crossrefid="'+cast(coalesce(u.CrossRefId,0) as varchar)+'" bidheaderid="'+cast(coalesce(u.BidHeaderID,0) as varchar)+'" vendorid="'+cast(coalesce(u.VendorID,0) as varchar)+'" biditemid="'+cast(coalesce(u.BidItemID,0) as varchar)+'">'+u.VendorName+'</a>' AS VendorName
							,u.UnitCode
							,u.LastYearsQuantity
							,'<input type="text" id="SearchItemstable_Quantity_'+CAST(u.ItemID AS varchar)+'" value="'+CASE ISNULL(u.Quantity,0) WHEN 0 THEN '' ELSE CAST(u.Quantity AS varchar) END+'" tabindex class="qty" onKeydown="SetEnterFunction(this,event);" onFocus="SetFocusFunction(this,event);" onChange="SetBlurFunction(this,event);">' AS Quantity
							, u.Ranking
							,u.BidPrice
							,'<button id="SearchItemstable_ActionButton_'+CAST(u.ItemID AS varchar)+'" tableID="SearchItemstable" itemID="'+CAST(u.ItemID AS varchar)+'" onClick="_actionItemButton(this)" class="button">'+CASE ISNULL(u.Quantity,0) WHEN 0 THEN '&nbsp;&nbsp;&nbsp;Add&nbsp;&nbsp;&nbsp;&nbsp;' ELSE 'Update' END+'</button>' AS [Action]
							,' ' + u.VendorItemCode + ' ' AS VendorItemCode
							,' ' + u.ItemCode + ' ' AS ItemCode
							, u.SortSeq
							, u.CatalogRefs
							, CASE WHEN isnull(u.BidItemId,0) > 0 THEN '0' else '1' end + u.SortSeq EDSSortKey
							-- Ranking is already inverted
							,SortKey =  case isnull(u.BidItemId,0) when 0 then '1' else '0' end + CASE ISNULL(u.Quantity,0) WHEN 0 THEN '1' ELSE '0' END + right(replicate('0',6) + cast(isnull(999999 - OrderCount,999999) as varchar(6)),6) + right(replicate('0',4) + cast(isnull(Ranking,0) as varchar(4)),4) + u.Description 
							--,SortKey2 =  case isnull(u.BidItemId,0) when 0 then '1' else '0' end + cast(Ranking as varchar(4)) + u.Description 
					FROM	@ItemTable u
					--order by (case isnull(u.BidItemId,0) when 0 then '1' else '0' end + CASE ISNULL(u.Quantity,0) WHEN 0 THEN '1' ELSE '0' END + cast(Ranking as varchar(4)) + u.Description )
					order by sortkey --isnull(BidItemId,0), isnull(Ranking,0),  BidPrice 
--*/
 
end
```
