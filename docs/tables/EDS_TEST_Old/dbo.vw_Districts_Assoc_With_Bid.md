# View: `dbo.vw_Districts_Assoc_With_Bid`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `DistrictId` | int | NO |  |  |
| 3 | `Name` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaderDetail` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Detail` | USER_TABLE |
| `District` | USER_TABLE |
| `Requisitions` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_RptMarkedReadyEmailBlastStats`](dbo.vw_RptMarkedReadyEmailBlastStats.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_Districts_Assoc_With_Bid] as
select BHD.BidHeaderId, District.DistrictId, District.Name
from BidHeaderDetail BHD
join Detail ON Detail.DetailId = BHD.DetailId
Join Requisitions Req ON Req.RequisitionId=Detail.RequisitionId
Join Budgets ON Budgets.BudgetId=Req.BudgetId
Join District ON District.DistrictId=Budgets.DistrictId
Where Req.Active=1 
--      and BHD.BidHeaderId = 6990
Group By BHD.BidHeaderId, District.DistrictId, District.Name
```
