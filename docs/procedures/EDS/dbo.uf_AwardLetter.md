# Function: table-valued: `dbo.uf_AwardLetter`

_Generated on 2026-05-04T13:07:57.561Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_AwardLetter` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2008-05-29 22:42:29 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.Awards` | USER_TABLE |  |
| `dbo.Detail` | USER_TABLE |  |
| `dbo.DistrictPP` | USER_TABLE |  |
| `dbo.ReportSessionLinks` | USER_TABLE |  |
| `dbo.Requisitions` | USER_TABLE |  |
| `dbo.School` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE    function uf_AwardLetter ()
returns @BidsTable table (
RSId		int null,
DistrictId	int null,
CategoryId	int null,
VendorId	int null,
ItemsBid	int null,
AmountBid	money null,
ItemsAwarded	int null,
AmountAwarded	money null,
AwardId		int null)
AS
begin
  insert @BidsTable (RSId, DistrictId, CategoryId, VendorId, ItemsBid, AmountBid, AwardId)
    select distinct dbo.ReportSessionLinks.RSId, dbo.DistrictPP.DistrictId, dbo.Awards.CategoryId,
           dbo.Awards.VendorId, dbo.Awards.ItemsBid, dbo.Awards.AmountBid, Awards.AwardId
      from dbo.ReportSessionLinks
      join dbo.Requisitions on dbo.Requisitions.RequisitionId = dbo.ReportSessionLinks.IntId
      join dbo.Detail on Detail.RequisitionId = Requisitions.RequisitionId
      join dbo.School on dbo.School.SchoolId = dbo.Requisitions.SchoolId
      join dbo.DistrictPP on dbo.DistrictPP.DistrictId = dbo.School.DistrictId
      join dbo.Awards on Awards.AwardId = Detail.AwardId

  update @BidsTable
     set ItemsAwarded = case when ss.ItemsAwarded > bt.ItemsBid then bt.ItemsBid else ss.ItemsAwarded end,
         AmountAwarded = ss.AmountAwarded
    from @BidsTable bt
    join (Select ReportSessionLinks.RSId, School.DistrictId, Awards.CategoryId, Detail.AwardId,
            Awards.VendorId, count(Detail.ItemCode) ItemsAwarded, sum(Detail.Quantity * Detail.BidPrice) AmountAwarded
            from dbo.ReportSessionLinks
            join dbo.Requisitions on dbo.Requisitions.RequisitionId = dbo.ReportSessionLinks.IntId
            join dbo.School on dbo.School.SchoolId = dbo.Requisitions.SchoolId
            join dbo.Detail on dbo.Detail.RequisitionId = dbo.Requisitions.RequisitionId
            join dbo.Awards on dbo.Awards.AwardId = dbo.Detail.AwardId
           group by dbo.ReportSessionLinks.RSId, dbo.School.DistrictId, dbo.Awards.CategoryId, 
                    dbo.Awards.VendorId, Detail.AwardId) ss on ss.RSId = bt.RSId
                                     and ss.DistrictId = bt.DistrictId
                                     and ss.CategoryId = bt.CategoryId
                                     and ss.VendorId = bt.VendorId

  return
end
```
