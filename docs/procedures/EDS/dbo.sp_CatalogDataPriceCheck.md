# Procedure: `dbo.sp_CatalogDataPriceCheck`

_Generated on 2026-05-04T13:04:24.073Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CatalogDataPriceCheck` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-02-21 18:44:53 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `NewFF` | unresolved |  |
| `PricePlans` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `dbo.uf_RemoveLeadingZeros` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE       procedure sp_CatalogDataPriceCheck AS

create table #ImportBatch (
DataRow	varchar(512),
RowId	int identity(1,1)
)

BULK INSERT #ImportBatch 
 FROM 'A:TEST.DAT' 
 WITH (FORMATFILE = 'C:\INETPUB\EDSIQ\ImportQty1.fmt')

select case right('        ' + dbo.uf_RemoveLeadingZeros(rtrim(substring(#ImportBatch.DataRow,3,8))),8) when NewFF.ItemCode then 'OK' else 'BAD' end ItemCodeStatus,
    right('        ' + dbo.uf_RemoveLeadingZeros(rtrim(substring(#ImportBatch.DataRow,3,8))),8) ImportItemCode,
    NewFF.ItemCode DBItemCode,
    case convert(money,substring(#ImportBatch.DataRow,15,7)) when NewFF.GrossPrice then 'OK' else 'BAD' end PriceStatus,
    convert(money,substring(#ImportBatch.DataRow,15,7)) ImportPrice,
    NewFF.GrossPrice DBGrossPrice,
    case substring(#ImportBatch.DataRow,11,4) when Vendors.Code then 'OK' else 'BAD' end VendorStatus,
    substring(#ImportBatch.DataRow,11,4) ImportVendor,
    Vendors.Code DBVendor
into #LineStatus
from #ImportBatch
join PricePlans on PricePlans.Code = substring(#ImportBatch.DataRow,1,2)
join Vendors on Vendors.Code = substring(#ImportBatch.DataRow,11,4)
left outer join NewFF on NewFF.ItemCode = right('        ' + dbo.uf_RemoveLeadingZeros(rtrim(substring(#ImportBatch.DataRow,3,8))),8)
   and NewFF.PricePlanId = PricePlans.PricePlanId

select * from #LineStatus
where 'BAD' in (ItemCodeStatus, PriceStatus, VendorStatus)

drop table #LineStatus
drop table #ImportBatch
```
