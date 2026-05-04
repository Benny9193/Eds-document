# View: `dbo.vw_BillingStatus`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictId` | int | NO |  |  |
| 2 | `Name` | varchar(50) | YES |  |  |
| 3 | `CurrentBudgetId` | int | NO |  |  |
| 4 | `NextBudgetId` | int | NO |  |  |
| 5 | `CurrentEDSAmount` | money | YES |  |  |
| 6 | `CurrentEDSType` | varchar(63) | YES |  |  |
| 7 | `NextEDSAmount` | money | YES |  |  |
| 8 | `NextEDSType` | varchar(50) | YES |  |  |
| 9 | `CurrentRTKAmount` | money | YES |  |  |
| 10 | `CurrentRTKType` | varchar(13) | NO |  |  |
| 11 | `NextRTKAmount` | money | YES |  |  |
| 12 | `CurrentTMAmount` | money | YES |  |  |
| 13 | `NextTMAmount` | money | YES |  |  |
| 14 | `CurrentTMType` | varchar(13) | NO |  |  |
| 15 | `NeedsEDS` | int | NO |  |  |
| 16 | `NeedsRTK` | int | NO |  |  |
| 17 | `NeedsTM` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `ChargeTypes` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictCharges` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
--select * from vw_BillingStatus bs where 'Miss Billed' in (bs.CurrentEDSType, bs.CurrentRTKType, bs.CurrentTMType) order by Name

create   view  [dbo].[vw_BillingStatus] as
select District.DistrictId, 
       District.Name, 
	   CurrentBudget.BudgetId CurrentBudgetId, 
	   NextBudget.BudgetId NextBudgetId, 
	   CurrentEDS.Amount CurrentEDSAmount, 
	   case
	     when District.CooperativeBids = 1 then
		   case
		     when District.ParentDistrictId > 0 then 'Billed under ' + (select pd.Name from District pd where pd.DistrictId = District.ParentDistrictId)
		     when NextEDS.DistrictChargeId is null then 'Needs Billing'
			 else coalesce(CurrentEDSType.Description,'') 
		   end
		 else
		   case
		     when NextEDS.DistrictChargeId is not null then 'Miss Billed'
			 else 'No Coop'
		   end
	   end CurrentEDSType, 
	   NextEDS.Amount NextEDSAmount, 
	   coalesce(NextEDSType.Description,'') NextEDSType, 
	   CurrentRTK.Amount CurrentRTKAmount, 
	   case 
	     when District.RTK = 1 then 
		   case 
		     when NextRTK.ChargeTypeId = 3 then 'Billed' 
			 when NextEDS.ChargeTypeId = 2 then 'Included' 
			 else 'Needs Billing' 
		   end 
		 else
		   case
		     when NextRTK.ChargeTypeId is not null then 'Miss Billed'
			 when NextEDS.ChargeTypeId = 2 then 'Miss Billed'
			 else 'No RTK'
		   end
	   end CurrentRTKType,
	   NextRTK.Amount NextRTKAmount, 
	   CurrentTM.Amount CurrentTMAmount, 
	   NextTM.Amount NextTMAmount,
	   case
	     when District.TimeAndMaterialBids = 1 then
		   case
		     when CurrentTM.ChargeTypeId is null then 'Needs Billing'
			 else 'Billed'
		   end
		 else
		   case 
		     when CurrentTM.ChargeTypeId is not null then 'Miss Billed'
			 else 'No T&M'
		   end
	   end CurrentTMType,
	   case 
	     when coalesce(District.ParentDistrictId,0) = 0
             and NextEDS.DistrictChargeId is null then 1 
		 else 0 
	   end NeedsEDS,
	   case
	     when District.RTK = 1 
		  and not (   NextRTK.DistrictChargeId is not null 
			         or coalesce(NextEDS.ChargeTypeId,0) = 2) then 1
		 else 0
	   end NeedsRTK,
	   case
	     when District.TimeAndMaterialBids = 1
		  and NextTM.ChargeTypeId is null then 1
		 else 0
	   end NeedsTM
  from District
  join Budgets CurrentBudget on CurrentBudget.DistrictId = District.DistrictId
                            and CurrentBudget.Active = 1
			                and dateadd(year,0,getdate()) between CurrentBudget.StartDate and CurrentBudget.EndDate
  join Budgets NextBudget on NextBudget.DistrictId = District.DistrictId
                         and NextBudget.Active = 1
			             and dateadd(year,1,getdate()) between NextBudget.StartDate and NextBudget.EndDate
  join Budgets PrevBudget on PrevBudget.DistrictId = District.DistrictId
                         and PrevBudget.Active = 1
			             and dateadd(year,-1,getdate()) between PrevBudget.StartDate and PrevBudget.EndDate
  left outer join DistrictCharges CurrentEDS on CurrentEDS.DistrictId = District.DistrictId
                                            and CurrentEDS.BudgetId = CurrentBudget.BudgetId
											and CurrentEDS.ChargeTypeId in (1,2)
  left outer join ChargeTypes CurrentEDSType on CurrentEDSType.ChargeTypeId = CurrentEDS.ChargeTypeId
  left outer join DistrictCharges NextEDS on NextEDS.DistrictId = District.DistrictId
                                         and NextEDS.BudgetId = NextBudget.BudgetId
										 and NextEDS.ChargeTypeId in (1,2)
										 and NextEDS.ChargeTypeId = case when CurrentEDS.ChargeTypeId is not null then CurrentEDS.ChargeTypeId else NextEDS.ChargeTypeId end
  left outer join ChargeTypes NextEDSType on NextEDSType.ChargeTypeId = NextEDS.ChargeTypeId
  left outer join DistrictCharges CurrentRTK on CurrentRTK.DistrictId = District.DistrictId
                                            and CurrentRTK.BudgetId = CurrentBudget.BudgetId
											and CurrentRTK.ChargeTypeId = 3
  left outer join DistrictCharges NextRTK on NextRTK.DistrictId = District.DistrictId
                                         and NextRTK.BudgetId = NextBudget.BudgetId
										 and NextRTK.ChargeTypeId = 3
										 and District.RTK = 1
  left outer join DistrictCharges CurrentTM on CurrentTM.DistrictId = District.DistrictId
                                            and CurrentTM.BudgetId = PrevBudget.BudgetId
											and CurrentTM.ChargeTypeId = 6
  left outer join DistrictCharges NextTM on NextTM.DistrictId = District.DistrictId
                                         and NextTM.BudgetId = CurrentBudget.BudgetId
										 and NextTM.ChargeTypeId = 6
										 and District.TimeAndMaterialBids = 1
 where District.Active = 1
   and District.County != 'TEST'
   and coalesce(District.State,'') != ''
   and coalesce(District.DistrictCode,'') != ''
```
