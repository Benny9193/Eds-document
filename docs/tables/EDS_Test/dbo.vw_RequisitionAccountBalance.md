# View: `dbo.vw_RequisitionAccountBalance`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `AccountCode` | varchar(50) | YES |  |  |
| 3 | `UseAllocations` | int | NO |  |  |
| 4 | `AmountAvailable` | varchar(30) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Accounts` | USER_TABLE |
| `BudgetAccounts` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `UserAccounts` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view [dbo].[vw_RequisitionAccountBalance]
as
select Requisitions.RequisitionId, Accounts.Code AccountCode, 
       case 
		 when BudgetAccounts.UseAllocations is null or BudgetAccounts.UseAllocations = 0 then
		   case
		     when UserAccounts.UseAllocations is null or UserAccounts.UseAllocations = 0 then 0
			 else 1
		   end
		 else 1
	   end UseAllocations,
       case 
		 when BudgetAccounts.UseAllocations is null or BudgetAccounts.UseAllocations = 0 then
		   case
		     when UserAccounts.UseAllocations is null or UserAccounts.UseAllocations = 0 then 'N/A'
			 else 
			   cast(coalesce(UserAccounts.AllocationAvailable,0) as varchar)
		   end
		 else 
		   case
		     when UserAccounts.UseAllocations is null or UserAccounts.UseAllocations = 0 then cast(coalesce(BudgetAccounts.AmountAvailable,0) as varchar)
			 else
			   case
			     when coalesce(BudgetAccounts.AmountAvailable,0) < coalesce(UserAccounts.AllocationAvailable,0) then cast(coalesce(BudgetAccounts.AmountAvailable,0) as varchar)
				 else cast(coalesce(UserAccounts.AllocationAvailable,0) as varchar)
			   end
		   end
	   end AmountAvailable
  from Requisitions
  left outer join BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId
                                and BudgetAccounts.Active = 1
  left outer join UserAccounts on UserAccounts.UserAccountId = Requisitions.UserAccountId
                              and UserAccounts.Active = 1
  left outer join Accounts on Accounts.AccountId = coalesce(UserAccounts.AccountId,BudgetAccounts.AccountId)
--  where Requisitions.RequisitionId = 51630646
```
