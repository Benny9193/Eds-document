# Procedure: `dbo.usp_BidRequestItemMergeDetailDavid`

_Generated on 2026-05-04T13:04:24.350Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_BidRequestItemMergeDetailDavid` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2015-08-21 19:05:43 |
| Modified | 2022-08-23 14:57:27 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@BidRequestItemId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Units` | USER_TABLE |  |
| `vw_BidManufacturerPartNumbers` | VIEW |  |
| `vw_BidUPCs` | VIEW |  |
| `vw_BidVendorItemCodes` | VIEW |  |
| `vw_ItemDescription` | VIEW |  |
| `dbo.uf_ItemDescription` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure [dbo].[usp_BidRequestItemMergeDetailDavid] @BidRequestItemId int
as
declare @CategoryId int,
--		@BidRequestItemId int,
		@ItemId int,
		@BidHeaderId int

-- Set Passed Parameter 		
--select @BidRequestItemId = 15999144

-- Lookup Category and ItemId
	select @CategoryId = BidHeaders.CategoryId, @ItemId = BidRequestItems.ItemId, @BidHeaderId = BidHeaders.BidHeaderId
	  from BidRequestItems
	  join BidHeaders on BidHeaders.BidHeaderId = BidRequestItems.BidHeaderId
	 where BidRequestItems.BidRequestItemId = @BidRequestItemId

-- Get List of Possible Vendor/VendorItemCodes to Match
	Declare @IVICList Table
		(ItemId int
		,VendorId int
		,VendorItemCode varchar(50)
		,BidHeaderId int
		,BidResultsId int
		)

	Insert @IVICList (ItemId, VendorId, VendorItemCode, BidHeaderId, BidResultsId)
	(select bvic.ItemId, bvic.VendorId, bvic.VendorItemCode, bvic.BidHeaderId, bvic.BidResultsId
	  from vw_BidVendorItemCodes bvic
	 where bvic.ItemId = @ItemId
	   and bvic.CategoryId = @CategoryId)


-- Get List of Possible Manufacturer Part Numbers to Match
	Declare @IMPNList Table
		(ItemId int
		,VendorId int
		,ManufPartNoBid varchar(50)	
		,BidHeaderId int
		,BidResultsId int
		)

	Insert @IMPNList (ItemId, VendorId, ManufPartNoBid, BidHeaderId, BidResultsId)
	(select bmpl.ItemId, bmpl.VendorId, bmpl.ManufPartNoBid, bmpl.BidHeaderId, bmpl.BidResultsId
	  from vw_BidManufacturerPartNumbers bmpl
	 where bmpl.ItemId = @ItemId
	   and bmpl.CategoryId = @CategoryId)


-- Get List of Possible Manufacturer Part Numbers to Match
	Declare @IUPCList Table
		(ItemId int
		,VendorId int
		,UPC varchar(20)	
		,BidHeaderId int
		,BidResultsId int
		)

	Insert @IUPCList (ItemId, VendorId, UPC, BidHeaderId, BidResultsId)
	(select bupc.ItemId, bupc.VendorId, bupc.UPC_ISBN, bupc.BidHeaderId, bupc.BidResultsId
	  from vw_BidUPCs bupc
	 where bupc.ItemId = @ItemId
	   and bupc.CategoryId = @CategoryId
	   and bupc.UPC_ISBN != '0')


--Get All Vendor/VendorItemCodes that have mutliple ItemId's
Declare @VICList Table
	(ItemId int
	,VendorId int
	,VendorItemCode varchar(50)
	,Counter int
	)

/*
Insert @VICList (ItemId, VendorId, VendorItemCode, Counter)
(select VICS.ItemId, VICS.VendorId, VICS.VendorItemCode, Count(*) Counter
  from (
	-- Get All VendorItemCode's each Vendor Bid for an ItemId
	select BidResults.ItemId, BidImports.VendorId, BidResults.VendorItemCode
	  from BidResults 
	  join BidImports on BidImports.BidImportId = BidResults.BidImportId
					 and BidImports.VendorId != 7691
	  join BidHeaders on BidHeaders.BidHeaderId = BidImports.BidHeaderId
	                 and BidHeaders.BidType = 1
	                 and BidHeaders.CategoryId = @CategoryId
	  join @IVICList vl on vl.VendorId = BidImports.VendorId
	                   and vl.VendorItemCode = BidResults.VendorItemCode
	 where BidResults.ItemBidType = 'S'
	 group by BidResults.ItemId, BidImports.VendorId, BidResults.VendorItemCode
       ) VICs
 group by VICS.ItemId, VICS.VendorId, VICS.VendorItemCode)
-- having COUNT(*) > 1
*/
Insert @VICList (ItemId, VendorId, VendorItemCode, Counter)
(select VICS.ItemId, VICS.VendorId, VICS.VendorItemCode, Count(*) Counter
  from (
	-- Get All VendorItemCode's each Vendor Bid for an ItemId
	select bvic.ItemId, bvic.VendorId, bvic.VendorItemCode
	  from vw_BidVendorItemCodes bvic
	  join @IVICList vl on vl.VendorId = bvic.VendorId
	                   and vl.VendorItemCode = bvic.VendorItemCode
	 where bvic.CategoryId = @CategoryId
	 group by bvic.ItemId, bvic.VendorId, bvic.VendorItemCode
       ) VICs
 group by VICS.ItemId, VICS.VendorId, VICS.VendorItemCode)

-- Get All Manufacturer Part Numbers that have multiple items
Declare @MPNList Table
	(ItemId int
	,ManufPartNoBid varchar(50)
	,Counter int
	)

