# Function: table-valued: `dbo.uf_SavingsLetter2`

_Generated on 2026-05-04T13:04:00.625Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_SavingsLetter2` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2009-03-09 00:03:50 |
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
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--select * from dbo.uf_SavingsLetter (51684, '01/01/2005')

create function [dbo].[uf_SavingsLetter2] (@pRSId int, @PassDate varchar(255)) 
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
IncludedCatalogCost money null,
IncludedBidCost money null,
IncludedSavings money null,
IncludedDiscount decimal(9,5) null,
ExcludedCatalogCost money null,
ExcludedBidCost money null,
ExcludedSavings money null,
ExcludedDiscount decimal(9,5) null,
TotalSavings money null,
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
	@RunDate datetime,
	@OnSavings int

select @Rundate = convert(datetime, @PassDate)

insert @CatTable(DistrictId, CategoryId, OnSavings, DistrictName, CategoryName, 
                 UniqueItems, TotalItems, TotalBidCost, TotalCatalogCost, 
                 TotalStateContractCost, StateContractDiscount, 
                 OverallSavings, OverallDiscount, [CatalogItems], CatalogList, CatalogCost,
                 [BidItems], BidList, BidCost)
select DistrictId, CategoryId, isnull(OnSavingsReport,0), DistrictName, CategoryName, 
       count(ItemCode) UniqueItems, sum(Quantity) TotalItems, sum(BidExtended) TotalBidCost,
       sum(CatalogExtended) TotalCatalogCost, 
       sum(StateContractCost) TotalStateContractCost, StateContractDiscount,
       sum(/*Savings*/StateContractCost - BidExtended) OverallSavings, 
       case isnull(sum(CatalogExtended),0) when 0 then 0 else 1 - (sum(BidExtended) / sum(CatalogExtended)) end OverallDiscount,
       sum(CatalogItem), sum(CatalogList), sum(CatalogCost), sum(BidItem), sum(BidList), sum(BidCost)
  from (
    select District.DistrictId, Category.CategoryId, isnull(Category.OnSavingsReport,0) OnSavingsReport,
           District.Name + case patindex('%PAYABLE%',isnull(District.Address1,'')) when 0 then case rtrim(isnull(District.Address1,'')) when '' then '' else char(13) + char(10) + District.Address1 end else '' end + case patindex('%PAYABLE%',isnull(District.Address2,'')) when 0 then case rtrim(isnull(District.Address2,'')) when '' then '' else char(13) + char(10) + District.Address2 end else '' end + case patindex('%PAYABLE%',isnull(District.Address3,'')) when 0 then case rtrim(isnull(District.Address3,'')) when '' then '' else char(13) + char(10) + District.Address3 end else '' end + char(13) + char(10) + isnull(District.City,'') + ', ' + isnull(District.State,'') + '  ' + isnull(District.Zipcode,'') DistrictName, 
           Category.Name CategoryName, Detail.ItemCode, sum(Detail.Quantity) Quantity, 
           Detail.BidPrice, 
--           case Category.CategoryId when 12 then round((Detail.BidPrice / .6),2) when 15 then (select top 1 CatalogPrice from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Name = 'EDS' and Catalog.Active = 1 where CrossRefs.ItemId = Detail.ItemId and CrossRefs.Active = 1 and CrossRefs.CatalogPrice < 9999 order by CatalogPrice desc) when 44 then round((Detail.BidPrice / .6),2) else isnull((select top 1 CatalogPrice from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 where CrossRefs.ItemId = Detail.ItemId and CrossRefs.Active = 1 and CrossRefs.CatalogPrice < 9999 order by CatalogPrice desc),isnull(Detail.CatalogPrice,Detail.BidPrice / .6)) end CatalogPrice, 
--           case Category.CategoryId when 12 then round((Detail.BidPrice / .6),2) when 15 then (select top 1 CatalogPrice from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Name = 'EDS' and Catalog.Active = 1 where CrossRefs.ItemId = Detail.ItemId and CrossRefs.Active = 1 and CrossRefs.CatalogPrice < 9999 order by CatalogPrice desc) when 44 then round((Detail.BidPrice / .6),2) else isnull((select top 1 CatalogPrice from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId and AwardsCatalogList.AwardId = Awards.AwardId where CrossRefs.ItemId = Detail.ItemId and CrossRefs.Active = 1 and CrossRefs.CatalogPrice < 9999 order by Catalog.CatalogYear desc, CatalogPrice desc),isnull(Detail.CatalogPrice,Detail.BidPrice / .6)) end CatalogPrice, 
           case Category.CategoryId when 12 then round((Detail.BidPrice / .6),2) when 15 then xr.CatalogPrice when 44 then round((Detail.BidPrice / .6),2) else isnull(Detail.CatalogPrice,Detail.BidPrice / .6) end CatalogPrice, 
           1 - (Detail.BidPrice / isnull(case Category.CategoryId when 12 then round((Detail.BidPrice / .6),2) when 15 then xr.CatalogPrice when 44 then round((Detail.BidPrice / .6),2) else isnull(xr.CatalogPrice,isnull(Detail.CatalogPrice,Detail.BidPrice / .6)) end ,Detail.BidPrice / .6)) Discount, 
           sum(Detail.Quantity * Detail.BidPrice) BidExtended, 
           case Category.CategoryId when 12 then round((Detail.BidPrice / .6),2) when 15 then xr.CatalogPrice when 44 then round((Detail.BidPrice / .6),2) else isnull(xr.CatalogPrice,isnull(Detail.CatalogPrice,Detail.BidPrice / .6)) end * sum(Detail.Quantity) CatalogExtended, 
           case Category.CategoryId when 12 then round((Detail.BidPrice / .6),2) when 15 then xr.CatalogPrice when 44 then round((Detail.BidPrice / .6),2) else isnull(xr.CatalogPrice,isnull(Detail.CatalogPrice,Detail.BidPrice / .6)) end * sum(Detail.Quantity) * (1 - (isnull(Awards.StateContractDiscount,0) / 100)) StateContractCost, 
           Awards.StateContractDiscount / 100 StateContractDiscount, 
--           case Category.CategoryId when 12 then round((Detail.BidPrice / .6),2) when 15 then (select top 1 CatalogPrice from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Name = 'EDS' and Catalog.Active = 1 where CrossRefs.ItemId = Detail.ItemId and CrossRefs.Active = 1 order by CatalogPrice desc) when 44 then round((Detail.BidPrice / .6),2) else isnull((select top 1 CatalogPrice from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 where CrossRefs.ItemId = Detail.ItemId and CrossRefs.Active = 1 order by CatalogPrice desc),isnull(Detail.CatalogPrice,Detail.BidPrice)) end * sum(Detail.Quantity) * (1 - (isnull(Awards.StateContractDiscount,0) / 100) - (Detail.Quantity * Detail.BidPrice)) Savings,
           case isnull(Detail.BidItemId,0) when 0 then 1 else 0 end CatalogItem,
           case isnull(Detail.BidItemId,0) 
             when 0 then 
               case Category.CategoryId 
                 when 15 then
                   xr.CatalogPrice
                 else
                   isnull(Detail.CatalogPrice,round(Detail.BidPrice /.6,2))
--                   (select top 1 CatalogPrice from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 join AwardCatalogList on AwardCatalogList.CatalogId = Catalog.CatalogId and AwardCatalogList.AwardId = Awards.AwardId where CrossRefs.ItemId = Detail.ItemId and CrossRefs.Active = 1 and CrossRefs.CatalogPrice < 9999 order by Catalog.CatalogYear desc, CatalogPrice desc)
               end
             else
               0
           end * Detail.Quantity CatalogList,
           case isnull(Detail.BidItemId,0) 
             when 0 then 
               Detail.BidPrice
             else
               0
           end * Detail.Quantity CatalogCost,
           case isnull(Detail.BidItemId,0) when 0 then 0 else 1 end BidItem,
           case isnull(Detail.BidItemId,0) 
             when 0 then 
               0
             else
               xr.CatalogPrice
           end * Detail.Quantity BidList,
           case isnull(Detail.BidItemId,0) 
             when 0 then 
               0
             else
               Detail.BidPrice
           end * Detail.Quantity BidCost
      from Detail
      join Awards on Awards.AwardId = Detail.AwardId
      join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
      join Budgets on Budgets.BudgetId = Requisitions.BudgetId
      join District on District.DistrictId = Budgets.DistrictId
      join Category on Category.CategoryId = Requisitions.CategoryId
                   and (   (isnull(Category.OnSavingsReport,0) = 1 and Detail.BidItemId is not null)
                        or (isnull(Category.OnSavingsReport,0) != 1))
      join ReportSessionLinks on ReportSessionLinks.IntId = Budgets.BudgetId
      left outer join CrossRefs xr on xr.CrossRefId = 
               case Category.CategoryId 
                 when 15 then
                   (select top 1 CrossRefs.CrossRefId from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Name = 'EDS' and Catalog.Active = 1 where CrossRefs.ItemId = Detail.ItemId and CrossRefs.Active = 1 and CrossRefs.CatalogPrice < 9999 order by CatalogPrice desc) 
                 else
                   (select top 1 CrossRefs.CrossRefId from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 where CrossRefs.ItemId = Detail.ItemId and CrossRefs.Active = 1 and CrossRefs.CatalogPrice < 9999 order by CatalogPrice desc) 
               end
     where case Category.CategoryId when 12 then round((Detail.BidPrice / .6),2) when 15 then isnull(xr.CatalogPrice,0) when 44 then round((Detail.BidPrice / .6),2) else isnull(xr.CatalogPrice,isnull(Detail.CatalogPrice,Detail.BidPrice)) end != 0
       and ReportSessionLinks.RSId = @pRSId
/*           Detail.BidItemId is not null
--       and District.DistrictId = 34 
       and isnull(Category.OnSavingsReport,0) = 1
       and isnull(Detail.BidPrice,0) != 0
       and */
     group by District.DistrictId, Category.CategoryId, Category.OnSavingsReport,
              District.Name, District.Address1, District.Address2, District.Address3, 
              District.City, District.State, District.Zipcode, Category.Name, 
              Detail.ItemCode, Detail.BidPrice, Detail.BidItemId, Detail.ItemId, xr.CatalogPrice,
              Detail.CatalogPrice, Detail.Quantity, Awards.StateContractDiscount, Awards.AwardId) ss
 group by DistrictId, CategoryId, OnSavingsReport, DistrictName, CategoryName, StateContractDiscount
 order by DistrictName, CategoryName

Update @CatTable
   set IncludedSavings = isnull((select sum(OverallSavings) from @CatTable ct1 where ct1.DistrictId = ct.DistrictId and ct1.OnSavings = 1),0),
       IncludedDiscount = 1 - (isnull((select sum(TotalBidCost) from @CatTable ct1 where ct1.DistrictId = ct.DistrictId and ct1.OnSavings = 1),0) / isnull((select sum(TotalCatalogCost) from @CatTable ct1 where ct1.DistrictId = ct.DistrictId and ct1.OnSavings = 1),1)),
       IncludedBidCost = isnull((select sum(TotalBidCost) from @CatTable ct1 where ct1.DistrictId = ct.DistrictId and isnull(ct1.OnSavings,0) = 1),0),
       IncludedCatalogCost = isnull((select sum(TotalStateContractCost) from @CatTable ct1 where ct1.DistrictId = ct.DistrictId and isnull(ct1.OnSavings,0) = 1),0),
       ExcludedSavings = isnull((select sum(OverallSavings) from @CatTable ct1 where ct1.DistrictId = ct.DistrictId and isnull(ct1.OnSavings,0) = 0),0),
       ExcludedDiscount = 1 - (isnull((select sum(TotalBidCost) from @CatTable ct1 where ct1.DistrictId = ct.DistrictId and isnull(ct1.OnSavings,0) = 0),0) / isnull((select sum(TotalCatalogCost) from @CatTable ct1 where ct1.DistrictId = ct.DistrictId and isnull(ct1.OnSavings,0) = 0),1)),
       ExcludedBidCost = isnull((select sum(TotalBidCost) from @CatTable ct1 where ct1.DistrictId = ct.DistrictId and isnull(ct1.OnSavings,0) = 0),0),
       ExcludedCatalogCost = isnull((select sum(TotalCatalogCost) from @CatTable ct1 where ct1.DistrictId = ct.DistrictId and isnull(ct1.OnSavings,0) = 0),0)
  from @CatTable ct
/*  join (select DistrictId, sum(OverallSavings) OverallSavings, sum(TotalBidCost) TotalBidCost, sum(TotalCatalogCost) TotalCatalogCost
          from @CatTable 
         group by DistrictId
       ) ss on ss.DistrictId = ct.DistrictId*/

Update @CatTable
   set TotalSavings = isnull(IncludedSavings,0) + isnull(ExcludedSavings,0)

declare CatCur cursor fast_forward read_only for
select ct.DistrictId, isnull(ct1.CategoryId,0) CategoryId, Category.Name CategoryName, ct.OnSavings
  from @CatTable ct
  join Category on Category.CategoryId = ct.CategoryId
  left outer join @CatTable ct1 on ct1.DistrictId = ct.DistrictId
                               and ct1.CategoryId = Category.CategoryId
 group by ct.DistrictId, ct1.CategoryId, Category.Name, ct.OnSavings
 order by ct.DistrictId, Category.Name

open CatCur

fetch next from CatCur into @DistrictId, @CategoryId, @CategoryName, @OnSavings

while @@fetch_status = 0
begin
  Update @CatTable
     set CategoriesIncluded = isnull(CategoriesIncluded,'') + case @OnSavings when OnSavings then '' else case rtrim(isnull(CategoriesIncluded,'')) when '' then '' else ', ' end + @CategoryName end,
         CategoriesExcluded = isnull(CategoriesExcluded,'') + case @OnSavings when OnSavings then case rtrim(isnull(CategoriesExcluded,'')) when '' then '' else ', ' end + @CategoryName else '' end
   where DistrictId = @DistrictId

  fetch next from CatCur into @DistrictId, @CategoryId, @CategoryName, @OnSavings
end

close CatCur
deallocate CatCur

return
end
```
