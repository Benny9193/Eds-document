# View: `dbo.vw_AwardedBidResults`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Item Code` | varchar(50) | YES |  |  |
| 2 | `Vendor Item Code` | varchar(50) | NO |  |  |
| 3 | `Bid Price` | decimal(33,13) | YES |  |  |
| 4 | `Qty` | int | YES |  |  |
| 5 | `Description` | varchar(1156) | YES |  |  |
| 6 | `UOM` | varchar(20) | NO |  |  |
| 7 | `Items Per Unit` | varchar(50) | NO |  |  |
| 8 | `Item Bid Type` | varchar(32) | NO |  |  |
| 9 | `Alternate` | varchar(512) | NO |  |  |
| 10 | `Manufacturer` | varchar(50) | NO |  |  |
| 11 | `Manufacturer Part Number` | varchar(50) | NO |  |  |
| 12 | `UPC / EAN / ISBN` | varchar(20) | NO |  |  |
| 13 | `SDS URL` | varchar(300) | NO |  |  |
| 14 | `Image URL` | varchar(300) | NO |  |  |
| 15 | `Awarded Vendor Name` | varchar(50) | NO |  |  |
| 16 | `Vendor Code` | varchar(16) | NO |  |  |
| 17 | `UniqueId Do Not Modify` | int | NO |  |  |
| 18 | `BidHeaderId` | int | YES |  |  |
| 19 | `VendorId` | int | YES |  |  |
| 20 | `SortSeq` | varchar(64) | NO |  |  |
| 21 | `UNSPSC` | varchar(50) | NO |  |  |
| 22 | `UniqueItemNumber` | varchar(50) | NO |  |  |
| 23 | `PerishableItem` | bit | NO |  |  |
| 24 | `PrescriptionRequired` | bit | NO |  |  |
| 25 | `DigitallyDelivered` | tinyint | NO |  |  |
| 26 | `MinimumOrderQuantity` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidItems` | USER_TABLE |
| `BidResults` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Items` | USER_TABLE |
| `Units` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `vw_ItemDescription` | VIEW |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_RptMissingURLsByBidAndVendor`](dbo.vw_RptMissingURLsByBidAndVendor.md) | VIEW |

## Definition

```sql
CREATE   view [dbo].[vw_AwardedBidResults] as
select Items.ItemCode as [Item Code], 
       isnull(BidItems.VendorItemCode,'') as [Vendor Item Code], 
	   isnull(BidItems.Price,0) - round(isnull(BidItems.Price,0) * (isnull(Bids.BidDiscountRate,0) / 100),2) as [Bid Price], 
	   BidItems.BidRequest as [Qty], 
	   vw_ItemDescription.ItemDescription as [Description], 
	   isnull(Units.Code,'') as [UOM], 
	   isnull(BidResults.ItemsPerUnit,'') [Items Per Unit], 
	   isnull(BidItems.ItemBidType,'') [Item Bid Type], 
	   isnull(BidItems.Alternate,'') [Alternate], 
	   isnull(BidResults.ManufacturerBid,'') [Manufacturer], 
	   isnull(BidResults.ManufPartNoBid,'') [Manufacturer Part Number], 
	   isnull(BidResults.UPC_ISBN,'') as [UPC / EAN / ISBN], 
	   isnull(BidResults.SDS_URL,'') as [SDS URL], 
	   isnull(BidResults.ImageURL,'') as [Image URL], 
	   isnull(Vendors.Name,'') [Awarded Vendor Name], 
	   isnull(Vendors.Code,'') [Vendor Code], 
	   BidResults.BidResultsId as [UniqueId Do Not Modify],
       Bids.BidHeaderId,
       Bids.VendorId,
       isnull(Items.SortSeq,'') as SortSeq,
	   isnull(BidResults.UNSPSC,'') as [UNSPSC], 
	   isnull(BidResults.UniqueItemNumber,'') as [UniqueItemNumber],
	   isnull(BidResults.PerishableItem,0) as [PerishableItem],             -- added 8/28/2024
	   isnull(BidResults.PrescriptionRequired,0) as [PrescriptionRequired], -- added 8/28/2024
	   isnull(BidResults.DigitallyDelivered,0) as [DigitallyDelivered],     -- added 8/28/2024
	   isnull(BidResults.MinimumOrderQuantity,0) as [MinimumOrderQuantity]  -- added 8/28/2024
from BidItems with (nolock)
join BidResults on BidResults.BidResultsId = BidItems.BidResultsId
join Items on Items.ItemId = BidItems.ItemId
join Bids on Bids.BidId = BidItems.BidId
         and Bids.Active = 1
join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
               --and BidHeaders.BidHeaderId = <cfqueryparam cfsqltype="cf_sql_integer" value="#params.bidNumber#" />
left outer join Units on Units.UnitId = Items.UnitId
join vw_ItemDescription on vw_ItemDescription.ItemId = Items.ItemId
join Vendors on Vendors.VendorId = Bids.VendorId
            --and Vendors.VendorId = <cfqueryparam cfsqltype="cf_sql_integer" value="#local.rsVendors.VendorId#" />
--order by Items.SortSeq
```
