# Function: table-valued: `dbo.uf_UserTreeApprover`

_Generated on 2026-05-04T13:04:00.656Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_UserTreeApprover` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2013-04-05 12:40:10 |
| Modified | 2013-04-05 12:40:10 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pApproverId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `School` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE     function [dbo].[uf_UserTreeApprover] (@pApproverId int)
returns @UserTable table (
utid int identity (1,1) primary key,
UserId int null,
ApproverId int null,
ApprovalLevel int null,
Level int null,
Status int null,
BreakOnSchool int null,
SortKey varchar(512) null)
as
begin
declare @Level int,
		@DistrictId int

  -- Get Base Info
  select @DistrictId = DistrictId
    from Users
   where UserId = @pApproverId
   
  -- Insert Root Level Users
  insert @UserTable (UserId, ApproverId, ApprovalLevel, Level, BreakOnSchool, SortKey)
    select Users.UserId, Users.ApproverId, Users.ApprovalLevel, 1, case isnull(Users.ApprovalLevel,0) when 0 then 1 else 0 end, right(replicate('0',16) + convert(varchar(16),Users.UserId),16)
      from Users
      join School on School.SchoolId = Users.SchoolId
                 and School.Active = 1
     where Users.UserId = @pApproverId
     order by users.CometId

  select @Level = 1

  while @Level < 30
  begin
    select @Level = @Level + 1

    -- Insert Users Attached to Root Level Members
    insert @UserTable (UserId, ApproverId, Approvallevel, Level, BreakOnSchool, SortKey)
      select Users.UserId, Users.ApproverId, Users.ApprovalLevel, @Level, 0, ut.SortKey + right(replicate('0',16) + convert(varchar(16),Users.UserId),16)
        from @UserTable ut
        join Users on Users.ApproverId = ut.UserId
                  and Users.Active = 1
        join School on School.SchoolId = Users.SchoolId
                   and School.Active = 1
        left outer join @UserTable ut0 on ut0.UserId = Users.UserId
       where ut0.utid is null
       order by Users.CometId

    if @@rowcount = 0
    begin
      break
    end
  end

  -- Insert Users who are not Root Level or Attached to Root Level Users
  insert @UserTable (UserId, ApproverId, ApprovalLevel, Level, Status, BreakOnSchool, SortKey)
    select Users.UserId, Users.ApproverId, Users.ApprovalLevel, 0, 2, 1, right(replicate('9',16) + convert(varchar(16),users.UserId),16)
      from Users
      join School on School.SchoolId = Users.SchoolId
                 and School.Active = 1
      left outer join @UserTable ut0 on ut0.UserId = Users.UserId
     where Users.DistrictId = @DistrictId
       and Users.Active = 1
       and ut0.utid is null
     order by Users.CometId

  return
end
```
