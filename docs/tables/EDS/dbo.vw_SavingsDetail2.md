# View: `dbo.vw_SavingsDetail2`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BudgetId` | int | NO |  |  |
| 2 | `DistrictId` | int | YES |  |  |
| 3 | `CategoryId` | int | NO |  |  |
| 4 | `OnSavings` | int | NO |  |  |
| 5 | `DistrictName` | varchar(189) | YES |  |  |
| 6 | `CategoryName` | varchar(50) | YES |  |  |
| 7 | `UniqueItems` | int | YES |  |  |
| 8 | `TotalItems` | int | YES |  |  |
| 9 | `TotalBidCost` | money | YES |  |  |
| 10 | `TotalCatalogCost` | numeric(38,6) | YES |  |  |
| 11 | `TotalStateContractCost` | numeric(38,6) | YES |  |  |
| 12 | `StateContractDiscount` | decimal(13,9) | YES |  |  |
| 13 | `OverallSavings` | numeric(38,6) | YES |  |  |
| 14 | `OverallDiscount` | numeric(38,17) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `vw_SavingsDetail1` | VIEW |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_SavingsTotals`](dbo.vw_SavingsTotals.md) | VIEW |
| [`dbo.vw_SavingsTotals5`](dbo.vw_SavingsTotals5.md) | VIEW |
| [`dbo.vw_SavingsTotals5Test`](dbo.vw_SavingsTotals5Test.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_SavingsDetail2] as
    select B1.BudgetId, B1.DistrictId, CategoryId, isnull(OnSavingsReport,0) OnSavings, DistrictName, CategoryName, 
		   count(ItemCode) UniqueItems, sum(Quantity) TotalItems, sum(BidExtended) TotalBidCost,
		   sum(CatalogExtended) TotalCatalogCost, sum(StateContractCost) TotalStateContractCost, 
		   StateContractDiscount, 
		   sum(/*StateContractCost*/CatalogExtended - BidExtended) OverallSavings, 
		   case isnull(sum(CatalogExtended),0) when 0 then 0 else 1 - (sum(BidExtended) / sum(CatalogExtended)) end OverallDiscount --,
	  from Budgets B1 with (nolock)
	  join vw_SavingsDetail1 ss on ss.BudgetId = B1.BudgetId and ss.Discount < .95
	 group by B1.BudgetId, B1.DistrictId, CategoryId, OnSavingsReport, DistrictName, CategoryName, StateContractDiscount
```
