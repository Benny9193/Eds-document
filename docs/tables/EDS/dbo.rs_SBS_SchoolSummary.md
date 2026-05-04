# View: `dbo.rs_SBS_SchoolSummary`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RSId` | int | YES |  |  |
| 2 | `CategoryCode` | varchar(16) | YES |  |  |
| 3 | `CategoryName` | varchar(50) | YES |  |  |
| 4 | `CategoryId` | int | NO |  |  |
| 5 | `Attention` | varchar(50) | YES |  |  |
| 6 | `AccountCode` | varchar(50) | NO |  |  |
| 7 | `DistrictId` | int | NO |  |  |
| 8 | `DistrictCode` | varchar(4) | YES |  |  |
| 9 | `DistrictName` | varchar(50) | YES |  |  |
| 10 | `SchoolId` | int | NO |  |  |
| 11 | `SchoolName` | varchar(50) | YES |  |  |
| 12 | `BudgetName` | varchar(30) | YES |  |  |
| 13 | `CometId` | int | YES |  |  |
| 14 | `UserId` | int | NO |  |  |
| 15 | `RequisitionId` | int | NO |  |  |

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
-- Note: this was copied from the EDSIQ file SchoolSummary.xml 
--           for report consistency, it should be modified to use this view

create   view  [dbo].[rs_SBS_SchoolSummary] as
select ReportSessionLinks.RSId, Category.Code CategoryCode, case isnull(rtrim(DistrictCategories.Title),'') when '' then Category.Name else DistrictCategories.Title end CategoryName, Category.CategoryId,
       Requisitions.Attention, isnull(Requisitions.AccountCode,'') AccountCode,
       District.DistrictId, District.DistrictCode, District.Name DistrictName, 
       School.SchoolId, School.Name SchoolName, Budgets.Name BudgetName, 
       Users.CometId, Users.UserId, Requisitions.RequisitionId
  from ReportSessionLinks 
  join Requisitions on Requisitions.RequisitionId = ReportSessionLinks.IntId
  join Users on Users.UserId = Requisitions.UserId
  join School on School.SchoolId = Requisitions.SchoolId
  join District on District.DistrictId = School.DistrictId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join Category on Category.CategoryId = Requisitions.CategoryId
  left outer join DistrictCategories on DistrictCategories.DistrictId = District.DistrictId
                                    and DistrictCategories.CategoryId = Category.CategoryId
```
