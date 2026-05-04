# Function: table-valued: `dbo.uf_UserTree`

_Generated on 2026-05-04T13:43:19.116Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_UserTree` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2005-11-14 18:26:17 |
| Modified | 2013-11-07 12:28:41 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDistrictId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `School` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.uf_UserTreeBudget` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_UserTrees` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_UserTreesDistrict` | SQL_TABLE_VALUED_FUNCTION |

## Definition

```sql
CREATE     function [dbo].[uf_UserTree] (@pDistrictId int)
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
declare @Level int

  -- Insert Root Level Users
  insert @UserTable (UserId, ApproverId, ApprovalLevel, Level, BreakOnSchool, SortKey)
    select Users.UserId, null, Users.ApprovalLevel, 1, case isnull(Users.ApprovalLevel,0) when 0 then 1 else 0 end, right(replicate('0',16) + convert(varchar(16),Users.UserId),16)
      from Users
      join School on School.SchoolId = Users.SchoolId
                 and School.Active = 1
     where Users.DistrictId = @pDistrictId
       and Users.Active = 1
       and isnull(Users.ApproverId,0) = 0
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
     where Users.DistrictId = @pDistrictId
       and Users.Active = 1
       and ut0.utid is null
     order by Users.CometId

  return
end
```
