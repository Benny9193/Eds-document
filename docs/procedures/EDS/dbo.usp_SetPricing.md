# Procedure: `dbo.usp_SetPricing`

_Generated on 2026-05-04T13:43:19.201Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_SetPricing` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2018-08-06 23:59:55 |
| Modified | 2026-02-04 20:08:40 |
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
| `PricingUpdate` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Units` | USER_TABLE |  |
| `vw_BidItemDescription` | VIEW |  |
| `vw_CrossRefsDescription` | VIEW |  |
| `dbo.PricingConsolidated` | unresolved | `SearchData` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--alter table SearchData_Test.dbo.PricingConsolidated add TotalQuantity int null
--exec usp_SetPricing 9336
--exec [dbo].[usp_SearchItemsByReqHKDS] 50484832,541,0,'9736890',0,0
--exec [dbo].[usp_SearchItemsByReqHKDS] 50484832,3,0,'110806',0,0
CREATE    procedure [dbo].[usp_SetPricing] @pBidHeaderId int
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
[ShortDescription] varchar(4096) null,
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
,UniqueItemNumber varchar(50) null
,AllStringFields varchar(6000) null
,ProductNames varchar(4000) null
,TypeAheads varchar(4000) null
,perishableItem tinyint null
,prescriptionRequired tinyint null
,digitallyDelivered tinyint null
,minimumOrderQuantity int null
,OrderCounts int null
,TotalQuantity int null
,RowNumberSort varchar(500) null
)

	-- Load Bid Items
	insert #ItemTable (CrossRefId, CatalogId, BidHeaderId, HeadingId, KeywordId, CategoryId, ItemId, VendorId, BidItemId, DistrictId, HeadingKeywordId, 
						BidPrice, CatalogPrice, DiscountRate, ShortDescription, FullDescription, Alternate, PackedItemCode, ItemCode, PackedVendorItemCode, VendorItemCode,
						Headings, Keywords, Manufacturer, ManufacturerPartNumber, ItemHeading, ItemKeyword, SortSeq
						, CatalogPage, AwardId, BidType, ItemBidType, UnitId, UnitCode, UniqueItemNumber, ProductNames, TypeAheads, perishableItem, prescriptionRequired, digitallyDelivered, minimumOrderQuantity
						)
		select BidItems.CrossRefId, CrossRefs.CatalogId, BidHeaders.BidHeaderId, Headings.HeadingId, Keywords.KeywordId, Items.CategoryId, Items.ItemId, Bids.VendorId, BidItems.BidItemId, Items.DistrictId, (cast(coalesce(Keywords.KeywordId,0) as bigint) * 0x100000000) + cast(coalesce(Headings.HeadingId,0) as bigint), 
				coalesce(BidItems.Price,0) - round((coalesce(BidItems.Price,0) * coalesce(Bids.BidDiscountRate,0)) / 100,2) BidPrice, CrossRefs.CatalogPrice, Bids.BidDiscountRate DiscountRate, vBid.ItemDescription, coalesce(CrossRefs.FullDescription,vBid.ItemDescription), BidItems.Alternate, Items.PackedCode, Items.ItemCode, BidItems.PackedVendorItemCode, BidItems.VendorItemCode,
				CrossRefs.Heading, CrossRefs.Keyword, BidResults.ManufacturerBid Manufacturer, BidResults.ManufPartNoBid ManufacturerPartNumber, Headings.Title ItemHeading, Keywords.Keyword ItemKeyword, Items.SortSeq
				,CrossRefs.Page, AwardId, BidHeaders.BidType
				, case isnull(substring(BidItems.ItemBidType,1,1),'') 
                     when 'A' then 0 
                     when 'C' then 1 
                     when '' then 2 
                     else 3
				  end
				, Items.UnitId, Units.Code, trim(case when coalesce(trim(BidResults.UniqueItemNumber),'') = '' then BidItems.PackedVendorItemCode else BidResults.UniqueItemNumber end), CrossRefs.ProductNames, CrossRefs.TypeAheads
				, BidResults.perishableItem, BidResults.prescriptionRequired, BidResults.digitallyDelivered, BidResults.minimumOrderQuantity
		  from BidItems
		  join Bids on Bids.BidId = BidItems.BidId
		           and Bids.Active = 1
		  join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
		                 and BidHeaders.BidHeaderId = @pBidHeaderId
		  join Items on Items.ItemId = BidItems.ItemId
		  join Units on Units.UnitId = Items.UnitId
		  join BidResults on BidResults.BidResultsId = BidItems.BidResultsId
		  left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
		  left outer join Headings on Headings.HeadingId = Items.HeadingId
		  left outer join Keywords on Keywords.KeywordId = Items.KeywordId
  		  left outer join vw_BidItemDescription vbid on isnull(vbid.BidHeaderId,0) = BidHeaders.BidHeaderId
												    and vbid.ItemId = Items.ItemId

	Create Index SKI_BidHeaderItem on #ItemTable (BidHeaderId, ItemId) include(Id)
	Create Index SKI_BidHeaderVendorUIN on #ItemTable(BidHeaderId, VendorId, UniqueItemNumber) include(Id)
	Create Index SKI_BidHeaderCrossRefBidItem_Award on #ItemTable(BidHeaderId, CrossRefId, BidItemId) include(Id, AwardId)

	-- Load Catalog Items
	insert #ItemTable (CrossRefId, CatalogId, BidHeaderId, HeadingId, KeywordId, CategoryId, ItemId, VendorId, BidItemId, DistrictId, HeadingKeywordId, 
						BidPrice, CatalogPrice, DiscountRate, ShortDescription, FullDescription, Alternate, PackedItemCode, ItemCode, PackedVendorItemCode, VendorItemCode,
						Headings, Keywords, Manufacturer, ManufacturerPartNumber, ItemHeading, ItemKeyword, AdditionalShipping, SortSeq
						, CatalogPage, AwardId, BidType, ItemBidType, UnitId, UnitCode, UniqueItemNumber, ProductNames, TypeAheads, perishableItem, prescriptionRequired, digitallyDelivered, minimumOrderQuantity
						)
		select CrossRefs.CrossRefId, CrossRefs.CatalogId, BidHeaders.BidHeaderId, Headings.HeadingId, Keywords.KeywordId, Items.CategoryId, Items.ItemId, Bids.VendorId, 0 BidItemId, Items.DistrictId, (cast(coalesce(Keywords.KeywordId,0) as bigint) * 0x100000000) + cast(coalesce(Headings.HeadingId,0) as bigint), 
				case when coalesce(CrossRefs.DoNotDiscount,0) = 0 then coalesce(CrossRefs.GrossPrice,0) - round((coalesce(CrossRefs.GrossPrice,0) * coalesce(BidsCatalogList.DiscountRate,0)) / 100,2) else CrossRefs.GrossPrice end BidPrice, 
				CrossRefs.CatalogPrice, BidsCatalogList.DiscountRate DiscountRate, xd.ItemDescription, coalesce(CrossRefs.AIFullDesc,CrossRefs.FullDescription,Crossrefs.AIShortDesc, CrossRefs.ShortDescription), '' Alternate, Items.PackedCode, Items.ItemCode, CrossRefs.PackedCode, CrossRefs.VendorItemCode,
				CrossRefs.Heading, CrossRefs.Keyword, CrossRefs.Manufacturor Manufacturer, CrossRefs.ManufacturorPartNumber ManufacturerPartNumber, Headings.Title ItemHeading, Keywords.Keyword ItemKeyword, CrossRefs.AdditionalShipping, Items.SortSeq
				,CrossRefs.[Page], BidItems.AwardId, BidHeaders.BidType
				, case isnull(substring(BidItems.ItemBidType,1,1),'') 
                     when 'A' then 0 
                     when 'C' then 1 
                     when '' then 2 
                     else 3
				  end
				, Items.UnitId, Units.Code, trim(case when coalesce(trim(CrossRefs.UniqueItemNumber),'') = '' then CrossRefs.PackedCode else CrossRefs.UniqueItemNumber end), CrossRefs.ProductNames, CrossRefs.TypeAheads
				, CrossRefs.perishableItem, CrossRefs.prescriptionRequired, CrossRefs.digitallyDelivered, CrossRefs.minimumOrderQuantity
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
/*
		select CrossRefs.CrossRefId, CrossRefs.CatalogId, BidHeaders.BidHeaderId, Headings.HeadingId, Keywords.KeywordId, Items.CategoryId, coalesce(it.ItemId,Items.ItemId), Bids.VendorId, coalesce(it.BidItemId,0) BidItemId, Items.DistrictId, (cast(coalesce(Headings.HeadingId,0) as bigint) * cast(0x10000 as bigint)) + cast(coalesce(Keywords.KeywordId,0) as bigint), 
				case when it.Id is not null then it.BidPrice when coalesce(CrossRefs.DoNotDiscount,0) = 0 then coalesce(CrossRefs.GrossPrice,0) - round((coalesce(CrossRefs.GrossPrice,0) * coalesce(BidsCatalogList.DiscountRate,0)) / 100,2) else CrossRefs.GrossPrice end BidPrice, 
				CrossRefs.CatalogPrice, BidsCatalogList.DiscountRate DiscountRate, CrossRefs.FullDescription, '' Alternate, Items.PackedCode, Items.ItemCode, CrossRefs.PackedCode, CrossRefs.VendorItemCode,
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
		  join Items on Items.ItemId = CrossRefs.ItemId
		  join Units on Units.UnitId = Items.UnitId
		  left outer join BidItems on BidItems.CrossRefId = CrossRefs.CrossRefId
		  left outer join Headings on Headings.HeadingId = Items.HeadingId
		  left outer join Keywords on Keywords.KeywordId = Items.KeywordId
		  left outer join #ItemTable it on it.BidHeaderId = BidHeaders.BidHeaderId
		                               and it.Id = (select top 1 it1.Id
									                  from #ItemTable it1
													 where it1.BidHeaderId = BidHeaders.BidHeaderId
													   and (   it1.ItemId = CrossRefs.ItemId
													        or (    it1.VendorId = Catalog.VendorId
														        and it1.PackedVendorItemCode = CrossRefs.PackedCode))
													 order by it1.BidPrice, case when Items.ItemCode like 'EDS%' then 0 else 1 end, it1.SortSeq)
		where CrossRefs.Active = 1
*/

	-- Update All Strings data
	update #ItemTable
	   set AllStringFields = left(coalesce(trim(FullDescription),'') + ' '
							+coalesce(trim(Alternate),'') + ' '
							+coalesce(trim(ItemCode),'') + ' '
							+coalesce(trim(VendorItemCode),'') + ' '
							+coalesce(trim(Headings),'') + ' '
							+coalesce(trim(Keywords),'') + ' '
							+coalesce(trim(Manufacturer),'') + ' '
							+coalesce(trim(ManufacturerPartNumber),'') + ' '
							+coalesce(trim(ItemHeading),'') + ' '
							+coalesce(trim(ItemKeyword),'') + ' ',6000)

	-- Map Super Items
	select it.Id, it.VendorId, it.UniqueItemNumber, BidImports.VendorId AltVendorId, BidResults.UniqueItemNumber AltUniqueItemNumber, BidResults.ItemBidType
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
	select it.VendorId, it.UniqueItemNumber, 
	       (select top 1 m.Id
		      from #ItemTable m
			 where m.VendorId = it.VendorId
			   and m.UniqueItemNumber = it.UniqueItemNumber
--			   and m.PackedVendorItemCode = it.PackedVendorItemCode -- Removed and Replaced by Line Above DCH 1/10/2023
			   and m.VendorId != 7691
			 order by case when m.BidItemId is null or m.BidItemId = 0 then 1 else 0 end, m.BidPrice, case when m.ItemBidType like 'EDS%' then 0 else 1 end, m.ItemBidType desc, m.SortSeq) MinId
	  into #Dups
	  from #ItemTable it
	 where it.VendorId != 7691
     group by it.VendorId, it.UniqueItemNumber

	-- Remap Duplicate Bid Items - Keep Lowest Price and if Same then item 'As Specified' then by SortSeq
	Update it
	   set AltId = d.MinId
	  from #ItemTable it
	  join #Dups d on d.VendorId = it.VendorId
	              and d.UniqueItemNumber = it.UniqueItemNumber
