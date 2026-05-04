# Procedure: `dbo.sp_AddISBN`

_Generated on 2026-05-04T14:49:07.199Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_AddISBN` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-04-30 23:32:40 |
| Modified | 2013-01-28 22:25:07 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pISBN` | IN | varchar(255) |  |
| 3 | `@pTitle` | IN | varchar(255) |  |
| 4 | `@pCopyrightYear` | IN | int |  |
| 5 | `@pEditionId` | IN | int |  |
| 6 | `@pPublisherId` | IN | int |  |
| 7 | `@pPublisherCost` | IN | varchar(255) |  |
| 8 | `@pRequisitionId` | IN | int |  |
| 9 | `@pQuantity` | IN | int |  |
| 10 | `@rItemId` | INOUT | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Category` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `sp_ISBNAdd` | unresolved |  |
| `Units` | USER_TABLE |  |
| `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE           procedure [dbo].[sp_AddISBN] @pSessionId int, @pISBN varchar(255), @pTitle varchar(255), @pCopyrightYear int, @pEditionId int, @pPublisherId int, @pPublisherCost varchar(255), @pRequisitionId int, @pQuantity int, @rItemId int output AS

declare @ItemId int,
	@CategoryId int,
	@UnitId int,
	@CrossRefId int,
	@Active tinyint,
	@PublisherCost money,
	@UserLevel int

select @UserLevel = ApprovalLevel
  from SessionTable
 where SessionId = @pSessionId

select @CategoryId = Category.CategoryId
  from Category
  join Requisitions on Requisitions.CategoryId = Category.CategoryId
 where Requisitions.RequisitionId = @pRequisitionId
   and Category.Type = 2

select @UnitId = UnitId
  from Units
 where Code = 'BOOK'
   and Active = 1

select @PublisherCost = convert(money,@pPublisherCost)

if @@rowcount = 0
begin
  insert Units (Active, Code) values (1, 'BOOK')

  select @UnitId = SCOPE_IDENTITY()
end

-- Check for Item Existing
select @ItemId = ItemId,
       @Active = isnull(Active,0)
  from Items
 where CategoryId = @CategoryId
   and PackedCode = dbo.uf_PackCode(@pISBN)

-- Check for Being In Database
if @@rowcount = 0
begin
  insert Items (Active, CategoryId, ItemCode, [Description], UnitId, ParentCatalogId, EditionId, CopyrightYear, PackedCode, ListPrice)
    values (1, @CategoryId, rtrim(@pISBN), rtrim(@pTitle), @UnitId, @pPublisherId, @pEditionId, @pCopyrightYear, dbo.uf_PackCode(rtrim(@pISBN)), @PublisherCost)

  select @ItemId = SCOPE_IDENTITY()
end
else
begin
  if @Active = 0
  begin
    Update Items
       set Active = 1
     where ItemId = @ItemId
  end

/*  Update Items
     set ListPrice = @PublisherCost,
         ParentCatalogId = @pPublisherId,
         [Description] = rtrim(@pTitle),
         EditionId = @pEditionId,
         CopyrightYear = @pCopyrightYear
   where ItemId = @ItemId
*/
end

-- Check for CrossRef for Publisher Price
select @CrossRefId = CrossRefId
  from CrossRefs
 where ItemId = @ItemId
   and CatalogId = @pPublisherId
   and PackedCode = dbo.uf_PackCode(@pISBN)
   and Active = 1

if @@rowcount = 0
begin
  insert CrossRefs (ItemId, Active, VendorItemCode, CatalogId, CatalogPrice, GrossPrice)
    values (@ItemId, 1, rtrim(@pISBN), @pPublisherId, @PublisherCost, @PublisherCost)

  select @CrossRefId = SCOPE_IDENTITY()
end

-- Check for CrossRef for EDSIQ Ref
select @CrossRefId = CrossRefId
  from CrossRefs
 where ItemId = @ItemId
   and isnull(CatalogId,0) = 0
   and PackedCode = dbo.uf_PackCode(@pISBN)
   and Active = 1

if @@rowcount = 0
begin
  insert CrossRefs (ItemId, Active, VendorItemCode, CatalogId, CatalogPrice)
    values (@ItemId, 1, rtrim(@pISBN), null, null)

  select @CrossRefId = SCOPE_IDENTITY()
end

if @UserLevel >= 5
begin
  Update Items
     set ListPrice = @PublisherCost
    from Items
   where ItemId = @ItemId

  Update CrossRefs
     set CatalogPrice = @PublisherCost,
         GrossPrice = @PublisherCost
   where CrossrefId = @CrossRefId
end
-- Update Prices for Item
--exec sp_UpdateItemPrices @ItemId

-- Add Item to Requisition
exec sp_ISBNAdd @pSessionId, @pRequisitionId, @pISBN, @pQuantity

select @rItemId = @ItemId
```
