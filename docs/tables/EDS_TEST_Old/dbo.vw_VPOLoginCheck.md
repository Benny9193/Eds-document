# View: `dbo.vw_VPOLoginCheck`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VPORegistrationId` | int | NO |  |  |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `VPOUserCode` | varchar(50) | NO |  |  |
| 4 | `VPOPassword` | varchar(50) | NO |  |  |
| 5 | `VPOLastChange` | datetime | NO |  |  |
| 6 | `VPOEMail` | varchar(255) | NO |  |  |
| 7 | `VPOName` | varchar(50) | NO |  |  |
| 8 | `VPOPhone` | varchar(50) | NO |  |  |
| 9 | `VPOParentId` | int | NO |  |  |
| 10 | `VPOCanCreateUser` | tinyint | NO |  |  |
| 11 | `VPOStatus` | tinyint | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VPOLoginAttempts` | USER_TABLE |
| `VPORegistrations` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_VPOLoginCheck] as
select VPORegistrations.VPORegistrationId, 
       VPORegistrations.Active, 
       isnull(VPORegistrations.VPOUserCode,'') VPOUserCode,
       isnull(VPORegistrations.VPOPassword,'') VPOPassword, 
       VPORegistrations.VPOLastChange, 
       isnull(VPORegistrations.VPOEMail,'') VPOEMail,
       isnull(VPORegistrations.VPOName,'') VPOName,
       isnull(VPORegistrations.VPOPhone,'') VPOPhone, 
       isnull(VPORegistrations.VPOParentId,0) VPOParentId, 
       isnull(VPORegistrations.VPOCanCreateUser,0) VPOCanCreateUser, 
       cast(case 
              when (select count(*) 
                      from VPOLoginAttempts vla with (nolock)
                     where vla.VPORegistrationId = VPORegistrations.VPORegistrationId
                       and vla.VPOEventDate between DATEADD(MINUTE,-30,GETDATE()) and GETDATE()
                       and LoginStatus != 1) > VPORegistrations.VPOAllowedRetries then 0
              else 1
            end as tinyint) as VPOStatus
  from VPORegistrations with (nolock)
 where VPORegistrations.Active = 1
```
