# Procedure: `dbo.sp_VBUploadItem`

_Generated on 2026-05-04T13:43:22.348Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_VBUploadItem` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2011-08-05 00:09:15 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | varchar(50) |  |
| 2 | `@pPassPhrase` | IN | varchar(255) |  |
| 3 | `@pVendorBidId` | IN | varchar(50) |  |
| 4 | `@pBidRequestItemId` | IN | varchar(50) |  |
| 5 | `@pAlternate` | IN | varchar(512) |  |
| 6 | `@pItemBidType` | IN | varchar(50) |  |
| 7 | `@pUnitPrice` | IN | varchar(50) |  |
| 8 | `@pCost` | IN | varchar(50) |  |
| 9 | `@pVendorItemCode` | IN | varchar(50) |  |
| 10 | `@pQuantityBid` | IN | varchar(50) |  |
| 11 | `@pItemsPerUnit` | IN | varchar(50) |  |
| 12 | `@pPageNo` | IN | varchar(50) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `vendorbiditems` | USER_TABLE |  |
| `vendorbiditemsjournal` | USER_TABLE |  |
| `vendorbids` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
-- =============================================
-- Author:		David Harrison
-- Create date: August 4, 2011
-- Description:	Upload Bid Item to Bid
-- =============================================
CREATE PROCEDURE [dbo].[sp_VBUploadItem]
	@pSessionId varchar(50),
	@pPassPhrase varchar(255),
	@pVendorBidId varchar(50),
	@pBidRequestItemId varchar(50),
	@pAlternate	varchar(512),
	@pItemBidType varchar(50),
	@pUnitPrice varchar(50),
	@pCost varchar(50),
	@pVendorItemCode varchar(50),
	@pQuantityBid varchar(50),
	@pItemsPerUnit varchar(50),
	@pPageNo varchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

-- insert debugmsgs (Msg) select 'SessionId=' + isnull(@pSessionId,'null') + ' passPhrase=' + isnull(@pPassPhrase,'null') + ' VendorBidId=' + isnull(@pVendorBidId,'null') + ' BidRequestItemId=' + ISNULL(@pBidRequestItemId,'null') + ' Alternate=' + ISNULL(@pAlternate,'null') + ' ItemBidType=' + ISNULL(@pItemBidtype,'null') + ' UnitPrice=' + ISNULL(@pUnitPrice,'null') + ' Cost=' + ISNULL(@pCost,'null') + ' VendorItemCode=' + ISNULL(@pVendorItemCode,'null') + ' QuantityBid=' + ISNULL(@pQuantityBid,'null') + ' ItemsPerUnit=' + ISNULL(@pItemsPerUnit,'null') + ' PageNo=' + ISNULL(@pPageNo,'null')

    -- Add base row is not present
    insert vendorbiditems (vendorbidid, bidrequestitemid, quantity, itemid)
      select vendorbids.vendorbidid, CAST(@pBidRequestItemId as int), CAST(@pQuantityBid as int), 1
        from vendorbids with (nolock)
        left outer join vendorbiditems on vendorbiditems.vendorbidid = vendorbids.vendorbidid
                                      and vendorbiditems.bidrequestitemid = CAST(@pBidRequestItemId as int)
       where vendorbids.vendorbidid = CAST(@pVendorBidId as int)
         and vendorbiditems.vendorbiditemid is null                                      

    -- add journal entry
    insert vendorbiditemsjournal (vendorbiditemid, sessionid, itembidtype, unitprice, cost, vendoritemcode, quantitybid, alternate, itemsperunit, pageno)
      select vendorbiditems.vendorbiditemid,
             cast(@pSessionId as int),
             EncryptByPassPhrase(@pPassPhrase, @pItemBidType, 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
             EncryptByPassPhrase(@pPassPhrase, @pUnitPrice, 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
             EncryptByPassPhrase(@pPassPhrase, @pCost, 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
             EncryptByPassPhrase(@pPassPhrase, @pVendorItemCode, 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
             EncryptByPassPhrase(@pPassPhrase, @pQuantityBid, 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
             EncryptByPassPhrase(@pPassPhrase, @pAlternate, 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
             EncryptByPassPhrase(@pPassPhrase, @pItemsPerUnit, 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
             EncryptByPassPhrase(@pPassPhrase, @pPageNo, 1, cast(vendorbiditems.vendorBidItemId as varbinary))
        from vendorbiditems with (nolock)
       where vendorbiditems.vendorbidid = cast(@pVendorBidId as int)
         and vendorbiditems.bidrequestitemid = cast(@pBidRequestItemId as int)
END
```
