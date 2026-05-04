# Function: table-valued: `dbo.uf_DistrictSummaryVendorsBid`

_Generated on 2026-05-04T13:04:24.256Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_DistrictSummaryVendorsBid` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2006-05-18 17:00:24 |
| Modified | 2022-05-19 11:18:15 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRSId` | IN | int |  |
| 2 | `@pCategoryId` | IN | int |  |
| 3 | `@pBidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Vendors` | USER_TABLE |  |
| `dbo.uf_DistrictSummaryBid` | SQL_TABLE_VALUED_FUNCTION |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.rs_DistrictSummaryVendors` | VIEW |

## Definition

```sql
CREATE  function [dbo].[uf_DistrictSummaryVendorsBid](@pRSId int, @pCategoryId int, @pBidHeaderId int)
returns @DistrictSummary table (
RSId	int null,
VendorId int null,
CategoryId int null,
BidHeaderId int null,
LineCount int null,
GrossCost money null,
DiscountAmount money null,
NetCost money null,
TotalLineCount int null,
TotalGrossCost money null,
TotalDiscountAmount money null,
TotalNetCost money null,
VendorCode varchar(20) null,
VendorName varchar(50) null)
 
AS
begin
  insert @DistrictSummary (RSId, VendorId, CategoryId, BidHeaderId, LineCount, GrossCost, DiscountAmount, NetCost)
    select ListId, VendorId, CategoryId, BidHeaderId, sum(ItemCount), sum(isnull(GrossCost,0)), sum(isnull(DiscountAmount,0)), sum(isnull(BidCost,0))
      from (
        select ListId, VendorId, CategoryId, BidHeaderId, count(ItemCode) ItemCount, 
		       case UseGrossPrices when 0 then sum(isnull(Quantity,0) * isnull(BidPrice,0)) else sum(isnull(Quantity,0) * isnull(GrossPrice,0)) end GrossCost, 
			   case UseGrossPrices when 0 then 0 else sum(isnull(Quantity,0) * isnull(GrossPrice,0)) * isnull(DiscountRate,0) / 100 end DiscountAmount, 
--			   case UseGrossPrices when 0 then sum(isnull(Quantity,0) * isnull(BidPrice,0)) else sum(isnull(Quantity,0) * isnull(GrossPrice,0)) - (sum(isnull(Quantity,0) * isnull(GrossPrice,0)) * isnull(DiscountRate,0) / 100) end BidCost
			   sum(ExtendedPrice) BidCost
          from dbo.uf_DistrictSummaryBid(@pRSId, @pCategoryId, @pBidHeaderId)
         group by ListId, VendorId, CategoryId, BidHeaderId, DiscountRate, UseGrossPrices) ss
     group by ListId, VendorId, CategoryId, BidHeaderId

  Update @DistrictSummary
     set TotalLineCount = ss.TotalLineCount,
         TotalGrossCost = ss.TotalGrossCost,
         TotalDiscountAmount = ss.TotalDiscountAmount,
         TotalNetCost = ss.TotalNetCost
    from @DistrictSummary ds
    join (
      select RSId, BidHeaderId, sum(LineCount) TotalLineCount, sum(GrossCost) TotalGrossCost,
             sum(DiscountAmount) TotalDiscountAmount, sum(NetCost) TotalNetCost
        from @DistrictSummary
       group by RSId, BidHeaderId
         ) ss on ss.RSId = ds.RSId and ss.BidHeaderId = ds.BidHeaderId

  update @DistrictSummary
     set VendorCode = Vendors.Code,
         VendorName = Vendors.Name
    from @DistrictSummary ds
    join Vendors on Vendors.VendorId = ds.VendorId

return
end
```
