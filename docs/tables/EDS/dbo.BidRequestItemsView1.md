# View: `dbo.BidRequestItemsView1`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidRequestItemId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `ItemId` | int | NO |  |  |
| 4 | `ItemCode` | varchar(50) | YES |  |  |
| 5 | `Description` | varchar(1665) | YES |  |  |
| 6 | `UnitCode` | varchar(20) | YES |  |  |
| 7 | `BidRequest` | int | YES |  |  |
| 8 | `RequisitionCount` | int | YES |  |  |
| 9 | `Active` | tinyint | YES |  |  |
| 10 | `SortSeq` | varchar(64) | YES |  |  |
| 11 | `Heading` | varchar(308) | YES |  |  |
| 12 | `DistrictName` | varchar(50) | YES |  |  |
| 13 | `CrossRefText` | varchar(1024) | YES |  |  |

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
create   view  [dbo].[BidRequestItemsView1]  
AS

/* original code
select dbo.BidRequestItems.BidRequestItemId, dbo.BidRequestItems.BidHeaderId,
       dbo.Items.ItemId, dbo.Items.ItemCode, dbo.Items.Description, 
       dbo.Units.Code UnitCode, dbo.BidRequestItems.BidRequest, 
       dbo.BidRequestItems.RequisitionCount, dbo.BidRequestItems.Active, dbo.Items.SortSeq,
       isnull(dbo.Headings.Title,'') + case isnull(rtrim(dbo.Keywords.Keyword),'') when '' then '' else ' - ' + rtrim(ltrim(dbo.Keywords.Keyword)) end as Heading, 
       isnull(dbo.District.Name,'') as DistrictName,
       dbo.uf_CrossRefs2Text(Items.ItemId) as CrossRefText
  from dbo.BidRequestItems with (nolock)
  join dbo.Items on dbo.Items.ItemId = dbo.BidRequestItems.ItemId
  join dbo.Units on dbo.Units.UnitId = dbo.Items.UnitId
  left outer join dbo.District on dbo.District.DistrictId = Items.DistrictId
  left outer join dbo.Headings on dbo.Headings.HeadingId = Items.HeadingId
  left outer join dbo.Keywords on dbo.Keywords.KeywordId = Items.KeywordId
*/

-- modified to mimic the view used by the desktop version: BidRequestDetail
-- may want to eliminate this view and use BidRequestDetail 
select BidRequestItems.BidRequestItemId, BidHeaders.BidHeaderId,
       Items.ItemId, Items.ItemCode, 
       -- note: the desktop version uses 2 description fields: Item.Description & ExtraDesciption
       --       internet bid uses the concatenated description of both
       Items.Description +
       case isnull(vw_BidDescriptions.ExtraDescription,'') 
         when '' then ''
         else
           case isnull(Category.ExtraTitle,'') 
             when '' then 'Extra Information: '  
             else isnull(Category.ExtraTitle,'')  
           end + ' ' + isnull(vw_BidDescriptions.ExtraDescription,'') 
       end As [Description],
       Units.Code UnitCode, BidRequestItems.BidRequest, 
       BidRequestItems.RequisitionCount, BidRequestItems.Active, Items.SortSeq, 
       -- note: the following field differs from how it is defined in BidRequestDetail (as used in the desktop version of the bid program)
       isnull(Headings.Title,'') + case isnull(rtrim(Keywords.Keyword),'') when '' then '' else ' - ' + rtrim(ltrim(Keywords.Keyword)) end as Heading, 
       District.Name as DistrictName, 
       dbo.uf_CrossRefs2Text(Items.ItemId) CrossRefText
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
