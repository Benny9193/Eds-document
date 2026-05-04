# View: `dbo.rs_SBS_VendorRecap_User`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

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
| 10 | `Attention` | varchar(50) | YES |  |  |
| 11 | `DistrictCode` | varchar(4) | YES |  |  |
| 12 | `DistrictName` | varchar(50) | YES |  |  |
| 13 | `UseGrossPrices` | tinyint | YES |  |  |
| 14 | `SchoolName` | varchar(50) | YES |  |  |
| 15 | `BudgetName` | varchar(30) | YES |  |  |
| 16 | `CometId` | int | YES |  |  |
| 17 | `RequisitionId` | int | NO |  |  |
| 18 | `DiscountRate` | decimal(9,5) | YES |  |  |

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
-- Removed DiscountRate from GroupBy and Select

create   view  [dbo].[rs_SBS_VendorRecap_User] as
--select ReportSessionLinks.RSId, Vendors.Code VendorCode, Vendors.Name VendorName, count(Detail.DetailId) ItemCount, sum(isnull(Detail.Quantity,0) * isnull(case isnull(Detail.UseGrossPrices,0) when 0 then Detail.BidPrice else Detail.GrossPrice end,0)) GrossTotal, case isnull(Detail.UseGrossPrices,0) when 0 then 0 else sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0) * isnull(Detail.DiscountRate / 100,0)) end DiscountTotal, case isnull(Detail.UseGrossPrices,0) when 0 then sum(isnull(Detail.Quantity,0) * isnull(Detail.BidPrice,0)) else sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0)) - (sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0) * isnull(Detail.DiscountRate / 100,0))) end NetTotal, convert(varchar(16),convert(decimal(9,3),isnull(case isnull(Detail.UseGrossPrices,0) when 0 then 0 else Detail.DiscountRate end,0))) DiscountRate, char(Category.EDSId) CategoryCode, Category.Name CategoryName, Requisitions.Attention, District.DistrictCode, District.Name DistrictName, Detail.UseGrossPrices, School.Name SchoolName, Budgets.Name BudgetName, Users.CometId 
select ReportSessionLinks.RSId, Vendors.Code VendorCode, Vendors.Name VendorName, count(Detail.DetailId) ItemCount, sum(isnull(Detail.Quantity,0) * isnull(case isnull(Detail.UseGrossPrices,0) when 0 then Detail.BidPrice else Detail.GrossPrice end,0)) GrossTotal, case isnull(Detail.UseGrossPrices,0) when 0 then 0 else sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0) * isnull(Detail.DiscountRate / 100,0)) end DiscountTotal, case isnull(Detail.UseGrossPrices,0) when 0 then sum(isnull(Detail.Quantity,0) * isnull(Detail.BidPrice,0)) else sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0)) - (sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0) * isnull(Detail.DiscountRate / 100,0))) end NetTotal, char(Category.EDSId) CategoryCode, case isnull(rtrim(DistrictCategories.Title),'') when '' then Category.Name else DistrictCategories.Title end CategoryName, Requisitions.Attention, District.DistrictCode, District.Name DistrictName, Detail.UseGrossPrices, School.Name SchoolName, Budgets.Name BudgetName, Users.CometId, Requisitions.RequisitionId, max(ISNULL(Detail.DiscountRate,0)) DiscountRate
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
--where ReportSessionLinks.RSId = {RSId} and Requisitions.RequisitionId = {RequisitionId} /* and Users.UserId = {UserId} and Category.CategoryId = {CategoryId} and isnull(Requisitions.AccountCode,'') = '{AccountCode}' and isnull(Requisitions.Attention,'') = '{Attention}'*/ 
--group by ReportSessionLinks.RSId, Requisitions.Attention, Category.Name, Category.EDSId, District.DistrictId, District.DistrictCode, District.Name, Detail.UseGrossPrices, School.SchoolId, School.Name, Budgets.Name, Users.CometId, Vendors.Code, Vendors.Name, Detail.DiscountRate 
group by ReportSessionLinks.RSId, Requisitions.Attention, case isnull(rtrim(DistrictCategories.Title),'') when '' then Category.Name else DistrictCategories.Title end, Category.EDSId, District.DistrictId, District.DistrictCode, District.Name, Detail.UseGrossPrices, School.SchoolId, School.Name, Budgets.Name, Users.CometId, Vendors.Code, Vendors.Name/*, ISNULL(Detail.DiscountRate,0)*/, Requisitions.RequisitionId
--order by Category.Name, District.Name, School.Name, Users.CometId, Vendors.Code, Detail.DiscountRate
--order by Category.Name, District.Name, School.Name, Users.CometId, Vendors.Code     -- Use this "order by" in calling program
```
