# Function: table-valued: `dbo.uf_FA_ApprovalUserTree`

_Generated on 2026-05-04T14:49:07.374Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_FA_ApprovalUserTree` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2012-12-21 00:26:36 |
| Modified | 2020-04-27 16:00:25 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDistrictId` | IN | int |  |
| 2 | `@pUserID` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `School` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--select * from uf_FA_ApprovalUserTree(400,303360)
--select * from uf_FA_ApprovalUserTree1(400,223244)
/* BH 12/19/2012: A modified version of uf_UserTree that, when given a district and userid, will return a hierarchy of approvers, including the user and the user's subordinates */
CREATE   function [dbo].[uf_FA_ApprovalUserTree] (@pDistrictId int,@pUserID int)
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
DECLARE @userLevel int = 1;

    /* get the user's approval level */
	SELECT	@userLevel = isnull(ApprovalLevel,0)
	FROM	Users
	WHERE	UserID = @pUserID

if @userLevel = 2
begin	
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
end
else
begin
  -- Insert This User
  insert @UserTable (UserId, ApproverId, ApprovalLevel, Level, BreakOnSchool, SortKey)
    select Users.UserId, null, Users.ApprovalLevel, 1, case isnull(Users.ApprovalLevel,0) when 0 then 1 else 0 end, right(replicate('0',16) + convert(varchar(16),Users.UserId),16)
      from Users
      join School on School.SchoolId = Users.SchoolId
                 and School.Active = 1
     where Users.DistrictId = @pDistrictId
       and Users.Active = 1
       and Users.UserId = @pUserID

  select @Level = 1

  while @Level < 30
  begin
    select @Level = @Level + 1

    -- Insert Users Attached to this user or their users
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

end

	-- Insert Approvers where Approver is Deleted
    insert @UserTable (UserId, ApproverId, Approvallevel, Level, BreakOnSchool, SortKey)
      select Users.UserId, Users.ApproverId, Users.ApprovalLevel, @Level, 0, null
		from @UserTable ut
		join Users on Users.UserId = ut.ApproverId
	              and isnull(Users.Active,0) = 0
        left outer join @UserTable ut0 on ut0.UserId = Users.UserId
       where ut0.utid is null
	   group by Users.UserId, Users.ApproverId, Users.ApprovalLevel

	/* remove all teachers from this list */
	DELETE	FROM @UserTable
	WHERE	ISNULL(ApprovalLevel,0) = 0

return
end
```
