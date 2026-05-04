# View: `dbo.vw_ValidLogins`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `UserId` | int | NO |  |  |
| 2 | `UserMatch` | varchar(26) | YES |  |  |
| 3 | `Password` | varchar(10) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `District` | USER_TABLE |
| `DistrictTypes` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_ValidLogins] as
select Users.UserId, rtrim(District.DistrictCode) + '/' + RTRIM(cast(Users.CometId as varchar(10))) + '/' + RTRIM(Users.UserName) UserMatch, isnull(rtrim(Users.Password),'') Password
  from Users with (nolock)
  join District on District.DistrictId = Users.DistrictId
               and District.Active = 1
               and isnull(District.DisableLogins,0) = 0
  join DistrictTypes on DistrictTypes.DistrictTypeId = District.DistrictTypeId
                    and DistrictTypes.UsesOnline = 1
 where Users.Active = 1
   and case when ISNULL(rtrim(Users.Password),'') != '' then RTRIM(Users.Password) else '' end != ''
```
