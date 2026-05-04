# Function: table-valued: `dbo.uf_DistrictSummaryBidHeader`

_Generated on 2026-05-04T13:07:57.616Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_DistrictSummaryBidHeader` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2016-03-30 23:12:34 |
| Modified | 2016-03-30 23:12:34 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRSId` | IN | int |  |
| 2 | `@pBidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `dbo.BidItems` | USER_TABLE |  |
| `dbo.Category` | USER_TABLE |  |
| `dbo.Detail` | USER_TABLE |  |
| `dbo.District` | USER_TABLE |  |
| `dbo.ReportSessionLinks` | USER_TABLE |  |
| `dbo.Requisitions` | USER_TABLE |  |
| `dbo.School` | USER_TABLE |  |
| `dbo.uf_DetailDescription` | SQL_SCALAR_FUNCTION |  |
| `dbo.Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create function [dbo].[uf_DistrictSummaryBidHeader] (@pRSId int, @pBidHeaderId int)
returns @RetTable table (
CategoryName	varchar(50) null,
DistrictName    varchar(50) null,
ItemId		int null,
ItemCode	varchar(50) null,
SortSeq		varchar(50) null,
[Description]	varchar(1536) null,
UnitCode	varchar(16) null,
Quantity	int null,
VendorCode	varchar(10) null,
UnitPrice	money null,
ExtendedPrice	money null,
BidPrice	money null,
GrossPrice	money null,
DiscountRate	decimal(9,5) null,
UseGrossPrices	tinyint null,
VendorId	int null,
VendorItemCode	varchar(50) null,
Alternate	varchar(1024) null,  -- changed 5/3/13 from 512 kjm
DistrictId	int null,
CategoryId	int null,
PricePlanId	int null,
AwardId		int null,
BudgetId        int null,
VendorTotal	money null,
VendorCount	int null,
CategoryTotal	money null,
CategoryCount	int null,
DistrictTotal	money null,
DistrictCount	int null,
ListId		int null,
BidHeaderId 	int null
)
 
as
begin
  insert @RetTable (ItemId, BidPrice, GrossPrice, Quantity, VendorId, VendorItemCode, Alternate, DistrictId, ListId, CategoryName, DistrictName, ItemCode, SortSeq, Description, UnitCode, VendorCode, UnitPrice, ExtendedPrice, DiscountRate, UseGrossPrices, CategoryId, PricePlanId, AwardId, BudgetId, BidHeaderId)
    select dbo.Detail.ItemId,
           round(dbo.Detail.BidPrice,2),
           round(dbo.Detail.GrossPrice,2),
           sum(dbo.Detail.Quantity) Quantity, 
           dbo.Detail.VendorId,
           dbo.Detail.VendorItemCode,
           dbo.Detail.Alternate,
           dbo.School.DistrictId,
           rsl.RSId,
           dbo.Category.[Name],
           dbo.District.[Name],
           dbo.Detail.ItemCode,
           dbo.Detail.SortSeq,
           max(dbo.uf_DetailDescription(Detail.DetailId)) + char(13) + char(10) + 'REF: ' + case isnull(Detail.VendorItemCode,'') when '' then '' else rtrim(Detail.VendorItemCode) + ' ' end + rtrim(isnull(Detail.Alternate,'')),
           dbo.Detail.UnitCode,
           dbo.Vendors.Code,
           max(case isnull(dbo.Detail.UseGrossPrices,0) when 0 then round(Detail.BidPrice,2) else round(Detail.GrossPrice,2) end) GrossPrice,
           sum(case isnull(dbo.Detail.UseGrossPrices,0) when 0 then round(Detail.BidPrice,2) * Detail.Quantity else round(Detail.GrossPrice,2) * Detail.Quantity end) ExtendedPrice,
           isnull(dbo.Detail.DiscountRate,0),
           isnull(dbo.Detail.UseGrossPrices,0),
           dbo.Requisitions.CategoryId,
           isnull(BidHeaders.PricePlanId,0),
           0, /*dbo.Detail.AwardId,*/
           dbo.Requisitions.BudgetId,
           case isnull(dbo.Detail.ItemMustBeBid,0) when 1 then case isnull(dbo.Detail.BidHeaderId,0) when 0 then null else dbo.Detail.BidHeaderId end else case isnull(dbo.Detail.BidItemId,0) when 0 then dbo.Requisitions.BidHeaderId else dbo.Bids.BidHeaderId end end
      from dbo.Detail
      join dbo.Requisitions on dbo.Requisitions.RequisitionId = dbo.Detail.RequisitionId
      join dbo.School on dbo.School.SchoolId = dbo.Requisitions.SchoolId
      join dbo.Category on dbo.Category.CategoryId = dbo.Requisitions.CategoryId
      join dbo.Vendors on dbo.Vendors.VendorId = case isnull(Detail.ItemMustBeBid,0) when 1 then 7691 else case isnull(Detail.VendorId,0) when 0 then 7691 else Detail.VendorId end end
      join dbo.District on dbo.District.DistrictId = School.DistrictId
      join dbo.ReportSessionLinks rsl on rsl.IntId = Requisitions.RequisitionId
      left outer join dbo.BidItems on BidItems.BidItemId = Detail.BidItemId
      left outer join Bids on Bids.BidId = BidItems.BidId
      left outer join BidHeaders on BidHeaders.BidHeaderId = case isnull(Detail.BidItemId,0) when 0 then isnull(Requisitions.BidHeaderId,0) else Bids.BidHeaderId end
     where Detail.ItemId is not null 
       and rsl.RSId = @pRSId 
       and case isnull(Detail.BidItemId,0) when 0 then isnull(Requisitions.BidHeaderId,0) else Bids.BidHeaderId end = @pBidHeaderId
     group by rsl.RSId, dbo.Detail.ItemId, dbo.Detail.BidPrice, dbo.Detail.GrossPrice,
              dbo.Detail.VendorId, dbo.Detail.VendorItemCode, dbo.Detail.Alternate,
              dbo.School.DistrictId, Category.Name, District.Name, Detail.ItemCode, 
              Detail.SortSeq, /*Detail.Description, */ Detail.UnitCode, Vendors.Code, 
              isnull(Detail.UseGrossPrices,0), Requisitions.CategoryId, BidHeaders.PricePlanId, 
              /*Detail.AwardId, */Requisitions.BudgetId, Detail.DiscountRate, 
