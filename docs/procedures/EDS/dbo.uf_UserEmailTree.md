# Function: table-valued: `dbo.uf_UserEmailTree`

_Generated on 2026-05-04T14:49:07.434Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_UserEmailTree` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2012-03-02 15:25:24 |
| Modified | 2024-09-19 12:38:16 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pUserId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `CSRep` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `dbo.IsValidEmail` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[uf_UserEmailTree] (@pUserId int)
returns @UserTable table (
utid int identity (1,1) primary key,
UserId int null,
UserName varchar(100) null,
EMail varchar(255) null,
ApproverId int null)
as
begin

  while (select count(*) from @UserTable) < 30
  begin
    insert @UserTable (UserId, ApproverId, UserName, Email)
      select Users.UserId, Users.ApproverId, right('00000' + cast(isnull(Users.CometId,0) as varchar),5) + '-' + isnull(Users.Attention,''), Users.Email
        from Users with (nolock)
       where Users.UserId = case 
                              when (select count(*)
                                      from @UserTable) = 0 then @pUserId
                              else
                                (select top 1 ApproverId
                                   from @UserTable
                                  order by utid desc)
                            end
         and not exists (select UserId
                           from @UserTable
                          where UserId = (select top 1 ApproverId
                                            from @UserTable
                                           order by utid desc))
         and Users.Active = 1

    if @@rowcount = 0
    begin
      break
    end
  end

  insert @UserTable (UserId, ApproverId, UserName, Email)
    select CSRep.UserId, null, 'Ed-Data C/S Rep: ' + CSRep.Name, CSRep.EMail
      from District
      join CSRep on CSRep.CSRepId = District.CSRepId
      join Users on Users.DistrictId = District.DistrictId
                and Users.UserId = @pUserId

  delete @UserTable
   where dbo.IsValidEmail(isnull(Email,'')) = 0
   
  return
end
```
