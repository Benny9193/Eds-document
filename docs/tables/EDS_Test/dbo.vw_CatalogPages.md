# View: `dbo.vw_CatalogPages`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `ItemId` | int | YES |  |  |
| 3 | `CatalogId` | int | NO |  |  |
| 4 | `Name` | varchar(50) | YES |  |  |
| 5 | `Page` | char(4) | YES |  |  |
| 6 | `PDFAvailable` | tinyint | YES |  |  |
| 7 | `VendorItemCode` | varchar(50) | YES |  |  |
| 8 | `VendorId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidItems` | USER_TABLE |
| `Bids` | USER_TABLE |
| `BidsCatalogList` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Catalog` | USER_TABLE |
| `CrossRefs` | USER_TABLE |
| `Detail` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `Requisitions` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_ReqDetail1`](dbo.vw_ReqDetail1.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_CatalogPages] as
    select Requisitions.RequisitionId, Detail.ItemId, ss.CatalogId, ss.Name, ss.Page, ss.PDFAvailable, ss.VendorItemCode, ss.VendorId
      from Requisitions with (nolock)
	  join Detail on Detail.RequisitionId = Requisitions.RequisitionId
      join Budgets on Budgets.BudgetId = Requisitions.BudgetId
      join (
		select BidHeaders.BidHeaderId, BidItems.ItemId, Catalog.CatalogId, Catalog.Name, CrossRefs.Page, Catalog.PDFAvailable, CrossRefs.PackedCode VendorItemCode, Bids.VendorId
		  from BidHeaders with (nolock)
		  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
				   and Bids.Active = 1
		  join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
		  join BidItems on BidItems.BidId = Bids.BidId
		  join Catalog on Catalog.CatalogId = BidsCatalogList.CatalogId
					  and Catalog.Active = 1
		  join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId
		                and CrossRefs.Active = 1
		                and CrossRefs.PackedCode = BidItems.PackedVendorItemCode
		union (
			select BidHeaders.BidHeaderId, CrossRefs.ItemId, Catalog.CatalogId, Catalog.Name, CrossRefs.Page, Catalog.PDFAvailable, CrossRefs.PackedCode VendorItemCode, Bids.VendorId
			  from BidHeaders with (nolock)
			  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
					   and Bids.Active = 1
			  join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
			  join Catalog on Catalog.CatalogId = BidsCatalogList.CatalogId
						  and Catalog.Active = 1
			  join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId
							and CrossRefs.Active = 1
		)
		union (
		  select cast(null as Int) BidHeaderId, CrossRefs.ItemId, Catalog.CatalogId, Catalog.Name, CrossRefs.Page, Catalog.PDFAvailable, CrossRefs.PackedCode VendorItemCode, cast(null as int) VendorId
			from Requisitions r with (nolock)
			join Detail d on d.RequisitionId = r.RequisitionId
			join Budgets b on b.BudgetId = r.BudgetId
			join DistrictCategories on DistrictCategories.DistrictId = b.DistrictId
			                       and DistrictCategories.CategoryId = r.CategoryId
       			                   and DistrictCategories.Active = 1
			                       and DistrictCategories.AllowAddenda = 1
			join Catalog on Catalog.CategoryId = DistrictCategories.CategoryId
						and Catalog.Active = 1
  		    join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId
		                  and CrossRefs.Active = 1
		                  and CrossRefs.ItemId = d.ItemId
		)
	) ss on ss.BidHeaderId = Requisitions.BidHeaderId
	    and ss.ItemId = Detail.ItemId
	where isnull(ss.VendorId,0) = case isnull(Detail.ItemMustBeBid,0) when 0 then isnull(Detail.VendorId,0) else ISNULL(ss.VendorId,0) end
	group by Requisitions.RequisitionId, Detail.ItemId, ss.CatalogId, ss.Name, ss.Page, ss.PDFAvailable, ss.VendorItemCode, ss.VendorId
```
