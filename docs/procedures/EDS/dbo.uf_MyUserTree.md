# Function: table-valued: `dbo.uf_MyUserTree`

_Generated on 2026-05-04T13:04:24.289Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_MyUserTree` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2012-12-17 18:51:56 |
| Modified | 2012-12-17 19:00:03 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pUserId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `School` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--select * from uf_MyUserTree(237168)

CREATE function [dbo].[uf_MyUserTree] (@pUserId int)
returns @UserTable table (
utid int identity (1,1) primary key,
UserId int null,
ApproverId int null,
ApprovalLevel int null,
Level int null,
Status int null,
SortKey varchar(512) null)
as
begin
declare @Level int

  -- Insert Root Level Users
  insert @UserTable (UserId, ApproverId, ApprovalLevel, Level, SortKey)
    select Users.UserId, Users.ApproverId, Users.ApprovalLevel, 1, right(replicate('0',16) + convert(varchar(16),Users.UserId),16)
      from Users
      join School on School.SchoolId = Users.SchoolId
                 and School.Active = 1
     where Users.ApproverId = @pUserId
       and Users.Active = 1
     order by users.CometId

  select @Level = 1

  while @Level < 30
  begin
    select @Level = @Level + 1

    -- Insert Users Attached to Root Level Members
    insert @UserTable (UserId, ApproverId, Approvallevel, Level, SortKey)
      select Users.UserId, Users.ApproverId, Users.ApprovalLevel, @Level, ut.SortKey + right(replicate('0',16) + convert(varchar(16),Users.UserId),16)
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

  -- Insert Users who are not Attached to any Users and this is the BA level
  insert @UserTable (UserId, ApproverId, ApprovalLevel, Level, Status, SortKey)
    select Users.UserId, Users.ApproverId, Users.ApprovalLevel, 0, 2, right(replicate('9',16) + convert(varchar(16),users.UserId),16)
      from Users BAUser
      join Users on Users.DistrictId = BAUser.DistrictId
                and Users.Active = 1
      join School on School.SchoolId = Users.SchoolId
                 and School.Active = 1
      left outer join @UserTable ut0 on ut0.UserId = Users.UserId
     where BAUser.UserId = @pUserId
       and BAUser.ApprovalLevel = 2
       and ut0.utid is null
     order by Users.CometId

  return
end
```
