# Procedure: `dbo.sp_AddMSRPItem`

_Generated on 2026-05-04T13:07:57.334Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_AddMSRPItem` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2013-05-30 13:26:57 |
| Modified | 2015-11-24 23:37:40 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDescription` | IN | varchar(1024) |  |
| 2 | `@pUnitId` | IN | int |  |
| 3 | `@pManufacturerId` | IN | int |  |
| 4 | `@pManufacturerNumber` | IN | varchar(50) |  |
| 5 | `@pVendorId` | IN | int |  |
| 6 | `@pVendorPartNumber` | IN | varchar(50) |  |
| 7 | `@pItemsPerUnit` | IN | varchar(50) |  |
| 8 | `@pListPrice` | IN | money |  |
| 9 | `@pRequisitionId` | IN | int |  |
| 10 | `@pQuantity` | IN | int |  |
| 11 | `@sessionID` | IN | int |  |
| 12 | `@pBidderToSupplyVendorPartNbr` | IN | tinyint |  |
| 13 | `@pExtraDescription` | IN | varchar(1024) |  |

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
CREATE procedure [dbo].[sp_AddMSRPItem] @pDescription varchar(1024), 
                                      @pUnitId int, @pManufacturerId int, @pManufacturerNumber varchar(50), @pVendorId int, 
                                      @pVendorPartNumber varchar(50), @pItemsPerUnit varchar(50), @pListPrice money,  
                                      @pRequisitionId int, @pQuantity int, @sessionID int, @pBidderToSupplyVendorPartNbr tinyint
										, @pExtraDescription varchar(1024)
as

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
  INSERT INTO [Items]([Description], [UnitId], ManufacturerId, 
                      [ManufacturorNumber], [VendorId], [VendorPartNumber], [ItemsPerUnit], [ListPrice], 
                      [Active], [CategoryId], [ItemCode], PackedCode, DistrictId, BidderToSupplyVendorPartNbr) 
    VALUES(@pDescription, @pUnitId, @pManufacturerId, 
           @pManufacturerNumber, @pVendorId, @pVendorPartNumber, @pItemsPerUnit, 
           @pListPrice, 1, isnull(@CategoryId,0), @NextNumber, dbo.uf_PackCode(@NextNumber), isnull(@DistrictId,0), @pBidderToSupplyVendorPartNbr)

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

  -- Add Item to Requisition
  insert Detail (RequisitionId, ItemId, AddendumItem, ItemCode, Quantity, Description,
                 UnitId, UnitCode, BidPrice, CatalogPrice, GrossPrice, PricePlanId, VendorId, VendorItemCode, Modified, LastAlteredSessionID, ExtraDescription)
    values(@pRequisitionId, @ItemId, 1, @NextNumber, @pQuantity, @pDescription,
           @pUnitId, @UnitCode, @pListPrice, @pListPrice, @pListPrice, isnull(@PricePlanId,0), @pVendorId, @pVendorPartNumber, GETDATE(), @sessionID, @pExtraDescription)

-- return the new detail ID
SELECT	SCOPE_IDENTITY() AS NewDetailID
```
