# Procedure: `dbo.sp_CCUpdateAddendaMaint`

_Generated on 2026-05-04T14:49:07.227Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CCUpdateAddendaMaint` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2009-12-04 15:10:22 |
| Modified | 2013-09-24 09:31:16 |
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
| 12 | `@pItemId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Items` | USER_TABLE |  |
| `Units` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_CCUpdateAddendaMaint] @pHeadingId int, @pKeywordId int, @pDescription varchar(1024), 
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