--	              and d.PackedVendorItemCode = it.PackedVendorItemCode -- Removed and Replaced by Above Line by DCH
	 where it.Id != d.MinId
/*
	-- Remap Catalog Items to Super Items
	Update it
	  from #ItemTable it
	  join #SuperCross sc on sc.VendorId = it.VendorId
	-- Remap Catalog Items to the Appropriate Bid Items
*/
	select Detail.ItemId, count(*) Orders, sum(coalesce(Detail.Quantity,0)) TotalQuantity
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
		   TotalQuantity = coalesce(oc.TotalQuantity,0),
		   RowNumberSort = cast(case when it.BidItemId > 0 then 0 else 1 end as char(1)) + right(replicate('0',12) + cast(it.BidPrice as varchar(20)),12)
	  from #ItemTable it
	  join BidHeaders on BidHeaders.BidHeaderId = it.BidHeaderId
	  Left outer join #OrderCounts oc on oc.ItemId = it.ItemId

	-- Begin Transaction
	begin Transaction PricingUpdate
	begin try

	-- Delete Items from PricingConsolidated that are not in the temp Table
	delete PricingConsolidated
	  from SearchData.dbo.PricingConsolidated
	 where PricingConsolidated.BidHeaderId = @pBidHeaderId
	--   and (select top 1 Id from #ItemTable it where it.BidHeaderId = PricingConsolidated.BidHeaderId and it.CrossRefId = PricingConsolidated.CrossRefId and coalesce(it.BidItemId,0) = coalesce(PricingConsolidated.BidItemId,0) and it.AwardId = PricingConsolidated.AwardId) is null
	/*
	-- Update Matching Items that are different
	Update PricingConsolidated
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
		   ShortDescription = it.ShortDescription,
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
		   ProductNames = it.ProductNames,
		   TypeAheads = it.TypeAheads,
		   OrderCounts = it.OrderCounts,
		   RowNumberSort = it.RowNumberSort
	  from SearchData_Test.dbo.PricingConsolidated
	  join #ItemTable it on it.BidHeaderId = PricingConsolidated.BidHeaderId
	                    and it.CrossRefId = PricingConsolidated.CrossRefId
						and coalesce(it.BidItemId,0) = coalesce(PricingConsolidated.BidItemId,0)
	 where PricingConsolidated.BidHeaderId = @pBidHeaderId
	   and (   coalesce(PricingConsolidated.HeadingId,0) != coalesce(it.HeadingId,0)
			or coalesce(PricingConsolidated.KeywordId,0) != coalesce(it.KeywordId,0)
			or coalesce(PricingConsolidated.ItemId,0) != coalesce(it.ItemId,0)
			or coalesce(PricingConsolidated.VendorId,0) != coalesce(it.VendorId,0)
			or coalesce(PricingConsolidated.BidItemId,0) != coalesce(it.BidItemId,0)
			or coalesce(PricingConsolidated.DistrictId,0) != coalesce(it.DistrictId,0)
			or coalesce(PricingConsolidated.HeadingKeywordId,0) != coalesce(it.HeadingKeywordId,0)
			or coalesce(PricingConsolidated.BidPrice,0) != coalesce(it.BidPrice,0)
			or coalesce(PricingConsolidated.CatalogPrice,0) != coalesce(it.CatalogPrice,0)
			or coalesce(PricingConsolidated.DiscountRate,0) != coalesce(it.DiscountRate,0)
			or coalesce(PricingConsolidated.ShortDescription,'') != coalesce(it.ShortDescription,'')
			or coalesce(PricingConsolidated.FullDescription,'') != coalesce(it.FullDescription,'')
			or coalesce(PricingConsolidated.Alternate,'') != coalesce(it.Alternate,'')
			or coalesce(PricingConsolidated.PackedItemCode,'') != coalesce(it.PackedItemCode,'')
			or coalesce(PricingConsolidated.ItemCode,'') != coalesce(it.ItemCode,'')
			or coalesce(PricingConsolidated.PackedVendorItemCode,'') != coalesce(it.PackedVendorItemCode,'')
			or coalesce(PricingConsolidated.UniqueItemNumber,'') != coalesce(it.UniqueItemNumber,'')
			or coalesce(PricingConsolidated.VendorItemCode,'') != coalesce(it.VendorItemCode,'')
			or coalesce(PricingConsolidated.Headings,'') != coalesce(it.Headings,'')
			or coalesce(PricingConsolidated.Keywords,'') != coalesce(it.Keywords,'')
			or coalesce(PricingConsolidated.Manufacturer,'') != coalesce(it.Manufacturer,'')
			or coalesce(PricingConsolidated.ManufacturerPartNumber,'') != coalesce(it.ManufacturerPartNumber,'')
			or coalesce(PricingConsolidated.ItemHeading,'') != coalesce(it.ItemHeading,'')
			or coalesce(PricingConsolidated.ItemKeyword,'') != coalesce(it.ItemKeyword,'')
			or coalesce(PricingConsolidated.AdditionalShipping,0) != coalesce(it.AdditionalShipping,0)
			or coalesce(PricingConsolidated.ProductNames,'') != coalesce(it.ProductNames,'')
			or coalesce(PricingConsolidated.TypeAheads,'') != coalesce(it.TypeAheads,'')
			or coalesce(PricingConsolidated.AllStringFields,'') != coalesce(it.AllStringFields,''))
	*/
	-- Insert Missing Items
	insert SearchData.dbo.PricingConsolidated (CrossRefId, CatalogId, BidHeaderId, HeadingId, KeywordId, CategoryId, ItemId, VendorId, BidItemId, DistrictId, HeadingKeywordId, 
								BidPrice, CatalogPrice, DiscountRate, ShortDescription, FullDescription, Alternate, PackedItemCode, ItemCode, PackedVendorItemCode, VendorItemCode,
								Headings, Keywords, Manufacturer, ManufacturerPartNumber, ItemHeading, ItemKeyword, AdditionalShipping, SortSeq,
								CatalogPage, AwardId, BidType, ItemBidType, UnitId, UnitCode, UniqueItemNumber, ProductNames, TypeAheads, AllStringFields, OrderCounts, RowNumberSort, 
								TotalQuantity, perishableItem, prescriptionRequired, digitallyDelivered, minimumOrderQuantity
								)
		select it.CrossRefId, it.CatalogId, it.BidHeaderId, it.HeadingId, it.KeywordId, it.CategoryId, it.ItemId, it.VendorId, it.BidItemId, it.DistrictId, it.HeadingKeywordId, 
				it.BidPrice, it.CatalogPrice, it.DiscountRate, it.ShortDescription, it.FullDescription, it.Alternate, it.PackedItemCode, it.ItemCode, it.PackedVendorItemCode, it.VendorItemCode,
				it.Headings, it.Keywords, it.Manufacturer, it.ManufacturerPartNumber, it.ItemHeading, it.ItemKeyword, it.AdditionalShipping, it.SortSeq,
				it.CatalogPage, it.AwardId, it.BidType, it.ItemBidType, it.UnitId, it.UnitCode, it.UniqueItemNumber, it.ProductNames, it.TypeAheads, it.AllStringFields, it.OrderCounts, it.RowNumberSort, 
				it.TotalQuantity, it.perishableItem, it.prescriptionRequired, it.digitallyDelivered, it.minimumOrderQuantity
		  from #ItemTable it
	--	 where (select top 1 PricingConsolidated.PricingConsolidatedId from SearchData_Test.dbo.PricingConsolidated where PricingConsolidated.BidHeaderId = it.BidHeaderId and PricingConsolidated.CrossRefId = it.CrossRefId and coalesce(PricingConsolidated.BidItemId,0) = coalesce(it.BidItemId,0)) is null

		-- Update Time of Last Update
	insert PricingUpdate(BidHeaderId, LastUpdated) values(@pBidHeaderId, getutcdate())

	-- Commit Transaction
	commit transaction PricingUpdate

	end try
	begin catch
		rollback transaction PricingUpdate
	end catch
end
```
