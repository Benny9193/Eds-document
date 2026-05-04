# View: `dbo.vw_RTK_Sites`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RTK_SitesId` | int | NO |  |  |
| 2 | `DistrictId` | int | NO |  |  |
| 3 | `DistrictName` | varchar(50) | NO |  |  |
| 4 | `FacilityName` | varchar(50) | NO |  |  |
| 5 | `NJEIN` | varchar(20) | NO |  |  |
| 6 | `CoMunCode` | varchar(5) | NO |  |  |
| 7 | `ChemicalInventoryStatus` | tinyint | NO |  |  |
| 8 | `ExposedEmployeesCount` | int | NO |  |  |
| 9 | `FacilityEmergencyContact` | varchar(100) | NO |  |  |
| 10 | `EmergencyPhone` | varchar(50) | NO |  |  |
| 11 | `FacilityLocation` | varchar(408) | YES |  |  |
| 12 | `MailingAddress` | varchar(408) | YES |  |  |
| 13 | `ResponsibleOfficial` | varchar(100) | NO |  |  |
| 14 | `TitleResponsibleOfficial` | varchar(100) | NO |  |  |
| 15 | `PhoneResponsibleOfficial` | varchar(50) | NO |  |  |
| 16 | `EmailResponsibleOfficial` | varchar(200) | NO |  |  |
| 17 | `RTKContact` | varchar(174) | NO |  |  |
| 18 | `RTKEmail` | varchar(255) | NO |  |  |
| 19 | `RTKPhone` | varchar(20) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `District` | USER_TABLE |
| `DistrictContacts` | USER_TABLE |
| `RTK_Sites` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_RTK_Sites] as
select RTK_Sites.RTK_SitesId, isnull(District.DistrictId,0) DistrictId, isnull(District.Name,'') DistrictName, isnull(RTK_Sites.FacilityName,'') FacilityName,
       isnull(RTK_Sites.NJEIN,'') NJEIN, isnull(RTK_Sites.CoMunCode,'') CoMunCode,
       isnull(RTK_Sites.ChemicalInventoryStatus,0) ChemicalInventoryStatus,
       isnull(RTK_Sites.ExposedEmployeesCount,0) ExposedEmployeesCount,
       ISNULL(RTK_Sites.FacilityEmergencyContact,'') FacilityEmergencyContact,
       isnull(RTK_Sites.EmergencyPhone,'') EmergencyPhone,
       case isnull(RTK_Sites.FacilityLocation1,'') 
         when '' then ''
         else RTK_Sites.FacilityLocation1 + CHAR(13) + CHAR(10)
       end + 
       case isnull(RTK_Sites.FacilityLocation2,'') 
         when '' then ''
         else RTK_Sites.FacilityLocation2 + CHAR(13) + CHAR(10)
       end +
       case isnull(RTK_Sites.FacilityLocation3,'') 
         when '' then ''
         else RTK_Sites.FacilityLocation3 + CHAR(13) + CHAR(10)
       end +
       case isnull(RTK_Sites.FacilityLocation4,'') 
         when '' then ''
         else RTK_Sites.FacilityLocation4 + CHAR(13) + CHAR(10)
       end FacilityLocation,
       case ISNULL(RTK_Sites.MailingAddress1,'')
         when '' then ''
         else RTK_Sites.MailingAddress1 + CHAR(13) + CHAR(10)
       end +
       case ISNULL(RTK_Sites.MailingAddress2,'')
         when '' then ''
         else RTK_Sites.MailingAddress2 + CHAR(13) + CHAR(10)
       end +
       case ISNULL(RTK_Sites.MailingAddress3,'')
         when '' then ''
         else RTK_Sites.MailingAddress3 + CHAR(13) + CHAR(10)
       end +
       case ISNULL(RTK_Sites.MailingAddress4,'')
         when '' then ''
         else RTK_Sites.MailingAddress4 + CHAR(13) + CHAR(10)
       end MailingAddress,
       isnull(RTK_Sites.ResponsibleOfficial,'') ResponsibleOfficial,
       isnull(RTK_Sites.TitleResponsibleOfficial,'') TitleResponsibleOfficial,
       isnull(RTK_Sites.PhoneResponsibleOfficial,'') PhoneResponsibleOfficial,
       ISNULL(RTK_Sites.EmailResponsibleOfficial,'') EmailResponsibleOfficial,
       isnull(DistrictContacts.FullName,'') RTKContact,
       isnull(DistrictContacts.Email,'') RTKEmail,
       isnull(DistrictContacts.Phone,'') RTKPhone
  from District
  join RTK_Sites on RTK_Sites.DistrictId = District.DistrictId
  left outer join DistrictContacts on DistrictContacts.DistrictContactId =
    (select Top 1 Dc.DistrictContactId
       from DistrictContacts dc with (nolock)
      where dc.DistrictId = District.DistrictId
        and dc.DistrictContactTypeId = 6 --RTK
      order by dc.DistrictContactId)
 where District.Active = 1
   and District.RTK = 1
   and RTK_Sites.Active = 1
--   and isnull(RTK_Sites.FacilityName,'') != ''
--   and ISNULL(RTK_Sites.NJEIN,'') != ''
--   and ISNULL(RTK_Sites.CoMunCode,'') != ''
-- order by District.Name, RTK_Sites.FacilityName
```
