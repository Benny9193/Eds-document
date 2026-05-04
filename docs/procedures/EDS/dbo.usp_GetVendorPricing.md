# Procedure: `dbo.usp_GetVendorPricing`

_Generated on 2026-05-04T13:07:57.788Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_GetVendorPricing` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2021-03-31 09:15:55 |
| Modified | 2021-03-31 09:15:55 |
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

## Called by

_No other objects in this database reference it._

## Definition

```sql
--exec usp_SetPricing 9336
--exec [dbo].[usp_SearchItemsByReqHKDS] 50484832,541,0,'9736890',0,0
--exec [dbo].[usp_SearchItemsByReqHKDS] 50484832,3,0,'110806',0,0
create   procedure [dbo].[usp_GetVendorPricing] @pBidHeaderId int
as
begin

 --declare @pBidHeaderId int = 8647

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
,RowNumber int null
)

	-- Load Bid Items
	insert #ItemTable (CrossRefId, CatalogId, BidHeaderId, HeadingId, KeywordId, CategoryId, ItemId, VendorId, BidItemId, DistrictId, HeadingKeywordId, 
						BidPrice, CatalogPrice, DiscountRate, FullDescription, Alternate, PackedItemCode, ItemCode, PackedVendorItemCode, VendorItemCode,
						Headings, Keywords, Manufacturer, ManufacturerPartNumber, ItemHeading, ItemKeyword, SortSeq
						, CatalogPage, AwardId, BidType, ItemBidType, UnitId, UnitCode
						)
		select BidItems.CrossRefId, CrossRefs.CatalogId, BidHeaders.BidHeaderId, Headings.HeadingId, Keywords.KeywordId, Items.CategoryId, Items.ItemId, Bids.VendorId, BidItems.BidItemId, Items.DistrictId, (cast(coalesce(Keywords.KeywordId,0) as bigint) * 0x100000000) + cast(coalesce(Headings.HeadingId,0) as bigint), 
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
	Create Index SKI_BidHeaderCrossRefBidItem_Award on #ItemTable(BidHeaderId, CrossRefId, BidItemId) include(Id, AwardId)

	-- Load Catalog Items
	insert #ItemTable (CrossRefId, CatalogId, BidHeaderId, HeadingId, KeywordId, CategoryId, ItemId, VendorId, BidItemId, DistrictId, HeadingKeywordId, 
						BidPrice, CatalogPrice, DiscountRate, FullDescription, Alternate, PackedItemCode, ItemCode, PackedVendorItemCode, VendorItemCode,
						Headings, Keywords, Manufacturer, ManufacturerPartNumber, ItemHeading, ItemKeyword, AdditionalShipping, SortSeq
						, CatalogPage, AwardId, BidType, ItemBidType, UnitId, UnitCode
						)
		select CrossRefs.CrossRefId, CrossRefs.CatalogId, BidHeaders.BidHeaderId, Headings.HeadingId, Keywords.KeywordId, Items.CategoryId, Items.ItemId, Bids.VendorId, 0 BidItemId, Items.DistrictId, (cast(coalesce(Keywords.KeywordId,0) as bigint) * 0x100000000) + cast(coalesce(Headings.HeadingId,0) as bigint), 
				case when coalesce(CrossRefs.DoNotDiscount,0) = 0 then coalesce(CrossRefs.GrossPrice,0) - round((coalesce(CrossRefs.GrossPrice,0) * coalesce(BidsCatalogList.DiscountRate,0)) / 100,2) else CrossRefs.GrossPrice end BidPrice, 
				CrossRefs.CatalogPrice, BidsCatalogList.DiscountRate DiscountRate, xd.ItemDescription,/*CrossRefs.FullDescription,*/ '' Alternate, Items.PackedCode, Items.ItemCode, CrossRefs.PackedCode, CrossRefs.VendorItemCode,
				CrossRefs.Heading, CrossRefs.Keyword, CrossRefs.Manufacturor Manufacturer, CrossRefs.ManufacturorPartNumber ManufacturerPartNumber, Headings.Title ItemHeading, Keywords.Keyword ItemKeyword, CrossRefs.AdditionalShipping, Items.SortSeq
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
/*
	-- Remap Catalog Items to Super Items
	Update it
	  from #ItemTable it
	  join #SuperCross sc on sc.VendorId = it.VendorId
	-- Remap Catalog Items to the Appropriate Bid Items
*/
	select Detail.ItemId, count(*) Orders 
	  into #OrderCounts
	  from Detail 
	  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId 
	                   and Requisitions.DateEntered > dateadd(year,-2,getdate()) 
	  join Budgets on Budgets.BudgetId = Requisitions.BudgetId 
	  join District on District.DistrictId = Budgets.DistrictId 
	               and District.County != 'TEST' 
				   and District.Active = 1 
	  join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId 
	  join BidHeaders bh on bh.CategoryId = BidHeaders.CategoryId 
						and bh.PricePlanId = BidHeaders.PricePlanId 
						and bh.BidHeaderId = @pBidHeaderId
						and bh.Active = 1 
	 group by Detail.ItemId

	Create Index SKI_Item_Count on #OrderCounts(ItemId) include (Orders)

	-- Set Order Counts and Row Number Sort
	update it
	   set OrderCounts = coalesce(oc.Orders,0),
		   RowNumberSort = cast(case when it.BidItemId > 0 then 0 else 1 end as char(1)) + right(replicate('0',12) + cast(it.BidPrice as varchar(20)),12),
		   RowNumber = Row_number() over(partition by ItemId order by cast(case when it.BidItemId > 0 then 0 else 1 end as char(1)) + right(replicate('0',12) + cast(it.BidPrice as varchar(20)),12))
	  from #ItemTable it
	  join BidHeaders on BidHeaders.BidHeaderId = it.BidHeaderId
	  Left outer join #OrderCounts oc on oc.ItemId = it.ItemId

	  -- Return Results
		select it.BidPrice, it.CatalogPrice, it.DiscountRate, it.FullDescription, it.Alternate, it.ItemCode, it.PackedVendorItemCode, it.VendorItemCode,
				it.Headings, it.Keywords, it.Manufacturer, it.ManufacturerPartNumber, it.ItemHeading, it.ItemKeyword, it.AdditionalShipping,
				it.CatalogPage, it.BidType, it.ItemBidType, it.UnitCode, it.OrderCounts, it.RowNumberSort
		  from #ItemTable it
--		 where VendorId = @VendorId
--		   and RowNumber = 1
		 order by it.SortSeq
end
```
