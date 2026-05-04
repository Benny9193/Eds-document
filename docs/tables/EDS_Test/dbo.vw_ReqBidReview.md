# View: `dbo.vw_ReqBidReview`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RSId` | int | YES |  |  |
| 2 | `RepName` | varchar(30) | YES |  |  |
| 3 | `DistrictName` | varchar(50) | YES |  |  |
| 4 | `SchoolName` | varchar(50) | YES |  |  |
| 5 | `ShipName` | varchar(50) | YES |  |  |
| 6 | `CometId` | int | YES |  |  |
| 7 | `CategoryName` | varchar(50) | YES |  |  |
| 8 | `BudgetName` | varchar(30) | YES |  |  |
| 9 | `BidHeaderId` | int | YES |  |  |
| 10 | `RequisitionNumber` | varchar(24) | YES |  |  |
| 11 | `Attention` | varchar(50) | YES |  |  |
| 12 | `TotalRequisitionCost` | money | YES |  |  |
| 13 | `ItemCount` | int | YES |  |  |
| 14 | `ItemCode` | varchar(50) | YES |  |  |
| 15 | `Description` | varchar(1024) | YES |  |  |
| 16 | `Quantity` | int | YES |  |  |
| 17 | `BidPrice` | money | YES |  |  |
| 18 | `UnitCode` | varchar(20) | YES |  |  |
| 19 | `ItemStatus` | varchar(65) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `CSRep` | USER_TABLE |
| `Detail` | USER_TABLE |
| `District` | USER_TABLE |
| `Items` | USER_TABLE |
| `ReportSessionLinks` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `School` | USER_TABLE |
| `ShipLocations` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_ReqBidReview] as
select rsl.RSId, CSRep.Name RepName, District.Name DistrictName, School.Name SchoolName, ShipLocations.Name ShipName, Users.CometId, 
       Category.Name CategoryName, Budgets.Name BudgetName, BidHeaders.BidHeaderId, 
       Requisitions.RequisitionNumber, Requisitions.Attention, Requisitions.TotalRequisitionCost, 
       (select count(*) from Detail d where d.RequisitionId = Requisitions.RequisitionId and d.ItemMustBeBid = 1) ItemCount,
       Detail.ItemCode, Detail.Description, Detail.Quantity, Detail.BidPrice, Detail.UnitCode,
       case
         when isnull(Items.DistrictId,0) = 0 then
           '** Global Item being Requested as Addenda - Please Change Item **'
         else ''
       end ItemStatus
  from Requisitions
  join Detail on Detail.RequisitionId = Requisitions.RequisitionId
             and Detail.ItemMustBeBid = 1
  join Items on Items.ItemId = Detail.ItemId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
  join CSRep on CSRep.CSRepId = District.CSRepId
  join School on School.SchoolId = Requisitions.SchoolId
  join ShipLocations on ShipLocations.ShippingId = Requisitions.ShippingId
  join Users on Users.UserId = Requisitions.UserId
  join Category on Category.CategoryId = Requisitions.CategoryId
  join ReportSessionLinks rsl on rsl.IntId = Requisitions.RequisitionId
  left outer join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId
```
