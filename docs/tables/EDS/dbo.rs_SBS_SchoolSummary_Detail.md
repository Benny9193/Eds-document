# View: `dbo.rs_SBS_SchoolSummary_Detail`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RSId` | int | YES |  |  |
| 2 | `ItemCode` | varchar(50) | YES |  |  |
| 3 | `Description` | varchar(2880) | YES |  |  |
| 4 | `CatalogPage` | char(4) | YES |  |  |
| 5 | `UnitCode` | varchar(20) | YES |  |  |
| 6 | `Quantity` | int | YES |  |  |
| 7 | `BidPrice` | money | YES |  |  |
| 8 | `GrossPrice` | money | YES |  |  |
| 9 | `CatalogPrice` | money | YES |  |  |
| 10 | `BidTotal` | money | YES |  |  |
| 11 | `VendorItemCode` | varchar(50) | YES |  |  |
| 12 | `Alternate` | varchar(1024) | YES |  |  |
| 13 | `DiscountRate` | int | NO |  |  |
| 14 | `GrossTotal` | money | YES |  |  |
| 15 | `NetTotal` | decimal(34,13) | YES |  |  |
| 16 | `VendorCode` | varchar(16) | YES |  |  |
| 17 | `VendorName` | varchar(50) | YES |  |  |
| 18 | `CategoryCode` | char(1) | YES |  |  |
| 19 | `CategoryName` | varchar(50) | YES |  |  |
| 20 | `RequisitionId` | int | NO |  |  |
| 21 | `Attention` | varchar(50) | YES |  |  |
| 22 | `AccountCode` | varchar(50) | YES |  |  |
| 23 | `DistrictId` | int | NO |  |  |
| 24 | `DistrictCode` | varchar(4) | YES |  |  |
| 25 | `DistrictName` | varchar(50) | YES |  |  |
| 26 | `SchoolId` | int | NO |  |  |
| 27 | `SchoolName` | varchar(50) | YES |  |  |
| 28 | `BudgetName` | varchar(30) | YES |  |  |
| 29 | `CometId` | int | YES |  |  |
| 30 | `UserId` | int | NO |  |  |
| 31 | `SortSeq` | varchar(64) | YES |  |  |

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
| `vw_DetailDescriptionSBS` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
-- Note: this was copied from the EDSIQ file SchoolSummary.xml 
--           for report consistency, it should be modified to use this view
-- Added Detail.SortSeq to select  (needed to duplicate order by when called as a view)

create   view  [dbo].[rs_SBS_SchoolSummary_Detail] as
select ReportSessionLinks.RSId, Detail.ItemCode, dd.ItemDescription [Description], Detail.CatalogPage, Detail.UnitCode, Detail.Quantity, Detail.BidPrice, Detail.BidPrice GrossPrice, Detail.CatalogPrice, (Detail.Quantity * Detail.BidPrice) BidTotal, Detail.VendorItemCode, case when isnull(Detail.VendorId,0) = 0 or isnull(Detail.VendorId,7691) = 7691 then '** No Bid **' else case isnull(Detail.BidItemId,0) when 0 then 'Catalog Bid Price' else Detail.Alternate end end Alternate, 0 DiscountRate, (Detail.Quantity * Detail.BidPrice) GrossTotal, ((isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0)) - (isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0) * (isnull(Detail.DiscountRate,0) / 100))) NetTotal, Vendors.Code VendorCode, Vendors.Name VendorName, char(Category.EDSId) CategoryCode, case isnull(rtrim(DistrictCategories.Title),'') when '' then Category.Name else DistrictCategories.Title end CategoryName, Requisitions.RequisitionId, Requisitions.Attention, Requisitions.AccountCode, District.DistrictId, District.DistrictCode, District.Name DistrictName, School.SchoolId, School.Name SchoolName, Budgets.Name BudgetName, Users.CometId, Users.UserId, Detail.SortSeq
from ReportSessionLinks 
join Requisitions on Requisitions.RequisitionId = ReportSessionLinks.IntId 
join Detail on Detail.RequisitionId = Requisitions.RequisitionId 
join Users on Users.UserId = Requisitions.UserId 
join School on School.SchoolId = Requisitions.SchoolId 
join District on District.DistrictId = School.DistrictId 
join Budgets on Budgets.BudgetId = Requisitions.BudgetId 
join Category on Category.CategoryId = Requisitions.CategoryId 
join Vendors on Vendors.VendorId = isnull(Detail.VendorId,7691)
join vw_DetailDescriptionSBS dd on dd.DetailId = Detail.DetailId 
left outer join DistrictCategories on DistrictCategories.DistrictId = District.DistrictId
                                  and DistrictCategories.CategoryId = Category.CategoryId
--where ReportSessionLinks.RSId = {RSId} and Requisitions.RequisitionId = {RequisitionId} /* and Users.UserId = {UserId} and Category.CategoryId = {CategoryId} and isnull(Requisitions.AccountCode,'') = '{AccountCode}' and isnull(Requisitions.Attention,'') = '{Attention}' */ 
--order by Category.Name, District.Name, School.Name, Users.CometId, Requisitions.AccountCode, Detail.SortSeq
```
