# View: `dbo.vw_AvailableReqBids`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `HeaderText` | varchar(305) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `DistrictPP` | USER_TABLE |
| `PPCategory` | USER_TABLE |
| `PricePlans` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_AvailableReqBids] as
SELECT distinct Requisitions.RequisitionId, BidHeaders.BidHeaderId, convert(varchar(16),BidHeaders.BidHeaderId) + '-' + convert(varchar(32),BidHeaders.BidAwardDate,101) + ' ' + isnull(PricePlans.Description,'') HeaderText
FROM Requisitions
join Budgets on Budgets.BudgetId = Requisitions.BudgetId
join DistrictPP on DistrictPP.DistrictId = Budgets.DistrictId
join PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId
               and PPCategory.CategoryId = Requisitions.CategoryId
join Category on Category.CategoryId = PPCategory.CategoryId
join DistrictCategories on DistrictCategories.DistrictId = Budgets.DistrictId
                       and DistrictCategories.CategoryId = Requisitions.CategoryId
                       and DistrictCategories.Active = 1
join Users on Users.UserId = Requisitions.UserId
join BidHeaders on BidHeaders.PricePlanId = PPCategory.PricePlanId
               and BidHeaders.CategoryId = Requisitions.CategoryId
               and getdate() between case when (isnull(Users.AllowEarlyAccess,0) = 1 or isnull(Users.ApprovalLevel,0) > 1) and isnull(DistrictCategories.EarlyAccess,0) = 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else Budgets.VisibleFrom end and Budgets.VisibleUntil
               and getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
               and BidHeaders.Active = 1
               and isnull(BidHeaders.DistrictId,0) = case isnull(Category.Type,1) when 2 then DistrictPP.DistrictId else isnull(BidHeaders.DistrictId,0) end
join PricePlans on PricePlans.PricePlanId = BidHeaders.PricePlanId
join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
         and Bids.Active = 1
```
