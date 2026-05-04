# Procedure: `dbo.usp_GetNextPONumber`

_Generated on 2026-05-04T13:04:24.366Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_GetNextPONumber` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2019-04-09 14:29:29 |
| Modified | 2024-04-12 10:46:12 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDistrictId` | IN | int |  |
| 2 | `@pBudgetId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `NextNumber` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure [dbo].[usp_GetNextPONumber] @pDistrictId int, @pBudgetId int
as
begin
declare @NextNumberId int
set Nocount on

-- Find Current Entry
select @NextNumberId = NextNumberId
  from NextNumber
 where DistrictId = @pDistrictId
   and BudgetId = @pBudgetId
   and IDType = 'P'

-- No Current Entry Available
if @@rowcount = 0
begin
    -- User Prior Year as Reference base
	insert NextNumber(DistrictId, BudgetId, IDType, Prefix, Suffix, NextNumber, SuppressLZ, NumberLength, ActualNumber)
  	  select top 1 NextNumber.DistrictId, @pBudgetId, 'P', NextNumber.Prefix, NextNumber.Suffix, 1, NextNumber.SuppressLZ, NextNumber.NumberLength, NextNumber.ActualNumber
		from NextNumber
		join Budgets on Budgets.BudgetId = NextNumber.BudgetId
		            and Budgets.Active = 1
		join Budgets cb on cb.DistrictId = Budgets.DistrictId
		               and cb.Active = 1
					   and cb.BudgetId = @pBudgetId
	   where NextNumber.DistrictId = @pDistrictId
	     and NextNumber.IDType = 'P'
	     and cast(left(Budgets.Name,4) as int) < cast(left(cb.Name,4) as int)
	   order by cast(left(Budgets.Name,4) as int) desc

	-- See if there is a Previous Entry
	if @@rowcount = 0
	begin
		-- Create Default values for District and Budget
		insert NextNumber(DistrictId, BudgetId, IDType, Prefix, Suffix, NextNumber, SuppressLZ, NumberLength, ActualNumber)
		  values(@pDistrictId, @pBudgetId, 'P', '', '', 1, 0, 6, 1)
	end

	-- Save Pointer to New Record
	select @NextNumberId = Scope_Identity()
end

set nocount off
-- Return Formated Number
select NextNumberId, Prefix, Suffix, right(case when isnull(SuppressLZ,0) = 1 then cast(NextNumber as varchar(50)) else replicate('0',NumberLength) + cast(NextNumber as varchar(50)) end,NumberLength) Nextnumber, NumberLength, isnull(SuppressLZ,0) SuppressLZ, isnull(ActualNumber,0) ActualNumber
  from NextNumber
 where NextNumberId = @NextNumberId

end
```
