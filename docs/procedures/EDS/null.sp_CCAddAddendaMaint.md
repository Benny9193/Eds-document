# Procedure: `null.sp_CCAddAddendaMaint`

_Generated on 2026-05-04T13:04:00.202Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `sp_CCAddAddendaMaint` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-05-16 12:59:52 |
| Modified | 2015-11-24 23:37:42 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Catalog` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Units` | USER_TABLE |  |
| `dbo.Category` | USER_TABLE |  |
| `dbo.District` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [EDSIQWebUser].[sp_CCAddAddendaMaint] @pHeadingId int, @pKeywordId int, @pDescription varchar(1024), 
                                      @pUnitId int, @pBrandName varchar(255), @pManufacturorNumber varchar(50), @pVendorId int, 
                                      @pVendorPartNumber varchar(50), @pItemsPerUnit varchar(50), @pListPrice money, @pExtraDetail varchar(1024),
                                      @pDistrictId int, @pCategoryId int
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
         @DistrictId = District.DistrictId
    from dbo.District
   where District.DistrictId = @pDistrictId

  if isnull(@DistrictCode,'') = ''
  begin
    select @DistrictCode = ''
  end

  select @CategoryId = Category.CategoryId,
         @CatalogId = Catalog.CatalogId
    from dbo.Category
    left outer join Catalog on Catalog.CategoryId = Category.CategoryId
                           and Catalog.Active = 1
                           and Catalog.Name = 'EDS'
   where Category.CategoryId = @pCategoryId

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

  select @ItemId = Scope_identity() --DCH 11/24/2015 @@IDENTITY

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
```
