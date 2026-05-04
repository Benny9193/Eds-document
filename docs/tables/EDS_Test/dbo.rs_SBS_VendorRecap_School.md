# View: `dbo.rs_SBS_VendorRecap_School`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RSId` | int | YES |  |  |
| 2 | `VendorCode` | varchar(16) | YES |  |  |
| 3 | `VendorName` | varchar(50) | YES |  |  |
| 4 | `ItemCount` | int | YES |  |  |
| 5 | `GrossTotal` | money | YES |  |  |
| 6 | `DiscountTotal` | decimal(38,13) | YES |  |  |
| 7 | `NetTotal` | decimal(38,13) | YES |  |  |
| 8 | `CategoryCode` | char(1) | YES |  |  |
| 9 | `CategoryName` | varchar(50) | YES |  |  |
| 10 | `DistrictCode` | varchar(4) | YES |  |  |
| 11 | `DistrictName` | varchar(50) | YES |  |  |
| 12 | `UseGrossPrices` | tinyint | YES |  |  |
| 13 | `SchoolName` | varchar(50) | YES |  |  |
| 14 | `BudgetName` | varchar(30) | YES |  |  |
| 15 | `SchoolId` | int | NO |  |  |
| 16 | `CategoryId` | int | NO |  |  |
| 17 | `DiscountRate` | decimal(9,5) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
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
-- Added to Select: SchoolId and CategoryId (for where clause from calling procedure)
-- Added to Group by: CategoryId     
-- Removed DiscountRate from GroupBy and Select

create   view  [dbo].[rs_SBS_VendorRecap_School] as
--select ReportSessionLinks.RSId, Vendors.Code VendorCode, Vendors.Name VendorName, count(Detail.DetailId) ItemCount, sum(isnull(Detail.Quantity,0) * isnull(case isnull(Detail.UseGrossPrices,0) when 0 then Detail.BidPrice else Detail.GrossPrice end,0)) GrossTotal, case isnull(Detail.UseGrossPrices,0) when 0 then 0 else sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0) * isnull(Detail.DiscountRate / 100,0)) end DiscountTotal, case isnull(Detail.UseGrossPrices,0) when 0 then sum(isnull(Detail.Quantity,0) * isnull(Detail.BidPrice,0)) else sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0)) - (sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0) * isnull(Detail.DiscountRate / 100,0))) end NetTotal, convert(varchar(16),convert(decimal(9,3),isnull(case isnull(Detail.UseGrossPrices,0) when 0 then 0 else Detail.DiscountRate end,0))) DiscountRate, char(Category.EDSId) CategoryCode, Category.Name CategoryName, District.DistrictCode, District.Name DistrictName, Detail.UseGrossPrices, School.Name SchoolName, Budgets.Name BudgetName, School.SchoolId, Category.CategoryId 
select ReportSessionLinks.RSId, Vendors.Code VendorCode, Vendors.Name VendorName, count(Detail.DetailId) ItemCount, sum(isnull(Detail.Quantity,0) * isnull(case isnull(Detail.UseGrossPrices,0) when 0 then Detail.BidPrice else Detail.GrossPrice end,0)) GrossTotal, case isnull(Detail.UseGrossPrices,0) when 0 then 0 else sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0) * isnull(Detail.DiscountRate / 100,0)) end DiscountTotal, case isnull(Detail.UseGrossPrices,0) when 0 then sum(isnull(Detail.Quantity,0) * isnull(Detail.BidPrice,0)) else sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0)) - (sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0) * isnull(Detail.DiscountRate / 100,0))) end NetTotal, char(Category.EDSId) CategoryCode, case isnull(rtrim(DistrictCategories.Title),'') when '' then Category.Name else DistrictCategories.Title end CategoryName, District.DistrictCode, District.Name DistrictName, Detail.UseGrossPrices, School.Name SchoolName, Budgets.Name BudgetName, School.SchoolId, Category.CategoryId, max(ISNULL(Detail.DiscountRate,0)) DiscountRate 
from ReportSessionLinks 
join Requisitions on Requisitions.RequisitionId = ReportSessionLinks.IntId 
join Detail on Detail.RequisitionId = Requisitions.RequisitionId 
join Users on Users.UserId = Requisitions.UserId 
join School on School.SchoolId = Requisitions.SchoolId 
join District on District.DistrictId = School.DistrictId 
join Budgets on Budgets.BudgetId = Requisitions.BudgetId 
join Category on Category.CategoryId = Requisitions.CategoryId 
join Vendors on Vendors.VendorId = isnull(Detail.VendorId,7691) 
left outer join DistrictCategories on DistrictCategories.DistrictId = District.DistrictId
                                  and DistrictCategories.CategoryId = Category.CategoryId
--where ReportSessionLinks.RSId = {RSId} and School.SchoolId = {SchoolId} and Category.CategoryId = {CategoryId}       -- Use this where clause in calling program (change variable names as appropriate)
--group by ReportSessionLinks.RSId, Category.Name, Category.EDSId, District.DistrictId, District.DistrictCode, District.Name, Detail.UseGrossPrices, School.SchoolId, School.Name, Budgets.Name, Vendors.Code, Vendors.Name, Detail.DiscountRate, Category.CategoryId 
group by ReportSessionLinks.RSId, case isnull(rtrim(DistrictCategories.Title),'') when '' then Category.Name else DistrictCategories.Title end, Category.EDSId, District.DistrictId, District.DistrictCode, District.Name, Detail.UseGrossPrices, School.SchoolId, School.Name, Budgets.Name, Vendors.Code, Vendors.Name, Category.CategoryId/*, ISNULL(Detail.DiscountRate,0)*/
--order by Category.Name, District.Name, School.Name, Vendors.Code, Detail.DiscountRate    
--order by Category.Name, District.Name, School.Name, Vendors.Code     -- Use this "order by" in calling program
```
