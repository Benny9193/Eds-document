# Procedure: `dbo.usp_BidRequestItemMergeDetailDavidTest_notused`

_Generated on 2026-05-04T14:49:07.451Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_BidRequestItemMergeDetailDavidTest_notused` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2015-08-30 12:26:23 |
| Modified | 2019-08-16 15:17:34 |
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
| `vw_BidVendorItemCodes` | VIEW |  |
| `vw_ItemDescription` | VIEW |  |
| `dbo.uf_ItemDescription` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[usp_BidRequestItemMergeDetailDavidTest] @BidRequestItemId int
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

Declare @WorkList Table
	(BidRequestItemId int
	,ItemDescription varchar(1024)
	,UniqueVICRefs int
	,UniqueMPNRefs int
	,Described varchar(max)
	,ItemId int
	)

Insert @WorkList (BidRequestItemId, ItemDescription, UniqueVICRefs, UniqueMPNRefs, Described, ItemId)
(select BidRequestItems.BidRequestItemId, dbo.uf_ItemDescription(BidRequestItems.ItemId) ItemDescription, 
       (select COUNT(*) from @VICList vl where vl.ItemId = BidRequestItems.ItemId) UniqueVICRefs, 
       (select COUNT(*) from @MPNList vl where vl.ItemId = BidRequestItems.ItemId) UniqueMPNRefs,
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
        ) MI on MI.ItemId = BidRequestItems.ItemId
 where BidRequestItems.BidHeaderId = @BidHeaderId
   and BidRequestItems.Active = 1)

select @BidHeaderId, Items.ItemCode, id.ItemDescription as ItemDesc, wl.BidRequestItemId, wl.ItemId, BidRequestItems.BidRequest, 
       BidRequestItems.Active, BidRequestItems.RequisitionCount, BidRequestItems.BidRequestAmount, 'Bogus Checksum' as [CHECKSUM], Units.Code as UnitCode, 
       Items.SortSeq, 'Bogus District Name' as DistrictName, 'Bogus Heading' as Heading, 'Bogus ManufPart#' as ManufacturorPartNumber, 'Bogus ManufPartNoBid' as ManufPartNoBid,
       0 as VendorId, 'Bogus VendorItemCode' as VendorItemCode, 0 MatchMfgPartNo, 0 MatchVendorItemCode
  from @WorkList wl
  join Items on Items.ItemId = wl.ItemId
  join vw_ItemDescription id on id.ItemId = wl.ItemId
  join Units on Units.UnitId = Items.UnitId
  join BidRequestItems on BidRequestItems.BidRequestItemId = wl.BidRequestItemId
 where wl.BidRequestItemId != @BidRequestItemId
  
/*

-- Set Passed Parameter 		
--select @BidRequestItemId = 12354566

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

select BidRequestItems.BidRequestItemId, dbo.uf_ItemDescription(BidRequestItems.ItemId) ItemDescription, 
       (select COUNT(*) from #VICList vl where vl.ItemId = BidRequestItems.ItemId) UniqueVICRefs, 
       (select COUNT(*) from #MPNList vl where vl.ItemId = BidRequestItems.ItemId) UniqueMPNRefs,
       cast(null as varchar(max)) Described,
       BidRequestItems.ItemId
  into #WorkList
  from BidRequestItems
  join (
    select vl.ItemId
      from #IVICList ivl
      join #VICList vl on vl.VendorId = ivl.VendorId
                      and vl.VendorItemCode = ivl.VendorItemCode
     group by vl.ItemId
    union (
      select ml.ItemId
        from #IMPNList iml
        join #MPNList ml on ml.ManufPartNoBid = iml.ManufPartNoBid
       group by ml.ItemId
          )
        ) MI on MI.ItemId = BidRequestItems.ItemId
 where BidRequestItems.BidHeaderId = @BidHeaderId
   and BidRequestItems.Active = 1

select @BidHeaderId, Items.ItemCode, id.ItemDescription as ItemDesc, wl.BidRequestItemId, wl.ItemId, BidRequestItems.BidRequest, 
       BidRequestItems.Active, BidRequestItems.RequisitionCount, BidRequestItems.BidRequestAmount, 'Bogus Checksum' as [CHECKSUM], Units.Code as UnitCode, 
       Items.SortSeq, 'Bogus District Name' as DistrictName, 'Bogus Heading' as Heading, 'Bogus ManufPart#' as ManufacturorPartNumber, 'Bogus ManufPartNoBid' as ManufPartNoBid,
       0 as VendorId, 'Bogus VendorItemCode' as VendorItemCode, 0 MatchMfgPartNo, 0 MatchVendorItemCode
  from #WorkList wl
  join Items on Items.ItemId = wl.ItemId
  join vw_ItemDescription id on id.ItemId = wl.ItemId
  join Units on Units.UnitId = Items.UnitId
  join BidRequestItems on BidRequestItems.BidRequestItemId = wl.BidRequestItemId
 where wl.BidRequestItemId != @BidRequestItemId
  
/* 
select *
  from #VICList
  
select *
  from #MPNList

select *
  from #IVICList
  
select *
  from #IMPNList

select @ItemId, dbo.uf_ItemDescription(@ItemId)

select *
  from #WorkList


select BidRequestItems.BidRequestItemId, dbo.uf_ItemDescription(BidRequestItems.ItemId) ItemDescription, 
       (select COUNT(*) from #VICList vl where vl.ItemId = BidRequestItems.ItemId) UniqueVICRefs, 
       (select COUNT(*) from #MPNList vl where vl.ItemId = BidRequestItems.ItemId) UniqueMPNRefs,
       cast(null as varchar(max)) Described,
       BidRequestItems.ItemId
  from BidRequestItems
  join (
    select vl.ItemId
      from #IVICList ivl
      join #VICList vl on vl.VendorId = ivl.VendorId
                      and vl.VendorItemCode = ivl.VendorItemCode
     group by vl.ItemId
    union (
      select ml.ItemId
        from #IMPNList iml
        join #MPNList ml on ml.ManufPartNoBid = iml.ManufPartNoBid
       group by ml.ItemId
          )
        ) MI on MI.ItemId = BidRequestItems.ItemId
 where BidRequestItems.BidHeaderId = @BidHeaderId
   and BidRequestItems.Active = 1

*/
--exec usp_BidRequestItemMergeDetailTempKevin 12354566
/*
12336614
12336892
12337756
12341435
12344064
12344908
12345672
12347392
12347776
12350257
12354566+
12355373
12356194

12337756-
12344064-
12347776-
12341435-
12350257-
12336614-
12336892-
12344908-
12345672-
12346314
12347686
12355373-
12356194-
12347392-

select BidImports.VendorId, BidResults.VendorItemCode, COUNT(*)
  from BidResults
  join BidImports on BidImports.BidImportId = BidResults.BidImportId
 where ItemId in (
3162324,
3163045)
  and ItemBidType = 'S'
 group by BidImports.VendorId, BidResults.VendorItemCode

select dbo.uf_ItemDescription(3162324)
select dbo.uf_ItemDescription(3163045)

exec usp_BidMatchRefs 12354566, 480554

select Matches.*, coalesce(Vendors.Code,'') VendorCode, coalesce(Vendors.Name,'') VendorName
  from (
select case when vicm.ItemId is null then 'Manufacturer Part Number' when mpn.ItemId is null then 'Vendor and Vendor Item Code' else 'All Fields' end MatchType, coalesce(vicm.VendorId,mpn.VendorId) VendorId, case when coalesce(vicm.VendorItemCode,'') != '' then vicm.VendorItemCode when coalesce(mpn.VendorItemCode,'') != '' then mpn.VendorItemCode end VendorItemCode, coalesce(vicm.BidHeaderId,mpn.BidHeaderId) BidHeaderId, case when coalesce(vicm.ManufPartNoBid,'') != '' then vicm.ManufPartNoBid when coalesce(mpn.ManufPartNoBid,'') != '' then mpn.ManufPartNoBid end ManufPartNoBid, coalesce(vicm.BidResultsId,mpn.BidResultsId) BidResultsId
  from (
select vl1.ItemId, ivl.VendorId, ivl.VendorItemCode, ivl.BidHeaderId, '' ManufPartNoBid, ivl.BidResultsId
  from #VICList vl
  join #VICList vl1 on vl1.VendorId = vl.vendorId
                   and vl1.VendorItemCode = vl.vendorItemCode
                   and vl1.ItemId = 466453
  left outer join #IVICList ivl on ivl.VendorId = vl1.VendorId
                               and ivl.VendorItemCode = vl1.VendorItemCode
                               and ivl.ItemId = vl1.ItemId
 where vl.ItemId = 480554
) vicm
full join (
select vl1.ItemId, null VendorId, '' VendorItemCode, impn.BidHeaderId, impn.ManufPartNoBid, impn.BidResultsId
  from #MPNList vl
  join #MPNList vl1 on vl1.ManufPartNoBid = vl.ManufPartNoBid
                   and vl1.ItemId = 466453
  left outer join #IMPNList impn on impn.ManufPartNoBid = vl1.ManufPartNoBid
                                and impn.ItemId = vl1.ItemId
 where vl.ItemId = 480554
) mpn on mpn.BidResultsId = vicm.BidResultsId
) Matches
left outer join Vendors on Vendors.vendorId = Matches.VendorId
order by Matches.BidHeaderId desc, Matches.MatchType, Vendors.Name
*/
*/
```
