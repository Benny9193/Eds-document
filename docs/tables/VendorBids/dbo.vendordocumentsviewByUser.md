# View: `dbo.vendordocumentsviewByUser`

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Name` | varchar(50) | NO |  |  |
| 2 | `code` | varchar(16) | YES |  |  |
| 3 | `Expires` | varchar(max) | YES |  |  |
| 4 | `DocId` | uniqueidentifier | YES |  |  |
| 5 | `DocStatus` | varchar(8) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `bidcalendar` | USER_TABLE |
| `BidScheduleView` | VIEW |
| `regcalendar` | USER_TABLE |
| `registrations` | USER_TABLE |
| `regusers` | USER_TABLE |
| `dbo.BidDocumentTypes` | unresolved |
| `dbo.BidHeaderCheckList` | unresolved |
| `dbo.vw_DMSVendorDocuments` | unresolved |

## Used by

_No other objects reference this view._

## Definition

```sql
--select * from [vendordocumentsviewByUser] vd where vd.code = '0003' order by Name
create VIEW [dbo].[vendordocumentsviewByUser] AS 
 SELECT BidDocumentTypes.Name, Registrations.code, vd.Expires, vd.DocId,
        case
          when vd.DocId is null then 'Missing'
          when vd.Expires < GETDATE() then 'Expired'
          when getdate() between dateadd(month,-2,vd.Expires) and vd.Expires then 'Expiring'
          else 'Valid'
        end DocStatus
   FROM BidScheduleView with (nolock)
   join regcalendar on regcalendar.BSCId = BidScheduleView.BSCId
   join regusers on regusers.registrationid = regcalendar.registrationid
   join registrations on registrations.registrationid = regcalendar.registrationid
   join bidcalendar on BidCalendar.BSCId = BidScheduleView.BSCId
                   and bidcalendar.active = 1
   join EDS.dbo.BidHeaderCheckList on BidHeaderCheckList.BidHeaderId = bidcalendar.calendarid
   join EDS.dbo.BidDocumentTypes on BidDocumentTypes.BidDocumentTypeId = BidHeaderCheckList.BidderCheckListId
                                and BidDocumentTypes.VendorSpecific = 1
   left outer join EDS.dbo.vw_DMSVendorDocuments vd on vd.DocType = BidDocumentTypes.Name
 where BidScheduleView.OpeningDate > DATEADD(month,-18,getdate())
 group by BidDocumentTypes.Name, Registrations.code, vd.Expires, vd.DocId
```
