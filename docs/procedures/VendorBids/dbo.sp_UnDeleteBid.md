# Procedure: `dbo.sp_UnDeleteBid`

_Generated on 2026-05-04T14:49:11.341Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UnDeleteBid` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2011-06-26 01:51:32 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@VendorBidId` | IN | int |  |
| 2 | `@SessionId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `vendorbidsjournal` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure dbo.sp_UnDeleteBid @VendorBidId int, @SessionId int
as
INSERT INTO [vendorbidsjournal]([vendorbidid], [sessionid],  [biditemdiscountrate], [vendorbidnumber], [comments], [catalogdiscountrate], [active]) 
  select top 1 [vendorbidid], @SessionId, [biditemdiscountrate], [vendorbidnumber], [comments], [catalogdiscountrate], 1 
    from vendorbidsjournal with (nolock) 
   where vendorbidid = @VendorBidId
   order by vbjid desc
```
