# View: `dbo.rs_SBS_AccountRecap_District`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RSId` | int | YES |  |  |
| 2 | `ItemCount` | int | YES |  |  |
| 3 | `GrossTotal` | money | YES |  |  |
| 4 | `DiscountTotal` | decimal(38,13) | YES |  |  |
| 5 | `NetTotal` | decimal(38,13) | YES |  |  |
| 6 | `AccountCode` | varchar(50) | YES |  |  |
| 7 | `CategoryCode` | char(1) | YES |  |  |
| 8 | `CategoryName` | varchar(50) | YES |  |  |
| 9 | `DistrictCode` | varchar(4) | YES |  |  |
| 10 | `DistrictName` | varchar(50) | YES |  |  |
| 11 | `UseGrossPrices` | tinyint | YES |  |  |
| 12 | `SchoolId` | int | NO |  |  |
| 13 | `SchoolName` | varchar(50) | YES |  |  |
| 14 | `BudgetName` | varchar(30) | YES |  |  |
| 15 | `CategoryId` | int | NO |  |  |
| 16 | `DistrictId` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Awards` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `Detail` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `ReportSessionLinks` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `School` | USER_TABLE |
| `Users` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
-- Note: this was copied from the EDSIQ file SchoolSummary.xml 
--           for report consistency, it should be modified to use this view
-- Added DistrictId to Select (needed in where clause by calling procedure)

create   view  [dbo].[rs_SBS_AccountRecap_District] as
select ReportSessionLinks.RSId, 
count(Detail.DetailId) ItemCount, sum(isnull(Detail.Quantity,0) * isnull(case isnull(Detail.UseGrossPrices,0) when 0 then Detail.BidPrice else Detail.GrossPrice end,0)) GrossTotal, case isnull(Detail.UseGrossPrices,0) when 0 then 0 else sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0) * isnull(Detail.DiscountRate / 100,0)) end DiscountTotal, case isnull(Detail.UseGrossPrices,0) when 0 then sum(isnull(Detail.Quantity,0) * isnull(Detail.BidPrice,0)) else sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0)) - (sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0) * isnull(Detail.DiscountRate / 100,0))) end NetTotal, Requisitions.AccountCode, char(Category.EDSId) CategoryCode, case isnull(rtrim(DistrictCategories.Title),'') when '' then Category.Name else DistrictCategories.Title end CategoryName, District.DistrictCode, District.Name DistrictName, Detail.UseGrossPrices, School.SchoolId, School.Name SchoolName, Budgets.Name BudgetName, Category.CategoryId, District.DistrictId
from ReportSessionLinks with (nolock)
join Requisitions on Requisitions.RequisitionId = ReportSessionLinks.IntId 
join Detail on Detail.RequisitionId = Requisitions.RequisitionId 
join Users on Users.UserId = Requisitions.UserId 
join School on School.SchoolId = Requisitions.SchoolId 
join District on District.DistrictId = School.DistrictId 
join Budgets on Budgets.BudgetId = Requisitions.BudgetId 
join Category on Category.CategoryId = Requisitions.CategoryId 
join Vendors on Vendors.VendorId = isnull(Detail.VendorId,7691) 
left outer join Awards on Awards.AwardId = Detail.AwardId 
left outer join DistrictCategories on DistrictCategories.DistrictId = District.DistrictId
                                  and DistrictCategories.CategoryId = Category.CategoryId
--where ReportSessionLinks.RSId = {RSId} and School.SchoolId = {SchoolId} and Category.CategoryId = {CategoryId} 
group by ReportSessionLinks.RSId, Category.CategoryId, case isnull(rtrim(DistrictCategories.Title),'') when '' then Category.Name else DistrictCategories.Title end, Category.EDSId, District.DistrictId, District.DistrictCode, District.Name, Detail.UseGrossPrices, School.SchoolId, School.Name, Budgets.Name, Requisitions.AccountCode 
--order by Category.Name, District.Name, Requisitions.AccountCode
```
