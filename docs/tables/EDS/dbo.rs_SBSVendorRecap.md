# View: `dbo.rs_SBSVendorRecap`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RSId` | int | YES |  |  |
| 2 | `Attention` | varchar(50) | YES |  |  |
| 3 | `CometId` | int | YES |  |  |
| 4 | `ItemCount` | int | YES |  |  |
| 5 | `GrossTotal` | money | YES |  |  |
| 6 | `DiscountTotal` | decimal(38,13) | YES |  |  |
| 7 | `NetTotal` | decimal(38,13) | YES |  |  |
| 8 | `DiscountRate` | varchar(16) | YES |  |  |
| 9 | `CategoryName` | varchar(50) | YES |  |  |
| 10 | `CategoryCode` | varchar(16) | YES |  |  |
| 11 | `BudgetName` | varchar(30) | YES |  |  |
| 12 | `DistrictCode` | varchar(4) | YES |  |  |
| 13 | `DistrictName` | varchar(50) | YES |  |  |
| 14 | `UseGrossPrices` | tinyint | YES |  |  |
| 15 | `SchoolName` | varchar(50) | YES |  |  |
| 16 | `VendorCode` | varchar(16) | YES |  |  |
| 17 | `VendorName` | varchar(50) | YES |  |  |
| 18 | `CategoryId` | int | NO |  |  |
| 19 | `UserId` | int | NO |  |  |
| 20 | `AccountCode` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
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
create   view  [dbo].[rs_SBSVendorRecap] as
select ReportSessionLinks.RSId,
Requisitions.Attention,
Users.CometId,
count(Detail.DetailId) ItemCount, 
sum(isnull(Detail.Quantity,0) * isnull(case isnull(Detail.UseGrossPrices,0) when 0 then Detail.BidPrice else Detail.GrossPrice end,0)) GrossTotal, 
case isnull(Detail.UseGrossPrices,0) when 0 then 0 else sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0) * isnull(Detail.DiscountRate / 100,0)) end DiscountTotal, 
case isnull(Detail.UseGrossPrices,0) when 0 then sum(isnull(Detail.Quantity,0) * isnull(Detail.BidPrice,0)) else sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0)) - (sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0) * isnull(Detail.DiscountRate / 100,0))) end NetTotal,
max(convert(varchar(16),convert(decimal(9,3),isnull(case isnull(Detail.UseGrossPrices,0) when 0 then 0 else Detail.DiscountRate end,0)))) DiscountRate, 
case isnull(rtrim(DistrictCategories.Title),'') when '' then Category.Name else DistrictCategories.Title end CategoryName, Category.Code CategoryCode, 
Budgets.Name BudgetName, 
District.DistrictCode, District.Name DistrictName, Detail.UseGrossPrices,
School.Name SchoolName,
Vendors.Code VendorCode, Vendors.Name VendorName,
Category.CategoryId,
Users.UserId, 
Requisitions.AccountCode
from ReportSessionLinks with (nolock)
join Requisitions on Requisitions.RequisitionId = ReportSessionLinks.IntId
join Detail on Detail.RequisitionId = Requisitions.RequisitionId
join Users on Users.UserId = Requisitions.UserId
join School on School.SchoolId = Requisitions.SchoolId
join District on District.DistrictId = School.DistrictId
join Budgets on Budgets.BudgetId = Requisitions.BudgetId
join Category on Category.CategoryId = Requisitions.CategoryId
join Vendors on Vendors.VendorId = isnull(Detail.VendorId,7691)
join BidHeaders on BidHeaders.BidHeaderId = case isnull(Detail.BidHeaderId,0) when 0 then isnull(Requisitions.BidHeaderId,0) else Detail.BidHeaderId end
left outer join DistrictCategories on DistrictCategories.DistrictId = District.DistrictId
                                  and DistrictCategories.CategoryId = Category.CategoryId
where isnull(BidHeaders.BidType,2) = 1
group by ReportSessionLinks.RSId, Requisitions.Attention, Category.CategoryId, case isnull(rtrim(DistrictCategories.Title),'') when '' then Category.Name else DistrictCategories.Title end, Category.Code, District.DistrictId, District.DistrictCode, District.Name, Detail.UseGrossPrices, School.SchoolId, School.Name, Budgets.Name, Users.CometId, Vendors.Code, Vendors.Name, /*Detail.DiscountRate, */Users.UserId, Requisitions.AccountCode
--order by Category.Name, District.Name, School.Name, Users.CometId, Vendors.Code, Detail.DiscountRate
```
