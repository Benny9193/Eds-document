# View: `dbo.cfv_Districts`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  |  |
| 2 | `DistrictId` | int | NO |  |  |
| 3 | `DistrictName` | varchar(50) | YES |  |  |
| 4 | `DistrictCode` | varchar(4) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `CSRep` | USER_TABLE |
| `District` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[cfv_Districts] as
select SessionTable.SessionId, District.DistrictId, District.Name DistrictName, District.DistrictCode
  from SessionTable with (nolock)
  join CSRep on CSRep.CSRepId = case 
                                  when isnull((select ApprovalLevel 
                                                 from Users u with (nolock) 
                                                where u.UserId = SessionTable.RepUserId),0) > 5 then CSRep.CSRepId
                                  else SessionTable.CSRepId
                                end
  join District on isnull(District.CSRepId,CSRep.CSRepId) = CSRep.CSRepId
               and District.Active = 1
 where SessionTable.SessionEnd is null
```
