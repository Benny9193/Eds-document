# Procedure: `null.sp_SavingsLetter`

_Generated on 2026-05-04T13:04:00.221Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `sp_SavingsLetter` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-06-30 12:55:56 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `DistrictPP` | USER_TABLE |  |
| `PPCategory` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure EDSIQWebUser.sp_SavingsLetter (@pRSId int) as

declare @DistrictId int,
	@CategoryId int,
	@CategoryName varchar(50)

create table #CatTable (
DistrictId	int null,
CategoryId	int null,
DistrictName	varchar(512) null,
CategoryName	varchar(50) null,
UniqueItems	int null,
TotalItems	int null,
TotalBidCost	money null,
TotalCatalogCost money null,
TotalStateContractCost money null,
StateContractDiscount decimal(9,5) null,
OverallDiscount decimal(9,5) null,
TotalSavings	money null,
CategoriesIncluded varchar(512) null,
CategoriesExcluded varchar(512) null,
AccountRep	varchar(50) null,
IncludedSavings money null,
IncludedDiscount decimal(9,5) null)

insert #CatTable(DistrictId, CategoryId, DistrictName, CategoryName, UniqueItems, TotalItems, TotalBidCost, TotalCatalogCost, TotalStateContractCost, StateContractDiscount, OverallDiscount, TotalSavings)
select DistrictId, CategoryId, DistrictName, CategoryName, count(ItemCode) UniqueItems, sum(Quantity) TotalItems, sum(BidCost) TotalBidCost, sum(CatalogCost) TotalCatalogCost, sum(StateContractCost) TotalStateContractCost, StateContractDiscount, 1 - (sum(BidCost) / sum(catalogCost)) OverallDiscount, sum(Savings) TotalSavings
  from (
select District.DistrictId, Category.CategoryId,
       District.Name + case rtrim(isnull(District.Address1,'')) when '' then '' else char(13) + char(10) + District.Address1 end + case rtrim(isnull(District.Address2,'')) when '' then '' else char(13) + char(10) + District.Address2 end + case rtrim(isnull(District.Address3,'')) when '' then '' else char(13) + char(10) + District.Address3 end + isnull(District.City,'') + ', ' + isnull(District.State,'') + '  ' + isnull(District.Zipcode,'') DistrictName, 
       Category.Name CategoryName, Detail.ItemCode, sum(Detail.Quantity) Quantity, Detail.BidPrice, Detail.CatalogPrice, 1 - (Detail.BidPrice / isnull(Detail.CatalogPrice,Detail.BidPrice)) Discount, sum(Detail.Quantity * Detail.BidPrice) BidCost, sum(Detail.Quantity * isnull(Detail.CatalogPrice,Detail.BidPrice)) CatalogCost, sum(Detail.Quantity * isnull(Detail.CatalogPrice * (1 - (Awards.StateContractDiscount / 100)),Detail.BidPrice)) StateContractCost, Awards.StateContractDiscount, sum((Detail.Quantity * isnull(Detail.CatalogPrice * .8,Detail.BidPrice)) - (Detail.Quantity * Detail.BidPrice)) Savings
  from Detail
  join Awards on Awards.AwardId = Detail.AwardId
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
  join Category on category.CategoryId = Requisitions.CategoryId
 where Detail.BidItemId is not null
   and District.DistrictId = 34 
   and isnull(Category.OnSavingsReport,0) = 1
   and isnull(Detail.BidPrice,0) != 0
   and isnull(Detail.CatalogPrice,0) != 0
   and dateadd(month,4,Budgets.StartDate) <= dateadd(year,1,getdate())
   and dateadd(month,4,Budgets.EndDate) >= dateadd(year,1,getdate())
 group by District.DistrictId, Category.CategoryId, District.Name, District.Address1, District.Address2, District.Address3, District.City, District.State, District.Zipcode, Category.Name, Detail.ItemCode, Detail.BidPrice, Awards.StateContractDiscount, Detail.CatalogPrice) ss
 group by DistrictId, CategoryId, DistrictName, CategoryName, StateContractDiscount
 order by DistrictName, CategoryName

Update #CatTable
   set IncludedSavings = ss.TotalSavings,
       IncludedDiscount = 1 - (ss.TotalBidCost / ss.TotalCatalogCost),
       AccountRep = 'Alan Wohl'
  from #CatTable ct
  join (select DistrictId, sum(TotalSavings) TotalSavings, sum(TotalBidCost) TotalBidCost, sum(TotalCatalogCost) TotalCatalogCost
          from #CatTable group by DistrictId) ss on ss.DistrictId = ct.DistrictId

declare CatCur cursor fast_forward read_only for
select ct.DistrictId, isnull(ct1.CategoryId,0) CategoryId, Category.Name CategoryName
  from #CatTable ct
  join DistrictPP on DistrictPP.DistrictId = ct.DistrictId
  join PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId
  join Category on Category.CategoryId = PPCategory.CategoryId
  left outer join #CatTable ct1 on ct1.DistrictId = ct.DistrictId
                               and ct1.CategoryId = Category.CategoryId
 group by ct.DistrictId, ct1.CategoryId, Category.Name
 order by ct.DistrictId, Category.Name

open CatCur

fetch next from CatCur into @DistrictId, @CategoryId, @CategoryName

while @@fetch_status = 0
begin
  Update #CatTable
     set CategoriesIncluded = isnull(CategoriesIncluded,'') + case @CategoryId when 0 then '' else case rtrim(isnull(CategoriesIncluded,'')) when '' then '' else ', ' end + @CategoryName end,
         CategoriesExcluded = isnull(CategoriesExcluded,'') + case @CategoryId when 0 then case rtrim(isnull(CategoriesExcluded,'')) when '' then '' else ', ' end + @CategoryName else '' end
   where DistrictId = @DistrictId

  fetch next from CatCur into @DistrictId, @CategoryId, @CategoryName
end

close CatCur
deallocate CatCur

select * from #CatTable

drop table #CatTable
```
