# Cross-database inbound references: `VendorBids`

_Generated on 2026-05-04T14:51:40.423Z_

**Target database:** `VendorBids`

[← back to dependencies index](../README.md)

Routines, views, and triggers in *other* databases that reach into this database.

## Summary

| Source database | Distinct edges |
|-----------------|----------------|
| `EDS` | 51 |

## ← `EDS`

| Source routine | Source kind | Target object | Reference text | Detected by |
|----------------|-------------|---------------|----------------|-------------|
| [`dbo.sp_ImportVendorsBid`](../../procedures/EDS/dbo.sp_ImportVendorsBid.md) | Procedure | `dbo.uf_vendorbidanswersview` | `VendorBids.dbo.uf_vendorbidanswersview` | sed, text |
| [`dbo.sp_ImportVendorsBid`](../../procedures/EDS/dbo.sp_ImportVendorsBid.md) | Procedure | `dbo.uf_vendorbiditemsview` | `VendorBids.dbo.uf_vendorbiditemsview` | sed, text |
| [`dbo.sp_ImportVendorsBid`](../../procedures/EDS/dbo.sp_ImportVendorsBid.md) | Procedure | `dbo.uf_VendorBidMSRPResultsView` | `VendorBids.dbo.uf_VendorBidMSRPResultsView` | sed, text |
| [`dbo.sp_ImportVendorsBid`](../../procedures/EDS/dbo.sp_ImportVendorsBid.md) | Procedure | `dbo.uf_vendorbidsview` | `VendorBids.dbo.uf_vendorbidsview` | sed, text |
| [`dbo.sp_ImportVendorsBid`](../../procedures/EDS/dbo.sp_ImportVendorsBid.md) | Procedure | `dbo.VendorBids` | `` | sed |
| [`dbo.sp_ImportVendorsBid`](../../procedures/EDS/dbo.sp_ImportVendorsBid.md) | Procedure | `dbo.VendorBids vb on vb` | `VendorBids.dbo.VendorBids vb on vb` | text |
| [`dbo.sp_ImportVendorsBid`](../../procedures/EDS/dbo.sp_ImportVendorsBid.md) | Procedure | `dbo.vendorbids VendorBids` | `VendorBids.dbo.vendorbids VendorBids` | text |
| [`dbo.sp_ImportVendorsBid`](../../procedures/EDS/dbo.sp_ImportVendorsBid.md) | Procedure | `dbo.VendorBids VendorBids on VendorBids` | `VendorBids.dbo.VendorBids VendorBids on VendorBids` | text |
| [`dbo.sp_ImportVendorsBid`](../../procedures/EDS/dbo.sp_ImportVendorsBid.md) | Procedure | `dbo.VendorBids VendorBids with` | `VendorBids.dbo.VendorBids VendorBids with` | text |
| `dbo.VendorBidLookup` | View | `dbo.bidcalendar` | `` | sed |
| `dbo.VendorBidLookup` | View | `dbo.bidcalendar bidcalendar on bidcalendar` | `VendorBids.dbo.bidcalendar bidcalendar on bidcalendar` | text |
| `dbo.VendorBidLookup` | View | `dbo.registrations` | `` | sed |
| `dbo.VendorBidLookup` | View | `dbo.registrations registrations with` | `VendorBids.dbo.registrations registrations with` | text |
| `dbo.VendorBidLookup` | View | `dbo.vendorBids` | `` | sed |
| `dbo.VendorBidLookup` | View | `dbo.vendorBids vendorBids on vendorbids` | `VendorBids.dbo.vendorBids vendorBids on vendorbids` | text |
| `dbo.vw_BidMgrBidderDocs` | View | `dbo.vw_DocumentUploads` | `` | sed |
| `dbo.vw_BidMgrBidderDocs` | View | `dbo.vw_DocumentUploads vwDU ON vwDU` | `VendorBids.dbo.vw_DocumentUploads vwDU ON vwDU` | text |
| `dbo.vw_RptExpireDateBidDocs` | View | `dbo.vw_DocumentUploads` | `` | sed |
| `dbo.vw_RptExpireDateBidDocs` | View | `dbo.vw_DocumentUploads DU ON DU` | `VendorBids.dbo.vw_DocumentUploads DU ON DU` | text |
| `dbo.vw_VendorBlast` | View | `dbo.BidSchedule` | `` | sed |
| `dbo.vw_VendorBlast` | View | `dbo.BidSchedule BS  with` | `VendorBids.dbo.BidSchedule BS with` | text |
| `dbo.vw_VendorBlast` | View | `dbo.BidSchedule BS with` | `VendorBids.dbo.BidSchedule BS with` | text |
| `dbo.vw_VendorBlast` | View | `dbo.BidScheduleCats` | `` | sed |
| `dbo.vw_VendorBlast` | View | `dbo.BidScheduleCats BSC on BSC` | `VendorBids.dbo.BidScheduleCats BSC on BSC` | text |
| `dbo.vw_VendorBlast` | View | `dbo.DownloadLog` | `` | sed |
| `dbo.vw_VendorBlast` | View | `dbo.DownloadLog dl with` | `VendorBids.dbo.DownloadLog dl with` | text |
| `dbo.vw_VendorBlast` | View | `dbo.RegCalendar` | `` | sed |
| `dbo.vw_VendorBlast` | View | `dbo.RegCalendar RegCal on RegCal` | `VendorBids.dbo.RegCalendar RegCal on RegCal` | text |
| `dbo.vw_VendorBlast` | View | `dbo.Registrations` | `` | sed |
| `dbo.vw_VendorBlast` | View | `dbo.registrations r on r` | `VendorBids.dbo.registrations r on r` | text |
| `dbo.vw_VendorBlast` | View | `dbo.Registrations Reg on Reg` | `VendorBids.dbo.Registrations Reg on Reg` | text |
| `dbo.vw_VendorBlast` | View | `dbo.regusers` | `` | sed |
| `dbo.vw_VendorBlast` | View | `dbo.regusers ru on ru` | `VendorBids.dbo.regusers ru on ru` | text |
| `dbo.vw_VendorBlast` | View | `dbo.vendorbids` | `` | sed |
| `dbo.vw_VendorBlast` | View | `dbo.vendorbids vb on vb` | `VendorBids.dbo.vendorbids vb on vb` | text |
| `dbo.vw_VendorBlast_DownloadedBySchedule` | View | `dbo.bidcalendar` | `` | sed |
| `dbo.vw_VendorBlast_DownloadedBySchedule` | View | `dbo.bidcalendar bc with` | `VendorBids.dbo.bidcalendar bc with` | text |
| `dbo.vw_VendorBlast_DownloadedBySchedule` | View | `dbo.BidScheduleCats` | `` | sed |
| `dbo.vw_VendorBlast_DownloadedBySchedule` | View | `dbo.BidScheduleCats bsc with` | `VendorBids.dbo.BidScheduleCats bsc with` | text |
| `dbo.vw_VendorBlast_DownloadedBySchedule` | View | `dbo.DownloadLog` | `` | sed |
| `dbo.vw_VendorBlast_DownloadedBySchedule` | View | `dbo.DownloadLog dl with` | `VendorBids.dbo.DownloadLog dl with` | text |
| `dbo.vw_VendorBlast_DownloadedBySchedule` | View | `dbo.registrations` | `` | sed |
| `dbo.vw_VendorBlast_DownloadedBySchedule` | View | `dbo.registrations reg with` | `VendorBids.dbo.registrations reg with` | text |
| `dbo.vw_VendorBlast_DownloadedBySchedule` | View | `dbo.regusers` | `` | sed |
| `dbo.vw_VendorBlast_DownloadedBySchedule` | View | `dbo.regusers ru with` | `VendorBids.dbo.regusers ru with` | text |
| `dbo.vw_VendorBlast_RegisteredBySchedule` | View | `dbo.BidMgrVendorEmailListView` | `` | sed |
| `dbo.vw_VendorBlast_RegisteredBySchedule` | View | `dbo.BidMgrVendorEmailListView el with` | `VendorBids.dbo.BidMgrVendorEmailListView el with` | text |
| `dbo.vw_VendorBlast_SubmittedByBid` | View | `dbo.registrations` | `` | sed |
| `dbo.vw_VendorBlast_SubmittedByBid` | View | `dbo.registrations reg with` | `VendorBids.dbo.registrations reg with` | text |
| `dbo.vw_VendorBlast_SubmittedByBid` | View | `dbo.vendorbids` | `` | sed |
| `dbo.vw_VendorBlast_SubmittedByBid` | View | `dbo.vendorbids vb with` | `VendorBids.dbo.vendorbids vb with` | text |

## Source queries

See per-source-database `outbound.md` and the top-level `README.md` for the full method.
