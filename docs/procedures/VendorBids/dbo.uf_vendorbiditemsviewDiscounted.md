# Function: inline table-valued: `dbo.uf_vendorbiditemsviewDiscounted`

_Generated on 2026-05-04T13:43:22.358Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_vendorbiditemsviewDiscounted` |
| Kind | Function (inline TVF) |
| sys.objects.type | `IF` (SQL_INLINE_TABLE_VALUED_FUNCTION) |
| Created | 2011-06-26 19:40:50 |
| Modified | 2024-06-21 20:44:12 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@passPhrase` | IN | varchar(255) |  |
| 2 | `@VendorBidId` | IN | int |  |
| 3 | `@DiscountRate` | IN | decimal(9,5) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `vendorbiditems` | USER_TABLE |  |
| `vendorbiditemsjournal` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[uf_vendorbiditemsviewDiscounted] (@passPhrase varchar(255), @VendorBidId int, @DiscountRate decimal(9,5))
returns table as
return (select vbi.vendorbiditemid, 
               vbi.vendorbidid, 
               isnull(vbi.itemcode,'') as itemcode, 
               isnull(vbi.units,'') as units, 
               isnull(vbi.description,'') as description, 
               isnull(vbi.shiplocations,0) as shiplocations, 
               isnull(vbi.quantity,0) as quantity, 
               isnull(vbi.heading,'') as heading, 
               isnull(vbi.districtname,'') as districtname, 
               isnull(vbi.crossrefstext,'') as crossrefstext, 
               isnull(vbi.sortseq,'') as sortseq,
               isnull(vbij.vbijid,0) as vbijid, 
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.itembidtype, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') as itembidtype, 
               cast(isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.unitprice,1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') as money) -
                 round (cast(isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.unitprice,1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') as money) * @DiscountRate / 100,2) as unitprice, 
               cast(isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.unitprice,1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') as money) -
                 round (cast(isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.unitprice,1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') as money) * @DiscountRate / 100,2) * 
                 cast(isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.quantitybid, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') as int) as cost, 
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.vendoritemcode, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') as vendoritemcode, 
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.quantitybid, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') as quantitybid, 
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.alternate, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar(512)),'') as alternate, 
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.itemsperunit, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') as itemsperunit, 
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.pageno, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') as pageno, 
               isnull(vbij.datemodified,cast('1970-01-01 00:00:00.000' as datetime)) as datemodified, 
               case isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.itembidtype, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') when '' then 0 else 1 end as itemhasbeenbid, 
               vbi.itemid, 
               vbi.bidrequestitemid
  from vendorbiditems as vbi
  left outer join vendorbiditemsjournal as vbij on vbij.vbijid = 
    (select top 1 vendorbiditemsjournal.vbijid 
       from vendorbiditemsjournal
      where vendorbiditemsjournal.vendorbiditemid = vbi.vendorbiditemid
      order by vendorbiditemsjournal.vbijid desc)
 where vbi.vendorbidid = @VendorBidId)
```
