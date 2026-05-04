# Procedure: `dbo.usp_UpdateBudgets`

_Generated on 2026-05-04T13:04:00.766Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_UpdateBudgets` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2019-09-05 09:27:02 |
| Modified | 2019-09-05 09:29:49 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `District` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure [dbo].[usp_UpdateBudgets] as
declare	@StartDate datetime,
	@EndDate datetime

-- Build Start Date
if month(getdate()) >= 7
begin
  select @StartDate = convert(datetime,'07/01/' + convert(char(4),year(getdate()) + 1))
end
else
begin
  select @StartDate = convert(datetime,'07/01/' + convert(char(4),year(getdate())))
end

-- Build End Date
select @EndDate = convert(datetime,'06/30/' + convert(char(4),year(@Startdate) + 1) + ' 23:59:59')

-- Update Existing Rows
Update bc
   set VisibleFrom = dateadd(year,1,bl.VisibleFrom),
       VisibleUntil = dateadd(year,1,bl.VisibleUntil),
	   EditFrom = dateadd(year,1,bl.EditFrom),
	   EditUntil = dateadd(year,1,bl.EditUntil),
	   EarlyAccess = dateadd(year,1,bl.EarlyAccess),
	   AnnualCutoff = dateadd(year,1,bl.AnnualCutoff)
  from Budgets bc
  outer apply (select top 1 *
                 from Budgets
				where Budgets.DistrictId = bc.DistrictId
				  and Budgets.Active = 1
				  and Budgets.Name like cast(cast(substring(bc.Name,1,4) as int) - 1 as char(4)) + '%'
				order by Budgets.Name, Budgets.BudgetId) bl
 where bc.StartDate = @StartDate

-- Create New Budgets as Needed
insert Budgets (DistrictId, Active, Name, StartDate, EndDate, VisibleFrom, VisibleUntil, EditFrom, EditUntil, AnnualCutoff, EarlyAccess)
  select District.DistrictId, 1, convert(char(4),year(@StartDate)) + ' - ' + convert(char(4),year(@EndDate)), @StartDate, @EndDate, convert(datetime,'12/01/' + convert(char(4),year(@StartDate) - 1)), convert(datetime,'12/01/' + convert(char(4),year(@EndDate) - 1)), convert(datetime,'12/01/' + convert(char(4),year(@StartDate) - 1)), convert(datetime,'12/01/' + convert(char(4),year(@EndDate) - 1)), convert(datetime,'10/01/' + convert(char(4),year(@EndDate) - 1)), DATEADD(year,1,Budgets.EarlyAccess)
    from District
    left outer join Budgets on Budgets.DistrictId = District.DistrictId
                           and Budgets.Name like cast(year(@StartDate) as char(4)) + '%'
                           and Budgets.Active = 1
   where District.Active = 1
     and Budgets.BudgetId is null
```
