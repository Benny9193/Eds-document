# Function: table-valued: `dbo.uf_DistrictSummary`

_Generated on 2026-05-04T13:43:18.998Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_DistrictSummary` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2002-06-26 22:30:07 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.Category` | USER_TABLE |  |
| `dbo.Detail` | USER_TABLE |  |
| `dbo.District` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.ReportSessionLinks` | USER_TABLE |  |
| `dbo.Requisitions` | USER_TABLE |  |
| `dbo.School` | USER_TABLE |  |
| `dbo.Units` | USER_TABLE |  |
| `dbo.Vendors` | USER_TABLE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.uf_DistrictSummaryVendors` | SQL_TABLE_VALUED_FUNCTION |

## Definition

```sql
CREATE    function uf_DistrictSummary ()
returns @RetTable table (
CategoryName	varchar(50) null,
DistrictName    varchar(50) null,
ItemId		int null,
ItemCode	varchar(16) null,
SortSeq		varchar(50) null,
[Description]	varchar(1024) null,
UnitCode	varchar(16) null,
Quantity	int null,
VendorCode	varchar(10) null,
UnitPrice	money null,
ExtendedPrice	money null,
BidPrice	money null,
GrossPrice	money null,
VendorId	int null,
VendorItemCode	varchar(32) null,
Alternate	varchar(512) null,
DistrictId	int null,
CategoryId	int null,
CategoryTotal	money null,
CategoryCount	int null,
DistrictTotal	money null,
DistrictCount	int null,
ListId		int null
)
 
as
begin
  insert @RetTable (ItemId, BidPrice, GrossPrice, Quantity, VendorId, VendorItemCode, Alternate, DistrictId, ListId)
    select dbo.Detail.ItemId,
           dbo.Detail.BidPrice,
           dbo.Detail.GrossPrice,
           sum(dbo.Detail.Quantity) Quantity, 
           dbo.Detail.VendorId,
           dbo.Detail.VendorItemCode,
           dbo.Detail.Alternate,
           dbo.School.DistrictId,
           rsl.RSId
      from dbo.Detail
      join dbo.Requisitions on dbo.Requisitions.RequisitionId = dbo.Detail.RequisitionId
      join dbo.School on dbo.School.SchoolId = dbo.Requisitions.SchoolId
      join dbo.ReportSessionLinks rsl on rsl.IntId = Requisitions.RequisitionId
     group by rsl.RSId, dbo.Detail.ItemId, dbo.Detail.BidPrice, dbo.Detail.GrossPrice,
              dbo.Detail.VendorId, dbo.Detail.VendorItemCode, dbo.Detail.Alternate,
              dbo.School.DistrictId

  Update @RetTable
     Set CategoryName = dbo.Category.[Name],
         DistrictName = dbo.District.[Name],
         ItemCode = dbo.Items.ItemCode,
         SortSeq = dbo.Items.SortSeq,
         [Description] = dbo.Items.[Description] + char(13) + char(10) + 'REF: ' + case isnull(rt.VendorItemCode,'') when '' then '' else rtrim(rt.VendorItemCode) + ' ' end + rtrim(isnull(rt.Alternate,'')),
         UnitCode = dbo.Units.Code,
         VendorCode = dbo.Vendors.Code,
         UnitPrice = case isnull(dbo.District.UseGrossPrices,0) when 0 then rt.BidPrice else rt.GrossPrice end,
         ExtendedPrice = case isnull(dbo.District.UseGrossPrices,0) when 0 then rt.BidPrice * rt.Quantity else rt.GrossPrice * rt.Quantity end,
         CategoryId = dbo.Items.CategoryId
    from @RetTable rt
    join dbo.Items on dbo.Items.ItemId = rt.ItemId 
    join dbo.Category on dbo.Category.CategoryId = dbo.Items.CategoryId
    join dbo.Units on dbo.Units.UnitId = dbo.Items.UnitId
    join dbo.Vendors on dbo.Vendors.VendorId = rt.VendorId
    join dbo.District on dbo.District.DistrictId = rt.DistrictId

  Update @RetTable
     Set CategoryTotal = ss.TotalAmount,
         CategoryCount = ss.ItemCount
    from @RetTable rt
    join (select rt1.ListId, rt1.DistrictId, rt1.CategoryId, count(rt1.ItemCode) ItemCount, sum(rt1.ExtendedPrice) TotalAmount
            from @RetTable rt1
           group by rt1.ListId, rt1.DistrictId, rt1.CategoryId) ss on ss.ListId = rt.ListId
                                                                and ss.DistrictId = rt.DistrictId
                                                                and ss.CategoryId = rt.CategoryId

  Update @RetTable
     Set DistrictTotal = ss.TotalAmount,
         DistrictCount = ss.ItemCount
    from @RetTable rt
    join (select rt1.DistrictId, count(rt1.ItemCode) ItemCount, sum(rt1.ExtendedPrice) TotalAmount
            from @RetTable rt1
           group by rt1.DistrictId) ss on ss.DistrictId = rt.DistrictId

return
end
```
