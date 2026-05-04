# Function: table-valued: `dbo.uf_DistrictSummaryVendors`

_Generated on 2026-05-04T14:49:07.371Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_DistrictSummaryVendors` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2002-06-26 22:30:05 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.uf_districtsummary` | SQL_TABLE_VALUED_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function uf_DistrictSummaryVendors ()
returns @DistrictSummary table (
RSId	int null,
VendorId int null,
CategoryId int null,
LineCount int null,
Cost	money null)
 
AS
begin
  insert @DistrictSummary (RSId, VendorId, CategoryId, LineCount, Cost)
    select ListId, VendorId, CategoryId, count(ItemCode), sum(ExtendedPrice)
      from dbo.uf_districtsummary()
     group by ListId, VendorId, CategoryId

return
end
```
