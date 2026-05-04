# Procedure: `dbo.usp_SetPricing_SearchDataDB`

_Generated on 2026-05-04T13:04:24.389Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_SetPricing_SearchDataDB` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2019-10-16 07:17:55 |
| Modified | 2019-11-01 12:45:14 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `BidMappedItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `BidsCatalogList` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `Headings` | USER_TABLE |  |
| `it` | unresolved |  |
| `Items` | USER_TABLE |  |
| `Keywords` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Units` | USER_TABLE |  |
| `vw_BidItemDescription` | VIEW |  |
| `vw_CrossRefsDescription` | VIEW |  |
| `dbo.PricingConsolidated` | unresolved | `SearchData` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--exec usp_SetPricing 9336
--exec [dbo].[usp_SearchItemsByReqHKDS] 50484832,541,0,'9736890',0,0
--exec [dbo].[usp_SearchItemsByReqHKDS] 50484832,3,0,'110806',0,0
CREATE    procedure [dbo].[usp_SetPricing_SearchDataDB] @pBidHeaderId int
as
begin

 --declare @pBidHeaderId int = 8004

create table #ItemTable (
Id		int identity(1,1) not null primary key,
[CrossRefId] [int] NULL,
[CatalogId] [int] NULL,
[BidHeaderId] [int] NULL,
[HeadingId] [int] NULL,
[KeywordId] [int] NULL,
[CategoryId] [int] NULL,
[ItemId] [int] NULL,
[VendorId] [int] null,
[BidItemId] [int] NULL,
[DistrictId] [int] NULL,
[HeadingKeywordId] [bigint] NULL,
[BidPrice] [money] NULL,
[CatalogPrice] [money] NULL,
[DiscountRate] [numeric](9, 5) NULL,
[FullDescription] [varchar](4096) NULL,
[Alternate] [varchar](512) NULL,
[PackedItemCode] [varchar](50) NULL,
[ItemCode] [varchar](50) NULL,
[PackedVendorItemCode] [varchar](50) NULL,
[VendorItemCode] [varchar](50) NULL,
[Headings] [varchar](50) NULL,
[Keywords] [varchar](1024) NULL,
[Manufacturer] [varchar](50) NULL,
[ManufacturerPartNumber] [varchar](50) NULL,
[ItemHeading] [varchar](255) NULL,
[ItemKeyword] [varchar](50) NULL,
[AdditionalShipping] [tinyint] null,
[SortSeq] [varchar](64) null

,CatalogPage char(4) null
,AwardId int null
,BidType tinyint null
,ItemBidType varchar(32) null
,UnitId int null
,AltId  int null
,UnitCode varchar(20)
,AllStringFields varchar(6000) null
,OrderCounts int null
,RowNumberSort varchar(500) null
)

	-- Load Bid Items
	insert #ItemTable (CrossRefId, CatalogId, BidHeaderId, HeadingId, KeywordId, CategoryId, ItemId, VendorId, BidItemId, DistrictId, HeadingKeywordId, 
						BidPrice, CatalogPrice, DiscountRate, FullDescription, Alternate, PackedItemCode, ItemCode, PackedVendorItemCode, VendorItemCode,
						Headings, Keywords, Manufacturer, ManufacturerPartNumber, ItemHeading, ItemKeyword, SortSeq
						, CatalogPage, AwardId, BidType, ItemBidType, UnitId, UnitCode
						)
		select BidItems.CrossRefId, CrossRefs.CatalogId, BidHeaders.BidHeaderId, Headings.HeadingId, Keywords.KeywordId, Items.CategoryId, Items.ItemId, Bids.VendorId, BidItems.BidItemId, Items.DistrictId, (cast(coalesce(Headings.HeadingId,0) as bigint) * cast(0x10000 as bigint)) + cast(coalesce(Keywords.KeywordId,0) as bigint), 
				coalesce(BidItems.Price,0) - round((coalesce(BidItems.Price,0) * coalesce(Bids.BidDiscountRate,0)) / 100,2) BidPrice, CrossRefs.CatalogPrice, Bids.BidDiscountRate DiscountRate, vBid.ItemDescription,/*CrossRefs.FullDescription, */BidItems.Alternate, Items.PackedCode, Items.ItemCode, BidItems.PackedVendorItemCode, BidItems.VendorItemCode,
				CrossRefs.Heading, CrossRefs.Keyword, BidResults.ManufacturerBid Manufacturer, BidResults.ManufPartNoBid ManufacturerPartNumber, Headings.Title ItemHeading, Keywords.Keyword ItemKeyword, Items.SortSeq
				,CrossRefs.Page, AwardId, BidHeaders.BidType
				, case isnull(substring(BidItems.ItemBidType,1,1),'') 
                     when 'A' then 0 
                     when 'C' then 1 
                     when '' then 2 
                     else 3
				  end
				, Items.UnitId, Units.Code
		  from BidItems
		  join Bids on Bids.BidId = BidItems.BidId
		           and Bids.Active = 1
		  join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
		                 and BidHeaders.BidHeaderId = @pBidHeaderId
		  join Items on Items.ItemId = BidItems.ItemId
		  join Units on Units.UnitId = Items.UnitId
		  left outer join BidResults on BidResults.BidResultsId = BidItems.BidResultsId
		  left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
		  left outer join Headings on Headings.HeadingId = Items.HeadingId
		  left outer join Keywords on Keywords.KeywordId = Items.KeywordId
  		  left outer join vw_BidItemDescription vbid on isnull(vbid.BidHeaderId,0) = BidHeaders.BidHeaderId
												    and vbid.ItemId = Items.ItemId

	Create Index SKI_BidHeaderItem on #ItemTable (BidHeaderId, ItemId) include(Id)
	Create Index SKI_BidHeaderVendorVIC on #ItemTable(BidHeaderId, VendorId, PackedVendorItemCode) include(Id)

	-- Load Catalog Items
	insert #ItemTable (CrossRefId, CatalogId, BidHeaderId, HeadingId, KeywordId, CategoryId, ItemId, VendorId, BidItemId, DistrictId, HeadingKeywordId, 
						BidPrice, CatalogPrice, DiscountRate, FullDescription, Alternate, PackedItemCode, ItemCode, PackedVendorItemCode, VendorItemCode,
						Headings, Keywords, Manufacturer, ManufacturerPartNumber, ItemHeading, ItemKeyword, AdditionalShipping, SortSeq
						, CatalogPage, AwardId, BidType, ItemBidType, UnitId, UnitCode
						)
		select CrossRefs.CrossRefId, CrossRefs.CatalogId, BidHeaders.BidHeaderId, Headings.HeadingId, Keywords.KeywordId, Items.CategoryId, Items.ItemId, Bids.VendorId, 0 BidItemId, Items.DistrictId, (cast(coalesce(Headings.HeadingId,0) as bigint) * cast(0x10000 as bigint)) + cast(coalesce(Keywords.KeywordId,0) as bigint), 
				case when coalesce(CrossRefs.DoNotDiscount,0) = 0 then coalesce(CrossRefs.GrossPrice,0) - round((coalesce(CrossRefs.GrossPrice,0) * coalesce(BidsCatalogList.DiscountRate,0)) / 100,2) else CrossRefs.GrossPrice end BidPrice, 
				CrossRefs.CatalogPrice, BidsCatalogList.DiscountRate DiscountRate, xd.ItemDescription,/*CrossRefs.FullDescription,*/ '' Alternate, Items.PackedCode, Items.ItemCode, CrossRefs.PackedCode, CrossRefs.VendorItemCode,
				CrossRefs.Heading, CrossRefs.Keyword, null Manufacturer, null ManufacturerPartNumber, Headings.Title ItemHeading, Keywords.Keyword ItemKeyword, CrossRefs.AdditionalShipping, Items.SortSeq
				,CrossRefs.[Page], BidItems.AwardId, BidHeaders.BidType
				, case isnull(substring(BidItems.ItemBidType,1,1),'') 
                     when 'A' then 0 
                     when 'C' then 1 
                     when '' then 2 
                     else 3
				  end
				, Items.UnitId, Units.Code
		  from CrossRefs
		  join [Catalog] on [Catalog].CatalogId = CrossRefs.CatalogId
		  join BidsCatalogList on BidsCatalogList.CatalogId = [Catalog].CatalogId
		  join Bids on Bids.BidId = BidsCatalogList.BidId
		           and Bids.Active = 1
		  join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
		                 and BidHeaders.BidHeaderId = @pBidHeaderId
		  left outer join BidMappedItems on BidMappedItems.BidHeaderId = BidHeaders.BidHeaderId
		                                and BidMappedItems.OrigItemId = CrossRefs.ItemId
		  join Items on Items.ItemId = coalesce(BidMappedItems.NewItemId,CrossRefs.ItemId)
		  join Units on Units.UnitId = Items.UnitId
		  left outer join BidItems on BidItems.CrossRefId = CrossRefs.CrossRefId
		                          and BidItems.BidId = Bids.BidId
		  left outer join Headings on Headings.HeadingId = Items.HeadingId
		  left outer join Keywords on Keywords.KeywordId = Items.KeywordId
          outer apply (select coalesce((select xd1.ItemDescription from vw_CrossRefsDescription xd1 where xd1.ItemId = BidMappedItems.NewItemId and xd1.CrossRefId = CrossRefs.CrossRefId),
		                               (select xd1.ItemDescription from vw_CrossRefsDescription xd1 where xd1.ItemId = CrossRefs.ItemId and xd1.CrossRefId = CrossRefs.CrossRefId)) ItemDescription) xd
		where CrossRefs.Active = 1


	-- Update All Strings data
	update #ItemTable
	   set AllStringFields = coalesce(trim(FullDescription),'') + ' '
							+coalesce(trim(Alternate),'') + ' '
							+coalesce(trim(ItemCode),'') + ' '
							+coalesce(trim(VendorItemCode),'') + ' '
							+coalesce(trim(Headings),'') + ' '
							+coalesce(trim(Keywords),'') + ' '
							+coalesce(trim(Manufacturer),'') + ' '
							+coalesce(trim(ManufacturerPartNumber),'') + ' '
							+coalesce(trim(ItemHeading),'') + ' '
							+coalesce(trim(ItemKeyword),'') + ' '

	-- Map Super Items
	select it.Id, it.VendorId, it.PackedVendorItemCode, BidImports.VendorId AltVendorId, BidResults.PackedVendorItemCode AltPackedVendorItemCode, BidResults.ItemBidType
	  into #SuperCross
	  from #ItemTable it
	  join BidItems on BidItems.BidItemId = it.BidItemId
	  join Bids on Bids.BidId = BidItems.BidId
	  join BidImports on BidImports.BidHeaderId = Bids.BidHeaderId
	                 and BidImports.Active = 1
					 and BidImports.VendorId != 7691
					 and BidImports.VendorId != Bids.VendorId
	  join BidResults on BidResults.BidImportId = BidImports.BidImportId
	                 and BidResults.ItemId = BidItems.ItemId
					 and BidResults.ItemBidType in ('C', 'S')
	where it.ItemCode like 'EDS%'

	-- Identify Duplicate Bid Items
	select it.VendorId, it.PackedVendorItemCode, 
	       (select top 1 m.Id
		      from #ItemTable m
			 where m.VendorId = it.VendorId
			   and m.PackedVendorItemCode = it.PackedVendorItemCode
			   and m.VendorId != 7691
			 order by case when m.BidItemId is null or m.BidItemId = 0 then 1 else 0 end, m.BidPrice, case when m.ItemBidType like 'EDS%' then 0 else 1 end, m.ItemBidType desc, m.SortSeq) MinId
	  into #Dups
	  from #ItemTable it
	 where it.VendorId != 7691
     group by it.VendorId, it.PackedVendorItemCode

	-- Remap Duplicate Bid Items - Keep Lowest Price and if Same then item 'As Specified' then by SortSeq
	Update it
	   set AltId = d.MinId
	  from #ItemTable it
	  join #Dups d on d.VendorId = it.VendorId
	              and d.PackedVendorItemCode = it.PackedVendorItemCode
	 where it.Id != d.MinId

	-- Set Order Counts and Row Number Sort
	update it
	   set OrderCounts = coalesce(oc.Orders,0),
		   RowNumberSort = cast(case when it.BidItemId > 0 then 0 else 1 end as char(1)) + right(replicate('0',12) + cast(it.BidPrice as varchar(20)),12)
	  from #ItemTable it
	  join BidHeaders on BidHeaders.BidHeaderId = it.BidHeaderId
	  outer apply (select count(*) Orders from Detail join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId and Requisitions.DateEntered > dateadd(year,-2,getdate()) join Budgets on Budgets.BudgetId = Requisitions.BudgetId join District on District.DistrictId = Budgets.DistrictId and District.County != 'TEST' and District.Active = 1 join BidHeaders bh on bh.BidHeaderId = Requisitions.BidHeaderId and bh.CategoryId = BidHeaders.CategoryId and bh.PricePlanId = BidHeaders.PricePlanId and bh.Active = 1 where Detail.ItemId = it.ItemId) oc

	-- Begin Transaction
	begin Transaction PricingUpdate
	begin try

	-- Delete Items from PricingConsolidated that are not in the temp Table
	delete SearchData.dbo.PricingConsolidated
	  from SearchData.dbo.PricingConsolidated
	 where SearchData.dbo.PricingConsolidated.BidHeaderId = @pBidHeaderId
	   and (select top 1 Id from #ItemTable it where it.BidHeaderId = SearchData.dbo.PricingConsolidated.BidHeaderId and it.CrossRefId = SearchData.dbo.PricingConsolidated.CrossRefId and coalesce(it.BidItemId,0) = coalesce(SearchData.dbo.PricingConsolidated.BidItemId,0) and it.AwardId = SearchData.dbo.PricingConsolidated.AwardId) is null

	-- Update Matching Items that are different
	Update SearchData.dbo.PricingConsolidated
	   set HeadingId = it.HeadingId, 
	       KeywordId = it.KeywordId, 
		   ItemId = it.ItemId, 
		   VendorId = it.VendorId, 
		   BidItemId = it.BidItemId,
		   DistrictId = it.DistrictId,
		   HeadingKeywordId = it.HeadingKeywordId,
		   BidPrice = it.BidPrice,
		   CatalogPrice = it.CatalogPrice,
		   DiscountRate = it.DiscountRate,
		   FullDescription = it.FullDescription,
		   Alternate = it.Alternate,
		   PackedItemCode = it.PackedItemCode,
		   ItemCode = it.ItemCode,
		   PackedVendorItemCode = it.PackedVendorItemCode,
		   VendorItemCode = it.VendorItemCode,
		   Headings = it.Headings,
		   Keywords = it.Keywords,
		   Manufacturer = it.Manufacturer,
		   ManufacturerPartNumber = it.ManufacturerPartNumber,
		   ItemHeading = it.ItemHeading,
		   ItemKeyword = it.ItemKeyword,
		   AdditionalShipping = it.AdditionalShipping,
		   AllStringFields = it.AllStringFields,
		   OrderCounts = it.OrderCounts,
		   RowNumberSort = it.RowNumberSort
	  from SearchData.dbo.PricingConsolidated
	  join #ItemTable it on it.BidHeaderId = SearchData.dbo.PricingConsolidated.BidHeaderId
	                    and it.CrossRefId = SearchData.dbo.PricingConsolidated.CrossRefId
						and coalesce(it.BidItemId,0) = coalesce(SearchData.dbo.PricingConsolidated.BidItemId,0)
	 where SearchData.dbo.PricingConsolidated.BidHeaderId = @pBidHeaderId
	   and (   coalesce(SearchData.dbo.PricingConsolidated.HeadingId,0) != coalesce(it.HeadingId,0)
			or coalesce(SearchData.dbo.PricingConsolidated.KeywordId,0) != coalesce(it.KeywordId,0)
			or coalesce(SearchData.dbo.PricingConsolidated.ItemId,0) != coalesce(it.ItemId,0)
			or coalesce(SearchData.dbo.PricingConsolidated.VendorId,0) != coalesce(it.VendorId,0)
			or coalesce(SearchData.dbo.PricingConsolidated.BidItemId,0) != coalesce(it.BidItemId,0)
			or coalesce(SearchData.dbo.PricingConsolidated.DistrictId,0) != coalesce(it.DistrictId,0)
			or coalesce(SearchData.dbo.PricingConsolidated.HeadingKeywordId,0) != coalesce(it.HeadingKeywordId,0)
			or coalesce(SearchData.dbo.PricingConsolidated.BidPrice,0) != coalesce(it.BidPrice,0)
			or coalesce(SearchData.dbo.PricingConsolidated.CatalogPrice,0) != coalesce(it.CatalogPrice,0)
			or coalesce(SearchData.dbo.PricingConsolidated.DiscountRate,0) != coalesce(it.DiscountRate,0)
			or coalesce(SearchData.dbo.PricingConsolidated.FullDescription,'') != coalesce(it.FullDescription,'')
			or coalesce(SearchData.dbo.PricingConsolidated.Alternate,'') != coalesce(it.Alternate,'')
			or coalesce(SearchData.dbo.PricingConsolidated.PackedItemCode,'') != coalesce(it.PackedItemCode,'')
			or coalesce(SearchData.dbo.PricingConsolidated.ItemCode,'') != coalesce(it.ItemCode,'')
			or coalesce(SearchData.dbo.PricingConsolidated.PackedVendorItemCode,'') != coalesce(it.PackedVendorItemCode,'')
			or coalesce(SearchData.dbo.PricingConsolidated.VendorItemCode,'') != coalesce(it.VendorItemCode,'')
			or coalesce(SearchData.dbo.PricingConsolidated.Headings,'') != coalesce(it.Headings,'')
			or coalesce(SearchData.dbo.PricingConsolidated.Keywords,'') != coalesce(it.Keywords,'')
			or coalesce(SearchData.dbo.PricingConsolidated.Manufacturer,'') != coalesce(it.Manufacturer,'')
			or coalesce(SearchData.dbo.PricingConsolidated.ManufacturerPartNumber,'') != coalesce(it.ManufacturerPartNumber,'')
			or coalesce(SearchData.dbo.PricingConsolidated.ItemHeading,'') != coalesce(it.ItemHeading,'')
			or coalesce(SearchData.dbo.PricingConsolidated.ItemKeyword,'') != coalesce(it.ItemKeyword,'')
			or coalesce(SearchData.dbo.PricingConsolidated.AdditionalShipping,0) != coalesce(it.AdditionalShipping,0)
			or coalesce(SearchData.dbo.PricingConsolidated.AllStringFields,'') != coalesce(it.AllStringFields,''))

	-- Insert Missing Items
	insert SearchData.dbo.PricingConsolidated (CrossRefId, CatalogId, BidHeaderId, HeadingId, KeywordId, CategoryId, ItemId, VendorId, BidItemId, DistrictId, HeadingKeywordId, 
								BidPrice, CatalogPrice, DiscountRate, FullDescription, Alternate, PackedItemCode, ItemCode, PackedVendorItemCode, VendorItemCode,
								Headings, Keywords, Manufacturer, ManufacturerPartNumber, ItemHeading, ItemKeyword, AdditionalShipping
								, CatalogPage, AwardId, BidType, ItemBidType, UnitId, UnitCode, AllStringFields, OrderCounts, RowNumberSort
								)
		select it.CrossRefId, it.CatalogId, it.BidHeaderId, it.HeadingId, it.KeywordId, it.CategoryId, it.ItemId, it.VendorId, it.BidItemId, it.DistrictId, it.HeadingKeywordId, 
				it.BidPrice, it.CatalogPrice, it.DiscountRate, it.FullDescription, it.Alternate, it.PackedItemCode, it.ItemCode, it.PackedVendorItemCode, it.VendorItemCode,
				it.Headings, it.Keywords, it.Manufacturer, it.ManufacturerPartNumber, it.ItemHeading, it.ItemKeyword, it.AdditionalShipping
				, it.CatalogPage, it.AwardId, it.BidType, it.ItemBidType, it.UnitId, it.UnitCode, it.AllStringFields, it.OrderCounts, it.RowNumberSort
		  from #ItemTable it
		 where (select top 1 PricingConsolidatedId from SearchData.dbo.PricingConsolidated pcsdb where pcsdb.BidHeaderId = it.BidHeaderId and pcsdb.CrossRefId = it.CrossRefId and coalesce(pcsdb.BidItemId,0) = coalesce(it.BidItemId,0)) is null

	-- Commit Transaction
	drop table if exists #ItemTable
	drop table if exists #SuperCross
	drop table if exists #Dups
	commit transaction PricingUpdate

	end try
	begin catch
		rollback transaction PricingUpdate
	end catch
end
```
