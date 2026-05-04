# View: `dbo.vw_VendorBlast_DownloadedBySchedule`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorId` | int | YES |  |  |
| 2 | `BidScheduleId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `dbo.bidcalendar` | unresolved |
| `dbo.BidScheduleCats` | unresolved |
| `dbo.DownloadLog` | unresolved |
| `dbo.registrations` | unresolved |
| `dbo.regusers` | unresolved |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_VendorBlast_DownloadedBySchedule] as
select reg.VendorId, bsc.BidScheduleId
  from VendorBids.dbo.DownloadLog dl with (nolock)
  join VendorBids.dbo.regusers ru with (nolock) on ru.reguserId = dl.reguserid
  join VendorBids.dbo.registrations reg with (nolock) on reg.registrationid = ru.registrationid
  join VendorBids.dbo.bidcalendar bc with (nolock) on bc.calendarid = dl.calendarid
  join VendorBids.dbo.BidScheduleCats bsc with (nolock) on bsc.BSCId = bc.BSCId
 group by reg.VendorId, bsc.BidScheduleId
```
