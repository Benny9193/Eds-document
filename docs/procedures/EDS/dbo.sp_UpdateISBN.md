# Procedure: `dbo.sp_UpdateISBN`

_Generated on 2026-05-04T13:07:57.541Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UpdateISBN` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2004-03-18 23:02:49 |
| Modified | 2015-11-24 23:37:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pDetailId` | IN | int |  |
| 3 | `@pTitle` | IN | varchar(255) |  |
| 4 | `@pCopyrightYear` | IN | int |  |
| 5 | `@pEditionId` | IN | int |  |
| 6 | `@pPublisherId` | IN | int |  |
| 7 | `@pPublisherCost` | IN | varchar(255) |  |
| 8 | `@pRequisitionId` | IN | int |  |
| 9 | `@rItemId` | INOUT | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Catalog` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Units` | USER_TABLE |  |
| `dbo.uf_ItemDescription` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_UpdateISBN] @pSessionId int, @pDetailId int, @pTitle varchar(255), @pCopyrightYear int, @pEditionId int, @pPublisherId int, @pPublisherCost varchar(255), @pRequisitionId int, @rItemId int output AS

declare @ItemId int,
	@CategoryId int,
	@UnitId int,
	@CrossRefId int,
	@Active tinyint,
	@PublisherCost money

if @pDetailId = 0
begin
  return
end

select @CategoryId = Category.CategoryId
  from Category
  join Items on Items.CategoryId = Category.CategoryId
  join Detail on Detail.ItemId = Items.ItemId
             and Detail.DetailId = @pDetailId
 where Category.Type = 2

select @UnitId = UnitId
  from Units
 where Code = 'BOOK'
   and Active = 1

select @PublisherCost = convert(money,@pPublisherCost)

-- Check for Item Existing
select @ItemId = Items.ItemId,
       @Active = isnull(Items.Active,0)
  from Detail
  join Items on Items.ItemId = Detail.ItemId
 where Detail.DetailId = @pDetailId

if @@rowcount = 0
begin
  return
end

    Update Items
       set Active = 1,
           Description = rtrim(@pTitle),
           ParentCatalogId = @pPublisherId,
           EditionId = @pEditionId,
           CopyrightYear = @pCopyrightYear,
           ListPrice = @PublisherCost
     where ItemId = @ItemId

-- Check for CrossRef for Publisher Price
select @CrossRefId = CrossRefId
  from CrossRefs
 where ItemId = @ItemId
   and CatalogId = @pPublisherId
   and Active = 1

if @@rowcount = 0
begin
  insert CrossRefs (ItemId, Active, VendorItemCode, CatalogId, CatalogPrice, PackedCode, GrossPrice)
    select @ItemId, 1, Items.ItemCode, @pPublisherId, @PublisherCost, dbo.uf_PackCode(Items.ItemCode), @PublisherCost
      from Detail
      join Items on Items.ItemId = Detail.ItemId
     where Detail.DetailId = @pDetailId

  select @CrossRefId = Scope_Identity() --DCH 11/24/2015 @@IDENTITY
end

-- Check for CrossRef for EDSIQ Ref
select @CrossRefId = CrossRefId
  from CrossRefs
 where ItemId = @ItemId
   and isnull(CatalogId,0) = 0
   and Active = 1

if @@rowcount = 0
begin
  insert CrossRefs (ItemId, Active, VendorItemCode, CatalogId, CatalogPrice, PackedCode)
    select @ItemId, 1, Items.ItemCode, null, null, dbo.uf_PackCode(Items.ItemCode)
      from Detail
      join Items on Items.ItemId = Detail.ItemId
     where Detail.DetailId = @pDetailId
     
  select @CrossRefId = Scope_Identity() --DCH 11/24/2015 @@IDENTITY
end
else
begin
  Update CrossRefs
     set CatalogPrice = @PublisherCost,
         GrossPrice = @PublisherCost
    from CrossRefs
    join Catalog on Catalog.CatalogId = Crossrefs.CatalogId
                and Catalog.Name = 'EDS'
                and Catalog.Active = 1
   where CrossRefs.ItemId = @ItemId
     and CrossRefs.Active = 1
end

-- Add Item to Requisition
Update Detail
   set Description = dbo.uf_ItemDescription(Items.ItemId),
       CatalogPrice = Items.ListPrice,
       GrossPrice = case isnull(Detail.ItemMustBeBid,0) when 1 then Items.ListPrice else GrossPrice end,
       BidPrice = case isnull(Detail.ItemMustBeBid,0) when 1 then Items.ListPrice else BidPrice end
  from Detail
  join Items on Items.ItemId = Detail.ItemId
 where DetailId = @pDetailId

select @rItemId = @ItemId
```
