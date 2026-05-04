# View: `dbo.rs_SBS_VendorUserRecap_District`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RSId` | int | YES |  |  |
| 2 | `ItemCount` | int | YES |  |  |
| 3 | `AwardId` | int | YES |  |  |
| 4 | `GrossTotal` | money | YES |  |  |
| 5 | `DiscountTotal` | decimal(38,13) | YES |  |  |
| 6 | `NetTotal` | decimal(38,13) | YES |  |  |
| 7 | `Attention` | varchar(50) | YES |  |  |
| 8 | `AccountCode` | varchar(50) | YES |  |  |
| 9 | `CategoryCode` | char(1) | YES |  |  |
| 10 | `CategoryName` | varchar(50) | YES |  |  |
| 11 | `DistrictCode` | varchar(4) | YES |  |  |
| 12 | `DistrictName` | varchar(50) | YES |  |  |
| 13 | `UseGrossPrices` | tinyint | YES |  |  |
| 14 | `SchoolId` | int | NO |  |  |
| 15 | `SchoolName` | varchar(50) | YES |  |  |
| 16 | `BudgetName` | varchar(30) | YES |  |  |
| 17 | `CometId` | int | YES |  |  |
| 18 | `CategoryId` | int | NO |  |  |
| 19 | `VendorId` | int | NO |  |  |
| 20 | `VendorCode` | varchar(16) | YES |  |  |
| 21 | `VendorName` | varchar(50) | YES |  |  |
| 22 | `VendorPhone` | varchar(20) | YES |  |  |
| 23 | `BidStartDate` | datetime | YES |  |  |
| 24 | `BidEndDate` | datetime | YES |  |  |
| 25 | `VendorBidNumber` | varchar(50) | YES |  |  |
| 26 | `AwardDescription` | varchar(511) | YES |  |  |
| 27 | `DistrictId` | int | NO |  |  |
| 28 | `DiscountRate` | decimal(9,5) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Awards` | USER_TABLE |
| `BidHeaders` | USER_TABLE |
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
-- Added DistrictId to Select (for use by where clause from calling procedure)
-- Removed DiscountRate from Groupby and Select

create   view  [dbo].[rs_SBS_VendorUserRecap_District] as
--select ReportSessionLinks.RSId, count(Detail.DetailId) ItemCount, case isnull(Detail.UseGrossPrices,0) when 0 then 0 else Detail.DiscountRate end DiscountRate, Awards.AwardId, sum(isnull(Detail.Quantity,0) * isnull(case isnull(Detail.UseGrossPrices,0) when 0 then Detail.BidPrice else Detail.GrossPrice end,0)) GrossTotal, case isnull(Detail.UseGrossPrices,0) when 0 then 0 else sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0) * isnull(Detail.DiscountRate / 100,0)) end DiscountTotal, case isnull(Detail.UseGrossPrices,0) when 0 then sum(isnull(Detail.Quantity,0) * isnull(Detail.BidPrice,0)) else sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0)) - (sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0) * isnull(Detail.DiscountRate / 100,0))) end NetTotal, Requisitions.Attention, Requisitions.AccountCode, char(Category.EDSId) CategoryCode, Category.Name CategoryName, District.DistrictCode, District.Name DistrictName, Detail.UseGrossPrices, School.SchoolId, School.Name SchoolName, Budgets.Name BudgetName, Users.CometId, Category.CategoryId, Vendors.VendorId, Vendors.Code VendorCode, Vendors.Name VendorName, Vendors.Phone VendorPhone, Awards.BidStartDate, Awards.BidEndDate, Awards.VendorBidNumber, Awards.Description AwardDescription, District.DistrictId
select ReportSessionLinks.RSId, count(Detail.DetailId) ItemCount, Awards.AwardId, sum(isnull(Detail.Quantity,0) * isnull(case isnull(Detail.UseGrossPrices,0) when 0 then Detail.BidPrice else Detail.GrossPrice end,0)) GrossTotal, case isnull(Detail.UseGrossPrices,0) when 0 then 0 else sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0) * isnull(Detail.DiscountRate / 100,0)) end DiscountTotal, case isnull(Detail.UseGrossPrices,0) when 0 then sum(isnull(Detail.Quantity,0) * isnull(Detail.BidPrice,0)) else sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0)) - (sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0) * isnull(Detail.DiscountRate / 100,0))) end NetTotal, Requisitions.Attention, Requisitions.AccountCode, char(Category.EDSId) CategoryCode, case isnull(rtrim(DistrictCategories.Title),'') when '' then Category.Name else DistrictCategories.Title end CategoryName, District.DistrictCode, District.Name DistrictName, Detail.UseGrossPrices, School.SchoolId, School.Name SchoolName, Budgets.Name BudgetName, Users.CometId, Category.CategoryId, Vendors.VendorId, Vendors.Code VendorCode, Vendors.Name VendorName, Vendors.Phone VendorPhone, BidHeaders.EffectiveFrom BidStartDate, BidHeaders.EffectiveUntil BidEndDate, Awards.VendorBidNumber, Awards.Description AwardDescription, District.DistrictId, max(isnull(Detail.DiscountRate,0)) DiscountRate
from ReportSessionLinks 
join Requisitions on Requisitions.RequisitionId = ReportSessionLinks.IntId 
join Detail on Detail.RequisitionId = Requisitions.RequisitionId 
join Users on Users.UserId = Requisitions.UserId 
join School on School.SchoolId = Requisitions.SchoolId 
join District on District.DistrictId = School.DistrictId 
join Budgets on Budgets.BudgetId = Requisitions.BudgetId 
join Category on Category.CategoryId = Requisitions.CategoryId 
join Vendors on Vendors.VendorId = isnull(Detail.VendorId,7691) 
left outer join BidHeaders on BidHeaders.BidHeaderId = case ISNULL(Detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end
left outer join Awards on Awards.AwardId = Detail.AwardId 
left outer join DistrictCategories on DistrictCategories.DistrictId = District.DistrictId
                                  and DistrictCategories.CategoryId = Category.CategoryId
--where ReportSessionLinks.RSId = {RSId} and District.DistrictId = {DistrictId} and Category.CategoryId = {CategoryId} 
--group by ReportSessionLinks.RSId, Category.CategoryId, Category.Name, Category.EDSId, Detail.DiscountRate, Awards.AwardId, District.DistrictId, District.DistrictCode, District.Name, Detail.UseGrossPrices, School.SchoolId, School.Name, Budgets.Name, Users.CometId, Requisitions.Attention, Requisitions.AccountCode, Vendors.VendorId, Vendors.Code, Vendors.Name, Vendors.Phone, Awards.BidStartDate, Awards.BidEndDate, Awards.VendorBidNumber, Awards.Description 
group by ReportSessionLinks.RSId, Category.CategoryId, case isnull(rtrim(DistrictCategories.Title),'') when '' then Category.Name else DistrictCategories.Title end, Category.EDSId, Awards.AwardId, District.DistrictId, District.DistrictCode, District.Name, Detail.UseGrossPrices, School.SchoolId, School.Name, Budgets.Name, Users.CometId, Requisitions.Attention, Requisitions.AccountCode, Vendors.VendorId, Vendors.Code, Vendors.Name, Vendors.Phone, BidHeaders.EffectiveFrom, BidHeaders.EffectiveUntil, Awards.VendorBidNumber, Awards.Description/*, ISNULL(Detail.DiscountRate,0)*/
--order by Category.Name, District.Name, Vendors.Code, Users.CometId, Requisitions.Attention, Requisitions.AccountCode
```
