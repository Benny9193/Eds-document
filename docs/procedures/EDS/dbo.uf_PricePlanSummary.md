# Function: table-valued: `dbo.uf_PricePlanSummary`

_Generated on 2026-05-04T13:04:00.609Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_PricePlanSummary` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2003-06-30 12:55:44 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pPricePlanId` | IN | int |  |
| 2 | `@pCategoryId` | IN | int |  |
| 3 | `@pEffectiveDate` | IN | varchar(50) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.Budgets` | USER_TABLE |  |
| `dbo.Category` | USER_TABLE |  |
| `dbo.Detail` | USER_TABLE |  |
| `dbo.District` | USER_TABLE |  |
| `dbo.Requisitions` | USER_TABLE |  |
| `dbo.School` | USER_TABLE |  |
| `dbo.Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function dbo.uf_PricePlanSummary (@pPricePlanId int, @pCategoryId int, @pEffectiveDate varchar(50))
returns @RetTable table (
CategoryName	varchar(50) null,
DistrictName    varchar(50) null,
ItemId		int null,
ItemCode	varchar(50) null,
SortSeq		varchar(50) null,
[Description]	varchar(1024) null,
UnitCode	varchar(16) null,
Quantity	int null,
VendorCode	varchar(10) null,
UnitPrice	money null,
ExtendedPrice	money null,
BidPrice	money null,
GrossPrice	money null,
DiscountRate	decimal(9,5) null,
BidItemId	int null,
UseGrossPrices	tinyint null,
VendorId	int null,
VendorItemCode	varchar(50) null,
Alternate	varchar(512) null,
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
ListId		int null
)
 
as
begin
declare @EffectiveDate datetime

  select @EffectiveDate = dateadd(year,1,convert(datetime,@pEffectiveDate))

  insert @RetTable (ItemId, BidPrice, GrossPrice, Quantity, VendorId, VendorItemCode, Alternate, DistrictId, ListId, CategoryName, DistrictName, ItemCode, SortSeq, Description, UnitCode, VendorCode, UnitPrice, ExtendedPrice, DiscountRate, UseGrossPrices, CategoryId, PricePlanId, AwardId, BudgetId, BidItemId)
    select dbo.Detail.ItemId,
           round(dbo.Detail.BidPrice,2),
           round(dbo.Detail.GrossPrice,2),
           sum(dbo.Detail.Quantity) Quantity, 
           dbo.Detail.VendorId,
           dbo.Detail.VendorItemCode,
           dbo.Detail.Alternate,
           null,
           null,
           dbo.Category.[Name],
           null,
           dbo.Detail.ItemCode,
           dbo.Detail.SortSeq,
           dbo.Detail.[Description] + char(13) + char(10) + 'REF: ' + case isnull(Detail.VendorItemCode,'') when '' then '' else rtrim(Detail.VendorItemCode) + ' ' end + rtrim(isnull(Detail.Alternate,'')),
           dbo.Detail.UnitCode,
           dbo.Vendors.Code,
           max(round(Detail.BidPrice,2)) GrossPrice,
           sum(round(Detail.BidPrice,2) * Detail.Quantity) ExtendedPrice,
           null,
           null,
           dbo.Requisitions.CategoryId,
           dbo.Detail.PricePlanId,
           dbo.Detail.AwardId,
           null,
           dbo.Detail.BidItemId
      from dbo.Detail
      join dbo.Requisitions on dbo.Requisitions.RequisitionId = dbo.Detail.RequisitionId
      join dbo.Budgets on dbo.Budgets.BudgetId = dbo.Requisitions.BudgetId
                      and dateadd(month,4,Budgets.StartDate) <= @EffectiveDate
                      and dateadd(month,4,Budgets.VisibleUntil) >= @EffectiveDate
      join dbo.School on dbo.School.SchoolId = dbo.Requisitions.SchoolId
      join dbo.Category on dbo.Category.CategoryId = dbo.Requisitions.CategoryId
      join dbo.Vendors on dbo.Vendors.VendorId = Detail.VendorId
      join dbo.District on dbo.District.DistrictId = School.DistrictId
     where Detail.PricePlanId = @pPricePlanId and Requisitions.CategoryId = @pCategoryId
     group by dbo.Detail.ItemId, dbo.Detail.BidPrice, dbo.Detail.GrossPrice,
              dbo.Detail.VendorId, dbo.Detail.VendorItemCode, dbo.Detail.Alternate,
              Category.Name, Detail.ItemCode, 
              Detail.SortSeq, Detail.Description, Detail.UnitCode, Vendors.Code, 
              Requisitions.CategoryId, Detail.PricePlanId, 
              Detail.AwardId, Detail.BidItemId

  Update @RetTable
     Set VendorTotal = ss.TotalAmount,
         VendorCount = ss.ItemCount
    from @RetTable rt
    join (
          select rt1.ListId, rt1.DistrictId, rt1.CategoryId, rt1.VendorId, sum(ItemCount) ItemCount, sum(TotalAmount) TotalAmount
            from (
              select rt1.ListId, rt1.DistrictId, rt1.CategoryId, rt1.VendorId, count(rt1.ItemCode) ItemCount, case rt1.UseGrossPrices when 0 then sum(isnull(rt1.Quantity,0) * isnull(rt1.BidPrice,0)) else sum(isnull(rt1.Quantity,0) * isnull(rt1.GrossPrice,0)) - (sum(isnull(rt1.Quantity,0) * isnull(rt1.GrossPrice,0)) * isnull(rt1.DiscountRate,0) / 100) end TotalAmount
                from @RetTable rt1
               group by rt1.ListId, rt1.DistrictId, rt1.CategoryId, rt1.VendorId, rt1.UseGrossPrices, rt1.DiscountRate
                 ) rt1
           group by rt1.ListId, rt1.DistrictId, rt1.CategoryId, rt1.VendorId
         ) ss on isnull(ss.ListId,0) = isnull(rt.ListId,0)
             and isnull(ss.DistrictId,0) = isnull(rt.DistrictId,0)
             and ss.CategoryId = rt.CategoryId
             and ss.VendorId = rt.VendorId

  Update @RetTable
     Set CategoryTotal = ss.TotalAmount,
         CategoryCount = ss.ItemCount
    from @RetTable rt
    join (select rt1.ListId, rt1.DistrictId, rt1.CategoryId, count(rt1.ItemCode) ItemCount, sum(isnull(rt1.ExtendedPrice,0)) TotalAmount
            from @RetTable rt1
           group by rt1.ListId, rt1.DistrictId, rt1.CategoryId) ss on isnull(ss.ListId,0) = isnull(rt.ListId,0)
                                                                and isnull(ss.DistrictId,0) = isnull(rt.DistrictId,0)
                                                                and ss.CategoryId = rt.CategoryId

  Update @RetTable
     Set DistrictTotal = ss.TotalAmount,
         DistrictCount = ss.ItemCount
    from @RetTable rt
    join (select rt1.DistrictId, count(rt1.ItemCode) ItemCount, sum(isnull(rt1.ExtendedPrice,0)) TotalAmount
            from @RetTable rt1
           group by rt1.DistrictId) ss on isnull(ss.DistrictId,0) = isnull(rt.DistrictId,0)

return
end
```
