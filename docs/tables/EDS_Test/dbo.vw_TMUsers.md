# View: `dbo.vw_TMUsers`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictCode` | varchar(4) | YES |  |  |
| 2 | `DistrictName` | varchar(50) | YES |  |  |
| 3 | `Attention` | varchar(50) | YES |  |  |
| 4 | `UserNbr` | varchar(5) | YES |  |  |
| 5 | `UserName` | varchar(10) | YES |  |  |
| 6 | `Password` | varchar(10) | YES |  |  |
| 7 | `userId` | int | NO |  |  |
| 8 | `DistrictId` | int | NO |  |  |
| 9 | `useCF` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `District` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_TMUsers] as
select District.DistrictCode, District.Name DistrictName, Users.Attention, right('00000' + cast(Users.CometId as varchar),5) UserNbr, Users.UserName, Users.Password, Users.userId, District.DistrictId, isnull(Users.UseCF,0) useCF
  from Users
  join District on District.DistrictId = Users.DistrictId
               and District.TimeAndMaterialBids = 1
 where Users.AllowTM = 1
--   and District.DistrictCode = 'TU'
```
