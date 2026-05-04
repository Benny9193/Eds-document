# View: `dbo.vw_SavingsTotals5NJ`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `vw_SavingsTotals_Name` | varchar(30) | YES |  |  |
| 2 | `vw_SavingsTotals_DistrictName` | varchar(189) | YES |  |  |
| 3 | `vw_SavingsTotals_PastYearsCount` | int | YES |  |  |
| 4 | `vw_SavingsTotals_GTSavings` | numeric(38,6) | NO |  |  |
| 5 | `vw_SavingsTotals_CatalogExtended` | numeric(38,6) | NO |  |  |
| 6 | `vw_SavingsTotals_BidExtended` | money | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictCharges` | USER_TABLE |
| [`dbo.vw_SavingsTotals5`](dbo.vw_SavingsTotals5.md) | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_SavingsTotals5NJ]
as
SELECT
     vw_SavingsTotals."Name" AS vw_SavingsTotals_Name,
     vw_SavingsTotals."DistrictName" AS vw_SavingsTotals_DistrictName,
     vw_SavingsTotals."PastYearsCount" AS vw_SavingsTotals_PastYearsCount,
     vw_SavingsTotals."GTSavings" AS vw_SavingsTotals_GTSavings,
     vw_SavingsTotals."CatalogExtended" AS vw_SavingsTotals_CatalogExtended,
     vw_SavingsTotals."BidExtended" AS vw_SavingsTotals_BidExtended
FROM
     "dbo"."vw_SavingsTotals5" vw_SavingsTotals with (nolock)
     inner join Budgets on Budgets.BudgetId = vw_SavingsTotals.BudgetId
                       and Budgets.Name like '2011%'
     inner join District on District.DistrictId = Budgets.DistrictId
                        and District.State = 'NJ'
                        and District.County != 'TEST'
WHERE Budgets.BudgetId = 5535 and
     (select COUNT(*) from DistrictCharges dc with (nolock) where dc.BudgetId = Budgets.BudgetId and dc.active = 1 and dc.ChargeTypeId between 1 and 3) > 0
--order by vw_SavingsTotals."DistrictName", vw_SavingsTotals."BudgetId"
```
