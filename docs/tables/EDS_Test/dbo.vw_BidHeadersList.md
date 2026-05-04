# View: `dbo.vw_BidHeadersList`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `Active` | tinyint | NO |  |  |
| 3 | `AllowTotalAward` | tinyint | NO |  |  |
| 4 | `AlertLink` | varchar(255) | NO |  |  |
| 5 | `AlertMsg` | varchar(4096) | NO |  |  |
| 6 | `AwardMsg` | varchar(1024) | NO |  |  |
| 7 | `BidAwardDate` | datetime | YES |  |  |
| 8 | `BidDate` | datetime | YES |  |  |
| 9 | `BidMessage` | varchar(1024) | NO |  |  |
| 10 | `BidType` | tinyint | NO |  |  |
| 11 | `BudgetYearOption` | tinyint | NO |  |  |
| 12 | `CalendarId` | int | NO |  |  |
| 13 | `CategoryId` | int | NO |  |  |
| 14 | `DateCreated` | datetime | YES |  |  |
| 15 | `Description` | varchar(512) | NO |  |  |
| 16 | `DistrictId` | int | NO |  |  |
| 17 | `EffectiveFrom` | datetime | YES |  |  |
| 18 | `EffectiveUntil` | datetime | YES |  |  |
| 19 | `HostDistrictId` | int | NO |  |  |
| 20 | `ParentBidHeaderId` | int | NO |  |  |
| 21 | `PricePlanId` | int | NO |  |  |
| 22 | `ScheduledReaward` | datetime | YES |  |  |
| 23 | `StateId` | int | NO |  |  |
| 24 | `TotalAwardMinimumDiscount` | decimal(9,5) | NO |  |  |
| 25 | `SectionName` | int | NO |  |  |
| 26 | `MarkAsOriginal` | int | NO |  |  |
| 27 | `PriceVarianceLevel` | decimal(9,5) | NO |  |  |
| 28 | `CategoryName` | varchar(50) | NO |  |  |
| 29 | `PricePlanDescription` | varchar(255) | NO |  |  |
| 30 | `StateName` | varchar(50) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `Category` | USER_TABLE |
| `PricePlans` | USER_TABLE |
| `States` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_BidHeadersList] as
select bh.BidHeaderId, isnull(bh.Active,0) Active, 
       isnull(bh.AllowTotalAward,0) AllowTotalAward, 
       isnull(bh.AlertLink,'') AlertLink,
       isnull(bh.AlertMsg,'') AlertMsg,
       isnull(bh.AwardMsg,'') AwardMsg,
       bh.BidAwardDate,
       bh.BidDate, 
       isnull(bh.BidMessage,'') BidMessage,
       isnull(bh.BidType,0) BidType,
       isnull(bh.BudgetYearOption,0) BudgetYearOption,
       isnull(bh.CalendarId,0) CalendarId, 
       isnull(bh.CategoryId,0) CategoryId,
       bh.DateCreated, 
       isnull(bh.Description,'') Description,
       isnull(bh.DistrictId,0) DistrictId,
       bh.EffectiveFrom, 
       bh.EffectiveUntil, 
       isnull(bh.HostDistrictId,0) HostDistrictId,
       isnull(bh.ParentBidHeaderId,0) ParentBidHeaderId,
       isnull(bh.PricePlanId,0) PricePlanId,
       bh.ScheduledReaward, 
       isnull(bh.StateId,0) StateId,
       isnull(bh.TotalAwardMinimumDiscount,0) TotalAwardMinimumDiscount,
       isnull(bh.Section,0) SectionName,
       isnull(bh.MarkAsOriginal,0) MarkAsOriginal,
       isnull(bh.PriceVarianceLevel,0) PriceVarianceLevel,
       isnull(Category.Name,'') CategoryName,
       isnull(PricePlans.Description,'') PricePlanDescription,
       isnull(States.Name,'') StateName
  from BidHeaders bh with (nolock)
  join Category on Category.CategoryId = bh.CategoryId
  join PricePlans on PricePlans.PricePlanId = bh.PricePlanId
  left outer join States on States.StateId = bh.StateId
```
