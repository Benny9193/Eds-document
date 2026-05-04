# Procedure: `dbo.sp_DeleteBid`

_Generated on 2026-05-04T13:08:01.411Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_DeleteBid` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2011-06-26 01:29:05 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@VendorBidId` | IN | int |  |
| 2 | `@SessionId` | IN | int |  |
| 3 | `@Comments` | IN | varchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `vendorbidsjournal` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_DeleteBid] @VendorBidId int, @SessionId int, @Comments varchar(max)
as
INSERT INTO [vendorbidsjournal]([vendorbidid], [sessionid], [comments], [active]) 
  select @VendorBidId, @SessionId, EncryptByPassPhrase(CAST(@VendorBidId as varchar(255)), @Comments, 1, cast(@VendorBidId as varbinary)), 0
```
