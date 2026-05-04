# View: `dbo.vw_SavingsDetail1NonFiltered`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BudgetId` | int | NO |  |  |
| 2 | `DistrictId` | int | NO |  |  |
| 3 | `CategoryId` | int | NO |  |  |
| 4 | `OnSavingsReport` | int | NO |  |  |
| 5 | `DistrictName` | varchar(189) | YES |  |  |
| 6 | `CategoryName` | varchar(50) | YES |  |  |
| 7 | `ItemCode` | varchar(50) | YES |  |  |
| 8 | `Quantity` | int | YES |  |  |
| 9 | `BidPrice` | money | YES |  |  |
| 10 | `CatalogPrice` | numeric(22,6) | YES |  |  |
| 11 | `Discount` | numeric(38,17) | YES |  |  |
| 12 | `BidExtended` | money | YES |  |  |
| 13 | `CatalogExtended` | numeric(33,6) | YES |  |  |
| 14 | `StateContractCost` | numeric(38,6) | YES |  |  |
| 15 | `StateContractDiscount` | decimal(13,9) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Awards` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Catalog` | USER_TABLE |
| `Category` | USER_TABLE |
| `CrossRefs` | USER_TABLE |
| `Detail` | USER_TABLE |
| `District` | USER_TABLE |
| `Requisitions` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_SavingsDetail2NonFiltered`](dbo.vw_SavingsDetail2NonFiltered.md) | VIEW |
| [`dbo.vw_SavingsTotals5NonFiltered`](dbo.vw_SavingsTotals5NonFiltered.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_SavingsDetail1NonFiltered] as
		select Budgets.BudgetId, District.DistrictId, Category.CategoryId, isnull(Category.OnSavingsReport,0) OnSavingsReport,
			   District.Name + case patindex('%PAYABLE%',isnull(District.Address1,'')) when 0 then case rtrim(isnull(District.Address1,'')) when '' then '' else char(13) + char(10) + District.Address1 end else '' end + case patindex('%PAYABLE%',isnull(District.Address2,'')) when 0 then case rtrim(isnull(District.Address2,'')) when '' then '' else char(13) + char(10) + District.Address2 end else '' end + case patindex('%PAYABLE%',isnull(District.Address3,'')) when 0 then case rtrim(isnull(District.Address3,'')) when '' then '' else char(13) + char(10) + District.Address3 end else '' end + char(13) + char(10) + isnull(District.City,'') + ', ' + isnull(District.State,'') + '  ' + isnull(District.Zipcode,'') DistrictName, 
			   Category.Name CategoryName, Detail.ItemCode, sum(Detail.Quantity) Quantity, 
			   Detail.BidPrice, 
			   case Category.CategoryId 
			     when 12 then round((Detail.BidPrice / .6),2) 
			     when 15 then (select top 1 CatalogPrice from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Name = 'EDS' and Catalog.Active = 1 where CrossRefs.ItemId = Detail.ItemId and CrossRefs.Active = 1 and CrossRefs.CatalogPrice < 9999 order by CatalogPrice desc) 
			     when 44 then round((Detail.BidPrice / .6),2) 
			     else isnull(Detail.CatalogPrice,Detail.BidPrice / .6) 
			   end CatalogPrice, 
			   case isnull(case Category.CategoryId 
			                 when 12 then round((Detail.BidPrice / .6),2) 
			                 when 15 then (select top 1 CatalogPrice from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Name = 'EDS' and Catalog.Active = 1 where CrossRefs.ItemId = Detail.ItemId and CrossRefs.Active = 1 and CrossRefs.CatalogPrice < 9999 order by CatalogPrice desc) 
			                 when 44 then round((Detail.BidPrice / .6),2) 
			                 else isnull((select top 1 CatalogPrice from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 where CrossRefs.ItemId = Detail.ItemId and CrossRefs.Active = 1 and CrossRefs.CatalogPrice < 9999 order by CatalogPrice desc),isnull(Detail.CatalogPrice,Detail.BidPrice / .6))
		                   end, Detail.BidPrice / .6)
			     when 0 then 0
			     else
                   1 - (Detail.BidPrice / isnull(case Category.CategoryId 
			                 when 12 then round((Detail.BidPrice / .6),2) 
			                 when 15 then (select top 1 CatalogPrice from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Name = 'EDS' and Catalog.Active = 1 where CrossRefs.ItemId = Detail.ItemId and CrossRefs.Active = 1 and CrossRefs.CatalogPrice < 9999 order by CatalogPrice desc) 
			                 when 44 then round((Detail.BidPrice / .6),2) 
			                 else isnull((select top 1 CatalogPrice from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 where CrossRefs.ItemId = Detail.ItemId and CrossRefs.Active = 1 and CrossRefs.CatalogPrice < 9999 order by CatalogPrice desc),isnull(Detail.CatalogPrice,Detail.BidPrice / .6)) 
		                   end, Detail.BidPrice / .6))
			   end Discount, 
			   sum(Detail.Quantity * Detail.BidPrice) BidExtended, 
			   case Category.CategoryId 
			     when 12 then round((Detail.BidPrice / .6),2) 
			     when 15 then (select top 1 CatalogPrice from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Name = 'EDS' and Catalog.Active = 1 where CrossRefs.ItemId = Detail.ItemId and CrossRefs.Active = 1 and CrossRefs.CatalogPrice < 9999 order by CatalogPrice desc) 
			     when 44 then round((Detail.BidPrice / .6),2) 
			     else isnull((select top 1 CatalogPrice 
			                    from CrossRefs 
			                    join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 
			                   where CrossRefs.ItemId = Detail.ItemId 
			                     and CrossRefs.Active = 1 
			                     and CrossRefs.CatalogPrice < 9999 
			                    order by CatalogPrice desc),
			                 isnull(Detail.CatalogPrice,Detail.BidPrice / .6)) 
			   end * sum(Detail.Quantity) CatalogExtended, 
			   case Category.CategoryId 
			     when 12 then round((Detail.BidPrice / .6),2) 
			     when 15 then (select top 1 CatalogPrice from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Name = 'EDS' and Catalog.Active = 1 where CrossRefs.ItemId = Detail.ItemId and CrossRefs.Active = 1 and CrossRefs.CatalogPrice < 9999 order by CatalogPrice desc) 
			     when 44 then round((Detail.BidPrice / .6),2) 
			     else isnull((select top 1 CatalogPrice from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 where CrossRefs.ItemId = Detail.ItemId and CrossRefs.Active = 1 and CrossRefs.CatalogPrice < 9999 order by CatalogPrice desc),isnull(Detail.CatalogPrice,Detail.BidPrice / .6)) end * sum(Detail.Quantity) * (1 - (isnull(Awards.StateContractDiscount,0) / 100)) StateContractCost, 
			   Awards.StateContractDiscount / 100 StateContractDiscount
		  from Detail
		  join Awards on Awards.AwardId = Detail.AwardId
		  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
--		                   and Requisitions.StatusId != 4
		  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
		  join District on District.DistrictId = Budgets.DistrictId
		  join Category on Category.CategoryId = Requisitions.CategoryId
					   and (   (isnull(Category.OnSavingsReport,0) = 1 and Detail.BidItemId is not null)
							or (isnull(Category.OnSavingsReport,0) != 1))
		 where case Category.CategoryId when 12 then round((Detail.BidPrice / .6),2) when 15 then (select top 1 CatalogPrice from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Name = 'EDS' and Catalog.Active = 1 where CrossRefs.ItemId = Detail.ItemId and CrossRefs.Active = 1 and CrossRefs.CatalogPrice < 9999 order by CatalogPrice desc) when 44 then round((Detail.BidPrice / .6),2) else isnull((select top 1 CatalogPrice from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId and Catalog.Active = 1 where CrossRefs.ItemId = Detail.ItemId and CrossRefs.Active = 1 and CrossRefs.CatalogPrice < 9999 order by CatalogPrice desc),isnull(Detail.CatalogPrice,Detail.BidPrice)) end != 0
		 group by Budgets.BudgetId, District.DistrictId, Category.CategoryId, Category.OnSavingsReport,
				  District.Name, District.Address1, District.Address2, District.Address3, 
				  District.City, District.State, District.Zipcode, Category.Name, 
				  Detail.ItemCode, Detail.BidPrice, Detail.BidItemId, Detail.ItemId,
				  Detail.CatalogPrice, Detail.Quantity, Awards.StateContractDiscount, Awards.AwardId
```
