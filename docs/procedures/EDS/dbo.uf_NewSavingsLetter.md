# Function: table-valued: `dbo.uf_NewSavingsLetter`

_Generated on 2026-05-04T13:43:19.043Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_NewSavingsLetter` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2004-03-05 12:44:47 |
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
| `Catalog` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `DistrictPP` | USER_TABLE |  |
| `PPCategory` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create  function dbo.uf_NewSavingsLetter (@pRSId int, @PassDate varchar(255)) 
returns @CatTable table (
DistrictId	int null,
CategoryId	int null,
OnSavings	int null,
DistrictName	varchar(512) null,
CategoryName	varchar(50) null,
UniqueItems	int null,
TotalItems	int null,
TotalBidCost	money null,
TotalCatalogCost money null,
TotalStateContractCost money null,
StateContractDiscount decimal(9,5) null,
CategoriesIncluded varchar(512) null,
CategoriesExcluded varchar(512) null,
OverallSavings money null,
OverallDiscount decimal(9,5) null,
IncludedSavings money null,
IncludedDiscount decimal(9,5) null,
ExcludedSavings money null,
ExcludedDiscount decimal(9,5) null,
CatalogItems int null,
CatalogList money null,
CatalogCost money null,
BidItems int null,
BidList money null,
BidCost money null)
as
begin
declare @DistrictId int,
	@CategoryId int,
	@CategoryName varchar(50),
	@RunDate datetime

select @Rundate = convert(datetime, @PassDate)

insert @CatTable(DistrictId, CategoryId, OnSavings, DistrictName, CategoryName, 
                 UniqueItems, TotalItems, TotalBidCost, TotalCatalogCost, 
                 TotalStateContractCost, StateContractDiscount, 
                 OverallSavings, OverallDiscount, [CatalogItems], CatalogList, CatalogCost,
                 [BidItems], BidList, BidCost)
select DistrictId, CategoryId, OnSavingsReport, DistrictName, CategoryName, 
       count(ItemCode) UniqueItems, sum(Quantity) TotalItems, sum(BidExtended) TotalBidCost,
       sum(CatalogExtended) TotalCatalogCost, 
       sum(StateContractCost) TotalStateContractCost, StateContractDiscount,
       sum(Savings) OverallSavings, 1 - (sum(BidCost) / sum(catalogCost)) OverallDiscount,
       sum(CatalogItem), sum(CatalogList), sum(CatalogCost), sum(BidItem), sum(BidList), sum(BidCost)
  from (
    select District.DistrictId, Category.CategoryId, isnull(Category.OnSavingsReport,0) OnSavingsReport,
           District.Name + case patindex('%PAYABLE%',isnull(District.Address1,'')) when 0 then case rtrim(isnull(District.Address1,'')) when '' then '' else char(13) + char(10) + District.Address1 end else '' end + case patindex('%PAYABLE%',isnull(District.Address2,'')) when 0 then case rtrim(isnull(District.Address2,'')) when '' then '' else char(13) + char(10) + District.Address2 end else '' end + case patindex('%PAYABLE%',isnull(District.Address3,'')) when 0 then case rtrim(isnull(District.Address3,'')) when '' then '' else char(13) + char(10) + District.Address3 end else '' end + char(13) + char(10) + isnull(District.City,'') + ', ' + isnull(District.State,'') + '  ' + isnull(District.Zipcode,'') DistrictName, 
           Category.Name CategoryName, Detail.ItemCode, sum(Detail.Quantity) Quantity, 
           Detail.BidPrice, 
           Detail.CatalogPrice, 
           1 - (Detail.BidPrice / isnull(Detail.CatalogPrice,Detail.BidPrice)) Discount, 
           sum(Detail.Quantity * Detail.BidPrice) BidExtended, 
           sum(Detail.Quantity * isnull(Detail.CatalogPrice,Detail.BidPrice)) CatalogExtended, 
           sum(Detail.Quantity * isnull(Detail.CatalogPrice * (1 - (Awards.StateContractDiscount / 100)),Detail.BidPrice)) StateContractCost, 
           Awards.StateContractDiscount / 100 StateContractDiscount, 
           sum((Detail.Quantity * isnull(Detail.CatalogPrice * (1 - (StateContractDiscount / 100)),Detail.BidPrice)) - (Detail.Quantity * Detail.BidPrice)) Savings,
           case isnull(Detail.BidItemId,0) when 0 then 1 else 0 end CatalogItem,
           case isnull(Detail.BidItemId,0) 
             when 0 then 
               case Category.CategoryId 
                 when 15 then
                   (select top 1 CatalogPrice from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Name = 'EDS' and Catalog.Active = 1 where CrossRefs.ItemId = Detail.ItemId and CrossRefs.Active = 1 order by CatalogPrice desc)
                 else
                   (select top 1 CatalogPrice from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 where CrossRefs.ItemId = Detail.ItemId and CrossRefs.Active = 1 order by CatalogPrice desc)
               end
             else
               0
           end CatalogList,
           case isnull(Detail.BidItemId,0) 
             when 0 then 
               Detail.BidPrice
             else
               0
           end CatalogCost,
           case isnull(Detail.BidItemId,0) when 0 then 0 else 1 end BidItem,
           case isnull(Detail.BidItemId,0) 
             when 0 then 
               0
             else
               case Category.CategoryId 
                 when 15 then
                   (select top 1 CatalogPrice from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Name = 'EDS' and Catalog.Active = 1 where CrossRefs.ItemId = Detail.ItemId and CrossRefs.Active = 1 order by CatalogPrice desc)
                 else
                   (select top 1 CatalogPrice from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 where CrossRefs.ItemId = Detail.ItemId and CrossRefs.Active = 1 order by CatalogPrice desc)
               end
           end BidList,
           case isnull(Detail.BidItemId,0) 
             when 0 then 
               0
             else
               Detail.BidPrice
           end BidCost
      from Detail
      join Awards on Awards.AwardId = Detail.AwardId
      join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
      join Budgets on Budgets.BudgetId = Requisitions.BudgetId
      join District on District.DistrictId = Budgets.DistrictId
      join Category on category.CategoryId = Requisitions.CategoryId
      join ReportSessionLinks on ReportSessionLinks.IntId = Budgets.BudgetId
/*     where Detail.BidItemId is not null
--       and District.DistrictId = 34 
       and ReportSessionLinks.RSId = @pRSId
       and isnull(Category.OnSavingsReport,0) = 1
       and isnull(Detail.BidPrice,0) != 0
       and isnull(Detail.CatalogPrice,0) != 0
*/
     group by District.DistrictId, Category.CategoryId, Category.OnSavingsReport,  District.Name, 
              District.Address1, District.Address2, District.Address3, 
              District.City, District.State, District.Zipcode, 
              Category.Name, Detail.ItemCode, Detail.BidPrice, Detail.BidItemId, Detail.ItemId,
              Awards.StateContractDiscount, Detail.CatalogPrice) ss
 group by DistrictId, CategoryId, OnSavingsReport, DistrictName, CategoryName, StateContractDiscount
 order by DistrictName, CategoryName

Update @CatTable
   set IncludedSavings = ss.OverallSavings,
       IncludedDiscount = 1 - (ss.TotalBidCost / ss.TotalCatalogCost)
  from @CatTable ct
  join (select DistrictId, sum(OverallSavings) OverallSavings, sum(TotalBidCost) TotalBidCost, sum(TotalCatalogCost) TotalCatalogCost
          from @CatTable 
         group by DistrictId
       ) ss on ss.DistrictId = ct.DistrictId

declare CatCur cursor fast_forward read_only for
select ct.DistrictId, isnull(ct1.CategoryId,0) CategoryId, Category.Name CategoryName
  from @CatTable ct
  join DistrictPP on DistrictPP.DistrictId = ct.DistrictId
  join PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId
  join Category on Category.CategoryId = PPCategory.CategoryId
  left outer join @CatTable ct1 on ct1.DistrictId = ct.DistrictId
                               and ct1.CategoryId = Category.CategoryId
 group by ct.DistrictId, ct1.CategoryId, Category.Name
 order by ct.DistrictId, Category.Name

open CatCur

fetch next from CatCur into @DistrictId, @CategoryId, @CategoryName

while @@fetch_status = 0
begin
  Update @CatTable
     set CategoriesIncluded = isnull(CategoriesIncluded,'') + case @CategoryId when 0 then '' else case rtrim(isnull(CategoriesIncluded,'')) when '' then '' else ', ' end + @CategoryName end,
         CategoriesExcluded = isnull(CategoriesExcluded,'') + case @CategoryId when 0 then case rtrim(isnull(CategoriesExcluded,'')) when '' then '' else ', ' end + @CategoryName else '' end
   where DistrictId = @DistrictId

  fetch next from CatCur into @DistrictId, @CategoryId, @CategoryName
end

close CatCur
deallocate CatCur

return
end
```
