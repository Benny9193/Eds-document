# View: `dbo.BidRequestItemsView1Original`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidRequestItemId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `ItemId` | int | NO |  |  |
| 4 | `ItemCode` | varchar(50) | YES |  |  |
| 5 | `Description` | varchar(512) | YES |  |  |
| 6 | `UnitCode` | varchar(20) | YES |  |  |
| 7 | `BidRequest` | int | YES |  |  |
| 8 | `RequisitionCount` | int | YES |  |  |
| 9 | `Active` | tinyint | YES |  |  |
| 10 | `SortSeq` | varchar(64) | YES |  |  |
| 11 | `Heading` | varchar(308) | YES |  |  |
| 12 | `DistrictName` | varchar(50) | NO |  |  |
| 13 | `CrossRefText` | varchar(1024) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidRequestItems`](dbo.BidRequestItems.md) | USER_TABLE |
| [`dbo.District`](dbo.District.md) | USER_TABLE |
| [`dbo.Headings`](dbo.Headings.md) | USER_TABLE |
| [`dbo.Items`](dbo.Items.md) | USER_TABLE |
| [`dbo.Keywords`](dbo.Keywords.md) | USER_TABLE |
| `dbo.uf_CrossRefs2Text` | SQL_SCALAR_FUNCTION |
| [`dbo.Units`](dbo.Units.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[BidRequestItemsView1Original]  
AS
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
```
