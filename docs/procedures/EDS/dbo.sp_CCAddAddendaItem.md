# Procedure: `dbo.sp_CCAddAddendaItem`

_Generated on 2026-05-04T13:43:18.729Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CCAddAddendaItem` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2009-12-08 09:35:43 |
| Modified | 2019-01-28 16:18:33 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pHeadingId` | IN | int |  |
| 2 | `@pKeywordId` | IN | int |  |
| 3 | `@pDescription` | IN | varchar(1024) |  |
| 4 | `@pUnitId` | IN | int |  |
| 5 | `@pBrandName` | IN | varchar(255) |  |
| 6 | `@pManufacturorNumber` | IN | varchar(50) |  |
| 7 | `@pVendorId` | IN | int |  |
| 8 | `@pVendorPartNumber` | IN | varchar(50) |  |
| 9 | `@pItemsPerUnit` | IN | varchar(50) |  |
| 10 | `@pListPrice` | IN | money |  |
| 11 | `@pExtraDetail` | IN | varchar(1024) |  |
| 12 | `@pRequisitionId` | IN | int |  |
| 13 | `@pQuantity` | IN | int |  |
| 14 | `@sessionID` | IN | int |  |
| 15 | `@pVendorToSupplyManufacturer` | IN | tinyint |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `DistrictPP` | USER_TABLE |  |
| `Headings` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Keywords` | USER_TABLE |  |
| `PPCatalogs` | USER_TABLE |  |
| `PricingAddenda` | USER_TABLE |  |
| `Units` | USER_TABLE |  |
| `dbo.District` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.Requisitions` | USER_TABLE |  |
| `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION |  |
| `dbo.Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_CCAddAddendaItem] @pHeadingId int, @pKeywordId int, @pDescription varchar(1024), 
                                      @pUnitId int, @pBrandName varchar(255), @pManufacturorNumber varchar(50), @pVendorId int, 
                                      @pVendorPartNumber varchar(50), @pItemsPerUnit varchar(50), @pListPrice money, @pExtraDetail varchar(1024), 
                                      @pRequisitionId int, @pQuantity int, @sessionID int, @pVendorToSupplyManufacturer tinyint = null
as


/*
declare @pHeadingId int, @pKeywordId int, @pDescription varchar(1024), 
                                      @pUnitId int, @pBrandName varchar(255), @pManufacturorNumber varchar(50), @pVendorId int, 
                                      @pVendorPartNumber varchar(50), @pItemsPerUnit varchar(50), @pListPrice money, @pExtraDetail varchar(1024), 
                                      @pRequisitionId int, @pQuantity int

set @pHeadingId = 59722
set @pKeywordId = 3771
set @pDescription = 'This is an addednda test'
set @pUnitId =1374
set @pBrandName = 'BobManu'
set @pManufacturorNumber = NULL
set @pVendorId = 984
set @pVendorPartNumber = '1234'
set @pItemsPerUnit = '21'
set @pListPrice = 12.00
set @pExtraDetail = NULL
set @pRequisitionId = 1242664
set @pQuantity = 1
*/



