# View: `dbo.vw_VendorBlast`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorName` | varchar(50) | YES |  |  |
| 2 | `VendorId` | int | NO |  |  |
| 3 | `ContactFullName` | varchar(150) | YES |  |  |
| 4 | `ContactEMail` | varchar(255) | YES |  |  |
| 5 | `BidContact` | tinyint | YES |  |  |
| 6 | `POContact` | tinyint | YES |  |  |
| 7 | `CategoryId` | int | YES |  |  |
| 8 | `BidHeaderId` | int | YES |  |  |
| 9 | `BidScheduleId` | int | YES |  |  |
| 10 | `VBCategoryId` | int | YES |  |  |
| 11 | `AwardedBid` | int | NO |  |  |
| 12 | `SubmittedBid` | int | NO |  |  |
| 13 | `RegisteredToBid` | int | NO |  |  |
| 14 | `DownloadedBid` | int | NO |  |  |
| 15 | `RegisteredCategory` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidImports` | USER_TABLE |
| `Bids` | USER_TABLE |
| `TMAwards` | USER_TABLE |
| `VendorContacts` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `vw_BidVendorList` | VIEW |
| `dbo.BidSchedule` | unresolved |
| `dbo.BidScheduleCats` | unresolved |
| `dbo.DownloadLog` | unresolved |
| `dbo.RegCalendar` | unresolved |
| `dbo.Registrations` | unresolved |
| `dbo.regusers` | unresolved |
| `dbo.vendorbids` | unresolved |
| [`VendorBids.dbo.BidSchedule`](../VendorBids/dbo.BidSchedule.md) | cross-database |
| [`VendorBids.dbo.BidScheduleCats`](../VendorBids/dbo.BidScheduleCats.md) | cross-database |
| [`VendorBids.dbo.DownloadLog`](../VendorBids/dbo.DownloadLog.md) | cross-database |
| [`VendorBids.dbo.RegCalendar`](../VendorBids/dbo.RegCalendar.md) | cross-database |
| [`VendorBids.dbo.Registrations`](../VendorBids/dbo.Registrations.md) | cross-database |
| [`VendorBids.dbo.regusers`](../VendorBids/dbo.regusers.md) | cross-database |
| [`VendorBids.dbo.vendorbids`](../VendorBids/dbo.vendorbids.md) | cross-database |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_VendorBlast] as
select Vendors.Name VendorName, 
       Vendors.VendorId,
       VendorContacts.FullName ContactFullName, VendorContacts.EMail ContactEMail, 
       VendorContacts.BidContact, VendorContacts.POContact,
       bvl.CategoryId, bvl.BidHeaderId,
       vbv.BidScheduleId, vbv.CategoryId VBCategoryId,
       case isnull(ba.VendorId,0) 
         when 0 then 0 
         else 1 
       end AwardedBid, 
       case ISNULL(BidImports.BidImportId,0) 
         when 0 then 
           case isnull(vbs.VendorId,0)
             when 0 then 0
             else 1
           end
         else 1
       end SubmittedBid,
       case isnull(bvl.vendorId,0)
         when 0 then 0
         else 1
       end RegisteredToBid,
       case ISNULL(vbdl.VendorId,0)
         when 0 then 0
         else 1
       end DownloadedBid,
       case ISNULL(vbv.VendorId,0)
         when 0 then 0
         else 1
       end RegisteredCategory
  from Vendors with (nolock)
  join VendorContacts on VendorContacts.VendorId = Vendors.VendorId
                     and VendorContacts.Active = 1
  left outer join vw_BidVendorList bvl on bvl.VendorId = Vendors.VendorId
  left outer join (
    select VendorId, BidHeaderId
      from Bids with (nolock)
     where Bids.Active = 1
       and Bids.VendorId != 7691
    union (
      select VendorId, BidHeaderId
        from TMAwards with (nolock)
       where TMAwards.Active = 1
         and TMAwards.VendorId != 7691
           )
                   ) ba on ba.VendorId = Vendors.VendorId
                       and ba.BidheaderId = bvl.BidHeaderId
  left outer join BidImports on BidImports.VendorId = Vendors.VendorId
                            and BidImports.BidHeaderId = bvl.BidHeaderId
  left outer join (
    select reg.VendorId, BS.BidScheduleId, BSC.CategoryId
      from VendorBids.dbo.BidSchedule BS with (nolock)
      join VendorBids.dbo.BidScheduleCats BSC on BSC.BidScheduleId = BS.BidScheduleId
      join VendorBids.dbo.RegCalendar RegCal on RegCal.BSCId = BSC.BSCId
      join VendorBids.dbo.Registrations Reg on Reg.RegistrationId = RegCal.RegistrationId 
                                           AND Reg.Active=1
     GROUP by reg.VendorId, BS.BidScheduleId, BSC.CategoryId
                   ) vbv on vbv.VendorId = Vendors.VendorId
  left outer join (
    select r.VendorId, dl.calendarid
      from VendorBids.dbo.DownloadLog dl with (nolock)
      join VendorBids.dbo.regusers ru on ru.reguserId = dl.reguserid
                                     and ru.active = 1
      join VendorBids.dbo.registrations r on r.registrationid = ru.registrationid
                                         and r.active = 1
     group by r.VendorId, dl.calendarid
                   ) vbdl on vbdl.VendorId = Vendors.VendorId
                         and vbdl.calendarid = bvl.BidHeaderId
  left outer join (
    select reg.VendorId, vb.calendarid
      from VendorBids.dbo.BidSchedule BS  with (nolock)
      join VendorBids.dbo.BidScheduleCats BSC on BSC.BidScheduleId = BS.BidScheduleId
      join VendorBids.dbo.RegCalendar RegCal on RegCal.BSCId = BSC.BSCId
      join VendorBids.dbo.Registrations Reg on Reg.RegistrationId = RegCal.RegistrationId 
                                           AND Reg.Active=1
      join VendorBids.dbo.vendorbids vb on vb.registrationid = reg.registrationid
     GROUP by reg.VendorId, vb.calendarid
                   ) vbs on vbs.VendorId = Vendors.VendorId
                        and vbs.calendarId = bvl.BidHeaderId
 where Vendors.Active = 1
```
