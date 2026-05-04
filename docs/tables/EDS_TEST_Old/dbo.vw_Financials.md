# View: `dbo.vw_Financials`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictId` | int | YES |  |  |
| 2 | `BudgetId` | int | NO |  |  |
| 3 | `Description` | varchar(50) | YES |  |  |
| 4 | `dcId` | uniqueidentifier | YES |  |  |
| 5 | `Status` | varchar(13) | NO |  |  |
| 6 | `Received` | datetime | YES |  |  |
| 7 | `SignedBy` | varchar(255) | YES |  |  |
| 8 | `Comments` | varchar(4096) | YES |  |  |
| 9 | `DistrictChargeId` | int | YES |  |  |
| 10 | `Amount` | money | YES |  |  |
| 11 | `FrequencyData` | varchar(50) | YES |  |  |
| 12 | `dpcId` | uniqueidentifier | YES |  |  |
| 13 | `ProposedAmount` | money | YES |  |  |
| 14 | `PreviousAmount` | money | YES |  |  |
| 15 | `BillMonths` | varchar(8000) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `ChargeTypes` | USER_TABLE |
| `DistrictCharges` | USER_TABLE |
| `DistrictContinuances` | USER_TABLE |
| `DistrictProposedCharges` | USER_TABLE |
| `Months` | USER_TABLE |
| `dbo.ufn_RegExSplit` | unresolved |
| [`master.dbo.ufn_RegExSplit`](../master/dbo.ufn_RegExSplit.md) | cross-database |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view [dbo].[vw_Financials]
as
select Budgets.DistrictId, Budgets.BudgetId, ct.Description, DistrictContinuances.Id dcId, 
       case isnull(DistrictContinuances.Status,'')
	     when 'A' then 'Accepted'
		 when 'R' then 'Rejected'
		 when 'P' then
		   case 
		     when dc.DistrictChargeId is null then 'Pending'
		     else 'Auto Accepted'
		   end
		 when '' then ''
		 else 'Unknown'
	   end Status , 
	   DistrictContinuances.Received, DistrictContinuances.SignedBy, DistrictContinuances.Comments, dc.DistrictChargeId, dc.Amount Amount, 
	   coalesce(dc.FrequencyData, dpc.FrequencyData,'') FrequencyData, dpc.Id dpcId, dpc.Amount ProposedAmount, dpc.PreviousAmount,
	   BillMonths.Months BillMonths
  from Budgets
  join ChargeTypes ct on ct.Active = 1
  left outer join DistrictContinuances on DistrictContinuances.DistrictId = Budgets.DistrictId
					   	              and DistrictContinuances.BudgetId = Budgets.BudgetId
--									  and (ct.LM = 1 or ct.RTK = 1)
  outer apply (select top 100 *
                 from DistrictCharges 
				where DistrictCharges.BudgetId = Budgets.BudgetId
				  and DistrictCharges.ChargeTypeId = ct.ChargeTypeId
				order by DistrictCharges.ChargeTypeId) dc
  outer apply (select top 100 *
                 from DistrictProposedCharges
			    where DistrictProposedCharges.BudgetId = Budgets.BudgetId
				  and DistrictProposedCharges.ChargeTypeId = ct.ChargeTypeId
				  and (   dc.DistrictChargeId is null
				       or (    dc.DistrictChargeId is not null
					       and dc.ChargeTypeId = DistrictProposedCharges.ChargeTypeId))
				order by DistrictProposedCharges.DateUpdated) dpc
  outer apply (select string_agg(Months.MonthName,', ') Months 
                 from master.dbo.ufn_RegExSplit(coalesce(dc.FrequencyData,dpc.FrequencyData),',',1) ml 
				 join Months on Months.MonthId = case when ml.Match < 6 then cast(ml.Match as int) + 6 else cast(ml.Match as int) - 6 end) BillMonths
 where dc.DistrictChargeId is not null
    or dpc.Id is not null
```
