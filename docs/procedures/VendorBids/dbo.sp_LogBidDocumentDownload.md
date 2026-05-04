# Procedure: `dbo.sp_LogBidDocumentDownload`

_Generated on 2026-05-04T13:43:22.337Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_LogBidDocumentDownload` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2011-09-12 15:24:42 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRegUserId` | IN | int |  |
| 2 | `@pCalendarId` | IN | int |  |
| 3 | `@pBidDocumentId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidDocumentLog` | USER_TABLE |  |
| `BidDocumentsView` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_LogBidDocumentDownload] @pRegUserId int, @pCalendarId int, @pBidDocumentId int
as
insert BidDocumentLog (reguserid, calendarid, BidDocumentId) values (@pRegUserId, @pCalendarId, @pBidDocumentId)
select DocumentName, DocumentBody from BidDocumentsView with (nolock) where BidDocumentId = @pBidDocumentId
```
