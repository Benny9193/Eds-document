# Procedure: `dbo.sp_BringBillingForward`

_Generated on 2026-05-04T13:07:57.362Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_BringBillingForward` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2015-02-04 12:01:19 |
| Modified | 2025-12-08 11:57:53 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@increasePercentage` | IN | decimal(11,5) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `ChargeTypes` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `DistrictCharges` | USER_TABLE |  |
| `DistrictProposedCharges` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--exec sp_BringBillingForward 0.0
CREATE   procedure [dbo].[sp_BringBillingForward] @increasePercentage decimal(11,5) as
insert Budgets (Active, DistrictId, EndDate, Name, StartDate, VisibleFrom, VisibleUntil, EditFrom, EditUntil, AnnualCutoff, EarlyAccess)
select 1, District.DistrictId, 
       DATEADD(year,1,bc.EndDate),
       cast(CAST(substring(bc.Name,1,4) as int) + 1 as varchar) + ' - ' + cast(CAST(substring(bc.Name,1,4) as int) + 2 as varchar),
       DATEADD(year,1,bc.StartDate), DATEADD(year,1,bc.VisibleFrom), DATEADD(year,1,bc.VisibleUntil),
       DATEADD(year,1,bc.EditFrom), DATEADD(YEAR,1,bc.EditUntil), DATEADD(year,1,bc.AnnualCutoff), DATEADD(year,1,bc.EarlyAccess)
  from District
  join Budgets bc on bc.DistrictId = District.DistrictId
                  and cast(substring(bc.Name,1,4) as int) = case when month(getdate()) between 8 and 12 then year(getdate()) + 1 else year(getdate()) end
  left outer join Budgets bn on bn.DistrictId = District.DistrictId
                             and cast(substring(bn.Name,1,4) as int) = cast(substring(bc.Name,1,4) as int) + 1
 where District.Active = 1
   and bn.BudgetId is null

insert DistrictProposedCharges (Amount, BudgetId, ChargeTypeId, DateUpdated, DistrictId, Frequency, FrequencyData, ChangePercentage)
select dc.Amount + round(dc.Amount * 0 / 100,-1), 
       bn.BudgetId, dc.ChargeTypeId, GETDATE(), District.DistrictId, 
       dc.Frequency, dc.FrequencyData, case when isnull(dc.Amount,0) = 0 then 0 else round(dc.Amount * 0 / 100,-1) / dc.Amount end
  from District
  join Budgets bc on bc.DistrictId = District.DistrictId
                 and cast(substring(bc.Name,1,4) as int) = case when month(getdate()) between 8 and 12 then year(getdate()) + 1 else year(getdate()) end
  join DistrictCharges dc on dc.BudgetId = bc.BudgetId
  join ChargeTypes on ChargeTypes.ChargeTypeId = dc.ChargeTypeId
--                  and (isnull(ChargeTypes.LM,0) = 1 or isnull(ChargeTypes.RTK,0) = 1)
  join Budgets bn on bn.DistrictId = District.DistrictId
--                  and cast(substring(bn.Name,1,4) as int) = YEAR(getdate()) + 1
                 and cast(substring(bn.Name,1,4) as int) = cast(substring(bc.Name,1,4) as int) + 1
  left outer join DistrictProposedCharges ndc on ndc.BudgetId = bn.BudgetId
                                     and ndc.ChargeTypeId = dc.ChargeTypeId
 where District.Active = 1
   and ndc.Id is null
-- order by DIstrict.Name
/*
select District.Name, District.AccountingDistrictCode, chargeTypes.Description, dc.Amount, dc13.Amount
--select sum(dc13.Amount - dc.Amount), sum(dc.Amount), sum(dc13.Amount)
  from District
  left outer join Budgets bn on bn.DistrictId = District.DistrictId
--                             and cast(substring(bn.Name,1,4) as int) = YEAR(getdate()) + 1
                            and cast(substring(bn.Name,1,4) as int) = case when month(getdate()) between 10 and 12 then year(getdate()) + 1 else year(getdate()) end + 1
  left outer join DistrictCharges dc13 on dc13.BudgetId = bn.BudgetId
                                      and dc13.ChargeTypeId between 1 and 3
  left outer join Budgets bc on bc.DistrictId = District.DistrictId
                            and cast(substring(bc.Name,1,4) as int) = case when month(getdate()) between 10 and 12 then year(getdate()) + 1 else year(getdate()) end
  left outer join DistrictCharges dc on dc.BudgetId = bc.BudgetId
                                    and isnull(dc.ChargeTypeId,0) = isnull(dc13.ChargeTypeId,0)
  left outer join ChargeTypes on ChargeTypes.ChargeTypeId = coalesce(dc.chargetypeid,dc13.chargetypeid)
 where District.Active = 1
   and ISNULL(dc.amount,0) != ISNULL(dc13.Amount,0)
 order by District.Name
*/

insert DistrictCharges (Active, Amount, BudgetId, ChargeDate, ChargeTypeId, DateUpdated, DistrictId, Frequency, FrequencyData, Repeats)
select 1, dc.Amount, bn.BudgetId, isnull(DATEADD(year,1,dc.ChargeDate),CAST('05/01/' + cast(year(getdate()) as char(4)) as datetime)), dc.ChargeTypeId, GETDATE(), District.DistrictId, 
       dc.Frequency, dc.FrequencyData, dc.Repeats--, bc.Name, bn.Name
  from District
  join Budgets bc on bc.DistrictId = District.DistrictId
                 and cast(substring(bc.Name,1,4) as int) = case when month(getdate()) between 8 and 12 then year(getdate()) + 1 else year(getdate()) end
--                  and cast(substring(bc.Name,1,4) as int) = YEAR(getdate()) - 1
  join DistrictCharges dc on dc.BudgetId = bc.BudgetId
  join ChargeTypes on ChargeTypes.ChargeTypeId = dc.ChargeTypeId
--                  and not (isnull(ChargeTypes.LM,0) = 1 or isnull(ChargeTypes.RTK,0) = 1)
  join Budgets bn on bn.DistrictId = District.DistrictId
                 and cast(substring(bn.Name,1,4) as int) = case when month(getdate()) between 8 and 12 then year(getdate()) + 1 else year(getdate()) end + 1
--                  and cast(substring(bn.Name,1,4) as int) = YEAR(getdate())
  left outer join DistrictCharges ndc on ndc.BudgetId = bn.BudgetId
                                     and ndc.ChargeTypeId = dc.ChargeTypeId
 where District.Active = 1
   and ndc.DistrictChargeId is null
```
