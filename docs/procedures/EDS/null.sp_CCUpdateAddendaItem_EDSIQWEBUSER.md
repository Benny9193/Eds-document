# Procedure: `null.sp_CCUpdateAddendaItem_EDSIQWEBUSER`

_Generated on 2026-05-04T13:04:00.208Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `sp_CCUpdateAddendaItem_EDSIQWEBUSER` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-12-12 14:54:09 |
| Modified | 2013-02-04 00:18:57 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Detail` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Units` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE      procedure EDSIQWebUser.sp_CCUpdateAddendaItem @pHeadingId int, @pKeywordId int, @pDescription varchar(1024), 
                                      @pUnitId int, @pBrandName varchar(255), @pManufacturorNumber varchar(50), @pVendorId int, 
                                      @pVendorPartNumber varchar(50), @pItemsPerUnit varchar(50), @pListPrice money, @pExtraDetail varchar(1024), 
                                      @pRequisitionId int, @pQuantity int, @pDetailId int
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
           [Description] = @pDescription,
           UnitId = @pUnitId,
           UnitCode = @UnitCode,
           BidPrice = @pListPrice,
           CatalogPrice = @pListPrice,
           GrossPrice = @pListPrice,
           VendorId = @pVendorId,
           VendorItemCode = @pVendorPartNumber,
           ExtraDescription = @pExtraDetail
     where DetailId = @pdetailId
  end
  else
  begin
    Update Detail
       set Quantity = @pQuantity,
           ExtraDescription = @pExtraDetail
     where DetailId = @pdetailId
  end
```
