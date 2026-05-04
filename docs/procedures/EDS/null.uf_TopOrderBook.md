# Function: inline table-valued: `null.uf_TopOrderBook`

_Generated on 2026-05-04T13:04:00.232Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `uf_TopOrderBook` |
| Kind | Function (inline TVF) |
| sys.objects.type | `IF` (SQL_INLINE_TABLE_VALUED_FUNCTION) |
| Created | 2002-08-14 21:46:24 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `EDSIQWebUser.uf_OrderBook` | SQL_TABLE_VALUED_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  function EDSIQWebUser.uf_TopOrderBook (@pCategoryId int, @pPricePlanId int, @pDistrictId int)
returns table
AS

  return (select top 800 with ties * from EDSIQWebUser.uf_OrderBook (@pCategoryId, @pPricePlanId, @pDistrictId) order by Weight desc)
```
