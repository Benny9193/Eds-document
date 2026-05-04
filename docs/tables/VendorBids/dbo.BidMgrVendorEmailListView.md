# View: `dbo.BidMgrVendorEmailListView`

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidScheduleId` | int | NO |  |  |
| 2 | `Active` | tinyint | NO |  |  |
| 3 | `VendorId` | int | YES |  |  |
| 4 | `VendorName` | varchar(50) | YES |  |  |
| 5 | `VendorCode` | varchar(16) | YES |  |  |
| 6 | `VendorPwd` | varchar(255) | NO |  |  |
| 7 | `VendorEMail` | varchar(255) | NO |  |  |
| 8 | `RegistrationId` | int | NO |  |  |
| 9 | `EmailCount` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidSchedule` | USER_TABLE |
| `BidScheduleCats` | USER_TABLE |
| `RegCalendar` | USER_TABLE |
| `Registrations` | USER_TABLE |
| `regusers` | USER_TABLE |
| `VendorEmailLog` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE  VIEW [dbo].[BidMgrVendorEmailListView] AS 
select  BS.BidScheduleId, Isnull(BS.Active,0) Active, reg.VendorId, reg.Name VendorName, reg.Code VendorCode, regusers.Password VendorPwd, Isnull(regusers.EMail,'') VendorEMail, Reg.RegistrationId,
  (select count(*) from VendorEmailLog VEL where VEL.BidScheduleId=BS.BidScheduleId and VEL.VendorId=reg.VendorId and VEL.RegistrationId=Reg.RegistrationId and VEL.VendorEMail=Isnull(regusers.EMail,'')) EmailCount
--select  BS.BidScheduleId, Isnull(BS.Active,0) Active, BSC.BSCId, BSC.CategoryName, Vendors.VendorId, Vendors.Name VendorName, Vendors.Code VendorCode, Vendors.Code VendorPwd, Isnull(Vendors.EMail,'') VendorEMail
from BidSchedule  BS 
join BidScheduleCats BSC on BSC.BidScheduleId = BS.BidScheduleId
join RegCalendar RegCal on RegCal.BSCId = BSC.BSCId
join Registrations Reg on Reg.RegistrationId = RegCal.RegistrationId 
                      AND Reg.Active=1
join regusers on regusers.registrationid = reg.registrationid
             and regusers.active = 1
--where BidScheduleId=51 AND Active=1 AND VendorEMail<>''
--order by VendorName, VendorId, CategoryName
group by BS.BidScheduleId, BS.Active, reg.VendorId, reg.Name, reg.Code, regusers.Password, Isnull(regusers.EMail,''), Reg.RegistrationId
```
