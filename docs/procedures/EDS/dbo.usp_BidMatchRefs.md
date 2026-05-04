# Procedure: `dbo.usp_BidMatchRefs`

_Generated on 2026-05-04T14:49:07.448Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_BidMatchRefs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2015-08-21 16:56:29 |
| Modified | 2019-08-20 15:00:35 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@BidRequestItemId` | IN | int |  |
| 2 | `@MatchItemId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `vw_BidManufacturerPartNumbers` | VIEW |  |
| `vw_BidUPCs` | VIEW |  |
| `vw_BidVendorItemCodes` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure [dbo].[usp_BidMatchRefs] @BidRequestItemId int, @MatchItemId int
as
declare @CategoryId int,
--		@BidRequestItemId int,
		@ItemId int,
		@BidHeaderId int

-- Set Passed Parameter 		
--select @BidRequestItemId = 12354566
--exec usp_BidMatchRefs 12354566,0
-- Lookup Category and ItemId
select @CategoryId = BidHeaders.CategoryId, @ItemId = BidRequestItems.ItemId, @BidHeaderId = BidHeaders.BidHeaderId
  from BidRequestItems
  join BidHeaders on BidHeaders.BidHeaderId = BidRequestItems.BidHeaderId
 where BidRequestItems.BidRequestItemId = @BidRequestItemId

-- Get List of Possible Vendor/VendorItemCodes to Match
select bvic.ItemId, bvic.VendorId, bvic.VendorItemCode, bvic.BidHeaderId, bvic.BidResultsId
  into #IVICList
  from vw_BidVendorItemCodes bvic
 where bvic.ItemId = @ItemId
   and bvic.CategoryId = @CategoryId

-- Get List of Possible Manufacturer Part Numbers to Match
select bmpl.ItemId, bmpl.VendorId, bmpl.ManufPartNoBid, bmpl.BidHeaderId, bmpl.BidResultsId
  into #IMPNList
  from vw_BidManufacturerPartNumbers bmpl
 where bmpl.ItemId = @ItemId
   and bmpl.CategoryId = @CategoryId
-- group by bmpl.ItemId, bmpl.ManufPartNoBid, bmpl.BidHeaderId

-- Get List of Possible UPC's to Match
select bupc.ItemId, bupc.VendorId, bupc.UPC_ISBN, bupc.BidHeaderId, bupc.BidResultsId
  into #IUPCList
  from vw_BidUPCs bupc
 where bupc.ItemId = @ItemId
   and bupc.CategoryId = @CategoryId
-- group by bmpl.ItemId, bmpl.ManufPartNoBid, bmpl.BidHeaderId

--Get All Vendor/VendorItemCodes that have mutliple ItemId's
select VICS.ItemId, VICS.VendorId, VICS.VendorItemCode, Count(*) Counter
  into #VICList
  from (
	-- Get All VendorItemCode's each Vendor Bid for an ItemId
	select BidResults.ItemId, BidImports.VendorId, BidResults.VendorItemCode
	  from BidResults 
	  join BidImports on BidImports.BidImportId = BidResults.BidImportId
					 and BidImports.VendorId != 7691
	  join BidHeaders on BidHeaders.BidHeaderId = BidImports.BidHeaderId
	                 and BidHeaders.BidType = 1
	                 and BidHeaders.CategoryId = @CategoryId
	  join #IVICList vl on vl.VendorId = BidImports.VendorId
	                   and vl.VendorItemCode = BidResults.VendorItemCode
	 where BidResults.ItemBidType = 'S'
	 group by BidResults.ItemId, BidImports.VendorId, BidResults.VendorItemCode
       ) VICs
 group by VICS.ItemId, VICS.VendorId, VICS.VendorItemCode
-- having COUNT(*) > 1

-- Get All Manufacturer Part Numbers that have multiple items
select MPNs.ItemId, MPNs.ManufPartNoBid, COUNT(*) Counter
  into #MPNList
  from (
	-- Get All Manufacturer Part Numbers Bid for each ItemId
	select BidResults.ItemId, BidResults.ManufPartNoBid
	  from BidResults
	  join BidImports on BidImports.BidImportId = BidResults.BidImportId
					 and BidImports.VendorId != 7691
	  join BidHeaders on BidHeaders.BidHeaderId = BidImports.BidHeaderId
						 and BidHeaders.BidType = 1
						 and BidHeaders.CategoryId = @CategoryId
	  join #IMPNList ml on ml.ManufPartNoBid = BidResults.ManufPartNoBid
	 where BidResults.ItemBidType = 'S'
	 group by BidResults.ItemId, BidResults.ManufPartNoBid
      ) MPNs
 group by MPNs.ItemId, MPNs.ManufPartNoBid
-- having COUNT(*) > 1

-- Get All UPC's that have multiple items
select UPCs.ItemId, UPCs.UPC_ISBN, COUNT(*) Counter
  into #UPCList
  from (
	-- Get All Manufacturer Part Numbers Bid for each ItemId
	select BidResults.ItemId, BidResults.UPC_ISBN
	  from BidResults
	  join BidImports on BidImports.BidImportId = BidResults.BidImportId
					 and BidImports.VendorId != 7691
	  join BidHeaders on BidHeaders.BidHeaderId = BidImports.BidHeaderId
						 and BidHeaders.BidType = 1
						 and BidHeaders.CategoryId = @CategoryId
	  join #IUPCList ml on ml.UPC_ISBN = BidResults.UPC_ISBN
	 where BidResults.ItemBidType = 'S'
	 group by BidResults.ItemId, BidResults.UPC_ISBN
      ) UPCs
 group by UPCs.ItemId, UPCs.UPC_ISBN


