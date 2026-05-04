# Procedure: `dbo.sp_FA_CCAddAddendaItem`

_Generated on 2026-05-04T13:04:00.381Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_CCAddAddendaItem` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-07-11 11:08:17 |
| Modified | 2015-11-24 23:37:43 |
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

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Catalog` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `DistrictPP` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `PPCatalogs` | USER_TABLE |  |
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
CREATE  procedure [dbo].[sp_FA_CCAddAddendaItem] @pHeadingId int, @pKeywordId int, @pDescription varchar(1024), 
                                      @pUnitId int, @pBrandName varchar(255), @pManufacturorNumber varchar(50), @pVendorId int, 
                                      @pVendorPartNumber varchar(50), @pItemsPerUnit varchar(50), @pListPrice money, @pExtraDetail varchar(1024), 
                                      @pRequisitionId int, @pQuantity int, @sessionID int
as

declare @NextNumber varchar(50),
	@DistrictCode varchar(16),
	@DistrictId int,
	@CategoryId int,
	@ItemId int,
	@UnitCode varchar(16),
	@PricePlanId int,
	@CatalogId int

  select @DistrictCode = District.DistrictCode,
         @DistrictId = District.DistrictId,
         @CategoryId = Requisitions.CategoryId,
         @CatalogId = Catalog.CatalogId
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

  select top 1 @NextNumber = @DistrictCode + 'ADD' + right('00000' + convert(varchar(16),convert(int,substring(SortSeq,17,8)) + 1),5)
    from dbo.Items
   where ItemCode >= @DistrictCode + 'ADD'
     and ItemCode <= @DistrictCode + 'ADE'
   order by SortSeq desc

  if @@rowcount = 0
  begin
    select @NextNumber = (@DistrictCode + 'ADD00001')
  end

  -- Add Item to System
  INSERT INTO [Items]([HeadingId], [KeywordId], [Description], [UnitId], [BrandName], 
                      [ManufacturorNumber], [VendorId], [VendorPartNumber], [ItemsPerUnit], [ListPrice], 
                      [ExtraDetail], [Active], [CategoryId], [ItemCode], PackedCode, DistrictId) 
    VALUES(@pHeadingId, @pKeywordId, @pDescription, @pUnitId, @pBrandName, 
           @pManufacturorNumber, @pVendorId, @pVendorPartNumber, @pItemsPerUnit, 
           @pListPrice, @pExtraDetail, 1, @CategoryId, @NextNumber, dbo.uf_PackCode(@NextNumber), @DistrictId)

  select @ItemId = Scope_Identity() --DCH 11/24/2015 @@IDENTITY

  -- Add Item to System
  insert CrossRefs (Active, ItemId, VendorItemCode, PackedCode)
    values (1, @ItemId, @NextNumber, dbo.uf_PackCode(@NextNumber))

  if isnull(@CatalogId,0) != 0
  begin
    insert CrossRefs (Active, ItemId, VendorItemCode, PackedCode, CatalogId, CatalogPrice, GrossPrice)
      values (1, @ItemId, @NextNumber, dbo.uf_PackCode(@NextNumber), @CatalogId, @pListPrice, @pListPrice)
  end

  -- Get Unit Code Description
  select @UnitCode = Code
    from Units
   where UnitId = @pUnitId

  if @@rowcount = 0
  begin
    select @UnitCode = ''
  end

  -- Find Price Plan
  select @PricePlanId = DistrictPP.PricePlanId
    from DistrictPP
    join PPCatalogs on PPCatalogs.PricePlanId = DistrictPP.PricePlanId
   where DistrictPP.DistrictId = @DistrictId
     and PPCatalogs.CategoryId = @CategoryId

  -- Add Item to Requisition
  insert Detail (RequisitionId, ItemId, AddendumItem, ItemCode, Quantity, Description,
                 UnitId, UnitCode, BidPrice, CatalogPrice, GrossPrice, PricePlanId, VendorId, VendorItemCode, ExtraDescription, ItemMustBeBid, Modified, SessionID)
    values(@pRequisitionId, @ItemId, 1, @NextNumber, @pQuantity, @pDescription,
           @pUnitId, @UnitCode, @pListPrice, @pListPrice, @pListPrice, @PricePlanId, @pVendorId, @pVendorPartNumber, @pExtraDetail, 1, GETDATE(), @sessionID)
```
