# Procedure: `dbo.sp_CreateBidDocumentAck`

_Generated on 2026-05-04T14:49:11.326Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CreateBidDocumentAck` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2008-11-20 13:37:17 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@biddocumentid` | IN | int |  |
| 2 | `@sessionid` | IN | int |  |
| 3 | `@vendorbidid` | IN | int |  |
| 4 | `@acknowledged` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `biddocumentacks` | USER_TABLE |  |
| `biddocuments` | USER_TABLE |  |
| `vendorbids` | USER_TABLE |  |
| `vendorsessions` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_CreateBidDocumentAck] @biddocumentid int, @sessionid int, @vendorbidid int, @acknowledged int as
set nocount on

  insert biddocumentacks (biddocumentid, sessionid, ackdatetime, ackname, vendorbidid, Acknowledged)
    select biddocuments.biddocumentid, vendorsessions.sessionid, getdate(), vendorsessions.sessionuser, vendorbids.vendorbidid, @acknowledged
      from biddocuments with (nolock)
      join vendorsessions on vendorsessions.sessionid = @sessionid
      join vendorbids on vendorbids.vendorbidid = @vendorbidid
     where biddocuments.biddocumentid = @biddocumentid

  set nocount off

  select scope_identity() as biddocumentackid
  return
```
