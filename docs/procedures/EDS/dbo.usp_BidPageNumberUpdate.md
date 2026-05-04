# Procedure: `dbo.usp_BidPageNumberUpdate`

_Generated on 2026-05-04T13:07:57.751Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_BidPageNumberUpdate` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2019-01-10 11:15:05 |
| Modified | 2019-02-05 10:27:20 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@BidHeaderId` | IN | int |  |
| 2 | `@VendorId` | IN | int |  |

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

## Called by

_No other objects in this database reference it._

## Definition

```sql
create   procedure usp_BidPageNumberUpdate @BidHeaderId int, @VendorId int
as
update BidResults
   set PageNo = cast(XR.Page as int)
--select *
  from BidHeaders
  join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
                 and BidImports.VendorId = @VendorId
  join BidResults on BidResults.BidImportId = BidImports.BidImportId
                 and BidResults.ItemBidType in ('C','A','N','S')
  outer apply (select top 1 CrossRefs.Page
                 from CrossRefs 
				 join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
				             and Catalog.Active = 1
				 join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId
				                          and BidImportCatalogList.CatalogId = Catalog.CatalogId
				where CrossRefs.UniqueItemNumber = BidResults.PackedVendorItemCode
				  and CrossRefs.Active = 1
				  and isnumeric(CrossRefs.Page) = 1
				  and isnull(CrossRefs.Page,0) not in (0,9999)
				order by Catalog.CatalogYear desc, CrossRefs.GrossPrice desc, CrossRefs.CrossRefId desc) XR
 where BidHeaders.BidHeaderId = @BidHeaderId

update BidItems
   set PageNo = cast(XR.Page as int),
       CrossRefId = XR.CrossRefId
--select *
  from BidHeaders
  join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
                 and BidImports.VendorId = @VendorId
  join BidResults on BidResults.BidImportId = BidImports.BidImportId
                 and BidResults.ItemBidType in ('C','A','N','S')
  join BidItems on BidItems.BidResultsId = BidResults.BidResultsId
  join Bids on Bids.BidId = BidItems.BidId
           and Bids.BidImportId = BidImports.BidImportId
		   and Bids.Active = 1
  outer apply (select top 1 CrossRefs.crossRefId, CrossRefs.Page
                 from CrossRefs 
				 join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
				             and Catalog.Active = 1
				 join BidImportCatalogList on BidImportCatalogList.BidImportId = BidImports.BidImportId
				                          and BidImportCatalogList.CatalogId = Catalog.CatalogId
				where CrossRefs.UniqueItemNumber = BidResults.PackedVendorItemCode
				  and CrossRefs.Active = 1
				  and isnumeric(CrossRefs.Page) = 1
				  and isnull(CrossRefs.Page,0) not in (0,9999)
				order by Catalog.CatalogYear desc, CrossRefs.GrossPrice desc, CrossRefs.CrossRefId desc) XR
 where BidHeaders.BidHeaderId = @BidHeaderId
```
