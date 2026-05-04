# Procedure: `dbo.sp_ProcessBid`

_Generated on 2026-05-04T14:49:11.334Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_ProcessBid` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2011-07-26 00:41:09 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@vendorBidImportId` | IN | int |  |
| 2 | `@passPhrase` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `bidcalendar` | USER_TABLE |  |
| `vendorbidimports` | USER_TABLE |  |
| `vendorbiditemimports` | USER_TABLE |  |
| `vendorbiditems` | USER_TABLE |  |
| `vendorbiditemsjournal` | USER_TABLE |  |
| `vendorbids` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
-- =============================================
-- Author:		David Harrison
-- Create date: July 25, 2011
-- Description:	Import Bid Header
-- =============================================
CREATE PROCEDURE [dbo].[sp_ProcessBid]
	-- Add the parameters for the stored procedure here
	@vendorBidImportId int,
	@passPhrase varchar(255)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Reset Status
    update vendorbiditemimports
       set ImportStatus = null
     where vendorbidimportid = @vendorBidImportId 

    -- Validate Item Bid Type     
    update vendorbiditemimports
       set ImportStatus = 'Invalid Item Bid Type'
     where vendorbiditemimports.vendorbidimportid = @vendorBidImportId
       and ltrim(rtrim(cast(DecryptByPassPhrase(@passPhrase, itemBidType, 1, cast(BidRequestItemId as varbinary)) as varchar))) not in ('', 'A','C','N')

    -- Validate Item Bid Type     
    update vendorbiditemimports
       set ImportStatus = coalesce(ImportStatus + '<br>', '') + 'Missing Item Bid Type'
     where vendorbiditemimports.vendorbidimportid = @vendorBidImportId
       and ltrim(rtrim(cast(DecryptByPassPhrase(@passPhrase, itemBidType, 1, cast(BidRequestItemId as varbinary)) as varchar))) = ''
       and (   ltrim(rtrim(cast(DecryptByPassPhrase(@passPhrase, unitprice, 1, cast(BidRequestItemId as varbinary)) as varchar))) != ''
            or ltrim(rtrim(cast(DecryptByPassPhrase(@passPhrase, vendoritemcode, 1, cast(BidRequestItemId as varbinary)) as varchar))) != ''
            or ltrim(rtrim(cast(DecryptByPassPhrase(@passPhrase, alternate, 1, cast(BidRequestItemId as varbinary)) as varchar))) != ''
            or ltrim(rtrim(cast(DecryptByPassPhrase(@passPhrase, itemsperunit, 1, cast(BidRequestItemId as varbinary)) as varchar))) != ''
            or ltrim(rtrim(cast(DecryptByPassPhrase(@passPhrase, pageno, 1, cast(BidRequestItemId as varbinary)) as varchar))) != '')
    
    -- Validate Alternate Description
    update vendorbiditemimports
       set ImportStatus = coalesce(ImportStatus + '<br>', '') + 'Alternate Description missing'
     where vendorbiditemimports.vendorbidimportid = @vendorBidImportId
       and cast(DecryptByPassPhrase(@passPhrase, itemBidType, 1, cast(BidRequestItemId as varbinary)) as varchar) in ('C','N')
       and isnull(cast(DecryptByPassPhrase(@passPhrase, alternate, 1, cast(BidRequestItemId as varbinary)) as varchar(512)),'') = '' 

    -- Validate Vendor Item Code
    update vendorbiditemimports
       set ImportStatus = coalesce(ImportStatus + '<br>', '') + 'Vendor Item Code missing'
      from vendorbiditemimports
      join vendorbidimports on vendorbidimports.vendorbidimportid = vendorbiditemimports.vendorbidimportid
      join vendorbids on vendorbids.vendorbidid = vendorbidimports.vendorbidid
      join bidcalendar on bidcalendar.calendarid = vendorbids.calendarid
                      and bidcalendar.requirevendoritemcode = 1
     where vendorbiditemimports.vendorbidimportid = @vendorBidImportId
       and cast(DecryptByPassPhrase(@passPhrase, itemBidType, 1, cast(BidRequestItemId as varbinary)) as varchar) in ('A','C','N')
       and isnull(cast(DecryptByPassPhrase(@passPhrase, vendoritemcode, 1, cast(BidRequestItemId as varbinary)) as varchar),'') = '' 

    -- Validate items per unit
    update vendorbiditemimports
       set ImportStatus = coalesce(ImportStatus + '<br>', '') + 'Items Per Unit missing'
      from vendorbiditemimports
      join vendorbidimports on vendorbidimports.vendorbidimportid = vendorbiditemimports.vendorbidimportid
      join vendorbids on vendorbids.vendorbidid = vendorbidimports.vendorbidid
      join bidcalendar on bidcalendar.calendarid = vendorbids.calendarid
                      and bidcalendar.requireitemsperunit = 1
     where vendorbiditemimports.vendorbidimportid = @vendorBidImportId
       and cast(DecryptByPassPhrase(@passPhrase, itemBidType, 1, cast(BidRequestItemId as varbinary)) as varchar) in ('A','C','N')
       and isnull(cast(DecryptByPassPhrase(@passPhrase, itemsperunit, 1, cast(BidRequestItemId as varbinary)) as varchar),'') = '' 

    -- Validate Page Number
    update vendorbiditemimports
       set ImportStatus = coalesce(ImportStatus + '<br>', '') + 'Page Number missing'
      from vendorbiditemimports
      join vendorbidimports on vendorbidimports.vendorbidimportid = vendorbiditemimports.vendorbidimportid
      join vendorbids on vendorbids.vendorbidid = vendorbidimports.vendorbidid
      join bidcalendar on bidcalendar.calendarid = vendorbids.calendarid
                      and bidcalendar.requirepagenumber = 1
     where vendorbiditemimports.vendorbidimportid = @vendorBidImportId
       and cast(DecryptByPassPhrase(@passPhrase, itemBidType, 1, cast(BidRequestItemId as varbinary)) as varchar) in ('A','C','N')
       and isnull(cast(DecryptByPassPhrase(@passPhrase, pageno, 1, cast(BidRequestItemId as varbinary)) as varchar),'') = '' 
   
    --If All Edits Passed then update item
    insert vendorbiditemsjournal (vendorbiditemid, sessionid, itembidtype, unitprice, cost, vendoritemcode, quantitybid, alternate, itemsperunit, pageno)
      select vendorbiditems.vendorbiditemid,
             vbi.sessionId,
             EncryptByPassPhrase(@passPhrase, cast(DecryptByPassPhrase(@passPhrase, vbii.itemBidType, 1, cast(vbii.BidRequestItemId as varbinary)) as varchar), 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
             EncryptByPassPhrase(@passPhrase, cast(DecryptByPassPhrase(@passPhrase, vbii.unitPrice, 1, cast(vbii.BidRequestItemId as varbinary)) as varchar), 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
             EncryptByPassPhrase(@passPhrase, cast(vendorbiditems.quantity * cast(cast(DecryptByPassPhrase(@passPhrase, vbii.unitPrice, 1, cast(vbii.BidRequestItemId as varbinary)) as varchar) as money) as varchar), 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
             EncryptByPassPhrase(@passPhrase, cast(DecryptByPassPhrase(@passPhrase, vbii.vendorItemCode, 1, cast(vbii.BidRequestItemId as varbinary)) as varchar), 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
             EncryptByPassPhrase(@passPhrase, cast(vendorbiditems.quantity as varchar), 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
             EncryptByPassPhrase(@passPhrase, cast(DecryptByPassPhrase(@passPhrase, vbii.alternate, 1, cast(vbii.BidRequestItemId as varbinary)) as varchar(512)), 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
             EncryptByPassPhrase(@passPhrase, cast(DecryptByPassPhrase(@passPhrase, vbii.itemsPerUnit, 1, cast(vbii.BidRequestItemId as varbinary)) as varchar), 1, cast(vendorbiditems.vendorBidItemId as varbinary)),
             EncryptByPassPhrase(@passPhrase, cast(DecryptByPassPhrase(@passPhrase, vbii.pageno, 1, cast(vbii.BidRequestItemId as varbinary)) as varchar), 1, cast(vendorbiditems.vendorBidItemId as varbinary))
        from vendorbidimports vbi with (nolock)
        join vendorbiditemimports vbii on vbii.vendorbidimportid = vbi.vendorbidimportid
                                      and vbii.ImportStatus is null
        join vendorbiditems on vendorbiditems.vendorbidid = vbi.vendorbidid
                           and vendorbiditems.bidrequestitemid = vbii.bidrequestitemid
       where vbi.vendorbidimportid = @vendorBidImportId
       
  select case (select COUNT(*) from vendorbiditemimports vbii with (nolock) where vbii.vendorbidimportid = @vendorBidImportId and vbii.ImportStatus IS not null) when 0 then 'OK' else 'Errors in Import' end [Status]
END
```
