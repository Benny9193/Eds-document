# Function: table-valued: `dbo.uf_MSRPCheckManufacturerAndNumber`

_Generated on 2026-05-04T13:04:00.577Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_MSRPCheckManufacturerAndNumber` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2013-05-21 15:17:46 |
| Modified | 2013-05-21 15:17:46 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRequisitionId` | IN | int |  |
| 2 | `@pManufacturerId` | IN | int |  |
| 3 | `@pManufacturerPartNumber` | IN | varchar(50) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `BidsCatalogList` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `CategoryPP` | unresolved |  |
| `CrossRefs` | USER_TABLE |  |
| `DistrictPP` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Manufacturers` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Units` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create function dbo.uf_MSRPCheckManufacturerAndNumber(@pRequisitionId int, @pManufacturerId int, @pManufacturerPartNumber varchar(50))
returns @Items table (
CategoryId		int,
CategoryName	varchar(50),
ItemId			int,
ItemCode		varchar(50),
Description		varchar(4096),
UOM				varchar(16),
VendorId		int,
VendorName		varchar(50),
BidHeaderId		int,
BidItemId		int,
BidPrice		money)
as
begin
declare @DistrictId int,
		@ManufacturerName varchar(50)

select @ManufacturerName = Manufacturers.Name
  from Manufacturers
 where Manufacturers.ManufacturerId = @pManufacturerId
 
select @DistrictId = Budgets.DistrictId
  from Requisitions
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
 where Requisitions.REquisitionId = @pRequisitionId
 
insert @Items (CategoryId, CategoryName, ItemId, ItemCode, Description, UOM, VendorId, VendorName, BidHeaderId, BidItemId, BidPrice)
  select Category.CategoryId, Category.Name, Items.ItemId, Items.ItemCode, id.ItemDescription, Units.Code, Vendors.VendorId, Vendors.Name, BidHeaders.BidHeaderId, BidItems.BidItemId, BidItems.Price - round(BidItems.Price * Bids.BidDiscountRate / 100,2)
    from BidHeaders
    join Category on Category.CategoryId = BidHeaders.CategoryId
                 and Category.Active = 1
                 and Category.Type = 1
    join DistrictPP on DistrictPP.DistrictId = @DistrictId
                   and DistrictPP.PricePlanId = BidHeaders.PricePlanId
    join CategoryPP on CategoryPP.CategoryId = BidHeaders.CategoryId
                   and CategoryPP.PricePlanId = DistrictPP.PricePlanId
                   and CategoryPP.Active = 1
    join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
             and Bids.Active = 1
    join BidItems on BidItems.BidId = Bids.BidId
    join BidImports on BidImports.BidImportid = Bids.BidImportId
    join BidResults on BidResults.BidImportId = BidImports.BidImportId
                   and BidResults.BidResultsId = BidItems.BidResultsId
                   and BidResults.ManufacturerBid = @ManufacturerName
                   and BidResults.ManufPartNumberBid = @pManufacturerPartNumber
    join Items on Items.ItemId = BidItems.ItemId
              and Items.Active = 1
    join Units on Units.UnitId = Items.UnitId
    join Vendors on Vendors.VendorId = Bids.VendorId
                and Vendors.Active = 1
   where BidHeaders.Active = 1
     and getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
     and BidHeaders.BidType = 1
  union (
	  select Category.CategoryId, Category.Name, Items.ItemId, Items.ItemCode, id.ItemDescription, Units.Code, Vendors.VendorId, Vendors.Name, BidHeaders.BidHeaderId, null, CrossRefs.GrossPrice - round(CrossRefs.GrossPrice * BidsCatalogList.DiscountRate / 100,2)
		from BidHeaders
		join Category on Category.CategoryId = BidHeaders.CategoryId
					 and Category.Active = 1
					 and Category.Type = 1
		join DistrictPP on DistrictPP.DistrictId = @DistrictId
					   and DistrictPP.PricePlanId = BidHeaders.PricePlanId
		join CategoryPP on CategoryPP.CategoryId = BidHeaders.CategoryId
					   and CategoryPP.PricePlanId = DistrictPP.PricePlanId
					   and CategoryPP.Active = 1
		join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
				 and Bids.Active = 1
		join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
		join Catalog on Catalog.CatalogId = BidsCatalogList.CatalogId
		            and Catalog.Active = 1
		join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId
		              and Crossrefs.Active = 1
		join Items on Items.ItemId = CrossRefs.ItemId
		          and Items.Active = 1
		          and Items.BrandName = @ManufacturerName
		          and Items.ManufacturorNumber = @pManufacturerPartNumber
		join Units on Units.UnitId = Items.UnitId
		join Vendors on Vendors.VendorId = Bids.VendorId
					and Vendors.Active = 1
	   where BidHeaders.Active = 1
		 and getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
		 and BidHeaders.BidType = 1
         )
  return
end
```
