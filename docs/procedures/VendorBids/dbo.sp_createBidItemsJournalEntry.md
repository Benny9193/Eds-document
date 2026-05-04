# Procedure: `dbo.sp_createBidItemsJournalEntry`

_Generated on 2026-05-04T13:43:22.328Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_createBidItemsJournalEntry` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2011-06-26 02:14:36 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@vendorBidItemId` | IN | int |  |
| 2 | `@sessionId` | IN | int |  |
| 3 | `@passPhrase` | IN | varchar(255) |  |
| 4 | `@itemBidType` | IN | varchar(50) |  |
| 5 | `@unitPrice` | IN | varchar(50) |  |
| 6 | `@cost` | IN | varchar(50) |  |
| 7 | `@vendorItemCode` | IN | varchar(255) |  |
| 8 | `@quantityBid` | IN | varchar(50) |  |
| 9 | `@alternate` | IN | varchar(512) |  |
| 10 | `@itemsperunit` | IN | varchar(50) |  |
| 11 | `@pageNo` | IN | varchar(50) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `vendorbiditemsjournal` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_createBidItemsJournalEntry] @vendorBidItemId int, @sessionId int, @passPhrase varchar(255), @itemBidType varchar(50), @unitPrice varchar(50), @cost varchar(50), @vendorItemCode varchar(255), @quantityBid varchar(50), @alternate varchar(512), @itemsperunit varchar(50), @pageNo varchar(50)
as
INSERT INTO [vendorbiditemsjournal]([vendorbiditemid], [sessionid],  [itembidtype], [unitprice], [cost], 
                                    [vendoritemcode], [quantitybid], [alternate], [itemsperunit], [pageno])
  select @vendorBidItemId, 
         @sessionId, 
         EncryptByPassPhrase(@passPhrase, @itemBidType, 1, cast(@vendorBidItemId as varbinary)),
         EncryptByPassPhrase(@passPhrase, @unitPrice, 1, cast(@vendorBidItemId as varbinary)),
         EncryptByPassPhrase(@passPhrase, @cost, 1, cast(@vendorBidItemId as varbinary)),
         EncryptByPassPhrase(@passPhrase, @vendorItemCode, 1, cast(@vendorBidItemId as varbinary)),
         EncryptByPassPhrase(@passPhrase, @quantityBid, 1, cast(@vendorBidItemId as varbinary)),
         EncryptByPassPhrase(@passPhrase, @alternate, 1, cast(@vendorBidItemId as varbinary)),
         EncryptByPassPhrase(@passPhrase, @itemsperunit, 1, cast(@vendorBidItemId as varbinary)),
         EncryptByPassPhrase(@passPhrase, @pageNo, 1, cast(@vendorBidItemId as varbinary))
```
