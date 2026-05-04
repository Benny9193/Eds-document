# View: `dbo.vw_SavingsTotals`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BudgetId` | int | NO |  |  |
| 2 | `Name` | varchar(30) | YES |  |  |
| 3 | `DistrictId` | int | YES |  |  |
| 4 | `DistrictName` | varchar(189) | YES |  |  |
| 5 | `TotalBidCost` | money | YES |  |  |
| 6 | `TotalCatalogCost` | numeric(38,6) | YES |  |  |
| 7 | `TotalStateContractCost` | numeric(38,6) | YES |  |  |
| 8 | `StateContractDiscount` | decimal(13,9) | YES |  |  |
| 9 | `OverallSavings` | numeric(38,6) | YES |  |  |
| 10 | `OverallDiscount` | numeric(38,6) | YES |  |  |
| 11 | `IncludedCatalogCost` | numeric(38,6) | YES |  |  |
| 12 | `IncludedBidCost` | money | YES |  |  |
| 13 | `ExcludedCatalogCost` | numeric(38,6) | YES |  |  |
| 14 | `ExcludedBidCost` | money | YES |  |  |
| 15 | `IncludedSavings` | numeric(38,6) | YES |  |  |
| 16 | `ExcludedSavings` | numeric(38,6) | YES |  |  |
| 17 | `IncludedDiscount` | numeric(38,6) | YES |  |  |
| 18 | `ExcludedDiscount` | numeric(38,6) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `vw_SavingsDetail2` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_SavingsTotals] as
select B.BudgetId, B.Name, B.DistrictId, DistrictName, 
       sum(TotalBidCost) TotalBidCost, sum(TotalCatalogCost) TotalCatalogCost, 
       sum(TotalStateContractCost) TotalStateContractCost, StateContractDiscount, 
       sum(OverallSavings) OverallSavings, 
       case sum(TotalCatalogCost) 
         when 0 then 0 
         else sum(OverallSavings) / sum(TotalCatalogCost) 
       end OverallDiscount, 
       sum(case OnSavings when 0 then 0 else TotalCatalogCost end) IncludedCatalogCost, 
       sum(case OnSavings when 0 then 0 else TotalBidCost end) IncludedBidCost, 
       sum(case OnSavings when 0 then TotalCatalogCost else 0 end) ExcludedCatalogCost, 
       sum(case OnSavings when 0 then TotalBidCost else 0 end) ExcludedBidCost, 
--       case case OnSavings when 0 then 0 else sum(TotalCatalogCost) end when 0 then 0 else 1 - (case OnSavings when 0 then 0 else sum(TotalBidCost) end / case OnSavings when 0 then 0 else sum(TotalCatalogCost) end) end IncludedDiscount, 
--       case case OnSavings when 0 then sum(TotalCatalogCost) else 0 end when 0 then 0 else 1 - (case OnSavings when 0 then sum(TotalBidCost) else 0 end / case OnSavings when 0 then sum(TotalCatalogCost) else 0 end) end ExcludedDiscount, 
       sum(case OnSavings when 0 then 0 else TotalCatalogCost - TotalBidCost end) IncludedSavings,
       sum(case OnSavings when 0 then TotalCatalogCost - TotalBidCost else 0 end) ExcludedSavings,
       case sum(case OnSavings when 0 then 0 else TotalCatalogCost end) when 0 then 0 else sum(case OnSavings when 0 then 0 else TotalCatalogCost - TotalBidCost end) / sum(case OnSavings when 0 then 0 else TotalCatalogCost end) end IncludedDiscount,
       case sum(case OnSavings when 0 then TotalCatalogCost else 0 end) when 0 then 0 else sum(case OnSavings when 0 then TotalCatalogCost - TotalBidCost else 0 end) / sum(case OnSavings when 0 then TotalCatalogCost else 0 end) end ExcludedDiscount
  from Budgets B with (nolock)
  join vw_SavingsDetail2 s1 on s1.BudgetId = B.BudgetId
 group by B.BudgetId, B.Name, B.DistrictId, s1.DistrictName, s1.StateContractDiscount
```
