# View: `dbo.rs_SBSDetailRecap`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RSId` | int | YES |  |  |
| 2 | `RequisitionId` | int | NO |  |  |
| 3 | `Attention` | varchar(50) | YES |  |  |
| 4 | `AccountCode` | varchar(50) | YES |  |  |
| 5 | `ItemCode` | varchar(50) | YES |  |  |
| 6 | `Quantity` | int | YES |  |  |
| 7 | `Description` | varchar(1024) | YES |  |  |
| 8 | `UnitCode` | varchar(20) | YES |  |  |
| 9 | `BidPrice` | money | YES |  |  |
| 10 | `CatalogPrice` | money | YES |  |  |
| 11 | `GrossPrice` | money | YES |  |  |
| 12 | `DiscountRate` | decimal(9,5) | NO |  |  |
| 13 | `CatalogPage` | char(4) | YES |  |  |
| 14 | `BidTotal` | money | YES |  |  |
| 15 | `VendorItemCode` | varchar(50) | YES |  |  |
| 16 | `Alternate` | varchar(1024) | YES |  |  |
| 17 | `GrossTotal` | money | YES |  |  |
| 18 | `NetTotal` | decimal(34,13) | YES |  |  |
| 19 | `VendorCode` | varchar(16) | YES |  |  |
| 20 | `VendorName` | varchar(50) | YES |  |  |
| 21 | `CategoryName` | varchar(50) | YES |  |  |
| 22 | `CategoryCode` | varchar(16) | YES |  |  |
| 23 | `BudgetName` | varchar(30) | YES |  |  |
| 24 | `DistrictId` | int | NO |  |  |
| 25 | `DistrictCode` | varchar(4) | YES |  |  |
| 26 | `DistrictName` | varchar(50) | YES |  |  |
| 27 | `SchoolId` | int | NO |  |  |
| 28 | `SchoolName` | varchar(50) | YES |  |  |
| 29 | `UserId` | int | NO |  |  |
| 30 | `CometId` | int | YES |  |  |
| 31 | `CategoryId` | int | NO |  |  |
| 32 | `SortSeq` | varchar(64) | YES |  |  |
| 33 | `BidType` | tinyint | NO |  |  |

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
| `dbo.uf_DetailDescription` | SQL_SCALAR_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[rs_SBSDetailRecap] as
select ReportSessionLinks.RSId,
Requisitions.RequisitionId, Requisitions.Attention, Requisitions.AccountCode, 
Detail.ItemCode, Detail.Quantity, dbo.uf_DetailDescription(Detail.DetailId) Description,
Detail.UnitCode, Detail.BidPrice, Detail.CatalogPrice, 
case isnull(Detail.UseGrossPrices,0) when 0 then Detail.BidPrice else Detail.GrossPrice end GrossPrice,
isnull(case isnull(Detail.UseGrossPrices,0) when 0 then 0 else Detail.DiscountRate end,0) DiscountRate,
Detail.CatalogPage, 
(Detail.Quantity * Detail.BidPrice) BidTotal,
Detail.VendorItemCode, 
case when isnull(Detail.VendorId,0) = 0 or isnull(Detail.VendorId,7691) = 7691 then '** No Bid **' else case isnull(Detail.BidItemId,0) when 0 then 'Catalog Bid Price' else Detail.Alternate end end Alternate,
(Detail.Quantity * case isnull(Detail.UseGrossPrices,0) when 0 then Detail.BidPrice else Detail.GrossPrice end) GrossTotal,
((isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0)) - (isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0) * (isnull(Detail.DiscountRate,0) / 100))) NetTotal,
Vendors.Code VendorCode, Vendors.Name VendorName,
case isnull(rtrim(DistrictCategories.Title),'') when '' then Category.Name else DistrictCategories.Title end CategoryName, Category.Code CategoryCode, 
Budgets.Name BudgetName, 
District.DistrictId, District.DistrictCode, District.Name DistrictName, 
School.SchoolId, School.Name SchoolName, 
Users.UserId, Users.CometId,
Category.CategoryId,
Detail.SortSeq, isnull(BidHeaders.BidType,1) BidType
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
```
