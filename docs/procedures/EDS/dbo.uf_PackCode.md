# Function: scalar: `dbo.uf_PackCode`

_Generated on 2026-05-04T13:07:57.673Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_PackCode` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2002-06-26 19:59:18 |
| Modified | 2011-11-14 18:16:25 |
| Encrypted | no |
| Returns | varchar(255) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pCode` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.ufn_RegExIsMatch` | unresolved | `master` |
| `dbo.ufn_RegExReplace` | unresolved | `master` |

## Called by

| Caller | Type |
|--------|------|
| `null.sp_CCAddAddendaItem_EDSIQWebuser` | SQL_STORED_PROCEDURE |
| `null.sp_CCAddAddendaMaint` | SQL_STORED_PROCEDURE |
| `null.uf_LookupItemCode` | SQL_TABLE_VALUED_FUNCTION |
| `null.uf_LookupItems` | SQL_TABLE_VALUED_FUNCTION |
| `null.uf_LookupItemsByCatalog` | SQL_TABLE_VALUED_FUNCTION |
| `null.uf_LookupItemsForBatch` | SQL_TABLE_VALUED_FUNCTION |
| `null.uf_LookupItemsForBatch1` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| `null.uf_LookupItemsForBook` | SQL_TABLE_VALUED_FUNCTION |
| `null.uf_LookupItemsForBook1` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| `null.uf_LookupPrice` | SQL_TABLE_VALUED_FUNCTION |
| `null.uf_LookupPrices` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.sp_AddISBN` | SQL_STORED_PROCEDURE |
| `dbo.sp_AddMSRPItem` | SQL_STORED_PROCEDURE |
| `dbo.sp_AwardBidHeader` | SQL_STORED_PROCEDURE |
| `dbo.sp_AwardBidHeaderSingleItem` | SQL_STORED_PROCEDURE |
| `dbo.sp_BatchVerify` | SQL_STORED_PROCEDURE |
| `dbo.sp_BatchVerifyBook` | SQL_STORED_PROCEDURE |
| `dbo.sp_BatchVerifyForce` | SQL_STORED_PROCEDURE |
| `dbo.sp_CCAddAddendaItem` | SQL_STORED_PROCEDURE |
| `dbo.sp_CCAddAddendaMaint` | SQL_STORED_PROCEDURE |
| `dbo.sp_CCItemMaint` | SQL_STORED_PROCEDURE |
| `dbo.sp_FA_CCAddAddendaItem` | SQL_STORED_PROCEDURE |
| `dbo.sp_UpdateISBN` | SQL_STORED_PROCEDURE |
| `dbo.trig_Items` | SQL_TRIGGER |
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
| `dbo.uf_OrderBook` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBook03` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBookNew` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBookSaved` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBookTest` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBookTest1` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderOrBudgetBook` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_PackCodeExport_Old` | SQL_SCALAR_FUNCTION |
| `dbo.usp_BidRequestMergeActions` | SQL_STORED_PROCEDURE |
| `dbo.vw_ItemPricing` | VIEW |

## Definition

```sql
CREATE function [dbo].[uf_PackCode] (@pCode varchar(255))
returns varchar(255) --with schemabinding AS
begin

if master.dbo.ufn_RegExIsMatch(@pCode, '^(?<base>[\x00-\x7F]{2}ADD[0-9]{5})$',1) = 1
begin
  return isnull(@pCode,'null') 
end
return isnull(isnull(master.dbo.ufn_RegExReplace(@pCode,'[^0-9A-Za-z]','',0),''),'null')
end
```
