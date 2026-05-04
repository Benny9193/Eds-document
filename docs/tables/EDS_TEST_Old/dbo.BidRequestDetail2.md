# View: `dbo.BidRequestDetail2`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

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
| 24 | `FullDescription` | varchar(3650) | YES |  |  |
| 25 | `DistrictName` | varchar(50) | YES |  |  |
| 26 | `CategoryType` | int | YES |  |  |
| 27 | `Weight` | real | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidHeaderDetail`](dbo.BidHeaderDetail.md) | USER_TABLE |
| [`dbo.BidHeaders`](dbo.BidHeaders.md) | USER_TABLE |
| [`dbo.BidRequestItems`](dbo.BidRequestItems.md) | USER_TABLE |
| [`dbo.Category`](dbo.Category.md) | USER_TABLE |
| [`dbo.Detail`](dbo.Detail.md) | USER_TABLE |
| [`dbo.District`](dbo.District.md) | USER_TABLE |
| [`dbo.Headings`](dbo.Headings.md) | USER_TABLE |
| [`dbo.Items`](dbo.Items.md) | USER_TABLE |
| [`dbo.Keywords`](dbo.Keywords.md) | USER_TABLE |
| [`dbo.PricePlans`](dbo.PricePlans.md) | USER_TABLE |
| [`dbo.Requisitions`](dbo.Requisitions.md) | USER_TABLE |
| `dbo.uf_CrossRefs2Text` | SQL_SCALAR_FUNCTION |
| [`dbo.Units`](dbo.Units.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |
| [`dbo.vw_DetailDescription`](dbo.vw_DetailDescription.md) | VIEW |
| [`dbo.vw_ItemDescription`](dbo.vw_ItemDescription.md) | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
--select * from BidRequestDetail2 where BidHeaderId = 2862 -- 4011
--select * from BidREquestDetail where BidHeaderId = 2207 -- 218
--select BidRequestItemId from BidRequestDetail where BidHeaderId = 1478


CREATE     view [dbo].[BidRequestDetail2]  as
select BidHeaders.BidHeaderId, BidRequestItems.BidRequestItemId, BidRequestItems.Active,
       BidHeaders.CategoryId, Items.DistrictId, BidRequestItems.RequisitionCount,
       Items.ItemId, Items.ItemCode, Items.Description ItemDescription,
       Units.Code UnitCode, dbo.uf_CrossRefs2Text(Items.ItemId) CrossReferencesText,
       BidRequestItems.BidRequest, Items.BrandName, Items.ManufacturorNumber,
       Vendors.Name VendorName, Items.VendorPartNumber, Keywords.Keyword, Headings.Title,
       case isnull(ss.ExtraDescription,'') 
         when '' then ''
         else
           case isnull(Category.ExtraTitle,'') 
             when '' then 'Extra Information: '  
             else isnull(Category.ExtraTitle,'')  
           end + ' ' + isnull(ss.ExtraDescription,'') 
       end as ExtraDetail,   -- ****** changed to fix problem of intermitant extra detail Not showing
       Items.ItemsPerUnit, Items.SortSeq, BidRequestItems.Status, 
       BidRequestItems.Comments, 
/* Below Added to Fix Intermitant problem of Extra Info not showing */
--       dbo.uf_ItemDescription(Items.ItemId) FullDescription,
--       isnull(ss.FullDescription, dbo.uf_ItemDescription(Items.ItemId)) FullDescription,
       isnull(ss.ItemDescription, vw_ItemDescription.Itemdescription) FullDescription,
/* Above Added to Fix Intermitant problem of Extra Info not showing */
       District.Name DistrictName, Category.Type CategoryType,
       convert(real, RequisitionCount) * convert(real, RequisitionCount) * convert(real, BidRequest) Weight  -- Added 11/26/07 kjm
  from dbo.BidHeaders with (nolock)
  join dbo.Category on Category.CategoryId = BidHeaders.CategoryId
  join dbo.PricePlans on PricePlans.PricePlanId = BidHeaders.PricePlanId
  join dbo.BidRequestItems on BidRequestItems.BidHeaderId = BidHeaders.BidHeaderId 
  join dbo.Items on Items.ItemId = BidRequestItems.ItemId
  join dbo.Units on Units.UnitId = Items.UnitId
/* Below Added to Fix Intermitant problem of Extra Info not showing */
  join dbo.vw_ItemDescription on vw_Itemdescription.ItemId = Items.ItemId
  left outer join (
/*    select BidHeaders.BidHeaderId, Detail.ItemId, vw_DetailDescription.ItemDescription
      from Detail
      join vw_DetailDescription on vw_DetailDescription.DetailId = Detail.DetailId
      join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
      join BidHeaders on BidHeaders.BidHeaderId = case isnull(Detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end
                     and BidHeaders.BidType = 2
      join BidRequestItems on BidRequestItems.BidHeaderId = BidHeaders.BidHeaderId
                          and BidRequestItems.ItemId = Detail.ItemId
     group by BidHeaders.BidHeaderId, Detail.ItemId, vw_DetailDescription.ItemDescription
*/

--    select BidHeaders.BidHeaderId, Detail.ItemId, dbo.uf_DetailDescription(Detail.DetailId) ItemDescription, isnull(Detail.ExtraDescription,'') ExtraDescription
    select BidHeaders.BidHeaderId, Detail.ItemId, vw_DetailDescription.ItemDescription, isnull(Detail.ExtraDescription,'') ExtraDescription
      from dbo.BidHeaders
      join dbo.BidRequestItems on BidRequestItems.BidHeaderId = BidHeaders.BidHeaderId
      join dbo.BidHeaderDetail on BidHeaderDetail.BidRequestItemId = BidRequestItems.BidRequestItemId
      join dbo.Detail on Detail.ItemId = BidRequestItems.ItemId
      join dbo.Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
      join dbo.vw_DetailDescription on vw_DetailDescription.DetailId = Detail.DetailId
     where BidHeaders.BidType = 2
       and BidHeaders.BidHeaderId = case isnull(Detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end
     group by BidHeaders.BidHeaderId, Detail.ItemId, vw_DetailDescription.ItemDescription, isnull(Detail.ExtraDescription,'')
--     group by BidHeaders.BidHeaderId, Detail.ItemId, dbo.uf_DetailDescription(Detail.DetailId), isnull(Detail.ExtraDescription,'')

        ) ss on ss.BidHeaderId = BidHeaders.BidHeaderId 
            and ss.ItemId = Items.ItemId 
/* Above Added to Fix Intermitant problem of Extra Info not showing */
  left outer join dbo.Vendors on Vendors.VendorId = Items.VendorId
  left outer join dbo.Headings on Headings.HeadingId = Items.HeadingId
  left outer join dbo.Keywords Keywords on Keywords.KeywordId = Items.KeywordId
  left outer join dbo.District on District.DistrictId = Items.DistrictId
```
