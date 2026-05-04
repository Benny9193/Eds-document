# View: `dbo.vw_CatalogRefsItemTest`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `ItemId` | int | NO |  |  |
| 3 | `CatalogRefs` | nvarchar(max) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Items` | USER_TABLE |
| [`dbo.BidHeaders`](dbo.BidHeaders.md) | USER_TABLE |
| [`dbo.BidItems`](dbo.BidItems.md) | USER_TABLE |
| [`dbo.Bids`](dbo.Bids.md) | USER_TABLE |
| [`dbo.BidsCatalogList`](dbo.BidsCatalogList.md) | USER_TABLE |
| [`dbo.Catalog`](dbo.Catalog.md) | USER_TABLE |
| [`dbo.Category`](dbo.Category.md) | USER_TABLE |
| [`dbo.CrossRefs`](dbo.CrossRefs.md) | USER_TABLE |
| [`dbo.Items`](dbo.Items.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_CatalogRefsItemTest] as
select ss.BidHeaderId, ss.ItemId, (select '<Catalogs>' + isnull((select ItemId
                                    from Items i with (nolock)
                                   where i.ItemId = ss.ItemId
                                   for xml path('')),'') + 
                          isnull((select cast(ct.CatalogId as varchar) [CatalogId], 
	                                     ct.Name as [CatalogName], 
	                                     ss.CatalogPage as [CatPage], 
	                                     cast(ct.pdfAvailable as varchar) [PDFAvail], 
	                                     isnull(ss.searchCode,'') [searchCode]
	                                from dbo.Catalog ct
	                               where ct.CatalogId = ss.CatalogId
	                                for xml path('Catalog')),'') + '</Catalogs>') CatalogRefs
                                  
  from (
select BidHeaders.BidHeaderId, Items.ItemId, CrossRefs.CatalogId, CrossRefs.CrossRefId, CrossRefs.VendorItemCode searchCode, CrossRefs.Page CatalogPage
  from dbo.Items 
  join dbo.Category on Category.CategoryId = Items.CategoryId
  join dbo.BidHeaders on BidHeaders.CategoryId = Category.CategoryId
  join dbo.Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
               and Bids.Active = 1
  join dbo.BidItems on BidItems.BidId = Bids.BidId
                   and BidItems.ItemId = Items.ItemId
  join dbo.CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
 group by BidHeaders.BidHeaderId, Items.ItemId, CrossRefs.CatalogId, CrossRefs.CrossRefId, CrossRefs.VendorItemCode, CrossRefs.Page
union
select BidHeaders.BidHeaderId, Items.ItemId, cxr.CatalogId, null CrossRefId, cxr.VendorItemCode SearchCode, cxr.Page CatalogPage
  from dbo.Items 
  join dbo.Category on Category.CategoryId = Items.CategoryId
  join dbo.BidHeaders on BidHeaders.CategoryId = Category.CategoryId
  join dbo.Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
               and Bids.Active = 1
  join dbo.BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
  join dbo.Catalog on Catalog.CatalogId = BidsCatalogList.CatalogId
  join dbo.CrossRefs as cxr on cxr.CrossRefId = 
    (select Top 1 CrossRefs.CrossRefId
       from dbo.CrossRefs with (nolock)
       join dbo.Catalog as cat on cat.CatalogId = CrossRefs.CatalogId
       join dbo.Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
                    and Bids.Active = 1
       join dbo.BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
                               and BidsCatalogList.CatalogId = Cat.CatalogId
      where CrossRefs.ItemId = Items.ItemId
        and CrossRefs.Active = 1
      order by Catalog.CatalogYear desc, CrossRefs.CatalogPrice, CrossRefs.CrossRefId)
 group by BidHeaders.BidHeaderId, Items.ItemId, cxr.CatalogId, cxr.VendorItemCode, cxr.Page
union
select null BidHeaderId, Items.ItemId, cxr.CatalogId, null CrossRefId, cxr.VendorItemCode searchCode, cxr.Page CatalogPage
  from dbo.Items 
  join dbo.Category on Category.CategoryId = Items.CategoryId
  join dbo.Catalog on Catalog.CategoryId = Category.CategoryId
  join dbo.CrossRefs as cxr on cxr.CrossRefId = 
    (select Top 1 CrossRefs.CrossRefId
       from dbo.CrossRefs with (nolock)
      where CrossRefs.ItemId = Items.ItemId
        and CrossRefs.Active = 1
      order by Catalog.CatalogYear desc, CrossRefs.CatalogPrice, CrossRefs.CrossRefId)
 group by Items.ItemId, cxr.CatalogId, cxr.VendorItemCode, cxr.Page
union
select BidHeaders.BidHeaderId, Items.ItemId, xr.CatalogId, null CrossRefId, xr.VendorItemCode, xr.Page CatalogPage
  from dbo.Items 
  join dbo.Category on Category.CategoryId = Items.CategoryId
  join dbo.BidHeaders on BidHeaders.CategoryId = Category.CategoryId
  join dbo.Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
               and Bids.Active = 1
  join dbo.BidItems on BidItems.BidId = Bids.BidId
                   and BidItems.ItemId = Items.ItemId
  join dbo.Bids b on b.BidHeaderId = BidHeaders.BidHeaderId
  join dbo.BidsCatalogList on BidsCatalogList.BidId = b.BidId
  join dbo.CrossRefs xr on xr.CatalogId = BidsCatalogList.CatalogId
                       and xr.CrossRefId = 
    (select Top 1 CrossRefs.CrossRefId
       from dbo.CrossRefs with (nolock)
       join dbo.Catalog as cat on cat.CatalogId = CrossRefs.CatalogId
       join dbo.Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
                    and Bids.Active = 1
       join dbo.BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
                               and BidsCatalogList.CatalogId = Cat.CatalogId
      where CrossRefs.ItemId = Items.ItemId
        and CrossRefs.Active = 1
      order by cat.CatalogYear desc, CrossRefs.CatalogPrice, CrossRefs.CrossRefId)
  left outer join dbo.CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
 where CrossRefs.CrossRefId is null
 group by BidHeaders.BidHeaderId, Items.ItemId, xr.CatalogId, xr.VendorItemCode, xr.Page
) ss
```
