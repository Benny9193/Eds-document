# View: `dbo.cvw_Savings`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BudgetId` | int | NO |  |  |
| 2 | `BudgetName` | varchar(30) | YES |  |  |
| 3 | `DistrictId` | int | YES |  |  |
| 4 | `DistrictName` | varchar(189) | YES |  |  |
| 5 | `CYDollars` | varchar(30) | YES |  |  |
| 6 | `CYIncludedDollars` | varchar(30) | YES |  |  |
| 7 | `CYIncludedPercent` | int | YES |  |  |
| 8 | `CYExcludedDollars` | varchar(30) | YES |  |  |
| 9 | `GTDollars` | varchar(30) | YES |  |  |
| 10 | `GTYears` | int | NO |  |  |
| 11 | `PricePlanCode` | varchar(20) | YES |  |  |
| 12 | `County` | varchar(50) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictPP` | USER_TABLE |
| `PricePlans` | USER_TABLE |
| `YearlyTotals` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[cvw_Savings] as
select BudgetId, Name as BudgetName, DistrictId, DistrictName, 
       left(CONVERT(varchar,CYDollars,1),LEN(CONVERT(varchar,CYDollars,1))-3) CYDollars,
       LEFT(convert(varchar,CYIncludedDollars,1),LEN(convert(varchar,CYIncludedDollars,1))-3) CYIncludedDollars,
       CYIncludedPercent,
       LEFT(convert(varchar,CYExcludedDollars,1),LEN(convert(varchar,CYExcludedDollars,1))-3) CYExcludedDollars,
       LEFT(convert(varchar,GTDollars,1),len(convert(varchar,GTDollars,1))-3) GTDollars,
       GTYears,
       (select top 1 PricePlans.Code
          from PricePlans with (nolock)
          join DistrictPP on DistrictPP.PricePlanId = PricePlans.PricePlanId
                         and DistrictPP.DistrictId = s1.DistrictId
          join BidHeaders on BidHeaders.PricePlanId = PricePlans.PricePlanId
                         and BidHeaders.Active = 1
                         and GETDATE() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
                         and BidHeaders.CategoryId = 4
         order by PricePlans.PricePlanId) PricePlanCode,
       s1.County
  from (
	select yt.*,
		   cast(cast(isnull(yt.OverallSavings,0) as int) as money) CYDollars,
		   cast(cast(isnull(yt.IncludedSavings,0) as int) as money) CYIncludedDollars,
		   cast(isnull(yt.IncludedDiscount,0) * 100 as int) CYIncludedPercent,
		   cast(CAST(isnull(yt.ExcludedSavings,0) as int) as money) CYExcludedDollars,
		   cast(cast(isnull((select sum(yt5.OverallSavings) 
			                  from YearlyTotals yt5 with (nolock) 
			                 where yt5.DistrictId = yt.DistrictId 
			                   and cast(substring(yt5.Name,1,4) as int) between YEAR(getdate())-5 and year(getdate())-1),0) as int) as money) GTDollars,
		   isnull((select count(*)
			         from (
        			   select cast(substring(yt5.Name,1,4) as int) [Year]
				         from YearlyTotals yt5 with (nolock) 
				        where yt5.DistrictId = yt.DistrictId 
				          and cast(substring(yt5.Name,1,4) as int) between YEAR(getdate())-5 and year(getdate())-1
				        group by cast(substring(yt5.Name,1,4) as int) ) ss ),0) GTYears,
		   isnull(District.County,'') County
	  from YearlyTotals yt with (nolock)
	  join Budgets on Budgets.BudgetId = yt.BudgetId
				  and cast(substring(Budgets.Name,1,4) as int) = YEAR(getdate()) - 1
	  join District on District.DistrictId = Budgets.DistrictId
--				   and District.State = 'NJ'
				   and District.Active = 1
        ) s1
```
