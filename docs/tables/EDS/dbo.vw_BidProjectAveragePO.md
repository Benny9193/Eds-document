# View: `dbo.vw_BidProjectAveragePO`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `VendorId` | int | NO |  |  |
| 3 | `VendorCode` | varchar(16) | YES |  |  |
| 4 | `VendorName` | varchar(50) | YES |  |  |
| 5 | `VendorInfo` | varchar(376) | YES |  |  |
| 6 | `Items` | int | NO |  |  |
| 7 | `Total` | money | NO |  |  |
| 8 | `POCount` | int | NO |  |  |
| 9 | `TotalQuantity` | int | NO |  |  |
| 10 | `AvgPO` | money | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaderDetail` | USER_TABLE |
| `BidHeaders` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `BidRequestItems` | USER_TABLE |
| `BidResults` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Detail` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_BidProjectAveragePO] as
  select BidImports.BidHeaderId, Vendors.VendorId, Vendors.Code VendorCode, Vendors.Name VendorName, 
         isnull(Vendors.Name,'') + case isnull(rtrim(Vendors.Address1),'') when '' then '' else char(13) + char(10) + rtrim(Vendors.Address1) end + case isnull(rtrim(Vendors.Address2),'') when '' then '' else char(13) + char(10) + rtrim(Vendors.Address2) end + case isnull(rtrim(Vendors.Address3),'') when '' then '' else char(13) + char(10) + rtrim(Vendors.Address3) end + case rtrim(isnull(Vendors.City,'') + isnull(Vendors.State,'') + isnull(Vendors.Zipcode,'')) when '' then '' else char(13) + char(10) + isnull(rtrim(Vendors.City),'') + ', ' + isnull(rtrim(Vendors.State),'') + '  ' + isnull(rtrim(Vendors.Zipcode),'') end + case isnull(rtrim(Vendors.Phone),'') when '' then '' else char(13) + char(10) + 'Phone: ' + rtrim(Vendors.Phone) end + case isnull(rtrim(Vendors.Fax),'') when '' then '' else char(13) + char(10) + 'Fax: ' + rtrim(Vendors.Fax) end + case isnull(rtrim(BidImports.VendorBidNumber),'') when '' then '' else char(13) + char(10) + 'Vendor Bid Number: ' + rtrim(BidImports.VendorBidNumber) end VendorInfo, 
         isnull(s3.Items,0) Items, isnull(s3.Total,0) Total, isnull(s3.POCount,0) POCount, isnull(s3.TotalQuantity,0) TotalQuantity, isnull(s3.AvgPO,0) AvgPO /*, s4.ItemsMatched, s4.ItemsNoBid, s4.TotalAmount */
    from BidImports
    join Vendors on Vendors.VendorId = BidImports.VendorId
    left outer join (
      select ss.BidHeaderId, ss.VendorId, s2.ItemCount Items, sum(Cost) Total, count(*) POCount, sum(Quantity) TotalQuantity, round(sum(Cost) / count(*),2) AvgPO
        from (
          select BidHeaderId, RequisitionId, VendorId, sum(Cost) Cost, sum(Quantity) Quantity
            from (
              select BidHeaders.BidHeaderId, BidRequestItems.BidRequestItemId, Detail.RequisitionId,
                     (select top 1 VendorId from BidResults br with (nolock) join BidImports bi on bi.BidImportId = br.BidImportId where br.BidHeaderId = BidHeaders.BidHeaderId and br.BidRequestItemId = BidRequestItems.BidRequestItemId and br.Active = 1 and bi.Active = 1 order by case isnull(ItemBidType,'') when 'S' then 0 when 'C' then 0 else 1 end, isnull(UnitPrice,0), BidResultsId) VendorId,
                     (select top 1 br.UnitPrice from BidResults br with (nolock) join BidImports bi on bi.BidImportId = br.BidImportId where br.BidHeaderId = BidHeaders.BidHeaderId and br.BidRequestItemId = BidRequestItems.BidRequestItemId and br.Active = 1 and bi.Active = 1 order by case isnull(ItemBidType,'') when 'S' then 0 when 'C' then 0 else 1 end, isnull(UnitPrice,0), BidResultsId) * sum(BidHeaderDetail.Quantity) Cost,
                     sum(BidHeaderDetail.Quantity) Quantity
                from BidHeaders
                join BidRequestItems on BidRequestItems.BidHeaderId = BidHeaders.BidHeaderId
                                    and BidRequestItems.Active = 1
                join BidHeaderDetail on BidHeaderDetail.BidHeaderId = BidHeaders.BidHeaderId
                                    and BidHeaderDetail.BidRequestItemId = BidRequestItems.BidRequestItemId
                join Detail on Detail.DetailId = BidHeaderDetail.DetailId
                join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
                join Budgets on Budgets.BudgetId = Requisitions.BudgetId
               group by BidHeaders.BidHeaderId, BidRequestItems.BidRequestItemId, Detail.RequisitionId
                  ) s1 
           group by BidHeaderId, RequisitionId, VendorId
              ) ss 
        join (
          select s5.BidHeaderId, s5.VendorId, sum(Cost) ItemCost, count(*) ItemCount, sum(Quantity) ItemQuantity
            from (
              select BidHeaders.BidHeaderId, BidRequestItems.BidRequestItemId, 
                     (select top 1 VendorId from BidResults br with (nolock) join BidImports bi on bi.BidImportId = br.BidImportId where br.BidHeaderId = BidHeaders.BidHeaderId and br.BidRequestItemId = BidRequestItems.BidRequestItemId and br.Active = 1 and bi.Active = 1 order by case isnull(ItemBidType,'') when 'S' then 0 when 'C' then 0 else 1 end, isnull(UnitPrice,0), BidResultsId) VendorId,
                     (select top 1 br.UnitPrice from BidResults br with (nolock) join BidImports bi on bi.BidImportId = br.BidImportId where br.BidHeaderId = BidHeaders.BidHeaderId and br.BidRequestItemId = BidRequestItems.BidRequestItemId and br.Active = 1 and bi.Active = 1 order by case isnull(ItemBidType,'') when 'S' then 0 when 'C' then 0 else 1 end, isnull(UnitPrice,0), BidResultsId) * sum(BidHeaderDetail.Quantity) Cost,
                     sum(BidHeaderDetail.Quantity) Quantity
                from BidHeaders
                join BidRequestItems on BidRequestItems.BidHeaderId = BidHeaders.BidHeaderId
                                    and BidRequestItems.Active = 1
                join BidHeaderDetail on BidHeaderDetail.BidHeaderId = BidHeaders.BidHeaderId
                                    and BidHeaderDetail.BidRequestItemId = BidRequestItems.BidRequestItemId
                join Detail on Detail.DetailId = BidHeaderDetail.DetailId
                join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
                join Budgets on Budgets.BudgetId = Requisitions.BudgetId
               group by BidHeaders.BidHeaderId, BidRequestItems.BidRequestItemId
                  ) s5 
           group by s5.BidHeaderId, s5.VendorId
              ) s2 on s2.VendorId = ss.VendorId and s2.BidHeaderId = ss.BidHeaderId
       group by ss.BidHeaderId, ss.VendorId, s2.ItemCount
                     ) s3 on s3.VendorId = BidImports.VendorId and s3.BidHeaderId = BidImports.BidHeaderId
```
