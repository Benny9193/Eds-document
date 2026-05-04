# Function: table-valued: `dbo.uf_SavingsLetterCounty`

_Generated on 2026-05-04T13:04:24.316Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_SavingsLetterCounty` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2008-10-31 12:24:25 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRSId` | IN | int |  |
| 2 | `@PassDate` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `PricePlans` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE      function dbo.uf_SavingsLetterCounty (@pRSId int, @PassDate varchar(255)) 
returns @CatTable table (
DistrictId	int null,
CategoryId	int null,
DistrictName	varchar(512) null,
CategoryName	varchar(50) null,
CountyName	varchar(50) null,
StateName	varchar(50) null,
UniqueItems	int null,
TotalItems	int null,
TotalBidCost	money null,
TotalCatalogCost money null,
TotalStateContractCost money null,
StateContractDiscount decimal(9,5) null,
OverallDiscount decimal(9,5) null,
TotalSavings	money null,
CategoriesIncluded varchar(2048) null,
CategoriesExcluded varchar(2048) null,
AccountRep	varchar(50) null,
IncludedSavings money null,
IncludedDiscount decimal(9,5) null)
as
begin
declare @DistrictId int,
	@CategoryId int,
	@CategoryName varchar(50),
	@RunDate datetime

select @Rundate = convert(datetime, @PassDate)

insert @CatTable(DistrictId, CategoryId, DistrictName, CategoryName,
                 CountyName, StateName, 
                 UniqueItems, TotalItems, TotalBidCost, TotalCatalogCost, 
                 TotalStateContractCost, StateContractDiscount, 
                 OverallDiscount, TotalSavings)
select DistrictId, CategoryId, DistrictName, CategoryName, CountyName, StateName,
       count(ItemCode) UniqueItems, sum(Quantity) TotalItems, sum(BidCost) TotalBidCost, sum(CatalogCost) TotalCatalogCost, 
       sum(StateContractCost) TotalStateContractCost, StateContractDiscount,
       1 - (sum(BidCost) / sum(catalogCost)) OverallDiscount, sum(Savings) TotalSavings
  from (
    select PricePlans.PricePlanId DistrictId, Category.CategoryId,
           PricePlans.Description DistrictName, 
           Category.Name CategoryName, isnull(District.County,'') CountyName,  isnull(District.State,'') StateName, 
           Detail.ItemCode, sum(Detail.Quantity) Quantity, Detail.BidPrice, Detail.CatalogPrice, 
           1 - (Detail.BidPrice / isnull(Detail.CatalogPrice,Detail.BidPrice)) Discount, 
           sum(Detail.Quantity * Detail.BidPrice) BidCost, sum(Detail.Quantity * isnull(Detail.CatalogPrice,Detail.BidPrice)) CatalogCost, 
           sum(Detail.Quantity * isnull(Detail.CatalogPrice * (1 - (Awards.StateContractDiscount / 100)),Detail.BidPrice)) StateContractCost, 
           Awards.StateContractDiscount / 100 StateContractDiscount, 
           sum((Detail.Quantity * isnull(Detail.CatalogPrice * (1 - (StateContractDiscount / 100)),Detail.BidPrice)) - (Detail.Quantity * Detail.BidPrice)) Savings
      from Detail with (nolock)
      join Awards on Awards.AwardId = Detail.AwardId
      join PricePlans on PricePlans.PricePlanId = Awards.PricePlanId
      join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
      join Budgets on Budgets.BudgetId = Requisitions.BudgetId
      join District on District.DistrictId = Budgets.DistrictId
      join Category on category.CategoryId = Requisitions.CategoryId
      join ReportSessionLinks on ReportSessionLinks.IntId = Budgets.BudgetId
     where Detail.BidItemId is not null
--       and District.DistrictId = 34 
       and ReportSessionLinks.RSId = @pRSId
       and isnull(Category.OnSavingsReport,0) = 1
       and isnull(Detail.BidPrice,0) != 0
       and isnull(Detail.CatalogPrice,0) != 0
       and PricePlans.PricePlanId in (1, 2, 5, 6, 7, 9, 26, 27, 29, 30)
     group by PricePlans.PricePlanId, Category.CategoryId, PricePlans.Description, 
              Category.Name, isnull(District.County,''), isnull(District.State,''), Detail.ItemCode, Detail.BidPrice, 
              Awards.StateContractDiscount, Detail.CatalogPrice) ss
 group by DistrictId, CategoryId, DistrictName, CountyName, StateName, CategoryName, StateContractDiscount
 order by StateName, CountyName, DistrictName, CategoryName

Update @CatTable
   set IncludedSavings = (select sum(TotalSavings) from @CatTable cts where cts.StateName = ct.StateName and cts.CountyName = ct.CountyName),
       IncludedDiscount = 1 - ((select sum(TotalBidCost) from @CatTable cts where cts.StateName = ct.StateName and cts.CountyName = ct.CountyName) / (select sum(TotalCatalogCost) from @CatTable cts where cts.StateName = ct.StateName and cts.CountyName = ct.CountyName)),
       AccountRep = 'Alan Wohl'
  from @CatTable ct
/*
Update @CatTable
   set IncludedSavings = ss.TotalSavings,
       IncludedDiscount = 1 - (ss.TotalBidCost / ss.TotalCatalogCost),
       AccountRep = 'Alan Wohl'
  from @CatTable ct
  join (select 0 DistrictId, sum(TotalSavings) TotalSavings, sum(TotalBidCost) TotalBidCost, sum(TotalCatalogCost) TotalCatalogCost
          from @CatTable 
         group by DistrictId
       ) ss on isnull(ss.DistrictId,0) = 0
*/

declare CatCur cursor fast_forward read_only for
select 0 DistrictId, isnull(ct1.CategoryId,0) CategoryId, Category.Name CategoryName
  from Category with (nolock)
  left outer join @CatTable ct1 on ct1.CategoryId = Category.CategoryId
 where Category.OnSavingsReport >= 0
 group by ct1.CategoryId, Category.Name
 order by Category.Name

open CatCur

fetch next from CatCur into @DistrictId, @CategoryId, @CategoryName

while @@fetch_status = 0
begin
  Update @CatTable
     set CategoriesIncluded = isnull(CategoriesIncluded,'') + case @CategoryId when 0 then '' else case rtrim(isnull(CategoriesIncluded,'')) when '' then '' else ', ' end + @CategoryName end,
         CategoriesExcluded = isnull(CategoriesExcluded,'') + case @CategoryId when 0 then case rtrim(isnull(CategoriesExcluded,'')) when '' then '' else ', ' end + @CategoryName else '' end
--   where isnull(DistrictId,0) = isnull(@DistrictId,0)

  fetch next from CatCur into @DistrictId, @CategoryId, @CategoryName
end

close CatCur
deallocate CatCur

return
end
```
