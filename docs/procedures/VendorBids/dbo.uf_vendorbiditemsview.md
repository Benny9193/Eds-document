# Function: inline table-valued: `dbo.uf_vendorbiditemsview`

_Generated on 2026-05-04T13:43:22.357Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_vendorbiditemsview` |
| Kind | Function (inline TVF) |
| sys.objects.type | `IF` (SQL_INLINE_TABLE_VALUED_FUNCTION) |
| Created | 2011-06-08 22:58:09 |
| Modified | 2024-06-21 20:44:12 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@passPhrase` | IN | varchar(255) |  |
| 2 | `@VendorBidId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `vendorbiditems` | USER_TABLE |  |
| `vendorbiditemsjournal` | USER_TABLE |  |
| `VendorBids` | USER_TABLE |  |
| `VendorBidsJournal` | USER_TABLE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_VBUploadXML` | SQL_STORED_PROCEDURE |
| `dbo.sp_VBUploadXMLSaved` | SQL_STORED_PROCEDURE |
| `dbo.sp_VBUploadXMLTest` | SQL_STORED_PROCEDURE |
| `dbo.sp_VendorBiditemsView` | SQL_STORED_PROCEDURE |
| `dbo.sp_VendorBiditemsViewReport` | SQL_STORED_PROCEDURE |
| `dbo.uf_vendorbidsview` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| `dbo.uf_vendorbidsviewDiscounted` | SQL_INLINE_TABLE_VALUED_FUNCTION |

## Definition

```sql
CREATE function [dbo].[uf_vendorbiditemsview] (@passPhrase varchar(255), @VendorBidId int)
returns table as
return (select vbi.vendorbiditemid, 
               vb.vendorbidid, 
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
               case isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.unitprice,1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') when '' then '' else cast(cast(cast(DecryptByPassPhrase(@passPhrase, vbij.unitprice,1, cast(vbij.vendorbiditemid as varbinary)) as varchar) as decimal(9,2)) as varchar) end as unitprice, 
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.cost, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') as cost, 
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.vendoritemcode, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar(50)),'') as vendoritemcode, 
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.quantitybid, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') as quantitybid, 
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.alternate, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar(512)),'') as alternate, 
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.itemsperunit, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') as itemsperunit, 
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.pageno, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') as pageno, 
               isnull(vbij.datemodified,cast('1970-01-01 00:00:00.000' as datetime)) as datemodified, 
               case isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.itembidtype, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') when '' then 0 else 1 end as itemhasbeenbid, 
               vbi.itemid, 
               vbi.bidrequestitemid,
               cast(case isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.unitprice,1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') 
                 when '' then cast(0 as decimal(9,5))
                 else cast(cast(DecryptByPassPhrase(@passPhrase, vbij.unitprice,1, cast(vbij.vendorbiditemid as varbinary)) as varchar) as decimal(9,2))
                        - round(cast(cast(DecryptByPassPhrase(@passPhrase, vbij.unitprice,1, cast(vbij.vendorbiditemid as varbinary)) as varchar) as decimal(9,2)) * cast(cast(DecryptByPassPhrase(@passPhrase, vbj.biditemdiscountrate, 1, cast(vb.vendorbidid as varbinary)) as varchar) as decimal(9,5)) / 100,2)
               end as money) NetUnitCost,
               cast(case isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.unitprice,1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') 
                 when '' then cast(0 as decimal(9,5))
                 else cast(cast(DecryptByPassPhrase(@passPhrase, vbij.unitprice,1, cast(vbij.vendorbiditemid as varbinary)) as varchar) as decimal(9,2))
                        - round(cast(cast(DecryptByPassPhrase(@passPhrase, vbij.unitprice,1, cast(vbij.vendorbiditemid as varbinary)) as varchar) as decimal(9,2)) * cast(cast(DecryptByPassPhrase(@passPhrase, vbj.biditemdiscountrate, 1, cast(vb.vendorbidid as varbinary)) as varchar) as decimal(9,5)) / 100,2)
               end *
               vbi.quantity as money) NetCost,
               case isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.itembidtype, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'')
                 when 'A' then 'As Specified'
                 when 'C' then 'Compliant'
                 when 'N' then 'Non-Compliant'
                 else ''
               end Compliance,
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.Manufacturer, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar(50)),'') as Manufacturer, 
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.ManufacturerPartNumber, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar(50)),'') as ManufacturerPartNumber,
               cast(case isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.LinerGaugeMicrons, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'')
                 when '' then cast(0 as decimal(2,0))
                 else cast(cast(DecryptByPassPhrase(@passPhrase, vbij.LinerGaugeMicrons, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar) as decimal(2,0))
               end as decimal(2,0)) as LinerGaugeMicrons,
               cast(case isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.LinerGaugeMil, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') 
                 when '' then cast(0 as decimal(3,2))
                 else cast(isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.LinerGaugeMil, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') as decimal(3,2))
               end as decimal(3,2)) as LinerGaugeMil, 
               cast(case isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.LinerCaseWeight, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') 
                 when '' then cast(0 as decimal(4,2))
                 else cast(isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.LinerCaseWeight, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') as decimal(4,2))
               end as decimal(4,2)) as LinerCaseWeight, 
               cast(case isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.LinerDimWidth, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') 
                 when '' then cast(0 as decimal(4,2))
                 else cast(isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.LinerDimWidth, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') as decimal(4,2))
               end as decimal(4,2)) as LinerDimWidth, 
               cast(case isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.LinerDimDepth, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') 
                 when '' then cast(0 as decimal(4,2))
                 else cast(isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.LinerDimDepth, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') as decimal(4,2))
               end as decimal(4,2)) as LinerDimDepth, 
               cast(case isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.LinerDimLength, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') 
                 when '' then cast(0 as decimal(4,2))
                 else cast(isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.LinerDimLength, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar),'') as decimal(4,2))
               end as decimal(4,2))as LinerDimLength,
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.SDS_URL, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar(300)),'') as SDS_URL,
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.ImageURL, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar(300)),'') as ImageURL,
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.UPC_ISBN, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar(20)),'') as UPC_ISBN,
               isnull(cast(DecryptByPassPhrase(@passPhrase, vbij.UniqueItemNumber, 1, cast(vbij.vendorbiditemid as varbinary)) as varchar(50)),'') as UniqueItemNumber,
			   vbi.BidRequestItemId_Old
  from vendorbiditems as vbi
  join VendorBids vb on vb.VendorBidId = vbi.VendorBidId
                    and vb.VendorBidId = @VendorBidId
  left outer join vendorbiditemsjournal as vbij on vbij.vbijid = 
    (select top 1 vendorbiditemsjournal.vbijid 
       from vendorbiditemsjournal
      where vendorbiditemsjournal.vendorbiditemid = vbi.vendorbiditemid
      order by vendorbiditemsjournal.vbijid desc)
  left outer join VendorBidsJournal vbj on vbj.vbjid =
    (select top 1 vendorbidsjournal.vbjid
       from vendorbidsjournal
      where vendorbidsjournal.vendorbidid = vb.vendorbidid
      order by vendorbidsjournal.vbjid desc)
 )
```
