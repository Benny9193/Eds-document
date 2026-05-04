# Function: scalar: `dbo.uf_PackCodeCatalog`

_Generated on 2026-05-04T13:04:00.595Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_PackCodeCatalog` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2002-12-12 10:09:14 |
| Modified | 2013-02-26 17:41:25 |
| Encrypted | no |
| Returns | varchar(255) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pCode` | IN | varchar(255) |  |
| 2 | `@pCatalogId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Catalog` | USER_TABLE |  |
| `dbo.ufn_RegExIsMatch` | unresolved | `master` |
| `dbo.ufn_RegExReplace` | unresolved | `master` |

## Called by

| Caller | Type |
|--------|------|
| `null.uf_LookupItemCode` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.sp_AwardBidHeader` | SQL_STORED_PROCEDURE |
| `dbo.sp_AwardBidHeaderSingleItem` | SQL_STORED_PROCEDURE |
| `dbo.sp_BatchVerify` | SQL_STORED_PROCEDURE |
| `dbo.sp_BatchVerifyBook` | SQL_STORED_PROCEDURE |
| `dbo.sp_BatchVerifyForce` | SQL_STORED_PROCEDURE |
| `dbo.sp_CatalogImporterXML` | SQL_STORED_PROCEDURE |
| `dbo.sp_CreateOrderBook03` | SQL_STORED_PROCEDURE |
| `dbo.sp_EnhancedSearchItem` | SQL_STORED_PROCEDURE |
| `dbo.sp_UpdateVIC` | SQL_STORED_PROCEDURE |
| `dbo.trig_CrossRefs` | SQL_TRIGGER |
| `dbo.uf_LookupItemCode` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_LookupItemCodeByBH` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_LookupItemCodeByBH1` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_LookupItemCodeByReq` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_LookupItemCodeByReq-120912` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_LookupItemCodeByReqOld120912` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_LookupItemCodeByReqSaved` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_LookupItemCodeByReqTest` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendor` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendor_BK20241205` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendor_BK20241227` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendorTest` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_LookupItemCodeReq` | SQL_TABLE_VALUED_FUNCTION |

## Definition

```sql
CREATE function [dbo].[uf_PackCodeCatalog](@pCode varchar(255), @pCatalogId int)
returns varchar(255)   AS
begin
declare @ReturnValue varchar(255)

if master.dbo.ufn_RegExIsMatch(@pCode, '^(?<base>[\x00-\x7F]{2}ADD[0-9]{5})$',0) = 1
begin
  select @ReturnValue = @pCode 
end
else
begin
  if isnull(@pCatalogId,0) = 0
  begin
    select @ReturnValue = isnull(master.dbo.ufn_RegExReplace(@pCode,'[^0-9A-Za-z]','',0),'')  
  end
  else
  begin
    select @ReturnValue = isnull(master.dbo.ufn_RegExReplace(master.dbo.ufn_RegExReplace(@pCode,isnull(Catalog.PackExp,'^(?i)' + isnull(Catalog.DropSeq,'') + '(?<base>.*)$'),isnull(Catalog.PackReplace,'${base}'),0),'[^0-9A-Za-z]','',0),'')
    --select @ReturnValue = isnull(master.dbo.ufn_RegExReplace(master.dbo.ufn_RegExReplace(@pCode,isnull(Catalog.PackExp,'^' + isnull(Catalog.DropSeq,'') + '(?<base>.*)$'),isnull(Catalog.PackReplace,'${base}'),0),'[^0-9A-Za-z]','',0),'')
      from Catalog with (nolock)
     where Catalog.CatalogId = @pCatalogId
  end
end

return @returnValue
end
```