--              case isnull(dbo.Detail.BidHeaderId,0) when 0 then dbo.Requisitions.BidHeaderId else dbo.Detail.BidHeaderId end
           case isnull(dbo.Detail.ItemMustBeBid,0) when 1 then case isnull(dbo.Detail.BidHeaderId,0) when 0 then null else dbo.Detail.BidHeaderId end else case isnull(dbo.Detail.BidItemId,0) when 0 then dbo.Requisitions.BidHeaderId else dbo.Bids.BidHeaderId end end

  Update @RetTable
     Set VendorTotal = ss.TotalAmount,
         VendorCount = ss.ItemCount
    from @RetTable rt
    join (
          select rt1.ListId, rt1.DistrictId, rt1.BidHeaderId, rt1.VendorId, sum(ItemCount) ItemCount, sum(TotalAmount) TotalAmount
            from (
              select rt1.ListId, rt1.DistrictId, rt1.BidHeaderId, rt1.VendorId, count(rt1.ItemCode) ItemCount, case rt1.UseGrossPrices when 0 then sum(isnull(rt1.Quantity,0) * isnull(rt1.BidPrice,0)) else sum(isnull(rt1.Quantity,0) * isnull(rt1.GrossPrice,0)) - (sum(isnull(rt1.Quantity,0) * isnull(rt1.GrossPrice,0)) * isnull(rt1.DiscountRate,0) / 100) end TotalAmount
                from @RetTable rt1
               group by rt1.ListId, rt1.DistrictId, rt1.BidHeaderId, rt1.VendorId, rt1.UseGrossPrices, rt1.DiscountRate
                 ) rt1
           group by rt1.ListId, rt1.DistrictId, rt1.BidHeaderId, rt1.VendorId
         ) ss on ss.ListId = rt.ListId
             and ss.DistrictId = rt.DistrictId
             and ss.BidHeaderId = rt.BidHeaderId
             and ss.VendorId = rt.VendorId

  Update @RetTable
     Set CategoryTotal = ss.TotalAmount,
         CategoryCount = ss.ItemCount
    from @RetTable rt
    join (select rt1.ListId, rt1.DistrictId, rt1.CategoryId, count(rt1.ItemCode) ItemCount, sum(isnull(rt1.ExtendedPrice,0)) TotalAmount
            from @RetTable rt1
           group by rt1.ListId, rt1.DistrictId, rt1.CategoryId) ss on ss.ListId = rt.ListId
                                                                and ss.DistrictId = rt.DistrictId
                                                                and ss.CategoryId = rt.CategoryId

  Update @RetTable
     Set DistrictTotal = ss.TotalAmount,
         DistrictCount = ss.ItemCount
    from @RetTable rt
    join (select rt1.DistrictId, count(rt1.ItemCode) ItemCount, sum(isnull(rt1.ExtendedPrice,0)) TotalAmount
            from @RetTable rt1
           group by rt1.DistrictId) ss on ss.DistrictId = rt.DistrictId

return
end
```
