# View: `dbo.vw_BidAncillaryBySession`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  |  |
| 2 | `CategoryName` | varchar(1077) | YES |  |  |
| 3 | `BidDate` | datetime | YES |  |  |
| 4 | `BidAwardDate` | datetime | YES |  |  |
| 5 | `EffectiveFrom` | datetime | YES |  |  |
| 6 | `EffectiveUntil` | datetime | YES |  |  |
| 7 | `BidHeaderId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictPP` | USER_TABLE |
| `PricePlans` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `States` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_BidAncillaryBySession] as
select SessionTable.SessionId, 
       Category.Name +
       case isnull(Category.AppendBidMessage,0)
         when 0 then ''
         else ' - ' + isnull(BidHeaders.BidMessage,'')
       end CategoryName, 
       BidHeaders.BidDate, BidHeaders.BidAwardDate, 
       BidHeaders.EffectiveFrom, BidHeaders.EffectiveUntil, 
       BidHeaders.BidHeaderId
  from SessionTable with (nolock)
  join Budgets on Budgets.BudgetId = SessionTable.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
  join States on States.code = District.State
  join BidHeaders on BidHeaders.StateId = States.StateId
                 and BidHeaders.Active = 1
                 and GETDATE() between case when SessionTable.ApprovalLevel > 5 then DATEADD(MONTH,-2,BidHeaders.EffectiveFrom) else BidHeaders.EffectiveFrom End and BidHeaders.EffectiveUntil
  join Category on Category.CategoryId = BidHeaders.CategoryId
               and Category.Type in (3,4)
               and Category.Grouping = 'Ancillary'
  join PricePlans on PricePlans.PricePlanId = BidHeaders.PricePlanId
  join DistrictPP on DistrictPP.DistrictId = District.DistrictId
                 and DistrictPP.PricePlanId = PricePlans.PricePlanId
 where exists(select Bids.BidId
                from Bids with (nolock)
               where Bids.BidHeaderId = BidHeaders.BidHeaderId
                 and Bids.Active = 1
                 and Bids.VendorId not in ( 7691, 7692 ))
```
