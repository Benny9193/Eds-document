# Procedure: `dbo.sp_UpdateMSRPItem`

_Generated on 2026-05-04T13:04:24.197Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UpdateMSRPItem` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2013-05-30 13:32:56 |
| Modified | 2014-10-07 17:53:20 |
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
| 11 | `@pDetailId` | IN | int |  |
| 12 | `@sessionID` | IN | int |  |
| 13 | `@pBidderToSupplyVendorPartNbr` | IN | tinyint |  |
| 14 | `@pExtraDescription` | IN | varchar(1024) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `DistrictCategories` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Units` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_UpdateMSRPItem] @pDescription varchar(1024), 
                                      @pUnitId int, @pManufacturerId int, @pManufacturerNumber varchar(50), @pVendorId int, 
                                      @pVendorPartNumber varchar(50), @pItemsPerUnit varchar(50), @pListPrice money,  
                                      @pRequisitionId int, @pQuantity int, @pDetailId int, @sessionID int, @pBidderToSupplyVendorPartNbr tinyint
									, @pExtraDescription varchar(1024)
as
declare @ItemId int,
	@BidItemId int,
	@UnitCode varchar(16),
	@PricePlanId int

  -- Get Detail Record Info
  select @ItemId = ItemId,
         @BidItemId = BidItemId
    from Detail with (nolock)
   where DetailId = @pDetailId

  -- Get Unit Code Description
  select @UnitCode = Code
    from Units with (nolock)
   where UnitId = @pUnitId

  if @@rowcount = 0
  begin
    select @UnitCode = ''
  end

	/* BH 6/13/2013 removed check for biditemid, was causing only quantity to update in all cases after the initial MSRP item creation
  if isnull(@BidItemId,0) = 0
  begin  
  */
    -- Update Item
    Update Items
       set [Description] = @pDescription,
           UnitId = @pUnitId,
           ManufacturerId = @pManufacturerId,
           ManufacturorNumber = @pManufacturerNumber,
           VendorId = @pVendorId,
           VendorPartNumber = @pVendorPartNumber,
           ItemsPerUnit = @pItemsPerUnit,
           ListPrice = @pListPrice,
           BidderToSupplyVendorPartNbr = @pBidderToSupplyVendorPartNbr
     where ItemId = @ItemId

    -- Update Detail
    Update Detail
       set Quantity = @pQuantity
			, Description = @pDescription
			, UnitId = @pUnitId
			, BidPrice = @pListPrice
			, VendorItemCode = @pVendorPartNumber
           , ReProc = 1
           , Modified = GETDATE()
           , LastAlteredSessionID = @sessionID
           , ExtraDescription = @pExtraDescription
      from Detail
      join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
      join Users on Users.UserId = Requisitions.UserId
      join DistrictCategories on DistrictCategories.DistrictId = Users.DistrictId
                             and DistrictCategories.CategoryId = Requisitions.CategoryId
      join Budgets on Budgets.BudgetId = Requisitions.BudgetId
                  and getdate() between case when isnull(Users.AllowEarlyAccess,0) = 1 or isnull(Users.ApprovalLevel,0) > 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else Budgets.VisibleFrom end and VisibleUntil
     where Detail.ItemId = @ItemId
       and Detail.RequisitionId = @pRequisitionId
       
/* BH 6/13/2013 removed check for biditemid, was causing only quantity to update in all cases after the initial MSRP item creation
  end
  else
  begin
    Update Detail
       set Quantity = @pQuantity,
           ReProc = 1,
           Modified = GETDATE(),
           LastAlteredSessionID = @sessionID
     where DetailId = @pdetailId
  end
  */
```
