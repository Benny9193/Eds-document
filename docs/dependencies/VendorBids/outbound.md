# Cross-database outbound references: `VendorBids`

_Generated on 2026-05-04T14:51:40.422Z_

**Source database:** `VendorBids`

[← back to dependencies index](../README.md)

Routines, views, and triggers in this database that reference objects in another database.
Detected by text-scanning `sys.sql_modules.definition` for three-part names like `[OtherDb].schema.object` or `OtherDb.schema.object`.

## Summary

| Target database | Distinct edges |
|-----------------|----------------|
| `EDS` | 34 |

## → `EDS`

| Source routine | Source kind | Target object | Reference text | Detected by |
|----------------|-------------|---------------|----------------|-------------|
| `dbo.BidMgrVendorbidsForImport` | View | `dbo.bidimports` | `` | sed |
| `dbo.BidMgrVendorbidsForImport` | View | `dbo.bidimports bi` | `eds.dbo.bidimports bi` | text |
| [`dbo.sp_NewVendorBid`](../../procedures/VendorBids/dbo.sp_NewVendorBid.md) | Procedure | `BidRequestItems` | `` | sed |
| [`dbo.sp_NewVendorBid`](../../procedures/VendorBids/dbo.sp_NewVendorBid.md) | Procedure | `BidRequestItems bri` | `eds..BidRequestItems bri` | text |
| [`dbo.sp_NewVendorBid`](../../procedures/VendorBids/dbo.sp_NewVendorBid.md) | Procedure | `dbo.uf_ItemDescription` | `eds.dbo.uf_ItemDescription` | sed, text |
| [`dbo.sp_NewVendorBid`](../../procedures/VendorBids/dbo.sp_NewVendorBid.md) | Procedure | `Items` | `` | sed |
| [`dbo.sp_NewVendorBid`](../../procedures/VendorBids/dbo.sp_NewVendorBid.md) | Procedure | `Items Items on Items` | `eds..Items Items on Items` | text |
| [`dbo.sp_NewVendorBid`](../../procedures/VendorBids/dbo.sp_NewVendorBid.md) | Procedure | `Units` | `` | sed |
| [`dbo.sp_NewVendorBid`](../../procedures/VendorBids/dbo.sp_NewVendorBid.md) | Procedure | `Units Units on Units` | `eds..Units Units on Units` | text |
| [`dbo.sp_RegistrationsUpdate`](../../procedures/VendorBids/dbo.sp_RegistrationsUpdate.md) | Procedure | `dbo.vendorcontacts` | `` | sed |
| [`dbo.sp_RegistrationsUpdate`](../../procedures/VendorBids/dbo.sp_RegistrationsUpdate.md) | Procedure | `dbo.vendorcontacts join Vendors on Vendors` | `eds.dbo.vendorcontacts join Vendors on Vendors` | text |
| [`dbo.sp_RegistrationsUpdate`](../../procedures/VendorBids/dbo.sp_RegistrationsUpdate.md) | Procedure | `dbo.vendorcontacts where Vendorcontacts` | `eds.dbo.vendorcontacts where Vendorcontacts` | text |
| [`dbo.sp_RegistrationsUpdate`](../../procedures/VendorBids/dbo.sp_RegistrationsUpdate.md) | Procedure | `dbo.vendors` | `` | sed |
| [`dbo.sp_RegistrationsUpdate`](../../procedures/VendorBids/dbo.sp_RegistrationsUpdate.md) | Procedure | `dbo.vendors join vendorcategoryPP vcp on vcp` | `eds.dbo.vendors join vendorcategoryPP vcp on vcp` | text |
| [`dbo.sp_RegistrationsUpdate`](../../procedures/VendorBids/dbo.sp_RegistrationsUpdate.md) | Procedure | `dbo.vendors join vendorcontacts on vendorcontacts` | `eds.dbo.vendors join vendorcontacts on vendorcontacts` | text |
| [`dbo.sp_RegistrationsUpdate`](../../procedures/VendorBids/dbo.sp_RegistrationsUpdate.md) | Procedure | `dbo.vendors where Vendors` | `eds.dbo.vendors where Vendors` | text |
| [`dbo.usp_ReturnBidDocumentStatus`](../../procedures/VendorBids/dbo.usp_ReturnBidDocumentStatus.md) | Procedure | `dbo.BidderCheckList` | `` | sed |
| [`dbo.usp_ReturnBidDocumentStatus`](../../procedures/VendorBids/dbo.usp_ReturnBidDocumentStatus.md) | Procedure | `dbo.BidderCheckList BidderCheckList on BidderCheckList` | `eds.dbo.BidderCheckList BidderCheckList on BidderCheckList` | text |
| [`dbo.usp_ReturnBidDocumentStatus`](../../procedures/VendorBids/dbo.usp_ReturnBidDocumentStatus.md) | Procedure | `dbo.vw_DMSVendorBidDocuments` | `` | sed |
| [`dbo.usp_ReturnBidDocumentStatus`](../../procedures/VendorBids/dbo.usp_ReturnBidDocumentStatus.md) | Procedure | `dbo.vw_DMSVendorBidDocuments vbd on vbd` | `EDS.dbo.vw_DMSVendorBidDocuments vbd on vbd` | text |
| [`dbo.usp_ReturnBidDocumentStatus`](../../procedures/VendorBids/dbo.usp_ReturnBidDocumentStatus.md) | Procedure | `dbo.vw_DMSVendorDocuments` | `` | sed |
| [`dbo.usp_ReturnBidDocumentStatus`](../../procedures/VendorBids/dbo.usp_ReturnBidDocumentStatus.md) | Procedure | `dbo.vw_DMSVendorDocuments vd on vd` | `EDS.dbo.vw_DMSVendorDocuments vd on vd` | text |
| `dbo.vendordocumentsviewByUser` | View | `dbo.BidDocumentTypes` | `` | sed |
| `dbo.vendordocumentsviewByUser` | View | `dbo.BidDocumentTypes on BidDocumentTypes` | `EDS.dbo.BidDocumentTypes on BidDocumentTypes` | text |
| `dbo.vendordocumentsviewByUser` | View | `dbo.BidHeaderCheckList` | `` | sed |
| `dbo.vendordocumentsviewByUser` | View | `dbo.BidHeaderCheckList on BidHeaderCheckList` | `EDS.dbo.BidHeaderCheckList on BidHeaderCheckList` | text |
| `dbo.vendordocumentsviewByUser` | View | `dbo.vw_DMSVendorDocuments` | `` | sed |
| `dbo.vendordocumentsviewByUser` | View | `dbo.vw_DMSVendorDocuments vd on vd` | `EDS.dbo.vw_DMSVendorDocuments vd on vd` | text |
| `dbo.vw_UploadedDocuments` | View | `dbo.BidderCheckList` | `` | sed |
| `dbo.vw_UploadedDocuments` | View | `dbo.BidderCheckList BidderCheckList` | `eds.dbo.BidderCheckList BidderCheckList` | text |
| `dbo.vw_UploadedDocuments` | View | `dbo.vw_DMSVendorBidDocuments` | `` | sed |
| `dbo.vw_UploadedDocuments` | View | `dbo.vw_DMSVendorBidDocuments vbd on vbd` | `EDS.dbo.vw_DMSVendorBidDocuments vbd on vbd` | text |
| `dbo.vw_UploadedDocuments` | View | `dbo.vw_DMSVendorDocuments` | `` | sed |
| `dbo.vw_UploadedDocuments` | View | `dbo.vw_DMSVendorDocuments vd on vd` | `EDS.dbo.vw_DMSVendorDocuments vd on vd` | text |

## Source queries

- `sys.objects` joined to `sys.sql_modules` — full T-SQL definition of every procedure, function, view, and trigger.
- `sys.sql_expression_dependencies` — SQL Server's own resolved cross-DB references (used as a cross-check).
- Text-grep over the definition for `[<db>].` and `<db>.` patterns (after stripping comments).
