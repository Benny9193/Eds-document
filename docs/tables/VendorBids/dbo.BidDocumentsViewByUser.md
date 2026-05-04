# View: `dbo.BidDocumentsViewByUser`

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidDocumentId` | int | NO |  |  |
| 2 | `CalendarId` | int | YES |  |  |
| 3 | `DisplaySeq` | int | YES |  |  |
| 4 | `Description` | varchar(255) | YES |  |  |
| 5 | `DocumentName` | varchar(255) | YES |  |  |
| 6 | `reguserId` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `bidcalendar` | USER_TABLE |
| `BidScheduleView` | VIEW |
| `regcalendar` | USER_TABLE |
| `registrations` | USER_TABLE |
| `regusers` | USER_TABLE |
| `dbo.BidDocuments` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[BidDocumentsViewByUser] as
select BidDocuments.BidDocumentId, BidDocuments.CalendarId, BidDocuments.DisplaySeq, 
       BidDocuments.Description, BidDocuments.DocumentName, regusers.reguserId
  from dbo.BidDocuments with (nolock)
  join bidcalendar on bidcalendar.calendarid = biddocuments.calendarid
  join BidScheduleView bsv on bsv.bscid = bidcalendar.BSCId
  join regcalendar on regcalendar.BSCId = bsv.BSCId
  join regusers on regusers.registrationid = regcalendar.registrationid
  join registrations on registrations.registrationid = regcalendar.registrationid
```
