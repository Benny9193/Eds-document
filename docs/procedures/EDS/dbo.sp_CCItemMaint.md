# Procedure: `dbo.sp_CCItemMaint`

_Generated on 2026-05-04T13:04:24.077Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CCItemMaint` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-05-21 23:16:51 |
| Modified | 2019-08-01 07:59:19 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pItemId` | IN | int |  |
| 2 | `@pActive` | IN | tinyint |  |
| 3 | `@pCategoryId` | IN | int |  |
| 4 | `@pItemCode` | IN | varchar(50) |  |
| 5 | `@pDescription` | IN | varchar(512) |  |
| 6 | `@pUnitId` | IN | int |  |
| 7 | `@pParentCatalogId` | IN | int |  |
| 8 | `@pHeadingId` | IN | int |  |
| 9 | `@pRTK` | IN | tinyint |  |
| 10 | `@pEditionId` | IN | int |  |
| 11 | `@pCopyrightYear` | IN | int |  |
| 12 | `@pDistrictId` | IN | int |  |
| 13 | `@pBrandName` | IN | varchar(50) |  |
| 14 | `@pManufacturorNumber` | IN | varchar(50) |  |
| 15 | `@pVendorId` | IN | int |  |
| 16 | `@pVendorPartNumber` | IN | varchar(50) |  |
| 17 | `@pItemsPerUnit` | IN | varchar(50) |  |
| 18 | `@pListPrice` | IN | money |  |
| 19 | `@pExtraDetail` | IN | varchar(1024) |  |
| 20 | `@pShortDescription` | IN | varchar(60) |  |
| 21 | `@pKeywordId` | IN | int |  |
| 22 | `@pAlternateItemCode` | IN | varchar(50) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Catalog` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_CCItemMaint] 
@pItemId int, 
@pActive tinyint,
@pCategoryId int, 
@pItemCode varchar(50),
@pDescription varchar(512), 
@pUnitId int, 
@pParentCatalogId int, 
@pHeadingId int, 
@pRTK tinyint,
@pEditionId int, 
@pCopyrightYear int, 
@pDistrictId int, 
@pBrandName varchar(50), 
@pManufacturorNumber varchar(50), 
@pVendorId int, 
@pVendorPartNumber varchar(50),
@pItemsPerUnit varchar(50), 
@pListPrice money, 
@pExtraDetail varchar(1024), 
@pShortDescription varchar(60),
@pKeywordId int, 
@pAlternateItemCode varchar(50) as

declare @ItemId int,
	@CrossRefId int,
	@CatalogId int,
	@DistrictCode varchar(16)

set transaction isolation level read committed

select @ItemId = isnull(@pItemId,0)

--print 'ItemId = ' + convert(varchar(16),@ItemId) + ' Action = ' + convert(varchar(16),@pAction)

if @ItemId = 0
begin
  if isnull(@pDistrictId,0) = 0
  begin
    select @DistrictCode = ''
  end
  else
  begin
    select @DistrictCode = DistrictCode
      from District with (nolock)
     where DistrictId = @pDistrictId
  end

  if isnull(rtrim(@pItemCode),'') = ''
  begin
    select top 1 @pItemCode = @DistrictCode + 'ADD' + right('00000' + convert(varchar(16),convert(int,substring(SortSeq,17,8)) + 1),5)
      from dbo.Items with (nolock)
     where ItemCode >= @DistrictCode + 'ADD'
       and ItemCode <= @DistrictCode + 'ADE'
     order by SortSeq desc

    if @@rowcount = 0
    begin
      select @pItemCode = (@DistrictCode + 'ADD00001')
    end
  end

  INSERT INTO [Items]([Active], [CategoryId], [ItemCode], [Description], UnitId,
                      ParentCatalogId, HeadingId, RTK, EditionId, CopyrightYear, PackedCode,
                      DistrictId, BrandName, ManufacturorNumber, VendorId, VendorPartNumber,
                      ItemsPerUnit, ListPrice, ExtraDetail, ShortDescription, KeywordId, AlternateItemCode)
  VALUES(@pActive, @pCategoryId, rtrim(@pItemCode), rtrim(@pDescription), @pUnitId,
         @pParentCatalogId, @pHeadingId, @pRTK, @pEditionId, @pCopyrightYear, dbo.uf_PackCode(@pItemCode),
         @pDistrictId, rtrim(@pBrandName), rtrim(@pManufacturorNumber), @pVendorId, rtrim(@pVendorPartNumber),
         rtrim(@pItemsPerUnit), @pListPrice, rtrim(@pExtraDetail), rtrim(@pShortDescription), @pKeywordId, rtrim(@pAlternateItemCode))

  select @ItemId = @@Identity       --Scope_Identity() --DCH 11/24/2015 @@Identity
  select @ItemId = SCOPE_IDENTITY()
    
--  print 'ItemId = ' + convert(varchar(16),@ItemId)
end
else
begin
  Update Items
     set Active = @pActive,
         CategoryId = @pCategoryId,
         ItemCode = rtrim(@pItemCode),
         Description = rtrim(@pDescription),
         UnitId = @pUnitId,
         ParentCatalogId = @pParentCatalogId,
         HeadingId = @pHeadingId,
         RTK = @pRTK,
         EditionId = @pEditionId,
         CopyrightYear = @pCopyrightYear,
         PackedCode = dbo.uf_PackCode(@pItemCode),
         DistrictId = @pDistrictId,
         BrandName = rtrim(@pBrandName),
         ManufacturorNumber = rtrim(@pManufacturorNumber),
         VendorId = @pVendorId,
         VendorPartNumber = rtrim(@pVendorPartNumber),
         ItemsPerunit = rtrim(@pItemsPerUnit),
         ListPrice = @pListPrice,
         ExtraDetail = rtrim(@pExtraDetail),
         ShortDescription = rtrim(@pShortDescription),
         KeywordId = @pKeywordId,
         AlternateItemCode = rtrim(@pAlternateItemCode)
   where ItemId = @ItemId
end

-- Initialize variable
select @CrossRefid = 0

-- Verify Master Reference
select @CrossRefId = isnull(CrossRefId,0)
  from CrossRefs with (nolock)
 where ItemId = @ItemId
   and isnull(CatalogId,0) = 0
   and Active = 1

--print 'CrossRefId = ' + convert(varchar(16),@CrossRefId)

-- Check for New Entry
if isnull(@CrossRefId,0) = 0
begin
  -- Add Master CrossRef
  insert CrossRefs (Active, ItemId, VendorItemCode, PackedCode, DateUpdated)
    values (@pActive, @ItemId, rtrim(@pItemCode), dbo.uf_PackCode(@pItemCode), getdate())
end
else
begin
  -- Update Master CrossRef
  Update CrossRefs
     set Active = @pActive,
         VendorItemCode = rtrim(@pItemCode),
         PackedCode = dbo.uf_PackCode(@pItemCode),
         DateUpdated = getdate()
   where CrossRefId = @CrossRefId
end

select @CatalogId = isnull(CatalogId,0)
  from Catalog with (nolock)
 where CategoryId = @pCategoryId
   and Name = 'EDS'
   and Active = 1

if @@rowcount != 0 and @CatalogId != 0
begin
  -- Verify EDS Reference
  select @CrossRefId = isnull(CrossRefId,0)
    from CrossRefs with (nolock)
   where ItemId = @ItemId
     and CatalogId = @CatalogId
     and Active = 1

  -- Check for New Entry
  if @CrossRefId = 0
  begin
    -- Add Master CrossRef
    insert CrossRefs (Active, ItemId, CatalogId, VendorItemCode, PackedCode, DateUpdated, CatalogPrice, GrossPrice)
      values (@pActive, @ItemId, @CatalogId, rtrim(@pItemCode), dbo.uf_PackCode(@pItemCode), getdate(), @pListPrice, @pListPrice)
  end
  else
  begin
    -- Update Master CrossRef
    Update CrossRefs
       set Active = @pActive,
           VendorItemCode = rtrim(@pItemCode),
           PackedCode = dbo.uf_PackCode(@pItemCode),
           DateUpdated = getdate(),
           CatalogPrice = @pListPrice,
           GrossPrice = @pListPrice
     where CrossRefId = @CrossRefId
  end
end
```
