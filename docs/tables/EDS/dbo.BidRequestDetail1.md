# View: `dbo.BidRequestDetail1`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `BidRequestItemId` | int | NO |  |  |
| 3 | `Active` | tinyint | YES |  |  |
| 4 | `CategoryId` | int | YES |  |  |
| 5 | `DistrictId` | int | YES |  |  |
| 6 | `RequisitionCount` | int | YES |  |  |
| 7 | `ItemId` | int | NO |  |  |
| 8 | `ItemCode` | varchar(50) | YES |  |  |
| 9 | `ItemDescription` | varchar(512) | YES |  |  |
| 10 | `UnitCode` | varchar(20) | YES |  |  |
| 11 | `CrossReferencesText` | varchar(1024) | YES |  |  |
| 12 | `BidRequest` | int | YES |  |  |
| 13 | `BrandName` | varchar(50) | YES |  |  |
| 14 | `ManufacturorNumber` | varchar(50) | YES |  |  |
| 15 | `VendorName` | varchar(50) | YES |  |  |
| 16 | `VendorPartNumber` | varchar(50) | YES |  |  |
| 17 | `Keyword` | varchar(50) | YES |  |  |
| 18 | `Title` | varchar(255) | YES |  |  |
| 19 | `ExtraDetail` | varchar(1153) | NO |  |  |
| 20 | `ItemsPerUnit` | varchar(50) | YES |  |  |
| 21 | `SortSeq` | varchar(64) | YES |  |  |
| 22 | `Status` | varchar(50) | YES |  |  |
| 23 | `Comments` | varchar(1024) | YES |  |  |
| 24 | `FullDescription` | varchar(1024) | YES |  |  |
| 25 | `DistrictName` | varchar(50) | YES |  |  |
| 26 | `CategoryType` | int | YES |  |  |
| 27 | `Weight` | real | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `vw_BidDescriptions` | VIEW |
| `vw_ItemDescription` | VIEW |
| [`dbo.BidHeaders`](dbo.BidHeaders.md) | USER_TABLE |
| [`dbo.BidRequestItems`](dbo.BidRequestItems.md) | USER_TABLE |
| [`dbo.Category`](dbo.Category.md) | USER_TABLE |
| [`dbo.District`](dbo.District.md) | USER_TABLE |
| [`dbo.Headings`](dbo.Headings.md) | USER_TABLE |
| [`dbo.Items`](dbo.Items.md) | USER_TABLE |
| [`dbo.Keywords`](dbo.Keywords.md) | USER_TABLE |
| [`dbo.PricePlans`](dbo.PricePlans.md) | USER_TABLE |
| `dbo.uf_CrossRefs2Text` | SQL_SCALAR_FUNCTION |
| [`dbo.Units`](dbo.Units.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
--select * from BidRequestDetail where BidHeaderId = 1988 -- 4011
--select * from BidREquestDetail where BidHeaderId = 2207 -- 218
--select BidRequestItemId from BidRequestDetail where BidHeaderId = 1478
CREATE     view [dbo].[BidRequestDetail1]
  as
select BidHeaders.BidHeaderId, BidRequestItems.BidRequestItemId, BidRequestItems.Active,
       BidHeaders.CategoryId, Items.DistrictId, BidRequestItems.RequisitionCount,
       Items.ItemId, Items.ItemCode, Items.Description ItemDescription,
       Units.Code UnitCode, dbo.uf_CrossRefs2Text(Items.ItemId) CrossReferencesText,
       BidRequestItems.BidRequest, Items.BrandName, Items.ManufacturorNumber,
       Vendors.Name VendorName, Items.VendorPartNumber, Keywords.Keyword, Headings.Title,
       case isnull(vw_BidDescriptions.ExtraDescription,'') 
         when '' then ''
         else
           case isnull(Category.ExtraTitle,'') 
             when '' then 'Extra Information: '  
             else isnull(Category.ExtraTitle,'')  
           end + ' ' + isnull(vw_BidDescriptions.ExtraDescription,'') 
       end as ExtraDetail,   -- ****** changed to fix problem of intermitant extra detail Not showing
       Items.ItemsPerUnit, Items.SortSeq, BidRequestItems.Status, 
       BidRequestItems.Comments, 
/* Below Added to Fix Intermitant problem of Extra Info not showing */
       isnull(vw_BidDescriptions.ItemDescription, vw_ItemDescription.Itemdescription) FullDescription,
/* Above Added to Fix Intermitant problem of Extra Info not showing */
       District.Name DistrictName, Category.Type CategoryType,
       convert(real, RequisitionCount) * convert(real, RequisitionCount) * convert(real, BidRequest) Weight  -- Added 11/26/07 kjm
  from dbo.BidRequestItems with (nolock)
  join dbo.BidHeaders on BidHeaders.BidHeaderId = BidRequestItems.BidHeaderId
  join dbo.Category on Category.CategoryId = BidHeaders.CategoryId
  join dbo.PricePlans on PricePlans.PricePlanId = BidHeaders.PricePlanId
  join dbo.Items on Items.ItemId = BidRequestItems.ItemId
  join dbo.Units on Units.UnitId = Items.UnitId
/* Below Added to Fix Intermitant problem of Extra Info not showing */
  join vw_ItemDescription on vw_Itemdescription.ItemId = Items.ItemId
  left outer join vw_BidDescriptions on vw_bidDescriptions.BidHeaderId = BidHeaders.BidHeaderId
                                    and vw_BidDescriptions.BidRequestItemId = BidRequestItems.BidRequestItemId
/* Above Added to Fix Intermitant problem of Extra Info not showing */
  left outer join dbo.Vendors on Vendors.VendorId = Items.VendorId
  left outer join dbo.Headings on Headings.HeadingId = Items.HeadingId
  left outer join dbo.Keywords Keywords on Keywords.KeywordId = Items.KeywordId
  left outer join dbo.District on District.DistrictId = Items.DistrictId
```
