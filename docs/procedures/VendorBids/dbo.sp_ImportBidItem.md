# Procedure: `dbo.sp_ImportBidItem`

_Generated on 2026-05-04T14:49:11.332Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_ImportBidItem` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2011-07-22 00:36:11 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@vendorBidImportId` | IN | int |  |
| 2 | `@passPhrase` | IN | varchar(255) |  |
| 3 | `@VendorBidId` | IN | int |  |
| 4 | `@BidRequestItemId` | IN | int |  |
| 5 | `@ItemCode` | IN | varchar(50) |  |
| 6 | `@ItemBidType` | IN | varchar(50) |  |
| 7 | `@UnitPrice` | IN | varchar(50) |  |
| 8 | `@VendorItemCode` | IN | varchar(50) |  |
| 9 | `@Alternate` | IN | varchar(512) |  |
| 10 | `@ItemsPerUnit` | IN | varchar(50) |  |
| 11 | `@PageNumber` | IN | varchar(50) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `vendorbiditemimports` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
-- =============================================
-- Author:		David Harrison
-- Create date: July 22, 2011
-- Description:	Import Bid Item to Bid
-- =============================================
CREATE PROCEDURE [dbo].[sp_ImportBidItem]
	@vendorBidImportId int,
	@passPhrase varchar(255),
	@VendorBidId int,
	@BidRequestItemId int,
	@ItemCode varchar(50),
	@ItemBidType varchar(50),
	@UnitPrice varchar(50),
	@VendorItemCode varchar(50),
	@Alternate	varchar(512),
	@ItemsPerUnit varchar(50),
	@PageNumber varchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    insert vendorbiditemimports (alternate, bidrequestitemid, itembidtype, itemcode, itemsperunit, pageno, unitprice, vendorbidimportid, vendoritemcode)
      select         
         EncryptByPassPhrase(@passPhrase, @alternate, 1, cast(@BidRequestItemId as varbinary)),
         @BidRequestItemId,
         EncryptByPassPhrase(@passPhrase, @itemBidType, 1, cast(@BidRequestItemId as varbinary)),
         @ItemCode,
         EncryptByPassPhrase(@passPhrase, @itemsperunit, 1, cast(@BidRequestItemId as varbinary)),
         EncryptByPassPhrase(@passPhrase, @PageNumber, 1, cast(@BidRequestItemId as varbinary)),
         EncryptByPassPhrase(@passPhrase, @unitPrice, 1, cast(@BidRequestItemId as varbinary)),
         @vendorBidImportId,
         EncryptByPassPhrase(@passPhrase, @vendorItemCode, 1, cast(@BidRequestItemId as varbinary))
END
```
