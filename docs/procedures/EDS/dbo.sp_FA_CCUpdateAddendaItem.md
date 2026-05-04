# Procedure: `dbo.sp_FA_CCUpdateAddendaItem`

_Generated on 2026-05-04T13:07:57.454Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_CCUpdateAddendaItem` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-06-14 00:00:46 |
| Modified | 2015-11-24 23:37:31 |
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
| 14 | `@pDetailId` | IN | int |  |
| 15 | `@sessionID` | IN | int |  |

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
CREATE procedure [dbo].[sp_FA_CCUpdateAddendaItem] @pHeadingId int, @pKeywordId int, @pDescription varchar(1024), 
                                      @pUnitId int, @pBrandName varchar(255), @pManufacturorNumber varchar(50), @pVendorId int, 
                                      @pVendorPartNumber varchar(50), @pItemsPerUnit varchar(50), @pListPrice money, @pExtraDetail varchar(1024), 
                                      @pRequisitionId int, @pQuantity int, @pDetailId int, @sessionID int
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

  if isnull(@BidItemId,0) = 0
  begin  
    -- Update Item
    Update Items
       set HeadingId = @pHeadingId,
           KeywordId = @pKeywordId,
           [Description] = @pDescription,
           UnitId = @pUnitId,
           BrandName = @pBrandName,
           ManufacturorNumber = @pManufacturorNumber,
           VendorId = @pVendorId,
           VendorPartNumber = @pVendorPartNumber,
           ItemsPerUnit = @pItemsPerUnit,
           ListPrice = @pListPrice
--           ExtraDetail = @pExtraDetail
     where ItemId = @ItemId

    -- Update Detail
    Update Detail
       set Quantity = @pQuantity,
--           [Description] = @pDescription,
--           UnitId = @pUnitId,
--           UnitCode = @UnitCode,
--           BidPrice = @pListPrice,
--           CatalogPrice = @pListPrice,
--           GrossPrice = @pListPrice,
--           VendorId = @pVendorId,
--           VendorItemCode = @pVendorPartNumber,
           ExtraDescription = @pExtraDetail,
           ReProc = 1,
           Modified = GETDATE(),
           SessionId = @sessionID
      from Detail
      join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
      join Users on Users.UserId = Requisitions.UserId
      join DistrictCategories on DistrictCategories.DistrictId = Users.DistrictId
                             and DistrictCategories.CategoryId = Requisitions.CategoryId
      join Budgets on Budgets.BudgetId = Requisitions.BudgetId
                  and getdate() between case when (isnull(Users.AllowEarlyAccess,0) = 1 or isnull(Users.ApprovalLevel,0) > 1) and ISNULL(DistrictCategories.EarlyAccess,0) = 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else Budgets.VisibleFrom end and VisibleUntil
     where Detail.ItemId = @ItemId
       and Detail.RequisitionId = @pRequisitionId
       and Detail.ItemMustBeBid = 1

  end
  else
  begin
    Update Detail
       set Quantity = @pQuantity,
           ExtraDescription = @pExtraDetail,
           ReProc = 1,
           Modified = GETDATE(),
           SessionId = @sessionID
     where DetailId = @pdetailId
  end
```