select Matches.MatchType + ' match on Bid ' + CAST(Matches.BidHeaderId as varchar) + case when Vendors.VendorId is null then '' else ' for ' + Vendors.Name end + case when coalesce(Matches.VendorItemCode,'') != '' then ' Vendor Item Code ' + Matches.VendorItemCode else '' end + case when coalesce(Matches.ManufPartNoBid,'') != '' then ' Manufacturer Part Number ' + Matches.ManufPartNoBid else '' end + case when coalesce(Matches.ManufPartNoBid,'') != '' then ' UPC/EAN/ISBN ' + Matches.UPC else '' end + case when BidResults.BidResultsId is null then '' else case when coalesce(BidResults.PageNo,0) != 0 then ' Page ' + CAST(Bidresults.PageNo as varchar) else '' end end + case when coalesce(BidResults.ManufacturerBid,'') != '' then ' Manufacturer ' + BidResults.ManufacturerBid else '' end Reason, BidResults.ManufacturerBid Manufacturer, BidResults.ManufPartNoBid ManufacturerPartNumber, BidResults.UPC_ISBN
  from (
select case 
         when mpn.ItemId is not null then 'Manufacturer Part Number' 
		 when vicm.ItemId is not null then 'Vendor and Vendor Item Code' 
		 when upc.ItemId is not null then 'UPC/EAN/ISBN' 
		 else 'No Fields' 
	   end MatchType, 
	   coalesce(vicm.VendorId,mpn.VendorId,upc.VendorId) VendorId, 
	   case 
	     when coalesce(vicm.VendorItemCode,'') != '' then vicm.VendorItemCode 
		 when coalesce(mpn.VendorItemCode,'') != '' then mpn.VendorItemCode 
		 when coalesce(upc.VendorItemCode,'') != '' then upc.VendorItemCode 
	   end VendorItemCode, 
	   coalesce(vicm.BidHeaderId,mpn.BidHeaderId) BidHeaderId, 
	   case 
	     when coalesce(vicm.ManufPartNoBid,'') != '' then vicm.ManufPartNoBid 
		 when coalesce(mpn.ManufPartNoBid,'') != '' then mpn.ManufPartNoBid 
		 when coalesce(upc.ManufPartNoBid,'') != '' then upc.ManufPartNoBid 
	   end ManufPartNoBid, 
	   case 
	     when coalesce(vicm.UPC_ISBN,'') != '' then vicm.UPC_ISBN
		 when coalesce(mpn.UPC_ISBN,'') != '' then mpn.UPC_ISBN
		 when coalesce(upc.UPC_ISBN,'') != '' then upc.UPC_ISBN
	   end UPC, 
	   coalesce(vicm.BidResultsId,mpn.BidResultsId,upc.BidResultsId) BidResultsId
  from (
select vl1.ItemId, ivl.VendorId, ivl.VendorItemCode, ivl.BidHeaderId, '' ManufPartNoBid, '' UPC_ISBN, ivl.BidResultsId
  from #VICList vl
  join #VICList vl1 on vl1.VendorId = vl.vendorId
                   and vl1.VendorItemCode = vl.vendorItemCode
                   and vl1.ItemId = @ItemId
  left outer join #IVICList ivl on ivl.VendorId = vl1.VendorId
                               and ivl.VendorItemCode = vl1.VendorItemCode
                               and ivl.ItemId = vl1.ItemId
 where vl.ItemId = @MatchItemId
) vicm
full join (
select vl1.ItemId, null VendorId, '' VendorItemCode, impn.BidHeaderId, impn.ManufPartNoBid, '' UPC_ISBN, impn.BidResultsId
  from #MPNList vl
  join #MPNList vl1 on vl1.ManufPartNoBid = vl.ManufPartNoBid
                   and vl1.ItemId = @ItemId
  left outer join #IMPNList impn on impn.ManufPartNoBid = vl1.ManufPartNoBid
                                and impn.ItemId = vl1.ItemId
 where vl.ItemId = @MatchItemId
) mpn on mpn.BidResultsId = vicm.BidResultsId
full join (
select vl1.ItemId, null VendorId, '' VendorItemCode, iupc.BidHeaderId, '' ManufPartNoBid, iupc.UPC_ISBN, iupc.BidResultsId
  from #UPCList vl
  join #UPCList vl1 on vl1.UPC_ISBN = vl.UPC_ISBN
                   and vl1.ItemId = @ItemId
  left outer join #IUPCList iupc on iupc.UPC_ISBN = vl1.UPC_ISBN
                                and iupc.ItemId = vl1.ItemId
 where vl.ItemId = @MatchItemId
) upc on upc.BidResultsId = vicm.BidResultsId
) Matches
left outer join BidResults on BidResults.BidResultsId = Matches.BidResultsId
left outer join Vendors on Vendors.vendorId = Matches.VendorId
order by Matches.BidHeaderId desc, Matches.MatchType, Vendors.Name
```
