# Procedure: `dbo.sp_AddPPCatalog`

_Generated on 2026-05-04T14:49:07.200Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_AddPPCatalog` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-10-15 02:26:56 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pPPCatalogId` | IN | int |  |
| 3 | `@pPricePlanId` | IN | int |  |
| 4 | `@pCategoryId` | IN | int |  |
| 5 | `@pCatalogId` | IN | int |  |
| 6 | `@pDiscountRate` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `PPCatalogs` | USER_TABLE |  |
| `ppcategory` | USER_TABLE |  |
| `PPCategoryView` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE      procedure sp_AddPPCatalog @pSessionId int, @pPPCatalogId int, @pPricePlanId int, @pCategoryId int, @pCatalogId int, @pDiscountRate varchar(255) AS

declare @DiscountRate money

select @DiscountRate = convert(money,@pDiscountRate)

if @pPPCatalogId = 0
begin
  insert PPCatalogs (PricePlanId, CatalogId, CategoryId, DiscountRate)
    values (@pPricePlanId, @pCatalogId, @pCategoryId, @DiscountRate)
end
else
begin
  if @pCatalogId = 0
  begin
    delete PPCatalogs
     where PPCatalogId = @pPPCatalogId
  end
  else
  begin
    Update PPCatalogs
       set DiscountRate = @DiscountRate
     where PPCatalogId = @pPPCatalogId
  end
end

insert ppcategory (categoryid, priceplanid)
select ppcv.categoryid, ppcv.priceplanid
  from PPCategoryView ppcv
  left outer join PPCategory ppc on ppc.categoryid = ppcv.categoryid
                                and ppc.priceplanid = ppcv.priceplanid
 where ppcv.priceplanid != 0
   and ppc.categoryid is null

delete ppCategory
  from PPCategory ppc
  left outer join PPCategoryView ppcv on ppcv.categoryid = ppc.categoryid
                                     and ppcv.priceplanid = ppc.priceplanid
 where ppcv.categoryid is null
```
