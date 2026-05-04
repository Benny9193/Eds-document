# Procedure: `dbo.sp_LogDownload`

_Generated on 2026-05-04T14:49:11.333Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_LogDownload` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2011-08-09 22:02:55 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRegUserId` | IN | int |  |
| 2 | `@pCalendarId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `DownloadLog` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure sp_LogDownload @pRegUserId int, @pCalendarId int
as
insert DownloadLog (reguserid, calendarid) values (@pRegUserId, @pCalendarId)
```