declare @NextNumber varchar(50),
	@DistrictCode varchar(16),
	@DistrictId int,
	@CategoryId int,
	@ItemId int,
	@UnitCode varchar(16),
	@PricePlanId int,
	@CatalogId int

  select @DistrictCode = isnull(District.DistrictCode,''),
         @DistrictId = isnull(District.DistrictId,0),
         @CategoryId = isnull(Requisitions.CategoryId,0),
         @CatalogId = isnull(Catalog.CatalogId,0)
    from dbo.Requisitions
    join dbo.Users on Users.UserId = Requisitions.UserId
    join dbo.District on District.DistrictId = Users.DistrictId
    left outer join Catalog on Catalog.CategoryId = Requisitions.CategoryId
                           and Catalog.Active = 1
                           and Catalog.Name = 'EDS'
   where Requisitions.RequisitionId = @pRequisitionId

  if isnull(@DistrictCode,'') = ''
  begin
    select @DistrictCode = ''
  end

  select top 1 @NextNumber = isnull(@DistrictCode,'') + 'ADD' + right('00000' + convert(varchar(16),convert(int,substring(SortSeq,17,8)) + 1),5)
    from dbo.Items
   where ItemCode >= isnull(@DistrictCode,'') + 'ADD'
     and ItemCode <= isnull(@DistrictCode,'') + 'ADE'
   order by SortSeq desc

  if @@rowcount = 0
  begin
    select @NextNumber = isnull(@DistrictCode,'') + 'ADD00001'
  end

  -- Add Item to System
  INSERT INTO [Items]([HeadingId], [KeywordId], [Description], [UnitId], [BrandName], 
                      [ManufacturorNumber], [VendorId], [VendorPartNumber], [ItemsPerUnit], [ListPrice], 
                      [ExtraDetail], [Active], [CategoryId], [ItemCode], PackedCode, DistrictId, VendorToSupplyManufacturer) 
    VALUES(@pHeadingId, @pKeywordId, @pDescription, @pUnitId, @pBrandName, 
           @pManufacturorNumber, @pVendorId, @pVendorPartNumber, @pItemsPerUnit, 
           @pListPrice, @pExtraDetail, 1, isnull(@CategoryId,0), @NextNumber, dbo.uf_PackCode(@NextNumber), isnull(@DistrictId,0), @pVendorToSupplyManufacturer)

  select @ItemId = Scope_Identity() --DCH 11/24/2015 @@IDENTITY

  -- Add Item to System
  insert CrossRefs (Active, ItemId, VendorItemCode, PackedCode, DateUpdated)
    values (1, @ItemId, @NextNumber, dbo.uf_PackCode(@NextNumber), getdate())

  if isnull(@CatalogId,0) != 0
  begin
    insert CrossRefs (Active, ItemId, VendorItemCode, PackedCode, CatalogId, CatalogPrice, GrossPrice, DateUpdated)
      values (1, @ItemId, @NextNumber, dbo.uf_PackCode(@NextNumber), @CatalogId, @pListPrice, @pListPrice, getdate())
  end

  -- Get Unit Code Description
  select @UnitCode = isnull(Code,'')
    from Units
   where UnitId = @pUnitId

  if @@rowcount = 0
  begin
    select @UnitCode = ''
  end

  -- Find Price Plan
  select @PricePlanId = isnull(DistrictPP.PricePlanId,0)
    from DistrictPP
    join PPCatalogs on PPCatalogs.PricePlanId = DistrictPP.PricePlanId
   where DistrictPP.DistrictId = @DistrictId
     and PPCatalogs.CategoryId = @CategoryId

  -- Update PricingAddenda Table
  Update PricingAddenda
     set HeadingId = Items.HeadingId,
	     KeywordId = Items.KeywordId,
		 VendorId = Items.VendorId,
		 HeadingKeywordId = Items.HeadingKeywordId,
		 ListPrice = Items.ListPrice,
		 LastBidPrice = LastBid.BidPrice,
		 CatalogPrice = CrossRefs.CatalogPrice,
		 FullDescription = Items.FullDescription,
		 VendorItemCode = Items.VendorPartNumber,
		 Manufacturer = Items.BrandName,
		 ManufacturerPartNumber = Items.ManufacturorNumber,
		 ItemHeading = Headings.Title,
		 ItemKeyword = Keywords.Keyword,
		 UnitId = Items.UnitId,
		 Unitcode = Units.Code
	from Items
	join CrossRefs on CrossRefs.ItemId = Items.ItemId
					and CrossRefs.Active = 1
	join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
				and Catalog.Name = 'EDS'
				and Catalog.Active = 1
	join PricingAddenda on PricingAddenda.ItemId = Items.ItemId and PricingAddenda.CrossRefId = CrossRefs.CrossRefId
	left outer join Headings on Headings.HeadingId = Items.HeadingId
	left outer join Keywords on Keywords.KeywordId = Items.KeywordId
	left outer join Units on Units.UnitId = Items.UnitId
	outer apply (select top 1 BidItems.Price - round(BidItems.Price * Bids.BidDiscountRate / 100,2) BidPrice, BidHeaders.DateCreated from BidItems join Bids on Bids.BidId = BidItems.BidId and Bids.Active = 1 and Bids.VendorId != 7691 join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId where BidItems.ItemId = Items.ItemId order by BidHeaders.DateCreated desc) LastBid
	where Items.DistrictId > 0
 	  and Items.ItemId = @ItemId

  if @@ROWCOUNT = 0
  begin
  -- Add Item to PricingAddenda Table
	insert PricingAddenda(CrossRefId, CatalogId, HeadingId, KeywordId, CategoryId, ItemId, VendorId, DistrictId, HeadingKeywordId, ListPrice, LastBidPrice, CatalogPrice, FullDescription, 
						  PackedItemCode, ItemCode, VendorItemCode, Manufacturer, ManufacturerPartNumber, ItemHeading, ItemKeyword, UnitId, Unitcode)
	  select CrossRefs.CrossRefId, Catalog.CatalogId, Items.HeadingId, Items.KeywordId, Items.CategoryId, Items.ItemId, Items.VendorId, Items.DistrictId, Items.HeadingKeywordId, Items.ListPrice, LastBid.BidPrice, CrossRefs.CatalogPrice, Items.Description, 
						  Items.PackedCode, Items.ItemCode, Items.VendorPartNumber, Items.BrandName, Items.ManufacturorNumber, Headings.Title, Keywords.Keyword, Items.UnitId, units.Code
		from Items
		join CrossRefs on CrossRefs.ItemId = Items.ItemId
					  and CrossRefs.Active = 1
		join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
					and Catalog.Name = 'EDS'
					and Catalog.Active = 1
		left outer join Headings on Headings.HeadingId = Items.HeadingId
		left outer join Keywords on Keywords.KeywordId = Items.KeywordId
		left outer join Units on Units.UnitId = Items.UnitId
		outer apply (select top 1 BidItems.Price - round(BidItems.Price * Bids.BidDiscountRate / 100,2) BidPrice, BidHeaders.DateCreated from BidItems join Bids on Bids.BidId = BidItems.BidId and Bids.Active = 1 and Bids.VendorId != 7691 join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId where BidItems.ItemId = Items.ItemId order by BidHeaders.DateCreated desc) LastBid
		left outer join PricingAddenda on PricingAddenda.ItemId = Items.ItemId and PricingAddenda.CrossRefId = CrossRefs.CrossRefId
	  where Items.DistrictId > 0
		and PricingAddenda.PricingAddendaId is null
		and Items.ItemId = @ItemId
	 order by Items.ItemId
  end

  -- Add Item to Requisition
  insert Detail (RequisitionId, ItemId, AddendumItem, ItemCode, Quantity, Description,
                 UnitId, UnitCode, BidPrice, CatalogPrice, GrossPrice, PricePlanId, VendorId, VendorItemCode, ExtraDescription, ItemMustBeBid, Modified, LastAlteredSessionID)
    values(@pRequisitionId, @ItemId, 1, @NextNumber, @pQuantity, @pDescription,
           @pUnitId, @UnitCode, @pListPrice, @pListPrice, @pListPrice, isnull(@PricePlanId,0), @pVendorId, @pVendorPartNumber, @pExtraDetail, 1, GETDATE(), @sessionID)

-- return the new detail ID
SELECT	SCOPE_IDENTITY() AS NewDetailID
```
