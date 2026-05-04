# Function: table-valued: `dbo.uf_BidSummaryVendors`

_Generated on 2026-05-04T13:43:18.972Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_BidSummaryVendors` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2004-05-07 18:34:07 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.uf_BidSummary` | SQL_TABLE_VALUED_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create  function dbo.uf_BidSummaryVendors(@pBidHeaderId int)
returns @DistrictSummary table (
RSId	int null,
VendorId int null,
CategoryId int null,
LineCount int null,
GrossCost money null,
DiscountAmount money null,
NetCost money null,
TotalLineCount int null,
TotalGrossCost money null,
TotalDiscountAmount money null,
TotalNetCost money null)
 
AS
begin
  insert @DistrictSummary (RSId, VendorId, CategoryId, LineCount, GrossCost, DiscountAmount, NetCost)
    select ListId, VendorId, CategoryId, sum(ItemCount), sum(isnull(GrossCost,0)), sum(isnull(DiscountAmount,0)), sum(isnull(BidCost,0))
      from (
        select ListId, VendorId, CategoryId, count(ItemCode) ItemCount, case UseGrossPrices when 0 then sum(isnull(Quantity,0) * isnull(BidPrice,0)) else sum(isnull(Quantity,0) * isnull(GrossPrice,0)) end GrossCost, case UseGrossPrices when 0 then 0 else sum(isnull(Quantity,0) * isnull(GrossPrice,0)) * isnull(DiscountRate,0) / 100 end DiscountAmount, case UseGrossPrices when 0 then sum(isnull(Quantity,0) * isnull(BidPrice,0)) else sum(isnull(Quantity,0) * isnull(GrossPrice,0)) - (sum(isnull(Quantity,0) * isnull(GrossPrice,0)) * isnull(DiscountRate,0) / 100) end BidCost
          from dbo.uf_BidSummary(@pBidHeaderId)
         group by ListId, VendorId, CategoryId, DiscountRate, UseGrossPrices) ss
     group by ListId, VendorId, CategoryId

  Update @DistrictSummary
     set TotalLineCount = ss.TotalLineCount,
         TotalGrossCost = ss.TotalGrossCost,
         TotalDiscountAmount = ss.TotalDiscountAmount,
         TotalNetCost = ss.TotalNetCost
    from @DistrictSummary ds
    join (
      select RSId, sum(LineCount) TotalLineCount, sum(GrossCost) TotalGrossCost,
             sum(DiscountAmount) TotalDiscountAmount, sum(NetCost) TotalNetCost
        from @DistrictSummary
       group by RSId
         ) ss on ss.RSId = ds.RSId

return
end
```
