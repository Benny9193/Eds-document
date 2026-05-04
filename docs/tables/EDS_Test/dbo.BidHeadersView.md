# View: `dbo.BidHeadersView`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `CategoryName` | varchar(50) | YES |  |  |
| 4 | `PricePlanCode` | varchar(20) | YES |  |  |
| 5 | `PricePlanName` | varchar(255) | YES |  |  |
| 6 | `DistrictCode` | varchar(4) | YES |  |  |
| 7 | `DistrictName` | varchar(50) | YES |  |  |
| 8 | `BidDate` | datetime | YES |  |  |
| 9 | `BidAwardDate` | datetime | YES |  |  |
| 10 | `BidMessage` | varchar(1024) | YES |  |  |
| 11 | `BidReportName` | varchar(27) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidHeaders`](dbo.BidHeaders.md) | USER_TABLE |
| [`dbo.Category`](dbo.Category.md) | USER_TABLE |
| [`dbo.District`](dbo.District.md) | USER_TABLE |
| [`dbo.PricePlans`](dbo.PricePlans.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[BidHeadersView]  
AS 
select dbo.BidHeaders.BidHeaderId, dbo.BidHeaders.Active, dbo.Category.Name CategoryName,
       dbo.PricePlans.Code PricePlanCode, dbo.PricePlans.Description PricePlanName,
       dbo.District.DistrictCode, dbo.District.Name DistrictName,
       dbo.BidHeaders.BidDate, dbo.BidHeaders.BidAwardDate, dbo.BidHeaders.BidMessage,
       case Category.Type when 2 then 'Textbook Bid Sheet' else case when isnull(BidHeaders.ParentBidHeaderId,0) != 0 then 'Bid Detail Report By Vendor' when BidHeaders.CategoryId = 45 then 'Bid Detail Report By Vendor' when BidHeaders.CategoryId = 55 then 'Bid Detail Report By Vendor' else 'Bid Detail Report' end end BidReportName
  from dbo.BidHeaders with (nolock)
  join dbo.Category on dbo.Category.CategoryId = dbo.BidHeaders.CategoryId
  join dbo.PricePlans on dbo.PricePlans.PricePlanId = dbo.BidHeaders.PricePlanId
  left outer join dbo.District on dbo.District.DistrictId = dbo.BidHeaders.DistrictId
```
