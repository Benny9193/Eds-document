# Procedure: `null.sp_CCUpdateAddendaMaint`

_Generated on 2026-05-04T13:04:00.209Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `sp_CCUpdateAddendaMaint` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-05-16 13:01:59 |
| Modified | 2015-11-24 23:37:29 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Items` | USER_TABLE |  |
| `Units` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [EDSIQWebUser].[sp_CCUpdateAddendaMaint] @pHeadingId int, @pKeywordId int, @pDescription varchar(1024), 
                                      @pUnitId int, @pBrandName varchar(255), @pManufacturorNumber varchar(50), @pVendorId int, 
                                      @pVendorPartNumber varchar(50), @pItemsPerUnit varchar(50), @pListPrice money, @pExtraDetail varchar(1024), 
                                      @pItemId int
as
declare @ItemId int,
	@BidItemId int,
	@UnitCode varchar(16),
	@PricePlanId int

  -- Get Detail Record Info
  select @ItemId = ItemId
    from Items
   where ItemId = @pItemId

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
         ListPrice = @pListPrice,
         ExtraDetail = @pExtraDetail
   where ItemId = @ItemId

  -- Get Unit Code Description
  select @UnitCode = Code
    from Units
   where UnitId = @pUnitId

  if @@rowcount = 0
  begin
    select @UnitCode = ''
  end
```
