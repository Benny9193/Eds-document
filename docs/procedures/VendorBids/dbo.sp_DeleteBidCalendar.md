# Procedure: `dbo.sp_DeleteBidCalendar`

_Generated on 2026-05-04T13:08:01.412Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_DeleteBidCalendar` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2008-11-13 22:13:25 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pCalendarId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidCalendar` | USER_TABLE |  |
| `BidCalendarItems` | USER_TABLE |  |
| `BidDocumentAcks` | USER_TABLE |  |
| `BidDocuments` | USER_TABLE |  |
| `VendorBidItems` | USER_TABLE |  |
| `VendorBidItemsJournal` | USER_TABLE |  |
| `VendorBids` | USER_TABLE |  |
| `VendorBidsJournal` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure sp_DeleteBidCalendar @pCalendarId int
as
begin

delete VendorBidItemsJournal
  from VendorBidItemsJournal
  join VendorBidItems on VendorBidItems.VendorBidItemId = VendorBidItemsJournal.VendorBidItemId
  join VendorBids on VendorBids.VendorBidId = VendorBidItems.VendorBidId
                 and VendorBids.CalendarId = @pCalendarId

delete VendorBidItems
  from VendorBidItems 
  join VendorBids on VendorBids.VendorBidId = VendorBidItems.VendorBidId
                 and VendorBids.CalendarId = @pCalendarId

delete VendorBidsJournal
  from VendorBidsJournal
  join VendorBids on VendorBids.VendorBidId = VendorBidsJournal.VendorBidId
                 and VendorBids.CalendarId = @pCalendarId

delete VendorBids
  from VendorBids
 where VendorBids.CalendarId = @pCalendarId

delete BidDocumentAcks
  from BidDocumentAcks
  join BidDocuments on BidDocuments.BidDocumentId = BidDocumentAcks.BidDocumentId
                   and BidDocuments.CalendarId = @pCalendarId

delete BidDocuments
 where CalendarId = @pCalendarId

delete BidCalendarItems
 where CalendarId = @pCalendarId

delete BidCalendar
 where CalendarId = @pCalendarId

end
```
