# View: `dbo.vw_BidResults`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `BidId` | int | NO |  |  |
| 3 | `ItemId` | int | YES |  |  |
| 4 | `UnitPrice` | money | YES |  |  |
| 5 | `Alternate` | varchar(512) | YES |  |  |
| 6 | `QuantityBid` | int | YES |  |  |
| 7 | `BidRequest` | int | YES |  |  |
| 8 | `AwardId` | int | NO |  |  |
| 9 | `VendorItemCode` | varchar(50) | YES |  |  |
| 10 | `CrossRefId` | int | YES |  |  |
| 11 | `ItemBidType` | varchar(13) | NO |  |  |
| 12 | `PackedItemCode` | varchar(50) | YES |  |  |
| 13 | `PackedVendorItemCode` | varchar(50) | YES |  |  |
| 14 | `PageNo` | int | YES |  |  |
| 15 | `ContractNumber` | varchar(50) | YES |  |  |
| 16 | `DateModified` | datetime | NO |  |  |
| 17 | `BidResultsId` | int | YES |  |  |
| 18 | `VendorId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Awards` | USER_TABLE |
| `BidHeaders` | USER_TABLE |
| `BidImportCatalogList` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `BidRequestItems` | USER_TABLE |
| `BidResults` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Catalog` | USER_TABLE |
| `CrossRefs` | USER_TABLE |
| `Items` | USER_TABLE |
| `vw_BidAnalysisDetail` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_BidResults] as
    select BidHeaders.BidHeaderId, 
           Bids.BidId, 
           BidRequestItems.ItemId, 
           case isnull(BidImports.VendorId,0) 
             when 0 then 0 
             when 7691 then 0 
             else BidResults.UnitPrice 
           end UnitPrice, 
           BidResults.Alternate, 
           BidResults.QuantityBid, 
           BidRequestItems.BidRequest, 
           Awards.AwardId, 
           case isnull(BidResults.VendorItemCode,'') 
             when '' then 
               (select top 1 CrossRefs.VendorItemCode 
                  from CrossRefs with (nolock)
                  join Catalog on Catalog.CatalogId = CrossRefs.CatalogId 
                              and Catalog.Active = 1 
                  join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId 
                                           and BidImportCatalogList.CatalogId = Catalog.CatalogId 
                 where CrossRefs.ItemId = BidRequestItems.ItemId 
                   and CrossRefs.Active = 1 
                 order by CrossRefs.CrossRefId) 
             else 
               BidResults.VendorItemCode 
           end VendorItemCode, 
           case isnull(BidResults.VendorItemCode,'') 
             when '' then 
               (select top 1 CrossRefs.CrossRefId 
                  from CrossRefs with (nolock)
                  join Catalog on Catalog.CatalogId = CrossRefs.CatalogId 
                              and Catalog.Active = 1 
                  join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId 
                                           and BidImportCatalogList.CatalogId = Catalog.CatalogId 
                 where CrossRefs.ItemId = BidRequestItems.ItemId 
                   and CrossRefs.Active = 1 
                 order by Catalog.CatalogYear desc, CrossRefs.CrossRefId desc) 
             else 
               (select top 1 CrossRefs.CrossRefId 
                  from CrossRefs with (nolock)
                  join Catalog on Catalog.CatalogId = CrossRefs.CatalogId 
                              and Catalog.Active = 1 
                  join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId 
                                           and BidImportCatalogList.CatalogId = Catalog.CatalogId 
                 where CrossRefs.PackedCode = BidResults.PackedVendorItemCode 
                   and CrossRefs.Active = 1 
                 order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) 
           end CrossRefId, 
           case isnull(BidResults.ItemBidType,'') 
             when '' then 'Not Specified' 
             when 'N' then 'Non-Compliant' 
             when 'C' then 'Compliant' 
             when 'S' then 'As Specified' 
             else 'Unknown' 
           end ItemBidType, 
           (select top 1 PackedCode 
              from Items with (nolock)
             where Items.ItemId = BidRequestItems.ItemId 
             order by Items.ItemId) PackedItemCode, 
           case isnull(BidResults.VendorItemCode,'') 
             when '' then 
               (select top 1 CrossRefs.PackedCode 
                  from CrossRefs with (nolock)
                  join Catalog on Catalog.CatalogId = CrossRefs.CatalogId 
                              and Catalog.Active = 1 
                  join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId 
                                           and BidImportCatalogList.CatalogId = Catalog.CatalogId 
                 where CrossRefs.ItemId = BidRequestItems.ItemId 
                   and CrossRefs.Active = 1 
                 order by CrossRefs.CrossRefId) 
             else 
               BidResults.PackedVendorItemCode 
           end PackedVendorItemCode, 
           BidResults.PageNo, 
           BidResults.ContractNumber, 
           getDate() DateModified, 
           BidResults.BidResultsId,
           BidImports.VendorId
      from BidHeaders
      join BidRequestItems on BidRequestItems.BidHeaderId = BidHeaders.BidHeaderId
                          and BidRequestItems.Active = 1
/* ************* Following Join was replaced by join Following this comment to allow
                 for having Multiple Vendor Item Codes for the same item ie (Staples 2010) DCH 3/17/2010
      left outer join BidResults on BidResults.BidRequestItemId = BidRequestItems.BidRequestItemId
                                and BidResults.BidResultsId = (select top 1 BidResultsId from #BidSummary bs where bs.BidRequestItemId = BidResults.BidRequestItemId and bs.BidType in ('As Specified','Compliant') and bs.ResultsStatus = 1 order by SortKey, BidResultsId)
--                                and BidResults.BidResultsId = (select top 1 BidResultsId from #BidSummary bs where bs.BidRequestItemId = BidResults.BidRequestItemId and bs.BidType in ('As Specified','Compliant') order by SortKey, BidResultsId)
*/
      left outer join BidResults on BidResults.BidRequestItemId = BidRequestItems.BidRequestItemId
                                and BidResults.BidResultsId in 
                              (select bs2.BidResultsId 
                                 from vw_BidAnalysisDetail bs1
                                 join vw_BidAnalysisDetail bs2 on bs2.VendorCode = bs1.VendorCode
                                                     and bs2.BidRequestItemId = bs1.BidRequestItemId 
                                where bs1.BidResultsId = (select top 1 BidResultsId 
                                                            from vw_BidAnalysisDetail bs 
                                                           where bs.BidRequestItemId = BidResults.BidRequestItemId 
                                                             and bs.BidType in ('As Specified','Compliant') 
                                                             and bs.ResultsStatus = 1 
                                                           order by bs.SortKey, bs.BidResultsId))
      left outer join BidImports on BidImports.BidImportId = BidResults.BidImportId
                                and BidImports.Active = 1
      join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
               and Bids.VendorId = isnull(BidImports.VendorId,7691)
               and Bids.Active = 1
      join Awards on Awards.BidHeaderId = BidHeaders.BidHeaderId
                 and Awards.VendorId = isnull(BidImports.VendorId,7691)
                 and Awards.Active = 1
--     where BidHeaders.BidHeaderId = @pBidHeaderId
--     order by BidRequestItems.ItemId
```
