# Procedure: `dbo.sp_CatalogDataCheck`

_Generated on 2026-05-04T14:49:07.220Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CatalogDataCheck` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-02-18 17:23:40 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `District` | USER_TABLE |  |
| `NewFF` | unresolved |  |
| `dbo.uf_RemoveLeadingZeros` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE    procedure sp_CatalogDataCheck AS

create table #ImportBatch (
DataRow	varchar(512),
RowId	int identity(1,1)
)

BULK INSERT #ImportBatch 
 FROM 'A:TEST.DAT' 
 WITH (FORMATFILE = 'C:\INETPUB\EDSIQ\ImportQty1.fmt')

select case right('        ' + dbo.uf_RemoveLeadingZeros(substring(#ImportBatch.DataRow,305,8)),8) when NewFF.ItemCode then 'OK' else 'BAD' end ItemCodeStatus,
    right('        ' + dbo.uf_RemoveLeadingZeros(substring(#ImportBatch.DataRow,305,8)),8) ImportItemCode,
    NewFF.ItemCode DBItemCode,
    case convert(money,substring(#ImportBatch.DataRow,328,7)) when NewFF.GrossPrice then 'OK' else 'BAD' end PriceStatus,
    convert(money,substring(#ImportBatch.DataRow,328,7)) ImportPrice,
    NewFF.GrossPrice DBGrossPrice,
    case NewFF.Code
      when substring(#ImportBatch.DataRow,323,5) then 'OK'
      else case len(rtrim(substring(#ImportBatch.DataRow,323,5)))
             when 2 then
               case substring(NewFF.Code,1,2)
                 when substring(#ImportBatch.DataRow,323,2) then 'OK'
                 else case substring(#ImportBatch.DataRow,323,2)
                        when substring(NewFF.Code,1,1) + substring(NewFF.Code,len(rtrim(NewFF.Code)),1) then 'OK'
                        else 'BAD'
                      end
               end
             else 'BAD'
           end
    end  UnitStatus,
    substring(#ImportBatch.DataRow,323,5) ImportUnits,
    NewFF.Code DBUnits,
    case substring(#ImportBatch.DataRow,348,8) when NewFF.VendorItemCode then 'OK' else 'BAD' end CrossRefStatus,
    substring(#ImportBatch.DataRow,348,8) ImportCrossRef,
    NewFF.VendorItemCode DBCrossRef
into #LineStatus
from #ImportBatch
join District on District.DistrictCode = substring(#ImportBatch.DataRow,1,2)
left outer join NewFF on NewFF.ItemCode = right('        ' + dbo.uf_RemoveLeadingZeros(substring(#ImportBatch.DataRow,305,8)),8)
   and NewFF.DistrictId = District.DistrictId

select * from #LineStatus
where 'BAD' in (ItemCodeStatus, PriceStatus, UnitStatus, CrossRefStatus)

drop table #LineStatus
drop table #ImportBatch
```
