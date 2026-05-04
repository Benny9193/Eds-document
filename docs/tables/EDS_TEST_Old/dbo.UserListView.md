# View: `dbo.UserListView`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SchoolName` | varchar(50) | YES |  |  |
| 2 | `UserNumber` | int | YES |  |  |
| 3 | `UserName` | varchar(50) | YES |  |  |
| 4 | `Password` | varchar(11) | NO |  |  |
| 5 | `Attention` | varchar(50) | YES |  |  |
| 6 | `DistrictAccountingCode` | varchar(20) | NO |  |  |
| 7 | `ShipLocation` | varchar(50) | NO |  |  |
| 8 | `LocationCode` | varchar(32) | NO |  |  |
| 9 | `AccountCode` | varchar(50) | NO |  |  |
| 10 | `AllocationAmount` | money | NO |  |  |
| 11 | `AllocationAvailable` | numeric(19,4) | NO |  |  |
| 12 | `UseAllocations` | tinyint | NO |  |  |
| 13 | `ApproverName` | varchar(50) | NO |  |  |
| 14 | `SessionId` | int | NO |  |  |
| 15 | `SchoolId` | int | NO |  |  |
| 16 | `Email` | varchar(255) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Accounts` | USER_TABLE |
| `BudgetAccounts` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `School` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `ShipLocations` | USER_TABLE |
| `UserAccounts` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[UserListView] as
select School.Name SchoolName, Users.CometId UserNumber, Users.UserName, '<Encrypted>' Password, Users.Attention, isnull(Users.DistrictAcctgCode,'') DistrictAccountingCode, isnull(ShipLocations.Name,'') ShipLocation, isnull(ShipLocations.LocationCode,'') LocationCode, isnull(Accounts.Code,'') AccountCode, 
       isnull(UserAccounts.AllocationAmount,0) AllocationAmount, 
       case isnull(UserAccounts.UseAllocations,0) 
         when 0 then case
                       when isnull(BudgetAccounts.AmountAvailable,0) > 9999999.99  then 9999999.99 
                       else isnull(BudgetAccounts.AmountAvailable,0)
                     end
         else case isnull(BudgetAccounts.UseAllocations,0)
                when 0 then isnull(UserAccounts.AllocationAvailable,0) 
                else case
                       when isnull(BudgetAccounts.AmountAvailable,0) > isnull(UserAccounts.AllocationAvailable,0) then isnull(UserAccounts.AllocationAvailable,0)
                       else isnull(BudgetAccounts.AmountAvailable,0)
                     end
              end
       end AllocationAvailable, 
       isnull(UserAccounts.UseAllocations,0) UseAllocations, isnull(Approvers.Attention,'') ApproverName, SessionTable.SessionId,
       School.SchoolId,
       Users.Email
  from SessionTable with (nolock)
  join Budgets on Budgets.BudgetId = SessionTable.BudgetId
  join Users on Users.DistrictId = Budgets.DistrictId
            and Users.Active = 1
  join School on School.SchoolId = Users.SchoolId
  left outer join ShipLocations on ShipLocations.ShippingId = Users.ShippingId
  left outer join UserAccounts on UserAccounts.UserId = Users.UserId
                              and UserAccounts.Active = 1
                              and UserAccounts.BudgetId = Budgets.BudgetId
  left outer join BudgetAccounts on BudgetAccounts.BudgetAccountId = UserAccounts.UserAccountId
  left outer join Accounts on Accounts.AccountId = UserAccounts.AccountId
  left outer join Users Approvers on Approvers.UserId = Users.ApproverId
 where SessionTable.SessionEnd is null
```