/*
Insert @MPNList (ItemId, ManufPartNoBid, Counter)
(select MPNs.ItemId, MPNs.ManufPartNoBid, COUNT(*) Counter
  from (
	-- Get All Manufacturer Part Numbers Bid for each ItemId
	select BidResults.ItemId, BidResults.ManufPartNoBid
	  from BidResults
	  join BidImports on BidImports.BidImportId = BidResults.BidImportId
					 and BidImports.VendorId != 7691
	  join BidHeaders on BidHeaders.BidHeaderId = BidImports.BidHeaderId
						 and BidHeaders.BidType = 1
						 and BidHeaders.CategoryId = @CategoryId
	  join @IMPNList ml on ml.ManufPartNoBid = BidResults.ManufPartNoBid
	 where BidResults.ItemBidType = 'S'
	 group by BidResults.ItemId, BidResults.ManufPartNoBid
      ) MPNs
 group by MPNs.ItemId, MPNs.ManufPartNoBid)
-- having COUNT(*) > 1
*/
Insert @MPNList (ItemId, ManufPartNoBid, Counter)
(select MPNs.ItemId, MPNs.ManufPartNoBid, COUNT(*) Counter
  from (
	-- Get All Manufacturer Part Numbers Bid for each ItemId
	select bmpn.ItemId, bmpn.ManufPartNoBid
	  from vw_BidManufacturerPartNumbers bmpn 
	  join @IMPNList ml on ml.ManufPartNoBid = bmpn.ManufPartNoBid
	 where bmpn.CategoryId = @CategoryId
	 group by bmpn.ItemId, bmpn.ManufPartNoBid
      ) MPNs
 group by MPNs.ItemId, MPNs.ManufPartNoBid)

-- Get All UPC's that have multiple items
Declare @UPCList Table
	(ItemId int
	,UPC varchar(20)
	,Counter int
	)

Insert @UPCList (ItemId, UPC, Counter)
(select UPCs.ItemId, UPCs.UPC_ISBN, COUNT(*) Counter
  from (
	-- Get All Manufacturer Part Numbers Bid for each ItemId
	select bupc.ItemId, bupc.UPC_ISBN
	  from vw_BidUPCs bupc 
	  join @IUPCList ml on ml.UPC = bupc.UPC_ISBN
	                   and ml.UPC != '0'
	 where bupc.CategoryId = @CategoryId
	   and bupc.UPC_ISBN != '0'
	 group by bupc.ItemId, bupc.UPC_ISBN
      ) UPCs
 group by UPCs.ItemId, UPCs.UPC_ISBN)

Declare @WorkList Table
	(BidRequestItemId int
	,ItemDescription varchar(1024)
	,UniqueVICRefs int
	,UniqueMPNRefs int
	,UniqueUPCRefs int
	,Described varchar(max)
	,ItemId int
	)

Insert @WorkList (BidRequestItemId, ItemDescription, UniqueVICRefs, UniqueMPNRefs, UniqueUPCRefs, Described, ItemId)
(select BidRequestItems.BidRequestItemId, dbo.uf_ItemDescription(BidRequestItems.ItemId) ItemDescription, 
       (select COUNT(*) from @VICList vl where vl.ItemId = BidRequestItems.ItemId) UniqueVICRefs, 
       (select COUNT(*) from @MPNList vl where vl.ItemId = BidRequestItems.ItemId) UniqueMPNRefs,
       (select COUNT(*) from @UPCList vl where vl.ItemId = BidRequestItems.ItemId) UniqueUPCRefs,
       cast(null as varchar(max)) Described,
       BidRequestItems.ItemId
  from BidRequestItems
  join (
    select vl.ItemId
      from @IVICList ivl
      join @VICList vl on vl.VendorId = ivl.VendorId
                      and vl.VendorItemCode = ivl.VendorItemCode
     group by vl.ItemId
    union (
      select ml.ItemId
        from @IMPNList iml
        join @MPNList ml on ml.ManufPartNoBid = iml.ManufPartNoBid
       group by ml.ItemId
          )
    union (
      select ml.ItemId
        from @IUPCList iml
        join @UPCList ml on ml.UPC = iml.UPC
       group by ml.ItemId
          )
        ) MI on MI.ItemId = BidRequestItems.ItemId
 where BidRequestItems.BidHeaderId = @BidHeaderId
   and BidRequestItems.Active = 1)

select @BidHeaderId, Items.ItemCode, id.ItemDescription as ItemDesc, wl.BidRequestItemId, wl.ItemId, BidRequestItems.BidRequest, 
       BidRequestItems.Active, BidRequestItems.RequisitionCount, BidRequestItems.BidRequestAmount, 'Bogus Checksum' as [CHECKSUM], Units.Code as UnitCode, 
       Items.SortSeq, 'Bogus District Name' as DistrictName, 'Bogus Heading' as Heading, 'Bogus ManufPart#' as ManufacturorPartNumber, 'Bogus ManufPartNoBid' as ManufPartNoBid,
       0 as VendorId, 'Bogus VendorItemCode' as VendorItemCode, 0 MatchMfgPartNo, 0 MatchVendorItemCode,
       CASE 
		 WHEN len(Items.ItemCode) = 8 and Items.ItemCode like 'EDS%' THEN 1
         ELSE 0 
	   END As SuperItemFlag
  from @WorkList wl
  join Items on Items.ItemId = wl.ItemId
  join vw_ItemDescription id on id.ItemId = wl.ItemId
  join Units on Units.UnitId = Items.UnitId
  join BidRequestItems on BidRequestItems.BidRequestItemId = wl.BidRequestItemId
 where wl.BidRequestItemId != @BidRequestItemId
```
