# Function: inline table-valued: `dbo.uf_vendorbiditemsimportview`

_Generated on 2026-05-04T14:49:11.351Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_vendorbiditemsimportview` |
| Kind | Function (inline TVF) |
| sys.objects.type | `IF` (SQL_INLINE_TABLE_VALUED_FUNCTION) |
| Created | 2011-07-26 23:30:41 |
| Modified | 2024-06-21 20:44:12 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@passPhrase` | IN | varchar(255) |  |
| 2 | `@VendorBidImportId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `vendorbiditemimports` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create function [dbo].[uf_vendorbiditemsimportview] (@passPhrase varchar(255), @VendorBidImportId int)
returns table as
return (select vbii.vendorbiditemimportid,
			   vbii.vendorbidimportid, 
               vbii.BidRequestItemId, 
               isnull(vbii.itemcode,'') as itemcode, 
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbii.itembidtype, 1, cast(vbii.BidRequestItemId as varbinary)) as varchar),'') as itembidtype, 
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbii.unitprice,1, cast(vbii.BidRequestItemId as varbinary)) as varchar),'') as unitprice, 
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbii.vendoritemcode, 1, cast(vbii.BidRequestItemId as varbinary)) as varchar),'') as vendoritemcode, 
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbii.alternate, 1, cast(vbii.BidRequestItemId as varbinary)) as varchar(512)),'') as alternate, 
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbii.itemsperunit, 1, cast(vbii.BidRequestItemId as varbinary)) as varchar),'') as itemsperunit, 
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbii.pageno, 1, cast(vbii.BidRequestItemId as varbinary)) as varchar),'') as pageno,
               vbii.ImportStatus
  from vendorbiditemimports as vbii
 where vbii.vendorbidimportid = @VendorBidImportId)
```
