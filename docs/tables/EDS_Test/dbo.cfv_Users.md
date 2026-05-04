# View: `dbo.cfv_Users`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  |  |
| 2 | `DistrictId` | int | NO |  |  |
| 3 | `SchoolId` | int | NO |  |  |
| 4 | `UserId` | int | NO |  |  |
| 5 | `UserName` | varchar(56) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `CSRep` | USER_TABLE |
| `District` | USER_TABLE |
| `School` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[cfv_Users] as
select SessionTable.SessionId, District.DistrictId, School.SchoolId, Users.UserId, right('00000' + cast(isnull(Users.CometId,0) as varchar),5) + ' ' + ISNULL(Users.FirstName + Users.LastName,Users.Attention) UserName
  from SessionTable with (nolock)
  join CSRep on CSRep.CSRepId = case 
                                  when isnull((select ApprovalLevel 
                                                 from Users u with (nolock) 
                                                where u.UserId = SessionTable.RepUserId),0) > 5 then CSRep.CSRepId
                                  else SessionTable.CSRepId
                                end
  join District on isnull(District.CSRepId,CSRep.CSRepId) = CSRep.CSRepId
               and District.Active = 1
  join School on School.DistrictId = District.DistrictId
             and School.Active = 1
  join Users on Users.DistrictId = District.DistrictId
            and Users.SchoolId = School.SchoolId
            and Users.Active = 1
 where SessionTable.SessionEnd is null
```
