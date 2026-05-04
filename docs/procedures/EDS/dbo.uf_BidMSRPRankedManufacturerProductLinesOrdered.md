# Function: table-valued: `dbo.uf_BidMSRPRankedManufacturerProductLinesOrdered`

_Generated on 2026-05-04T13:43:18.966Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_BidMSRPRankedManufacturerProductLinesOrdered` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2013-11-18 23:55:23 |
| Modified | 2013-11-18 23:55:23 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidImports` | USER_TABLE |  |
| `BidMSRPResultPrices` | USER_TABLE |  |
| `BidMSRPResults` | USER_TABLE |  |
| `BidMSRPResultsProductLines` | USER_TABLE |  |
| `PriceListTypes` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `vw_BidMSRPRankedManufacturerProductLines` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create function dbo.uf_BidMSRPRankedManufacturerProductLinesOrdered(@pBidHeaderId int)
returns @Results table (
BidHeaderId					int,
ManufacturerId				int,
ManufacturerName			varchar(100),
ManufacturerProductLineId	int, 
ProductLineName				varchar(255), 
MSRPOptionId				int, 
OptionName					varchar(255),
BidMSRPResultsId			int, 
BidMSRPResultsProductLineId	int, 
WriteInManufacturer			varchar(100), 
WriteInFlag					int, 
WinningBidOverride			int, 
DiscountRate				decimal(9,5), 
PriceListTypeId				int, 
TotalAward					int, 
TotalAwardDiscount			decimal(9,5),
ProductLineWeight			decimal(9,5),
TotalAwardManufacturerWeight decimal(9,5),
TotalAwardProductLineWeight	decimal(9,5),
SortKey						varchar(255),
PriceListType				varchar(50),
VendorId					int,
VendorName					varchar(50),
PriceListWarning			varchar(50))
as
begin
insert @Results (BidHeaderId, ManufacturerId, ManufacturerName, ManufacturerProductLineId, ProductLineName, MSRPOptionId, OptionName,
                 BidMSRPResultsId, BidMSRPResultsProductLineId, WriteInManufacturer, WriteInFlag, WinningBidOverride, DiscountRate, 
                 PriceListTypeId, TotalAward, TotalAwardDiscount, ProductLineWeight, TotalAwardManufacturerWeight, TotalAwardProductLineWeight,
                 SortKey, PriceListType, VendorId, VendorName, PriceListWarning)
