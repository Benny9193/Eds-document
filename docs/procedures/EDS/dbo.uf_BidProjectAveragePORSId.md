# Function: inline table-valued: `dbo.uf_BidProjectAveragePORSId`

_Generated on 2026-05-04T14:49:07.354Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_BidProjectAveragePORSId` |
| Kind | Function (inline TVF) |
| sys.objects.type | `IF` (SQL_INLINE_TABLE_VALUED_FUNCTION) |
| Created | 2007-06-26 23:17:52 |
| Modified | 2022-05-06 11:52:56 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidHeaderId` | IN | int |  |
| 2 | `@pRSId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaderDetail` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  function [dbo].[uf_BidProjectAveragePORSId] (@pBidHeaderId int, @pRSId int)
returns table 
as
return(
  select @pBidHeaderId BidHeaderId, Vendors.VendorId, Vendors.Code VendorCode, Vendors.Name VendorName,
         isnull(Vendors.Name,'') + case isnull(rtrim(Vendors.Address1),'') when '' then '' else char(13) + char(10) + rtrim(Vendors.Address1) end + case isnull(rtrim(Vendors.Address2),'') when '' then '' else char(13) + char(10) + rtrim(Vendors.Address2) end + case isnull(rtrim(Vendors.Address3),'') when '' then '' else char(13) + char(10) + rtrim(Vendors.Address3) end + case rtrim(isnull(Vendors.City,'') + isnull(Vendors.State,'') + isnull(Vendors.Zipcode,'')) when '' then '' else char(13) + char(10) + isnull(rtrim(Vendors.City),'') + ', ' + isnull(rtrim(Vendors.State),'') + '  ' + isnull(rtrim(Vendors.Zipcode),'') end + case isnull(rtrim(Vendors.Phone),'') when '' then '' else char(13) + char(10) + 'Phone: ' + rtrim(Vendors.Phone) end + case isnull(rtrim(Vendors.Fax),'') when '' then '' else char(13) + char(10) + 'Fax: ' + rtrim(Vendors.Fax) end + case isnull(rtrim(BidImports.VendorBidNumber),'') when '' then '' else char(13) + char(10) + 'Vendor Bid Number: ' + rtrim(BidImports.VendorBidNumber) end VendorInfo, 
         isnull(s3.Items,0) Items, isnull(s3.Total,0) Total, isnull(s3.POCount,0) POCount, isnull(s3.TotalQuantity,0) TotalQuantity, isnull(s3.AvgPO,0) AvgPO, @pRSId RSId
    from BidImports
    join Vendors on Vendors.VendorId = BidImports.VendorId
    left outer join (
      select ss.BidHeaderId, ss.VendorId, s2.ItemCount Items, sum(Cost) Total, count(*) POCount, sum(Quantity) TotalQuantity, round(sum(Cost) / count(*),2) AvgPO
        from (
          select BidHeaderId, RequisitionId, VendorId, sum(Cost) Cost, sum(Quantity) Quantity
            from (
              select BidHeaders.BidHeaderId, BidRequestItems.BidRequestItemId, Detail.RequisitionId,
                     (select top 1 VendorId from BidResults br join BidImports bi on bi.BidImportId = br.BidImportId where br.BidHeaderId = BidHeaders.BidHeaderId and br.BidRequestItemId = BidRequestItems.BidRequestItemId and br.Active = 1 and br.ItemBidType in ('S','C') and bi.Active = 1 order by case isnull(ItemBidType,'') when 'S' then 0 when 'C' then 0 else 1 end, UnitPrice, BidResultsId) VendorId,
                     (select top 1 br.UnitPrice from BidResults br join BidImports bi on bi.BidImportId = br.BidImportId where br.BidHeaderId = BidHeaders.BidHeaderId and br.BidRequestItemId = BidRequestItems.BidRequestItemId and br.Active = 1 and br.ItemBidType in ('S','C') and bi.Active = 1 order by case isnull(ItemBidType,'') when 'S' then 0 when 'C' then 0 else 1 end, UnitPrice, BidResultsId) * sum(Detail.Quantity) Cost,
                     sum(Detail.Quantity) Quantity
                from BidHeaders
                join BidRequestItems on BidRequestItems.BidHeaderId = BidHeaders.BidHeaderId
                                    and BidRequestItems.Active = 1
--                join BidHeaderDetail on BidHeaderDetail.BidHeaderId = BidHeaders.BidHeaderId
--                                    and BidHeaderDetail.BidRequestItemId = BidRequestItems.BidRequestItemId
--                join Detail on Detail.DetailId = BidHeaderDetail.DetailId
                join Detail on Detail.ItemId = BidRequestItems.ItemId
                join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
                join ReportSessionLinks rsl on rsl.RSId = @pRSId
                                           and rsl.IntId = Requisitions.RequisitionId
                join Budgets on Budgets.BudgetId = Requisitions.BudgetId
                left outer join BidHeaderDetail on BidHeaderDetail.BidHeaderId = BidHeaders.BidHeaderId
                                               and BidHeaderDetail.DetailId = Detail.DetailId
               where BidHeaders.BidHeaderId = @pBidHeaderId
                 and case isnull(Detail.BidHeaderId,0) when 0 then isnull(Requisitions.BidHeaderId,0) else Detail.BidHeaderId end = @pBidHeaderId
               group by BidHeaders.BidHeaderId, BidRequestItems.BidRequestItemId, Detail.RequisitionId
                  ) s1 
           group by BidHeaderId, RequisitionId, VendorId
              ) ss 
        join (
          select ss.BidHeaderId, ss.VendorId, sum(Cost) ItemCost, count(*) ItemCount, sum(Quantity) ItemQuantity
            from (
              select BidHeaders.BidHeaderId, BidRequestItems.BidRequestItemId, 
                     (select top 1 VendorId from BidResults br join BidImports bi on bi.BidImportId = br.BidImportId where br.BidHeaderId = BidHeaders.BidHeaderId and br.BidRequestItemId = BidRequestItems.BidRequestItemId and br.Active = 1 and br.ItemBidType in ('S','C') and bi.Active = 1 order by case isnull(ItemBidType,'') when 'S' then 0 when 'C' then 0 else 1 end, UnitPrice, BidResultsId) VendorId,
                     (select top 1 br.UnitPrice from BidResults br join BidImports bi on bi.BidImportId = br.BidImportId where br.BidHeaderId = BidHeaders.BidHeaderId and br.BidRequestItemId = BidRequestItems.BidRequestItemId and br.Active = 1 and br.ItemBidType in ('S','C') and bi.Active = 1 order by case isnull(ItemBidType,'') when 'S' then 0 when 'C' then 0 else 1 end, UnitPrice, BidResultsId) * sum(Detail.Quantity) Cost,
                     sum(Detail.Quantity) Quantity
                from BidHeaders
                join BidRequestItems on BidRequestItems.BidHeaderId = BidHeaders.BidHeaderId
                                    and BidRequestItems.Active = 1
--                join BidHeaderDetail on BidHeaderDetail.BidHeaderId = BidHeaders.BidHeaderId
--                                    and BidHeaderDetail.BidRequestItemId = BidRequestItems.BidRequestItemId
--                join Detail on Detail.DetailId = BidHeaderDetail.DetailId
                join Detail on Detail.ItemId = BidRequestItems.ItemId
                join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
                join ReportSessionLinks rsl on rsl.RSId = @pRSId
                                           and rsl.IntId = Requisitions.RequisitionId
                join Budgets on Budgets.BudgetId = Requisitions.BudgetId
                left outer join BidHeaderDetail on BidHeaderDetail.BidHeaderId = BidHeaders.BidHeaderId
                                               and BidHeaderDetail.DetailId = Detail.DetailId
               where BidHeaders.BidHeaderId = @pBidHeaderId
                 and case isnull(Detail.BidHeaderId,0) when 0 then isnull(Requisitions.BidHeaderId,0) else Detail.BidHeaderId end = @pBidHeaderId
               group by BidHeaders.BidHeaderId, BidRequestItems.BidRequestItemId
                  ) ss 
           group by ss.BidHeaderId, ss.VendorId
              ) s2 on s2.VendorId = ss.VendorId
       group by ss.BidHeaderId, ss.VendorId, s2.ItemCount
                     ) s3 on s3.VendorId = BidImports.VendorId
       where BidImports.BidHeaderId = @pBidHeaderId
       )
```
