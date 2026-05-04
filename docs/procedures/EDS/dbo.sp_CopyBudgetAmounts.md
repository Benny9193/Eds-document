# Procedure: `dbo.sp_CopyBudgetAmounts`

_Generated on 2026-05-04T13:04:24.090Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CopyBudgetAmounts` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2013-12-05 07:37:52 |
| Modified | 2013-12-05 09:17:04 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@sourceBudgetId` | IN | int |  |
| 2 | `@destBudgetId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BudgetAccounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--exec sp_CopyBudgetAmounts  6477,7144
CREATE procedure dbo.sp_CopyBudgetAmounts @sourceBudgetId int, @destBudgetId int as 
begin transaction
declare @sourceDistrictId int,
		@destDistrictId int

--get Source District		
select @sourceDistrictId = DistrictId
  from Budgets
 where Budgets.BudgetId = @sourceBudgetId

--get Destination District
select @destDistrictId = DistrictId
  from Budgets
 where Budgets.BudgetId = @destBudgetId

--check for match
if ISNULL(@sourceDistrictId,0) != ISNULL(@destDistrictId,0)
begin
	raiserror('Districts do not match!',16,1)
	rollback
	return
end

--unlink requisitions tied to BudgetAccounts/UserAccounts that will be deleted
update Requisitions
   set UserAccountId = null,
       BudgetAccountId = null,
       AccountCode = ''
--select *
  from Requisitions
 where Requisitions.BudgetId = @destBudgetId
   and (Requisitions.UserAccountId in (
			select uad.UserAccountId
			  from UserAccounts uad
			  left outer join UserAccounts uas on uas.UserId = uad.UserId
						                      and uas.AccountId = uad.AccountId
									          and uas.Active = 1
			                                  and uas.BudgetId = @sourceBudgetId
			 where uad.BudgetId = @destBudgetId
			   and uad.Active = 1  
			   and uas.UserAccountId is null)
        or Requisitions.BudgetAccountId in (
			select bad.BudgetAccountId
			  from BudgetAccounts bad
			  left outer join BudgetAccounts bas on bas.AccountId = bad.AccountId
							                    and bas.Active = 1
										        and bas.BudgetId = @sourceBudgetId
			 where bad.BudgetId = @destBudgetId
			   and bad.Active = 1  
			   and bas.BudgetAccountId is null))

--remove UserAccounts that are not in prior(Source) year
delete uad
--select *
  from UserAccounts uad
  left outer join UserAccounts uas on uas.UserId = uad.UserId
                                  and uas.AccountId = uad.AccountId
                                  and uas.Active = 1
                                  and uas.BudgetId = @sourceBudgetId
 where uad.BudgetId = @destBudgetId
   and uad.Active = 1
   and uas.UserAccountId is null
   
--remove BudgetAccounts that are not in prior(Source) year
delete bad
--select *
  from BudgetAccounts bad
  left outer join BudgetAccounts bas on bas.AccountId = bad.AccountId
                                    and bas.Active = 1
                                    and bas.BudgetId = @sourceBudgetId
 where bad.BudgetId = @destBudgetId
   and bad.Active = 1  
   and bas.BudgetAccountId is null
   
--add missing BudgetAccounts to current (Dest) year
insert BudgetAccounts(Active, BudgetId, AccountId, BudgetAmount, UseAllocations)
select 1, @destBudgetId, bas.AccountId, bas.BudgetAmount, bas.UseAllocations
  from BudgetAccounts bas
  left outer join BudgetAccounts bad on bad.AccountId = bas.AccountId
                                    and bad.Active = 1
                                    and bad.BudgetId = @destBudgetId
 where bas.BudgetId = @sourceBudgetId
   and bas.Active = 1
   and bad.BudgetAccountId is null
   
--add missing UserAccounts to current (Dest) year
insert UserAccounts(Active, BudgetId, AccountId, UserId, BudgetAccountId, AllocationAmount, UseAllocations)
select 1, @destBudgetId, uas.AccountId, uas.UserId, ba.BudgetAccountId, uas.AllocationAmount, uas.UseAllocations
  from UserAccounts uas
  join BudgetAccounts ba on ba.BudgetId = @destBudgetId
                        and ba.AccountId = uas.AccountId
                        and ba.Active = 1
  left outer join UserAccounts uad on uad.UserId = uas.UserId
                                  and uad.AccountId = uas.AccountId
                                  and uad.Active = 1
                                  and uad.BudgetId = @destBudgetId
 where uas.BudgetId = @sourceBudgetId
   and uas.Active = 1
   and uad.UserAccountId is null

--update Budget Amounts from prior(Source) year to current(Dest) year
update bad
   set BudgetAmount = bas.BudgetAmount,
       UseAllocations = bas.UseAllocations
--select *
  from BudgetAccounts bas
  join BudgetAccounts bad on bad.AccountId = bas.AccountId
                         and bad.Active = 1
                         and bad.BudgetId = @destBudgetId
 where bas.BudgetId = @sourceBudgetId
   and bas.Active = 1

--update User Amounts from prior(Source) year to current(Dest) year
update uad
   set AllocationAmount = uas.AllocationAmount,
       UseAllocations = uas.UseAllocations
--select *
  from UserAccounts uas
  join UserAccounts uad on uad.UserId = uas.UserId
                       and uad.AccountId = uas.AccountId
                       and uad.Active = 1
                       and uad.BudgetId = @destBudgetId
 where uas.BudgetId = @sourceBudgetId
   and uas.Active = 1

--update Requisitions to update balanaces
update Requisitions
   set TotalRequisitionCost = TotalRequisitionCost
--select *
  from Requisitions
 where BudgetId = @destBudgetId
 
--done
--rollback
commit transaction
```
