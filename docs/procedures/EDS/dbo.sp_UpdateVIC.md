# Procedure: `dbo.sp_UpdateVIC`

_Generated on 2026-05-04T13:43:18.938Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UpdateVIC` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2010-03-05 11:16:34 |
| Modified | 2010-03-05 11:16:34 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidHeaderId` | IN | int |  |
| 2 | `@pVendorId` | IN | int |  |
| 3 | `@pItemCode` | IN | varchar(50) |  |
| 4 | `@pNewVIC` | IN | varchar(50) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `BidImportCatalogList` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `dbo.uf_PackCodeCatalog` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure dbo.sp_UpdateVIC @pBidHeaderId int, @pVendorId int, @pItemCode varchar(50), @pNewVIC varchar(50) as

select @pBidHeaderId BidHeaderId, BidResults.ItemId, BidResults.BidResultsId into #ItemHold
  from BidResults
  join BidImports on BidImports.BidImportId = BidResults.BidImportId
                 and BidImports.VendorId = @pVendorId
  join BidHeaders on BidHeaders.BidHeaderId = BidImports.BidHeaderId
                 and BidHeaders.BidHeaderId = @pBidHeaderId
 where BidResults.ItemCode = @pItemCode

Update BidResults
   set VendorItemCode = @pNewVIC,
       PackedVendorItemCode = dbo.uf_PackCodeCatalog(@pNewVIC, BidImportCatalogList.CatalogId)
  from BidResults
  join BidImports on BidImports.BidImportId = BidResults.BidImportId
  join #ItemHold ih on ih.BidResultsId = BidResults.BidResultsId
  left outer join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId

Update BidItems
   set VendorItemCode = @pNewVIC,
       CrossRefId = (select Top 1 CrossRefId
                       from CrossRefs with (nolock)
                       join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                                   and Catalog.Active = 1
                      where CrossRefs.CatalogId = BidImportCatalogList.CatalogId
                        and CrossRefs.Active = 1
                        and CrossRefs.PackedCode = BidResults.PackedVendorItemCode
                      order by Catalog.CatalogYear desc, case isnull(CrossRefs.DoNotDiscount,0) when 0 then CrossRefs.GrossPrice - round(CrossRefs.GrossPrice * (BidImportCatalogList.DiscountRate / 100),2) else CrossRefs.GrossPrice end desc, CrossRefs.CrossRefId desc)
  from BidResults
  join BidImports on BidImports.BidImportId = BidResults.BidImportId
  join BidItems on BidItems.BidResultsId = BidResults.BidResultsId
  join Bids on Bids.BidId = BidItems.BidId
           and Bids.Active = 1
  join #ItemHold ih on ih.BidResultsId = BidResults.BidResultsId
  left outer join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId

Update Detail
   set ReProc = 1
  from Detail
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join #ItemHold ih on ih.ItemId = Detail.ItemId
                   and ih.BidHeaderId = case isnull(Detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end

drop table #ItemHold
```
