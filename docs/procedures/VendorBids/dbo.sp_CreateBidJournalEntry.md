# Procedure: `dbo.sp_CreateBidJournalEntry`

_Generated on 2026-05-04T14:49:11.327Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CreateBidJournalEntry` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2011-06-26 02:01:06 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@VendorBidId` | IN | int |  |
| 2 | `@SessionId` | IN | int |  |
| 3 | `@passPhrase` | IN | varchar(255) |  |
| 4 | `@bidDiscountRate` | IN | decimal(9,5) |  |
| 5 | `@catalogDiscountRate` | IN | decimal(9,5) |  |
| 6 | `@vendorBidNumber` | IN | varchar(255) |  |
| 7 | `@comments` | IN | varchar(2048) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `vendorbidsjournal` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_CreateBidJournalEntry] @VendorBidId int, @SessionId int,  @passPhrase varchar(255), @bidDiscountRate decimal(9,5), @catalogDiscountRate decimal(9,5), @vendorBidNumber varchar(255), @comments varchar(2048)
as
INSERT INTO [vendorbidsjournal]([vendorbidid], [sessionid],  [biditemdiscountrate], [vendorbidnumber], [comments], [catalogdiscountrate], [active]) 
  select @VendorBidId, @SessionId, 
         EncryptByPassPhrase(@passPhrase, cast(@bidDiscountRate as varchar(255)), 1, cast(@VendorBidId as varbinary)), 
         EncryptByPassPhrase(@passPhrase, @vendorBidNumber, 1, cast(@VendorBidId as varbinary)), 
         EncryptByPassPhrase(@passPhrase, @comments, 1, cast(@VendorBidId as varbinary)), 
         EncryptByPassPhrase(@passPhrase, cast(@catalogDiscountRate as varchar(255)), 1, cast(@VendorBidId as varbinary)),
         1
```
