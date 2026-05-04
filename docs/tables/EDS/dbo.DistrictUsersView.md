# View: `dbo.DistrictUsersView`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictCode` | varchar(4) | YES |  |  |
| 2 | `DistrictName` | varchar(50) | YES |  |  |
| 3 | `SchoolName` | varchar(50) | YES |  |  |
| 4 | `UserName` | varchar(10) | YES |  |  |
| 5 | `CometCode` | varchar(5) | YES |  |  |
| 6 | `Attention` | varchar(50) | YES |  |  |
| 7 | `ApprovalLevel` | tinyint | YES |  |  |
| 8 | `ApproveeCount` | int | YES |  |  |
| 9 | `ApproverName` | varchar(50) | YES |  |  |
| 10 | `PriorReqs` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `District` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `School` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[DistrictUsersView] as
select District.DistrictCode, District.Name DistrictName, School.Name SchoolName, Users.UserName, 
       right('00000' + convert(varchar(16),Users.CometId),5) CometCode, rtrim(Users.Attention) Attention, Users.ApprovalLevel, 
       (select count(*) from Users u1 with (nolock) where u1.ApproverId = Users.ApproverId and u1.Active = 1) ApproveeCount, 
       (select u1.Attention from Users u1 with (nolock) where u1.UserId = Users.ApproverId) ApproverName, 
       (select isnull(count(*),0) from Requisitions with (nolock) join Users on Users.UserId = Requisitions.UserId join Budgets on Budgets.BudgetId = Requisitions.BudgetId and dateadd(year,1,getdate()) between case when ISNULL(Users.AllowEarlyAccess,0) = 1 or isnull(Users.ApprovalLevel,0) > 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else Budgets.VisibleFrom end and Budgets.VisibleUntil where Requisitions.UserId = Users.UserId) PriorReqs
  from District with (nolock)
  join School on School.DistrictId = District.DistrictId
             and School.Active = 1
  join Users on Users.SchoolId = School.SchoolId
            and Users.Active = 1
```
