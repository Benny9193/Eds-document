# Function: table-valued: `dbo.uf_FA_UserApproverTree`

_Generated on 2026-05-04T14:49:07.375Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_FA_UserApproverTree` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2012-06-13 23:56:34 |
| Modified | 2024-10-22 15:41:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pUserId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `District` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[uf_FA_UserApproverTree] (@pUserId int)
returns 
@UserTable table (
	utid int identity (1,1) primary key,
	UserId int null,
	ApprovalLevel int null,
	DistrictCode varchar(2) null,
	UserName varchar(50) null,
	[Password] varchar(50) null,
	ApproverId int null,
	Email varchar(100) null
)

as
begin

  while (select count(*) from @UserTable where ApproverId IS NULL) < 1
  begin
	insert	@UserTable (UserId, ApprovalLevel, Email, DistrictCode, UserName, [Password], ApproverID)
	select	Users.UserId, Users.ApprovalLevel, Users.Email, District.DistrictCode, Users.CometId, '<Encrypted>' [Password], Users.ApproverId
	from	Users with (nolock), School, District
	where	district.DistrictId = School.DistrictId
--		and	School.SchoolId = Users.SchoolId
		and	Users.UserId = case 
                              when (select count(*)
                                      from @UserTable) = 0 then @pUserId
                              else
                                (select top 1 ApproverId
                                   from @UserTable
                                  order by utid desc)
                            end
        
         and Users.Active = 1

    if @@rowcount = 0
    begin
      break
    end
  end
  return
end
```
