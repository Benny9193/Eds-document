# Function: table-valued: `dbo.uf_UserTreeBudgetFiltered`

_Generated on 2026-05-04T13:04:24.337Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_UserTreeBudgetFiltered` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2013-11-07 13:18:06 |
| Modified | 2022-02-10 11:16:34 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBudgetId` | IN | int |  |
| 2 | `@pSchoolId` | IN | int |  |
| 3 | `@pApproverId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[uf_UserTreeBudgetFiltered] (@pBudgetId int, @pSchoolId int = 0, @pApproverId int = 0)
returns @UserTable table (
utid int identity (1,1) primary key,
UserId int null index ix1,
DistrictId int null,
ApproverId int null,
ApprovalLevel int null,
Level int null,
Status int null,
BreakOnSchool int null,
SortKey varchar(512) null)
as
begin
declare @Level int,
		@DistrictId int,
		@ApproverLevel int

  select @DistrictId = Budgets.DistrictId
    from Budgets with (nolock)
   where Budgets.BudgetId = @pBudgetId

  select @ApproverLevel = Users.ApprovalLevel
    from Users with (nolock)
   where Users.UserId = @pApproverId

  -- Insert Root Level Users
  insert @UserTable (UserId, DistrictId, ApproverId, ApprovalLevel, Level, BreakOnSchool, SortKey)
    select Users.UserId, Users.DistrictId, null, Users.ApprovalLevel, 1, case isnull(Users.ApprovalLevel,0) when 0 then 1 else 0 end, '/' + right(replicate('0',16) + convert(varchar(16),Users.UserId),16) + '/'
      from Users
      join School on School.SchoolId = Users.SchoolId
                 and School.Active = 1
     where Users.DistrictId = @DistrictId
       and Users.Active = 1
       and (isnull(Users.ApproverId,0) in ( 0, Users.UserId) or Users.UserId = @pApproverId)
       and Users.SchoolId = case @pSchoolId when 0 then Users.SchoolId else @pSchoolId end
     order by users.CometId

  select @Level = 1

  while @Level < 30
  begin
    select @Level = @Level + 1

    -- Insert Users Attached to Root Level Members
    insert @UserTable (UserId, DistrictId, ApproverId, Approvallevel, Level, BreakOnSchool, SortKey)
      select Users.UserId, Users.DistrictId, Users.ApproverId, Users.ApprovalLevel, @Level, 0, ut.SortKey + '/' + right(replicate('0',16) + convert(varchar(16),Users.UserId),16) + '/'
        from @UserTable ut
        join Users on Users.ApproverId = ut.UserId
                  and Users.Active = 1
        join School on School.SchoolId = Users.SchoolId
                   and School.Active = 1
        left outer join @UserTable ut0 on ut0.UserId = Users.UserId
       where ut0.utid is null
         and Users.SchoolId = case @pSchoolId when 0 then Users.SchoolId else @pSchoolId end
       order by Users.CometId

    if @@rowcount = 0
    begin
      break
    end
  end

  -- Insert Users who are not Root Level or Attached to Root Level Users
  insert @UserTable (UserId, DistrictId, ApproverId, ApprovalLevel, Level, Status, BreakOnSchool, SortKey)
    select Users.UserId, Users.DistrictId, Users.ApproverId, Users.ApprovalLevel, 0, 2, 1, '/' + right(replicate('9',16) + convert(varchar(16),users.UserId),16) + '/'
      from Users
      join School on School.SchoolId = Users.SchoolId
                 and School.Active = 1
      left outer join @UserTable ut0 on ut0.UserId = Users.UserId
     where Users.DistrictId = @DistrictId
       and Users.Active = 1
       and Users.SchoolId = case @pSchoolId when 0 then Users.SchoolId else @pSchoolId end
       and ut0.utid is null
     order by Users.CometId

  if @pApproverId != 0 and @ApproverLevel < 2
  begin
    delete @UserTable
     where SortKey not like '%/' + right(replicate('0',16) + convert(varchar(16),@pApproverId),16) + '/%'
  end
  
  return
end
```
