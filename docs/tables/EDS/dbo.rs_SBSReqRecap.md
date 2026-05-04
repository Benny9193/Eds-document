# View: `dbo.rs_SBSReqRecap`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RSId` | int | YES |  |  |
| 2 | `Attention` | varchar(50) | YES |  |  |
| 3 | `AccountCode` | varchar(50) | NO |  |  |
| 4 | `CategoryId` | int | NO |  |  |
| 5 | `CategoryName` | varchar(50) | YES |  |  |
| 6 | `CategoryCode` | varchar(16) | YES |  |  |
| 7 | `BudgetName` | varchar(30) | YES |  |  |
| 8 | `DistrictId` | int | NO |  |  |
| 9 | `DistrictCode` | varchar(4) | YES |  |  |
| 10 | `DistrictName` | varchar(50) | YES |  |  |
| 11 | `SchoolId` | int | NO |  |  |
| 12 | `SchoolName` | varchar(50) | YES |  |  |
| 13 | `UserId` | int | NO |  |  |
| 14 | `CometId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `ReportSessionLinks` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `School` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[rs_SBSReqRecap] as
select ReportSessionLinks.RSId,
Requisitions.Attention, isnull(Requisitions.AccountCode,'') AccountCode,
Category.CategoryId, case isnull(rtrim(DistrictCategories.Title),'') when '' then Category.Name else DistrictCategories.Title end CategoryName, Category.Code CategoryCode,
Budgets.Name BudgetName,
District.DistrictId, District.DistrictCode, District.Name DistrictName,
School.SchoolId, School.Name SchoolName,
Users.UserId, Users.CometId
from ReportSessionLinks with (nolock)
join Requisitions on Requisitions.RequisitionId = ReportSessionLinks.IntId
join Users on Users.UserId = Requisitions.UserId
join School on School.SchoolId = Requisitions.SchoolId
join District on District.DistrictId = School.DistrictId
join Budgets on Budgets.BudgetId = Requisitions.BudgetId
join Category on Category.CategoryId = Requisitions.CategoryId
left outer join DistrictCategories on DistrictCategories.DistrictId = District.DistrictId
                                  and DistrictCategories.CategoryId = Category.CategoryId
group by ReportSessionLinks.RSId, Category.Code, case isnull(rtrim(DistrictCategories.Title),'') when '' then Category.Name else DistrictCategories.Title end, Category.CategoryId, Requisitions.Attention, Requisitions.AccountCode, District.DistrictId, District.DistrictCode, District.Name, School.SchoolId, School.Name, Budgets.Name, Users.CometId, Users.UserId
```