select plo.BidHeaderId, plo.ManufacturerId, plo.ManufacturerName, plo.ManufacturerProductLineId, plo.ProductLineName, plo.MSRPOptionId, plo.OptionName,
       bmr.BidMSRPResultsId, bmpl.BidMSRPResultsProductLineId, bmr.WriteInManufacturer, bmr.WriteInFlag, bmr.WinningBidOverride, 
       case -- Check for Total Award being a better deal
                         when isnull(((select SUM((bmrp.RangeValue + bmr1.TotalAwardDiscount) * bmrp.RangeWeight)
                                 from BidMSRPResultPrices bmrp with (nolock)
                                 join BidMSRPResultsProductLines bmrpl1 on bmrpl1.BidMSRPResultsProductLineId = bmrp.BidMSRPResultsProductLineId
                                 join BidMSRPResults bmr1 on bmr1.BidMSRPResultsId = bmrpl1.BidMSRPResultsId
                                where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId
                                  and bmrp.Active = 1)),0) >=
                             isnull(((select SUM(bmrp.RangeValue * bmrp.RangeWeight)
                                        from BidMSRPResultPrices bmrp with (nolock)
                                        join BidMSRPResultsProductLines bmrpl1 on bmrpl1.BidMSRPResultsProductLineId = bmrp.BidMSRPResultsProductLineId
                                       where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId
                                         and bmrpl1.ManufacturerProductLineId = plo.ManufacturerProductLineId
                                         and bmrp.Active = 1)),0)
                           then -- Total Award is Better
                             isnull(((select SUM((bmrp.RangeValue + bmr1.TotalAwardDiscount) * bmrp.RangeWeight) / SUM(bmrp.RangeWeight)
                                           from BidMSRPResultPrices bmrp with (nolock)
                                           join BidMSRPResultsProductLines bmrpl1 on bmrpl1.BidMSRPResultsProductLineId = bmrp.BidMSRPResultsProductLineId
                                           join BidMSRPResults bmr1 on bmr1.BidMSRPResultsId = bmrpl1.BidMSRPResultsId
                                          where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId
                                            and bmrpl1.ManufacturerProductLineId = plo.ManufacturerProductLineId
                                            and bmrp.Active = 1)),0)
                         else -- Line Award is better
                             isnull(((select SUM(bmrp.RangeValue * bmrp.RangeWeight) / SUM(bmrp.RangeWeight)
                                        from BidMSRPResultPrices bmrp with (nolock)
                                        join BidMSRPResultsProductLines bmrpl1 on bmrpl1.BidMSRPResultsProductLineId = bmrp.BidMSRPResultsProductLineId
                                       where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId
                                         and bmrpl1.ManufacturerProductLineId = plo.ManufacturerProductLineId
                                         and bmrp.Active = 1)),0)
                       end
       DiscountRate, 
       bmr.PriceListTypeId, bmr.TotalAward, bmr.TotalAwardDiscount,
       (select SUM(bmrp.RangeValue * bmrp.RangeWeight)
          from BidMSRPResultPrices bmrp with (nolock)
          join BidMSRPResultsProductLines bmrpl1 on bmrpl1.BidMSRPResultsProductLineId = bmrp.BidMSRPResultsProductLineId
         where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId
           and bmrpl1.ManufacturerProductLineId = plo.ManufacturerProductLineId
           and bmrp.Active = 1) ProductLineWeight,
       (select SUM((bmrp.RangeValue + bmr1.TotalAwardDiscount) * bmrp.RangeWeight)
          from BidMSRPResultPrices bmrp with (nolock)
          join BidMSRPResultsProductLines bmrpl1 on bmrpl1.BidMSRPResultsProductLineId = bmrp.BidMSRPResultsProductLineId
          join BidMSRPResults bmr1 on bmr1.BidMSRPResultsId = bmrpl1.BidMSRPResultsId
         where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId
           and bmrp.Active = 1) TotalAwardManufacturerWeight,
       (select SUM((bmrp.RangeValue + bmr1.TotalAwardDiscount) * bmrp.RangeWeight)
          from BidMSRPResultPrices bmrp with (nolock)
          join BidMSRPResultsProductLines bmrpl1 on bmrpl1.BidMSRPResultsProductLineId = bmrp.BidMSRPResultsProductLineId
          join BidMSRPResults bmr1 on bmr1.BidMSRPResultsId = bmrpl1.BidMSRPResultsId
         where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId
           and bmrpl1.ManufacturerProductLineId = plo.ManufacturerProductLineId
           and bmrp.Active = 1) TotalAwardProductLineWeight,
       Case 
         when bmr.WinningBidOverride = 1 then '0' 
         else '1' 
       end + 
       right(replicate('0',12) + 
             cast(cast(9999999999 - 
                       case -- Check for Total Award being a better deal
                         when isnull(((select SUM((bmrp.RangeValue + bmr1.TotalAwardDiscount) * bmrp.RangeWeight)
                                 from BidMSRPResultPrices bmrp with (nolock)
                                 join BidMSRPResultsProductLines bmrpl1 on bmrpl1.BidMSRPResultsProductLineId = bmrp.BidMSRPResultsProductLineId
                                 join BidMSRPResults bmr1 on bmr1.BidMSRPResultsId = bmrpl1.BidMSRPResultsId
                                where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId
                                  and bmrp.Active = 1) * 100000),0) >=
                             isnull(((select SUM(bmrp.RangeValue * bmrp.RangeWeight)
                                        from BidMSRPResultPrices bmrp with (nolock)
                                        join BidMSRPResultsProductLines bmrpl1 on bmrpl1.BidMSRPResultsProductLineId = bmrp.BidMSRPResultsProductLineId
                                       where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId
                                         and bmrpl1.ManufacturerProductLineId = plo.ManufacturerProductLineId
                                         and bmrp.Active = 1) * 100000),0)
                           then -- Total Award is Better
                             isnull(((select SUM((bmrp.RangeValue + bmr1.TotalAwardDiscount) * bmrp.RangeWeight)
                                           from BidMSRPResultPrices bmrp with (nolock)
                                           join BidMSRPResultsProductLines bmrpl1 on bmrpl1.BidMSRPResultsProductLineId = bmrp.BidMSRPResultsProductLineId
                                           join BidMSRPResults bmr1 on bmr1.BidMSRPResultsId = bmrpl1.BidMSRPResultsId
                                          where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId
                                            and bmrp.Active = 1) * 100000),0)
                         else -- Line Award is better
                             isnull(((select SUM(bmrp.RangeValue * bmrp.RangeWeight)
                                        from BidMSRPResultPrices bmrp with (nolock)
                                        join BidMSRPResultsProductLines bmrpl1 on bmrpl1.BidMSRPResultsProductLineId = bmrp.BidMSRPResultsProductLineId
                                       where bmrp.BidMSRPResultsId = bmr.BidMSRPResultsId
                                         and bmrpl1.ManufacturerProductLineId = plo.ManufacturerProductLineId
                                         and bmrp.Active = 1) * 100000),0)
                       end as bigint) 
                   as varchar),12) SortKey,
       plt.Name PriceListType,
       Vendors.VendorId,
       Vendors.Name VendorName,
       case (select count(*)
               from (select bmr1.PriceListTypeId
                       from BidMSRPResults bmr1 with (nolock)
                       join BidImports bi1 on bi1.BidImportId = bmr1.BidImportId
                                          and bi1.Active = 1
                                          and bi1.BidHeaderId = plo.BidHeaderId
                      where bmr1.ManufacturerId = bmr.ManufacturerId
                      group by bmr1.PriceListTypeId) ss)
         when 0 then '*** No Bid ***'
         when 1 then 
           case 
             when (select bmr1.PriceListTypeId
                     from BidMSRPResults bmr1 with (nolock)
                     join BidImports bi1 on bi1.BidImportId = bmr1.BidImportId
                                        and bi1.Active = 1
                                        and bi1.BidHeaderId = plo.BidHeaderId
                    where bmr1.ManufacturerId = bmr.ManufacturerId
                    group by bmr1.PriceListTypeId) = 1 then 'All Manufacturer Price Lists'
             else 'All Vendor Price Lists'
           end
         else
           'Mixed Price List Types'
       end PriceListWarning
  from [vw_BidMSRPRankedManufacturerProductLines] plo with (nolock)
  left outer join BidMSRPResults bmr on bmr.BidHeaderId = plo.BidHeaderId
                                    and bmr.ManufacturerId = plo.ManufacturerId
                                    and bmr.Active = 1
  left outer join BidMSRPResultsProductLines bmpl on bmpl.BidMSRPResultsId = bmr.BidMSRPResultsId
                                                 and bmpl.Active = 1
                                                 and bmpl.ManufacturerProductLineId = plo.ManufacturerProductLineId
  left outer join BidImports bi on bi.BidImportId = bmr.BidImportId
  left outer join PriceListTypes plt on plt.PriceListTypeId = bmr.PriceListTypeId
  left outer join Vendors on Vendors.VendorId = bi.VendorId
 where plo.BidHeaderId = @pBidHeaderId
 
 return
end
```
